import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/",
  title: "The diaspora marches in Tirana | Flamingo Revolution",
  description:
    "The Albanian diaspora marches in Tirana. Follow the protest pulse night by night, the scandal dossier and the next march.",
});

export default function EnglishPage() {
  return <HomePage locale="en" />;
}
