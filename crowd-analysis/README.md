# Protest Crowd Analysis

This folder contains the code and inputs used to analyze the News24 livestreams linked from the site's protest participation tracker.

## Contents

- study_youtube_crowd_clip_ebc.py downloads a YouTube source, detects usable crowd scenes, samples frames, runs CLIP-EBC, and writes a report plus JSON and CSV artifacts.
- count_crowd_clip_ebc.py is the shared image counter imported by the analysis script.
- run_protesta_batches.sh runs the videos listed in its BATCHES array.
- CLIP-EBC is the upstream model pinned at revision b52a5944bd75beed34fd3d0da516aa833ae63354.
- data/protest_days.csv records 119 source video IDs and the corresponding values currently published by the website. Published values are normalized index values, not raw people counts.
- data/crowd_visibility_index_1_30.csv preserves the original raw-statistics summary and preliminary indices for days 1-30.
- data/review_notes.md carries the dated methodology and per-day visual-audit notes copied from the website data.
- research/geometry_estimates.md and research/day_35_density_estimate.md record the footprint-and-density scenarios used to assess the large anchor days.
- scripts/fetch_models.sh downloads the model checkpoints.

Videos, downloaded model assets, cookies, and analysis outputs are not stored in Git.

## Requirements

Use Python 3.12, Git, FFmpeg with ffprobe, curl, and sha256sum. An NVIDIA GPU with CUDA is strongly recommended for a full run. CPU inference is available but can take much longer. Disk requirements depend on the source videos, model assets, and generated outputs; ensure the workspace has sufficient free space.

Create and activate the environment from this directory:

~~~bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
~~~

Initialize the model source and download the two official NWPU checkpoints:

~~~bash
git submodule update --init --recursive CLIP-EBC
./scripts/fetch_models.sh
~~~

The checkpoint archives are downloaded from the upstream CLIP-EBC release and verified against checksums before use. On first import, upstream CLIP-EBC may prepare all nine CLIP variants if their assets are missing, even though this analysis uses only the selected backbone; this can take additional time and bandwidth.

## Run

Edit the `BATCHES` array in `run_protesta_batches.sh` to select the days you want. Use the video IDs in `data/protest_days.csv` to form the `day|YouTube URL` entries, then run:

~~~bash
./run_protesta_batches.sh
~~~

A batch may take many hours, depends on the continued availability of each YouTube video, and can be interrupted by YouTube throttling. The script stops on the first failure; rerunning a day reuses compatible frame results in its output directory.

The runner uses the same scene-analysis settings recorded in the production runs: start 20 minutes into each livestream (00:20:00), adaptive scene detection, a 1 fps / 426 px scene proxy, source-resolution frames sampled every 10 seconds in countable scenes, and a minimum ensemble estimate of 100 per frame. The 20-minute delay allows time for people to gather before counting begins. Both best_rmse and best_mae checkpoints are run; their estimates are averaged for each frame. The script infers the model backbone from checkpoint tensor shapes. Although the checkpoint directory and release filenames say ViT-B/16, the checkpoint tensors used by these runs resolve to ViT-L/14.

By default, successful runs delete the downloaded high-quality source video and keep the proxy, sampled frames, timelines, metadata, and reports under outputs/protesta_DAY/. Set KEEP_SOURCE_VIDEO=1 to retain the source stream. Set DEVICE=cpu to force CPU inference, or set DEVICE=cuda:0 to select a GPU. SCENE_SAMPLE_EVERY can change the sampling interval; keep it at 10 to match the published runs.

For YouTube access, yt-dlp may need a browser session or an exported cookies file. Keep cookies outside this repository and pass them only through the environment:

~~~bash
YOUTUBE_COOKIES_FILE=/secure/path/youtube-cookies.txt ./run_protesta_batches.sh
~~~

The runner defaults the YouTube player client to web_safari and uses the Node binary installed in .venv when available. Override YOUTUBE_PLAYER_CLIENT or YOUTUBE_NODE_PATH if your environment needs different values. Do not commit cookies or print them in logs.

## Why Scene-Aware Analysis

A protest livestream can show several phases: people gathering at Sheshi Skenderbej, the march toward the Prime Minister's office, speeches there, and a later march through the city. During and between those phases, the broadcast repeatedly cuts from wide crowd views to speakers, close-ups, graphics, or other shots that are poor inputs for counting the visible crowd. Selecting only a handful of visually strong frames would also lose the chronology of those changes.

The runner uses a low-resolution proxy to detect camera-shot boundaries and probes each resulting scene with a few frames. Simple visual heuristics label scenes as likely wide or moving crowd views, close-up/sparse views, graphics, or dark/blurry footage. CLIP-EBC then counts source-resolution frames at 10-second intervals **within the scenes classified as crowd candidates**. Sampling restarts at each scene boundary, so this is not identical to sampling the whole stream at fixed 10-second timestamps. The timeline and per-scene report make camera changes and candidate peaks easier to inspect. Counts from different scenes are never added together as distinct attendees.

In a review of 119 demo runs matched to the published source videos, **7,834 of 7,853 detected scenes (99.76%)** were labeled crowd candidates; 108 runs accepted every scene. In this dataset, scene classification therefore provides almost no filtering of speaker shots or other non-crowd views. The separate `ensemble_count >= 100` threshold removes some sampled frames, but it does not recognize shot content either. Scene grouping is useful for chronology and audit; an accuracy improvement over fixed-interval sampling has not been established.

These labels describe the camera view, not the protest's location or phase: the pipeline does not automatically know whether a scene is at the square, the PM's office, or on the later march. A speech shot with a crowd behind it can still pass the visual heuristics, and a usable crowd view can be missed. Starting 20 minutes into the video allows some gathering time but does not guarantee that the gathering phase is over. Review the scene report and frames before interpreting or publishing a day's figures.

## From Frames to Daily Statistics

CLIP-EBC estimates how many people are visible in a sampled camera frame. It does not identify unique individuals across time, measure total attendance, or account for people outside the camera view. The resulting estimates are therefore not official crowd totals.

For each sampled frame, the two checkpoint estimates are averaged into `ensemble_count`. Only countable crowd scenes are sampled, and only frames with `ensemble_count >= 100` are retained for daily statistics. From those retained frames:

- **Daily peak input:** Sort frame estimates from highest to lowest and average the top 10 (or all retained frames if fewer than 10). This is not the single-frame maximum labeled "Peak visible count" in `scene_report.md`.
- **Daily mean:** Arithmetic mean of the retained frame estimates across the selected livestream. It is not an average over every minute of the protest, every camera view, or unique attendees.
- **Daily median:** Median of those same retained frame estimates.

To calculate these three raw statistics for one completed run, pass its generated `timeline.csv` to Python (replace the example path):

~~~bash
python - outputs/protesta_DAY/RUN_DIR/timeline.csv <<'PY'
import csv
import statistics
import sys

with open(sys.argv[1], newline="", encoding="utf-8") as source:
    counts = [float(row["ensemble_count"]) for row in csv.DictReader(source) if row["status"] == "retained"]

if not counts:
    raise SystemExit("No retained frames")

print(f"Top-10 peak average: {statistics.mean(sorted(counts, reverse=True)[:10]):.1f}")
print(f"Retained-frame mean: {statistics.mean(counts):.1f}")
print(f"Retained-frame median: {statistics.median(counts):.1f}")
PY
~~~

The archived [first-30-days CSV](data/crowd_visibility_index_1_30.csv) also contains preliminary indices that set Day 7's raw top-10 peak to 100. **Those are not the published site indices.**

## Published Participation Index

The site's chart uses a normalized index, not estimated attendance. For an ordinary day, each raw statistic is scaled independently by the same Day-7 factor:

~~~text
published peak   = raw top-10 peak average * 50 / 2582.5
published mean   = raw retained-frame mean * 50 / 2582.5
published median = raw retained-frame median * 50 / 2582.5
~~~

Day 7 had the highest raw top-10 frame average in the original 30-day analysis (2,582.5), so it was chosen as the common model reference and assigned index 50. Day 21's raw top-10 average was only 1,099.5 even though the geometric assessment treated it as the largest gathering. If Day 21's raw result had instead been assigned 100 and used as the denominator, Day 7 would score about 235. That would conflate camera-visible counts with total turnout. The Day-7 baseline is a practical calibration choice, not a mathematical requirement or a correction for differences in camera coverage between ordinary days.

For example, Day 31's raw top-10 average of 697.6 becomes a published peak of 13.51 after rounding. The archived first-30-days CSV rounds raw counts to one decimal, so recalculating from it can differ by 0.01 from values based on unrounded model output.

Days 7, 21, and 35 are exceptions: their peaks are set to 50, 100, and 60 respectively using footprint-and-density judgments; the raw mean and median for each anchor day are multiplied by that day's peak adjustment factor as well. These anchor values are editorial estimates, not values directly produced by CLIP-EBC. The geometry assumptions and sensitivity ranges are in [research/geometry_estimates.md](research/geometry_estimates.md) and [research/day_35_density_estimate.md](research/day_35_density_estimate.md). The June 20 geometry tracker was revised after the index anchor was chosen; its later attendance range must not be read as an exact conversion of index 100 into people.

Visual audit also affects the published series: split-screen or duplicate views can inflate the top-10 peak and are excluded from that peak where documented. The daily mean and median generally retain all qualifying frames from the selected stream, even when the peak has additional exclusions. Some days select one of multiple streams or actions. Consult [data/review_notes.md](data/review_notes.md) for those decisions before comparing a fresh run with the [published-value snapshot](data/protest_days.csv). The runner does **not** automatically reproduce these manual exclusions or the three geometry anchors; it provides the raw evidence from which the published series was reviewed. Record any future change to a published value in the review notes.

The chart's **weekly average** is different from the daily mean above: it averages the published daily **peak indices** for measured days in that week. Unmeasured days are excluded, not treated as zero. Its weekly peak is the highest daily peak index in the week.

YouTube videos can be removed or replaced, and changes in the source stream, yt-dlp, hardware, or dependencies can produce different sampled frames or estimates. Each run writes run_metadata.json with the source identity, model checkpoints, settings, timestamps, and output paths so results can be audited.

## Upstream

- Model code and releases: [Yiming-M/CLIP-EBC](https://github.com/Yiming-M/CLIP-EBC)
- Paper: [CLIP-EBC: CLIP Can Count Accurately through Enhanced Blockwise Classification](https://arxiv.org/abs/2403.09281)
- Source videos are linked individually in data/protest_days.csv.
