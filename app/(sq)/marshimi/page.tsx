import { MarchPage } from "@/components/march-page";
import { SHOW_NEXT_MARCH } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/marshimi",
  title: "Marshimet e diasporës në Tiranë | Flamingo Revolution Diaspora",
  description: SHOW_NEXT_MARCH
    ? "Pse marshon diaspora shqiptare në Tiranë me Revolucionin Flamingo, kërkesat e protestës, marshimet që nga 20 qershori 2026 dhe marshimi i radhës."
    : "Pse marshon diaspora shqiptare në Tiranë me Revolucionin Flamingo, kërkesat e protestës dhe marshimet që nga 20 qershori 2026.",
});

export default function Page() {
  return <MarchPage locale="sq" />;
}
