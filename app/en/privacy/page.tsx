import { PrivacyPage } from "@/components/privacy-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/privacy",
  title: "Privacy | Flamingo Revolution Diaspora",
  description: "How we handle the data you give us through the site's forms.",
});

export default function Page() {
  return <PrivacyPage locale="en" />;
}
