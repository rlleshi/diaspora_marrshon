import type { Metadata } from "next";
import { ScandalsPage } from "@/components/scandals-page";

export const metadata: Metadata = {
  title: "Lista e vuajtjeve | Diaspora marshon",
  description:
    "33 skandale të qeverisjes Rama (2013–2026), kërkuar dhe verifikuar kundrejt gazetarisë investigative shqiptare.",
};

export default function Page() {
  return <ScandalsPage locale="sq" />;
}
