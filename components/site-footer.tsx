import Link from "next/link";
import { Mail } from "lucide-react";
import type { Locale } from "@/lib/content";
import { contactFooterLabel } from "@/lib/contact-content";

/** The dark band at the bottom of every page: an optional note and the contact link. */
export function SiteFooter({ locale, note }: { locale: Locale; note?: string }) {
  const contact = contactFooterLabel[locale];

  return (
    <footer className="site-footer">
      {note ? <p>{note}</p> : null}
      <Link className="site-footer-link" href={contact.href}>
        <Mail aria-hidden="true" size={16} />
        {contact.label}
      </Link>
    </footer>
  );
}
