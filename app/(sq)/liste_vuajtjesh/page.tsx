import { ScandalsPage } from "@/components/scandals-page";
import { scandals } from "@/data/scandals";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/liste_vuajtjesh",
  title: "Lista e vuajtjeve: skandalet e qeverisë Rama | Flamingo Revolution Diaspora",
  description:
    `${scandals.length} skandale të qeverisjes Rama (2013–2026), kërkuar dhe verifikuar kundrejt gazetarisë investigative shqiptare.`,
});

export default function Page() {
  return <ScandalsPage locale="sq" />;
}
