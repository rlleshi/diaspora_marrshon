import { ShirtsPage } from "@/components/shirts-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/veshja",
  title: "Veshja e përbashkët e diasporës | Flamingo Revolution Diaspora",
  description:
    "Bluzat e diasporës për marshimet në Tiranë, për një pamje të përbashkët në shesh.",
});

export default function Page() {
  return <ShirtsPage locale="sq" />;
}
