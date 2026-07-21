import type { Metadata } from "next";
import { ScandalsPage } from "@/components/scandals-page";

export const metadata: Metadata = {
  title: "The Scandal Dossier | Diaspora Marshes",
  description:
    "33 Rama-government scandals (2013–2026), researched and checked against Albanian investigative journalism. Report text is Albanian-only for now.",
};

export default function Page() {
  return <ScandalsPage locale="en" />;
}
