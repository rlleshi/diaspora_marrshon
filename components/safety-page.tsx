import type { ReactNode } from "react";
import {
  ArrowDown,
  ExternalLink,
  FileText,
  HeartPulse,
  Phone,
  Scale,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Siren,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/lib/content";
import {
  safetyPageContent,
  type SafetyContact,
  type SafetyTopic,
  type SafetyTopicId,
} from "@/lib/safety-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const topicIcons: Record<SafetyTopicId, LucideIcon> = {
  pergatitja: ShoppingBag,
  siguria: ShieldCheck,
  ndalimi: Scale,
  ndihma: HeartPulse,
  kontaktet: Phone,
  dokumentimi: FileText,
};

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Renders the step markup: **bold** and [label](href); in-page links stay in the tab. */
function rich(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const external = !link[2].startsWith("#");
      return (
        <a
          key={i}
          href={link[2]}
          className="safety-inline-link"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

function ContactCard({ contact }: { contact: SafetyContact }) {
  return (
    <div className="safety-contact">
      <div className="safety-contact-copy">
        <span className="safety-contact-tag">{contact.tag}</span>
        <h4>{contact.name}</h4>
        <p>{contact.body}</p>
        {contact.link && (
          <a href={contact.link.href} target="_blank" rel="noopener noreferrer">
            {contact.link.label}
            <ExternalLink aria-hidden="true" size={14} />
          </a>
        )}
      </div>
      <a className="safety-contact-call" href={telHref(contact.phone)}>
        <Phone aria-hidden="true" size={17} />
        {contact.phone}
      </a>
    </div>
  );
}

function TopicBody({ topic }: { topic: SafetyTopic }) {
  const c = topic.contacts;
  return (
    <>
      {topic.subsections && (
        <div className="safety-subsections">
          {topic.subsections.map((sub) => (
            <div className="safety-subsection" key={sub.title}>
              <h3>{sub.title}</h3>
              <ul className="safety-steps">
                {sub.steps.map((step) => (
                  <li key={step}>
                    <ShieldCheck aria-hidden="true" size={17} />
                    <span>{rich(step)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {c && (
        <div className="safety-contacts">
          {c.confirmed.map((contact) => (
            <ContactCard contact={contact} key={contact.name} />
          ))}
          <div className="safety-unverified">
            <strong>{c.unverified.title}</strong>
            <p>{c.unverified.body}</p>
          </div>
          {c.groups.map((group) => (
            <div className="safety-contact-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.contacts.map((contact) => (
                <ContactCard contact={contact} key={contact.name} />
              ))}
              {group.note && (
                <div className="safety-contact-note">
                  <strong>{group.note.title}</strong>
                  <p>{group.note.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export function SafetyPage({ locale }: { locale: Locale }) {
  const t = safetyPageContent[locale];

  return (
    <div className="site-shell safety-shell">
      <SiteHeader
        locale={locale}
        altLangHref={t.altLangHref}
        placement="safety_header"
        current="safety"
      />

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
            <div className="link-card-grid">
              {t.topics.map((topic) => {
                const Icon = topicIcons[topic.id];
                return (
                  <a href={`#${topic.id}`} className="link-card" key={topic.id}>
                    <span className="link-card-icon" aria-hidden="true">
                      <Icon size={21} />
                    </span>
                    <span className="link-card-text">
                      <strong>{topic.kicker}</strong>
                      <small>{topic.summary}</small>
                    </span>
                    <ArrowDown className="link-card-arrow" aria-hidden="true" size={18} />
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
                      <p>{topic.lead}</p>
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

                  <TopicBody topic={topic} />

                  {topic.alert && <p className="safety-topic-alert">{topic.alert}</p>}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} note={t.footer} />
    </div>
  );
}
