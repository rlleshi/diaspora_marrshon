import { z } from "zod";
import {
  joiningPointValues,
  participationTypeValues,
  sourceLanguageValues,
} from "@/lib/pledge-options";

const optionalText = (max: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed ? trimmed : undefined;
    },
    z.string().max(max).optional(),
  );

export const pledgeSubmissionSchema = z
  .object({
    firstName: z.string().trim().min(1).max(80),
    email: z.string().trim().email().max(254),
    country: z.string().trim().min(2).max(80),
    city: z.string().trim().min(1).max(100),
    joiningPoint: z.enum(joiningPointValues),
    participationType: z.enum(participationTypeValues),
    wantsWhatsAppFollowup: z.boolean(),
    whatsAppNumber: optionalText(40),
    wantsVolunteerFollowup: z.boolean(),
    volunteerInterest: optionalText(240),
    acceptedDataUse: z.literal(true),
    sourceLanguage: z.enum(sourceLanguageValues),
    sourcePage: optionalText(200),
    turnstileToken: optionalText(2048),
    company: optionalText(200),
  })
  .superRefine((value, context) => {
    if (value.wantsWhatsAppFollowup && !value.whatsAppNumber) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["whatsAppNumber"],
        message: "WhatsApp number is required when WhatsApp follow-up is selected.",
      });
    }
  });

export type PledgeSubmission = z.infer<typeof pledgeSubmissionSchema>;
