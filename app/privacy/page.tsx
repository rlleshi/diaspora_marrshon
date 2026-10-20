import { PrivacyPage } from "@/components/privacy-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/privacy",
  title: "Privatësia | Diaspora marshon",
  description: "Si i trajtojmë të dhënat që na jep përmes formularëve të faqes.",
});

export default function Page() {
  return <PrivacyPage locale="sq" />;
}
