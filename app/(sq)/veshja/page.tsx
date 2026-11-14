import { ShirtsPage } from "@/components/shirts-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/veshja",
  title: "Bluzat e diasporës nga marshimet e verës | Flamingo Revolution Diaspora",
  description:
    "Bluzat që diaspora veshi në marshimet e verës 2026 në Tiranë, me flamurin shqiptar pranë flamurit të vendit ku jetojmë: tani pjesë e historisë.",
});

export default function Page() {
  return <ShirtsPage locale="sq" />;
}
