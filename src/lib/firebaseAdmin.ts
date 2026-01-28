import admin from 'firebase-admin';

// 1. Logic to get the service account from the single JSON string
const getServiceAccount = () => {
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!key) return null;

  try {
    // If it's a JSON string (standard for Service Account downloads), parse it
    return JSON.parse(key);
  } catch (e) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY JSON, " + e);
    return null;
  }
};

const serviceAccount = getServiceAccount();

if (!admin.apps.length) {
  if (serviceAccount) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Use the public variable for the bucket name
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${serviceAccount.project_id}.appspot.com`,
      });
      console.log('Firebase Admin Initialized Successfully');
    } catch (error) {
      console.error('Firebase Admin Initialization Error:', error);
    }
  } else {
    // This will show during the "Collecting page data" build phase
    console.warn('Firebase Admin: Skipping initialization - Service Account Key missing.');
  }
}

// Export services with a null check to prevent build-time crashes
export const firebaseAdminDb = admin.apps.length ? admin.firestore() : null!;
export const firebaseAdminAuth = admin.apps.length ? admin.auth() : null!;
export const firebaseAdminStorage = admin.apps.length ? admin.storage() : null!;

export default admin;