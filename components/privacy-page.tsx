import Link from "next/link";
import { ArrowLeft, Flag, Languages, Mail } from "lucide-react";
import type { Locale } from "@/lib/content";
import { privacyPageContent } from "@/lib/privacy-content";
import { TrackedLink } from "@/components/analytics-events";
import { SiteFooter } from "@/components/site-footer";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = privacyPageContent[locale];
  const alternateLocale = locale === "sq" ? "en" : "sq";

  return (
    <div className="site-shell contact-shell">
      <header className="site-header">
        <Link href={t.homeHref} className="brand">
          <Flag aria-hidden="true" size={22} />
          <span>Diaspora marshon</span>
        </Link>
        <nav aria-label="Privacy page navigation">
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
              placement: "privacy_header",
            }}
          >
            <Languages aria-hidden="true" size={18} />
            <span>{t.altLangLabel}</span>
          </TrackedLink>
        </nav>
      </header>

      <main className="section contact-band">
        <div className="section-inner privacy-inner">
          <div className="section-heading">
            <p className="kicker">{t.kicker}</p>
            <h1>{t.title}</h1>
            <p>{t.lead}</p>
            <p className="privacy-updated">{t.updated}</p>
          </div>

          {t.sections.map((section) => (
            <section className="privacy-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <Link className="button button-primary privacy-contact" href={t.contactHref}>
            <Mail aria-hidden="true" size={18} />
            {t.contactLabel}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
