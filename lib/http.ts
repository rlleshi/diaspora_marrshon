import { getAllowedOrigins, isProduction } from "@/lib/env";
import { SITE_URL } from "@/lib/metadata";

/** The live site always accepts its own forms, with or without www, whatever the env lists. */
const siteOrigins = [SITE_URL, SITE_URL.replace("://www.", "://")];

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();

  return (
    firstForwarded ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = getAllowedOrigins();

  if (!origin) {
    return !isProduction();
  }

  if (siteOrigins.includes(origin)) {
    return true;
  }

  if (allowedOrigins.length === 0) {
    return !isProduction();
  }

  return allowedOrigins.includes(origin);
}
