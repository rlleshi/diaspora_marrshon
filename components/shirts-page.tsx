import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Flag,
  Languages,
  Shirt,
} from "lucide-react";
import type { Locale } from "@/lib/content";
import {
  shirtCountries,
  shirtDownloadName,
  shirtImagePath,
  shirtsPageContent,
  type ShirtVersion,
} from "@/lib/shirts-content";
import { TrackedLink } from "@/components/analytics-events";

const versionOrder: ShirtVersion[] = ["black", "white"];

export function ShirtsPage({ locale }: { locale: Locale }) {
  const t = shirtsPageContent[locale];
  const alternateLocale = locale === "sq" ? "en" : "sq";

  return (
    <div className="site-shell shirts-shell">
      <header className="site-header">
        <Link href={t.homeHref} className="brand">
          <Flag aria-hidden="true" size={22} />
          <span>Diaspora marshon</span>
        </Link>
        <nav aria-label="Shirt page navigation">
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
              placement: "shirts_header",
            }}
          >
            <Languages aria-hidden="true" size={18} />
            <span>{t.altLangLabel}</span>
          </TrackedLink>
        </nav>
      </header>

      <main>
        <section className="shirts-hero">
          <div className="section-inner shirts-hero-grid">
            <div className="shirts-hero-copy">
              <p className="eyebrow">
                <Shirt aria-hidden="true" size={18} />
                {t.hero.kicker}
              </p>
              <h1>{t.hero.title}</h1>
              <p>{t.hero.body}</p>
              <TrackedLink
                className="button button-primary"
                href="/shirts/diaspora-shirts-preview.zip"
                download="diaspora-shirts-preview.zip"
                eventName="Shirts Downloaded"
                eventProperties={{ locale, type: "all" }}
              >
                <Download aria-hidden="true" size={20} />
                {t.hero.downloadAll}
              </TrackedLink>
            </div>
            <div className="shirts-hero-preview" aria-hidden="true">
              <Image
                src="/shirts/black-germany.jpg"
                alt=""
                width={256}
                height={448}
                priority
              />
              <Image
                src="/shirts/white-germany.jpg"
                alt=""
                width={256}
                height={488}
                priority
              />
            </div>
          </div>
        </section>

        <section className="section shirt-resource-band">
          <div className="section-inner">
            <aside className="shirt-notice">
              <strong>{t.notice.title}</strong>
              <p>{t.notice.body}</p>
            </aside>

            {versionOrder.map((version) => {
              const versionContent = t.versions[version];

              return (
                <section className="shirt-version" key={version}>
                  <div className="section-heading">
                    <h2>{versionContent.title}</h2>
                    <p>{versionContent.body}</p>
                  </div>

                  <div className="shirt-grid">
                    {shirtCountries.map((country) => {
                      const countryLabel = country.labels[locale];
                      const imagePath = shirtImagePath(version, country);

                      return (
                        <article className="shirt-card" key={country.slug}>
                          <Image
                            src={imagePath}
                            alt={t.previewAlt(versionContent.title, countryLabel)}
                            width={256}
                            height={version === "black" ? 448 : 488}
                            sizes="(max-width: 620px) calc(100vw - 56px), 256px"
                          />
                          <div className="shirt-card-footer">
                            <h3>{countryLabel}</h3>
                            <TrackedLink
                              className="download-link"
                              href={imagePath}
                              download={shirtDownloadName(version, country)}
                              eventName="Shirt Downloaded"
                              eventProperties={{
                                locale,
                                version,
                                country: country.slug,
                              }}
                            >
                              <Download aria-hidden="true" size={18} />
                              {t.downloadLabel}
                            </TrackedLink>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
