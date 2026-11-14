import type { Locale } from "@/lib/content";

/**
 * The protest map is the volunteer Flamingo Map (github.com/pomodoren/flamingo-map),
 * a static OpenLayers map built to be embedded. /harta embeds its live build, so the
 * map itself is always current; only the counts below are a snapshot.
 */
export const FLAMINGO_MAP_URL = "https://pomodoren.github.io/flamingo-map/";
export const FLAMINGO_MAP_REPO_URL = "https://github.com/pomodoren/flamingo-map";

/**
 * Counts from the map's data (data/locations.json on the live build), for places
 * outside Albania only: there every record is one protest on one day. Kosovo and
 * North Macedonia count as outside Albania, so the copy says "outside Albania"
 * rather than "the diaspora". `asOf` is when the data was read, `lastRecord` the
 * latest protest date in it. Refresh with `node scripts/refresh-map-snapshot.mjs`.
 */
export const mapSnapshot = {
  asOf: "2026-11-14",
  lastRecord: "2026-10-30",
  protestsAbroad: 293,
  citiesAbroad: 67,
  countriesAbroad: 22,
};

const { protestsAbroad, citiesAbroad, countriesAbroad } = mapSnapshot;

const MONTHS: Record<Locale, string[]> = {
  sq: ["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

/** "2026-11-12" as "12 nëntor 2026" / "12 November 2026", or without the year. */
export function mapDate(iso: string, locale: Locale, withYear = true) {
  const [year, month, day] = iso.split("-").map(Number);
  const text = `${day} ${MONTHS[locale][month - 1]}`;
  return withYear ? `${text} ${year}` : text;
}

export type MapPageContent = {
  altLangHref: string;
  kicker: string;
  title: string;
  body: string;
  stats: Array<{ value: string; label: string }>;
  asOf: string;
  frameTitle: string;
  loadLabel: string;
  loadNote: string;
  repoLabel: string;
  credit: string;
  /** only on the English page: the map's own interface is Albanian */
  languageNote?: string;
  previewAlt: string;
};

export const mapPageContent: Record<Locale, MapPageContent> = {
  sq: {
    altLangHref: "/en/harta",
    kicker: "Harta e protestave",
    title: "Revolucioni Flamingo, në hartë.",
    body:
      "Harta vullnetare Flamingo Map regjistron protestat e Revolucionit Flamingo në Shqipëri dhe në botë: ku u mbajtën, kur dhe sa vetë morën pjesë, kur dihet.",
    stats: [
      { value: String(protestsAbroad), label: "protesta jashtë Shqipërisë" },
      { value: String(citiesAbroad), label: "qytete" },
      { value: String(countriesAbroad), label: "shtete" },
    ],
    asOf: `Gjendja më ${mapDate(mapSnapshot.asOf, "sq")}. Harta plotësohet nga vullnetarë: protesta më e fundit në të mban datën ${mapDate(mapSnapshot.lastRecord, "sq", false)}.`,
    frameTitle: "Harta e protestave të Revolucionit Flamingo",
    loadLabel: "Shfaq hartën",
    loadNote: "Harta ngarkohet nga GitHub Pages dhe OpenStreetMap vetëm kur e hap.",
    repoLabel: "Kodi dhe të dhënat",
    credit:
      "Harta: Flamingo Map, projekt vullnetar me kod të hapur. Të dhënat: CC BY-NC 4.0. Sfondi: © kontribuesit e OpenStreetMap.",
    previewAlt: "Harta e protestave të Revolucionit Flamingo në Evropë dhe në Amerikën e Veriut",
  },
  en: {
    altLangHref: "/harta",
    kicker: "The protest map",
    title: "The Flamingo Revolution, on the map.",
    body:
      "The volunteer Flamingo Map records the Flamingo Revolution's protests in Albania and around the world: where they were held, when, and how many took part, where that is known.",
    stats: [
      { value: String(protestsAbroad), label: "protests outside Albania" },
      { value: String(citiesAbroad), label: "cities" },
      { value: String(countriesAbroad), label: "countries" },
    ],
    asOf: `As of ${mapDate(mapSnapshot.asOf, "en")}. Volunteers fill the map in: the latest protest on it is dated ${mapDate(mapSnapshot.lastRecord, "en", false)}.`,
    frameTitle: "Map of the Flamingo Revolution protests",
    loadLabel: "Show the map",
    loadNote: "The map loads from GitHub Pages and OpenStreetMap only when you open it.",
    repoLabel: "Code and data",
    credit:
      "Map: Flamingo Map, a volunteer open-source project. Data: CC BY-NC 4.0. Base map: © OpenStreetMap contributors.",
    languageNote: "The map's interface is in Albanian only.",
    previewAlt: "Map of the Flamingo Revolution protests in Europe and North America",
  },
};
