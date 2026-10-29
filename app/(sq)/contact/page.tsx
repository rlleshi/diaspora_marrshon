import { ContactPage } from "@/components/contact-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/contact",
  title: "Kontakt | Flamingo Revolution Diaspora",
  description:
    "Dëshiron të ndihmosh Revolucionin Flamingo nga diaspora apo ke ndonjë pyetje? Na shkruaj.",
});

export default function Page() {
  return <ContactPage locale="sq" />;
}
