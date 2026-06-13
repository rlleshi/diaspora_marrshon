import {
  Timestamp,
  type Firestore,
  type Transaction,
} from "firebase-admin/firestore";

export class RateLimitError extends Error {
  constructor() {
    super("Rate limit exceeded.");
    this.name = "RateLimitError";
  }
}

export async function checkRateLimit({
  db,
  collectionName,
  bucket,
  limit,
  windowMs,
  reason,
}: {
  db: Firestore;
  collectionName: string;
  bucket: string;
  limit: number;
  windowMs: number;
  reason: string;
}) {
  const ref = db.collection(collectionName).doc(bucket);
  const nowMs = Date.now();
  const resetAt = Timestamp.fromMillis(nowMs + windowMs);
  const now = Timestamp.fromMillis(nowMs);

  await db.runTransaction(async (transaction: Transaction) => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.data();
    const previousReset = data?.resetAt as Timestamp | undefined;
    const resetIsActive =
      typeof previousReset?.toMillis === "function" &&
      previousReset.toMillis() > nowMs;
    const previousCount =
      typeof data?.count === "number" && resetIsActive
        ? data.count
        : 0;
    const nextCount = previousCount + 1;

    if (nextCount > limit) {
      throw new RateLimitError();
    }

    transaction.set(
      ref,
      {
        bucket,
        reason,
        count: nextCount,
        limit,
        windowMs,
        resetAt,
        expiresAt: resetAt,
        updatedAt: now,
        createdAt: data?.createdAt ?? now,
      },
      { merge: true },
    );
  });
}
