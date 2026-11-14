import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Backpack,
  CheckCircle2,
  Droplets,
  Flag,
  Footprints,
  GraduationCap,
  HandHeart,
  Landmark,
  Mail,
  MapPinned,
  Newspaper,
  PlaneLanding,
  Scale,
  Shirt,
  Timer,
  Utensils,
} from "lucide-react";
import { content, SHOW_NEXT_MARCH, type Locale } from "@/lib/content";
import { HistoryCarousel } from "@/components/history-carousel";
import { SectionViewTracker, TrackedLink } from "@/components/analytics-events";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import routeMapImage from "@/docs/marshimi_i_diaspores_bulevard_sheshi.png";

const googleMapsRouteUrl =
  "https://www.google.com/maps/dir/?api=1&origin=Sheshi+N%C3%ABn%C3%AB+Tereza%2C+Tiran%C3%AB&destination=Sheshi+Sk%C3%ABnderbej%2C+Tiran%C3%AB&travelmode=walking";

// one per item of "beyond the square": funds and supplies, politicians, media, human rights, academics, the open letter
const beyondIcons = [HandHeart, Landmark, Newspaper, Scale, GraduationCap, Mail];

const practicalAdviceIcons = [
  Droplets,
  Utensils,
  Timer,
  Footprints,
  Activity,
  Backpack,
];

/**
 * /marshimi: the diaspora's history in the Flamingo Revolution. It began as the
 * march page, so the URL stays and the march sections keep the ids they had on
 * the homepage (#context, #history, #marshimi): old /#history style links still
 * have somewhere to land.
 */
export function MarchPage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const h = t.history;
  const homeHref = locale === "sq" ? "/" : "/en";
  const routeLayoutClassName = t.itinerary.showMap
    ? "route-layout"
    : "route-layout route-layout-single";

  return (
    <div className="site-shell">
      <SiteHeader
        locale={locale}
        altLangHref={locale === "sq" ? "/en/marshimi" : "/marshimi"}
        placement="march_header"
        current="march"
      />

      <main>
        <section className="march-hero">
          <div className="section-inner march-hero-copy">
            <p className="eyebrow">
              <Flag aria-hidden="true" size={18} />
              {t.marchPage.kicker}
            </p>
            <h1>{t.marchPage.title}</h1>
            <p>{t.marchPage.body}</p>
            <Link className="button button-primary" href={`${homeHref}#pledge`}>
              <ArrowRight aria-hidden="true" size={20} />
              {t.hero.primaryCta}
            </Link>
          </div>
        </section>

        <section className="section origin-band" id="origin" aria-labelledby="origin-title">
          <div className="section-inner origin">
            <span className="origin-icon" aria-hidden="true">
              <PlaneLanding size={26} />
            </span>
            <div className="section-heading">
              <p className="kicker">{h.origin.kicker}</p>
              <h2 id="origin-title">{h.origin.title}</h2>
              <p>{h.origin.body}</p>
            </div>
          </div>
        </section>

        <section className="section abroad-band" id="abroad" aria-labelledby="abroad-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="kicker">{h.abroad.kicker}</p>
              <h2 id="abroad-title">{h.abroad.title}</h2>
              <p>{h.abroad.body}</p>
              <TrackedLink
                className="button button-secondary abroad-map-link"
                href={t.mapTeaser.href}
                eventName="Map Page Opened"
                eventProperties={{ locale, placement: "history_abroad" }}
              >
                <MapPinned aria-hidden="true" size={20} />
                {h.abroad.mapCta}
              </TrackedLink>
            </div>
            <h3 className="carousel-heading">{h.abroad.highlightsTitle}</h3>
            <HistoryCarousel items={h.abroad.moments} carousel={h.abroad.carousel} />
          </div>
        </section>

        <section className="section history-band" id="history">
          <div className="section-inner">
            <div className="section-heading">
              <p className="kicker">{t.pastMarches.kicker}</p>
              <h2>{t.pastMarches.title}</h2>
              <p>{t.pastMarches.body}</p>
            </div>
            <HistoryCarousel
              items={t.pastMarches.items}
              carousel={t.pastMarches.carousel}
            />
          </div>
        </section>

        {SHOW_NEXT_MARCH ? (
          <section className="section marshimi-band" id="marshimi">
            <SectionViewTracker
              targetId="marshimi"
              eventName="March Section Viewed"
              eventProperties={{ locale }}
            />
            <div className="section-inner">
              <div className="section-heading marshimi-heading">
                <p className="kicker">{t.march.kicker}</p>
                <h2>{t.march.title}</h2>
                <p>{t.march.body}</p>
              </div>

              <div className="marshimi-part">
                <div className="marshimi-part-head">
                  <h3>{t.itinerary.title}</h3>
                  <p className="route-date">{t.itinerary.dateLine}</p>
                  <p>{t.itinerary.body}</p>
                </div>
                <div className={routeLayoutClassName}>
                  <div className="route-timeline">
                    <div className="route-visual" aria-hidden="true">
                      <MapPinned size={34} />
                      <div className="route-line">
                        {t.itinerary.points.map((point) => (
                          <span key={point.time} />
                        ))}
                      </div>
                    </div>
                    <ol className="timeline">
                      {t.itinerary.points.map((point) => (
                        <li key={`${point.time}-${point.title}`}>
                          <span className="timeline-time">{point.time}</span>
                          <div>
                            <h3>{point.title}</h3>
                            <p>{point.body}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <figure className="route-map">
                    {t.itinerary.showMap ? (
                      <a
                        href={routeMapImage.src}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t.itinerary.mapOpenLabel}
                      >
                        <Image
                          src={routeMapImage}
                          alt={t.itinerary.mapAlt}
                          sizes="(max-width: 900px) calc(100vw - 28px), 520px"
                        />
                      </a>
                  ) : null}
                  <TrackedLink
                    className="route-map-link"
                    href={googleMapsRouteUrl}
                    target="_blank"
                    rel="noreferrer"
                    eventName="Google Maps Opened"
                    eventProperties={{ locale, placement: "route_map" }}
                  >
                    <MapPinned aria-hidden="true" size={18} />
                    {t.itinerary.mapExternalLabel}
                  </TrackedLink>
                </figure>
              </div>
            </div>

            <div className="marshimi-part">
              <div className="marshimi-part-head">
                <h3>{t.rules.title}</h3>
                <p>{t.rules.body}</p>
              </div>
              <div className="rules-grid">
                {t.rules.items.map((item) => (
                  <article className="rule-item" key={item.title}>
                    <CheckCircle2 aria-hidden="true" size={22} />
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="marshimi-part" hidden>
              <div className="marshimi-part-head">
                <h3>{t.practicalAdvice.title}</h3>
                <p>{t.practicalAdvice.body}</p>
              </div>
              <div className="advice-grid">
                {t.practicalAdvice.items.map((item, index) => {
                  const AdviceIcon =
                    practicalAdviceIcons[index] ?? CheckCircle2;

                  return (
                    <article className="advice-item" key={item.title}>
                      <span className="advice-icon">
                        <AdviceIcon aria-hidden="true" size={22} />
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        ) : null}

        <section className="section beyond-band" id="beyond" aria-labelledby="beyond-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="kicker">{h.beyond.kicker}</p>
              <h2 id="beyond-title">{h.beyond.title}</h2>
              <p>{h.beyond.body}</p>
            </div>
            {h.beyond.highlight ? (
              <article className="history-item beyond-highlight">
                <span className="history-date">
                  <Flag aria-hidden="true" size={18} />
                  {h.beyond.highlight.dateLabel}
                </span>
                <h3>{h.beyond.highlight.title}</h3>
                <p className="history-route">
                  <MapPinned aria-hidden="true" size={16} />
                  {h.beyond.highlight.route}
                </p>
                <p>{h.beyond.highlight.summary}</p>
              </article>
            ) : null}
            <div className="beyond-grid">
              {h.beyond.items.map((item, index) => {
                const ItemIcon = beyondIcons[index] ?? CheckCircle2;
                return (
                  <article className="beyond-item" key={item.title}>
                    <span className="link-card-icon" aria-hidden="true">
                      <ItemIcon size={22} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section context-band" id="context" aria-labelledby="context-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="kicker">{t.context.kicker}</p>
              <h2 id="context-title">{t.context.title}</h2>
              <p>
                {t.context.body.before}
                <a
                  className="context-link"
                  href={t.context.body.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.context.body.link}
                </a>
                {t.context.body.after}
              </p>
            </div>
            {/* two cards per row: the two short demands, then the two lists, then the last one full width */}
            <ol className="demand-grid">
              {t.context.demands.map((demand, index) => (
                <li className="demand-card" key={demand.text}>
                  <span className="demand-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="demand-content">
                    <p className="demand-text">{demand.text}</p>
                    {demand.items ? (
                      <ul className="demand-subgroup">
                        {demand.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <p className="context-closing">{t.context.closing}</p>
          </div>
        </section>

        <section className="section shirts-teaser-band">
          <div className="section-inner shirts-teaser">
            <div className="section-copy">
              <p className="kicker">{t.shirtsTeaser.kicker}</p>
              <h2>{t.shirtsTeaser.title}</h2>
              <p>{t.shirtsTeaser.body}</p>
              <TrackedLink
                className="button button-secondary"
                href={t.shirtsTeaser.href}
                eventName="Shirts Page Opened"
                eventProperties={{ locale, placement: "march_teaser" }}
              >
                <Shirt aria-hidden="true" size={20} />
                {t.shirtsTeaser.cta}
              </TrackedLink>
            </div>
            <figure className="shirts-teaser-preview">
              <div>
                <Image
                  src="/shirts/black-germany.jpg"
                  alt={t.shirtsTeaser.previewAlt}
                  width={256}
                  height={448}
                />
                <Image
                  src="/shirts/white-germany.jpg"
                  alt=""
                  width={256}
                  height={488}
                />
              </div>
            </figure>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
