import { SafetyPage } from "@/components/safety-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/siguria",
  title: "Protest safety in Albania: your rights if detained | Diaspora Marches",
  description:
    "A practical protest guide: what to do if you are detained, exposed to tear gas or hurt, free legal aid and the 127 emergency line.",
});

export default function Page() {
  return <SafetyPage locale="en" />;
}
