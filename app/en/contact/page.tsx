import { ContactPage } from "@/components/contact-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/contact",
  title: "Contact | Flamingo Revolution Diaspora",
  description:
    "Want to help the Flamingo Revolution from abroad, or have a question about it? Write to us.",
});

export default function Page() {
  return <ContactPage locale="en" />;
}
