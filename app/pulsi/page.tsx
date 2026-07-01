import type { Metadata } from "next";
import { LiveTrackerPage } from "@/components/live-tracker-page";

export const metadata: Metadata = {
  title: "Pulsi i protestës | Diaspora marshon",
  description:
    "Indeksi i pjesëmarrjes në protestat e qershorit 2026: 31 ditë në shesh, ditë pas dite, me momentet kyçe.",
};

export default function Page() {
  return <LiveTrackerPage locale="sq" />;
}
