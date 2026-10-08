import { ShirtsPage } from "@/components/shirts-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/veshja",
  title: "Shared Clothing | Diaspora Marches",
  description:
    "Preview assets for the diaspora shirts for the march in Tirana.",
});

export default function Page() {
  return <ShirtsPage locale="en" />;
}
