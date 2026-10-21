import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/",
  title: "Flamingo Revolution Diaspora: the diaspora marches in Tirana | Albania protests 2026",
  description:
    "The diaspora wing of Albania's Flamingo Revolution: the Albanian diaspora joins the anti-government protests in Tirana, daily since 31 May 2026. Follow the protest night by night, the scandal dossier and the next march.",
});

export default function EnglishPage() {
  return <HomePage locale="en" />;
}
