import { z } from "zod";
import { sourceLanguageValues } from "@/lib/pledge-options";

const optionalText = (max: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed ? trimmed : undefined;
    },
    z.string().max(max).optional(),
  );

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  organisation: optionalText(160),
  message: z.string().trim().min(1).max(5000),
  sourceLanguage: z.enum(sourceLanguageValues),
  sourcePage: optionalText(200),
  turnstileToken: optionalText(2048),
  company: optionalText(200),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
