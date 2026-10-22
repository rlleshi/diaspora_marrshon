import { MethodologyPage } from "@/components/methodology-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/pulsi/metodologjia",
  title: "How Pulsi counts the protests | Flamingo Revolution Diaspora",
  description:
    "The method behind the daily participation index for the Tirana protests: the source, the crowd-counting model, the visual check, the normalization, the limits and the open data.",
});

export default function Page() {
  return <MethodologyPage locale="en" />;
}
