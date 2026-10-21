import type { Metadata } from "next";

/** The live domain; link previews and language alternates resolve against it. */
export const SITE_URL = "https://www.diaspora-zbarkon.com";

export const SITE_NAME = "Flamingo Revolution Diaspora";

/** Preview image for pages that don't draw one of their own. */
export const DEFAULT_IMAGE = {
  url: "/diaspora-march-hero.jpeg",
  width: 1280,
  height: 853,
};

type Locale = "sq" | "en";

/**
 * Title, description, language alternates and link-preview tags for one page.
 * `path` is the Albanian route ("/" or "/pulsi"); its English twin lives under /en.
 * A page that ships its own opengraph-image file passes `ownImage`, so that image
 * is the one that shows up when the link is shared.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  ownImage = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ownImage?: boolean;
}): Metadata {
  const sq = path;
  const en = path === "/" ? "/en" : `/en${path}`;
  const url = locale === "en" ? en : sq;
  const images = ownImage ? undefined : [DEFAULT_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: url, languages: { sq, en, "x-default": sq } },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_GB" : "sq_AL",
      url,
      title,
      description,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images && { images: images.map((image) => image.url) }),
    },
  };
}

/** Names people search for the movement by, in both languages. */
const MOVEMENT_NAMES = [
  "Diaspora marshon",
  "Diaspora zbarkon",
  "Flamingo Revolution Albania",
  "Flamingo Revolution",
  "Revolucioni Flamingo",
  "Diaspora Marches",
  "Albania protests 2026",
  "Protestat në Shqipëri 2026",
];

/** schema.org WebSite + Organization, so search engines tie the movement's names to this domain. */
export function siteJsonLd(locale: Locale) {
  const home = locale === "en" ? `${SITE_URL}/en` : SITE_URL;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: home,
        name: SITE_NAME,
        alternateName: MOVEMENT_NAMES,
        inLanguage: ["sq", "en"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: MOVEMENT_NAMES,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        // The movement's own site; ties this diaspora wing to the Flamingo Revolution.
        parentOrganization: {
          "@type": "Organization",
          "@id": "https://www.flamingorevolution.eu/#organization",
          name: "Flamingo Revolution",
          alternateName: "Revolucioni Flamingo",
          url: "https://www.flamingorevolution.eu/",
        },
        description:
          locale === "en"
            ? "The diaspora wing of the Flamingo Revolution: a civic initiative joining the daily anti-government protests in Tirana, Albania, that began on 31 May 2026."
            : "Krahu i diasporës i Revolucionit Flamingo: nismë qytetare që i bashkohet protestave të përditshme kundër qeverisë në Tiranë, të nisura më 31 maj 2026.",
      },
    ],
  };
}

/**
 * schema.org Dataset for the Pulsi index, which makes it eligible for Google
 * Dataset Search. `days`/`first`/`last` come from the participation data.
 */
export function pulsiDatasetJsonLd(locale: Locale, days: number, first: string, last: string) {
  const en = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: en
      ? "Albania protests 2026: daily crowd participation index (Tirana)"
      : "Protestat në Shqipëri 2026: indeksi ditor i pjesëmarrjes (Tiranë)",
    description: en
      ? `A day-by-day participation index for the anti-government protests in Tirana, Albania (the Flamingo Revolution), covering ${days} consecutive nights from ${first} to ${last}. Each night is estimated by a crowd-counting model from News24 livestreams, normalized so 100 = the largest day (20 June 2026), with a short note on what happened.`
      : `Indeksi ditor i pjesëmarrjes në protestat kundër qeverisë në Tiranë (Revolucioni Flamingo), për ${days} netë radhazi nga ${first} deri më ${last}. Çdo natë vlerësohet me një model numërimi turme nga transmetimet live të News24, i normalizuar me 100 = dita më e madhe (20 qershor 2026), me një shënim të shkurtër për ç'ndodhi.`,
    url: `${SITE_URL}${en ? "/en/pulsi" : "/pulsi"}`,
    inLanguage: locale,
    keywords: en
      ? ["Albania protests", "Tirana protest", "Flamingo Revolution", "Edi Rama", "crowd estimate", "protest participation"]
      : ["protesta Tiranë", "protestat në Shqipëri", "Revolucioni Flamingo", "Edi Rama", "pjesëmarrja në protesta"],
    temporalCoverage: `${first}/${last}`,
    spatialCoverage: { "@type": "Place", name: "Tirana, Albania" },
    isAccessibleForFree: true,
    creator: { "@id": `${SITE_URL}/#organization` },
    variableMeasured: en
      ? ["Daily peak crowd index", "Daily mean crowd index", "Daily median crowd index"]
      : ["Piku ditor i indeksit të turmës", "Mesatarja ditore", "Mediana ditore"],
  };
}
