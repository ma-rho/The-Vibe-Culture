// src/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

// Export specific services for use in Server Actions
export const firebaseAdminDb = admin.firestore();
export const firebaseAdminAuth = admin.auth();
export const firebaseAdminStorage = admin.storage();

export default admin;