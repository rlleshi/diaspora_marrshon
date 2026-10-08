import { LiveTrackerPage } from "@/components/live-tracker-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/pulsi",
  ownImage: true,
  title: "Pulsi i protestës | Diaspora marshon",
  description:
    "Indeksi i pjesëmarrjes në protestat e qershorit 2026: 131 ditë në shesh, ditë pas dite, me momentet kyçe.",
});

export default function Page() {
  return <LiveTrackerPage locale="sq" />;
}
