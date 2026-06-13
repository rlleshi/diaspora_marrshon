import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { content, type Locale } from "@/lib/content";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getClientIp, isAllowedOrigin } from "@/lib/http";
import { createPledge } from "@/lib/pledge-service";
import { pledgeSubmissionSchema } from "@/lib/pledge-schema";
import { RateLimitError } from "@/lib/rate-limit";
import { TurnstileError, verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const maxBodyBytes = 16_384;

export async function POST(request: Request) {
  let locale: Locale = "sq";

  try {
    if (!isAllowedOrigin(request)) {
      return errorResponse(locale, 403, content[locale].form.genericError);
    }

    const rawBody = await request.text();
    if (rawBody.length > maxBodyBytes) {
      return errorResponse(locale, 413, content[locale].form.genericError);
    }

    const json = JSON.parse(rawBody) as Record<string, unknown>;
    locale = json.sourceLanguage === "en" ? "en" : "sq";

    if (typeof json.company === "string" && json.company.trim()) {
      return successResponse();
    }

    const submission = pledgeSubmissionSchema.parse(json);
    const clientIp = getClientIp(request);

    await verifyTurnstileToken({
      token: submission.turnstileToken,
      remoteIp: clientIp,
    });

    const db = getAdminFirestore();
    await createPledge({
      db,
      submission,
      clientIp,
    });

    return successResponse();
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        locale,
        400,
        content[locale].form.validationError,
        zodFieldErrors(error, locale),
      );
    }

    if (error instanceof TurnstileError) {
      return errorResponse(locale, 400, content[locale].form.botError);
    }

    if (error instanceof RateLimitError) {
      return errorResponse(locale, 429, content[locale].form.genericError);
    }

    console.error(error);
    return errorResponse(locale, 500, content[locale].form.genericError);
  }
}

function successResponse() {
  return NextResponse.json({ ok: true });
}

function errorResponse(
  locale: Locale,
  status: number,
  message: string,
  fieldErrors?: Record<string, string>,
) {
  return NextResponse.json(
    {
      ok: false,
      message,
      fieldErrors,
    },
    { status },
  );
}

function zodFieldErrors(error: ZodError, locale: Locale) {
  const formText = content[locale].form;
  const flattened = error.flatten();
  const flattenedFieldErrors = flattened.fieldErrors as Record<
    string,
    string[] | undefined
  >;
  const fieldErrors: Record<string, string> = {};

  for (const [field, messages] of Object.entries(flattenedFieldErrors)) {
    if (!messages?.length) continue;
    fieldErrors[field] =
      field === "email" ? formText.invalidEmail : formText.required;
  }

  return fieldErrors;
}
