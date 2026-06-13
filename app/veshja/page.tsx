import type { Metadata } from "next";
import { ShirtsPage } from "@/components/shirts-page";

export const metadata: Metadata = {
  title: "Veshja e përbashkët | Diaspora marshon",
  description:
    "Pamje paraprake të bluzave të diasporës për marshimin në Tiranë.",
};

export default function Page() {
  return <ShirtsPage locale="sq" />;
}
