// Pure geometry for the participation chart. Runs identically on server and client
// so the SVG markup hydrates without mismatch. No external dependencies.

import type { ParticipationDay } from "@/data/participation";

export const VIEW = {
  width: 1000,
  height: 600,
  padTop: 132, // headroom above the plot for the floating peak number / flags
  padBottom: 64, // x-axis labels
  padLeft: 40,
  padRight: 40,
  maxY: 100, // default ceiling: 100 = the biggest day, the whole-range reading
};

export type Pt = { day: number; x: number; y: number; d: ParticipationDay };

export type ChartGeometry = {
  view: typeof VIEW;
  plot: { left: number; right: number; top: number; bottom: number; width: number; height: number };
  /** first / last day of the rendered window. */
  firstDay: number;
  lastDay: number;
  /** ceiling of the y-axis for this window. */
  maxY: number;
  /** horizontal distance between two adjacent days, for bands and hit targets. */
  slotWidth: number;
  points: Pt[]; // peak series
  meanPoints: Pt[];
  linePath: string; // smooth peak line
  areaPath: string; // smooth peak area (closed to baseline)
  meanPath: string; // smooth mean line
  /** map a day number to its x; used for events / scrubber. */
  xOf: (day: number) => number;
  yOf: (value: number) => number;
  /** fraction 0–1 of a day along the x-axis, for staggering the reveal. */
  fracOf: (day: number) => number;
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

function monotonePath(pts: Array<{ x: number; y: number }>): string {
  const n = pts.length;
  if (n === 0) return "";
  if (n === 1) return `M ${pts[0].x} ${pts[0].y}`;

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
  const yOf = (value: number) => top + (1 - Math.max(0, value) / maxY) * plotH;
  const fracOf = (day: number) => (day - firstDay) / span;

  const points: Pt[] = data.map((d) => ({ day: d.day, x: xOf(d.day), y: yOf(d.peak), d }));
  const meanPoints: Pt[] = data.map((d) => ({ day: d.day, x: xOf(d.day), y: yOf(d.mean), d }));

  const linePath = monotonePath(points);
  const meanPath = monotonePath(meanPoints);
  const areaPath =
    `${linePath} L ${round(right)} ${round(bottom)} L ${round(left)} ${round(bottom)} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const value = maxY * f;
    return { value, y: yOf(value), label: tick(value) };
  });

  return {
    view: VIEW,
    plot: { left, right, top, bottom, width: plotW, height: plotH },
    firstDay,
    lastDay,
    maxY,
    slotWidth: plotW / span,
    points,
    meanPoints,
    linePath,
    areaPath,
    meanPath,
    xOf,
    yOf,
    fracOf,
    gridLines,
  };
}
