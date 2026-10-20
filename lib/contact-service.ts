import { Timestamp, type Firestore } from "firebase-admin/firestore";
import type { ContactSubmission } from "@/lib/contact-schema";
import { sendContactNotification } from "@/lib/email";
import { getCollectionNames, getContactInbox } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";
import { hashRateLimitIdentifier, normalizeEmail } from "@/lib/security";

const oneHourMs = 60 * 60 * 1000;
const oneDayMs = 24 * oneHourMs;

export async function createContactMessage({
  db,
  submission,
  clientIp,
}: {
  db: Firestore;
  submission: ContactSubmission;
  clientIp: string;
}) {
  const collections = getCollectionNames();
  const emailNormalized = normalizeEmail(submission.email);

  await checkRateLimit({
    db,
    collectionName: collections.rateLimitEvents,
    bucket: `contact_ip_${hashRateLimitIdentifier(clientIp)}`,
    limit: 5,
    windowMs: oneHourMs,
    reason: "contact_ip",
  });

  await checkRateLimit({
    db,
    collectionName: collections.rateLimitEvents,
    bucket: `contact_email_${hashRateLimitIdentifier(emailNormalized)}`,
    limit: 5,
    windowMs: oneDayMs,
    reason: "contact_email",
  });

  const ref = db.collection(collections.contactMessages).doc();
  await ref.set({
    name: submission.name,
    email: submission.email,
    emailNormalized,
    organisation: submission.organisation ?? null,
    message: submission.message,
    sourceLanguage: submission.sourceLanguage,
    sourcePage: submission.sourcePage ?? null,
    status: "new",
    notified: false,
    createdAt: Timestamp.now(),
  });

  // The message is already safe in Firestore, so a failed forward is logged, not surfaced.
  const inbox = getContactInbox();
  if (!inbox) return;

  try {
    await sendContactNotification({
      to: inbox,
      name: submission.name,
      email: submission.email,
      organisation: submission.organisation,
      message: submission.message,
      locale: submission.sourceLanguage,
    });
    await ref.update({ notified: true });
  } catch (error) {
    console.error("Contact notification failed", error);
  }
}
