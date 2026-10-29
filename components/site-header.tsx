import Link from "next/link";
import { Flag, Languages, ShieldAlert } from "lucide-react";
import { content, type Locale } from "@/lib/content";
import { SiteMenu } from "@/components/site-menu";
import { TrackedLink } from "@/components/analytics-events";

/** The menu entry for the page the visitor is on, marked as current. */
export type SiteHeaderPage = "home" | "tracker" | "march" | "scandals" | "safety";

/**
 * The sticky bar on every page: brand, the full page menu and the language
 * switch. The call to action leads back to the homepage's WhatsApp section,
 * so the menu reads the same wherever the visitor is.
 */
export function SiteHeader({
  locale,
  altLangHref,
  placement,
  current,
}: {
  locale: Locale;
  /** the same page in the other language */
  altLangHref: string;
  /** analytics label for the language switch, e.g. "tracker_header" */
  placement: string;
  current?: SiteHeaderPage;
}) {
  const t = content[locale];
  const homeHref = locale === "sq" ? "/" : "/en";
  const ariaCurrent = (page: SiteHeaderPage) => (page === current ? "page" : undefined);

  return (
    <header className="site-header">
      <Link href={homeHref} className="brand">
        <Flag aria-hidden="true" size={22} />
        <span>Diaspora marshon</span>
      </Link>
      <nav aria-label="Primary navigation">
        <SiteMenu openLabel={t.nav.menuOpen} closeLabel={t.nav.menuClose}>
          <Link href={t.trackerTeaser.href} aria-current={ariaCurrent("tracker")}>
            {t.nav.tracker}
          </Link>
          <Link href={t.marchPage.href} aria-current={ariaCurrent("march")}>
            {t.nav.march}
          </Link>
          <Link href={t.scandalsTeaser.href} aria-current={ariaCurrent("scandals")}>
            {t.nav.scandals}
          </Link>
          <Link
            className="nav-safety"
            href={locale === "sq" ? "/siguria" : "/en/siguria"}
            aria-current={ariaCurrent("safety")}
          >
            <ShieldAlert aria-hidden="true" size={16} />
            {t.nav.safety}
          </Link>
          <Link className="nav-cta" href={current === "home" ? "#pledge" : `${homeHref}#pledge`}>
            {t.nav.pledge}
          </Link>
        </SiteMenu>
        <TrackedLink
          className="lang-switch"
          href={altLangHref}
          eventName="Language Switched"
          eventProperties={{
            from: locale,
            to: locale === "sq" ? "en" : "sq",
            placement,
          }}
        >
          <Languages aria-hidden="true" size={18} />
          <span>{t.altLangLabel}</span>
        </TrackedLink>
      </nav>
    </header>
  );
}
