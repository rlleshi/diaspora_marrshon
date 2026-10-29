import Link from "next/link";
import { Mail } from "lucide-react";
import type { Locale } from "@/lib/content";
import { privacyPageContent } from "@/lib/privacy-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = privacyPageContent[locale];

  return (
    <div className="site-shell contact-shell">
      <SiteHeader
        locale={locale}
        altLangHref={t.altLangHref}
        placement="privacy_header"
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
