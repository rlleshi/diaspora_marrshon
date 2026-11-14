import { MarchPage } from "@/components/march-page";
import { SHOW_NEXT_MARCH } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/marshimi",
  title: "The diaspora's history in the Flamingo Revolution | Flamingo Revolution Diaspora",
  description: SHOW_NEXT_MARCH
    ? "What the Albanian diaspora has done for the Flamingo Revolution: the protests outside Albania, the convoys and marches in Tirana since 20 June 2026, the next march and the protest's demands."
    : "What the Albanian diaspora has done for the Flamingo Revolution: the protests outside Albania, the convoys and marches in Tirana since 20 June 2026, the help for the square and the protest's demands.",
});

export default function EnglishPage() {
  return <MarchPage locale="en" />;
}
