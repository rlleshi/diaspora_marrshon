import Link from "next/link";
import { ArrowLeft, Flag, Languages } from "lucide-react";
import { content, type Locale } from "@/lib/content";
import { scandals } from "@/data/scandals";
import { scandalsPageContent, statusBucketOrder } from "@/lib/scandals-content";
import { TrackedLink } from "@/components/analytics-events";
import { ScandalsExplorer } from "@/components/scandals-explorer";

// Rama's tenure (2013–2026), not derived from scandal yearStart values —
// several scandals (e.g. Bankers Petroleum's operations since 2004) predate
// his government, so the data's own min/max would misstate this fact.
const GOVERNANCE_START_YEAR = 2013;
const GOVERNANCE_END_YEAR = 2026;

const STATUS_COUNTS = statusBucketOrder.map((bucket) => ({
  bucket,
  count: scandals.filter((s) => s.statusBucket === bucket).length,
}));

export function ScandalsPage({ locale }: { locale: Locale }) {
  const t = scandalsPageContent[locale];
  const c = content[locale];
  const alternateLocale = locale === "sq" ? "en" : "sq";

  return (
    <div className="site-shell scandals-shell">
      <header className="site-header">
        <Link href={t.homeHref} className="brand">
          <Flag aria-hidden="true" size={22} />
          <span>Diaspora marshon</span>
        </Link>
        <nav aria-label="Scandals dossier navigation">
          <Link href={t.homeHref}>
            <ArrowLeft aria-hidden="true" size={18} />
            <span>{t.homeLabel}</span>
          </Link>
          <TrackedLink
            className="lang-switch"
            href={t.altLangHref}
            eventName="Language Switched"
            eventProperties={{
              from: locale,
              to: alternateLocale,
              placement: "scandals_header",
            }}
          >
            <Languages aria-hidden="true" size={18} />
            <span>{t.altLangLabel}</span>
          </TrackedLink>
        </nav>
      </header>

      <main>
        <section className="section scandals-hero-band">
          <div className="section-inner">
            <p className="kicker">{t.hero.kicker}</p>
            <h1 className="scandals-title">{t.hero.title}</h1>
            <p className="scandals-intro">{t.hero.intro}</p>
            <p className="scandals-methodology">{t.hero.methodology}</p>
            {locale === "en" && t.hero.enOnlyNote ? (
              <p className="scandals-en-note">{t.hero.enOnlyNote}</p>
            ) : null}

            <div className="dossier-stats">
              <div>
                <span className="stat-num">{scandals.length}</span>
                <span className="stat-label">{t.dashboard.totalLabel}</span>
                <span className="stat-sub">{t.dashboard.totalSuffix}</span>
              </div>
              <div>
                <span className="stat-num">
                  {GOVERNANCE_END_YEAR - GOVERNANCE_START_YEAR + 1}
                </span>
                <span className="stat-label">{t.dashboard.yearsLabel}</span>
                <span className="stat-sub">
                  {GOVERNANCE_START_YEAR}–{GOVERNANCE_END_YEAR}
                </span>
              </div>
              <div className="status-panel">
                <div
                  className="status-bar"
                  role="img"
                  aria-label={STATUS_COUNTS.map(
                    ({ bucket, count }) =>
                      `${count} ${t.statusBucketLabels[bucket]}`,
                  ).join(", ")}
                >
                  {STATUS_COUNTS.map(({ bucket, count }) => (
                    <span
                      key={bucket}
                      className={`status-bar-segment status-bar-segment--${bucket}`}
                      style={{ width: `${(count / scandals.length) * 100}%` }}
                    />
                  ))}
                </div>
                <ul className="status-bar-legend">
                  {STATUS_COUNTS.map(({ bucket, count }) => (
                    <li key={bucket}>
                      <span
                        className={`status-bar-dot status-bar-segment--${bucket}`}
                      />
                      <b>{count}</b>
                      <span className="lbl">{t.statusBucketLabels[bucket]}</span>
                    </li>
                  ))}
                </ul>
                <p className="status-bar-caption">
                  {t.dashboard.statusBarCaption}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section scandals-room">
          <div className="section-inner">
            <ScandalsExplorer locale={locale} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{t.footerNote}</p>
        <p>{c.footer.privacy}</p>
      </footer>
    </div>
  );
}
