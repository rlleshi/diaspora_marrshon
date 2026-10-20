import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/content";
import { contactFooterLabel } from "@/lib/contact-content";
import { privacyFooterLabel } from "@/lib/privacy-content";

/** The dark band at the bottom of every page: an optional note, then the contact and privacy links. */
export function SiteFooter({ locale, note }: { locale: Locale; note?: string }) {
  const contact = contactFooterLabel[locale];
  const privacy = privacyFooterLabel[locale];

  return (
    <footer className="site-footer">
      {note ? <p>{note}</p> : null}
      <div className="site-footer-links">
        <Link className="site-footer-link" href={contact.href}>
          <Mail aria-hidden="true" size={16} />
          {contact.label}
        </Link>
        <Link className="site-footer-link" href={privacy.href}>
          <ShieldCheck aria-hidden="true" size={16} />
          {privacy.label}
        </Link>
      </div>
    </footer>
  );
}
