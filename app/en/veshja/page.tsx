import type { Metadata } from "next";
import { ShirtsPage } from "@/components/shirts-page";

export const metadata: Metadata = {
  title: "Shared Clothing | Diaspora Marshes",
  description:
    "Preview assets for the diaspora shirts for the march in Tirana.",
};

export default function Page() {
  return <ShirtsPage locale="en" />;
}
