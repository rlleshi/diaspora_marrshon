import { MarchPage } from "@/components/march-page";
import { SHOW_NEXT_MARCH } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/marshimi",
  title: "Historiku i diasporës në Revolucionin Flamingo | Flamingo Revolution Diaspora",
  description: SHOW_NEXT_MARCH
    ? "Çfarë ka bërë diaspora shqiptare për Revolucionin Flamingo: protestat jashtë Shqipërisë, autokolonat dhe marshimet në Tiranë që nga 20 qershori 2026, marshimi i radhës dhe kërkesat e protestës."
    : "Çfarë ka bërë diaspora shqiptare për Revolucionin Flamingo: protestat jashtë Shqipërisë, autokolonat dhe marshimet në Tiranë që nga 20 qershori 2026, ndihma për sheshin dhe kërkesat e protestës.",
});

export default function Page() {
  return <MarchPage locale="sq" />;
}
