#!/usr/bin/env python3
"""Study visible protest crowd estimates from YouTube protest videos.

This script is a local analysis wrapper around the CLIP-EBC crowd-counting
model. It is designed for long livestream/protest videos where only some
frames are useful for crowd estimation. The output is a reproducible run
directory with machine-readable JSON/CSV, frame artifacts, density maps, and a
Markdown report.

Important interpretation rule:
    All counts are instantaneous visible crowd estimates for the camera view at
    a sampled moment. They are not unique attendee totals. If a camera pans
    across the same people twice, this script does not identify or de-duplicate
    those people across time.

Common usage:
    Selected-frame peak study, using the default start at 20:00:
        python study_youtube_crowd_clip_ebc.py \
          --url https://www.youtube.com/watch?v=VIDEO_ID \
          --output-dir outputs/protesta_27

    Chronological scene-aware timeline:
        python study_youtube_crowd_clip_ebc.py \
          --url https://www.youtube.com/watch?v=VIDEO_ID \
          --analysis-mode scenes \
          --scene-sample-every 10 \
          --output-dir outputs/protesta_27

Time window logic:
    - If --start is provided, it is authoritative.
    - If --start is omitted, analysis starts at 20:00 by default.
    - YouTube URL time parameters such as t=9524s, start=, or
      time_continue= are intentionally ignored by the analysis window.
    - --end and --duration are optional. If neither is provided, the script
      analyzes from the resolved start time to the video end.
    - In scenes mode, an active livestream is frozen at the live edge observed
      at startup, downloaded from the beginning, and then processed immediately.

Mode 1: selected-frame analysis (default)
    This mode is optimized for estimating peak/typical visible crowd size from
    the best crowd-like frames in a long video.

    Pipeline:
        1. Resolve the YouTube media URL with yt-dlp.
        2. Extract --candidate-frames uniformly from the selected time window
           with ffmpeg. The default is 1000 candidates.
        3. Score each candidate with cheap image heuristics:
           brightness, contrast, entropy, sharpness, texture spread, and
           near-duplicate suppression.
        4. Reject obviously bad frames before model inference, including dark
           frames, blurry frames, low-entropy graphics/title cards, sparse or
           extreme closeups, and near duplicates.
        5. Count ranked candidates with the CLIP-EBC checkpoints, stopping when
           --frames retained frames meet --min-count, or when candidates are
           exhausted. Defaults are 100 retained frames and min count 100.
        6. Report headline statistics over retained frames only.

    This mode intentionally favors good crowd views. It is appropriate for a
    peak visible crowd estimate, not for a chronological time series.

Mode 2: scene-aware timeline analysis (--analysis-mode scenes)
    This mode is optimized for understanding how visible crowd estimates evolve
    across the livestream.

    Pipeline:
        1. Resolve YouTube metadata with yt-dlp.
        2. Download/cache the highest available video-only source stream under
           the run directory as source_video.*. This local source is the default
           frame source for CLIP-EBC counting. After a successful run it is
           deleted by default to save disk space; pass --keep-source-video to
           retain it for reruns.
        3. Build a small local ffmpeg analysis proxy from the source video under
           the run directory. By default this is 1 fps and 426 px wide, because
           it is only used for scene detection and cheap visual classification.
        4. Run PySceneDetect on the proxy using --scene-detector adaptive by
           default. The content detector is also available.
        5. Probe each scene with a few lightweight proxy frames and classify it as
           wide_crowd_candidate, moving_crowd_candidate, closeup_or_sparse,
           graphic_or_low_entropy, or dark_or_blurry.
        6. Skip non-crowd scenes for model inference, but keep them in the
           scene report with a reason.
        7. For countable crowd scenes, sample timestamps chronologically every
           --scene-sample-every seconds. By default, extract those frames from
           the high-quality local source video and run CLIP-EBC on them.
           --count-frame-source proxy is available only as a faster/less
           accurate fallback.
        8. Write a chronological timeline and per-scene peak/median/mean
           visible-count summaries.

    In scenes mode, --candidate-frames does not control counting density. Use
    --scene-sample-every to choose the time resolution.

Counting model behavior:
    Each counted frame is processed by one or more CLIP-EBC checkpoints. By
    default the script runs both top local checkpoints:
        - best_rmse.pth
        - best_mae.pth

    The per-frame estimate is the mean of checkpoint counts. The min/max
    checkpoint counts are recorded as a simple disagreement range.

Artifacts and reports:
    Selected-frame mode writes:
        - report.md
        - run_metadata.json
        - study_results.json
        - per-frame frame.jpg, density.npy, density_heatmap.png,
          density_overlay.png, result.json

    Scenes mode writes:
        - report.md and scene_report.md
        - run_metadata.json
        - scenes.json
        - timeline.json
        - timeline.csv
        - source_video.*, the high-quality video stream used for default
          scene-mode frame extraction/counting. This file is temporary by
          default and is deleted after successful processing unless
          --keep-source-video is set.
        - analysis_proxy.mp4, the small proxy used only for scene detection and
          scene classification by default
        - per-counted-frame frame/density artifacts

Resume behavior:
    The script reuses existing per-frame result.json files when rerun into the
    same output directory, as long as the min-count threshold and checkpoint
    labels match. This prevents unnecessary model inference on already-counted
    frames.
    In scenes mode, failed runs keep source_video.* and any .part download so
    the next run can resume. Successful runs delete source_video.* by default;
    use --keep-source-video if you plan to rerun without redownloading.

Operational notes:
    - URLs containing '&' must be quoted in the shell, or pass the base YouTube
      URL and use --start explicitly.
    - ffmpeg and ffprobe must be available on PATH.
    - The intended Python environment is the local pyenv environment named
      clip-ebc-crowd.
    - The script can be slow on CPU because each frame is counted with
      sliding-window CLIP-EBC inference.
    - For highest accuracy in scenes mode, keep the default
      --count-frame-source source and --count-frame-max-width 0. This means the
      model sees extracted frames at the source video's native resolution.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import math
import os
import re
import shutil
import statistics
import subprocess
import time
from collections import Counter
from dataclasses import asdict, dataclass
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import numpy as np
from PIL import Image

try:
    from tqdm.auto import tqdm
except ModuleNotFoundError:
    tqdm = None

from count_crowd_clip_ebc import (
    LoadedClipEbcCounter,
    count_image,
    load_counter,
    rel_or_abs,
    save_density_outputs,
    write_json,
)


DEFAULT_REPO_DIR = Path("CLIP-EBC")
DEFAULT_CHECKPOINT_RELATIVE = [
    Path("checkpoints/nwpu/clip_vit_b_16_word_224_8_4_fine_1.0_dmcount/best_rmse.pth"),
    Path("checkpoints/nwpu/clip_vit_b_16_word_224_8_4_fine_1.0_dmcount/best_mae.pth"),
]
ARCHIVED_SOURCE_FORMAT_SPEC = (
    "399/"
    "bestvideo[height<=1080][protocol=https][vcodec!=none]/"
    "bestvideo[height<=1080][vcodec!=none]/"
    "best[height<=1080][vcodec!=none]"
)
LIVE_SOURCE_FORMAT_SPEC = "bestvideo[vcodec!=none]/best[vcodec!=none]/best"


class NullProgress:
    def __init__(self, total: int | None = None) -> None:
        self.n = 0
        self.total = total

    def __enter__(self) -> "NullProgress":
        return self

    def __exit__(self, _exc_type: object, _exc: object, _traceback: object) -> None:
        return None

    def update(self, amount: int = 1) -> None:
        self.n += amount

    def set_postfix(self, *_args: object, **_kwargs: object) -> None:
        return None


def progress_iter(iterable: object, **kwargs: object) -> object:
    if tqdm is None:
        return iterable
    return tqdm(iterable, **kwargs)


def progress_bar(**kwargs: object) -> object:
    if tqdm is None:
        return NullProgress(total=kwargs.get("total") if isinstance(kwargs.get("total"), int) else None)
    return tqdm(**kwargs)


@dataclass
class VideoInfo:
    source_url: str
    media_url: str
    title: str
    video_id: str
    duration: float | None
    webpage_url: str
    extractor: str
    http_headers: dict[str, str]
    live_status: str = "not_live"
    is_live: bool = False
    release_timestamp: float | None = None
    metadata_fetched_at: float | None = None


@dataclass
class CandidateFrame:
    index: int
    path: Path
    timestamp: float
    score: float
    sharpness: float
    brightness: float
    contrast: float
    entropy: float
    texture_spread: float
    perceptual_hash: int
    rejected: bool = False
    reject_reason: str | None = None
    rank: int | None = None

    def to_record(self) -> dict[str, object]:
        record = asdict(self)
        record["path"] = rel_or_abs(self.path)
        record["timestamp_hms"] = format_hms(self.timestamp)
        record["perceptual_hash"] = f"{self.perceptual_hash:016x}"
        return record


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sample likely wide crowd-shot frames from a YouTube video and count them with CLIP-EBC."
    )
    parser.add_argument("--url", required=True, help="YouTube URL to analyze.")
    parser.add_argument(
        "--analysis-mode",
        choices=["selected", "scenes"],
        default="selected",
        help="selected keeps the current ranked-frame workflow; scenes builds a chronological scene timeline.",
    )
    parser.add_argument("--frames", type=int, default=100, help="Target retained counted frames.")
    parser.add_argument(
        "--start",
        default=None,
        help="Window start: seconds, MM:SS, or HH:MM:SS. Defaults to 20:00; YouTube URL t= parameters are ignored.",
    )
    parser.add_argument("--end", default=None, help="Window end: seconds, MM:SS, or HH:MM:SS.")
    parser.add_argument("--duration", default=None, help="Window duration: seconds, MM:SS, or HH:MM:SS.")
    parser.add_argument("--candidate-frames", type=int, default=1000, help="Uniform candidate frames to extract.")
    parser.add_argument("--min-count", type=float, default=100.0, help="Minimum ensemble count retained in statistics.")
    parser.add_argument("--output-dir", type=Path, default=Path("outputs/youtube_crowd_study"))
    parser.add_argument("--device", default="auto", help="Device: auto, cuda, cuda:0, or cpu.")
    parser.add_argument("--repo-dir", type=Path, default=DEFAULT_REPO_DIR, help="CLIP-EBC repo directory.")
    parser.add_argument("--stride", type=int, default=224, help="CLIP-EBC sliding-window stride in pixels.")
    parser.add_argument("--scene-detector", choices=["adaptive", "content"], default="adaptive")
    parser.add_argument("--scene-sample-every", default="10", help="Seconds between counted frames in scenes mode.")
    parser.add_argument("--scene-min-len", default="5", help="Minimum scene length in seconds, MM:SS, or HH:MM:SS.")
    parser.add_argument("--scene-threshold", type=float, default=None, help="Override PySceneDetect threshold.")
    parser.add_argument("--scene-max-frames", type=int, default=None, help="Optional cap on model-counted scene frames.")
    parser.add_argument("--scene-proxy-fps", type=float, default=1.0, help="FPS for the local proxy used only by scenes mode.")
    parser.add_argument(
        "--scene-proxy-max-width",
        type=int,
        default=426,
        help="Maximum proxy width for scene detection/classification. Smaller is faster; counting uses source frames by default.",
    )
    parser.add_argument(
        "--rebuild-scene-proxy",
        action="store_true",
        help="Rebuild analysis_proxy.mp4 even when a matching cached proxy exists.",
    )
    parser.add_argument(
        "--redownload-source-video",
        action="store_true",
        help="Redownload the cached high-quality source video in scenes mode.",
    )
    parser.add_argument(
        "--keep-source-video",
        action="store_true",
        help="Keep the high-quality source_video.* after successful scenes-mode processing. Default deletes it to save disk.",
    )
    parser.add_argument(
        "--count-frame-source",
        choices=["source", "proxy"],
        default="source",
        help="Frame source for CLIP-EBC in scenes mode. Default source maximizes accuracy; proxy is faster but less accurate.",
    )
    parser.add_argument(
        "--count-frame-max-width",
        type=int,
        default=0,
        help="Downscale counted scene frames to this maximum width. Default 0 keeps native source resolution.",
    )
    parser.add_argument(
        "--count-frame-jpeg-quality",
        type=int,
        default=1,
        help="ffmpeg JPEG quality for counted scene frames, 1 best to 31 worst. Default 1.",
    )
    parser.add_argument(
        "--checkpoints",
        type=Path,
        nargs="+",
        default=None,
        help="One or more CLIP-EBC checkpoint paths. Defaults to best_rmse.pth and best_mae.pth.",
    )
    return parser.parse_args()


def parse_timestamp(value: str | int | float | None) -> float | None:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        if value < 0:
            raise ValueError("timestamps must be non-negative")
        return float(value)

    text = str(value).strip()
    if not text:
        raise ValueError("empty timestamp")
    if re.fullmatch(r"\d+(?:\.\d+)?", text):
        return float(text)

    parts = text.split(":")
    if len(parts) not in (2, 3):
        raise ValueError(f"invalid timestamp {value!r}; expected seconds, MM:SS, or HH:MM:SS")
    try:
        numbers = [float(part) for part in parts]
    except ValueError as exc:
        raise ValueError(f"invalid timestamp {value!r}") from exc

    if any(number < 0 for number in numbers):
        raise ValueError("timestamps must be non-negative")
    if len(parts) == 2:
        minutes, seconds = numbers
        if seconds >= 60:
            raise ValueError(f"invalid seconds field in {value!r}")
        return minutes * 60 + seconds

    hours, minutes, seconds = numbers
    if minutes >= 60 or seconds >= 60:
        raise ValueError(f"invalid minutes or seconds field in {value!r}")
    return hours * 3600 + minutes * 60 + seconds


def parse_youtube_time_param(value: str | None) -> float | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    if re.fullmatch(r"\d+(?:\.\d+)?s?", text):
        return float(text.removesuffix("s"))
    if ":" in text:
        return parse_timestamp(text)

    match = re.fullmatch(
        r"(?:(?P<hours>\d+(?:\.\d+)?)h)?(?:(?P<minutes>\d+(?:\.\d+)?)m)?(?:(?P<seconds>\d+(?:\.\d+)?)s)?",
        text,
    )
    if not match or not any(match.groupdict().values()):
        raise ValueError(f"invalid YouTube time parameter {value!r}")
    hours = float(match.group("hours") or 0.0)
    minutes = float(match.group("minutes") or 0.0)
    seconds = float(match.group("seconds") or 0.0)
    return hours * 3600 + minutes * 60 + seconds


def start_from_url(url: str) -> float | None:
    parsed = urlparse(url)
    query_params = parse_qs(parsed.query)
    fragment_params = parse_qs(parsed.fragment)
    for params in (query_params, fragment_params):
        for key in ("t", "start", "time_continue"):
            values = params.get(key)
            if values:
                return parse_youtube_time_param(values[0])
    return None


def resolve_start(args: argparse.Namespace) -> tuple[float, str]:
    if args.start is not None:
        start = parse_timestamp(args.start)
        if start is None:
            raise ValueError("--start could not be parsed")
        return start, "--start"
    return 20 * 60.0, "default_20m"


def format_hms(seconds: float) -> str:
    whole = int(max(0, round(seconds)))
    hours, remainder = divmod(whole, 3600)
    minutes, secs = divmod(remainder, 60)
    return f"{hours:02d}:{minutes:02d}:{secs:02d}"


def format_bytes(value: int) -> str:
    size = float(max(0, value))
    for unit in ("B", "KiB", "MiB", "GiB"):
        if size < 1024.0 or unit == "GiB":
            return f"{size:.1f} {unit}" if unit != "B" else f"{int(size)} {unit}"
        size /= 1024.0
    return f"{size:.1f} GiB"


def format_seconds_token(seconds: float) -> str:
    whole = int(max(0, round(seconds)))
    hours, remainder = divmod(whole, 3600)
    minutes, secs = divmod(remainder, 60)
    return f"{hours:02d}h{minutes:02d}m{secs:02d}s"


def slugify(value: str, fallback: str = "video") -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    return slug[:80] or fallback


def require_tool(name: str) -> None:
    if shutil.which(name) is None:
        raise RuntimeError(f"Required tool not found on PATH: {name}")


def youtube_auth_options() -> dict[str, object]:
    """Use explicitly selected credentials for both metadata and downloads."""
    options: dict[str, object] = {}
    player_client = os.environ.get("YOUTUBE_PLAYER_CLIENT", "").strip()
    if player_client:
        options["extractor_args"] = {"youtube": {"player_client": [player_client]}}
    node_path = os.environ.get("YOUTUBE_NODE_PATH", "").strip()
    if node_path:
        if not Path(node_path).is_file():
            raise ValueError(f"YouTube Node runtime does not exist: {node_path}")
        options["js_runtimes"] = {"node": {"path": node_path}}
    cookie_file = os.environ.get("YOUTUBE_COOKIES_FILE", "").strip()
    browser = os.environ.get("YOUTUBE_COOKIES_BROWSER", "").strip()
    if cookie_file and browser:
        raise ValueError("Set only one of YOUTUBE_COOKIES_FILE or YOUTUBE_COOKIES_BROWSER.")
    if cookie_file:
        path = Path(cookie_file).expanduser()
        if not path.is_file():
            raise ValueError(f"YouTube cookies file does not exist: {path}")
        options["cookiefile"] = str(path)
    if browser:
        # Browser name plus an optional profile (e.g. chrome:Profile 1).
        name, separator, profile = browser.partition(":")
        options["cookiesfrombrowser"] = (name, profile if separator else None)
    return options


def get_video_info(url: str) -> VideoInfo:
    try:
        import yt_dlp
    except ModuleNotFoundError as exc:
        raise RuntimeError(
            "yt-dlp is required for YouTube access. Install it in this environment with: python -m pip install yt-dlp"
        ) from exc

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "format": "bestvideo[height<=1080][vcodec!=none]/bestvideo[vcodec!=none]/best[height<=1080]/best",
    }
    ydl_opts.update(youtube_auth_options())
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
    metadata_fetched_at = time.time()

    if "entries" in info:
        entries = [entry for entry in info["entries"] if entry]
        if not entries:
            raise RuntimeError("yt-dlp returned no playable entries for the supplied URL.")
        info = entries[0]

    media_url = info.get("url") or choose_format_url(info)
    if not media_url:
        raise RuntimeError("Could not resolve a direct media URL from yt-dlp metadata.")

    return VideoInfo(
        source_url=url,
        media_url=media_url,
        title=info.get("title") or "Untitled video",
        video_id=info.get("id") or hashlib.sha1(url.encode("utf-8")).hexdigest()[:12],
        duration=float(info["duration"]) if info.get("duration") is not None else None,
        webpage_url=info.get("webpage_url") or url,
        extractor=info.get("extractor") or "unknown",
        http_headers={str(k): str(v) for k, v in (info.get("http_headers") or {}).items()},
        live_status=str(info.get("live_status") or "not_live"),
        is_live=bool(info.get("is_live") or info.get("live_status") == "is_live"),
        release_timestamp=(
            float(info["release_timestamp"]) if info.get("release_timestamp") is not None else None
        ),
        metadata_fetched_at=metadata_fetched_at,
    )


def choose_format_url(info: dict[str, object]) -> str | None:
    formats = []
    for item in info.get("formats") or []:
        if item.get("url") and item.get("vcodec") != "none":
            height = int(item.get("height") or 0)
            tbr = float(item.get("tbr") or 0.0)
            height_score = height if height <= 1080 else 0
            formats.append((height_score, height <= 1080, tbr, item["url"]))
    if not formats:
        return None
    formats.sort(reverse=True)
    return formats[0][3]


def local_video_from_path(template: VideoInfo, path: Path, duration: float | None = None) -> VideoInfo:
    return VideoInfo(
        source_url=template.source_url,
        media_url=str(path),
        title=template.title,
        video_id=template.video_id,
        duration=duration if duration is not None else template.duration,
        webpage_url=template.webpage_url,
        extractor="local",
        http_headers={},
        live_status=template.live_status,
        is_live=template.is_live,
        release_timestamp=template.release_timestamp,
        metadata_fetched_at=template.metadata_fetched_at,
    )


def source_file_identity(path: Path) -> dict[str, object]:
    stat = path.stat()
    return {
        "path": rel_or_abs(path),
        "bytes": stat.st_size,
        "mtime_ns": stat.st_mtime_ns,
    }


def read_json_file(path: Path) -> dict[str, object] | None:
    if not path.exists():
        return None
    try:
        with path.open("r", encoding="utf-8") as f:
            data = json.load(f)
    except (json.JSONDecodeError, OSError):
        return None
    return data if isinstance(data, dict) else None


def resolve_cached_path(path_text: object) -> Path | None:
    if not path_text:
        return None
    path = Path(str(path_text))
    if path.exists():
        return path
    cwd_path = Path.cwd() / path
    if cwd_path.exists():
        return cwd_path
    return None


class YtDlpProgressHook:
    def __init__(self, desc: str) -> None:
        self.desc = desc
        self.bar: object | None = None
        self.last_downloaded = 0

    def __call__(self, status: dict[str, object]) -> None:
        if tqdm is None:
            return
        state = status.get("status")
        if state == "downloading":
            total = status.get("total_bytes") or status.get("total_bytes_estimate")
            downloaded = int(status.get("downloaded_bytes") or 0)
            if self.bar is None:
                kwargs: dict[str, object] = {
                    "desc": self.desc,
                    "unit": "B",
                    "unit_scale": True,
                    "unit_divisor": 1024,
                }
                if total:
                    kwargs["total"] = int(total)
                self.bar = tqdm(**kwargs)
            elif total and getattr(self.bar, "total", None) != int(total):
                self.bar.total = int(total)
                self.bar.refresh()
            update_amount = max(0, downloaded - self.last_downloaded)
            if update_amount:
                self.bar.update(update_amount)
                self.last_downloaded = downloaded
        elif state == "finished":
            self.close()

    def close(self) -> None:
        if self.bar is not None:
            self.bar.close()
            self.bar = None


def live_snapshot_end(video: VideoInfo, observed_at: float | None = None) -> float:
    if not video.is_live:
        raise ValueError("A live snapshot end can only be calculated for an active livestream.")
    if video.release_timestamp is None:
        raise ValueError(
            "The livestream start time is unknown; pass --end or --duration to bound the live snapshot."
        )

    snapshot_at = observed_at if observed_at is not None else video.metadata_fetched_at
    if snapshot_at is None:
        snapshot_at = time.time()
    end = float(snapshot_at) - float(video.release_timestamp)
    if not math.isfinite(end) or end <= 0:
        raise ValueError("The livestream start time is invalid or still in the future.")
    return end


def freeze_live_fragment_factory(fragment_factory: object) -> object:
    if not callable(fragment_factory):
        return fragment_factory

    def snapshot_fragments(context: dict[str, object]) -> object:
        snapshot_count: int | None = None
        yielded = 0
        for fragment in fragment_factory(context):
            if snapshot_count is None:
                raw_count = fragment.get("fragment_count")
                try:
                    snapshot_count = int(raw_count)
                except (TypeError, ValueError) as exc:
                    raise RuntimeError(
                        "yt-dlp did not report the live fragment count needed to freeze the snapshot."
                    ) from exc
                if snapshot_count <= 0:
                    raise RuntimeError("yt-dlp reported an invalid live fragment count.")

            if yielded >= snapshot_count:
                return
            yield fragment
            yielded += 1
            if yielded >= snapshot_count:
                return

    return snapshot_fragments


def freeze_live_selected_format(format_info: dict[str, object]) -> dict[str, object]:
    requested_formats = format_info.get("requested_formats") or []
    selected_formats = requested_formats if requested_formats else [format_info]
    frozen = 0
    still_live = False
    for selected in selected_formats:
        still_live = still_live or bool(selected.get("is_live"))
        fragments = selected.get("fragments")
        if callable(fragments):
            selected["fragments"] = freeze_live_fragment_factory(fragments)
            frozen += 1
    if frozen == 0 and still_live:
        raise RuntimeError("yt-dlp selected a live format that cannot be downloaded from the start.")
    return format_info


def live_snapshot_format_selector(base_selector: object) -> object:
    def select_snapshot_formats(context: dict[str, object]) -> object:
        for format_info in base_selector(context):
            yield freeze_live_selected_format(format_info)

    return select_snapshot_formats


def source_video_format_spec(video: VideoInfo) -> str:
    return LIVE_SOURCE_FORMAT_SPEC if video.is_live else ARCHIVED_SOURCE_FORMAT_SPEC


def media_validation_points(duration: float | None, required_seek: float | None) -> list[float]:
    points = [0.0]
    if required_seek is not None and math.isfinite(required_seek) and required_seek > 0:
        points.append(required_seek)
    if duration is not None and math.isfinite(duration) and duration > 1:
        points.extend([duration / 2.0, max(0.0, duration - 2.0)])

    upper_bound = max(0.0, duration - 0.05) if duration is not None and math.isfinite(duration) else None
    normalized = []
    for point in points:
        bounded = min(point, upper_bound) if upper_bound is not None else point
        rounded = round(max(0.0, bounded), 3)
        if rounded not in normalized:
            normalized.append(rounded)
    return normalized


def validate_local_video(
    media_path: Path,
    duration: float | None = None,
    required_seek: float | None = None,
) -> tuple[bool, str | None]:
    if not media_path.exists() or media_path.stat().st_size <= 0:
        return False, "media file is missing or empty"

    for timestamp in media_validation_points(duration, required_seek):
        cmd = [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-xerror",
            "-ss",
            f"{timestamp:.3f}",
            "-i",
            str(media_path),
            "-map",
            "0:v:0",
            "-frames:v",
            "1",
            "-f",
            "md5",
            "-",
        ]
        proc = subprocess.run(cmd, text=True, capture_output=True, check=False)
        digest = proc.stdout.strip()
        empty_digest = "MD5=d41d8cd98f00b204e9800998ecf8427e"
        if proc.returncode != 0 or not digest.startswith("MD5=") or digest == empty_digest:
            detail = proc.stderr.strip().splitlines()
            suffix = f": {detail[-1]}" if detail else ""
            return False, f"no decodable video frame at {timestamp:.3f}s{suffix}"
    return True, None


def quarantine_media_artifacts(run_dir: Path, paths: list[Path], reason: str) -> Path | None:
    existing = []
    resolved_run_dir = run_dir.resolve()
    for path in paths:
        if not path.exists():
            continue
        resolved_path = path.resolve()
        try:
            resolved_path.relative_to(resolved_run_dir)
        except ValueError as exc:
            raise RuntimeError(f"Refusing to quarantine media outside run directory: {path}") from exc
        if resolved_path not in existing:
            existing.append(resolved_path)
    if not existing:
        return None

    quarantine_root = run_dir / "quarantine"
    timestamp = time.strftime("%Y%m%d-%H%M%S")
    quarantine_dir = quarantine_root / timestamp
    counter = 1
    while quarantine_dir.exists():
        counter += 1
        quarantine_dir = quarantine_root / f"{timestamp}-{counter}"
    quarantine_dir.mkdir(parents=True, exist_ok=False)

    moved = []
    for path in existing:
        destination = quarantine_dir / path.name
        path.replace(destination)
        moved.append(rel_or_abs(destination))
    write_json(
        quarantine_dir / "quarantine.json",
        {
            "reason": reason,
            "quarantined_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "files": moved,
        },
    )
    return quarantine_dir


def load_cached_source_video(
    video: VideoInfo,
    run_dir: Path,
    validation_timestamp: float | None = None,
) -> tuple[VideoInfo, dict[str, object]] | None:
    metadata_path = run_dir / "source_video.json"
    metadata = read_json_file(metadata_path)
    if not metadata:
        return None
    if metadata.get("video_id") != video.video_id or metadata.get("webpage_url") != video.webpage_url:
        return None

    source_path = resolve_cached_path(metadata.get("path"))
    if source_path is None or not source_path.exists() or source_path.stat().st_size <= 0:
        return None

    identity = source_file_identity(source_path)
    if int(metadata.get("bytes") or -1) != int(identity["bytes"]):
        return None
    if int(metadata.get("mtime_ns") or -1) != int(identity["mtime_ns"]):
        return None

    duration = float(metadata["duration"]) if metadata.get("duration") is not None else video.duration
    valid, reason = validate_local_video(source_path, duration, validation_timestamp)
    if not valid:
        quarantine_media_artifacts(
            run_dir,
            [
                source_path,
                metadata_path,
                run_dir / "analysis_proxy.mp4",
                run_dir / "analysis_proxy.json",
            ],
            f"cached source validation failed: {reason}",
        )
        return None

    local_video = local_video_from_path(video, source_path, duration)
    return local_video, metadata


def source_video_candidates(run_dir: Path) -> list[Path]:
    return sorted(
        (
            path
            for path in run_dir.glob("source_video.*")
            if path.is_file() and path.suffix not in {".json", ".part", ".ytdl"}
        ),
        key=lambda path: path.stat().st_mtime_ns,
        reverse=True,
    )


def cached_source_video_path(run_dir: Path, source_metadata: dict[str, object]) -> Path | None:
    path = resolve_cached_path(source_metadata.get("path"))
    if path is None:
        return None
    try:
        resolved_path = path.resolve()
        resolved_run_dir = run_dir.resolve()
        resolved_path.relative_to(resolved_run_dir)
    except (OSError, ValueError):
        return None
    if not resolved_path.name.startswith("source_video.") or resolved_path.suffix in {".json", ".part", ".ytdl"}:
        return None
    return resolved_path


def cleanup_cached_source_video(
    run_dir: Path,
    source_metadata: dict[str, object],
    keep_source_video: bool,
) -> dict[str, object]:
    cleanup: dict[str, object] = {
        "policy": "keep" if keep_source_video else "delete_after_success",
        "deleted": False,
        "path": source_metadata.get("path"),
    }
    if keep_source_video:
        cleanup["reason"] = "--keep-source-video was set"
        return cleanup

    path = cached_source_video_path(run_dir, source_metadata)
    if path is None:
        cleanup["reason"] = "source video path missing or outside run directory"
        return cleanup
    if not path.exists():
        cleanup["reason"] = "source video already absent"
        return cleanup

    try:
        stat = path.stat()
        path.unlink()
    except OSError as exc:
        cleanup["reason"] = f"delete failed: {exc}"
        return cleanup
    cleanup.update(
        {
            "deleted": True,
            "deleted_path": rel_or_abs(path),
            "deleted_bytes": stat.st_size,
            "deleted_mtime_ns": stat.st_mtime_ns,
            "deleted_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        }
    )
    return cleanup


def download_source_video(
    video: VideoInfo,
    run_dir: Path,
    redownload: bool = False,
    validation_timestamp: float | None = None,
) -> tuple[VideoInfo, dict[str, object]]:
    cached = None if redownload else load_cached_source_video(video, run_dir, validation_timestamp)
    if cached is not None:
        return cached

    try:
        import yt_dlp
    except ModuleNotFoundError as exc:
        raise RuntimeError(
            "yt-dlp is required for YouTube access. Install it in this environment with: python -m pip install yt-dlp"
        ) from exc

    run_dir.mkdir(parents=True, exist_ok=True)
    progress = YtDlpProgressHook("Downloading source video")
    format_spec = source_video_format_spec(video)
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        "continuedl": True,
        "overwrites": bool(redownload),
        "retries": 10,
        "fragment_retries": 10,
        "format": format_spec,
        "outtmpl": str(run_dir / "source_video.%(ext)s"),
        "progress_hooks": [progress],
    }
    ydl_opts.update(youtube_auth_options())
    if video.is_live:
        ydl_opts["live_from_start"] = True
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            if video.is_live:
                base_selector = ydl.build_format_selector(format_spec)
                ydl.format_selector = live_snapshot_format_selector(base_selector)
            info = ydl.extract_info(video.webpage_url or video.source_url, download=True)
    finally:
        progress.close()

    if "entries" in info:
        entries = [entry for entry in info["entries"] if entry]
        if not entries:
            raise RuntimeError("yt-dlp returned no downloadable entries for the supplied URL.")
        info = entries[0]

    requested_downloads = info.get("requested_downloads") or []
    downloaded_path = None
    for item in requested_downloads:
        filepath = item.get("filepath") or item.get("_filename")
        if filepath and Path(filepath).exists():
            downloaded_path = Path(filepath)
            break
    if downloaded_path is None:
        candidates = source_video_candidates(run_dir)
        if candidates:
            downloaded_path = candidates[0]
    if downloaded_path is None or not downloaded_path.exists():
        raise RuntimeError("yt-dlp completed but the downloaded source_video file could not be found.")

    downloaded_duration = probe_duration(str(downloaded_path), {})
    validation_duration = (
        downloaded_duration
        if downloaded_duration is not None
        else float(info["duration"])
        if info.get("duration") is not None
        else video.duration
    )
    valid, reason = validate_local_video(downloaded_path, validation_duration, validation_timestamp)
    if not valid:
        quarantine_dir = quarantine_media_artifacts(
            run_dir,
            [
                downloaded_path,
                run_dir / "source_video.json",
                run_dir / "analysis_proxy.mp4",
                run_dir / "analysis_proxy.json",
            ],
            f"downloaded source validation failed: {reason}",
        )
        location = f" Quarantined at {rel_or_abs(quarantine_dir)}." if quarantine_dir is not None else ""
        raise RuntimeError(f"Downloaded source video is not seekable/decodable: {reason}.{location}")
    identity = source_file_identity(downloaded_path)
    metadata = {
        "path": identity["path"],
        "bytes": identity["bytes"],
        "mtime_ns": identity["mtime_ns"],
        "source_url": video.source_url,
        "webpage_url": video.webpage_url,
        "video_id": video.video_id,
        "title": video.title,
        "duration": (
            validation_duration
        ),
        "live_status": video.live_status,
        "live_snapshot": video.is_live,
        "live_release_timestamp": video.release_timestamp,
        "live_snapshot_at": video.metadata_fetched_at if video.is_live else None,
        "format_id": info.get("format_id"),
        "format_note": info.get("format_note"),
        "ext": info.get("ext"),
        "width": info.get("width"),
        "height": info.get("height"),
        "fps": info.get("fps"),
        "vcodec": info.get("vcodec"),
        "dynamic_range": info.get("dynamic_range"),
    }
    write_json(run_dir / "source_video.json", metadata)
    local_video = local_video_from_path(video, downloaded_path, float(metadata["duration"]) if metadata.get("duration") is not None else video.duration)
    return local_video, metadata


def ffmpeg_header_args(headers: dict[str, str]) -> list[str]:
    if not headers:
        return []
    header_blob = "".join(f"{key}: {value}\r\n" for key, value in headers.items())
    return ["-headers", header_blob]


def run_command(cmd: list[str]) -> str:
    proc = subprocess.run(cmd, text=True, capture_output=True, check=False)
    if proc.returncode != 0:
        stderr = proc.stderr.strip()
        raise RuntimeError(f"Command failed ({cmd[0]} exit {proc.returncode}): {stderr[-4000:]}")
    return proc.stdout


def parse_ffmpeg_progress_seconds(line: str) -> float | None:
    key, separator, value = line.strip().partition("=")
    if separator != "=":
        return None
    if key == "out_time_ms":
        try:
            return float(value) / 1_000_000.0
        except ValueError:
            return None
    if key == "out_time":
        try:
            return parse_timestamp(value)
        except ValueError:
            return None
    return None


def run_ffmpeg_with_progress(cmd: list[str], total_seconds: float | None, desc: str) -> str:
    if not cmd or Path(cmd[0]).name != "ffmpeg" or tqdm is None or not total_seconds or total_seconds <= 0:
        return run_command(cmd)

    progress_cmd = [cmd[0], "-progress", "pipe:1", "-nostats", *cmd[1:]]
    proc = subprocess.Popen(progress_cmd, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    stdout_lines: list[str] = []
    last_seconds = 0.0
    with tqdm(total=total_seconds, desc=desc, unit="s") as progress:
        assert proc.stdout is not None
        for line in proc.stdout:
            stdout_lines.append(line)
            seconds = parse_ffmpeg_progress_seconds(line)
            if seconds is None:
                continue
            seconds = min(max(seconds, last_seconds), total_seconds)
            progress.update(seconds - last_seconds)
            last_seconds = seconds
    return_code = proc.wait()
    if return_code != 0:
        stderr = "".join(stdout_lines).strip()
        raise RuntimeError(f"Command failed ({cmd[0]} exit {return_code}): {stderr[-4000:]}")
    return "".join(stdout_lines)


def probe_duration(media_url: str, headers: dict[str, str]) -> float | None:
    cmd = [
        "ffprobe",
        "-v",
        "error",
        *ffmpeg_header_args(headers),
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        media_url,
    ]
    output = run_command(cmd).strip()
    try:
        duration = float(output)
    except ValueError:
        return None
    return duration if math.isfinite(duration) and duration > 0 else None


def resolve_window(args: argparse.Namespace, video_duration: float | None) -> tuple[float, float]:
    start, _start_source = resolve_start(args)
    end = parse_timestamp(args.end)
    duration = parse_timestamp(args.duration)
    if args.end is not None and args.duration is not None:
        raise ValueError("Use either --end or --duration, not both.")
    if duration is not None:
        end = start + duration
    elif end is None:
        if video_duration is None:
            raise ValueError("Video duration is unknown; pass --end or --duration.")
        end = video_duration

    if start < 0 or end <= start:
        raise ValueError("--end/--duration must produce a positive window after --start.")
    if video_duration is not None:
        end = min(end, video_duration)
        if start >= video_duration:
            raise ValueError(f"--start {format_hms(start)} is beyond video duration {format_hms(video_duration)}.")
    return float(start), float(end)


def make_run_dir(
    output_dir: Path,
    video: VideoInfo,
    start: float,
    end: float,
    candidate_frames: int,
    min_count: float,
    analysis_mode: str = "selected",
    live_snapshot: bool = False,
) -> Path:
    title_token = slugify(video.title, fallback="video")
    min_count_token = str(min_count).replace(".", "p")
    mode_suffix = "" if analysis_mode == "selected" else f"_{analysis_mode}"
    end_token = "live-snapshot" if live_snapshot else format_seconds_token(end)
    run_name = (
        f"{video.video_id}_{title_token}_"
        f"{format_seconds_token(start)}-{end_token}_"
        f"cand{candidate_frames}_min{min_count_token}{mode_suffix}"
    )
    return output_dir / run_name


def extract_candidate_frames(
    video: VideoInfo,
    start: float,
    end: float,
    candidate_frames: int,
    candidate_dir: Path,
    show_progress: bool = True,
    progress_desc: str = "Extracting candidate frames",
) -> tuple[list[Path], list[float]]:
    require_tool("ffmpeg")
    if candidate_frames <= 0:
        raise ValueError("--candidate-frames must be positive")

    candidate_dir.mkdir(parents=True, exist_ok=True)
    for old_frame in candidate_dir.glob("candidate_*.jpg"):
        old_frame.unlink()

    window_duration = end - start
    fps = candidate_frames / window_duration
    output_pattern = candidate_dir / "candidate_%05d.jpg"
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "error",
        *ffmpeg_header_args(video.http_headers),
        "-ss",
        f"{start:.3f}",
        "-i",
        video.media_url,
        "-t",
        f"{window_duration:.3f}",
        "-vf",
        f"fps={fps:.8f},scale='min(1280,iw)':-2",
        "-frames:v",
        str(candidate_frames),
        "-q:v",
        "2",
        str(output_pattern),
    ]
    if show_progress:
        run_ffmpeg_with_progress(cmd, window_duration, progress_desc)
    else:
        run_command(cmd)

    paths = sorted(candidate_dir.glob("candidate_*.jpg"))
    timestamps = estimate_candidate_timestamps(start, end, len(paths), candidate_frames)
    return paths, timestamps


def estimate_candidate_timestamps(start: float, end: float, actual_count: int, target_count: int) -> list[float]:
    if actual_count <= 0:
        return []
    interval = (end - start) / max(target_count, actual_count, 1)
    return [start + index * interval for index in range(actual_count)]


def load_candidate_manifest(manifest_path: Path, url: str, start: float, end: float, candidate_frames: int) -> tuple[list[Path], list[float]] | None:
    if not manifest_path.exists():
        return None
    try:
        with manifest_path.open("r", encoding="utf-8") as f:
            manifest = json.load(f)
    except (json.JSONDecodeError, OSError):
        return None
    if (
        manifest.get("source_url") != url
        or float(manifest.get("window_start", -1)) != float(start)
        or float(manifest.get("window_end", -1)) != float(end)
        or int(manifest.get("candidate_frames_target", -1)) != int(candidate_frames)
    ):
        return None
    candidates = manifest.get("candidates") or []
    paths = [Path(item["path"]) for item in candidates if item.get("path")]
    timestamps = [float(item["timestamp"]) for item in candidates if item.get("timestamp") is not None]
    if len(paths) != len(timestamps) or not paths or not all(path.exists() for path in paths):
        return None
    return paths, timestamps


def write_candidate_manifest(
    manifest_path: Path,
    video: VideoInfo,
    start: float,
    end: float,
    candidate_frames: int,
    paths: list[Path],
    timestamps: list[float],
) -> None:
    write_json(
        manifest_path,
        {
            "source_url": video.source_url,
            "webpage_url": video.webpage_url,
            "video_id": video.video_id,
            "title": video.title,
            "window_start": start,
            "window_start_hms": format_hms(start),
            "window_end": end,
            "window_end_hms": format_hms(end),
            "candidate_frames_target": candidate_frames,
            "candidate_frames_extracted": len(paths),
            "candidates": [
                {"index": index + 1, "path": rel_or_abs(path), "timestamp": timestamps[index], "timestamp_hms": format_hms(timestamps[index])}
                for index, path in enumerate(paths)
            ],
        },
    )


def analyze_candidate_image(path: Path, index: int, timestamp: float) -> CandidateFrame:
    with Image.open(path) as image:
        image = image.convert("RGB")
        image.thumbnail((320, 320))
        rgb = np.asarray(image, dtype=np.float32)

    gray = rgb[..., 0] * 0.299 + rgb[..., 1] * 0.587 + rgb[..., 2] * 0.114
    gray01 = gray / 255.0
    brightness = float(gray01.mean())
    contrast = float(gray01.std())
    entropy = grayscale_entropy(gray)
    edge = gradient_magnitude(gray01)
    sharpness = float(edge.mean())
    texture_spread = texture_spread_score(edge)
    perceptual_hash = average_hash(gray)
    score = candidate_score(brightness, contrast, entropy, sharpness, texture_spread)
    reject_reason = heuristic_reject_reason(brightness, contrast, entropy, sharpness, texture_spread)

    return CandidateFrame(
        index=index,
        path=path,
        timestamp=timestamp,
        score=score,
        sharpness=sharpness,
        brightness=brightness,
        contrast=contrast,
        entropy=entropy,
        texture_spread=texture_spread,
        perceptual_hash=perceptual_hash,
        rejected=reject_reason is not None,
        reject_reason=reject_reason,
    )


def grayscale_entropy(gray: np.ndarray) -> float:
    hist, _ = np.histogram(gray, bins=64, range=(0, 255))
    total = hist.sum()
    if total <= 0:
        return 0.0
    probabilities = hist[hist > 0] / total
    return float(-(probabilities * np.log2(probabilities)).sum())


def gradient_magnitude(gray01: np.ndarray) -> np.ndarray:
    dx = np.zeros_like(gray01)
    dy = np.zeros_like(gray01)
    dx[:, 1:] = np.abs(gray01[:, 1:] - gray01[:, :-1])
    dy[1:, :] = np.abs(gray01[1:, :] - gray01[:-1, :])
    return np.sqrt(dx * dx + dy * dy)


def texture_spread_score(edge: np.ndarray, grid: int = 8) -> float:
    height, width = edge.shape
    if height < grid or width < grid:
        return 0.0
    active = 0
    total = 0
    for row in range(grid):
        y0 = row * height // grid
        y1 = (row + 1) * height // grid
        for col in range(grid):
            x0 = col * width // grid
            x1 = (col + 1) * width // grid
            total += 1
            if float(edge[y0:y1, x0:x1].mean()) >= 0.025:
                active += 1
    return active / total if total else 0.0


def average_hash(gray: np.ndarray) -> int:
    image = Image.fromarray(np.clip(gray, 0, 255).astype(np.uint8), mode="L").resize((8, 8), Image.Resampling.BILINEAR)
    values = np.asarray(image, dtype=np.float32)
    mean = float(values.mean())
    bits = values > mean
    value = 0
    for bit in bits.flatten():
        value = (value << 1) | int(bool(bit))
    return value


def hamming_distance(left: int, right: int) -> int:
    return int((left ^ right).bit_count())


def candidate_score(brightness: float, contrast: float, entropy: float, sharpness: float, texture_spread: float) -> float:
    brightness_quality = max(0.0, 1.0 - abs(brightness - 0.48) / 0.48)
    contrast_quality = min(1.0, contrast / 0.25)
    entropy_quality = min(1.0, entropy / 5.5)
    sharpness_quality = min(1.0, sharpness / 0.08)
    texture_quality = min(1.0, texture_spread / 0.75)
    return float(
        0.25 * texture_quality
        + 0.25 * entropy_quality
        + 0.20 * sharpness_quality
        + 0.15 * brightness_quality
        + 0.15 * contrast_quality
    )


def heuristic_reject_reason(
    brightness: float,
    contrast: float,
    entropy: float,
    sharpness: float,
    texture_spread: float,
) -> str | None:
    if brightness < 0.06:
        return "near_black"
    if brightness > 0.94 and contrast < 0.04:
        return "near_white"
    if contrast < 0.025:
        return "low_contrast"
    if sharpness < 0.010:
        return "blurred"
    if entropy < 2.4:
        return "low_entropy_graphic"
    if texture_spread < 0.08:
        return "sparse_or_extreme_closeup"
    return None


def rank_candidate_frames(
    frame_paths: list[Path],
    timestamps: list[float],
    duplicate_threshold: int = 5,
    show_progress: bool = False,
) -> tuple[list[CandidateFrame], list[CandidateFrame]]:
    if len(frame_paths) != len(timestamps):
        raise ValueError("frame path and timestamp counts do not match")

    indexed_paths = list(enumerate(frame_paths))
    if show_progress:
        indexed_paths = progress_iter(indexed_paths, desc="Scoring candidate frames", unit="frame", total=len(indexed_paths))
    scored = [analyze_candidate_image(path, index + 1, timestamps[index]) for index, path in indexed_paths]
    rejected = [candidate for candidate in scored if candidate.rejected]
    viable = sorted((candidate for candidate in scored if not candidate.rejected), key=lambda item: item.score, reverse=True)

    ranked: list[CandidateFrame] = []
    accepted_hashes: list[int] = []
    for candidate in viable:
        duplicate = any(hamming_distance(candidate.perceptual_hash, seen_hash) <= duplicate_threshold for seen_hash in accepted_hashes)
        if duplicate:
            candidate.rejected = True
            candidate.reject_reason = "near_duplicate"
            rejected.append(candidate)
            continue
        candidate.rank = len(ranked) + 1
        ranked.append(candidate)
        accepted_hashes.append(candidate.perceptual_hash)
    return ranked, rejected


def extract_analysis_proxy(
    video: VideoInfo,
    start: float,
    end: float,
    run_dir: Path,
    proxy_fps: float = 1.0,
    proxy_max_width: int = 426,
    rebuild: bool = False,
) -> Path:
    require_tool("ffmpeg")
    proxy_path = run_dir / "analysis_proxy.mp4"
    metadata_path = run_dir / "analysis_proxy.json"
    source_identity = source_file_identity(Path(video.media_url)) if Path(video.media_url).exists() else {
        "path": video.media_url,
        "bytes": None,
        "mtime_ns": None,
    }
    expected_metadata = {
        "source_path": source_identity["path"],
        "source_bytes": source_identity["bytes"],
        "source_mtime_ns": source_identity["mtime_ns"],
        "window_start": start,
        "window_end": end,
        "proxy_fps": proxy_fps,
        "proxy_max_width": proxy_max_width,
    }
    metadata = read_json_file(metadata_path)
    matching_cached_proxy = (
        not rebuild
        and proxy_path.exists()
        and proxy_path.stat().st_size > 0
        and metadata is not None
        and all(metadata.get(key) == value for key, value in expected_metadata.items())
    )
    if matching_cached_proxy:
        valid, reason = validate_local_video(proxy_path, end - start, (end - start) / 2.0)
        if valid:
            return proxy_path
        quarantine_media_artifacts(
            run_dir,
            [proxy_path, metadata_path],
            f"cached analysis proxy validation failed: {reason}",
        )
    if proxy_path.exists():
        proxy_path.unlink()

    vf = f"fps={proxy_fps:.8f},scale='min({proxy_max_width},iw)':-2"
    cmd = [
        "ffmpeg",
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        *ffmpeg_header_args(video.http_headers),
        "-ss",
        f"{start:.3f}",
        "-i",
        video.media_url,
        "-t",
        f"{end - start:.3f}",
        "-vf",
        vf,
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "ultrafast",
        "-crf",
        "35",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(proxy_path),
    ]
    try:
        run_ffmpeg_with_progress(cmd, end - start, "Building scene analysis proxy")
    except Exception:
        quarantine_media_artifacts(
            run_dir,
            [proxy_path, metadata_path],
            "analysis proxy ffmpeg command failed",
        )
        raise
    valid, reason = validate_local_video(proxy_path, end - start, (end - start) / 2.0)
    if not valid:
        quarantine_dir = quarantine_media_artifacts(
            run_dir,
            [proxy_path, metadata_path],
            f"generated analysis proxy validation failed: {reason}",
        )
        location = f" Quarantined at {rel_or_abs(quarantine_dir)}." if quarantine_dir is not None else ""
        raise RuntimeError(f"Generated analysis proxy is invalid: {reason}.{location}")
    proxy_identity = source_file_identity(proxy_path)
    proxy_metadata = {
        **expected_metadata,
        "path": proxy_identity["path"],
        "bytes": proxy_identity["bytes"],
        "mtime_ns": proxy_identity["mtime_ns"],
        "description": "Low-resolution local proxy for scene detection/classification only.",
    }
    write_json(metadata_path, proxy_metadata)
    return proxy_path


def build_scene_detector(name: str, min_scene_len: float, threshold: float | None) -> object:
    try:
        from scenedetect import AdaptiveDetector, ContentDetector
    except ModuleNotFoundError as exc:
        raise RuntimeError(
            "scenedetect-headless is required for --analysis-mode scenes. "
            "Install it with: python -m pip install 'scenedetect-headless<0.8'"
        ) from exc

    min_len = f"{min_scene_len:.3f}s"
    if name == "content":
        kwargs: dict[str, object] = {"min_scene_len": min_len}
        if threshold is not None:
            kwargs["threshold"] = threshold
        return ContentDetector(**kwargs)

    kwargs = {"min_scene_len": min_len}
    if threshold is not None:
        kwargs["adaptive_threshold"] = threshold
    return AdaptiveDetector(**kwargs)


def detect_scene_records(
    proxy_path: Path,
    window_start: float,
    window_end: float,
    detector_name: str,
    min_scene_len: float,
    threshold: float | None,
    run_dir: Path,
) -> tuple[list[dict[str, object]], str]:
    try:
        from scenedetect import detect

        detector = build_scene_detector(detector_name, min_scene_len, threshold)
        scene_list = detect(str(proxy_path), detector, show_progress=True)
        scenes = []
        for index, (scene_start, scene_end) in enumerate(scene_list, start=1):
            rel_start = float(scene_start.seconds)
            rel_end = float(scene_end.seconds)
            abs_start = min(window_end, window_start + rel_start)
            abs_end = min(window_end, window_start + rel_end)
            if abs_end <= abs_start:
                continue
            scenes.append(make_scene_record(index, abs_start, abs_end, rel_start, rel_end, "detected"))
        if scenes:
            return scenes, "detected"
    except Exception:
        pass

    return fallback_scene_records(window_start, window_end, min_scene_len), "fallback_uniform"


def make_scene_record(
    scene_id: int,
    start: float,
    end: float,
    start_relative: float,
    end_relative: float,
    source: str,
) -> dict[str, object]:
    return {
        "scene_id": scene_id,
        "start": start,
        "end": end,
        "duration": end - start,
        "start_relative": start_relative,
        "end_relative": end_relative,
        "start_hms": format_hms(start),
        "end_hms": format_hms(end),
        "source": source,
        "scene_type": None,
        "skip_reason": None,
        "probe_frames": [],
        "counted_frames": [],
        "stats": {},
    }


def fallback_scene_records(window_start: float, window_end: float, min_scene_len: float) -> list[dict[str, object]]:
    chunk = max(60.0, min_scene_len)
    scenes = []
    cursor = window_start
    scene_id = 1
    while cursor < window_end:
        scene_end = min(window_end, cursor + chunk)
        scenes.append(make_scene_record(scene_id, cursor, scene_end, cursor - window_start, scene_end - window_start, "fallback_uniform"))
        cursor = scene_end
        scene_id += 1
    return scenes


def probe_scene(video_path: Path, scene: dict[str, object], probe_dir: Path) -> list[CandidateFrame]:
    start_relative = float(scene["start_relative"])
    end_relative = float(scene["end_relative"])
    duration = max(0.0, end_relative - start_relative)
    probes = 1 if duration < 6 else 3
    local_video = VideoInfo(
        source_url=str(video_path),
        media_url=str(video_path),
        title="analysis proxy",
        video_id="analysis_proxy",
        duration=None,
        webpage_url=str(video_path),
        extractor="local",
        http_headers={},
    )
    paths, rel_timestamps = extract_candidate_frames(
        local_video,
        start_relative,
        end_relative,
        probes,
        probe_dir,
        show_progress=False,
    )
    absolute_timestamps = [float(scene["start"]) + (timestamp - start_relative) for timestamp in rel_timestamps]
    return [analyze_candidate_image(path, index + 1, absolute_timestamps[index]) for index, path in enumerate(paths)]


def classify_scene_from_candidates(candidates: list[CandidateFrame]) -> tuple[str, str | None]:
    if not candidates:
        return "dark_or_blurry", "no_probe_frames"

    reasons = Counter(candidate.reject_reason for candidate in candidates if candidate.reject_reason)
    if reasons and len(reasons) == len(candidates):
        reason, _count = reasons.most_common(1)[0]
        if reason in {"near_black", "near_white", "blurred", "low_contrast"}:
            return "dark_or_blurry", reason
        if reason == "low_entropy_graphic":
            return "graphic_or_low_entropy", reason
        return "closeup_or_sparse", reason

    entropy = statistics.median(candidate.entropy for candidate in candidates)
    texture = statistics.median(candidate.texture_spread for candidate in candidates)
    sharpness = statistics.median(candidate.sharpness for candidate in candidates)
    contrast = statistics.median(candidate.contrast for candidate in candidates)
    if entropy < 2.6:
        return "graphic_or_low_entropy", "low_entropy_graphic"
    if sharpness < 0.010 or contrast < 0.025:
        return "dark_or_blurry", "blurred_or_low_contrast"
    if texture >= 0.45 and entropy >= 4.0:
        return "wide_crowd_candidate", None
    if texture >= 0.18 and entropy >= 3.2:
        return "moving_crowd_candidate", None
    return "closeup_or_sparse", "insufficient_crowd_texture"


def classify_scenes(proxy_path: Path, scenes: list[dict[str, object]], run_dir: Path) -> None:
    for scene in progress_iter(scenes, desc="Classifying scenes", unit="scene"):
        probe_dir = run_dir / "scene_probes" / f"scene_{int(scene['scene_id']):03d}"
        candidates = probe_scene(proxy_path, scene, probe_dir)
        scene_type, skip_reason = classify_scene_from_candidates(candidates)
        scene["scene_type"] = scene_type
        scene["skip_reason"] = skip_reason
        scene["probe_frames"] = [candidate.to_record() for candidate in candidates]


def scene_is_countable(scene: dict[str, object]) -> bool:
    return str(scene.get("scene_type")) in {"wide_crowd_candidate", "moving_crowd_candidate"}


def sample_scene_times(scene: dict[str, object], sample_every: float) -> list[float]:
    start = float(scene["start"])
    end = float(scene["end"])
    duration = max(0.0, end - start)
    if duration <= 0:
        return []
    if duration <= sample_every:
        return [start + duration / 2.0]
    first = start + min(1.0, duration / 2.0)
    times = []
    cursor = first
    while cursor < end:
        times.append(cursor)
        cursor += sample_every
    return times or [start + duration / 2.0]


def extract_single_frame(
    video: VideoInfo,
    timestamp: float,
    frame_path: Path,
    force: bool = False,
    max_width: int = 1280,
    jpeg_quality: int = 2,
) -> Path:
    if not force and frame_path.exists() and frame_path.stat().st_size > 0:
        return frame_path
    frame_path.parent.mkdir(parents=True, exist_ok=True)
    scale_args = []
    if max_width and max_width > 0:
        scale_args = ["-vf", f"scale='min({int(max_width)},iw)':-2"]
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "error",
        *(["-y"] if force else []),
        *ffmpeg_header_args(video.http_headers),
        "-ss",
        f"{timestamp:.3f}",
        "-i",
        video.media_url,
        "-frames:v",
        "1",
        *scale_args,
        "-q:v",
        str(jpeg_quality),
        str(frame_path),
    ]
    run_command(cmd)
    return frame_path


def scene_frame_output_dir(run_dir: Path, scene_id: int, frame_index: int, timestamp: float) -> Path:
    return run_dir / "scene_frames" / f"scene_{scene_id:03d}" / f"frame_{frame_index:04d}_{format_seconds_token(timestamp)}"


def timeline_rows_for_scene(scene: dict[str, object], timeline_rows: list[dict[str, object]]) -> list[dict[str, object]]:
    scene_id = int(scene["scene_id"])
    return [row for row in timeline_rows if int(row.get("scene_id", -1)) == scene_id]


def add_scene_stats(scenes: list[dict[str, object]], timeline_rows: list[dict[str, object]], min_count: float) -> None:
    for scene in scenes:
        rows = timeline_rows_for_scene(scene, timeline_rows)
        scene["counted_frames"] = [
            {
                "timestamp": row["timestamp"],
                "timestamp_hms": row["timestamp_hms"],
                "ensemble_count": row["ensemble_count"],
                "status": row["status"],
                "artifacts": row.get("artifacts", {}),
            }
            for row in rows
        ]
        retained_counts = [float(row["ensemble_count"]) for row in rows if float(row["ensemble_count"]) >= min_count]
        all_counts = [float(row["ensemble_count"]) for row in rows]
        counts = retained_counts or all_counts
        scene["stats"] = {
            "counted_frames": len(rows),
            "retained_frames": len(retained_counts),
            "peak_visible_count": max(counts) if counts else None,
            "median_visible_count": statistics.median(counts) if counts else None,
            "mean_visible_count": statistics.mean(counts) if counts else None,
        }


def build_timeline_csv_rows(timeline_rows: list[dict[str, object]], labels: list[str]) -> list[dict[str, object]]:
    rows = []
    for row in timeline_rows:
        output = {
            "timestamp": row["timestamp"],
            "timestamp_hms": row["timestamp_hms"],
            "scene_id": row["scene_id"],
            "scene_type": row["scene_type"],
            "status": row["status"],
            "ensemble_count": row["ensemble_count"],
            "uncertainty_range": row["uncertainty"]["range"],
            "frame_jpg": row.get("artifacts", {}).get("frame_jpg", ""),
            "density_overlay": row.get("artifacts", {}).get("density_overlay", ""),
        }
        checkpoint_counts = row.get("checkpoint_counts") or {}
        for label in labels:
            output[f"{label}_count"] = checkpoint_counts.get(label)
        rows.append(output)
    return rows


def write_timeline_csv(path: Path, timeline_rows: list[dict[str, object]], labels: list[str]) -> None:
    csv_rows = build_timeline_csv_rows(timeline_rows, labels)
    fieldnames = [
        "timestamp",
        "timestamp_hms",
        "scene_id",
        "scene_type",
        "status",
        "ensemble_count",
        "uncertainty_range",
        *[f"{label}_count" for label in labels],
        "frame_jpg",
        "density_overlay",
    ]
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(csv_rows)


def build_scene_report_markdown(
    metadata: dict[str, object],
    scenes: list[dict[str, object]],
    timeline_rows: list[dict[str, object]],
    report_dir: Path,
) -> str:
    lines = [
        "# Scene-Aware YouTube Crowd Study",
        "",
        "These are instantaneous visible crowd estimates from sampled video frames, not unique attendee totals.",
        "",
        "## Source",
        "",
        f"- URL: {metadata['source_url']}",
        f"- Title: {metadata['title']}",
        f"- Analyzed window: {metadata['window_start_hms']} to {metadata['window_end_hms']}",
        f"- Window start source: {metadata.get('window_start_source', 'unknown')}",
        f"- Scene detector: {metadata['scene_detector']}",
        f"- Scene detection status: {metadata['scene_detection_status']}",
        f"- Scenes detected: {len(scenes)}",
        f"- Counted timeline frames: {len(timeline_rows)}",
        f"- Min-count threshold for retained summaries: {metadata['min_count']}",
    ]
    if metadata.get("source_video"):
        source_video_metadata = metadata.get("source_video_metadata") or {}
        source_shape = ""
        if isinstance(source_video_metadata, dict) and source_video_metadata.get("width") and source_video_metadata.get("height"):
            source_shape = f" ({source_video_metadata['width']}x{source_video_metadata['height']})"
        source_cleanup = metadata.get("source_video_cleanup") or {}
        if isinstance(source_cleanup, dict) and source_cleanup.get("deleted"):
            deleted_bytes = source_cleanup.get("deleted_bytes")
            deleted_size = f", deleted {format_bytes(int(deleted_bytes))}" if isinstance(deleted_bytes, int) else ""
            lines.append(f"- Source video used then deleted after processing: {metadata['source_video']}{source_shape}{deleted_size}")
        elif isinstance(source_cleanup, dict) and source_cleanup.get("policy") == "delete_after_success":
            cleanup_reason = source_cleanup.get("reason") or "cleanup did not run"
            lines.append(f"- Source video cleanup: not deleted ({cleanup_reason}): {metadata['source_video']}{source_shape}")
        else:
            lines.append(f"- Cached source video: {metadata['source_video']}{source_shape}")
    if metadata.get("analysis_proxy"):
        lines.append(
            "- Analysis proxy: "
            f"{metadata['analysis_proxy']} "
            f"({metadata.get('scene_proxy_fps', 'unknown')} fps, "
            f"max width {metadata.get('scene_proxy_max_width', 'unknown')} px)"
        )
    if metadata.get("timeline_frame_source"):
        width_setting = metadata.get("count_frame_max_width")
        width_text = "native source resolution" if width_setting in (0, "0", None) else f"max width {width_setting} px"
        lines.append(
            "- CLIP-EBC counted frames from: "
            f"{metadata['timeline_frame_source']} ({width_text}, JPEG q={metadata.get('count_frame_jpeg_quality', 'unknown')})"
        )
        if metadata.get("timeline_frame_source") == "source_video":
            lines.append("- Scene proxy was not used for crowd-count inference.")
    lines.extend(["", "## Headline Statistics", ""])

    retained = [row for row in timeline_rows if float(row["ensemble_count"]) >= float(metadata["min_count"])]
    counts = [float(row["ensemble_count"]) for row in retained]
    if counts:
        peak_row = max(retained, key=lambda row: float(row["ensemble_count"]))
        lines.append(f"- Peak visible count: {float(peak_row['ensemble_count']):.1f} at {peak_row['timestamp_hms']}")
        lines.append(f"- Peak scene: {peak_row['scene_id']}")
        lines.append(f"- Median visible count over retained timeline frames: {statistics.median(counts):.1f}")
        lines.append(f"- Mean visible count over retained timeline frames: {statistics.mean(counts):.1f}")
    else:
        lines.append(f"- No counted frames met the min-count threshold of {metadata['min_count']}.")
    lines.append(f"- Skipped scenes: {sum(1 for scene in scenes if not scene_is_countable(scene))}")
    lines.append("")
    lines.append("## Scene Timeline")
    lines.append("")
    lines.append("| Scene | Start | End | Type | Frames | Peak | Median | Mean | Notes |")
    lines.append("| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | --- |")
    for scene in scenes:
        stats = scene.get("stats") or {}
        note = scene.get("skip_reason") or ""
        lines.append(
            "| "
            f"{scene['scene_id']} | "
            f"{scene['start_hms']} | "
            f"{scene['end_hms']} | "
            f"{scene.get('scene_type') or 'unknown'} | "
            f"{stats.get('counted_frames', 0)} | "
            f"{format_count(stats.get('peak_visible_count'))} | "
            f"{format_count(stats.get('median_visible_count'))} | "
            f"{format_count(stats.get('mean_visible_count'))} | "
            f"{note} |"
        )
    lines.append("")
    lines.append("## Counted Frames")
    lines.append("")
    if timeline_rows:
        labels = list(metadata["checkpoint_labels"])
        lines.append("| Timestamp | Scene | Type | Ensemble | Disagreement | Artifacts |")
        lines.append("| --- | ---: | --- | ---: | ---: | --- |")
        for row in sorted(timeline_rows, key=lambda item: float(item["timestamp"])):
            artifacts = row.get("artifacts") or {}
            links = " ".join(
                part
                for part in [
                    report_link(report_dir, artifacts.get("frame_jpg"), "frame"),
                    report_link(report_dir, artifacts.get("density_heatmap"), "heatmap"),
                    report_link(report_dir, artifacts.get("density_overlay"), "overlay"),
                ]
                if part
            )
            lines.append(
                "| "
                f"{row['timestamp_hms']} | "
                f"{row['scene_id']} | "
                f"{row['scene_type']} | "
                f"{format_count(row['ensemble_count'])} | "
                f"{format_count(row['uncertainty']['range'])} | "
                f"{links} |"
            )
        if labels:
            lines.append("")
            lines.append(f"Checkpoint columns in `timeline.csv`: {', '.join(labels)}.")
    else:
        lines.append("No frames were counted.")
    lines.append("")
    lines.append("## Runtime")
    lines.append("")
    lines.append(f"- Started at: {metadata['started_at']}")
    lines.append(f"- Finished at: {metadata['finished_at']}")
    lines.append(f"- Elapsed seconds: {metadata['elapsed_seconds']:.1f}")
    lines.append(f"- Run directory: {metadata['run_dir']}")
    lines.append("")
    return "\n".join(lines)


def write_scene_outputs(
    run_dir: Path,
    metadata: dict[str, object],
    scenes: list[dict[str, object]],
    timeline_rows: list[dict[str, object]],
) -> Path:
    write_json(run_dir / "scenes.json", {"metadata": metadata, "scenes": scenes})
    write_json(run_dir / "timeline.json", {"metadata": metadata, "frames": timeline_rows})
    write_timeline_csv(run_dir / "timeline.csv", timeline_rows, list(metadata["checkpoint_labels"]))
    report_text = build_scene_report_markdown(metadata, scenes, timeline_rows, run_dir)
    report_path = run_dir / "scene_report.md"
    report_path.write_text(report_text, encoding="utf-8")
    (run_dir / "report.md").write_text(report_text, encoding="utf-8")
    return report_path


def resolve_checkpoints(repo_dir: Path, checkpoint_args: list[Path] | None) -> list[Path]:
    if checkpoint_args is None:
        checkpoints = [repo_dir / relative for relative in DEFAULT_CHECKPOINT_RELATIVE]
    else:
        checkpoints = []
        default_parent = repo_dir / DEFAULT_CHECKPOINT_RELATIVE[0].parent
        for value in checkpoint_args:
            candidates = [value, Path.cwd() / value, repo_dir / value, default_parent / value.name]
            match = next((candidate for candidate in candidates if candidate.exists()), None)
            checkpoints.append(match or value)

    missing = [checkpoint for checkpoint in checkpoints if not checkpoint.exists()]
    if missing:
        missing_text = ", ".join(str(path) for path in missing)
        raise FileNotFoundError(f"Missing CLIP-EBC checkpoint(s): {missing_text}")
    return [checkpoint.resolve() for checkpoint in checkpoints]


def checkpoint_labels(checkpoints: list[Path]) -> list[str]:
    labels: list[str] = []
    counts: Counter[str] = Counter()
    for checkpoint in checkpoints:
        label = checkpoint.stem
        counts[label] += 1
        labels.append(label if counts[label] == 1 else f"{label}_{counts[label]}")
    return labels


def frame_output_dir(run_dir: Path, candidate: CandidateFrame) -> Path:
    rank_token = f"rank_{candidate.rank:03d}" if candidate.rank is not None else f"candidate_{candidate.index:05d}"
    return run_dir / "frames" / f"{rank_token}_{format_seconds_token(candidate.timestamp)}_src{candidate.index:05d}"


def load_existing_frame_result(
    frame_dir: Path,
    min_count: float,
    labels: list[str],
    expected_fields: dict[str, object] | None = None,
) -> dict[str, object] | None:
    result_path = frame_dir / "result.json"
    if not result_path.exists():
        return None
    try:
        with result_path.open("r", encoding="utf-8") as f:
            result = json.load(f)
    except (json.JSONDecodeError, OSError):
        return None
    if "ensemble_count" not in result or "status" not in result:
        return None
    if float(result.get("min_count", -1.0)) != float(min_count):
        return None
    checkpoint_counts = result.get("checkpoint_counts") or {}
    if sorted(checkpoint_counts.keys()) != sorted(labels):
        return None
    for key, expected_value in (expected_fields or {}).items():
        if result.get(key) != expected_value:
            return None
    result["resumed"] = True
    return result


def count_candidate_frame(
    candidate: CandidateFrame,
    counters: list[LoadedClipEbcCounter],
    labels: list[str],
    run_dir: Path,
    stride: int,
    min_count: float,
    output_dir_override: Path | None = None,
    result_extra: dict[str, object] | None = None,
    expected_result_fields: dict[str, object] | None = None,
) -> dict[str, object]:
    output_dir = output_dir_override or frame_output_dir(run_dir, candidate)
    existing = load_existing_frame_result(output_dir, min_count, labels, expected_result_fields)
    if existing is not None:
        return existing

    output_dir.mkdir(parents=True, exist_ok=True)
    with Image.open(candidate.path) as image:
        image = image.convert("RGB")
        frame_path = output_dir / "frame.jpg"
        image.save(frame_path, quality=95)

        preprocess = {
            "original_size": {"width": image.width, "height": image.height},
            "processed_size": {"width": image.width, "height": image.height},
            "crop_ui": False,
            "mask_pause": False,
            "mask_lower_banner": False,
        }
        checkpoint_results = []
        checkpoint_counts: dict[str, float] = {}
        densities = []
        for label, counter in zip(labels, counters):
            output = count_image(
                counter,
                image,
                stride=stride,
                image_ref=rel_or_abs(candidate.path),
                preprocess=preprocess,
                metadata={
                    "candidate_index": candidate.index,
                    "timestamp": candidate.timestamp,
                    **(result_extra or {}),
                },
            )
            checkpoint_counts[label] = output.count
            densities.append(output.density)
            checkpoint_results.append(
                {
                    "label": label,
                    "checkpoint": rel_or_abs(counter.checkpoint),
                    "count": output.count,
                    "rounded_count": output.rounded_count,
                    "density_shape": list(output.density.shape),
                }
            )

        counts = list(checkpoint_counts.values())
        ensemble_count = float(statistics.mean(counts))
        min_checkpoint = float(min(counts))
        max_checkpoint = float(max(counts))
        status = "retained" if ensemble_count >= min_count else "rejected_low_count"
        reject_reason = None if status == "retained" else f"ensemble_count_below_{min_count:g}"

        ensemble_density, density_note = ensemble_density_map(densities)
        artifacts = save_density_outputs(output_dir, image, ensemble_density)
        artifacts["frame_jpg"] = str(frame_path)

    result = {
        "status": status,
        "reject_reason": reject_reason,
        "candidate_index": candidate.index,
        "rank": candidate.rank,
        "timestamp": candidate.timestamp,
        "timestamp_hms": format_hms(candidate.timestamp),
        "source_frame": rel_or_abs(candidate.path),
        "min_count": min_count,
        "ensemble_count": ensemble_count,
        "rounded_ensemble_count": int(round(ensemble_count)),
        "uncertainty": {
            "min_checkpoint_count": min_checkpoint,
            "max_checkpoint_count": max_checkpoint,
            "range": max_checkpoint - min_checkpoint,
        },
        "checkpoint_counts": checkpoint_counts,
        "checkpoint_results": checkpoint_results,
        "stride": stride,
        "heuristics": candidate.to_record(),
        "artifacts": artifacts,
    }
    if density_note:
        result["density_note"] = density_note
    if result_extra:
        result.update(result_extra)
    write_json(output_dir / "result.json", result)
    return result


def ensemble_density_map(densities: list[np.ndarray]) -> tuple[np.ndarray, str | None]:
    if not densities:
        raise ValueError("at least one density map is required")
    try:
        return np.mean(np.stack(densities, axis=0), axis=0), None
    except ValueError:
        return densities[0], "Checkpoint density maps had incompatible shapes; saved the first checkpoint density map."


def report_link(base_dir: Path, path_text: str | None, label: str) -> str:
    if not path_text:
        return ""
    path = Path(path_text)
    try:
        target = path.resolve().relative_to(base_dir.resolve()).as_posix()
    except ValueError:
        target = path.as_posix()
    return f"[{label}]({target})"


def format_count(value: float | int | None) -> str:
    if value is None:
        return ""
    return f"{float(value):.1f}"


def build_report_markdown(
    metadata: dict[str, object],
    retained: list[dict[str, object]],
    low_count_rejected: list[dict[str, object]],
    heuristic_rejected: list[dict[str, object]],
    report_dir: Path,
) -> str:
    lines: list[str] = []
    lines.append("# YouTube Crowd Study")
    lines.append("")
    lines.append(
        "These are instantaneous visible crowd estimates from sampled video frames, not unique attendee totals."
    )
    lines.append("")
    lines.append("## Source")
    lines.append("")
    lines.append(f"- URL: {metadata['source_url']}")
    lines.append(f"- Title: {metadata['title']}")
    lines.append(f"- Analyzed window: {metadata['window_start_hms']} to {metadata['window_end_hms']}")
    lines.append(f"- Window start source: {metadata.get('window_start_source', 'unknown')}")
    lines.append(f"- Candidate frames extracted: {metadata['candidate_frames_extracted']}")
    lines.append(f"- Heuristic-ranked candidates: {metadata['heuristic_ranked_candidates']}")
    lines.append(f"- Model-counted frames: {metadata['model_counted_frames']}")
    lines.append(f"- Retained frames at min count {metadata['min_count']}: {len(retained)}")
    lines.append(f"- Rejected frames: {len(heuristic_rejected) + len(low_count_rejected)}")
    lines.append(f"- Checkpoints: {', '.join(metadata['checkpoint_labels'])}")
    lines.append(f"- Device: {metadata['device']}")
    lines.append(f"- Stride: {metadata['stride']}")
    lines.append("")
    lines.append("## Headline Statistics")
    lines.append("")

    if retained:
        counts = [float(row["ensemble_count"]) for row in retained]
        disagreements = [float(row["uncertainty"]["range"]) for row in retained]
        lines.append(f"- Peak visible crowd estimate: {max(counts):.1f}")
        lines.append(f"- Average selected-frame estimate: {statistics.mean(counts):.1f}")
        lines.append(f"- Median selected-frame estimate: {statistics.median(counts):.1f}")
        lines.append(f"- Min/max selected-frame estimate: {min(counts):.1f} / {max(counts):.1f}")
        lines.append(
            "- Checkpoint disagreement range: "
            f"mean {statistics.mean(disagreements):.1f}, "
            f"median {statistics.median(disagreements):.1f}, "
            f"max {max(disagreements):.1f}"
        )
        if len(retained) < int(metadata["target_retained_frames"]):
            lines.append(
                f"- Only {len(retained)} retained frames met the threshold before candidates were exhausted."
            )
    else:
        lines.append(f"- No frames met the min-count threshold of {metadata['min_count']}.")
    lines.append("")
    lines.append("## Preprocessing")
    lines.append("")
    lines.append(
        "- Frames were extracted uniformly from the selected video window with ffmpeg, then ranked with image heuristics "
        "for sharpness, brightness, entropy, texture spread, and near-duplicate suppression."
    )
    lines.append(f"- Frames with ensemble count below {metadata['min_count']} were excluded from headline statistics.")
    lines.append("")
    lines.append("## Retained Frames")
    lines.append("")
    if retained:
        labels = list(metadata["checkpoint_labels"])
        rmse_label = next((label for label in labels if "rmse" in label), labels[0])
        mae_label = next((label for label in labels if "mae" in label), labels[min(1, len(labels) - 1)])
        lines.append(
            f"| Timestamp | Rank | {rmse_label} count | {mae_label} count | Ensemble | Disagreement | Artifacts |"
        )
        lines.append("| --- | ---: | ---: | ---: | ---: | ---: | --- |")
        for row in sorted(retained, key=lambda item: (float(item["timestamp"]), int(item["rank"] or 0))):
            artifacts = row.get("artifacts") or {}
            links = " ".join(
                part
                for part in [
                    report_link(report_dir, artifacts.get("frame_jpg"), "frame"),
                    report_link(report_dir, artifacts.get("density_heatmap"), "heatmap"),
                    report_link(report_dir, artifacts.get("density_overlay"), "overlay"),
                    report_link(report_dir, str(frame_output_dir_from_result(row) / "result.json"), "json"),
                ]
                if part
            )
            checkpoint_counts = row.get("checkpoint_counts") or {}
            lines.append(
                "| "
                f"{row['timestamp_hms']} | "
                f"{row['rank']} | "
                f"{format_count(checkpoint_counts.get(rmse_label))} | "
                f"{format_count(checkpoint_counts.get(mae_label))} | "
                f"{format_count(row['ensemble_count'])} | "
                f"{format_count(row['uncertainty']['range'])} | "
                f"{links} |"
            )
    else:
        lines.append("No retained frames.")
    lines.append("")
    lines.append("## Rejected Frames")
    lines.append("")
    reason_counts = Counter(str(row.get("reject_reason") or "unknown") for row in heuristic_rejected)
    lines.append(f"- Heuristic rejections before model inference: {len(heuristic_rejected)}")
    for reason, count in sorted(reason_counts.items()):
        lines.append(f"- {reason}: {count}")
    lines.append(f"- Count-threshold rejections after model inference: {len(low_count_rejected)}")
    lines.append("")
    lines.append("## Runtime")
    lines.append("")
    lines.append(f"- Started at: {metadata['started_at']}")
    lines.append(f"- Finished at: {metadata['finished_at']}")
    lines.append(f"- Elapsed seconds: {metadata['elapsed_seconds']:.1f}")
    lines.append(f"- Run directory: {metadata['run_dir']}")
    lines.append("")
    return "\n".join(lines)


def frame_output_dir_from_result(row: dict[str, object]) -> Path:
    artifacts = row.get("artifacts") or {}
    frame_path = artifacts.get("frame_jpg")
    if frame_path:
        return Path(frame_path).parent
    candidate = CandidateFrame(
        index=int(row["candidate_index"]),
        path=Path(str(row.get("source_frame") or ".")),
        timestamp=float(row["timestamp"]),
        score=0.0,
        sharpness=0.0,
        brightness=0.0,
        contrast=0.0,
        entropy=0.0,
        texture_spread=0.0,
        perceptual_hash=0,
        rank=int(row["rank"]) if row.get("rank") is not None else None,
    )
    return frame_output_dir(Path("."), candidate)


def write_report_and_results(
    run_dir: Path,
    metadata: dict[str, object],
    retained: list[dict[str, object]],
    low_count_rejected: list[dict[str, object]],
    heuristic_rejected: list[CandidateFrame],
) -> Path:
    heuristic_records = [candidate.to_record() for candidate in heuristic_rejected]
    write_json(
        run_dir / "study_results.json",
        {
            "metadata": metadata,
            "retained": retained,
            "low_count_rejected": low_count_rejected,
            "heuristic_rejected": heuristic_records,
        },
    )
    report_text = build_report_markdown(metadata, retained, low_count_rejected, heuristic_records, run_dir)
    report_path = run_dir / "report.md"
    report_path.write_text(report_text, encoding="utf-8")
    return report_path


def load_video_context(
    args: argparse.Namespace,
    allow_live_snapshot: bool = False,
) -> tuple[VideoInfo, float | None, float, float, str]:
    video = get_video_info(args.url)
    duration = video.duration or probe_duration(video.media_url, video.http_headers)
    window_duration = duration
    if (
        window_duration is None
        and allow_live_snapshot
        and video.is_live
        and args.end is None
        and args.duration is None
    ):
        window_duration = live_snapshot_end(video)
    start, end = resolve_window(args, window_duration)
    _, start_source = resolve_start(args)
    return video, duration, start, end, start_source


def common_metadata(
    args: argparse.Namespace,
    video: VideoInfo,
    duration: float | None,
    start: float,
    end: float,
    start_source: str,
    run_dir: Path,
    checkpoints: list[Path],
    labels: list[str],
    device: str,
    started_at: str,
    started: float,
) -> dict[str, object]:
    finished = time.time()
    return {
        "analysis_mode": args.analysis_mode,
        "source_url": args.url,
        "webpage_url": video.webpage_url,
        "title": video.title,
        "video_id": video.video_id,
        "extractor": video.extractor,
        "live_status": video.live_status,
        "live_snapshot": video.is_live,
        "live_release_timestamp": video.release_timestamp,
        "live_snapshot_at": video.metadata_fetched_at if video.is_live else None,
        "duration": duration,
        "duration_hms": format_hms(duration) if duration is not None else None,
        "window_start": start,
        "window_start_hms": format_hms(start),
        "window_start_source": start_source,
        "window_end": end,
        "window_end_hms": format_hms(end),
        "min_count": args.min_count,
        "checkpoints": [rel_or_abs(path) for path in checkpoints],
        "checkpoint_labels": labels,
        "device": device,
        "stride": args.stride,
        "run_dir": rel_or_abs(run_dir),
        "started_at": started_at,
        "finished_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "elapsed_seconds": finished - started,
    }


def run_selected_analysis(args: argparse.Namespace, started: float, started_at: str) -> Path:
    video, duration, start, end, start_source = load_video_context(args)
    run_dir = make_run_dir(args.output_dir, video, start, end, args.candidate_frames, args.min_count)
    run_dir.mkdir(parents=True, exist_ok=True)

    candidate_dir = run_dir / "candidates"
    candidate_manifest = run_dir / "candidate_manifest.json"
    cached = load_candidate_manifest(candidate_manifest, args.url, start, end, args.candidate_frames)
    if cached is None:
        candidate_paths, timestamps = extract_candidate_frames(video, start, end, args.candidate_frames, candidate_dir)
        write_candidate_manifest(candidate_manifest, video, start, end, args.candidate_frames, candidate_paths, timestamps)
    else:
        candidate_paths, timestamps = cached

    ranked_candidates, heuristic_rejected = rank_candidate_frames(candidate_paths, timestamps, show_progress=True)
    checkpoints = resolve_checkpoints(args.repo_dir, args.checkpoints)
    labels = checkpoint_labels(checkpoints)
    counters = [load_counter(args.repo_dir, checkpoint, args.device) for checkpoint in checkpoints]

    retained: list[dict[str, object]] = []
    low_count_rejected: list[dict[str, object]] = []
    counted_frames = 0
    with progress_bar(total=args.frames, desc="Retained counted frames", unit="frame") as retained_progress:
        for candidate in ranked_candidates:
            if len(retained) >= args.frames:
                break
            counted_frames += 1
            result = count_candidate_frame(candidate, counters, labels, run_dir, args.stride, args.min_count)
            if result["status"] == "retained":
                retained.append(result)
                retained_progress.update(1)
            else:
                low_count_rejected.append(result)
            retained_progress.set_postfix(
                {
                    "counted": counted_frames,
                    "retained": len(retained),
                    "low_count": len(low_count_rejected),
                    "time": result["timestamp_hms"],
                    "estimate": f"{float(result['ensemble_count']):.1f}",
                }
            )

    metadata = common_metadata(
        args,
        video,
        duration,
        start,
        end,
        start_source,
        run_dir,
        checkpoints,
        labels,
        str(counters[0].device if counters else args.device),
        started_at,
        started,
    )
    metadata.update(
        {
            "candidate_frames_target": args.candidate_frames,
            "candidate_frames_extracted": len(candidate_paths),
            "heuristic_ranked_candidates": len(ranked_candidates),
            "heuristic_rejected_frames": len(heuristic_rejected),
            "model_counted_frames": len(retained) + len(low_count_rejected),
            "target_retained_frames": args.frames,
            "retained_frames": len(retained),
            "low_count_rejected_frames": len(low_count_rejected),
            "preprocessing": {
                "frame_extraction": "uniform ffmpeg fps sampling from selected window",
                "heuristics": ["sharpness", "brightness", "entropy", "texture_spread", "near_duplicate_suppression"],
                "min_count_filter": args.min_count,
            },
        }
    )
    write_json(run_dir / "run_metadata.json", metadata)
    report_path = write_report_and_results(run_dir, metadata, retained, low_count_rejected, heuristic_rejected)

    print(
        json.dumps(
            {
                "report": str(report_path),
                "run_dir": str(run_dir),
                "retained_frames": len(retained),
                "model_counted_frames": len(retained) + len(low_count_rejected),
                "heuristic_rejected_frames": len(heuristic_rejected),
            },
            indent=2,
        )
    )
    return report_path


def run_scene_analysis(args: argparse.Namespace, started: float, started_at: str) -> Path:
    sample_every = parse_timestamp(args.scene_sample_every)
    min_scene_len = parse_timestamp(args.scene_min_len)
    if sample_every is None or sample_every <= 0:
        raise SystemExit("--scene-sample-every must be positive")
    if min_scene_len is None or min_scene_len <= 0:
        raise SystemExit("--scene-min-len must be positive")
    if args.scene_max_frames is not None and args.scene_max_frames <= 0:
        raise SystemExit("--scene-max-frames must be positive when set")

    video, duration, start, end, start_source = load_video_context(args, allow_live_snapshot=True)
    run_dir = make_run_dir(
        args.output_dir,
        video,
        start,
        end,
        args.candidate_frames,
        args.min_count,
        analysis_mode="scenes",
        live_snapshot=video.is_live,
    )
    run_dir.mkdir(parents=True, exist_ok=True)
    source_video, source_metadata = download_source_video(
        video,
        run_dir,
        redownload=args.redownload_source_video,
        validation_timestamp=start,
    )
    source_duration = source_video.duration or duration
    if source_duration is None:
        raise RuntimeError("Downloaded source video duration is unknown.")
    start, end = resolve_window(args, source_duration)
    proxy_path = extract_analysis_proxy(
        source_video,
        start,
        end,
        run_dir,
        proxy_fps=args.scene_proxy_fps,
        proxy_max_width=args.scene_proxy_max_width,
        rebuild=args.rebuild_scene_proxy,
    )
    scenes, detection_status = detect_scene_records(
        proxy_path,
        start,
        end,
        args.scene_detector,
        min_scene_len,
        args.scene_threshold,
        run_dir,
    )
    classify_scenes(proxy_path, scenes, run_dir)

    scheduled: list[tuple[dict[str, object], float]] = []
    for scene in scenes:
        if not scene_is_countable(scene):
            continue
        for timestamp in sample_scene_times(scene, sample_every):
            if args.scene_max_frames is not None and len(scheduled) >= args.scene_max_frames:
                break
            scheduled.append((scene, timestamp))
        if args.scene_max_frames is not None and len(scheduled) >= args.scene_max_frames:
            break

    checkpoints = resolve_checkpoints(args.repo_dir, args.checkpoints)
    labels = checkpoint_labels(checkpoints)
    counters = [load_counter(args.repo_dir, checkpoint, args.device) for checkpoint in checkpoints] if scheduled else []
    proxy_video = VideoInfo(
        source_url=str(proxy_path),
        media_url=str(proxy_path),
        title="analysis proxy",
        video_id="analysis_proxy",
        duration=end - start,
        webpage_url=str(proxy_path),
        extractor="local",
        http_headers={},
    )
    count_video = source_video if args.count_frame_source == "source" else proxy_video
    count_frame_source_label = "source_video" if args.count_frame_source == "source" else "analysis_proxy"
    count_frame_time_offset = 0.0 if args.count_frame_source == "source" else start
    count_source_identity = source_file_identity(Path(count_video.media_url))

    timeline_rows: list[dict[str, object]] = []
    for frame_index, (scene, timestamp) in enumerate(
        progress_iter(scheduled, desc="Counting scene timeline", unit="frame", total=len(scheduled)),
        start=1,
    ):
        scene_id = int(scene["scene_id"])
        output_dir = scene_frame_output_dir(run_dir, scene_id, frame_index, timestamp)
        expected_result_fields = {
            "analysis_mode": "scenes",
            "timeline_index": frame_index,
            "scene_id": scene_id,
            "frame_source": count_frame_source_label,
            "frame_source_path": count_source_identity["path"],
            "frame_source_bytes": count_source_identity["bytes"],
            "frame_source_mtime_ns": count_source_identity["mtime_ns"],
            "count_frame_max_width": args.count_frame_max_width,
            "count_frame_jpeg_quality": args.count_frame_jpeg_quality,
        }
        existing = load_existing_frame_result(output_dir, args.min_count, labels, expected_result_fields)
        if existing is not None:
            timeline_rows.append(existing)
            continue

        frame_source_timestamp = timestamp - count_frame_time_offset
        source_frame = extract_single_frame(
            count_video,
            frame_source_timestamp,
            output_dir / "source_frame.jpg",
            force=True,
            max_width=args.count_frame_max_width,
            jpeg_quality=args.count_frame_jpeg_quality,
        )
        candidate = analyze_candidate_image(source_frame, frame_index, timestamp)
        candidate.rank = frame_index
        result = count_candidate_frame(
            candidate,
            counters,
            labels,
            run_dir,
            args.stride,
            args.min_count,
            output_dir_override=output_dir,
            expected_result_fields=expected_result_fields,
            result_extra={
                "analysis_mode": "scenes",
                "timeline_index": frame_index,
                "scene_id": scene_id,
                "scene_type": scene.get("scene_type"),
                "scene_start": scene["start"],
                "scene_end": scene["end"],
                "scene_start_hms": scene["start_hms"],
                "scene_end_hms": scene["end_hms"],
                "frame_source": count_frame_source_label,
                "frame_source_path": count_source_identity["path"],
                "frame_source_bytes": count_source_identity["bytes"],
                "frame_source_mtime_ns": count_source_identity["mtime_ns"],
                "frame_source_timestamp": frame_source_timestamp,
                "count_frame_max_width": args.count_frame_max_width,
                "count_frame_jpeg_quality": args.count_frame_jpeg_quality,
            },
        )
        timeline_rows.append(result)

    add_scene_stats(scenes, timeline_rows, args.min_count)
    metadata = common_metadata(
        args,
        video,
        source_duration,
        start,
        end,
        start_source,
        run_dir,
        checkpoints,
        labels,
        str(counters[0].device if counters else args.device),
        started_at,
        started,
    )
    metadata.update(
        {
            "scene_detector": args.scene_detector,
            "scene_detection_status": detection_status,
            "scene_min_len": min_scene_len,
            "scene_sample_every": sample_every,
            "scene_threshold": args.scene_threshold,
            "scene_max_frames": args.scene_max_frames,
            "scenes_total": len(scenes),
            "scenes_countable": sum(1 for scene in scenes if scene_is_countable(scene)),
            "timeline_frames": len(timeline_rows),
            "source_video": source_metadata.get("path"),
            "source_video_metadata": source_metadata,
            "source_video_cleanup": {
                "policy": "keep" if args.keep_source_video else "delete_after_success",
                "deleted": False,
                "path": source_metadata.get("path"),
            },
            "source_video_deleted_after_processing": False,
            "analysis_proxy": rel_or_abs(proxy_path),
            "analysis_proxy_metadata": read_json_file(run_dir / "analysis_proxy.json") or {},
            "timeline_frame_source": count_frame_source_label,
            "count_frame_source": args.count_frame_source,
            "count_frame_max_width": args.count_frame_max_width,
            "count_frame_jpeg_quality": args.count_frame_jpeg_quality,
            "scene_proxy_fps": args.scene_proxy_fps,
            "scene_proxy_max_width": args.scene_proxy_max_width,
            "preprocessing": {
                "scene_detection": "PySceneDetect over low-resolution local ffmpeg proxy built from cached source video",
                "scene_classification": ["brightness", "contrast", "entropy", "sharpness", "texture_spread"],
                "frame_sampling": f"chronological per countable scene from local {count_frame_source_label}",
                "min_count_filter": args.min_count,
            },
        }
    )
    write_json(run_dir / "run_metadata.json", metadata)
    report_path = write_scene_outputs(run_dir, metadata, scenes, timeline_rows)
    source_cleanup = cleanup_cached_source_video(run_dir, source_metadata, args.keep_source_video)
    metadata["source_video_cleanup"] = source_cleanup
    metadata["source_video_deleted_after_processing"] = bool(source_cleanup.get("deleted"))
    write_json(run_dir / "run_metadata.json", metadata)
    report_path = write_scene_outputs(run_dir, metadata, scenes, timeline_rows)
    print(
        json.dumps(
            {
                "report": str(report_path),
                "run_dir": str(run_dir),
                "scenes_total": len(scenes),
                "scenes_countable": metadata["scenes_countable"],
                "timeline_frames": len(timeline_rows),
                "scene_detection_status": detection_status,
                "source_video": source_metadata.get("path"),
                "source_video_deleted_after_processing": metadata["source_video_deleted_after_processing"],
                "timeline_frame_source": count_frame_source_label,
            },
            indent=2,
        )
    )
    return report_path


def main() -> None:
    args = parse_args()
    if args.frames <= 0:
        raise SystemExit("--frames must be positive")
    if args.candidate_frames <= 0:
        raise SystemExit("--candidate-frames must be positive")
    if args.scene_proxy_fps <= 0:
        raise SystemExit("--scene-proxy-fps must be positive")
    if args.scene_proxy_max_width <= 0:
        raise SystemExit("--scene-proxy-max-width must be positive")
    if args.count_frame_max_width < 0:
        raise SystemExit("--count-frame-max-width must be zero or positive")
    if not 1 <= args.count_frame_jpeg_quality <= 31:
        raise SystemExit("--count-frame-jpeg-quality must be between 1 and 31")

    started = time.time()
    started_at = time.strftime("%Y-%m-%dT%H:%M:%S%z")
    require_tool("ffmpeg")
    require_tool("ffprobe")

    if args.analysis_mode == "scenes":
        run_scene_analysis(args, started, started_at)
    else:
        run_selected_analysis(args, started, started_at)


if __name__ == "__main__":
    main()
