import { Timestamp, type Firestore } from "firebase-admin/firestore";
import {
  consentText,
  currentConsentVersion,
  getCollectionNames,
} from "@/lib/env";
import type { PledgeSubmission } from "@/lib/pledge-schema";
import { sendConfirmationEmail } from "@/lib/email";
import {
  createConfirmationToken,
  hashConfirmationToken,
  hashRateLimitIdentifier,
  normalizeEmail,
  pledgeDocIdForEmail,
} from "@/lib/security";
import { checkRateLimit } from "@/lib/rate-limit";

const oneHourMs = 60 * 60 * 1000;
const oneDayMs = 24 * oneHourMs;
const confirmationExpiryMs = 48 * oneHourMs;

export async function createPledge({
  db,
  submission,
  clientIp,
}: {
  db: Firestore;
  submission: PledgeSubmission;
  clientIp: string;
}) {
  const collections = getCollectionNames();
  const emailNormalized = normalizeEmail(submission.email);
  const ipHash = hashRateLimitIdentifier(clientIp);
  const emailHash = hashRateLimitIdentifier(emailNormalized);

  await checkRateLimit({
    db,
    collectionName: collections.rateLimitEvents,
    bucket: `ip_${ipHash}`,
    limit: 10,
    windowMs: oneHourMs,
    reason: "pledge_ip",
  });

  await checkRateLimit({
    db,
    collectionName: collections.rateLimitEvents,
    bucket: `email_${emailHash}`,
    limit: 3,
    windowMs: oneDayMs,
    reason: "pledge_email",
  });

  const pledgeId = pledgeDocIdForEmail(emailNormalized);
  const pledgeRef = db.collection(collections.pledges).doc(pledgeId);
  const existingPledge = await pledgeRef.get();

  if (existingPledge.data()?.emailStatus === "confirmed") {
    return;
  }

  const now = Timestamp.now();
  const token = createConfirmationToken();
  const tokenHash = hashConfirmationToken(token);
  const confirmationRef = db
    .collection(collections.emailConfirmations)
    .doc(`token_${tokenHash.slice(0, 64)}`);
  const expiresAt = Timestamp.fromMillis(Date.now() + confirmationExpiryMs);

  const batch = db.batch();
  batch.set(
    pledgeRef,
    {
      firstName: submission.firstName,
      email: submission.email,
      emailNormalized,
      country: submission.country,
      city: submission.city,
      joiningPoint: submission.joiningPoint,
      routeChoice: submission.joiningPoint,
      participationType: submission.participationType,
      wantsWhatsAppFollowup: submission.wantsWhatsAppFollowup,
      ...(submission.whatsAppNumber
        ? { whatsAppNumber: submission.whatsAppNumber }
        : { whatsAppNumber: null }),
      wantsVolunteerFollowup: submission.wantsVolunteerFollowup,
      ...(submission.volunteerInterest
        ? { volunteerInterest: submission.volunteerInterest }
        : { volunteerInterest: null }),
      acceptedDataUse: true,
      consentVersion: currentConsentVersion,
      consentedAt: now,
      emailStatus: "pending",
      reviewStatus: "unreviewed",
      coordinationStatus: "none",
      sourceLanguage: submission.sourceLanguage,
      sourcePage: submission.sourcePage ?? null,
      createdAt: existingPledge.data()?.createdAt ?? now,
      updatedAt: now,
    },
    { merge: true },
  );

  batch.set(confirmationRef, {
    pledgeId,
    emailNormalized,
    tokenHash,
    expiresAt,
    usedAt: null,
    createdAt: now,
  });

  batch.set(
    db.collection(collections.consentVersions).doc(currentConsentVersion),
    {
      version: currentConsentVersion,
      text: consentText,
      createdAt: now,
      updatedAt: now,
    },
    { merge: true },
  );

  await batch.commit();

  await sendConfirmationEmail({
    to: submission.email,
    firstName: submission.firstName,
    token,
    locale: submission.sourceLanguage,
  });
}
