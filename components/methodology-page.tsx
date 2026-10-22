import Link from "next/link";
import { Activity, ArrowLeft, Flag, Languages } from "lucide-react";
import type { Locale } from "@/lib/content";
import { methodologyPageContent } from "@/lib/methodology-content";
import { TrackedLink } from "@/components/analytics-events";
import { SiteFooter } from "@/components/site-footer";

/** How the Pulsi index is made, its limits, and where to get the data and code. */
export function MethodologyPage({ locale }: { locale: Locale }) {
  const t = methodologyPageContent[locale];
  const alternateLocale = locale === "sq" ? "en" : "sq";

  return (
    <div className="site-shell contact-shell">
      <header className="site-header">
        <Link href={t.homeHref} className="brand">
          <Flag aria-hidden="true" size={22} />
          <span>Diaspora marshon</span>
        </Link>
        <nav aria-label="Methodology page navigation">
          <Link href={t.trackerHref}>
            <ArrowLeft aria-hidden="true" size={18} />
            <span>{t.trackerLabel}</span>
          </Link>
          <TrackedLink
            className="lang-switch"
            href={t.altLangHref}
            eventName="Language Switched"
            eventProperties={{
              from: locale,
              to: alternateLocale,
              placement: "methodology_header",
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

          <section className="privacy-section">
            <h2>{t.resourcesTitle}</h2>
            <ul className="methodology-resources">
              {t.resources.map((resource) => (
                <li key={resource.href}>
                  <a className="context-link" href={resource.href}>
                    {resource.label}
                  </a>
                  <span>{resource.detail}</span>
                </li>
              ))}
            </ul>
            <p>{t.citation}</p>
            <p>
              {t.corrections.before}
              <Link className="context-link" href={t.corrections.href}>
                {t.corrections.link}
              </Link>
              {t.corrections.after}
            </p>
          </section>

          <Link className="button button-primary privacy-contact" href={t.trackerHref}>
            <Activity aria-hidden="true" size={18} />
            {t.trackerLabel}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
