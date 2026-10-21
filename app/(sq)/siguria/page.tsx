import { SafetyPage } from "@/components/safety-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/siguria",
  title: "Siguria & të drejtat e tua | Diaspora marshon",
  description:
    "Udhëzues praktik për protestën: çfarë të bësh nëse të ndalojnë, nga gazi lotsjellës dhe lëndimet, ndihma juridike falas dhe urgjenca 127.",
});

export default function Page() {
  return <SafetyPage locale="sq" />;
}
