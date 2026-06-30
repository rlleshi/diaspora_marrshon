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
  maxY: 100,
};

export type Pt = { day: number; x: number; y: number; d: ParticipationDay };

export type ChartGeometry = {
  view: typeof VIEW;
  plot: { left: number; right: number; top: number; bottom: number; width: number; height: number };
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
  gridLines: Array<{ value: number; y: number }>;
};

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

export function buildGeometry(data: ParticipationDay[]): ChartGeometry {
  const { width, height, padTop, padBottom, padLeft, padRight, maxY } = VIEW;
  const left = padLeft;
  const right = width - padRight;
  const top = padTop;
  const bottom = height - padBottom;
  const plotW = right - left;
  const plotH = bottom - top;
  const days = data.length;

  const xOf = (day: number) => left + ((day - 1) / (days - 1)) * plotW;
  const yOf = (value: number) => top + (1 - Math.max(0, value) / maxY) * plotH;
  const fracOf = (day: number) => (day - 1) / (days - 1);

  const points: Pt[] = data.map((d) => ({ day: d.day, x: xOf(d.day), y: yOf(d.peak), d }));
  const meanPoints: Pt[] = data.map((d) => ({ day: d.day, x: xOf(d.day), y: yOf(d.mean), d }));

  const linePath = monotonePath(points);
  const meanPath = monotonePath(meanPoints);
  const areaPath =
    `${linePath} L ${round(right)} ${round(bottom)} L ${round(left)} ${round(bottom)} Z`;

  const gridLines = [0, 25, 50, 75, 100].map((value) => ({ value, y: yOf(value) }));

  return {
    view: VIEW,
    plot: { left, right, top, bottom, width: plotW, height: plotH },
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
