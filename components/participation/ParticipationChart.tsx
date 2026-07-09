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
  type LucideIcon,
} from "lucide-react";
import {
  participation,
  participationEvents,
  type ParticipationDay,
  type ParticipationEvent,
} from "@/data/participation";
import { buildGeometry } from "@/components/participation/geometry";

type Locale = "sq" | "en";

const ICONS: Record<ParticipationEvent["icon"], LucideIcon> = {
  peak: Crown,
  plane: Plane,
  people: Users,
  rain: CloudRain,
  spark: Sparkles,
  flag: Flag,
};

// Where each event's label sits in viewBox-Y (hand-placed, editorial feel).
const LABEL_Y: Record<number, number> = {
  7: 250,
  9: 320,
  15: 360,
  21: 58,
  25: 430,
  30: 410,
  31: 300,
  33: 200,
  35: 110,
};

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
  replay: string;
  ariaSummary: string;
  saturday: string;
};

export function ParticipationChart({
  locale,
  labels,
}: {
  locale: Locale;
  labels: ChartLabels;
}) {
  const geo = useMemo(() => buildGeometry(participation), []);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollToPanel = useRef(false);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  // The events list sits below the detail panel, so picking a day from it
  // updates content that may be off-screen; bring the panel into view.
  useEffect(() => {
    if (!scrollToPanel.current) return;
    scrollToPanel.current = false;
    if (active != null) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active]);

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

  const { view, plot, points, gridLines, xOf, yOf, fracOf } = geo;
  const peakDelay = fracOf(21) * DRAW_MS + 220;

  const activeDay = active != null ? participation[active - 1] : null;
  const activePt = active != null ? points[active - 1] : null;

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
      onMouseLeave={() => setActive(null)}
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
        {participation
          .filter((d) => d.saturday)
          .map((d) => {
            const half = plot.width / (participation.length - 1) / 2;
            return (
              <rect
                key={`sat-${d.day}`}
                className="pc-band"
                x={xOf(d.day) - half}
                y={plot.top}
                width={half * 2}
                height={plot.bottom - plot.top}
                fill="#b7791f"
                opacity="0.08"
              />
            );
          })}

        {/* reference hairlines + y labels */}
        {gridLines.map((g) => (
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
              className={g.value === 100 ? "pc-ylabel pc-ylabel--top" : "pc-ylabel"}
              x={plot.left + 4}
              y={g.y - 6}
              fill="#8a8378"
            >
              {g.value}
            </text>
          </g>
        ))}

        {/* x axis labels */}
        {[1, 5, 10, 15, 20, 25, 30, 39].map((day) => (
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
        <circle
          className="pc-peak-glow"
          cx={xOf(21)}
          cy={yOf(100)}
          r="46"
          fill="url(#pc-peak-glow)"
        />

        {/* event leaders + markers */}
        {participationEvents.map((ev) => {
          const px = xOf(ev.day);
          const py = yOf(participation[ev.day - 1].peak);
          const ly = LABEL_Y[ev.day] ?? py - 60;
          const isPeak = ev.tier === "peak";
          // center-placed chips sit on top of the leader line, so stop the line
          // just below the label text instead of running it through the words.
          const frac = fracOf(ev.day);
          const centered = !isPeak && frac >= 0.12 && frac <= 0.85;
          const leadEnd = isPeak ? ly + 58 : centered ? ly + 22 : ly;
          return (
            <g
              key={`lead-${ev.day}`}
              className={`pc-event pc-event--${ev.tier} ${ev.mobile ? "" : "pc-event--desk"}`}
              style={{ "--delay": `${fracOf(ev.day) * DRAW_MS}ms` } as CSSProperties}
            >
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
              <circle
                cx={px}
                cy={py}
                r={isPeak ? 6 : 4.5}
                fill={ev.icon === "rain" ? "#0f766e" : "#b91c1c"}
                stroke="#fffaf2"
                strokeWidth="2.4"
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
        {points.map((p) => {
          const half = plot.width / (participation.length - 1) / 2;
          return (
            <rect
              key={`hit-${p.day}`}
              className="pc-hit"
              x={p.x - half}
              y={plot.top}
              width={half * 2}
              height={plot.bottom - plot.top}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${labels.axisDay} ${p.day}, ${formatDate(p.d.date, locale)}: ${labels.tooltipPeak} ${p.d.peak.toFixed(0)}`}
              onMouseEnter={() => setActive(p.day)}
              onFocus={() => setActive(p.day)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(p.day)}
            />
          );
        })}
      </svg>

      {/* ---- HTML overlay: legend, peak number, event chips, tooltip ---- */}
      <div className="pc-legend" aria-hidden="true">
        <span className="pc-legend-peak">{labels.legendPeak}</span>
        <span className="pc-legend-mean">{labels.legendMean}</span>
      </div>

      {participationEvents.map((ev) => {
        const Icon = ICONS[ev.icon];
        const frac = fracOf(ev.day);
        const ly = LABEL_Y[ev.day] ?? yOf(participation[ev.day - 1].peak) - 60;
        const place = frac > 0.85 ? "end" : frac < 0.12 ? "start" : "center";
        const style = {
          left: `${(xOf(ev.day) / view.width) * 100}%`,
          top: `${(ly / view.height) * 100}%`,
          "--delay": `${frac * DRAW_MS}ms`,
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
            className={`pc-chip pc-chip--${ev.tier} pc-place-${place} ${ev.mobile ? "" : "pc-chip--desk"}`}
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
          className={`pc-tip ${activePt.y < 230 ? "pc-tip--below" : ""} ${
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
          <TipBody day={activeDay} locale={locale} labels={labels} />
        </div>
      )}

      <button type="button" className="pc-replay" onClick={replay}>
        {revealed ? (
          <RotateCcw size={16} aria-hidden="true" />
        ) : (
          <Play size={16} aria-hidden="true" />
        )}
        {labels.replay}
      </button>

      {/* screen-reader data table */}
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
        <TipBody day={activeDay} locale={locale} labels={labels} />
      </div>
    )}

    {/* compact event list, shown on small screens in place of floating chips; tap to open a day */}
    <ul className="pc-events-list">
      {participationEvents.map((ev) => {
        const Icon = ICONS[ev.icon];
        return (
          <li key={`ev-li-${ev.day}`}>
            <button
              type="button"
              className={`pc-ev-btn${active === ev.day ? " is-active" : ""}`}
              onClick={() => {
                scrollToPanel.current = active !== ev.day;
                setActive(active === ev.day ? null : ev.day);
              }}
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
}: {
  day: ParticipationDay;
  locale: Locale;
  labels: ChartLabels;
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
