"use client";

import type { CSSProperties, ReactNode, Ref } from "react";
import { isMeasured, participation, type ParticipationDay } from "@/data/participation";

type Locale = "sq" | "en";

/**
 * Colour steps for the calendar. Deliberately uneven: the index spans 35x, and with
 * even steps nearly every night after June would share the bottom colour. These
 * bounds split the series into roughly balanced groups while the few giant days
 * keep a step of their own (and carry their number in the square).
 */
const BREAKS = [4, 5, 6.5, 11, 30];

/**
 * One hue (the site red), light to dark on paper. Validated as an ordinal ramp
 * against #fffaf2: lightness strictly monotone, every adjacent step at least 0.06
 * apart in OKLab L, and the lightest step at 2.5:1, so even the quietest night
 * reads as a measured square rather than an empty slot.
 */
const RAMP = ["#cb938b", "#c47269", "#ba4f47", "#ac2724", "#8b1818", "#651412"];

/** Only the top step prints its number: a handful of squares, never a wall of digits. */
const LABEL_FROM = BREAKS[BREAKS.length - 1];

const REVEAL_MS = 1200;

function stepOf(value: number): number {
  const i = BREAKS.findIndex((b) => value < b);
  return i === -1 ? BREAKS.length : i;
}

const FIRST = participation[0];
const WEEKS = Math.ceil(participation.length / 7);
// Rows follow the protest's own weeks (day 1 opens week 1), so a column here is the
// same "week N" as the week strip under the line chart.
const FIRST_WEEKDAY = new Date(`${FIRST.date}T00:00:00Z`).getUTCDay();

const WEEKDAYS: Record<Locale, string[]> = {
  sq: ["Di", "Hë", "Ma", "Më", "En", "Pr", "Sh"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const MONTHS: Record<Locale, { full: string[]; short: string[] }> = {
  sq: {
    full: [
      "Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor",
      "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor",
    ],
    short: ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj"],
  },
  en: {
    full: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
};

const place = (d: ParticipationDay) => {
  const i = d.day - FIRST.day;
  return { week: Math.floor(i / 7), row: i % 7 };
};

/**
 * Which month heads each run of week columns. A week straddling two months belongs
 * to the one holding most of its nights, so the very first week (31 May + six June
 * nights) is filed under June rather than wearing a lone "May".
 */
const MONTH_SPANS = (() => {
  const owner: number[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const counts = new Map<number, number>();
    for (const d of participation.slice(w * 7, w * 7 + 7)) {
      const m = Number(d.date.slice(5, 7)) - 1;
      counts.set(m, (counts.get(m) ?? 0) + 1);
    }
    owner.push([...counts].sort((a, b) => b[1] - a[1])[0][0]);
  }
  const spans: Array<{ month: number; start: number; span: number }> = [];
  owner.forEach((m, w) => {
    const last = spans[spans.length - 1];
    if (last && last.month === m) last.span += 1;
    else spans.push({ month: m, start: w, span: 1 });
  });
  return spans;
})();

const MEASURED = participation.filter(isMeasured);
const LOWEST = Math.min(...MEASURED.map((d) => d.peak));
const BELOW_TEN = MEASURED.filter((d) => d.peak < 10).length;

export type CalendarLabels = {
  legendTitle: string;
  /** `{below}` and `{total}` are filled in from the data. */
  legendNote: string;
};

export function CalendarView({
  locale,
  labels,
  dayLabel,
  active,
  pinned,
  onHover,
  onFocusDay,
  onBlurDay,
  onToggle,
  detail,
  detailRef,
}: {
  locale: Locale;
  labels: CalendarLabels;
  /** accessible name for a square: day, date and reading. */
  dayLabel: (d: ParticipationDay) => string;
  active: number | null;
  pinned: number | null;
  onHover: (day: number) => void;
  onFocusDay: (day: number) => void;
  onBlurDay: () => void;
  onToggle: (day: number) => void;
  /** detail card for the active day, shown inline under its week on narrow screens. */
  detail: ReactNode;
  detailRef: Ref<HTMLDivElement>;
}) {
  const months = MONTHS[locale];
  const weekdays = Array.from({ length: 7 }, (_, i) => WEEKDAYS[locale][(FIRST_WEEKDAY + i) % 7]);
  const activeDay = active != null ? participation.find((d) => d.day === active) : undefined;
  // Narrow screens open the detail card as a full-width row straight under the
  // tapped week; everything below it moves down one row to make room.
  const openWeek = activeDay ? place(activeDay).week : null;
  const shift = (week: number) => (openWeek != null && week > openWeek ? 1 : 0);
  const lastDay = participation[participation.length - 1].day;
  const span = Math.max(1, lastDay - FIRST.day);
  const note = labels.legendNote
    .replace("{below}", String(BELOW_TEN))
    .replace("{total}", String(MEASURED.length));

  return (
    <div className="pc-cal-wrap">
      <div className="pc-ramp" aria-hidden="true">
        <span className="pc-ramp-title">{labels.legendTitle}</span>
        <span className="pc-ramp-bar">
          {RAMP.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </span>
        <span className="pc-ramp-ticks">
          <span style={{ left: 0 }}>{LOWEST.toFixed(1)}</span>
          {BREAKS.map((b, i) => (
            <span key={b} style={{ left: `${((i + 1) / RAMP.length) * 100}%` }}>
              {b}
            </span>
          ))}
          <span style={{ left: "100%" }}>100</span>
        </span>
        <span className="pc-ramp-note">{note}</span>
      </div>

      <div className="pc-cal" style={{ "--weeks": WEEKS } as CSSProperties}>
        {MONTH_SPANS.map((m) => (
          <span
            key={`mo-${m.start}`}
            className="pc-cal-mo"
            aria-hidden="true"
            style={{ "--ws": m.start, "--span": m.span, "--shift": shift(m.start) } as CSSProperties}
          >
            <span className="pc-only-wide">{months.full[m.month]}</span>
            <span className="pc-only-narrow">{months.short[m.month]}</span>
          </span>
        ))}

        {weekdays.map((w, i) => (
          <span
            key={`wd-${i}`}
            className="pc-cal-wd"
            aria-hidden="true"
            style={{ "--wd": i } as CSSProperties}
          >
            {w}
          </span>
        ))}

        {participation.map((d) => {
          const { week, row } = place(d);
          const measured = isMeasured(d);
          const step = measured ? stepOf(d.peak) : -1;
          return (
            <button
              key={`cal-${d.day}`}
              type="button"
              data-cal-day={d.day}
              className={[
                "pc-cal-cell",
                measured ? "" : "pc-cal-cell--nodata",
                step >= RAMP.length - 2 ? "pc-cal-cell--dark" : "",
                d.day === lastDay ? "pc-cal-cell--latest" : "",
                active === d.day ? "is-active" : "",
                pinned === d.day ? "is-pinned" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--wk": week,
                  "--wd": row,
                  "--shift": shift(week),
                  "--delay": `${((d.day - FIRST.day) / span) * REVEAL_MS}ms`,
                  background: measured ? RAMP[step] : undefined,
                } as CSSProperties
              }
              aria-label={dayLabel(d)}
              aria-pressed={pinned === d.day}
              onMouseEnter={() => onHover(d.day)}
              onFocus={() => onFocusDay(d.day)}
              onBlur={onBlurDay}
              onClick={() => onToggle(d.day)}
            >
              {measured && d.peak >= LABEL_FROM ? Math.round(d.peak) : null}
            </button>
          );
        })}

        {activeDay && openWeek != null && (
          <div
            className="pc-cal-detail"
            role="status"
            ref={detailRef}
            style={{ "--wk": openWeek } as CSSProperties}
          >
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}
