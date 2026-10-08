import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FlamingoBot } from "@/components/flamingo-bot";
import { flamingoBotOrigin } from "@/lib/flamingo-bot-config";
import { DEFAULT_IMAGE, SITE_NAME, SITE_URL } from "@/lib/metadata";
import "./globals.css";

// Fallbacks only: each page sets its own title, description and preview tags
// through pageMetadata() in lib/metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Diaspora marshon në Tiranë",
  description: "Diaspora shqiptare marshon në Tiranë për një Shqipëri të re.",
  openGraph: { type: "website", siteName: SITE_NAME, locale: "sq_AL", images: [DEFAULT_IMAGE] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b91c1c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq">
      <body>
        {children}
        <FlamingoBot botOrigin={flamingoBotOrigin()} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
