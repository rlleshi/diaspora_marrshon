import { ShirtsPage } from "@/components/shirts-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/veshja",
  title: "Veshja e përbashkët | Diaspora marshon",
  description:
    "Pamje paraprake të bluzave të diasporës për marshimin në Tiranë.",
});

export default function Page() {
  return <ShirtsPage locale="sq" />;
}
