#!/usr/bin/env bash
set -euo pipefail

PACKAGE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLIP_REPO="$PACKAGE_DIR/CLIP-EBC"
CHECKPOINT_DIR="$CLIP_REPO/checkpoints/nwpu/clip_vit_b_16_word_224_8_4_fine_1.0_dmcount"
TEMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TEMP_DIR"' EXIT

mkdir -p "$CHECKPOINT_DIR"

for metric in mae rmse; do
  archive="NWPU_CLIP_ViT_B_16_Word_$metric.tgz"
  url="https://github.com/Yiming-M/CLIP-EBC/releases/download/v1.0.0/$archive"
  curl -fL --retry 3 -o "$TEMP_DIR/$archive" "$url"
  tar -xzf "$TEMP_DIR/$archive" -C "$TEMP_DIR" "best_${metric}_0.pth"
  cp "$TEMP_DIR/best_${metric}_0.pth" "$CHECKPOINT_DIR/best_$metric.pth"
done

cd "$PACKAGE_DIR"
sha256sum -c checksums.sha256
