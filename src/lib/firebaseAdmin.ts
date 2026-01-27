import * as admin from 'firebase-admin';

const formatPrivateKey = (key: string | undefined) => {
  if (!key) return undefined;
  // This handles both the escaped newlines and potential quotes from env files
  return key.replace(/\\n/g, '\n').replace(/"/g, '');
};

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
};

// Guard clause: Ensure we have the required strings before initializing
const isServiceAccountComplete = 
  serviceAccount.projectId && 
  serviceAccount.clientEmail && 
  serviceAccount.privateKey;

if (!admin.apps.length) {
  if (isServiceAccountComplete) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
      });
    } catch (error) {
      console.error('Firebase Admin Initialization Error:', error);
    }
  } else {
    // During build time for static pages, env vars might be missing. 
    // This prevents the build from crashing hard.
    console.warn('Firebase Admin: Skipping initialization due to missing environment variables.');
  }
}

// Export specific services
// Note: We use a getter pattern or optional chaining to prevent crashes 
// if services are called during a build where config is missing.
export const firebaseAdminDb = admin.apps.length ? admin.firestore() : null!;
export const firebaseAdminAuth = admin.apps.length ? admin.auth() : null!;
export const firebaseAdminStorage = admin.apps.length ? admin.storage() : null!;

export default admin;