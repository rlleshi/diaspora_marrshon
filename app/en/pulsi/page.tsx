import { LiveTrackerPage } from "@/components/live-tracker-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/pulsi",
  ownImage: true,
  feed: "/en/pulsi/feed.xml",
  title: "Flamingo Revolution, Albania: day-by-day protest crowd tracker | Flamingo Revolution Diaspora",
  description:
    "The anti-government protests in Tirana, Albania, demanding Rama's resignation since 31 May 2026: 146 days in the square, with a crowd index, a note for every night and the key moments.",
});

export default function Page() {
  return <LiveTrackerPage locale="en" />;
}
