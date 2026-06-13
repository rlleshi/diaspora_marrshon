import type { Locale } from "@/lib/content";

export const currentConsentVersion = "2026-06-12-v1";

export const consentText: Record<Locale, string> = {
  sq: "Pajtohem që të dhënat e mia të përdoren nga organizatorët e besuar për konfirmim, koordinim privat dhe njoftime rreth marshimit.",
  en: "I agree that trusted organizers may use my data for confirmation, private coordination, and march-related updates.",
};

export function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function getCollectionNames() {
  return {
    pledges: process.env.FIREBASE_PLEDGES_COLLECTION ?? "pledges",
    emailConfirmations:
      process.env.FIREBASE_EMAIL_CONFIRMATIONS_COLLECTION ??
      "email_confirmations",
    consentVersions:
      process.env.FIREBASE_CONSENT_VERSIONS_COLLECTION ?? "consent_versions",
    rateLimitEvents:
      process.env.FIREBASE_RATE_LIMIT_COLLECTION ?? "rate_limit_events",
  };
}

export function getAllowedOrigins() {
  return (process.env.ALLOWED_FORM_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function getAppBaseUrl() {
  return process.env.APP_BASE_URL ?? "http://localhost:3000";
}

export function getRequiredSecret(name: string) {
  const value = process.env[name];

  if (!value || value.startsWith("replace-with")) {
    if (isProduction()) {
      throw new Error(`${name} must be configured in production.`);
    }

    return value || `development-only-${name.toLowerCase()}`;
  }

  return value;
}
