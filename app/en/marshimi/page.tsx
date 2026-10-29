import { MarchPage } from "@/components/march-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/marshimi",
  title: "The diaspora marches in Tirana | Flamingo Revolution Diaspora",
  description:
    "Why the Albanian diaspora marches in Tirana with the Flamingo Revolution, the protest's demands, every diaspora march since 20 June 2026 and the next one.",
});

export default function EnglishPage() {
  return <MarchPage locale="en" />;
}
