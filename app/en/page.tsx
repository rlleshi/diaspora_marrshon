import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/",
  title: "Flamingo Revolution Diaspora: Albanians abroad in the Tirana protests",
  description:
    "The diaspora wing of Albania's Flamingo Revolution: Albanians abroad joining the anti-government protests in Tirana since 31 May 2026. Protest pulse, marches, scandals and safety.",
});

export default function EnglishPage() {
  return <HomePage locale="en" />;
}
