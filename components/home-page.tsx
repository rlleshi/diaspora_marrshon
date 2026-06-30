import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Backpack,
  CheckCircle2,
  Droplets,
  Flag,
  Footprints,
  Languages,
  MapPinned,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Shirt,
  Timer,
  Utensils,
} from "lucide-react";
import { content, type Locale, type SiteContent } from "@/lib/content";
import { participation } from "@/data/participation";
import { PledgeForm } from "@/components/pledge-form";
import { SectionViewTracker, TrackedLink } from "@/components/analytics-events";
import routeMapImage from "@/docs/marshimi_i_diaspores_3_pika_1100_1700_1900.png";

const whatsAppInviteUrl =
  "https://chat.whatsapp.com/L6oe4JyUi8k0h13oJSv7DP?mode=gi_t";
const googleMapsRouteUrl = "https://maps.app.goo.gl/LrAiX8135ZuHPaSp6";

const practicalAdviceIcons = [
  Droplets,
  Utensils,
  Timer,
  Footprints,
  Activity,
  Backpack,
];

function WalkingPersonIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13.5" cy="4.4" r="2.2" fill="currentColor" />
      <path
        d="M12.6 7.4 9.3 12.1l4.4 2.4 2.7 5.6M10.2 12.5 6.7 20M11.2 8.9l-4.1 1.8M13.3 10.3l3.9 2.1"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const alternateLocale = locale === "sq" ? "en" : "sq";
  const heroDateLabel = `${t.hero.dateLabel}: ${t.hero.dateText}; ${t.hero.dateRows
    .map((row) => `${row.time}, ${row.location}`)
    .join("; ")}`;
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
    process.env.TURNSTILE_SITE_KEY ??
    "";

  const sparkWidth = 260;
  const sparkHeight = 96;
  const sparkPoints = participation
    .map((entry, index) => {
      const x = (index / (participation.length - 1)) * sparkWidth;
      const y = sparkHeight - 4 - (entry.peak / 100) * (sparkHeight - 12);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const sparkArea = `0,${sparkHeight} ${sparkPoints} ${sparkWidth},${sparkHeight}`;

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href={locale === "sq" ? "/" : "/en"} className="brand">
          <Flag aria-hidden="true" size={22} />
          <span>Diaspora marshon</span>
        </Link>
        <nav aria-label="Primary navigation">
          <a href="#route">{t.nav.route}</a>
          <Link href={t.trackerTeaser.href}>{t.nav.tracker}</Link>
          <a href="#context">{t.nav.context}</a>
          <a href="#rules">{t.nav.rules}</a>
          <a href="#advice">{t.nav.advice}</a>
          <a href="#history">{t.nav.history}</a>
          <a className="nav-cta" href="#pledge">
            {t.nav.pledge}
          </a>
          <TrackedLink
            className="lang-switch"
            href={t.altLangHref}
            eventName="Language Switched"
            eventProperties={{
              from: locale,
              to: alternateLocale,
              placement: "home_header",
            }}
          >
            <Languages aria-hidden="true" size={18} />
            <span>{t.altLangLabel}</span>
          </TrackedLink>
        </nav>
      </header>

      <section className="hero">
        <Image
          src="/diaspora-march-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-tint" />
        <div className="hero-content">
          <p className="eyebrow">
            <Flag aria-hidden="true" size={18} />
            {t.hero.eyebrow}
          </p>
          <div className="hero-date" aria-label={heroDateLabel}>
            <span className="hero-date-day">{t.hero.dateDay}</span>
            <span className="hero-date-copy">
              <span className="hero-date-month">{t.hero.dateMonth}</span>
              <span className="hero-date-meta">{t.hero.dateMeta}</span>
              <span className="hero-date-schedule">
                {t.hero.dateRows.map((row, index) => (
                  <span
                    className="hero-date-row"
                    key={`${row.time}-${row.location}`}
                  >
                    <span className="hero-date-time-track">
                      <span className="hero-date-time">{row.time}</span>
                      {index < t.hero.dateRows.length - 1 ? (
                        <span className="hero-date-walk-marker">
                          <span
                            aria-hidden="true"
                            className="hero-date-walk-arrow"
                          />
                          <WalkingPersonIcon className="hero-date-walker" />
                        </span>
                      ) : null}
                    </span>
                    <span className="hero-date-location">{row.location}</span>
                  </span>
                ))}
              </span>
            </span>
          </div>
          <h1>{t.hero.title}</h1>
          <p className="hero-copy">
            {t.hero.subtitle}{" "}
            <strong>{t.hero.subtitleEmphasis}</strong>
          </p>
          <div className="hero-badges" aria-label={t.hero.subtitle}>
            {t.hero.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#pledge">
              <ArrowRight aria-hidden="true" size={20} />
              {t.hero.primaryCta}
            </a>
            <a className="button button-secondary" href="#route">
              <ArrowDown aria-hidden="true" size={20} />
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      <main>
        <section className="section pledge-band" id="pledge">
          <div className="section-inner pledge-grid">
            <div className="section-copy">
              <p className="kicker">{t.pledgeIntro.kicker}</p>
              <h2>{t.pledgeIntro.title}</h2>
              <p>{t.pledgeIntro.body}</p>
              <div className="assurance-list" aria-label="Pledge safeguards">
                <span>
                  <ShieldCheck aria-hidden="true" size={18} />
                  {t.whatsapp.badges[0]}
                </span>
                <span>
                  <CheckCircle2 aria-hidden="true" size={18} />
                  {t.whatsapp.badges[1]}
                </span>
              </div>
            </div>
            <WhatsAppIntakePanel content={t.whatsapp} locale={locale} />
            <div className="hidden-pledge-form" hidden>
              <PledgeForm
                locale={locale}
                content={t.form}
                turnstileSiteKey={turnstileSiteKey}
              />
            </div>
          </div>
        </section>

        <section className="section route-band" id="route">
          <SectionViewTracker
            targetId="route"
            eventName="Route Section Viewed"
            eventProperties={{ locale }}
          />
          <div className="section-inner">
            <div className="section-heading">
              <p className="kicker">{t.itinerary.kicker}</p>
              <h2>{t.itinerary.title}</h2>
              <p className="route-date">{t.itinerary.dateLine}</p>
              <p>{t.itinerary.body}</p>
            </div>
            <div className="route-layout">
              <div className="route-timeline">
                <div className="route-visual" aria-hidden="true">
                  <MapPinned size={34} />
                  <div className="route-line">
                    {t.itinerary.points.map((point) => (
                      <span key={point.time} />
                    ))}
                  </div>
                </div>
                <ol className="timeline">
                  {t.itinerary.points.map((point) => (
                    <li key={`${point.time}-${point.title}`}>
                      <span className="timeline-time">{point.time}</span>
                      <div>
                        <h3>{point.title}</h3>
                        <p>{point.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <figure className="route-map">
                <a
                  href={routeMapImage.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.itinerary.mapOpenLabel}
                >
                  <Image
                    src={routeMapImage}
                    alt={t.itinerary.mapAlt}
                    sizes="(max-width: 900px) calc(100vw - 28px), 520px"
                  />
                </a>
                <TrackedLink
                  className="route-map-link"
                  href={googleMapsRouteUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="Google Maps Opened"
                  eventProperties={{ locale, placement: "route_map" }}
                >
                  <MapPinned aria-hidden="true" size={18} />
                  {t.itinerary.mapExternalLabel}
                </TrackedLink>
              </figure>
            </div>
          </div>
        </section>

        <section className="section context-band" id="context">
          <div className="section-inner context-grid">
            <div>
              <p className="kicker">{t.context.kicker}</p>
              <h2>{t.context.title}</h2>
              <p>{t.context.body}</p>
              <p className="context-closing">{t.context.closing}</p>
            </div>
            <ul className="demand-list">
              {t.context.demands.map((demand) => (
                <li key={demand.text}>
                  <CheckCircle2 aria-hidden="true" size={18} />
                  <div className="demand-content">
                    <span>{demand.text}</span>
                    {demand.items ? (
                      <ul className="demand-subgroup">
                        {demand.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section tracker-teaser-band">
          <div className="section-inner tracker-teaser">
            <div className="section-copy">
              <p className="kicker">{t.trackerTeaser.kicker}</p>
              <h2>{t.trackerTeaser.title}</h2>
              <p>{t.trackerTeaser.body}</p>
              <TrackedLink
                className="button button-secondary"
                href={t.trackerTeaser.href}
                eventName="Tracker Page Opened"
                eventProperties={{ locale, placement: "home_teaser" }}
              >
                <Activity aria-hidden="true" size={20} />
                {t.trackerTeaser.cta}
              </TrackedLink>
            </div>
            <figure className="tracker-teaser-preview" aria-hidden="true">
              <svg
                viewBox={`0 0 ${sparkWidth} ${sparkHeight}`}
                preserveAspectRatio="none"
                role="img"
              >
                <defs>
                  <linearGradient
                    id="tracker-spark"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="rgba(185,28,28,0.34)" />
                    <stop offset="100%" stopColor="rgba(185,28,28,0)" />
                  </linearGradient>
                </defs>
                <polygon points={sparkArea} fill="url(#tracker-spark)" />
                <polyline
                  points={sparkPoints}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </figure>
          </div>
        </section>

        <section className="section rules-band" id="rules">
          <div className="section-inner">
            <div className="section-heading">
              <p className="kicker">{t.rules.kicker}</p>
              <h2>{t.rules.title}</h2>
              <p>{t.rules.body}</p>
            </div>
            <div className="rules-grid">
              {t.rules.items.map((item) => (
                <article className="rule-item" key={item.title}>
                  <CheckCircle2 aria-hidden="true" size={22} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section advice-band" id="advice">
          <div className="section-inner">
            <div className="section-heading">
              <p className="kicker">{t.practicalAdvice.kicker}</p>
              <h2>{t.practicalAdvice.title}</h2>
              <p>{t.practicalAdvice.body}</p>
            </div>
            <div className="advice-grid">
              {t.practicalAdvice.items.map((item, index) => {
                const AdviceIcon =
                  practicalAdviceIcons[index] ?? CheckCircle2;

                return (
                  <article className="advice-item" key={item.title}>
                    <span className="advice-icon">
                      <AdviceIcon aria-hidden="true" size={22} />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section history-band" id="history">
          <div className="section-inner">
            <div className="section-heading">
              <p className="kicker">{t.pastMarches.kicker}</p>
              <h2>{t.pastMarches.title}</h2>
              <p>{t.pastMarches.body}</p>
            </div>
            <div className="history-grid">
              {t.pastMarches.items.map((item) => (
                <article className="history-item" key={item.dateLabel}>
                  <span className="history-date">
                    <Flag aria-hidden="true" size={18} />
                    {item.dateLabel}
                  </span>
                  <h3>{item.title}</h3>
                  <p className="history-route">
                    <MapPinned aria-hidden="true" size={16} />
                    {item.route}
                  </p>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section shirts-teaser-band">
          <div className="section-inner shirts-teaser">
            <div className="section-copy">
              <p className="kicker">{t.shirtsTeaser.kicker}</p>
              <h2>{t.shirtsTeaser.title}</h2>
              <p>{t.shirtsTeaser.body}</p>
              <TrackedLink
                className="button button-secondary"
                href={t.shirtsTeaser.href}
                eventName="Shirts Page Opened"
                eventProperties={{ locale, placement: "home_teaser" }}
              >
                <Shirt aria-hidden="true" size={20} />
                {t.shirtsTeaser.cta}
              </TrackedLink>
            </div>
            <figure className="shirts-teaser-preview">
              <div>
                <Image
                  src="/shirts/black-germany.jpg"
                  alt={t.shirtsTeaser.previewAlt}
                  width={256}
                  height={448}
                />
                <Image
                  src="/shirts/white-germany.jpg"
                  alt=""
                  width={256}
                  height={488}
                />
              </div>
            </figure>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{t.footer.privacy}</p>
        <p>{t.footer.noLinks}</p>
      </footer>
    </div>
  );
}

function WhatsAppIntakePanel({
  content,
  locale,
}: {
  content: SiteContent["whatsapp"];
  locale: Locale;
}) {
  return (
    <aside className="whatsapp-panel" aria-labelledby="whatsapp-title">
      <div className="whatsapp-panel-heading">
        <span className="qr-icon">
          <QrCode aria-hidden="true" size={22} />
        </span>
        <div>
          <h2 id="whatsapp-title">{content.title}</h2>
          <p>{content.body}</p>
        </div>
      </div>

      <div className="qr-card">
        <img src="/whatsapp-intake-qr.svg" alt={content.qrAlt} />
        <TrackedLink
          className="button button-primary"
          href={whatsAppInviteUrl}
          target="_blank"
          rel="noreferrer"
          eventName="WhatsApp Opened"
          eventProperties={{ locale, placement: "qr_panel" }}
        >
          <MessageCircle aria-hidden="true" size={20} />
          {content.openLabel}
        </TrackedLink>
      </div>

      <p className="approval-note">{content.approvalNote}</p>

      <div className="template-panel">
        <h3>{content.templateTitle}</h3>
        <p>{content.templateIntro}</p>
        <pre>{content.template}</pre>
      </div>
    </aside>
  );
}
