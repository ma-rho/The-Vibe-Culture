// src/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

// Deployment Check: Ensure the private key is properly formatted
// Some hosting providers (like Vercel) may wrap the key in quotes or escape it differently
const formatPrivateKey = (key: string | undefined) => {
  if (!key) return undefined;
  return key.replace(/\\n/g, '\n');
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
      }),
      // Database URL is required for the Realtime Database, but optional for Firestore
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      // Default Bucket name is required for Firebase Storage
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    });
    console.log('Firebase Admin Initialized Successfully');
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
  }
}

// Export specific services for use in Server Actions
// These instances are reused across the application after initialization.
export const firebaseAdminDb = admin.firestore();
export const firebaseAdminAuth = admin.auth();
export const firebaseAdminStorage = admin.storage();

export default admin;