import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  CircleCheck,
  ExternalLink,
  Flag,
  HeartPulse,
  Languages,
  Phone,
  Route,
  Camera,
  Scale,
  ShieldAlert,
  Siren,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/content";
import {
  LEGAL_AID_PHONE,
  LEGAL_AID_URL,
  safetyPageContent,
  type SafetyTopicId,
} from "@/lib/safety-content";
import { TrackedLink } from "@/components/analytics-events";

const topicIcons: Record<SafetyTopicId, LucideIcon> = {
  ndalimi: ShieldAlert,
  avokatet: Scale,
  gazi: Wind,
  lendimet: HeartPulse,
  siguria: Route,
  dokumentimi: Camera,
};

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export function SafetyPage({ locale }: { locale: Locale }) {
  const t = safetyPageContent[locale];
  const alternateLocale = locale === "sq" ? "en" : "sq";

  return (
    <div className="site-shell safety-shell">
      <header className="site-header">
        <Link href={t.homeHref} className="brand">
          <Flag aria-hidden="true" size={22} />
          <span>Diaspora marshon</span>
        </Link>
        <nav aria-label="Safety page navigation">
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
              placement: "safety_header",
            }}
          >
            <Languages aria-hidden="true" size={18} />
            <span>{t.altLangLabel}</span>
          </TrackedLink>
        </nav>
      </header>

      <main>
        <section className="safety-hero" aria-labelledby="safety-title">
          <div className="section-inner safety-hero-inner">
            <p className="safety-kicker">
              <ShieldAlert aria-hidden="true" size={16} />
              {t.hero.kicker}
            </p>
            <h1 id="safety-title">{t.hero.title}</h1>
            <p className="safety-lead">{t.hero.lead}</p>
            <div className="safety-emergency">
              <div className="safety-emergency-symbol" aria-hidden="true">
                <Siren size={26} />
              </div>
              <div className="safety-emergency-content">
                <strong>{t.hero.emergencyTitle}</strong>
                <p>{t.hero.emergencyBody}</p>
              </div>
              <a className="safety-emergency-call" href="tel:127">
                <Phone aria-hidden="true" size={19} />
                {t.hero.emergencyCall}
              </a>
            </div>
            <p className="safety-hero-note">{t.hero.note}</p>
          </div>
        </section>

        <section className="safety-quick section" aria-labelledby="safety-quick-title">
          <div className="section-inner">
            <div className="safety-heading">
              <p className="kicker">{t.quick.kicker}</p>
              <h2 id="safety-quick-title">{t.quick.title}</h2>
              <p>{t.quick.body}</p>
            </div>
            <div className="safety-quick-grid">
              {t.topics.map((topic) => {
                const Icon = topicIcons[topic.id];
                return (
                  <a href={`#${topic.id}`} className="safety-quick-card" key={topic.id}>
                    <span className="safety-quick-icon" aria-hidden="true">
                      <Icon size={21} />
                    </span>
                    <span className="safety-quick-text">
                      <strong>{topic.kicker}</strong>
                      <small>{topic.summary}</small>
                    </span>
                    <ArrowDown className="safety-quick-arrow" aria-hidden="true" size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="safety-details section">
          <div className="section-inner safety-details-inner">
            {t.topics.map((topic, index) => {
              const Icon = topicIcons[topic.id];
              return (
                <article className="safety-topic" id={topic.id} key={topic.id}>
                  <div className="safety-topic-title">
                    <span className="safety-topic-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="safety-topic-icon" aria-hidden="true">
                      <Icon size={24} />
                    </span>
                    <div>
                      <p className="kicker">{topic.kicker}</p>
                      <h2>{topic.title}</h2>
                      <p>{topic.summary}</p>
                    </div>
                  </div>

                  {topic.phrase && (
                    <div className="safety-phrase">
                      <span>{topic.phrase.label}</span>
                      <blockquote lang="sq">{topic.phrase.text}</blockquote>
                      {topic.phrase.translation && (
                        <p className="safety-phrase-translation">{topic.phrase.translation}</p>
                      )}
                    </div>
                  )}

                  <ol className="safety-steps">
                    {topic.steps.map((step) => (
                      <li key={step}>
                        <CircleCheck aria-hidden="true" size={18} />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  {topic.alert && <p className="safety-topic-alert">{topic.alert}</p>}

                  {topic.aid && (
                    <div className="safety-aid-contact">
                      <div>
                        <strong>{topic.aid.title}</strong>
                        <p>{topic.aid.body}</p>
                        <a href={LEGAL_AID_URL} target="_blank" rel="noopener noreferrer">
                          {topic.aid.linkLabel}
                          <ExternalLink aria-hidden="true" size={14} />
                        </a>
                      </div>
                      <a className="safety-aid-call" href={telHref(LEGAL_AID_PHONE)}>
                        <Phone aria-hidden="true" size={18} />
                        {topic.aid.call}
                      </a>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
