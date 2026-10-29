import { MarchPage } from "@/components/march-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/marshimi",
  title: "The diaspora march in Tirana | Diaspora Marches",
  description:
    "Why the Albanian diaspora marches in Tirana, the protest's demands, the diaspora marches since 20 June 2026 and the next march.",
});

export default function EnglishPage() {
  return <MarchPage locale="en" />;
}
