import { Timestamp } from "firebase-admin/firestore";
import { getCollectionNames } from "@/lib/env";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { hashConfirmationToken } from "@/lib/security";

export type ConfirmEmailStatus =
  | "confirmed"
  | "already-used"
  | "expired"
  | "invalid"
  | "unavailable";

export async function confirmEmailToken(token: string): Promise<ConfirmEmailStatus> {
  if (!token || token.length > 256) {
    return "invalid";
  }

  try {
    const db = getAdminFirestore();
    const collections = getCollectionNames();
    const tokenHash = hashConfirmationToken(token);
    const confirmationRef = db
      .collection(collections.emailConfirmations)
      .doc(`token_${tokenHash.slice(0, 64)}`);
    let status: ConfirmEmailStatus = "invalid";

    await db.runTransaction(async (transaction) => {
      const confirmationSnapshot = await transaction.get(confirmationRef);

      if (!confirmationSnapshot.exists) {
        status = "invalid";
        return;
      }

      const confirmation = confirmationSnapshot.data();
      const usedAt = confirmation?.usedAt as Timestamp | null | undefined;
      const expiresAt = confirmation?.expiresAt as Timestamp | undefined;
      const pledgeId = confirmation?.pledgeId;

      if (usedAt) {
        status = "already-used";
        return;
      }

      if (!expiresAt || expiresAt.toMillis() < Date.now() || !pledgeId) {
        status = "expired";
        return;
      }

      const pledgeRef = db.collection(collections.pledges).doc(pledgeId);
      const pledgeSnapshot = await transaction.get(pledgeRef);

      if (!pledgeSnapshot.exists) {
        status = "invalid";
        return;
      }

      const now = Timestamp.now();
      transaction.update(pledgeRef, {
        emailStatus: "confirmed",
        emailConfirmedAt: now,
        updatedAt: now,
      });
      transaction.update(confirmationRef, {
        usedAt: now,
      });

      status = "confirmed";
    });

    return status;
  } catch (error) {
    console.error(error);
    return "unavailable";
  }
}
