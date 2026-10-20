import Link from "next/link";
import { ArrowLeft, Flag, Languages } from "lucide-react";
import type { Locale } from "@/lib/content";
import { contactPageContent } from "@/lib/contact-content";
import { TrackedLink } from "@/components/analytics-events";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = contactPageContent[locale];
  const alternateLocale = locale === "sq" ? "en" : "sq";
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    process.env.TURNSTILE_SITE_KEY ||
    "";

  return (
    <div className="site-shell contact-shell">
      <header className="site-header">
        <Link href={t.homeHref} className="brand">
          <Flag aria-hidden="true" size={22} />
          <span>Diaspora marshon</span>
        </Link>
        <nav aria-label="Contact page navigation">
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
              placement: "contact_header",
            }}
          >
            <Languages aria-hidden="true" size={18} />
            <span>{t.altLangLabel}</span>
          </TrackedLink>
        </nav>
      </header>

      <main className="section contact-band">
        <div className="section-inner contact-inner">
          <div className="section-heading">
            <p className="kicker">{t.kicker}</p>
            <h1 id="contact-title">{t.title}</h1>
            <p>{t.lead}</p>
          </div>
          <ContactForm locale={locale} content={t.form} turnstileSiteKey={turnstileSiteKey} />
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
