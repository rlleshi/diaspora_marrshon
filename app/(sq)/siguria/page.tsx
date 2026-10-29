import { SafetyPage } from "@/components/safety-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/siguria",
  title: "Siguria në protestë dhe të drejtat e tua | Flamingo Revolution Diaspora",
  description:
    "Udhëzues praktik për protestën: çfarë të bësh nëse të ndalojnë, nga gazi lotsjellës dhe lëndimet, ndihma juridike falas dhe urgjenca 127.",
});

export default function Page() {
  return <SafetyPage locale="sq" />;
}
