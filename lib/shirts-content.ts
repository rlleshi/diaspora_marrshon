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
      kicker: "Veshja e përbashkët",
      title: "Një pamje, një mesazh.",
      body:
        "Për marshimin, diaspora duhet të duket e bashkuar: flamuri i vendit ku jetojmë pranë flamurit shqiptar, pa logo partie dhe pa simbole të tjera.",
      downloadAll: "Shkarko të gjitha",
    },
    notice: {
      title: "Shënim për shkarkimin",
      body:
        "Këto pamje mund të përdoren për koordinim dhe shpërndarje online. Skedarët me rezolucion profesional për printim do të shtohen së shpejti.",
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
      kicker: "Shared clothing",
      title: "One look, one message.",
      body:
        "For the march, the diaspora should look united: the flag of the country where we live next to the Albanian flag, with no party logos and no extra symbols.",
      downloadAll: "Download all",
    },
    notice: {
      title: "Download note",
      body:
        "These previews can be used for coordination and online sharing. Professional-resolution print files will be added shortly.",
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
