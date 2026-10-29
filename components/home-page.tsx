import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ExternalLink,
  Flag,
  Footprints,
  Gavel,
  Lock,
  Megaphone,
  MessageCircle,
  Plane,
  QrCode,
  ShieldAlert,
  UserCheck,
  Users,
} from "lucide-react";
import { content, WHATSAPP_INVITE_URL, type Locale, type SiteContent } from "@/lib/content";
import { participation } from "@/data/participation";
import { CopyButton } from "@/components/copy-button";
import { PledgeForm } from "@/components/pledge-form";
import { SectionViewTracker, TrackedLink } from "@/components/analytics-events";
import { MovedSectionRedirect } from "@/components/moved-section-redirect";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const whatsAppInviteUrl = WHATSAPP_INVITE_URL;

// one per step of the hero's call: say when you're coming, bring people, join the square
const callStepIcons = [Plane, Users, Megaphone];

// one per WhatsApp assurance: the group is private, every member is approved
const assuranceIcons = [Lock, UserCheck];

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
  const call = t.hero.call;
  const heroScheduleLabel = t.hero.dateRows
    .map((row) => `${row.time}, ${row.location}`)
    .join("; ");
  const heroDateLabel = heroScheduleLabel
    ? `${t.hero.dateLabel}: ${t.hero.dateText}; ${heroScheduleLabel}`
    : `${t.hero.dateLabel}: ${t.hero.dateText}`;
  // the pulse has its own band above; these cards lead to the other pages
  const overviewCards = [
    {
      href: t.marchPage.href,
      title: t.nav.march,
      body: t.marchPage.body,
      Icon: Footprints,
      eventName: "March Page Opened",
    },
    {
      href: t.scandalsTeaser.href,
      title: t.nav.scandals,
      body: t.overview.scandals,
      Icon: Gavel,
      eventName: "Scandals Page Opened",
    },
    {
      href: locale === "sq" ? "/siguria" : "/en/siguria",
      title: t.nav.safety,
      body: t.overview.safety,
      Icon: ShieldAlert,
      eventName: "Safety Guide Clicked",
    },
  ];
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    process.env.TURNSTILE_SITE_KEY ||
    "";

  const sparkWidth = 260;
  const sparkHeight = 96;
  // Days with no livestream analysis carry no value, so the teaser line bridges them
  // rather than dipping to a zero nobody measured. x stays keyed to the day number so
  // the skipped day still occupies its slot along the axis.
  const sparkSpan = participation.length - 1;
  const sparkPoints = participation
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.peak != null)
    .map(({ entry, index }) => {
      const x = (index / sparkSpan) * sparkWidth;
      const y = sparkHeight - 4 - ((entry.peak as number) / 100) * (sparkHeight - 12);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const sparkArea = `0,${sparkHeight} ${sparkPoints} ${sparkWidth},${sparkHeight}`;

  return (
    <div className="site-shell">
      <SiteHeader
        locale={locale}
        altLangHref={t.altLangHref}
        placement="home_header"
        current="home"
      />
      <MovedSectionRedirect marchHref={t.marchPage.href} />

      <section className="hero">
        <Image
          src="/diaspora-march-hero.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-tint" />
        <div className="hero-content">
          <div className="hero-chips">
            <Link className="hero-pulse-chip" href={t.trackerTeaser.href}>
              <span className="tracker-live-dot" aria-hidden="true" />
              {t.trackerTeaser.heroChip}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <TrackedLink
              className="hero-pulse-chip hero-safety-chip"
              href={locale === "sq" ? "/siguria" : "/en/siguria"}
              eventName="Safety Guide Clicked"
              eventProperties={{ locale, placement: "home_hero" }}
            >
              <ShieldAlert aria-hidden="true" size={17} />
              {t.hero.safetyChip}
              <ArrowRight aria-hidden="true" size={16} />
            </TrackedLink>
          </div>
          <div
            className="hero-campaign-title"
            aria-label={`${t.hero.campaignTitle.lead} ${t.hero.campaignTitle.accent}`}
          >
            <span>{t.hero.campaignTitle.lead}</span>
            <strong>{t.hero.campaignTitle.accent}</strong>
          </div>
          <p className="eyebrow">
            <Flag aria-hidden="true" size={18} />
            {t.hero.eyebrow}
          </p>
          {call ? (
            <div className="hero-call">
              <p className="hero-call-label">{call.label}</p>
              <p className="hero-call-title">{call.title}</p>
              <p className="hero-call-subtitle">{call.subtitle}</p>
              <ol className="hero-call-steps">
                {call.steps.map((step, index) => {
                  const StepIcon = callStepIcons[index];
                  return (
                    <li key={step}>
                      <span className="hero-call-step-icon">
                        <StepIcon aria-hidden="true" size={17} />
                      </span>
                      {step}
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : (
            <div className="hero-date" aria-label={heroDateLabel}>
              <span className="hero-date-day">{t.hero.dateDay}</span>
              <span className="hero-date-copy">
                <span className="hero-date-month">{t.hero.dateMonth}</span>
                <span className="hero-date-meta">{t.hero.dateMeta}</span>
                {t.hero.dateRows.length > 0 ? (
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
                        <span className="hero-date-location">
                          {row.location}
                          {row.note ? (
                            <span className="hero-date-note">{row.note}</span>
                          ) : null}
                        </span>
                      </span>
                    ))}
                  </span>
                ) : null}
              </span>
            </div>
          )}
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
            <Link className="button button-secondary" href={`${t.marchPage.href}#marshimi`}>
              <ArrowRight aria-hidden="true" size={20} />
              {t.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <main>
        <section className="section pledge-band" id="pledge">
          <div className="section-inner pledge-grid">
            <div className="section-copy">
              <h2>{t.pledgeIntro.title}</h2>
              <p>{t.pledgeIntro.body}</p>
              <div className="assurance-list">
                {t.pledgeIntro.assurances.map((assurance, index) => {
                  const AssuranceIcon = assuranceIcons[index];
                  return (
                    <span key={assurance}>
                      <AssuranceIcon aria-hidden="true" size={17} />
                      {assurance}
                    </span>
                  );
                })}
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

        <section className="section pulse-feature-band" id="pulse">
          <SectionViewTracker
            targetId="pulse"
            eventName="Pulse Section Viewed"
            eventProperties={{ locale }}
          />
          <div className="section-inner pulse-feature">
            <div className="pulse-feature-copy">
              <p className="kicker">{t.trackerTeaser.kicker}</p>
              <h2>{t.trackerTeaser.title}</h2>
              <p>{t.trackerTeaser.body}</p>
              <ul className="pulse-stats">
                {t.trackerTeaser.stats.map((stat) => (
                  <li key={stat.label}>
                    <span className="pulse-stat-value">{stat.value}</span>
                    <span className="pulse-stat-label">{stat.label}</span>
                  </li>
                ))}
              </ul>
              <TrackedLink
                className="button button-primary"
                href={t.trackerTeaser.href}
                eventName="Tracker Page Opened"
                eventProperties={{ locale, placement: "home_feature" }}
              >
                <Activity aria-hidden="true" size={20} />
                {t.trackerTeaser.cta}
              </TrackedLink>
            </div>
            <figure className="pulse-feature-preview" aria-hidden="true">
              <svg
                viewBox={`0 0 ${sparkWidth} ${sparkHeight}`}
                preserveAspectRatio="none"
                role="img"
              >
                <defs>
                  <linearGradient id="pulse-spark" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(185,28,28,0.34)" />
                    <stop offset="100%" stopColor="rgba(185,28,28,0)" />
                  </linearGradient>
                </defs>
                <polygon points={sparkArea} fill="url(#pulse-spark)" />
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
            <div className="pulse-community">
              <div className="pulse-community-copy">
                <h3>{t.trackerTeaser.community.title}</h3>
                <p>{t.trackerTeaser.community.body}</p>
              </div>
              <div className="pulse-community-actions">
                <TrackedLink
                  className="pulse-community-link"
                  href={t.trackerTeaser.community.sisterHref}
                  target="_blank"
                  rel="noreferrer"
                  eventName="Sister Site Opened"
                  eventProperties={{ locale, placement: "pulse_community" }}
                >
                  <ExternalLink aria-hidden="true" size={18} />
                  {t.trackerTeaser.community.sisterLabel}
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="section overview-band" aria-labelledby="overview-title">
          <div className="section-inner">
            <div className="section-heading">
              <h2 id="overview-title">{t.overview.title}</h2>
            </div>
            <div className="link-card-grid">
              {overviewCards.map((card) => (
                <TrackedLink
                  className="link-card"
                  href={card.href}
                  key={card.href}
                  eventName={card.eventName}
                  eventProperties={{ locale, placement: "home_overview" }}
                >
                  <span className="link-card-icon" aria-hidden="true">
                    <card.Icon size={22} />
                  </span>
                  <span className="link-card-text">
                    <strong>{card.title}</strong>
                    <small>{card.body}</small>
                  </span>
                  <ArrowRight className="link-card-arrow" aria-hidden="true" size={18} />
                </TrackedLink>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
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

      <div className="template-panel">
        <h3>{content.templateTitle}</h3>
        <p>{content.templateIntro}</p>
        <CopyButton
          text={content.template}
          label={content.copyLabel}
          doneLabel={content.copiedLabel}
        />
        <pre>{content.template}</pre>
      </div>
    </aside>
  );
}
