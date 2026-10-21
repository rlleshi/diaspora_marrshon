import type { Metadata } from "next";
import Link from "next/link";
import { Flag } from "lucide-react";
import "./globals.css";

// The site has two root layouts (app/(sq) and app/en), so an unknown URL has no
// layout to render inside; this page carries its own <html>.
export const metadata: Metadata = {
  title: "404 | Diaspora marshon",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="sq">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand">
              <Flag aria-hidden="true" size={22} />
              <span>Diaspora marshon</span>
            </Link>
          </header>
          <main className="section">
            <div className="section-inner">
              <h1>404</h1>
              <p>
                Kjo faqe nuk u gjet. <Link href="/">Kthehu te faqja kryesore</Link>
              </p>
              <p lang="en">
                This page could not be found. <Link href="/en">Back to the homepage</Link>
              </p>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
