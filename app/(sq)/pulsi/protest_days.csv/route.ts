import { participation } from "@/data/participation";
import { pulsiCsv } from "@/lib/pulsi-csv";

/** The whole published series, for both languages; rebuilt with every deploy. */
export const dynamic = "force-static";

export function GET() {
  return new Response(pulsiCsv(participation), {
    headers: { "Content-Type": "text/csv; charset=utf-8" },
  });
}
