import type { ParticipationDay } from "@/data/participation";

/**
 * The published Pulsi series as CSV, one row per protest day. The site serves it
 * at /pulsi/protest_days.csv and scripts/export-pulsi-csv.mjs writes the same text
 * to crowd-analysis/data/protest_days.csv, so this module takes the days as an
 * argument and imports nothing at runtime (the script runs outside Next).
 *
 * The first six columns keep the order of the original snapshot; days without a
 * publishable figure leave the three index cells empty.
 */
const HEADER = [
  "day",
  "date",
  "video_id",
  "published_peak_index",
  "published_mean_index",
  "published_median_index",
  "source_url",
  "note_sq",
  "note_en",
];

const YOUTUBE_ID = /[?&]v=([\w-]{11})/;

function cell(value: string) {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

const index = (value: number | null) => (value === null ? "" : value.toFixed(2));

export function pulsiCsv(days: ParticipationDay[]) {
  const rows = days.map((d) =>
    [
      String(d.day),
      d.date,
      d.source.match(YOUTUBE_ID)?.[1] ?? "",
      index(d.peak),
      index(d.mean),
      index(d.median),
      d.source,
      d.note.sq,
      d.note.en,
    ]
      .map(cell)
      .join(","),
  );
  return [HEADER.join(","), ...rows].join("\n") + "\n";
}
