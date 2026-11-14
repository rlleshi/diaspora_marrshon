import { ShirtsPage } from "@/components/shirts-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/veshja",
  title: "The diaspora shirts from the summer marches | Flamingo Revolution Diaspora",
  description:
    "The shirts the diaspora wore at the summer 2026 marches in Tirana, with the Albanian flag beside the flag of the country where we live: now part of the history.",
});

export default function Page() {
  return <ShirtsPage locale="en" />;
}
