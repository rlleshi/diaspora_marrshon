import { isProduction } from "@/lib/env";

export class TurnstileError extends Error {
  constructor() {
    super("Turnstile verification failed.");
    this.name = "TurnstileError";
  }
}

export async function verifyTurnstileToken({
  token,
  remoteIp,
}: {
  token?: string;
  remoteIp: string;
}) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (isProduction()) {
      throw new TurnstileError();
    }

    console.warn("TURNSTILE_SECRET_KEY is not set; skipping Turnstile in dev.");
    return;
  }

  if (!token) {
    throw new TurnstileError();
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: remoteIp,
  });

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    },
  );

  if (!response.ok) {
    throw new TurnstileError();
  }

  const result = (await response.json()) as { success?: boolean };

  if (!result.success) {
    throw new TurnstileError();
  }
}
