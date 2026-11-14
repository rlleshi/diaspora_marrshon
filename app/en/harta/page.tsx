import { MapPage } from "@/components/map-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/harta",
  title: "Map of the diaspora protests | Flamingo Revolution Diaspora",
  description:
    "The map of Flamingo Revolution protests in Albania and around the world: hundreds of protests by Albanians in dozens of cities abroad, from Vancouver to Melbourne.",
});

export default function EnglishPage() {
  return <MapPage locale="en" />;
}
