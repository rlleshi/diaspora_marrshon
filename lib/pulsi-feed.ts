import { participation } from "@/data/participation";
import { formatDate } from "@/components/participation/DayLog";
import { SITE_URL } from "@/lib/metadata";

type Locale = "sq" | "en";

/** Feed readers only need the recent run; the full series is in the CSV. */
const ITEMS = 30;

const COPY = {
  sq: {
    page: "/pulsi",
    title: "Pulsi i protestës: Revolucioni Flamingo",
    description:
      "Një shënim për çdo natë proteste në Tiranë që nga 31 maji 2026, me indeksin e pjesëmarrjes të vlerësuar nga transmetimet live të News24 (100 = 20 qershor).",
    day: "Dita",
    figures: (peak: string, mean: string, median: string) =>
      `Piku ${peak} · mesatarja ${mean} · mediana ${median} (indeks; 100 = 20 qershor 2026).`,
    noData: "Kjo ditë nuk ka shifër të publikueshme.",
  },
  en: {
    page: "/en/pulsi",
    title: "Protest Pulse: Flamingo Revolution, Albania",
    description:
      "A note for every night of protest in Tirana since 31 May 2026, with the participation index estimated from News24 livestreams (100 = 20 June).",
    day: "Day",
    figures: (peak: string, mean: string, median: string) =>
      `Peak ${peak} · mean ${mean} · median ${median} (index; 100 = 20 June 2026).`,
    noData: "No publishable figure for this day.",
  },
};

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Evening of the protest day; the index is published the day after at the earliest. */
const rfc822 = (iso: string) => new Date(`${iso}T20:00:00Z`).toUTCString();

/** RSS 2.0 feed of the latest days, newest first, one per language. */
export function pulsiFeed(locale: Locale) {
  const t = COPY[locale];
  const page = `${SITE_URL}${t.page}`;
  const self = `${page}/feed.xml`;
  const days = participation.slice(-ITEMS).reverse();

  const items = days.map((d) => {
    const link = `${page}#dita-${d.day}`;
    const figures =
      d.peak === null || d.mean === null || d.median === null
        ? t.noData
        : t.figures(d.peak.toFixed(2), d.mean.toFixed(2), d.median.toFixed(2));
    return [
      "    <item>",
      `      <title>${escape(`${t.day} ${d.day} · ${formatDate(d.date, locale)}`)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <pubDate>${rfc822(d.date)}</pubDate>`,
      `      <description>${escape(`${d.note[locale]} ${figures}`)}</description>`,
      "    </item>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escape(t.title)}</title>`,
    `    <link>${page}</link>`,
    `    <description>${escape(t.description)}</description>`,
    `    <language>${locale}</language>`,
    `    <lastBuildDate>${rfc822(days[0].date)}</lastBuildDate>`,
    `    <atom:link href="${self}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
