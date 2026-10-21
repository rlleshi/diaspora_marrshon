import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/",
  title: "Flamingo Revolution Diaspora: diaspora marshon në Tiranë | Revolucioni Flamingo, Shqipëri",
  description:
    "Diaspora shqiptare i bashkohet protestave kundër qeverisë në Tiranë, që nga 31 maji 2026. Ndiq pulsin e protestës natë pas nate, listën e skandaleve dhe marshimin e radhës.",
});

export default function Page() {
  return <HomePage locale="sq" />;
}
