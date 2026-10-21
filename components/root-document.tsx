import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FlamingoBot } from "@/components/flamingo-bot";
import { flamingoBotOrigin } from "@/lib/flamingo-bot-config";
import { DEFAULT_IMAGE, SITE_NAME, SITE_URL, siteJsonLd } from "@/lib/metadata";

type Locale = "sq" | "en";

// Fallbacks only: each page sets its own title, description and preview tags
// through pageMetadata() in lib/metadata.ts.
export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title:
      locale === "en"
        ? "Flamingo Revolution Diaspora: the diaspora marches in Tirana"
        : "Flamingo Revolution Diaspora: diaspora marshon në Tiranë",
    description:
      locale === "en"
        ? "The Albanian diaspora marches in Tirana for a new Albania."
        : "Diaspora shqiptare marshon në Tiranë për një Shqipëri të re.",
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_GB" : "sq_AL",
      images: [DEFAULT_IMAGE],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b91c1c",
};

/**
 * The <html> shell shared by the two root layouts: app/(sq) for the Albanian
 * pages and app/en for the English ones, so each sends its own lang attribute.
 */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd(locale)) }}
        />
        {children}
        <FlamingoBot botOrigin={flamingoBotOrigin()} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
