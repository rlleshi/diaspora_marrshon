import type { Metadata } from "next";
import { LiveTrackerPage } from "@/components/live-tracker-page";

export const metadata: Metadata = {
  title: "Protest pulse | Diaspora marshes",
  description:
    "The June 2026 protest participation index: 47 days in the square, day by day, with the key moments.",
};

export default function Page() {
  return <LiveTrackerPage locale="en" />;
}
