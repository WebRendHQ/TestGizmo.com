import { getApps, initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export function getAdminApp() {
  if (!getApps().length) {
    initializeApp({
      credential: process.env.FIREBASE_SERVICE_ACCOUNT ? cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) : applicationDefault(),
    });
  }
  return getApps()[0]!;
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}


