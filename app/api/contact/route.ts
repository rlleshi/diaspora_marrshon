import { NextResponse } from "next/server";
import { ZodError } from "zod";
import type { Locale } from "@/lib/content";
import { contactPageContent } from "@/lib/contact-content";
import { contactSubmissionSchema } from "@/lib/contact-schema";
import { createContactMessage } from "@/lib/contact-service";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getClientIp, isAllowedOrigin } from "@/lib/http";
import { RateLimitError } from "@/lib/rate-limit";
import { TurnstileError, verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const maxBodyBytes = 16_384;

export async function POST(request: Request) {
  let locale: Locale = "sq";

  try {
    if (!isAllowedOrigin(request)) {
      return errorResponse(403, formText(locale).genericError);
    }

    const rawBody = await request.text();
    if (rawBody.length > maxBodyBytes) {
      return errorResponse(413, formText(locale).genericError);
    }

    const json = JSON.parse(rawBody) as Record<string, unknown>;
    locale = json.sourceLanguage === "en" ? "en" : "sq";

    if (typeof json.company === "string" && json.company.trim()) {
      return NextResponse.json({ ok: true });
    }

    const submission = contactSubmissionSchema.parse(json);
    const clientIp = getClientIp(request);

    await verifyTurnstileToken({
      token: submission.turnstileToken,
      remoteIp: clientIp,
    });

    await createContactMessage({
      db: getAdminFirestore(),
      submission,
      clientIp,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const text = formText(locale);

    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      const flattened = error.flatten().fieldErrors as Record<string, string[] | undefined>;
      for (const [field, messages] of Object.entries(flattened)) {
        if (!messages?.length) continue;
        fieldErrors[field] = field === "email" ? text.invalidEmail : text.required;
      }
      return errorResponse(400, text.validationError, fieldErrors);
    }

    if (error instanceof TurnstileError) {
      return errorResponse(400, text.botError);
    }

    if (error instanceof RateLimitError) {
      return errorResponse(429, text.rateLimited);
    }

    console.error(error);
    return errorResponse(500, text.genericError);
  }
}

function formText(locale: Locale) {
  return contactPageContent[locale].form;
}

function errorResponse(
  status: number,
  message: string,
  fieldErrors?: Record<string, string>,
) {
  return NextResponse.json({ ok: false, message, fieldErrors }, { status });
}
