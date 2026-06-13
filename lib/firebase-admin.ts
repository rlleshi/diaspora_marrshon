import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let firestore: Firestore | null = null;

export function getAdminFirestore() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    initializeApp({
      credential:
        clientEmail && privateKey
          ? cert({
              projectId,
              clientEmail,
              privateKey,
            })
          : applicationDefault(),
      projectId,
    });
  }

  if (!firestore) {
    firestore = getFirestore();
  }

  return firestore;
}
