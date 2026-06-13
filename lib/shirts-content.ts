import type { Locale } from "@/lib/content";

export type ShirtVersion = "black" | "white";

export type ShirtCountry = {
  slug: "germany" | "italy" | "uk" | "austria" | "switzerland" | "usa";
  labels: Record<Locale, string>;
};

export const shirtCountries: ShirtCountry[] = [
  { slug: "germany", labels: { sq: "Gjermani", en: "Germany" } },
  { slug: "italy", labels: { sq: "Itali", en: "Italy" } },
  { slug: "uk", labels: { sq: "Angli", en: "UK" } },
  { slug: "austria", labels: { sq: "Austri", en: "Austria" } },
  { slug: "switzerland", labels: { sq: "Zvicër", en: "Switzerland" } },
  { slug: "usa", labels: { sq: "SHBA", en: "USA" } },
];

export function shirtImagePath(version: ShirtVersion, country: ShirtCountry) {
  return `/shirts/${version}-${country.slug}.jpg`;
}

export function shirtDownloadName(version: ShirtVersion, country: ShirtCountry) {
  return `diaspora-marshon-${version}-${country.slug}.jpg`;
}

export const shirtsPageContent: Record<
  Locale,
  {
    langLabel: string;
    altLangHref: string;
    altLangLabel: string;
    homeHref: string;
    homeLabel: string;
    hero: {
      kicker: string;
      title: string;
      body: string;
      downloadAll: string;
    };
    notice: {
      title: string;
      body: string;
    };
    versions: Record<
      ShirtVersion,
      {
        title: string;
        body: string;
      }
    >;
    downloadLabel: string;
    previewAlt: (versionTitle: string, country: string) => string;
  }
> = {
  sq: {
    langLabel: "Shqip",
    altLangHref: "/en/veshja",
    altLangLabel: "English",
    homeHref: "/",
    homeLabel: "Kthehu te faqja kryesore",
    hero: {
      kicker: "Veshje sugjeruese",
      title: "Nëse do, mbaj të njëjtin mesazh.",
      body:
        "Këto dizajne janë sugjerime për një pamje të përbashkët dhe për një mesazh më të dukshëm në shesh.",
      downloadAll: "Shkarko sugjerimet",
    },
    notice: {
      title: "Për përdorim të lirë",
      body:
        "Mund t'i përdorësh për koordinim, shpërndarje online ose si ide për printim personal. Skedarët me rezolucion profesional për printim do të shtohen së shpejti.",
    },
    versions: {
      black: {
        title: "Bluza e zezë",
        body:
          "Versioni më i fortë për marshim dhe kamera: përpara flamujt, nga pas DIASPORA.",
      },
      white: {
        title: "Bluza e bardhë",
        body:
          "Versioni shpjegues: përpara mesazhi i përbashkët, nga pas arsyet pse marshojmë.",
      },
    },
    downloadLabel: "Shkarko",
    previewAlt: (versionTitle, country) =>
      `${versionTitle} për ${country}, pamje përpara dhe mbrapa`,
  },
  en: {
    langLabel: "English",
    altLangHref: "/veshja",
    altLangLabel: "Shqip",
    homeHref: "/en",
    homeLabel: "Back to homepage",
    hero: {
      kicker: "Suggested clothing",
      title: "If you want, carry the same message.",
      body:
        "These designs are suggestions for a shared look and a more visible message in the square.",
      downloadAll: "Download suggestions",
    },
    notice: {
      title: "Free to use",
      body:
        "You can use these for coordination, online sharing, or as an idea for personal printing. Professional-resolution print files will be added shortly.",
    },
    versions: {
      black: {
        title: "Black shirt",
        body:
          "The strongest march and camera version: flags on the front, DIASPORA on the back.",
      },
      white: {
        title: "White shirt",
        body:
          "The explanatory version: the shared message on the front, the reasons for marching on the back.",
      },
    },
    downloadLabel: "Download",
    previewAlt: (versionTitle, country) =>
      `${versionTitle} for ${country}, front and back preview`,
  },
};
