import { MapPage } from "@/components/map-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  locale: "sq",
  path: "/harta",
  title: "Harta e protestave të diasporës | Flamingo Revolution Diaspora",
  description:
    "Harta e protestave të Revolucionit Flamingo në Shqipëri dhe në botë: qindra protesta të shqiptarëve në dhjetëra qytete jashtë vendit, nga Vankuveri te Melburni.",
});

export default function Page() {
  return <MapPage locale="sq" />;
}
