"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  CloudRain,
  Crown,
  ExternalLink,
  Flag,
  Play,
  Plane,
  RotateCcw,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  participation,
  participationEvents,
  type ParticipationDay,
  type ParticipationEvent,
} from "@/data/participation";
import { buildGeometry, niceMax, VIEW } from "@/components/participation/geometry";

type Locale = "sq" | "en";

const FIRST_DAY = participation[0].day;
const LAST_DAY = participation[participation.length - 1].day;
const PEAK_DAY = 21;

const BY_DAY = new Map(participation.map((d) => [d.day, d]));

const ICONS: Record<ParticipationEvent["icon"], LucideIcon> = {
  peak: Crown,
  plane: Plane,
  people: Users,
  rain: CloudRain,
  spark: Sparkles,
  flag: Flag,
};

/* ---- windows ---- */

type Range = { key: string; from: number; to: number };

const FULL: Range = { key: "all", from: FIRST_DAY, to: LAST_DAY };

/** Two points is the minimum a line can be drawn through. */
function clampRange(from: number, to: number, key: string): Range {
  const hi = Math.min(LAST_DAY, Math.max(FIRST_DAY + 1, to));
  const lo = Math.max(FIRST_DAY, Math.min(from, hi - 1));
  return { key, from: lo, to: hi };
}

const lastN = (n: number): Range => clampRange(LAST_DAY - n + 1, LAST_DAY, String(n));

const WEEK_LENGTH = 7;

type Week = {
  n: number;
  from: number;
  to: number;
  /** highest daily peak in the week. */
  peak: number;
  /** average of the week's daily peaks. */
  avg: number;
};

const WEEKS: Week[] = Array.from(
  { length: Math.ceil(participation.length / WEEK_LENGTH) },
  (_, i) => {
    const days = participation.slice(i * WEEK_LENGTH, (i + 1) * WEEK_LENGTH);
    return {
      n: i + 1,
      from: days[0].day,
      to: days[days.length - 1].day,
      peak: Math.max(...days.map((d) => d.peak)),
      avg: days.reduce((sum, d) => sum + d.peak, 0) / days.length,
    };
  },
);

/**
 * The navigator strip spans a 24× dynamic range (a 100-point Saturday next to
 * 4-point weeknights), so its bars are square-root scaled — linear heights would
 * collapse every week after the third into an unreadable stub. It is a navigator,
 * not a reading surface: the exact figures live in the chart above and in each
 * bar's accessible label.
 */
const barPct = (value: number) =>
  Math.max(3, Math.sqrt(Math.max(0, value) / VIEW.maxY) * 100);

/* ---- in-plot annotations ---- */

const CHIP_SLOT = 200; // horizontal room one chip needs, in viewBox units
const CHIP_HALF_H = 17; // half the vertical footprint of a two-line chip
const PEAK_HALF_H = 58; // the peak chip is a good deal taller
const CHIP_CLEAR = 14; // vertical breathing room demanded between two chips
const CHIP_STEP = 50; // how far a colliding chip is nudged upward (> the clearance)

/**
 * Rough painted width of a chip, derived from its own text. Deliberately an
 * estimate rather than a measurement: it has to produce identical numbers on the
 * server and on the client, so it can never touch layout.
 */
function chipWidth(ev: ParticipationEvent, locale: Locale): number {
  const floor = ev.tier === "peak" ? 150 : 70;
  return Math.max(
    ev.label[locale].length * 7.6,
    ev.sub[locale].length * 6.2,
    floor,
  );
}

type PlacedChip = {
  ev: ParticipationEvent;
  x: number;
  y: number;
  place: "start" | "center" | "end";
  /** painted extents, used for collision and for the leader line's endpoint. */
  left: number;
  right: number;
  halfH: number;
};

/**
 * Lay the surviving chips out left to right, nudging each one up until it clears
 * everything already placed. Replaces the hand-tuned label table: with only a
 * handful of chips in any view there is nothing left to tune by hand.
 */
function placeChips(
  list: ParticipationEvent[],
  locale: Locale,
  xOf: (day: number) => number,
  yOf: (value: number) => number,
  peakChipY: number,
  viewWidth: number,
): PlacedChip[] {
  const placed: PlacedChip[] = [];
  const ordered = [...list].sort((a, b) =>
    a.tier === "peak" ? -1 : b.tier === "peak" ? 1 : a.day - b.day,
  );

  for (const ev of ordered) {
    const x = xOf(ev.day);
    const halfW = chipWidth(ev, locale) / 2;
    const place =
      x + halfW > viewWidth - 8 ? "end" : x - halfW < 8 ? "start" : "center";
    // mirror the CSS transforms so overlap is tested against what actually paints
    const left =
      place === "end"
        ? x - halfW * 1.88
        : place === "start"
          ? x - halfW * 0.12
          : x - halfW;
    const right = left + halfW * 2;
    const isPeak = ev.tier === "peak";
    const halfH = isPeak ? PEAK_HALF_H : CHIP_HALF_H;

    let y = isPeak ? peakChipY : yOf(BY_DAY.get(ev.day)?.peak ?? 0) - 46;
    if (!isPeak) {
      for (let i = 0; i < 8; i++) {
        const hit = placed.some(
          (p) =>
            right > p.left &&
            left < p.right &&
            Math.abs(p.y - y) < p.halfH + halfH + CHIP_CLEAR,
        );
        if (!hit) break;
        y -= CHIP_STEP;
      }
      y = Math.max(26, y);
    }
    placed.push({ ev, x, y, place, left, right, halfH });
  }
  return placed;
}

/** Sparse enough to stay legible at any window width. */
function xTicks(from: number, to: number): number[] {
  const span = to - from;
  const step = span <= 10 ? 1 : span <= 24 ? 3 : 5;
  const ticks = [from];
  for (let d = Math.ceil((from + 1) / step) * step; d < to; d += step) {
    if (d - from >= step * 0.5 && to - d >= step * 0.5) ticks.push(d);
  }
  ticks.push(to);
  return ticks;
}

/** A calendar month is only worth offering as a range once it has some days in it. */
const MIN_MONTH_DAYS = 4;

type Month = { key: string; from: number; to: number; month: number; year: number };

const CALENDAR_MONTHS: Month[] = participation
  .reduce<Month[]>((out, d) => {
    const [year, month] = d.date.split("-").map(Number);
    const last = out[out.length - 1];
    if (last && last.year === year && last.month === month) {
      last.to = d.day;
    } else {
      out.push({ key: `m${year}-${month}`, from: d.day, to: d.day, month, year });
    }
    return out;
  }, [])
  .filter((mo) => mo.to - mo.from + 1 >= MIN_MONTH_DAYS);

const MONTHS_SQ = [
  "janar", "shkurt", "mars", "prill", "maj", "qershor",
  "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor",
];
const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(iso: string, locale: Locale): string {
  const [, m, d] = iso.split("-").map(Number);
  const months = locale === "sq" ? MONTHS_SQ : MONTHS_EN;
  return `${d} ${months[m - 1]}`;
}

/** Albanian month names are lowercase in prose but title-case on a button. */
function monthLabel(mo: Month, locale: Locale): string {
  const name = (locale === "sq" ? MONTHS_SQ : MONTHS_EN)[mo.month - 1];
  return locale === "sq" ? name.charAt(0).toUpperCase() + name.slice(1) : name;
}

const DRAW_MS = 1800;

export type ChartLabels = {
  peakValue: string; // "100"
  peakUnit: string; // e.g. "indeks"
  legendPeak: string;
  legendMean: string;
  axisDay: string; // "Dita"
  tooltipPeak: string;
  tooltipPeakUnit: string; // shown after the number, e.g. "pikë indeksi"
  tooltipMean: string;
  tooltipMedian: string;
  tooltipSource: string;
  close: string;
  replay: string;
  ariaSummary: string;
  saturday: string;
  /** range control */
  rangeLabel: string; // "Periudha"
  rangeAll: string; // "Të gjitha ditët"
  rangeLast30: string; // "30 ditët e fundit"
  rangeLast14: string; // "14 ditët e fundit"
  /** month + week navigators */
  monthsTitle: string; // "Sipas muajit"
  weeksTitle: string; // "Sipas javës"
  weeksHint: string; // one line explaining the strip
  weekShort: string; // "Java"
  weekPeakLabel: string; // "Piku i javës"
  weekAvgLabel: string; // "Mesatarja e javës"
  /** key-moments rail */
  momentsTitle: string; // "Momentet kyçe"
};

export function ParticipationChart({
  locale,
  labels,
}: {
  locale: Locale;
  labels: ChartLabels;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollToDetail = useRef(false);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [range, setRange] = useState<Range>(FULL);
  // Hover previews a day; clicking pins it so the tooltip stays put (and its
  // link stays clickable) while the pointer travels across neighboring days.
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const active = pinned ?? hovered;

  const days = useMemo(
    () => participation.filter((d) => d.day >= range.from && d.day <= range.to),
    [range],
  );

  // The full range stays pinned to 100 so "100 = the biggest day" never shifts
  // under the reader; a zoomed window rescales to its own tallest day.
  const maxY = useMemo(() => {
    if (range.key === "all") return VIEW.maxY;
    const windowPeak = Math.max(...days.map((d) => d.peak));
    return windowPeak >= VIEW.maxY ? VIEW.maxY : niceMax(windowPeak);
  }, [days, range.key]);

  const geo = useMemo(() => buildGeometry(days, maxY), [days, maxY]);
  const ticks = useMemo(() => xTicks(range.from, range.to), [range]);
  const events = useMemo(
    () => participationEvents.filter((ev) => ev.day >= range.from && ev.day <= range.to),
    [range],
  );
  const peakVisible = range.from <= PEAK_DAY && PEAK_DAY <= range.to;

  function cancelHover() {
    if (hoverTimer.current != null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }

  function hoverDay(day: number) {
    cancelHover();
    hoverTimer.current = window.setTimeout(() => setHovered(day), 120);
  }

  function closeTip() {
    cancelHover();
    setPinned(null);
    setHovered(null);
  }

  useEffect(() => cancelHover, []);

  function selectRange(next: Range) {
    setRange(next);
    cancelHover();
    setHovered(null);
    setPinned((day) => (day != null && day >= next.from && day <= next.to ? day : null));
  }

  /** Open a day from the moments rail, widening the window if it fell outside. */
  function showDay(day: number) {
    scrollToDetail.current = pinned !== day;
    if (day < range.from || day > range.to) setRange(FULL);
    cancelHover();
    setHovered(null);
    setPinned((current) => (current === day ? null : day));
  }

  // Picking a day from the rail updates content that may be off-screen: the
  // detail card on small screens, the in-chart tooltip everywhere else.
  useEffect(() => {
    if (!scrollToDetail.current) return;
    scrollToDetail.current = false;
    if (pinned == null) return;
    const target = panelRef.current?.offsetParent ? panelRef.current : rootRef.current;
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [pinned]);

  // Arm before paint so SSR/no-JS shows the finished chart, JS animates it.
  useEffect(() => {
    setArmed(true);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function replay() {
    setRevealed(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setRevealed(true)),
    );
  }

  const cls = [
    "pc",
    armed ? "is-armed" : "",
    revealed ? "is-revealed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const { view, plot, points, gridLines, xOf, yOf, fracOf, slotWidth } = geo;
  const peakDelay = (peakVisible ? fracOf(PEAK_DAY) : 0.5) * DRAW_MS + 220;
  // Vertical centre of the peak chip; its leader line stops just under the text.
  const peakChipY = yOf(VIEW.maxY) - 74;

  // Which moments earn a label inside the plot. Across the full range that is only
  // the days standing clear of the baseline crowd — the rest have no vertical room
  // and live in the rail below. Zoomed in, the whole window qualifies, as long as
  // there are at least as many 200-unit slots as there are moments to fill them.
  const chipSlots = Math.max(1, Math.floor(plot.width / CHIP_SLOT));
  let chipCandidates =
    range.key === "all"
      ? events.filter(
          (ev) =>
            ev.tier === "peak" ||
            // secondary moments are footnotes; they never earn plot space here
            (ev.tier !== "secondary" && (BY_DAY.get(ev.day)?.peak ?? 0) >= maxY * 0.3),
        )
      : events;
  if (chipCandidates.length > chipSlots) {
    const keep = new Set(
      [...chipCandidates]
        .sort((a, b) => (BY_DAY.get(b.day)?.peak ?? 0) - (BY_DAY.get(a.day)?.peak ?? 0))
        .slice(0, chipSlots)
        .map((ev) => ev.day),
    );
    chipCandidates = chipCandidates.filter((ev) => keep.has(ev.day));
  }
  const chips = placeChips(chipCandidates, locale, xOf, yOf, peakChipY, view.width);
  const chipByDay = new Map(chips.map((c) => [c.ev.day, c]));

  const activeDay = active != null ? BY_DAY.get(active) ?? null : null;
  const activePt = active != null ? points.find((p) => p.day === active) ?? null : null;

  return (
    <>
    <div
      className={cls}
      ref={rootRef}
      style={
        {
          "--draw-ms": `${DRAW_MS}ms`,
          "--peak-delay": `${peakDelay}ms`,
          aspectRatio: `${view.width} / ${view.height}`,
        } as CSSProperties
      }
      onMouseLeave={() => {
        cancelHover();
        setHovered(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") closeTip();
      }}
    >
      <svg
        className="pc-svg"
        viewBox={`0 0 ${view.width} ${view.height}`}
        role="img"
        aria-label={labels.ariaSummary}
      >
        <defs>
          <linearGradient id="pc-line-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#7f1111" />
            <stop offset="0.55" stopColor="#b91c1c" />
            <stop offset="1" stopColor="#b7791f" />
          </linearGradient>
          <linearGradient id="pc-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d4453f" stopOpacity="0.34" />
            <stop offset="0.45" stopColor="#b91c1c" stopOpacity="0.2" />
            <stop offset="1" stopColor="#b91c1c" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="pc-peak-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#d4453f" stopOpacity="0.55" />
            <stop offset="1" stopColor="#d4453f" stopOpacity="0" />
          </radialGradient>
          <filter id="pc-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
              result="n"
            />
            <feColorMatrix in="n" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.04" />
            </feComponentTransfer>
            <feComposite operator="over" in2="SourceGraphic" />
          </filter>
          <clipPath id="pc-wipe">
            <rect
              className="pc-wipe-rect"
              x={plot.left}
              y="0"
              width={plot.width}
              height={view.height}
            />
          </clipPath>
        </defs>

        {/* paper grain */}
        <rect
          x="0"
          y="0"
          width={view.width}
          height={view.height}
          fill="#fffaf2"
          filter="url(#pc-grain)"
          opacity="0.9"
        />

        {/* Saturday bands */}
        {days
          .filter((d) => d.saturday)
          .map((d) => (
            <rect
              key={`sat-${d.day}`}
              className="pc-band"
              x={xOf(d.day) - slotWidth / 2}
              y={plot.top}
              width={slotWidth}
              height={plot.bottom - plot.top}
              fill="#b7791f"
              opacity="0.08"
            />
          ))}

        {/* reference hairlines + y labels */}
        {gridLines.map((g, i) => (
          <g key={`grid-${g.value}`}>
            <line
              x1={plot.left}
              x2={plot.right}
              y1={g.y}
              y2={g.y}
              stroke="#ded7cc"
              strokeWidth="1"
              opacity={g.value === 0 ? 0.9 : 0.5}
            />
            <text
              className={
                i === gridLines.length - 1 ? "pc-ylabel pc-ylabel--top" : "pc-ylabel"
              }
              x={plot.left + 4}
              y={g.y - 6}
              fill="#8a8378"
            >
              {g.label}
            </text>
          </g>
        ))}

        {/* x axis labels */}
        {ticks.map((day) => (
          <text
            key={`x-${day}`}
            className="pc-xlabel"
            x={xOf(day)}
            y={plot.bottom + 28}
            fill="#5f625f"
            textAnchor="middle"
          >
            {day === 1 ? `${labels.axisDay} 1` : day}
          </text>
        ))}

        {/* area + mean, revealed by the left→right wipe */}
        <g clipPath="url(#pc-wipe)">
          <path className="pc-area" d={geo.areaPath} fill="url(#pc-area-grad)" />
          <path
            className="pc-mean"
            d={geo.meanPath}
            fill="none"
            stroke="#5f625f"
            strokeWidth="1.6"
            strokeOpacity="0.55"
            strokeDasharray="2 4"
            strokeLinecap="round"
          />
        </g>

        {/* hero line, drawn with a pen-tip dashoffset */}
        <path
          className="pc-line"
          d={geo.linePath}
          fill="none"
          stroke="url(#pc-line-grad)"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
        />

        {/* peak apex glow + pulse */}
        {peakVisible && (
          <circle
            className="pc-peak-glow"
            cx={xOf(PEAK_DAY)}
            cy={yOf(VIEW.maxY)}
            r="46"
            fill="url(#pc-peak-glow)"
          />
        )}

        {/* moment markers: a dot on the line, plus a leader for whatever earned a
            chip in this view; unlabelled moments are named in the rail below */}
        {events.map((ev) => {
          const px = xOf(ev.day);
          const py = yOf((BY_DAY.get(ev.day) as ParticipationDay).peak);
          const isPeak = ev.tier === "peak";
          const chip = chipByDay.get(ev.day);
          // stop the line just under the chip's text rather than through it
          const leadEnd = chip ? chip.y + chip.halfH + (isPeak ? 0 : 6) : null;
          return (
            <g
              key={`lead-${ev.day}`}
              className={[
                "pc-event",
                `pc-event--${ev.tier}`,
                ev.mobile ? "" : "pc-event--desk",
                pinned === ev.day ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--delay": `${fracOf(ev.day) * DRAW_MS}ms` } as CSSProperties}
            >
              {leadEnd != null && leadEnd < py - 4 && (
                <line
                  className="pc-lead"
                  x1={px}
                  y1={py}
                  x2={px}
                  y2={leadEnd}
                  stroke={isPeak ? "#7f1111" : "#8a8378"}
                  strokeWidth={isPeak ? 1.6 : 1}
                  strokeDasharray={isPeak ? "0" : "3 3"}
                />
              )}
              <circle
                cx={px}
                cy={py}
                r={isPeak ? 6 : 4}
                fill={ev.icon === "rain" ? "#0f766e" : "#b91c1c"}
                stroke="#fffaf2"
                strokeWidth="2.2"
              />
            </g>
          );
        })}

        {/* active-day scrubber + marker */}
        {activePt && (
          <g className="pc-scrub" aria-hidden="true">
            <line
              x1={activePt.x}
              x2={activePt.x}
              y1={plot.top}
              y2={plot.bottom}
              stroke="#151515"
              strokeWidth="1"
              strokeOpacity="0.18"
            />
            <circle
              cx={activePt.x}
              cy={activePt.y}
              r="6.5"
              fill="#b91c1c"
              stroke="#fffaf2"
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* invisible per-day hover/focus targets */}
        {points.map((p) => (
          <rect
            key={`hit-${p.day}`}
            className="pc-hit"
            x={p.x - slotWidth / 2}
            y={plot.top}
            width={slotWidth}
            height={plot.bottom - plot.top}
            fill="transparent"
            tabIndex={0}
            role="button"
            aria-label={`${labels.axisDay} ${p.day}, ${formatDate(p.d.date, locale)}: ${labels.tooltipPeak} ${p.d.peak.toFixed(0)}`}
            aria-pressed={pinned === p.day}
            onMouseEnter={() => {
              if (pinned == null) hoverDay(p.day);
            }}
            onFocus={() => {
              cancelHover();
              setHovered(p.day);
            }}
            onBlur={() => setHovered(null)}
            onClick={() => {
              cancelHover();
              setHovered(p.day);
              setPinned(pinned === p.day ? null : p.day);
            }}
          />
        ))}
      </svg>

      {/* ---- HTML overlay: legend, peak number, tooltip ---- */}
      <div className="pc-legend" aria-hidden="true">
        <span className="pc-legend-peak">{labels.legendPeak}</span>
        <span className="pc-legend-mean">{labels.legendMean}</span>
      </div>

      {/* auto-placed annotations for the moments that have room in this view */}
      {chips.map(({ ev, x, y, place }) => {
        const Icon = ICONS[ev.icon];
        const style = {
          left: `${(x / view.width) * 100}%`,
          top: `${(y / view.height) * 100}%`,
          "--delay": `${fracOf(ev.day) * DRAW_MS}ms`,
        } as CSSProperties;

        if (ev.tier === "peak") {
          return (
            <div
              key={`chip-${ev.day}`}
              className={`pc-chip pc-chip--peak pc-place-${place}`}
              style={style}
            >
              <span className="pc-peak-num">{labels.peakValue}</span>
              <span className="pc-peak-meta">
                <Icon size={14} aria-hidden="true" />
                {ev.label[locale]}
              </span>
              <span className="pc-peak-sub">{ev.sub[locale]}</span>
            </div>
          );
        }
        return (
          <div
            key={`chip-${ev.day}`}
            className={`pc-chip pc-chip--${ev.tier} pc-place-${place}`}
            style={style}
          >
            <span className="pc-chip-label">
              <Icon size={13} aria-hidden="true" />
              {ev.label[locale]}
            </span>
            <span className="pc-chip-sub">{ev.sub[locale]}</span>
          </div>
        );
      })}

      {activeDay && activePt && (
        <div
          className={`pc-tip ${pinned != null ? "pc-tip--pinned" : ""} ${
            activePt.y < 230 ? "pc-tip--below" : ""
          } ${
            activePt.x > view.width * 0.7
              ? "pc-tip--end"
              : activePt.x < view.width * 0.3
                ? "pc-tip--start"
                : ""
          }`}
          style={{
            left: `${(activePt.x / view.width) * 100}%`,
            top: `${(activePt.y / view.height) * 100}%`,
          }}
          role="status"
        >
          <TipBody
            day={activeDay}
            locale={locale}
            labels={labels}
            onClose={pinned != null ? closeTip : undefined}
          />
        </div>
      )}

      <button
        type="button"
        className="pc-replay"
        onClick={replay}
        aria-label={labels.replay}
      >
        {revealed ? (
          <RotateCcw size={16} aria-hidden="true" />
        ) : (
          <Play size={16} aria-hidden="true" />
        )}
        <span className="pc-replay-text">{labels.replay}</span>
      </button>

      {/* screen-reader data table — always the full series, never the window */}
      <table className="pc-sr-only">
        <caption>{labels.ariaSummary}</caption>
        <thead>
          <tr>
            <th>{labels.axisDay}</th>
            <th>{labels.tooltipPeak}</th>
            <th>{labels.tooltipMean}</th>
          </tr>
        </thead>
        <tbody>
          {participation.map((d) => (
            <tr key={`sr-${d.day}`}>
              <td>
                {d.day} ({formatDate(d.date, locale)})
              </td>
              <td>{d.peak.toFixed(0)}</td>
              <td>{d.mean.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* full-width detail card for small screens (the floating tooltip is hidden there) */}
    {activeDay && (
      <div className="pc-tip-panel" role="status" ref={panelRef}>
        <TipBody
          day={activeDay}
          locale={locale}
          labels={labels}
          onClose={pinned != null ? closeTip : undefined}
        />
      </div>
    )}

    {/* ---- range control + week navigator ---- */}
    <div className="pc-nav">
      <div className="pc-nav-head">
        <span className="pc-nav-title">{labels.rangeLabel}</span>
        <span className="pc-nav-readout">
          {labels.axisDay} {range.from}–{range.to}
        </span>
      </div>

      <div className="pc-ranges" role="group" aria-label={labels.rangeLabel}>
        <button
          type="button"
          className="pc-range"
          aria-pressed={range.key === "all"}
          onClick={() => selectRange(FULL)}
        >
          {labels.rangeAll} ({participation.length})
        </button>
        {participation.length > 30 && (
          <button
            type="button"
            className="pc-range"
            aria-pressed={range.key === "30"}
            onClick={() => selectRange(lastN(30))}
          >
            {labels.rangeLast30}
          </button>
        )}
        {participation.length > 14 && (
          <button
            type="button"
            className="pc-range"
            aria-pressed={range.key === "14"}
            onClick={() => selectRange(lastN(14))}
          >
            {labels.rangeLast14}
          </button>
        )}
      </div>

      {CALENDAR_MONTHS.length > 1 && (
        <>
          <span className="pc-nav-subtitle">{labels.monthsTitle}</span>
          <div className="pc-ranges" role="group" aria-label={labels.monthsTitle}>
            {CALENDAR_MONTHS.map((mo) => (
              <button
                key={mo.key}
                type="button"
                className="pc-range"
                aria-pressed={range.key === mo.key}
                onClick={() =>
                  selectRange(
                    range.key === mo.key ? FULL : clampRange(mo.from, mo.to, mo.key),
                  )
                }
              >
                {monthLabel(mo, locale)}
              </button>
            ))}
          </div>
        </>
      )}

      <span className="pc-nav-subtitle">{labels.weeksTitle}</span>
      <div className="pc-weeks" role="group" aria-label={labels.weeksTitle}>
        {WEEKS.map((w) => (
          <button
            key={`wk-${w.n}`}
            type="button"
            className="pc-wk"
            aria-pressed={range.key === `w${w.n}`}
            aria-label={`${labels.weekShort} ${w.n}, ${labels.axisDay} ${w.from}–${w.to}, ${labels.weekPeakLabel} ${w.peak.toFixed(0)}, ${labels.weekAvgLabel} ${w.avg.toFixed(0)}`}
            onClick={() =>
              selectRange(
                range.key === `w${w.n}`
                  ? FULL
                  : clampRange(w.from, w.to, `w${w.n}`),
              )
            }
          >
            <span className="pc-wk-bar" aria-hidden="true">
              <span className="pc-wk-peak" style={{ height: `${barPct(w.peak)}%` }} />
              <span className="pc-wk-fill" style={{ height: `${barPct(w.avg)}%` }} />
              <span className="pc-wk-avg" style={{ bottom: `${barPct(w.avg)}%` }} />
            </span>
            <span className="pc-wk-n" aria-hidden="true">
              {w.n}
            </span>
          </button>
        ))}
      </div>
      <div className="pc-wk-legend" aria-hidden="true">
        <span className="pc-wk-legend-peak">{labels.weekPeakLabel}</span>
        <span className="pc-wk-legend-avg">{labels.weekAvgLabel}</span>
      </div>
      <p className="pc-nav-hint">{labels.weeksHint}</p>
    </div>

    {/* ---- key moments: labels live here instead of floating over the plot ---- */}
    <h2 className="pc-rail-title">{labels.momentsTitle}</h2>
    <ul className="pc-events-list">
      {participationEvents.map((ev) => {
        const Icon = ICONS[ev.icon];
        return (
          <li key={`ev-li-${ev.day}`}>
            <button
              type="button"
              className={`pc-ev-btn${pinned === ev.day ? " is-active" : ""}`}
              onClick={() => showDay(ev.day)}
            >
              <span className="pc-ev-day">
                {labels.axisDay} {ev.day}
              </span>
              <Icon size={16} aria-hidden="true" />
              <span className="pc-ev-text">
                <strong>{ev.label[locale]}</strong>
                <span>{ev.sub[locale]}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
    </>
  );
}

function renderNote(day: ParticipationDay, locale: Locale) {
  const text = day.note[locale];
  const link = day.noteLink;
  if (!link) return text;
  const word = link.word[locale];
  const i = text.indexOf(word);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <a
        className="pc-tip-note-link"
        href={link.href}
        target="_blank"
        rel="noreferrer"
      >
        {word}
      </a>
      {text.slice(i + word.length)}
    </>
  );
}

function TipBody({
  day,
  locale,
  labels,
  onClose,
}: {
  day: ParticipationDay;
  locale: Locale;
  labels: ChartLabels;
  onClose?: () => void;
}) {
  return (
    <>
      <div className="pc-tip-head">
        <strong>
          {labels.axisDay} {day.day}
        </strong>
        <span>
          {formatDate(day.date, locale)}
          {day.saturday ? ` · ${labels.saturday}` : ""}
        </span>
        {onClose && (
          <button
            type="button"
            className="pc-tip-close"
            aria-label={labels.close}
            onClick={onClose}
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="pc-tip-stats">
        <span className="pc-tip-peak">
          <em>{day.peak.toFixed(0)}</em>
          {labels.tooltipPeakUnit}
        </span>
        <span>
          {labels.tooltipMean} {day.mean.toFixed(1)}
        </span>
        <span>
          {labels.tooltipMedian} {day.median.toFixed(1)}
        </span>
      </div>
      <p className="pc-tip-note">{renderNote(day, locale)}</p>
      <a
        className="pc-tip-link"
        href={day.source}
        target="_blank"
        rel="noreferrer"
      >
        <ExternalLink size={13} aria-hidden="true" />
        {labels.tooltipSource}
      </a>
    </>
  );
}
