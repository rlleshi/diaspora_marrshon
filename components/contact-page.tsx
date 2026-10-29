import type { Locale } from "@/lib/content";
import { contactPageContent } from "@/lib/contact-content";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = contactPageContent[locale];
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    process.env.TURNSTILE_SITE_KEY ||
    "";

  return (
    <div className="site-shell contact-shell">
      <SiteHeader
        locale={locale}
        altLangHref={t.altLangHref}
        placement="contact_header"
      />

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
