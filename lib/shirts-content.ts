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
    hero: {
      kicker: string;
      title: string;
      body: string;
      downloadAll: string;
    };
    /** says the shirts are history now, and where today's advice on what to wear lives */
    notice: {
      title: string;
      body: string;
      link: { label: string; href: string };
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
    hero: {
      kicker: "Nga marshimet e verës",
      title: "Bluzat e diasporës.",
      body:
        "Në marshimet e verës 2026, diaspora doli në shesh me bluza të përbashkëta: flamuri shqiptar pranë flamurit të vendit ku jetojmë. I bëmë si grup dhe njerëzit na i merrnin nga duart, na fotografonin dhe thoshin sa bukur dukej diaspora. Kjo u jepte zemër dhe ky ishte qëllimi.",
      downloadAll: "Shkarko modelet",
    },
    notice: {
      title: "Pjesë e historisë",
      body:
        "Modelet mbeten të lira për t'u shkarkuar dhe shpërndarë, por nuk janë më një sugjerim veshjeje.",
      link: {
        label: "Çfarë të veshësh e të marrësh me vete sot: udhëzuesi i sigurisë",
        href: "/siguria",
      },
    },
    versions: {
      black: {
        title: "Bluza e zezë",
        body:
          "Ajo që binte më shumë në sy në marshime dhe në kamera: përpara flamujt, nga pas DIASPORA.",
      },
      white: {
        title: "Bluza e bardhë",
        body:
          "Versioni shpjegues: përpara mesazhi i përbashkët, nga pas arsyet pse marshuam.",
      },
    },
    downloadLabel: "Shkarko",
    previewAlt: (versionTitle, country) =>
      `${versionTitle} për ${country}, pamje përpara dhe mbrapa`,
  },
  en: {
    langLabel: "English",
    altLangHref: "/veshja",
    hero: {
      kicker: "From the summer marches",
      title: "The diaspora shirts.",
      body:
        "At the summer 2026 marches the diaspora came to the square in shared shirts: the Albanian flag beside the flag of the country where we live. We made them as a group, and people took them out of our hands, photographed us and said how good the diaspora looked. It gave them heart, which was the point.",
      downloadAll: "Download the designs",
    },
    notice: {
      title: "Part of the history",
      body:
        "The designs stay free to download and share, but they are no longer a clothing suggestion.",
      link: {
        label: "What to wear and bring today: the safety guide",
        href: "/en/siguria",
      },
    },
    versions: {
      black: {
        title: "Black shirt",
        body:
          "The one that stood out most at the marches and on camera: flags on the front, DIASPORA on the back.",
      },
      white: {
        title: "White shirt",
        body:
          "The explanatory one: the shared message on the front, the reasons we marched on the back.",
      },
    },
    downloadLabel: "Download",
    previewAlt: (versionTitle, country) =>
      `${versionTitle} for ${country}, front and back preview`,
  },
};
