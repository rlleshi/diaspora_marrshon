import type { MetadataRoute } from "next";
import { participation } from "@/data/participation";
import { SITE_URL } from "@/lib/metadata";

/** Albanian routes; each has an English twin under /en. */
const ROUTES = ["/", "/pulsi", "/siguria", "/liste_vuajtjesh", "/veshja", "/contact", "/privacy"];

const PRIORITY: Record<string, number> = { "/": 1, "/pulsi": 0.9, "/siguria": 0.8, "/liste_vuajtjesh": 0.7 };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastDay = new Date(`${participation[participation.length - 1].date}T23:59:00Z`);
  return ROUTES.flatMap((path) => {
    const sq = `${SITE_URL}${path === "/" ? "" : path}`;
    const en = `${SITE_URL}${path === "/" ? "/en" : `/en${path}`}`;
    const languages = { sq, en, "x-default": sq };
    const live = path === "/" || path === "/pulsi";
    const entry = {
      ...(live && { lastModified: lastDay }),
      changeFrequency: live ? ("daily" as const) : ("weekly" as const),
      priority: PRIORITY[path] ?? 0.5,
      alternates: { languages },
    };
    return [
      { url: sq, ...entry },
      { url: en, ...entry },
    ];
  });
}
