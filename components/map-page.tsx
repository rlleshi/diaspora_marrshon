import { Code2, MapPinned } from "lucide-react";
import type { Locale } from "@/lib/content";
import {
  FLAMINGO_MAP_REPO_URL,
  FLAMINGO_MAP_URL,
  mapPageContent,
} from "@/lib/map-content";
import { FlamingoMapEmbed } from "@/components/flamingo-map-embed";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** /harta: the protest map of the Flamingo Revolution, at home and abroad. */
export function MapPage({ locale }: { locale: Locale }) {
  const t = mapPageContent[locale];

  return (
    <div className="site-shell">
      <SiteHeader
        locale={locale}
        altLangHref={t.altLangHref}
        placement="map_header"
        current="map"
      />

      <main>
        <section className="map-hero">
          <div className="section-inner map-hero-grid">
            <div className="map-hero-copy">
              <p className="eyebrow">
                <MapPinned aria-hidden="true" size={18} />
                {t.kicker}
              </p>
              <h1>{t.title}</h1>
              <p>{t.body}</p>
            </div>
            <ul className="pulse-stats map-hero-stats">
              {t.stats.map((stat) => (
                <li key={stat.label}>
                  <span className="pulse-stat-value">{stat.value}</span>
                  <span className="pulse-stat-label">{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section map-band">
          <div className="section-inner">
            <FlamingoMapEmbed
              src={FLAMINGO_MAP_URL}
              title={t.frameTitle}
              loadLabel={t.loadLabel}
              loadNote={t.loadNote}
              previewAlt={t.previewAlt}
              locale={locale}
            />
            <div className="map-meta">
              <p className="map-as-of">{t.asOf}</p>
              {t.languageNote ? <p>{t.languageNote}</p> : null}
              <p>{t.credit}</p>
              <div className="map-meta-links">
                <a href={FLAMINGO_MAP_REPO_URL} target="_blank" rel="noreferrer">
                  <Code2 aria-hidden="true" size={16} />
                  {t.repoLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
