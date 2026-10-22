import { participation } from "@/data/participation";

type Locale = "sq" | "en";

const MONTHS: Record<Locale, string[]> = {
  sq: ["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

const COPY = {
  sq: {
    summary: (n: number) => `Ditë pas dite: të ${n} netët e protestës`,
    day: "Dita",
    index: "indeksi i pikut",
    noData: "pa shifra",
    stream: "Transmetimi",
    report: "Kronika",
  },
  en: {
    summary: (n: number) => `Day by day: all ${n} nights of protest`,
    day: "Day",
    index: "peak index",
    noData: "no figures",
    stream: "Broadcast",
    report: "Coverage",
  },
};

export function formatDate(iso: string, locale: Locale) {
  const [y, m, d] = iso.split("-").map(Number);
  return locale === "en" ? `${d} ${MONTHS.en[m - 1]} ${y}` : `${d} ${MONTHS.sq[m - 1]} ${y}`;
}

/**
 * Every day's note as plain server-rendered text, newest first. The chart only
 * shows a note on hover, so without this list the notes never reach the HTML
 * that search engines and screen readers read.
 */
export function DayLog({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const days = [...participation].reverse();
  return (
    <details className="day-log">
      <summary>{t.summary(participation.length)}</summary>
      <ol className="day-log-list" reversed>
        {days.map((d) => (
          <li key={d.day} id={`dita-${d.day}`}>
            <p className="day-log-head">
              <strong>
                {t.day} {d.day}
              </strong>
              <span aria-hidden="true"> · </span>
              <time dateTime={d.date}>{formatDate(d.date, locale)}</time>
              <span aria-hidden="true"> · </span>
              <span>{d.peak === null ? t.noData : `${t.index} ${d.peak.toFixed(1)}`}</span>
              <span aria-hidden="true"> · </span>
              <a href={d.source} target="_blank" rel="noreferrer">
                {d.source.includes("youtube.com") || d.source.includes("youtu.be") ? t.stream : t.report}
              </a>
            </p>
            <p>{d.note[locale]}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}
