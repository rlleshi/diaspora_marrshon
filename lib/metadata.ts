import type { Metadata } from "next";

/** The live domain; link previews and language alternates resolve against it. */
export const SITE_URL = "https://www.diaspora-zbarkon.com";

export const SITE_NAME = "Diaspora marshon";

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
