#!/usr/bin/env bash
set -euo pipefail

PACKAGE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PACKAGE_DIR"

CLIP_REPO="CLIP-EBC"
PYTHON_BIN="${PYTHON_BIN:-$PACKAGE_DIR/.venv/bin/python}"
SCENE_SAMPLE_EVERY="${SCENE_SAMPLE_EVERY:-10}"
DEVICE="${DEVICE:-auto}"
YOUTUBE_PLAYER_CLIENT="${YOUTUBE_PLAYER_CLIENT:-web_safari}"
export YOUTUBE_PLAYER_CLIENT

if [[ ! -x "$PYTHON_BIN" ]]; then
  PYTHON_BIN=python3
fi
if [[ -z "${YOUTUBE_NODE_PATH:-}" && -x "$PACKAGE_DIR/.venv/bin/node" ]]; then
  export YOUTUBE_NODE_PATH="$PACKAGE_DIR/.venv/bin/node"
fi

BATCHES=(
  "119|https://www.youtube.com/watch?v=diZnf2oQeqQ"
  "118|https://www.youtube.com/watch?v=fjeTh-9vS5M"
)

for batch in "${BATCHES[@]}"; do
  IFS="|" read -r day url <<< "$batch"
  printf '\nAnalyzing day %s: %s\n' "$day" "$url"

  args=(
    --url "$url"
    --analysis-mode scenes
    --scene-sample-every "$SCENE_SAMPLE_EVERY"
    --output-dir "outputs/protesta_$day"
    --repo-dir "$CLIP_REPO"
    --device "$DEVICE"
  )
  if [[ "${KEEP_SOURCE_VIDEO:-0}" == "1" ]]; then
    args+=(--keep-source-video)
  fi

  # A source stream can use around 6 GB; it is removed after a successful run unless KEEP_SOURCE_VIDEO=1.
  "$PYTHON_BIN" study_youtube_crowd_clip_ebc.py "${args[@]}"
done
