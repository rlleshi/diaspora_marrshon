// Pure geometry for the participation chart. Runs identically on server and client
// so the SVG markup hydrates without mismatch. No external dependencies.

import { isMeasured, type MeasuredDay, type ParticipationDay } from "@/data/participation";

export const VIEW = {
  width: 1000,
  height: 600,
  padTop: 132, // headroom above the plot for the floating peak number / flags
  padBottom: 64, // x-axis labels
  padLeft: 40,
  padRight: 40,
  maxY: 100, // default ceiling: 100 = the biggest day, the whole-range reading
};

export type Pt = { day: number; x: number; y: number; d: MeasuredDay };

/** How the y-axis maps an index value to height. */
export type Scale = "linear" | "log";

export type ChartGeometry = {
  view: typeof VIEW;
  plot: { left: number; right: number; top: number; bottom: number; width: number; height: number };
  /** first / last day of the rendered window. */
  firstDay: number;
  lastDay: number;
  /** ceiling of the y-axis for this window. */
  maxY: number;
  /** floor of the y-axis: 0 on a linear axis, a round value under the window's lowest day on a log one. */
  minY: number;
  scale: Scale;
  /** horizontal distance between two adjacent days, for bands and hit targets. */
  slotWidth: number;
  points: Pt[]; // peak series
  meanPoints: Pt[];
  linePath: string; // smooth peak line
  areaPath: string; // smooth peak area (closed to baseline)
  meanPath: string; // smooth mean line
  /** days in the window with no figure, where the lines break; marked on the axis. */
  noData: Array<{ day: number; x: number }>;
  /** map a day number to its x; used for events / scrubber. */
  xOf: (day: number) => number;
  yOf: (value: number) => number;
  /** fraction 0–1 of a day along the x-axis, for staggering the reveal. */
  fracOf: (day: number) => number;
  /** ascending, so the last entry is the top line; the first is the baseline. */
  gridLines: Array<{ value: number; y: number; label: string }>;
};

// Quarter steps that read cleanly as axis labels.
const NICE_STEPS = [1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10];

/**
 * Ceiling for a zoomed y-axis: the smallest value with a round quarter that still
 * clears the window's tallest day. Zooming into a stretch of low days is the point
 * of the range control — a fixed 0–100 axis flattens those weeks into a hairline.
 */
export function niceMax(value: number): number {
  if (!(value > 0)) return 1;
  const quarter = (value * 1.1) / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(quarter)));
  const mult = NICE_STEPS.find((m) => quarter <= m * mag) ?? 10;
  return mult * mag * 4;
}

/* ---- log axis ---- */

// Candidate round values per decade, coarsest first. A wide window gets the 1-2-5
// ladder; a narrow one (a week of weeknights) needs the finer rungs to show any
// gridline at all between its floor and ceiling.
const LOG_LADDERS = [
  [1, 2, 5],
  [1, 2, 3, 5],
  [1, 1.5, 2, 3, 4, 5, 6, 8],
];
const FINEST = LOG_LADDERS[LOG_LADDERS.length - 1];

function ladder(steps: number[], lo: number, hi: number): number[] {
  const out: number[] = [];
  for (let k = Math.floor(Math.log10(lo)) - 1; k <= Math.ceil(Math.log10(hi)); k++) {
    for (const s of steps) {
      const v = Number((s * 10 ** k).toPrecision(6));
      if (v >= lo * 0.999 && v <= hi * 1.001) out.push(v);
    }
  }
  return out;
}

/** Smallest round value at or above `value`. */
function logCeil(value: number): number {
  return ladder(FINEST, value, value * 10)[0] ?? value;
}

// Floors stay on a coarse ladder so the baseline reads cleanly, with one half-step
// so a window bottoming out just above 2 does not drop a whole extra rung to 1.
const FLOOR_RUNGS = [1, 1.5, 2, 3, 5];

/** Largest round value at or below `value`. */
function logFloor(value: number): number {
  const rungs = ladder(FLOOR_RUNGS, value / 10, value);
  return rungs[rungs.length - 1] ?? value;
}

/**
 * The y-range a window is drawn on. On a linear axis the full range stays pinned
 * to 0-100 so "100 = the biggest day" never shifts under the reader, and a zoomed
 * window rescales to its own tallest day. A log axis cannot reach 0, so it also
 * needs a floor: a round value just under the window's lowest reading (peak or
 * mean, since both lines are drawn).
 */
export function axisFor(
  days: ParticipationDay[],
  scale: Scale,
  full: boolean,
): { minY: number; maxY: number } {
  const measured = days.filter(isMeasured);
  if (measured.length === 0) return { minY: scale === "log" ? 1 : 0, maxY: VIEW.maxY };
  const windowPeak = Math.max(...measured.map((d) => d.peak));
  if (scale === "linear") {
    const maxY = full || windowPeak >= VIEW.maxY ? VIEW.maxY : niceMax(windowPeak);
    return { minY: 0, maxY };
  }
  const low = Math.min(...measured.map((d) => Math.min(d.peak, d.mean)));
  const maxY = full || windowPeak >= VIEW.maxY ? VIEW.maxY : logCeil(windowPeak * 1.1);
  return { minY: logFloor(low * 0.9), maxY };
}

/**
 * Gridlines for a log axis: the floor and ceiling always, plus the coarsest ladder
 * that puts at least two rungs between them. A rung crowding a bound is dropped so
 * two labels never stack.
 */
function logGridValues(minY: number, maxY: number): number[] {
  const span = Math.log10(maxY) - Math.log10(minY);
  const inner = (steps: number[]) =>
    ladder(steps, minY, maxY).filter((v) => v > minY * 1.001 && v < maxY * 0.999);
  const rungs = LOG_LADDERS.map(inner).find((r) => r.length >= 2) ?? inner(FINEST);
  const minGap = span * 0.06;
  const kept = [minY];
  for (const v of rungs) {
    if (Math.log10(v) - Math.log10(kept[kept.length - 1]) < minGap) continue;
    if (Math.log10(maxY) - Math.log10(v) < minGap) continue;
    kept.push(v);
  }
  kept.push(maxY);
  return kept;
}

function monotonePath(pts: Array<{ x: number; y: number }>): string {
  const n = pts.length;
  if (n === 0) return "";
  // a lone night between two gaps: a zero-length segment, which round caps draw as a dot
  if (n === 1) return `M ${round(pts[0].x)} ${round(pts[0].y)} L ${round(pts[0].x)} ${round(pts[0].y)}`;

  // Fritsch–Carlson monotone tangents (no overshoot below the baseline).
  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = pts[i + 1].x - pts[i].x;
    slope[i] = (pts[i + 1].y - pts[i].y) / dx[i];
  }
  const m: number[] = new Array(n);
  m[0] = slope[0];
  m[n - 1] = slope[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (slope[i - 1] * slope[i] <= 0) {
      m[i] = 0;
    } else {
      let t = (slope[i - 1] + slope[i]) / 2;
      const lim = 3 * Math.min(Math.abs(slope[i - 1]), Math.abs(slope[i]));
      if (Math.abs(t) > lim) t = lim * Math.sign(t);
      m[i] = t;
    }
  }

  let d = `M ${round(pts[0].x)} ${round(pts[0].y)}`;
  for (let i = 0; i < n - 1; i++) {
    const c1x = pts[i].x + dx[i] / 3;
    const c1y = pts[i].y + (m[i] * dx[i]) / 3;
    const c2x = pts[i + 1].x - dx[i] / 3;
    const c2y = pts[i + 1].y - (m[i + 1] * dx[i]) / 3;
    d += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(pts[i + 1].x)} ${round(pts[i + 1].y)}`;
  }
  return d;
}

const round = (n: number) => Math.round(n * 100) / 100;
const tick = (n: number) => String(Number(n.toFixed(2)));

export function buildGeometry(
  data: ParticipationDay[],
  maxY: number = VIEW.maxY,
  scale: Scale = "linear",
  minY: number = 0,
): ChartGeometry {
  const { width, height, padTop, padBottom, padLeft, padRight } = VIEW;
  const left = padLeft;
  const right = width - padRight;
  const top = padTop;
  const bottom = height - padBottom;
  const plotW = right - left;
  const plotH = bottom - top;

  // x is mapped off the window's own first/last day, so a slice of the series
  // fills the plot exactly the way the full range does.
  const firstDay = data[0]?.day ?? 1;
  const lastDay = data[data.length - 1]?.day ?? firstDay;
  const span = Math.max(1, lastDay - firstDay);

  const xOf = (day: number) => left + ((day - firstDay) / span) * plotW;
  const logLo = Math.log10(Math.max(minY, 1e-6));
  const logSpan = Math.log10(maxY) - logLo;
  // Both mappings clamp at the floor, so nothing is ever drawn below the plot. The
  // log one is rounded: Math.log10 can differ in its last bit between the server's
  // V8 and the browser's, and an unrounded coordinate then fails hydration.
  const yOf =
    scale === "log"
      ? (value: number) =>
          round(top + (1 - (Math.log10(Math.max(value, minY)) - logLo) / logSpan) * plotH)
      : (value: number) => top + (1 - Math.max(0, value) / maxY) * plotH;
  const fracOf = (day: number) => (day - firstDay) / span;

  // A day with no figure breaks the lines: they stop at the last measured day before it
  // and start again at the first one after. Bridging it would draw a curve through a
  // value nobody measured, and dropping to zero would draw a collapse that never
  // happened; the chart marks the gap on the axis instead (`noData`).
  const runs: MeasuredDay[][] = [];
  let run: MeasuredDay[] = [];
  for (const d of data) {
    if (isMeasured(d)) {
      run.push(d);
    } else if (run.length) {
      runs.push(run);
      run = [];
    }
  }
  if (run.length) runs.push(run);
  const peakRuns: Pt[][] = runs.map((r) => r.map((d) => ({ day: d.day, x: xOf(d.day), y: yOf(d.peak), d })));
  const meanRuns: Pt[][] = runs.map((r) => r.map((d) => ({ day: d.day, x: xOf(d.day), y: yOf(d.mean), d })));
  const points = peakRuns.flat();
  const meanPoints = meanRuns.flat();

  const linePath = peakRuns.map(monotonePath).join(" ");
  const meanPath = meanRuns.map(monotonePath).join(" ");
  // Each run's fill closes on its own first and last x, so a gap stays empty down to the
  // baseline and a window ending on a day with no figure stops the fill where the line
  // stops. With every day measured this is one run spanning the plot, as before.
  const areaPath = peakRuns
    .map(
      (r) =>
        `${monotonePath(r)} L ${round(r[r.length - 1].x)} ${round(bottom)}` +
        ` L ${round(r[0].x)} ${round(bottom)} Z`,
    )
    .join(" ");
  const noData = data.filter((d) => !isMeasured(d)).map((d) => ({ day: d.day, x: xOf(d.day) }));

  const gridValues =
    scale === "log" ? logGridValues(minY, maxY) : [0, 0.25, 0.5, 0.75, 1].map((f) => maxY * f);
  const gridLines = gridValues.map((value) => ({ value, y: yOf(value), label: tick(value) }));

  return {
    view: VIEW,
    plot: { left, right, top, bottom, width: plotW, height: plotH },
    firstDay,
    lastDay,
    maxY,
    minY,
    scale,
    slotWidth: plotW / span,
    points,
    meanPoints,
    linePath,
    areaPath,
    meanPath,
    noData,
    xOf,
    yOf,
    fracOf,
    gridLines,
  };
}
