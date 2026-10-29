import { ScandalsPage } from "@/components/scandals-page";
import { scandals } from "@/data/scandals";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/liste_vuajtjesh",
  title: "Rama government scandals 2013–2026: the dossier | Flamingo Revolution Diaspora",
  description:
    `${scandals.length} Rama-government scandals (2013–2026), researched and checked against Albanian investigative journalism. Report text is Albanian-only for now.`,
});

export default function Page() {
  return <ScandalsPage locale="en" />;
}
