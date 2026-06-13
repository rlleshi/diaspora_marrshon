import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diaspora marshon ne Tirane",
  description:
    "Pledge site for a peaceful Albanian diaspora march for Albania.",
  metadataBase: new URL("https://diaspora-zbarkon.org"),
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
        <Analytics />
      </body>
    </html>
  );
}
