import { pulseOgImage } from "@/components/participation/pulse-og";

export const alt =
  "Pulsi i protestës: një pikë për çdo natë proteste që nga 31 maji; sa më e madhe pika, aq më e madhe turma.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return pulseOgImage("sq");
}
