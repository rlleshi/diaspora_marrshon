import Link from "next/link";
import { Activity } from "lucide-react";
import type { Locale } from "@/lib/content";
import { methodologyPageContent } from "@/lib/methodology-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** How the Pulsi index is made, its limits, and where to get the data and code. */
export function MethodologyPage({ locale }: { locale: Locale }) {
  const t = methodologyPageContent[locale];

  return (
    <div className="site-shell contact-shell">
      <SiteHeader
        locale={locale}
        altLangHref={t.altLangHref}
        placement="methodology_header"
      />

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
