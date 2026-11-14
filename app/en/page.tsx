import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/",
  title: "Flamingo Revolution Diaspora: Albanians abroad in the Tirana protests",
  description:
    "The diaspora wing of Albania's Flamingo Revolution: Albanians abroad in the anti-government protests since 31 May 2026, in Tirana and in hundreds of protests around the world. Protest pulse, map, history, scandals and safety.",
});

export default function EnglishPage() {
  return <HomePage locale="en" />;
}
