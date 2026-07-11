import Link from "next/link";
import { Activity, ArrowLeft, Flag, Languages } from "lucide-react";
import { content, type Locale } from "@/lib/content";
import {
  ParticipationChart,
  type ChartLabels,
} from "@/components/participation/ParticipationChart";
import { TrackedLink } from "@/components/analytics-events";

const COPY: Record<
  Locale,
  {
    homeHref: string;
    homeLabel: string;
    eyebrow: string;
    title: string;
    liveLabel: string;
    intro: { before: string; link: string; href: string; after: string };
    methodology: string;
    hint: string;
    disclaimer: string;
    labels: ChartLabels;
  }
> = {
  sq: {
    homeHref: "/",
    homeLabel: "Kthehu te faqja kryesore",
    eyebrow: "Pulsi i protestës për Shqipërinë e re",
    title: "41 ditë në shesh për një mjekërrosh bardhërosh",
    liveLabel: "Live",
    intro: {
      before:
        "Nga mbrojtja e Zvërnecit tek një lëvizje njëmujore për krijimin e një Shqipërie të re, që i futet rrugës së ",
      link: "zhvillimit të përshpejtuar",
      href: "https://www.youtube.com/watch?v=XF3nEmKziWU",
      after: ".",
    },
    methodology:
      "Indeks i pjesëmarrjes së vlerësuar, i normalizuar: 100 = dita më e madhe (20 qershor). Tubimet më të mëdha (6 qershor, 20 qershor dhe 4 korrik) janë ankoruar me vlerësime gjeometrike në terren; ditët e tjera pasqyrojnë intensitetin e dukshëm në kamerat e News24, të analizuar me një model numërimi turme.",
    hint: "Prek ose lëviz mbi çdo ditë për detaje.",
    disclaimer:
      "Shënim: shifrat nuk mund të jenë plotësisht të sakta, për shkak të kufizimeve të kamerave gjatë transmetimit si dhe saktësisë së modeleve të inteligjencës artificiale.",
    labels: {
      peakValue: "100",
      peakUnit: "indeks",
      legendPeak: "Piku ditor",
      legendMean: "Mesatarja e ditës",
      axisDay: "Dita",
      tooltipPeak: "Pik",
      tooltipPeakUnit: "pikë indeksi",
      tooltipMean: "Mesatare:",
      tooltipMedian: "Mediane:",
      tooltipSource: "Shiko transmetimin",
      replay: "Rishfaq",
      saturday: "e shtunë",
      ariaSummary:
        "Indeksi i pjesëmarrjes në protesta përgjatë 41 ditëve, me kulmin në ditën e 21-të (20 qershor 2026).",
    },
  },
  en: {
    homeHref: "/en",
    homeLabel: "Back to the homepage",
    eyebrow: "Protest pulse for a new Albania",
    title: "41 days in the square for a grey-bearded Rama",
    liveLabel: "Live",
    intro: {
      before:
        "From defending Zvërnec to a month-long movement for the creation of a new Albania that sets out on the path of ",
      link: "accelerated development",
      href: "https://www.youtube.com/watch?v=XF3nEmKziWU",
      after: ".",
    },
    methodology:
      "An estimated participation index, normalized so 100 = the largest day (20 June). The largest gatherings (6 June, 20 June and 4 July) are anchored to on-the-ground geometry estimates; other days reflect camera-visible intensity from News24 livestreams, analyzed with a crowd-counting model.",
    hint: "Tap or hover any day for detail.",
    disclaimer:
      "Note: the numbers cannot be fully accurate due to camera limitations during the livestream and the accuracy of machine-learning models.",
    labels: {
      peakValue: "100",
      peakUnit: "index",
      legendPeak: "Daily peak",
      legendMean: "Daily average",
      axisDay: "Day",
      tooltipPeak: "Peak",
      tooltipPeakUnit: "index points",
      tooltipMean: "Mean:",
      tooltipMedian: "Median:",
      tooltipSource: "Watch the broadcast",
      replay: "Replay",
      saturday: "Saturday",
      ariaSummary:
        "Protest participation index across 41 days, peaking on day 21 (20 June 2026).",
    },
  },
};

export function LiveTrackerPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const c = content[locale];
  const alternateLocale = locale === "sq" ? "en" : "sq";

  return (
    <div className="site-shell tracker-shell">
      <header className="site-header">
        <Link href={t.homeHref} className="brand">
          <Flag aria-hidden="true" size={22} />
          <span>Diaspora marshon</span>
        </Link>
        <nav aria-label="Live tracker navigation">
          <Link href={t.homeHref}>
            <ArrowLeft aria-hidden="true" size={18} />
            <span>{t.homeLabel}</span>
          </Link>
          <TrackedLink
            className="lang-switch"
            href={alternateLocale === "en" ? "/en/pulsi" : "/pulsi"}
            eventName="Language Switched"
            eventProperties={{
              from: locale,
              to: alternateLocale,
              placement: "tracker_header",
            }}
          >
            <Languages aria-hidden="true" size={18} />
            <span>{c.altLangLabel}</span>
          </TrackedLink>
        </nav>
      </header>

      <main>
        <section className="section tracker-band" id="participation">
          <div className="section-inner">
            <div className="section-heading">
              <p className="kicker">{t.eyebrow}</p>
              <h1 className="tracker-title">
                {t.title}
                <span className="tracker-live">
                  <span className="tracker-live-dot" aria-hidden="true" />
                  {t.liveLabel}
                </span>
              </h1>
              <p className="participation-caption">
                {t.intro.before}
                <a
                  className="context-link"
                  href={t.intro.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.intro.link}
                </a>
                {t.intro.after}
              </p>
              <p className="participation-hint">{t.hint}</p>
            </div>
            <figure className="participation-figure">
              <ParticipationChart locale={locale} labels={t.labels} />
              <figcaption className="participation-method">
                <Activity aria-hidden="true" size={15} />
                <span>{t.methodology}</span>
                <span className="participation-disclaimer">{t.disclaimer}</span>
              </figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{c.footer.privacy}</p>
        <p>{c.footer.noLinks}</p>
      </footer>
    </div>
  );
}
