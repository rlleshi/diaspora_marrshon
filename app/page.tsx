import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/",
  title: "Diaspora marshon në Tiranë | Flamingo Revolution",
  description:
    "Diaspora shqiptare marshon në Tiranë. Ndiq pulsin e protestës natë pas nate, listën e skandaleve dhe marshimin e radhës.",
});

export default function Page() {
  return <HomePage locale="sq" />;
}
