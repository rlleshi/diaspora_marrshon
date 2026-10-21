import { ContactPage } from "@/components/contact-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/contact",
  title: "Kontakt | Diaspora marshon",
  description:
    "Dëshiron të ndihmosh Flamingo Revolution apo ke ndonjë pyetje rreth saj? Na shkruaj.",
});

export default function Page() {
  return <ContactPage locale="sq" />;
}
