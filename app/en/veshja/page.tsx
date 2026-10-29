import { ShirtsPage } from "@/components/shirts-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: "/veshja",
  title: "Shared clothing for the diaspora marches | Flamingo Revolution Diaspora",
  description:
    "The diaspora T-shirts for the marches in Tirana, for a shared look in the square.",
});

export default function Page() {
  return <ShirtsPage locale="en" />;
}
