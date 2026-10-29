"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// homepage sections that now live on the march page, under the same ids
const MOVED_SECTION_IDS = ["context", "history", "marshimi"];

/** Sends old shared links like /#history on to the same section of the march page. */
export function MovedSectionRedirect({ marchHref }: { marchHref: string }) {
  const router = useRouter();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (MOVED_SECTION_IDS.includes(id)) {
      router.replace(`${marchHref}#${id}`);
    }
  }, [marchHref, router]);

  return null;
}
