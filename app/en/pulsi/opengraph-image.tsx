import { pulseOgImage } from "@/components/participation/pulse-og";

export const alt =
  "Protest pulse: one dot for every night of protest since 31 May; the bigger the dot, the bigger the crowd.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return pulseOgImage("en");
}
