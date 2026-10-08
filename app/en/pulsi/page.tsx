import { LiveTrackerPage } from "@/components/live-tracker-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/pulsi",
  ownImage: true,
  title: "Protest pulse | Diaspora marches",
  description:
    "The June 2026 protest participation index: 131 days in the square, day by day, with the key moments.",
});

export default function Page() {
  return <LiveTrackerPage locale="en" />;
}
