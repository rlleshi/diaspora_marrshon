import { MethodologyPage } from "@/components/methodology-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/pulsi/metodologjia",
  title: "Si i numëron Pulsi protestat | Flamingo Revolution Diaspora",
  description:
    "Metodologjia e indeksit ditor të pjesëmarrjes në protestat e Tiranës: burimi, modeli i numërimit të turmës, kontrolli me sy, normalizimi, kufizimet dhe të dhënat e hapura.",
});

export default function Page() {
  return <MethodologyPage locale="sq" />;
}
