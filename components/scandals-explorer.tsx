"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ChevronDown,
  Construction,
  DatabaseZap,
  Gavel,
  HandCoins,
  Siren,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/content";
import {
  scandals,
  type ClaimVerdict,
  type Scandal,
  type ScandalCategory,
} from "@/data/scandals";
import { categoryOrder, scandalsPageContent } from "@/lib/scandals-content";

const CATEGORY_ICONS: Record<ScandalCategory, LucideIcon> = {
  "infrastructure-land": Construction,
  "public-funds-health": HandCoins,
  "justice-crime": Gavel,
  "cyber-data": DatabaseZap,
  "life-safety-state": Siren,
};

const VERDICT_GLYPH: Record<ClaimVerdict, string> = {
  confirmed: "✓",
  partial: "~",
  unverified: "?",
  contradicted: "✕",
};

const STAMP_CLASS: Record<Scandal["statusBucket"], string> = {
  "no-process": "stamp--no-process",
  investigation: "stamp--investigation",
  convicted: "stamp--convicted",
};

const YEARS = scandals.map((s) => s.yearStart);
const MIN_YEAR = Math.min(...YEARS);
const MAX_YEAR = Math.max(...YEARS);
const YEAR_TICKS = Array.from(
  new Set(
    [0, 0.25, 0.5, 0.75, 1].map((f) =>
      Math.round(MIN_YEAR + f * (MAX_YEAR - MIN_YEAR)),
    ),
  ),
);

function yearPct(year: number) {
  if (MAX_YEAR === MIN_YEAR) return 0;
  return ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
}

// Several scandals can share the same yearStart; stacking them on identical
// x-coordinates makes them collapse into one dot. Assign each a "lane" so
// same-year cases fan out vertically into a visible column instead.
const CHRONO_LANE: Record<string, number> = {};
const chronoYearCounts = new Map<number, number>();
for (const s of scandals) {
  const lane = chronoYearCounts.get(s.yearStart) ?? 0;
  CHRONO_LANE[s.id] = lane;
  chronoYearCounts.set(s.yearStart, lane + 1);
}
const CHRONO_MAX_LANE = Math.max(...chronoYearCounts.values()) - 1;
const CHRONO_LANE_GAP = 15;
// Vertical space reserved above the baseline for the tallest stack of dots.
const CHRONO_ABOVE = 16 + CHRONO_MAX_LANE * CHRONO_LANE_GAP;
const CHRONO_BELOW = 26;
const CHRONO_TRACK_HEIGHT = CHRONO_ABOVE + CHRONO_BELOW;
const CHRONO_STACKS = Array.from(chronoYearCounts.entries()).filter(
  ([, count]) => count > 1,
);

function chronoDotTop(id: string) {
  return CHRONO_ABOVE - 6 - CHRONO_LANE[id] * CHRONO_LANE_GAP;
}

function renderRich(text: string, keyPrefix: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*)/g).filter((p) => p.length > 0);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${keyPrefix}-b${i}`}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={`${keyPrefix}-t${i}`}>{part}</span>
    ),
  );
}

function renderTeaser(scandal: Scandal): ReactNode {
  const idx = scandal.teaser.indexOf(scandal.redactedPhrase);
  if (idx === -1) return scandal.teaser;
  const before = scandal.teaser.slice(0, idx);
  const after = scandal.teaser.slice(idx + scandal.redactedPhrase.length);
  return (
    <>
      {before}
      <span className="redacted-phrase">{scandal.redactedPhrase}</span>
      {after}
    </>
  );
}

function renderSource(source: string, key: string) {
  const match = source.match(/^(https?:\/\/\S+)([\s\S]*)$/);
  if (match) {
    return (
      <a
        key={key}
        className="source-chip source-chip-link"
        href={match[1]}
        target="_blank"
        rel="noreferrer"
      >
        {source}
      </a>
    );
  }
  return (
    <span key={key} className="source-chip">
      {source}
    </span>
  );
}

export function ScandalsExplorer({ locale }: { locale: Locale }) {
  const t = scandalsPageContent[locale];
  const [activeCategory, setActiveCategory] = useState<ScandalCategory | "all">(
    "all",
  );
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!openId) return;
    const el = document.getElementById(`case-${openId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [openId]);

  const visible = scandals.filter(
    (s) => activeCategory === "all" || s.category === activeCategory,
  );

  function openFromChrono(scandal: Scandal) {
    setActiveCategory("all");
    setOpenId(scandal.id);
  }

  return (
    <div className="scandals-explorer">
      <div className="chrono">
        <span className="chrono-caption">{t.chrono.caption}</span>
        <div className="chrono-track" style={{ height: `${CHRONO_TRACK_HEIGHT}px` }}>
          <div className="chrono-line" style={{ top: `${CHRONO_ABOVE}px` }} />
          {YEAR_TICKS.map((yr) => (
            <span
              key={`tick-${yr}`}
              className="chrono-tick"
              style={{ left: `${yearPct(yr)}%`, top: `${CHRONO_ABOVE}px` }}
            />
          ))}
          {CHRONO_STACKS.map(([yr, count]) => (
            <span
              key={`stem-${yr}`}
              className="chrono-stem"
              style={{
                left: `${yearPct(yr)}%`,
                top: `${CHRONO_ABOVE - 6 - (count - 1) * CHRONO_LANE_GAP}px`,
                height: `${(count - 1) * CHRONO_LANE_GAP}px`,
              }}
            />
          ))}
          {YEAR_TICKS.map((yr) => (
            <span
              key={yr}
              className="chrono-yr"
              style={{ left: `${yearPct(yr)}%`, top: `${CHRONO_ABOVE + 8}px` }}
            >
              {yr}
            </span>
          ))}
          {scandals.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`chrono-dot ${STAMP_CLASS[s.statusBucket]}`}
              style={{ left: `${yearPct(s.yearStart)}%`, top: `${chronoDotTop(s.id)}px` }}
              data-tip={`${s.title} · ${s.yearStart}`}
              aria-label={`${s.title} (${s.yearStart})`}
              onClick={() => openFromChrono(s)}
            />
          ))}
        </div>
      </div>

      <div
        className="filter-tabs"
        role="tablist"
        aria-label={t.filterAllLabel}
      >
        <button
          type="button"
          className="filter-tab"
          aria-pressed={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          {t.filterAllLabel}
          <span className="filter-count">{scandals.length}</span>
        </button>
        {categoryOrder.map((cat) => {
          const Icon = CATEGORY_ICONS[cat];
          const count = scandals.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              className="filter-tab"
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              <Icon aria-hidden="true" size={14} />
              {t.categories[cat]}
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="case-grid">
        {visible.map((s) => {
          const Icon = CATEGORY_ICONS[s.category];
          return (
            <details
              key={s.id}
              id={`case-${s.id}`}
              className="case-card"
              open={openId === s.id}
            >
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setOpenId((prev) => (prev === s.id ? null : s.id));
                }}
              >
                <div className="case-head">
                  <span className="case-cat-icon">
                    <Icon aria-hidden="true" size={15} />
                  </span>
                  <span className="case-code">
                    {s.period ?? String(s.yearStart)}
                  </span>
                </div>
                <h3 className="case-title">{s.title}</h3>
                <p className="case-teaser">{renderTeaser(s)}</p>
                <span className={`stamp ${STAMP_CLASS[s.statusBucket]}`}>
                  {t.statusBucketLabels[s.statusBucket]}
                </span>
                <span className="case-more">
                  <span className="case-more-txt">
                    {openId === s.id ? t.card.closeLabel : t.card.openLabel}
                  </span>
                  <ChevronDown aria-hidden="true" size={14} className="case-chevron" />
                </span>
              </summary>

              <div className="case-body">
                {s.narrative.map((para, i) => (
                  <p key={i} className="case-narrative">
                    {renderRich(para, `narr-${s.id}-${i}`)}
                  </p>
                ))}

                <h4>{t.card.statusLabel}</h4>
                <p className={`case-status ${STAMP_CLASS[s.statusBucket]}`}>
                  {renderRich(s.status, `status-${s.id}`)}
                </p>

                {s.claims.length > 0 ? (
                  <>
                    <h4>{t.card.ledgerHeading}</h4>
                    <ul className="claim-list">
                      {s.claims.map((c, i) => (
                        <li key={i} className="claim-item">
                          <span
                            className={`claim-mark claim-mark--${c.verdict}`}
                            aria-label={t.verdictLabels[c.verdict]}
                          >
                            {VERDICT_GLYPH[c.verdict]}
                          </span>
                          <span>
                            <strong>{renderRich(c.claim, `claim-${s.id}-${i}`)}</strong>
                            {" — "}
                            {renderRich(c.note, `note-${s.id}-${i}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {s.verificationNotes ? (
                  <>
                    <h4>{t.card.verificationHeading}</h4>
                    {s.verificationNotes.split(/\n\n+/).map((para, i) => (
                      <p key={i} className="case-verification">
                        {renderRich(para, `verif-${s.id}-${i}`)}
                      </p>
                    ))}
                  </>
                ) : null}

                <p className="case-confidence">
                  <strong>{t.card.confidenceLabel}:</strong> {s.confidence}
                </p>

                <h4>{t.card.sourcesHeading}</h4>
                <div className="source-chips">
                  {s.sources.map((src, i) => renderSource(src, `${s.id}-${i}`))}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
