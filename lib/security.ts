import { createHmac, randomBytes } from "crypto";
import { getRequiredSecret } from "@/lib/env";

function hmacHex(value: string, secretName: string) {
  return createHmac("sha256", getRequiredSecret(secretName))
    .update(value)
    .digest("hex");
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function createConfirmationToken() {
  return randomBytes(32).toString("base64url");
}

export function hashConfirmationToken(token: string) {
  return hmacHex(token, "EMAIL_CONFIRMATION_SECRET");
}

export function hashRateLimitIdentifier(value: string) {
  return hmacHex(value, "RATE_LIMIT_SALT");
}

export function pledgeDocIdForEmail(emailNormalized: string) {
  return `email_${hmacHex(emailNormalized, "RATE_LIMIT_SALT").slice(0, 48)}`;
}
