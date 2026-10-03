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
    title: "125 ditë në shesh për një mjekërrosh bardhërosh",
    liveLabel: "Live",
    intro: {
      before:
        "Nga mbrojtja e Zvërnecit tek një lëvizje e përditshme për krijimin e një Shqipërie të re, që i futet rrugës së ",
      link: "zhvillimit të përshpejtuar",
      href: "https://www.youtube.com/watch?v=XF3nEmKziWU",
      after: ".",
    },
    methodology:
      "Indeks i pjesëmarrjes së vlerësuar, i normalizuar: 100 = dita më e madhe (20 qershor). Tubimet më të mëdha (6 qershor, 20 qershor dhe 4 korrik) janë ankoruar me vlerësime gjeometrike në terren; ditët e tjera pasqyrojnë intensitetin e dukshëm në kamerat e News24, të analizuar me një model numërimi turme.",
    hint: "Prek ose lëviz mbi çdo ditë për detaje; kliko një ditë për ta fiksuar. Zgjidh një periudhë ose një javë më poshtë për ta parë nga afër.",
    disclaimer:
      "Shënim: shifrat nuk mund të jenë plotësisht të sakta, për shkak të kufizimeve të kamerave gjatë transmetimit si dhe saktësisë së modeleve të inteligjencës artificiale.",
    labels: {
      peakValue: "100",
      peakUnit: "indeks",
      legendPeak: "Piku ditor",
      legendMean: "Mesatarja e ditës",
      axisDay: "Dita",
      axisIndex: "Indeksi i turmës",
      tooltipPeak: "Pik",
      tooltipPeakUnit: "pikë indeksi",
      tooltipMean: "Mesatare:",
      tooltipMedian: "Mediane:",
      tooltipSource: "Shiko transmetimin",
      tooltipSourceReport: "Shiko kronikën",
      noData: "Pa shifra për këtë ditë",
      close: "Mbyll",
      replay: "Rishfaq",
      saturday: "e shtunë",
      ariaSummary:
        "Indeksi i pjesëmarrjes në protesta përgjatë 125 ditëve, me kulmin në ditën e 21-të (20 qershor 2026).",
      rangeLabel: "Periudha",
      rangeAll: "Të gjitha ditët",
      rangeLast30: "30 ditët e fundit",
      rangeLast14: "14 ditët e fundit",
      monthsTitle: "Sipas muajit",
      weeksTitle: "Sipas javës",
      weeksHint:
        "Kliko një javë për ta hapur ditë pas dite; boshti rillogaritet sipas periudhës së zgjedhur.",
      weekShort: "Java",
      weekPeakLabel: "Piku i javës",
      weekAvgLabel: "Mesatarja e javës",
      momentsTitle: "Momentet kyçe",
      viewLabel: "Pamja e grafikut",
      viewLog: "Logaritmike",
      viewLinear: "Lineare",
      viewCalendar: "Kalendar",
      viewLogHint:
        "Tregon si krahasohet çdo natë me netët përreth: çdo hap lart në bosht është një shumëfish, ndaj netët e qeta lexohen po aq qartë sa dita më e madhe.",
      viewLinearHint:
        "Tregon sa e madhe ishte çdo natë krahasuar me 20 qershorin: lartësitë janë në përpjesëtim të drejtë, ndaj 100 qëndron dhjetë herë më lart se 10.",
      viewCalendarHintWide:
        "Një katror për çdo natë, një kolonë për çdo javë proteste, të shtunat në rreshtin e fundit.",
      viewCalendarHintNarrow:
        "Një katror për çdo natë, një rresht për çdo javë proteste, të shtunat në kolonën e fundit.",
      calendarLegend: "Indeksi i turmës",
      calendarLegendNote:
        "Hapat janë të pabarabartë me qëllim: {below} nga {total} netë janë nën 10.",
    },
  },
  en: {
    homeHref: "/en",
    homeLabel: "Back to the homepage",
    eyebrow: "Protest pulse for a new Albania",
    title: "125 days in the square for a grey-bearded Rama",
    liveLabel: "Live",
    intro: {
      before:
        "From defending Zvërnec to a daily movement for the creation of a new Albania that sets out on the path of ",
      link: "accelerated development",
      href: "https://www.youtube.com/watch?v=XF3nEmKziWU",
      after: ".",
    },
    methodology:
      "An estimated participation index, normalized so 100 = the largest day (20 June). The largest gatherings (6 June, 20 June and 4 July) are anchored to on-the-ground geometry estimates; other days reflect camera-visible intensity from News24 livestreams, analyzed with a crowd-counting model.",
    hint: "Tap or hover any day for detail; click a day to pin it. Pick a range or a week below to zoom in.",
    disclaimer:
      "Note: the numbers cannot be fully accurate due to camera limitations during the livestream and the accuracy of machine-learning models.",
    labels: {
      peakValue: "100",
      peakUnit: "index",
      legendPeak: "Daily peak",
      legendMean: "Daily average",
      axisDay: "Day",
      axisIndex: "Crowd index",
      tooltipPeak: "Peak",
      tooltipPeakUnit: "index points",
      tooltipMean: "Mean:",
      tooltipMedian: "Median:",
      tooltipSource: "Watch the broadcast",
      tooltipSourceReport: "Read the coverage",
      noData: "No figures for this day",
      close: "Close",
      replay: "Replay",
      saturday: "Saturday",
      ariaSummary:
        "Protest participation index across 125 days, peaking on day 21 (20 June 2026).",
      rangeLabel: "Range",
      rangeAll: "All days",
      rangeLast30: "Last 30 days",
      rangeLast14: "Last 14 days",
      monthsTitle: "By month",
      weeksTitle: "By week",
      weeksHint:
        "Click a week to open it day by day; the axis rescales to the selected range.",
      weekShort: "Week",
      weekPeakLabel: "Week peak",
      weekAvgLabel: "Week average",
      momentsTitle: "Key moments",
      viewLabel: "Chart view",
      viewLog: "Log scale",
      viewLinear: "Linear",
      viewCalendar: "Calendar",
      viewLogHint:
        "Shows how each night compares with the nights around it: each step up the axis is a multiple, so quiet nights stay as readable as the biggest day.",
      viewLinearHint:
        "Shows how big each night was next to 20 June: heights are proportional, so 100 sits ten times higher than 10.",
      viewCalendarHintWide:
        "One square per night, one column per protest week, Saturdays along the bottom row.",
      viewCalendarHintNarrow:
        "One square per night, one row per protest week, Saturdays in the last column.",
      calendarLegend: "Crowd index",
      calendarLegendNote: "Uneven steps on purpose: {below} of {total} nights sit below 10.",
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

    </div>
  );
}
