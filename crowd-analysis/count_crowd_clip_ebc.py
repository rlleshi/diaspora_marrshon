#!/usr/bin/env python3
"""Estimate the number of people visible in an image with CLIP-EBC.

The single-image CLI and the YouTube scene analysis share the model loader and
counting functions here. A count sums the predicted density map for one image;
it does not measure total attendance across a video or event.
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import asdict, dataclass, replace
from pathlib import Path

import numpy as np
import torch
from PIL import Image, ImageFilter
from torchvision.transforms import Normalize, ToTensor


IMAGENET_NORMALIZE = Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
OPENAI_MODEL_NAMES = {
    "clip_vit_b_16": "ViT-B/16",
    "clip_vit_b_32": "ViT-B/32",
    "clip_vit_l_14": "ViT-L/14",
}


@dataclass(frozen=True)
class ModelSpec:
    """Inference settings; checkpoint tensor shapes can override the backbone."""

    model: str = "clip_vit_b_16"
    input_size: int = 224
    reduction: int = 8
    truncation: int = 4
    anchor_points: str = "average"
    prompt_type: str = "word"
    granularity: str = "fine"
    num_vpt: int = 32
    vpt_drop: float = 0.0
    shallow_vpt: bool = False
    dataset_config: str = "nwpu"


@dataclass(frozen=True)
class LoadedClipEbcCounter:
    """A model and its inputs kept together for repeated image counts."""

    repo_dir: Path
    checkpoint: Path
    model: torch.nn.Module
    spec: ModelSpec
    device: torch.device


@dataclass
class CountOutput:
    """The count, density map, and optional files produced for one image."""

    count: float
    rounded_count: int
    density: np.ndarray
    artifacts: dict[str, str]
    metadata: dict[str, object]
    result: dict[str, object]
    result_path: Path | None = None


def parse_args() -> argparse.Namespace:
    """Parse single-image inference and screenshot cleanup options."""

    parser = argparse.ArgumentParser(description="Estimate a crowd count from one image using CLIP-EBC.")
    parser.add_argument("--image", type=Path, default=Path("crowd.jpeg"), help="Input image path.")
    parser.add_argument("--repo-dir", type=Path, default=Path("CLIP-EBC"), help="CLIP-EBC repo directory.")
    parser.add_argument("--checkpoint", type=Path, default=None, help="Path to a CLIP-EBC .pth checkpoint.")
    parser.add_argument("--output-dir", type=Path, default=Path("outputs/clip_ebc"), help="Directory for JSON and images.")
    parser.add_argument("--device", default="auto", help="Device: auto, cuda, cuda:0, or cpu.")
    parser.add_argument("--stride", type=int, default=224, help="Sliding-window stride in pixels.")
    parser.add_argument("--crop-ui", action="store_true", help="Crop the bottom video progress UI from the image.")
    parser.add_argument("--crop-bottom-px", type=int, default=34, help="Pixels removed from bottom with --crop-ui.")
    parser.add_argument("--mask-pause", action="store_true", help="Blur-fill the central pause icon area.")
    parser.add_argument("--mask-lower-banner", action="store_true", help="Blur-fill the lower translucent text banner area.")
    return parser.parse_args()


def add_clip_ebc_to_path(repo_dir: Path) -> None:
    """Make the CLIP-EBC checkout importable by the model loader."""

    repo_dir = repo_dir.resolve()
    if not repo_dir.exists():
        raise FileNotFoundError(f"CLIP-EBC repo not found: {repo_dir}")
    repo_dir_str = str(repo_dir)
    if repo_dir_str not in sys.path:
        sys.path.insert(0, repo_dir_str)


def choose_device(requested: str) -> torch.device:
    """Select CUDA for auto mode when available and reject unavailable CUDA."""

    if requested == "auto":
        return torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    device = torch.device(requested)
    if device.type == "cuda" and not torch.cuda.is_available():
        raise RuntimeError("CUDA was requested, but torch.cuda.is_available() is false.")
    return device


def find_checkpoint(repo_dir: Path) -> Path:
    """Prefer the NWPU RMSE checkpoint, then MAE, then other local weights."""

    preferred = [
        repo_dir / "checkpoints/nwpu/clip_vit_b_16_word_224_8_4_fine_1.0_dmcount/best_rmse.pth",
        repo_dir / "checkpoints/nwpu/clip_vit_b_16_word_224_8_4_fine_1.0_dmcount/best_mae.pth",
    ]
    for checkpoint in preferred:
        if checkpoint.exists():
            return checkpoint

    patterns = [
        "checkpoints/**/clip_vit_b_16*best_rmse*.pth",
        "checkpoints/**/clip_vit_b_16*best_mae*.pth",
        "checkpoints/**/*.pth",
    ]
    for pattern in patterns:
        matches = sorted(repo_dir.glob(pattern))
        if matches:
            return matches[0]
    raise FileNotFoundError(
        "No checkpoint found. Pass --checkpoint or download/extract CLIP-EBC weights under CLIP-EBC/checkpoints."
    )


def load_bins(repo_dir: Path, spec: ModelSpec) -> tuple[list[tuple[float, float]], list[float]]:
    """Read count bins and anchor points from the upstream model config."""

    config_path = repo_dir / "configs" / f"reduction_{spec.reduction}.json"
    with config_path.open("r", encoding="utf-8") as f:
        config = json.load(f)[str(spec.truncation)][spec.dataset_config]

    bins = [(float(left), float(right)) for left, right in config["bins"][spec.granularity]]
    anchor_key = "average" if spec.anchor_points == "average" else "middle"
    anchor_points = [float(point) for point in config["anchor_points"][spec.granularity][anchor_key]]
    return bins, anchor_points


def load_model(repo_dir: Path, checkpoint: Path, spec: ModelSpec, device: torch.device) -> tuple[torch.nn.Module, ModelSpec]:
    """Build a model matching the checkpoint and return it ready for inference.

    Tensor shapes determine the ViT backbone when the checkpoint label differs.
    """

    from models import get_model

    state_dict = load_checkpoint_state_dict(checkpoint)
    spec = infer_spec_from_state_dict(state_dict, spec)
    ensure_openai_clip_assets(repo_dir, OPENAI_MODEL_NAMES[spec.model])

    bins, anchor_points = load_bins(repo_dir, spec)
    model = get_model(
        backbone=spec.model,
        input_size=spec.input_size,
        reduction=spec.reduction,
        bins=bins,
        anchor_points=anchor_points,
        prompt_type=spec.prompt_type,
        num_vpt=spec.num_vpt,
        vpt_drop=spec.vpt_drop,
        deep_vpt=not spec.shallow_vpt,
    )

    model.load_state_dict(state_dict, strict=True)
    model.to(device)
    model.eval()
    return model, spec


def load_counter(
    repo_dir: Path,
    checkpoint: Path | None = None,
    device: str | torch.device = "auto",
    spec: ModelSpec | None = None,
) -> LoadedClipEbcCounter:
    """Resolve the model files and device once for reuse across images."""

    repo_dir = repo_dir.resolve()
    add_clip_ebc_to_path(repo_dir)
    checkpoint = checkpoint.resolve() if checkpoint else find_checkpoint(repo_dir).resolve()
    device_obj = choose_device(device) if isinstance(device, str) else device
    model, inferred_spec = load_model(repo_dir, checkpoint, spec or ModelSpec(), device_obj)
    return LoadedClipEbcCounter(
        repo_dir=repo_dir,
        checkpoint=checkpoint,
        model=model,
        spec=inferred_spec,
        device=device_obj,
    )


def load_checkpoint_state_dict(checkpoint: Path) -> dict[str, torch.Tensor]:
    """Accept bare weights or either common checkpoint wrapper key."""

    loaded = torch.load(checkpoint, map_location="cpu")
    if isinstance(loaded, dict) and "model_state_dict" in loaded:
        return loaded["model_state_dict"]
    if isinstance(loaded, dict) and "state_dict" in loaded:
        return loaded["state_dict"]
    return loaded


def infer_spec_from_state_dict(state_dict: dict[str, torch.Tensor], spec: ModelSpec) -> ModelSpec:
    """Infer the ViT variant from the image encoder's first convolution."""

    conv = state_dict.get("image_encoder.conv1.weight")
    if conv is None or len(conv.shape) != 4:
        return spec

    channels = int(conv.shape[0])
    patch_size = int(conv.shape[-1])
    if channels == 1024 and patch_size == 14:
        return replace(spec, model="clip_vit_l_14")
    if channels == 768 and patch_size == 16:
        return replace(spec, model="clip_vit_b_16")
    if channels == 768 and patch_size == 32:
        return replace(spec, model="clip_vit_b_32")
    return spec


def ensure_openai_clip_assets(repo_dir: Path, openai_model_name: str = "ViT-B/16") -> None:
    """Prepare source CLIP weights and configs for the selected backbone.

    These assets are separate from the fine-tuned crowd-counting checkpoint.
    """
    from models.clip._clip.prepare import CLIPTextEncoderTemp, model_name_map
    from models.clip._clip.utils import load

    clip_dir = repo_dir / "models" / "clip" / "_clip"
    weight_dir = clip_dir / "weights"
    config_dir = clip_dir / "configs"
    download_dir = clip_dir / "openai_downloads"
    model_name = model_name_map[openai_model_name]

    required_files = [
        weight_dir / f"clip_{model_name}.pth",
        weight_dir / f"clip_image_encoder_{model_name}.pth",
        weight_dir / f"clip_text_encoder_{model_name}.pth",
        config_dir / f"clip_{model_name}.json",
        config_dir / f"clip_image_encoder_{model_name}.json",
        config_dir / f"clip_text_encoder_{model_name}.json",
    ]
    if all(path.exists() for path in required_files):
        return

    weight_dir.mkdir(parents=True, exist_ok=True)
    config_dir.mkdir(parents=True, exist_ok=True)
    download_dir.mkdir(parents=True, exist_ok=True)

    device = torch.device("cpu")
    clip_model = load(openai_model_name, device=device, download_root=str(download_dir)).to(device)
    image_encoder = clip_model.visual.to(device)
    text_encoder = CLIPTextEncoderTemp(clip_model).to(device)

    torch.save(clip_model.state_dict(), weight_dir / f"clip_{model_name}.pth")
    torch.save(image_encoder.state_dict(), weight_dir / f"clip_image_encoder_{model_name}.pth")
    torch.save(text_encoder.state_dict(), weight_dir / f"clip_text_encoder_{model_name}.pth")

    model_config = {
        "embed_dim": clip_model.embed_dim,
        "image_resolution": clip_model.image_resolution,
        "vision_layers": clip_model.vision_layers,
        "vision_width": clip_model.vision_width,
        "vision_patch_size": clip_model.vision_patch_size,
        "context_length": clip_model.context_length,
        "vocab_size": clip_model.vocab_size,
        "transformer_width": clip_model.transformer_width,
        "transformer_heads": clip_model.transformer_heads,
        "transformer_layers": clip_model.transformer_layers,
    }
    image_encoder_config = {
        "embed_dim": clip_model.embed_dim,
        "image_resolution": clip_model.image_resolution,
        "vision_layers": clip_model.vision_layers,
        "vision_width": clip_model.vision_width,
        "vision_patch_size": clip_model.vision_patch_size,
        "vision_heads": clip_model.vision_heads,
    }
    text_encoder_config = {
        "embed_dim": clip_model.embed_dim,
        "context_length": clip_model.context_length,
        "vocab_size": clip_model.vocab_size,
        "transformer_width": clip_model.transformer_width,
        "transformer_heads": clip_model.transformer_heads,
        "transformer_layers": clip_model.transformer_layers,
    }

    write_json(config_dir / f"clip_{model_name}.json", model_config)
    write_json(config_dir / f"clip_image_encoder_{model_name}.json", image_encoder_config)
    write_json(config_dir / f"clip_text_encoder_{model_name}.json", text_encoder_config)


def preprocess_image(args: argparse.Namespace) -> tuple[Image.Image, dict[str, object]]:
    """Crop or mask optional player overlays and record the changes."""

    image = Image.open(args.image).convert("RGB")
    original_size = image.size
    preprocess: dict[str, object] = {
        "original_size": {"width": original_size[0], "height": original_size[1]},
        "crop_ui": bool(args.crop_ui),
        "crop_bottom_px": 0,
        "mask_pause": bool(args.mask_pause),
        "mask_lower_banner": bool(args.mask_lower_banner),
    }

    if args.crop_ui:
        bottom = min(max(args.crop_bottom_px, 0), image.height - 1)
        if bottom > 0:
            image = image.crop((0, 0, image.width, image.height - bottom))
            preprocess["crop_bottom_px"] = bottom

    if args.mask_pause:
        image = blur_fill_rect(image, center_rect(image.size, width_frac=0.10, height_frac=0.08))

    if args.mask_lower_banner:
        width, height = image.size
        banner = (
            int(width * 0.27),
            int(height * 0.63),
            int(width * 0.68),
            int(height * 0.72),
        )
        image = blur_fill_rect(image, banner)

    preprocess["processed_size"] = {"width": image.width, "height": image.height}
    return image, preprocess


def center_rect(size: tuple[int, int], width_frac: float, height_frac: float) -> tuple[int, int, int, int]:
    """Locate a centered mask using fractions of the image dimensions."""

    width, height = size
    rect_width = int(width * width_frac)
    rect_height = int(height * height_frac)
    left = (width - rect_width) // 2
    top = (height - rect_height) // 2
    return left, top, left + rect_width, top + rect_height


def blur_fill_rect(image: Image.Image, rect: tuple[int, int, int, int]) -> Image.Image:
    """Cover a screenshot overlay with blurred pixels from the same area."""

    image = image.copy()
    blurred = image.filter(ImageFilter.GaussianBlur(radius=max(image.size) // 45))
    patch = blurred.crop(rect)
    image.paste(patch, rect)
    return image


def image_to_tensor(image: Image.Image) -> torch.Tensor:
    """Create an ImageNet-normalized NCHW batch from an RGB image."""

    tensor = ToTensor()(image)
    return IMAGENET_NORMALIZE(tensor).unsqueeze(0)


def predict_count(
    model: torch.nn.Module,
    image: Image.Image,
    spec: ModelSpec,
    device: torch.device,
    stride: int,
) -> torch.Tensor:
    """Run overlapping model windows and return the density map on CPU."""

    from utils import sliding_window_predict

    tensor = image_to_tensor(image).to(device)
    with torch.inference_mode():
        density = sliding_window_predict(model, tensor, window_size=spec.input_size, stride=stride)
    return density.cpu()


def save_density_outputs(output_dir: Path, image: Image.Image, density: np.ndarray) -> dict[str, str]:
    """Save the density array, processed image, heatmap, and overlay."""

    output_dir.mkdir(parents=True, exist_ok=True)
    density_path = output_dir / "density.npy"
    heatmap_path = output_dir / "density_heatmap.png"
    overlay_path = output_dir / "density_overlay.png"
    processed_path = output_dir / "processed_image.png"

    np.save(density_path, density)
    image.save(processed_path)

    heatmap = density_to_heatmap(density, image.size)
    heatmap.save(heatmap_path)
    Image.blend(image, heatmap, alpha=0.45).save(overlay_path)

    return {
        "density_npy": str(density_path),
        "processed_image": str(processed_path),
        "density_heatmap": str(heatmap_path),
        "density_overlay": str(overlay_path),
    }


def density_to_heatmap(density: np.ndarray, size: tuple[int, int]) -> Image.Image:
    """Log-scale density for display and fade low-density areas to black."""

    values = np.log1p(np.maximum(density, 0.0))
    if values.max() > values.min():
        values = (values - values.min()) / (values.max() - values.min())
    else:
        values = np.zeros_like(values)

    rgb = np.zeros((*values.shape, 3), dtype=np.uint8)
    rgb[..., 0] = np.clip(255 * values, 0, 255).astype(np.uint8)
    rgb[..., 1] = np.clip(255 * (1.0 - np.abs(values - 0.5) * 2.0), 0, 255).astype(np.uint8)
    rgb[..., 2] = np.clip(255 * (1.0 - values), 0, 255).astype(np.uint8)
    heatmap = Image.fromarray(rgb, mode="RGB").resize(size, Image.Resampling.BILINEAR)

    alpha = Image.fromarray(np.clip(values * 220, 0, 220).astype(np.uint8), mode="L")
    alpha = alpha.resize(size, Image.Resampling.BILINEAR)
    black = Image.new("RGB", size, (0, 0, 0))
    return Image.composite(heatmap, black, alpha)


def write_result(output_dir: Path, result: dict[str, object]) -> Path:
    """Write the per-image result JSON and return its path."""

    output_dir.mkdir(parents=True, exist_ok=True)
    result_path = output_dir / "result.json"
    write_json(result_path, result)
    return result_path


def count_image(
    counter: LoadedClipEbcCounter,
    image: Image.Image,
    stride: int = 224,
    output_dir: Path | None = None,
    image_ref: str | None = None,
    preprocess: dict[str, object] | None = None,
    metadata: dict[str, object] | None = None,
    write_result_json: bool = False,
) -> CountOutput:
    """Sum density pixels into a visible-person estimate.

    Optionally save visualizations and a JSON result for later review.
    """

    density_tensor = predict_count(counter.model, image, counter.spec, counter.device, stride)
    density = density_tensor.squeeze().numpy()
    count = float(density.sum())
    artifacts = save_density_outputs(output_dir, image, density) if output_dir is not None else {}
    result = {
        "image": image_ref,
        "repo_dir": rel_or_abs(counter.repo_dir),
        "checkpoint": rel_or_abs(counter.checkpoint),
        "count": count,
        "rounded_count": int(round(count)),
        "density_shape": list(density.shape),
        "device": str(counter.device),
        "stride": stride,
        "model": asdict(counter.spec),
        "preprocess": preprocess or {},
        "artifacts": artifacts,
    }
    if metadata:
        result["metadata"] = metadata

    result_path = write_result(output_dir, result) if output_dir is not None and write_result_json else None
    return CountOutput(
        count=count,
        rounded_count=int(round(count)),
        density=density,
        artifacts=artifacts,
        metadata=metadata or {},
        result=result,
        result_path=result_path,
    )


def write_json(path: Path, payload: dict[str, object]) -> None:
    """Write indented UTF-8 JSON with a trailing newline."""

    with path.open("w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
        f.write("\n")


def rel_or_abs(path: Path) -> str:
    """Use a working-directory-relative path in reports when possible."""

    try:
        return str(path.resolve().relative_to(Path.cwd().resolve()))
    except ValueError:
        return str(path.resolve())


def main() -> None:
    """Run the single-image CLI and print the count and result path."""

    args = parse_args()
    repo_dir = args.repo_dir.resolve()

    checkpoint = args.checkpoint.resolve() if args.checkpoint else find_checkpoint(repo_dir).resolve()
    output_dir = args.output_dir / args.image.stem / checkpoint.parent.name / checkpoint.stem

    image, preprocess = preprocess_image(args)
    counter = load_counter(repo_dir, checkpoint, args.device)
    output = count_image(
        counter,
        image,
        stride=args.stride,
        output_dir=output_dir,
        image_ref=rel_or_abs(args.image),
        preprocess=preprocess,
        write_result_json=True,
    )

    print(
        json.dumps(
            {
                "count": output.count,
                "rounded_count": output.rounded_count,
                "result_json": str(output.result_path),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
