import { LiveTrackerPage } from "@/components/live-tracker-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/pulsi",
  ownImage: true,
  feed: "/pulsi/feed.xml",
  title: "Revolucioni Flamingo ditë pas dite: pulsi i protestës në Tiranë | Flamingo Revolution Diaspora",
  description:
    "Protestat kundër qeverisë Rama në Tiranë që nga 31 maji 2026: 148 ditë në shesh, me indeksin e pjesëmarrjes, një shënim për çdo natë dhe momentet kyçe.",
});

export default function Page() {
  return <LiveTrackerPage locale="sq" />;
}
