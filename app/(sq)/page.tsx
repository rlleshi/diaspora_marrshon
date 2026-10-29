import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/",
  title: "Flamingo Revolution Diaspora: Revolucioni Flamingo i diasporës shqiptare",
  description:
    "Krahu i diasporës i Revolucionit Flamingo: shqiptarët jashtë vendit në protestat kundër qeverisë në Tiranë që nga 31 maji 2026. Pulsi i protestës, marshimet, skandalet dhe siguria.",
});

export default function Page() {
  return <HomePage locale="sq" />;
}
