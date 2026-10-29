import { MarchPage } from "@/components/march-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/marshimi",
  title: "Marshimi i diasporës në Tiranë | Diaspora marshon",
  description:
    "Pse marshon diaspora shqiptare në Tiranë, kërkesat e protestës, marshimet e diasporës që nga 20 qershori 2026 dhe marshimi i radhës.",
});

export default function Page() {
  return <MarchPage locale="sq" />;
}
