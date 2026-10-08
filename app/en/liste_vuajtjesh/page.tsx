import { ScandalsPage } from "@/components/scandals-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/liste_vuajtjesh",
  title: "The Scandal Dossier | Diaspora Marches",
  description:
    "33 Rama-government scandals (2013–2026), researched and checked against Albanian investigative journalism. Report text is Albanian-only for now.",
});

export default function Page() {
  return <ScandalsPage locale="en" />;
}
