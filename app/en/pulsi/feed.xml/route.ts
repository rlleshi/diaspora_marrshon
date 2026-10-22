import { pulsiFeed } from "@/lib/pulsi-feed";

/** Rebuilt with every deploy, which is when a new day lands. */
export const dynamic = "force-static";

export function GET() {
  return new Response(pulsiFeed("en"), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
