"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  CalendarDays,
  ChartLine,
  ChartSpline,
  CloudRain,
  Crown,
  ExternalLink,
  Flag,
  Grip,
  Play,
  Plane,
  RotateCcw,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  isMeasured,
  participation,
  participationEvents,
  type ParticipationDay,
  type ParticipationEvent,
} from "@/data/participation";
import { axisFor, buildGeometry, VIEW, type Scale } from "@/components/participation/geometry";
import { CalendarView, type CalendarMark } from "@/components/participation/CalendarView";

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

/**
 * On phones the key-moments list opens short: the four biggest nights tell how it
 * started, the newest moment shows it is still going. The rest wait behind
 * "show all" so the list doesn't run a screen and a half.
 */
const RAIL_FEATURED = new Set([
  ...[...participationEvents]
    .sort((a, b) => (BY_DAY.get(b.day)?.peak ?? 0) - (BY_DAY.get(a.day)?.peak ?? 0))
    .slice(0, 4)
    .map((ev) => ev.day),
  participationEvents[participationEvents.length - 1].day,
]);

/* ---- views ---- */

type View = "log" | "linear" | "calendar" | "dots";

const VIEWS: Array<{ key: View; icon: LucideIcon }> = [
  { key: "log", icon: ChartSpline },
  { key: "linear", icon: ChartLine },
  { key: "calendar", icon: CalendarDays },
  { key: "dots", icon: Grip },
];

/** The two calendar views share one grid, card and layout; only the marks differ. */
const isCalendar = (v: View) => v === "calendar" || v === "dots";

// The page opens on the log axis: it is the one view where a 100-point Saturday
// and a 4-point weeknight are both legible at once.
const DEFAULT_VIEW: View = "log";

// Phones open on the same log axis, zoomed to the last 30 nights: the whole run at phone
// width packs each night into a couple of pixels, while a month reads night by night and
// keeps the chart short. "All days" and the dot calendar are one tap away.
const NARROW_DEFAULT_DAYS = 30;

/**
 * How far a day stands above its own fortnight: its peak over the median peak of
 * the seven days either side. On a log axis vertical distance *is* this ratio, so
 * it ranks which moments visibly stand out, where the raw value would only ever
 * pick the June giants.
 */
const PROMINENCE = new Map(
  participation.map((d, i) => {
    if (d.peak == null) return [d.day, 0];
    const around = participation
      .slice(Math.max(0, i - 7), i + 8)
      .filter((n) => n.day !== d.day && n.peak != null)
      .map((n) => n.peak as number)
      .sort((a, b) => a - b);
    if (around.length === 0) return [d.day, 1];
    const mid = around.length / 2;
    const median =
      around.length % 2 ? around[Math.floor(mid)] : (around[mid - 1] + around[mid]) / 2;
    return [d.day, d.peak / median];
  }),
);

/**
 * A moment needs twice its fortnight's level to earn a label on the full log view.
 * Chip placement avoids other chips but not the line, so the bar is set where a
 * label reliably has clear air: day 31 (1.97x) sits in the shadow of the 20 June
 * spike and its label lands across it. It still shows once the reader zooms in.
 */
const LOG_CHIP_PROMINENCE = 2;

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
  /** false when no day in the week was analyzed, so its figures are absent, not zero. */
  hasData: boolean;
};

const WEEKS: Week[] = Array.from(
  { length: Math.ceil(participation.length / WEEK_LENGTH) },
  (_, i) => {
    const days = participation.slice(i * WEEK_LENGTH, (i + 1) * WEEK_LENGTH);
    // An unanalyzed day is absent from the week's figures rather than counted as a
    // zero, which would drag the average down for a day nobody measured.
    const measured = days.filter(isMeasured);
    return {
      n: i + 1,
      from: days[0].day,
      to: days[days.length - 1].day,
      peak: measured.length ? Math.max(...measured.map((d) => d.peak)) : 0,
      avg: measured.length
        ? measured.reduce((sum, d) => sum + d.peak, 0) / measured.length
        : 0,
      hasData: measured.length > 0,
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

/* Every measurement below is in CSS pixels, because a chip is HTML text whose size
   does not follow the SVG viewBox. `unitsPerCss` converts them into viewBox units
   for the actual placement — at phone width the box compresses ~2.8x while the
   text does not, so treating the two as interchangeable badly under-counts overlap. */
const CHIP_MIN_SLOT = { narrow: 150, wide: 200 }; // horizontal room one chip needs
const CHIP_CLEAR = 8; // vertical breathing room demanded between two chips
const CHIP_LIFT = { narrow: 8, wide: 29 }; // gap between the point and the chip box
const CHIP_MIN_Y = 20; // never push a chip above this viewBox y

/**
 * Painted size of a chip, estimated from its own text. Deliberately an estimate
 * rather than a measurement: it must produce identical numbers on the server and
 * on the client, so it can never read layout.
 */
function chipMetrics(ev: ParticipationEvent, locale: Locale, narrow: boolean) {
  const labelChar = narrow ? 6.4 : 7.1;
  const subChar = narrow ? 5.2 : 5.7;
  // icon + gap, plus the paper backing's padding on narrow screens
  const chrome = narrow ? 42 : 26;
  return {
    width: Math.max(
      ev.label[locale].length * labelChar + chrome,
      ev.sub[locale].length * subChar + chrome,
      ev.tier === "peak" ? 120 : 64,
    ),
    height: ev.tier === "peak" ? (narrow ? 92 : 104) : narrow ? 30 : 34,
  };
}

type PlacedChip = {
  ev: ParticipationEvent;
  x: number;
  /** the value handed to CSS `top`. */
  y: number;
  /** true vertical centre. Differs from `y` for the peak chip on narrow screens,
   *  where the stylesheet top-anchors it instead of centring it. */
  cy: number;
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
  opts: {
    locale: Locale;
    narrow: boolean;
    unitsPerCss: number;
    xOf: (day: number) => number;
    yOf: (value: number) => number;
    peakChipY: number;
    viewWidth: number;
  },
): PlacedChip[] {
  const { locale, narrow, unitsPerCss, xOf, yOf, peakChipY, viewWidth } = opts;
  const placed: PlacedChip[] = [];
  const ordered = [...list].sort((a, b) =>
    a.tier === "peak" ? -1 : b.tier === "peak" ? 1 : a.day - b.day,
  );
  const clear = CHIP_CLEAR * unitsPerCss;

  for (const ev of ordered) {
    const size = chipMetrics(ev, locale, narrow);
    const halfW = (size.width / 2) * unitsPerCss;
    const halfH = (size.height / 2) * unitsPerCss;
    const x = xOf(ev.day);
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

    if (ev.tier === "peak") {
      // narrow screens top-anchor this chip, so its centre is half a box lower
      const cy = narrow ? peakChipY + halfH : peakChipY;
      placed.push({ ev, x, y: peakChipY, cy, place, left, right, halfH });
      continue;
    }

    const lift = (size.height / 2 + CHIP_LIFT[narrow ? "narrow" : "wide"]) * unitsPerCss;
    const step = (size.height + CHIP_CLEAR + 4) * unitsPerCss;
    let y = yOf(BY_DAY.get(ev.day)?.peak ?? 0) - lift;
    let fits = false;
    for (let i = 0; i < 8; i++) {
      if (y < CHIP_MIN_Y) break;
      const hit = placed.some(
        (p) =>
          right > p.left &&
          left < p.right &&
          Math.abs(p.cy - y) < p.halfH + halfH + clear,
      );
      if (!hit) {
        fits = true;
        break;
      }
      y -= step;
    }
    // No clear slot at this width: the moment keeps its dot on the line and the
    // rail below keeps its wording. Dropping beats stacking into a pile.
    if (!fits) continue;
    placed.push({ ev, x, y, cy: y, place, left, right, halfH });
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
/** log <-> linear: the line reshapes in place while its annotations step aside. */
const MORPH_MS = 750;

const morphD = (d: string) => ({ d: `path("${d}")` }) as CSSProperties;

export type ChartLabels = {
  peakValue: string; // "100"
  peakUnit: string; // e.g. "indeks"
  legendPeak: string;
  legendMean: string;
  axisDay: string; // "Dita"
  axisIndex: string; // y-axis title, e.g. "Indeksi i turmës"
  tooltipPeak: string;
  tooltipPeakUnit: string; // shown after the number, e.g. "pikë indeksi"
  tooltipMean: string;
  tooltipMedian: string;
  tooltipSource: string;
  /** link label for a day carried by press coverage instead of a livestream */
  tooltipSourceReport: string;
  /** stands in for the figures on a day whose livestream was never analyzed */
  noData: string;
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
  /** phone-only toggle for the shortened rail; `{n}` is the number of moments */
  momentsAll: string;
  momentsFewer: string;
  /** view switcher */
  viewLabel: string; // "Pamja"
  viewLog: string;
  viewLinear: string;
  viewCalendar: string;
  viewLogHint: string;
  viewLinearHint: string;
  /** the calendar reads differently once it turns on its side at phone width */
  viewCalendarHintWide: string;
  viewCalendarHintNarrow: string;
  /** calendar legend; `{below}` and `{total}` are filled in from the data */
  calendarLegend: string;
  calendarLegendNote: string;
  /** dot calendar: same grid, one dot per night sized by the index */
  viewDots: string;
  viewDotsHintWide: string;
  viewDotsHintNarrow: string;
  dotsLegendNote: string;
  /** takeaway over the dot grid; `{n}` is the number of nights so far */
  dotsTitleLead: string;
  dotsTitleRest: string;
  /** how to use the current view, worded for a mouse (wide) or a finger (narrow) */
  howLineWide: string;
  howLineNarrow: string;
  howCalWide: string;
  howCalNarrow: string;
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
  // Rendered width of the plot, in CSS pixels. 0 until measured: the server has no
  // viewport, so SSR lays chips out on the desktop assumption and CSS suppresses the
  // extras on small screens until `is-sized` says the real numbers have arrived.
  const [chartWidth, setChartWidth] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [range, setRange] = useState<Range>(FULL);
  const [mode, setMode] = useState<View>(DEFAULT_VIEW);
  const [morphing, setMorphing] = useState(false);
  const morphTimer = useRef<number | null>(null);
  const scale: Scale = mode === "linear" ? "linear" : "log";
  const cal = isCalendar(mode);
  const calDetailRef = useRef<HTMLDivElement | null>(null);
  const switchRef = useRef<HTMLDivElement | null>(null);
  // Where the floating card hangs in calendar view, in CSS pixels from the chart's
  // top-left. Measured off the square itself, since the grid reflows with width.
  const [calAnchor, setCalAnchor] = useState<{
    x: number;
    y: number;
    below: boolean;
    place: "start" | "center" | "end";
  } | null>(null);
  // Hover previews a day; clicking pins it so the tooltip stays put (and its
  // link stays clickable) while the pointer travels across neighboring days.
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [railOpen, setRailOpen] = useState(false);
  const weeksRef = useRef<HTMLDivElement | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const active = pinned ?? hovered;

  const days = useMemo(
    () => participation.filter((d) => d.day >= range.from && d.day <= range.to),
    [range],
  );

  const axis = useMemo(
    () => axisFor(days, scale, range.key === "all"),
    [days, scale, range.key],
  );
  const { maxY } = axis;

  const geo = useMemo(
    () => buildGeometry(days, axis.maxY, scale, axis.minY),
    [days, axis, scale],
  );
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

  useEffect(
    () => () => {
      cancelHover();
      if (morphTimer.current != null) window.clearTimeout(morphTimer.current);
    },
    [],
  );

  function selectRange(next: Range) {
    setRange(next);
    cancelHover();
    setHovered(null);
    setPinned((day) => (day != null && day >= next.from && day <= next.to ? day : null));
  }

  function selectView(next: View) {
    if (next === mode) return;
    setMode(next);
    cancelHover();
    setHovered(null);
    // A day pinned in the calendar stays pinned in the line views, so widen the
    // window if it falls outside the zoom the line view was left on.
    if (pinned != null && (pinned < range.from || pinned > range.to)) setRange(FULL);
    // Log and linear share one set of points, so they morph into each other. The
    // calendars have nothing to morph from, so crossing into or out of one re-runs
    // the reveal instead.
    if (isCalendar(mode) || isCalendar(next)) {
      replay();
      return;
    }
    setMorphing(true);
    if (morphTimer.current != null) window.clearTimeout(morphTimer.current);
    morphTimer.current = window.setTimeout(() => setMorphing(false), MORPH_MS);
  }

  function onSwitchKey(e: KeyboardEvent<HTMLDivElement>) {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const i = VIEWS.findIndex((v) => v.key === mode);
    const next = VIEWS[(i + step + VIEWS.length) % VIEWS.length].key;
    selectView(next);
    switchRef.current?.querySelector<HTMLButtonElement>(`[data-view="${next}"]`)?.focus();
  }

  /** Clicking a square pins it; clicking the pinned square again closes it. */
  function toggleCalendarDay(day: number) {
    cancelHover();
    if (pinned === day) {
      closeTip();
      return;
    }
    setHovered(day);
    setPinned(day);
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
    const target =
      [panelRef.current, calDetailRef.current].find((el) => el?.offsetParent) ??
      rootRef.current;
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [pinned]);

  // Arm before paint so SSR/no-JS shows the finished chart, JS animates it.
  // The server cannot see the screen, so phones swap to their own opening range
  // here, in the same render that arms the reveal.
  useEffect(() => {
    if (window.matchMedia("(max-width: 720px)").matches && participation.length > NARROW_DEFAULT_DAYS)
      setRange(lastN(NARROW_DEFAULT_DAYS));
    setArmed(true);
  }, []);

  // Track the plot's real width so chip placement works in the units chips are
  // actually painted in. The media query mirrors the stylesheet's own breakpoint,
  // since the smaller mobile chip font changes the metrics too.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 720px)");
    const syncNarrow = () => setNarrow(mq.matches);
    syncNarrow();
    mq.addEventListener("change", syncNarrow);
    const ro = new ResizeObserver(([entry]) => {
      const w = entry?.contentRect.width ?? 0;
      setChartWidth((prev) => (Math.abs(prev - w) > 1 ? w : prev));
    });
    ro.observe(el);
    return () => {
      mq.removeEventListener("change", syncNarrow);
      ro.disconnect();
    };
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

  useLayoutEffect(() => {
    const root = rootRef.current;
    const cell =
      cal && active != null
        ? root?.querySelector<HTMLElement>(`[data-cal-day="${active}"]`)
        : null;
    if (!root || !cell) {
      setCalAnchor(null);
      return;
    }
    const box = root.getBoundingClientRect();
    const sq = cell.getBoundingClientRect();
    const x = sq.left - box.left + sq.width / 2;
    // The card is ~220px tall; hang it under the square when there is no room above.
    const below = sq.top - box.top < 250;
    setCalAnchor({
      x,
      y: below ? sq.bottom - box.top : sq.top - box.top,
      below,
      place: x > box.width * 0.7 ? "end" : x < box.width * 0.3 ? "start" : "center",
    });
  }, [mode, active, chartWidth]);

  // On phones the week strip scrolls sideways: open it on the newest weeks. It runs
  // again once the chart has measured itself, since the strip only settles then.
  useEffect(() => {
    const strip = weeksRef.current;
    if (strip) strip.scrollLeft = strip.scrollWidth;
  }, [mode, narrow, chartWidth]);

  function replay() {
    setRevealed(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setRevealed(true)),
    );
  }

  const sized = chartWidth > 0;
  // CSS pixels -> viewBox units. 1 before measurement, i.e. the desktop assumption.
  const unitsPerCss = sized ? VIEW.width / chartWidth : 1;

  const cls = [
    "pc",
    armed ? "is-armed" : "",
    revealed ? "is-revealed" : "",
    sized ? "is-sized" : "",
    morphing ? "is-morphing" : "",
    cal ? "pc--calendar" : scale === "log" ? "pc--log" : "",
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
  const plotCssWidth = (sized ? chartWidth : view.width) * (plot.width / view.width);
  const chipSlots = Math.max(
    1,
    Math.floor(plotCssWidth / CHIP_MIN_SLOT[narrow ? "narrow" : "wide"]),
  );
  // On a linear axis a moment has room for a label once it clears 30% of the
  // height. On a log axis height is a ratio, so what earns a label is how far a day
  // rises over its own neighbours: the September diaspora march stands out there
  // as clearly as the June Saturdays do.
  const rank = (ev: ParticipationEvent) =>
    scale === "log" ? PROMINENCE.get(ev.day) ?? 0 : BY_DAY.get(ev.day)?.peak ?? 0;
  const standsOut = (ev: ParticipationEvent) =>
    scale === "log" ? rank(ev) >= LOG_CHIP_PROMINENCE : rank(ev) >= maxY * 0.3;
  let chipCandidates =
    range.key === "all"
      ? events.filter(
          (ev) =>
            ev.tier === "peak" ||
            // secondary moments are footnotes; they never earn plot space here
            (ev.tier !== "secondary" && standsOut(ev)),
        )
      : events;
  if (chipCandidates.length > chipSlots) {
    const keep = new Set(
      [...chipCandidates]
        .sort((a, b) => rank(b) - rank(a))
        .slice(0, chipSlots)
        .map((ev) => ev.day),
    );
    chipCandidates = chipCandidates.filter((ev) => keep.has(ev.day));
  }
  const chips = placeChips(chipCandidates, {
    locale,
    narrow,
    unitsPerCss,
    xOf,
    yOf,
    peakChipY,
    viewWidth: view.width,
  });
  const chipByDay = new Map(chips.map((c) => [c.ev.day, c]));

  // A phone-width plot fits exactly one label. Mark the window's tallest moment as
  // the lead so the mobile stylesheet can keep that one and drop the rest — but
  // only when the peak number is absent, since it alone fills the plot at that size.
  const leadDay = chips.some((c) => c.ev.tier === "peak")
    ? null
    : chips.reduce<number | null>(
        (best, c) =>
          best == null ||
          (BY_DAY.get(c.ev.day)?.peak ?? 0) > (BY_DAY.get(best)?.peak ?? 0)
            ? c.ev.day
            : best,
        null,
      );

  const dayLabel = (d: ParticipationDay) =>
    `${labels.axisDay} ${d.day}, ${formatDate(d.date, locale)}: ${
      d.peak == null ? labels.noData : `${labels.tooltipPeak} ${d.peak.toFixed(0)}`
    }`;
  const viewName: Record<View, string> = {
    log: labels.viewLog,
    linear: labels.viewLinear,
    calendar: labels.viewCalendar,
    dots: labels.viewDots,
  };

  const calMarks = useMemo(
    () =>
      new Map<number, CalendarMark>(
        participationEvents.map((ev) => [ev.day, { icon: ICONS[ev.icon], label: ev.label[locale] }]),
      ),
    [locale],
  );

  const activeDay = active != null ? BY_DAY.get(active) ?? null : null;
  const activePt = active != null ? points.find((p) => p.day === active) ?? null : null;
  // An unanalyzed day sits on no line, so it has no point to anchor to. It still gets a
  // guide line and its card, hung from the baseline; the marker dot stays suppressed
  // rather than being drawn at a zero that was never measured.
  const activeAnchor =
    activePt ?? (activeDay ? { x: xOf(activeDay.day), y: plot.bottom } : null);

  return (
    <>
    <div className="pc-views">
      <div
        className="pc-switch"
        role="radiogroup"
        aria-label={labels.viewLabel}
        ref={switchRef}
        onKeyDown={onSwitchKey}
        style={
          {
            "--i": VIEWS.findIndex((v) => v.key === mode),
            "--n": VIEWS.length,
          } as CSSProperties
        }
      >
        <span className="pc-switch-thumb" aria-hidden="true" />
        {VIEWS.map(({ key, icon: Icon }) => (
          <button
            key={key}
            type="button"
            role="radio"
            data-view={key}
            className="pc-switch-opt"
            aria-checked={mode === key}
            tabIndex={mode === key ? 0 : -1}
            onClick={() => selectView(key)}
          >
            <Icon size={15} aria-hidden="true" />
            <span>{viewName[key]}</span>
          </button>
        ))}
      </div>
      <p className="pc-views-hint">
        {mode === "dots" ? (
          <>
            <span className="pc-only-wide">{labels.viewDotsHintWide}</span>
            <span className="pc-only-narrow">{labels.viewDotsHintNarrow}</span>
          </>
        ) : mode === "calendar" ? (
          <>
            <span className="pc-only-wide">{labels.viewCalendarHintWide}</span>
            <span className="pc-only-narrow">{labels.viewCalendarHintNarrow}</span>
          </>
        ) : mode === "log" ? (
          labels.viewLogHint
        ) : (
          labels.viewLinearHint
        )}{" "}
        <span className="pc-only-wide">{cal ? labels.howCalWide : labels.howLineWide}</span>
        <span className="pc-only-narrow">{cal ? labels.howCalNarrow : labels.howLineNarrow}</span>
      </p>
    </div>

    <div
      className={cls}
      ref={rootRef}
      style={
        {
          "--draw-ms": `${DRAW_MS}ms`,
          "--peak-delay": `${peakDelay}ms`,
          aspectRatio: cal ? undefined : `${geo.view.width} / ${geo.view.height}`,
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
      {!cal && (
      <>
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
          <g key={`grid-${scale}-${g.value}`} className="pc-grid">
            <line
              x1={plot.left}
              x2={plot.right}
              y1={g.y}
              y2={g.y}
              stroke="#ded7cc"
              strokeWidth="1"
              opacity={i === 0 ? 0.9 : 0.5}
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

        {/* y axis title, read bottom to top in the left margin */}
        <text
          className="pc-ylabel pc-ytitle"
          transform={`translate(${plot.left / 2}, ${(plot.top + plot.bottom) / 2}) rotate(-90)`}
          fill="#8a8378"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {labels.axisIndex}
        </text>

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
          <path
            className="pc-area"
            d={geo.areaPath}
            style={morphD(geo.areaPath)}
            fill="url(#pc-area-grad)"
          />
          <path
            className="pc-mean"
            d={geo.meanPath}
            style={morphD(geo.meanPath)}
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
          style={morphD(geo.linePath)}
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
          const py = yOf(BY_DAY.get(ev.day)?.peak ?? 0);
          const isPeak = ev.tier === "peak";
          const chip = chipByDay.get(ev.day);
          // stop the line just under the chip's text rather than through it
          const leadEnd = chip ? chip.cy + chip.halfH + (isPeak ? 0 : 6) : null;
          return (
            <g
              key={`lead-${ev.day}`}
              className={[
                "pc-event",
                `pc-event--${ev.tier}`,
                ev.day === leadDay ? "pc-event--lead" : "",
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
        {activeAnchor && (
          <g className="pc-scrub" aria-hidden="true">
            <line
              x1={activeAnchor.x}
              x2={activeAnchor.x}
              y1={plot.top}
              y2={plot.bottom}
              stroke="#151515"
              strokeWidth="1"
              strokeOpacity="0.18"
            />
            {activePt && (
              <circle
                cx={activePt.x}
                cy={activePt.y}
                r="6.5"
                fill="#b91c1c"
                stroke="#fffaf2"
                strokeWidth="2.5"
              />
            )}
          </g>
        )}

        {/* invisible per-day hover/focus targets */}
        {days.map((d) => (
          <rect
            key={`hit-${d.day}`}
            className="pc-hit"
            x={xOf(d.day) - slotWidth / 2}
            y={plot.top}
            width={slotWidth}
            height={plot.bottom - plot.top}
            fill="transparent"
            tabIndex={0}
            role="button"
            aria-label={dayLabel(d)}
            aria-pressed={pinned === d.day}
            onMouseEnter={() => {
              if (pinned == null) hoverDay(d.day);
            }}
            onFocus={() => {
              cancelHover();
              setHovered(d.day);
            }}
            onBlur={() => setHovered(null)}
            onClick={() => {
              cancelHover();
              setHovered(d.day);
              setPinned(pinned === d.day ? null : d.day);
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
            className={`pc-chip pc-chip--${ev.tier}${
              ev.day === leadDay ? " pc-chip--lead" : ""
            } pc-place-${place}`}
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

      {activeDay && activeAnchor && (
        <div
          className={`pc-tip ${pinned != null ? "pc-tip--pinned" : ""} ${
            activeAnchor.y < 230 ? "pc-tip--below" : ""
          } ${
            activeAnchor.x > view.width * 0.7
              ? "pc-tip--end"
              : activeAnchor.x < view.width * 0.3
                ? "pc-tip--start"
                : ""
          }`}
          style={{
            left: `${(activeAnchor.x / view.width) * 100}%`,
            top: `${(activeAnchor.y / view.height) * 100}%`,
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
      </>
      )}

      {cal && (
        <CalendarView
          variant={mode === "dots" ? "dots" : "heat"}
          locale={locale}
          labels={{
            legendTitle: labels.calendarLegend,
            legendNote: mode === "dots" ? labels.dotsLegendNote : labels.calendarLegendNote,
            title: {
              lead: labels.dotsTitleLead.replace("{n}", String(participation.length)),
              rest: labels.dotsTitleRest,
            },
          }}
          marks={calMarks}
          dayLabel={dayLabel}
          active={active}
          pinned={pinned}
          onHover={(day) => {
            if (pinned == null) hoverDay(day);
          }}
          onFocusDay={(day) => {
            cancelHover();
            setHovered(day);
          }}
          onBlurDay={() => setHovered(null)}
          onToggle={toggleCalendarDay}
          detailRef={calDetailRef}
          detail={
            activeDay ? (
              <TipBody
                day={activeDay}
                locale={locale}
                labels={labels}
                onClose={pinned != null ? closeTip : undefined}
              />
            ) : null
          }
        />
      )}

      {cal && activeDay && calAnchor && (
        <div
          className={[
            "pc-tip",
            pinned != null ? "pc-tip--pinned" : "",
            calAnchor.below ? "pc-tip--below" : "",
            calAnchor.place === "end"
              ? "pc-tip--end"
              : calAnchor.place === "start"
                ? "pc-tip--start"
                : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ left: `${calAnchor.x}px`, top: `${calAnchor.y}px` }}
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

      {/* screen-reader data table — always the full series, never the window. The
          clipping lives on a wrapper: a table ignores width and overflow, so the class
          on the table itself let it lay out full width and push the page sideways
          wherever the card stops clipping (the calendar view). */}
      <div className="pc-sr-only">
      <table>
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
              <td>{d.peak == null ? labels.noData : d.peak.toFixed(0)}</td>
              <td>{d.mean == null ? labels.noData : d.mean.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>

    {/* full-width detail card for small screens (the floating tooltip is hidden there);
        the calendar opens its own card inline, under the tapped week */}
    {activeDay && !cal && (
      <div className="pc-tip-panel" role="status" ref={panelRef}>
        <TipBody
          day={activeDay}
          locale={locale}
          labels={labels}
          onClose={pinned != null ? closeTip : undefined}
        />
      </div>
    )}

    {/* ---- range control + week navigator (line views; the calendar is already the whole run) ---- */}
    {!cal && (
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
      <div
        className="pc-weeks"
        role="group"
        aria-label={labels.weeksTitle}
        ref={weeksRef}
      >
        {WEEKS.map((w) => (
          <button
            key={`wk-${w.n}`}
            type="button"
            className="pc-wk"
            aria-pressed={range.key === `w${w.n}`}
            aria-label={
              w.hasData
                ? `${labels.weekShort} ${w.n}, ${labels.axisDay} ${w.from}–${w.to}, ${labels.weekPeakLabel} ${w.peak.toFixed(0)}, ${labels.weekAvgLabel} ${w.avg.toFixed(0)}`
                : `${labels.weekShort} ${w.n}, ${labels.axisDay} ${w.from}–${w.to}, ${labels.noData}`
            }
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
    )}

    {/* ---- key moments: labels live here instead of floating over the plot ---- */}
    <h2 className="pc-rail-title">{labels.momentsTitle}</h2>
    <ul className={`pc-events-list${railOpen ? " is-open" : ""}`} id="pc-moments">
      {participationEvents.map((ev) => {
        const Icon = ICONS[ev.icon];
        return (
          <li key={`ev-li-${ev.day}`} className={RAIL_FEATURED.has(ev.day) ? undefined : "pc-ev-extra"}>
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
    <button
      type="button"
      className="pc-rail-more"
      aria-controls="pc-moments"
      aria-expanded={railOpen}
      onClick={() => setRailOpen((open) => !open)}
    >
      {railOpen
        ? labels.momentsFewer
        : labels.momentsAll.replace("{n}", String(participationEvents.length))}
    </button>
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
        {isMeasured(day) ? (
          <>
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
          </>
        ) : (
          <span className="pc-tip-nodata">{labels.noData}</span>
        )}
      </div>
      <p className="pc-tip-note">{renderNote(day, locale)}</p>
      <a
        className="pc-tip-link"
        href={day.source}
        target="_blank"
        rel="noreferrer"
      >
        <ExternalLink size={13} aria-hidden="true" />
        {day.source.includes("youtube.com")
          ? labels.tooltipSource
          : labels.tooltipSourceReport}
      </a>
    </>
  );
}
