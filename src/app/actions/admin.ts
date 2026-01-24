'use server'
import * as admin from 'firebase-admin'; // Ensure this is here
import { firebaseAdminDb, firebaseAdminStorage } from '@/lib/firebaseAdmin';
import { revalidatePath } from 'next/cache';
//import admin from '../../../lib/firebaseAdmin';

// Define types for the server
export interface SubmissionData {
  id: string;
  name: string;
  talent: string;
  portfolioLink: string;
  submittedAt: string; // Change this to string for the client
}

export interface EventData {
  id: string;
  title: string;
  date: string;
  description: string;
  link: string;
}

export interface FeaturedCreative {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  caption: string;
}

// export async function addFeatured(data: Omit<FeaturedCreative, 'id'>) {
//   await firebaseAdminDb.collection('featured').add(data);
//   revalidatePath('/spotlight');
// }

export async function getFeatured(): Promise<FeaturedCreative[]> {
  try {
    const snapshot = await firebaseAdminDb.collection('featured')
      .orderBy('createdAt', 'desc') // Newest first
      .get();
      
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        role: data.role,
        imageUrl: data.imageUrl,
        caption: data.caption
      } as FeaturedCreative;
    });
  } catch (error) {
    console.error("Error fetching featured creatives:", error);
    return [];
  }
}

export async function uploadFeaturedCreative(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const caption = formData.get('caption') as string;
    const file = formData.get('image') as File;

    if (!file || file.size === 0) throw new Error("File is empty or missing");

    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = firebaseAdminStorage.bucket();
    
    // Clean filename: remove special characters
    const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const filename = `featured/${Date.now()}-${safeName}`;
    const fileRef = bucket.file(filename);

    await fileRef.save(buffer, {
      metadata: { contentType: file.type }
    });

    // Safer URL construction using the bucket variable
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media`;

    await firebaseAdminDb.collection('featured').add({
      name,
      role,
      imageUrl,
      caption,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    revalidatePath('/spotlight');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (err: any) {
    // Log the specific Firebase error to your TERMINAL
    console.error("FULL_ERROR_DETAILS:", err);
    throw new Error(err.message || "Upload failed");
  }
}

// 1. Fetch Events
export async function getEvents(): Promise<EventData[]> {
  try {
    const snapshot = await firebaseAdminDb.collection('events')
      .orderBy('date', 'asc')
      .get();
      
    return snapshot.docs.map(doc => {
      const data = doc.data();
      // ✅ DO NOT use ...data(). Manually pick the fields to avoid sending Timestamps.
      return {
        id: doc.id,
        title: data.title || 'Untitled Event',
        date: data.date || '', // Assuming this is stored as a string from your input
        link: data.link || '',
      } as EventData;
    });
  } catch (error) {
    console.error("Error in getEvents:", error);
    throw new Error("Failed to fetch events from server");
  }
}

// Fetch Submissions
export async function getSubmissions(): Promise<SubmissionData[]> {
  const snapshot = await firebaseAdminDb.collection('submissions')
    .orderBy('submittedAt', 'desc')
    .limit(10)
    .get();
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        talent: data.talent,
        portfolioLink: data.portfolioLink,
        // FIX: Convert the complex Timestamp object to a plain string
        submittedAt: data.submittedAt?.toDate?.().toISOString() || new Date().toISOString()
      } as SubmissionData;
    });
}

// 2. Add Event
export async function createEvent(data: Omit<EventData, 'id'>) {
  try {
    await firebaseAdminDb.collection('events').add({
      ...data,
      createdAt: new Date() // Good practice for sorting
    });
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error("Failed to create event:", error);
    return { success: false };
  }
}

// 3. Delete any item by Collection
export async function deleteItem(collectionName: string, id: string) {
  try {
    await firebaseAdminDb.collection(collectionName).doc(id).delete();
    revalidatePath('/admin/dashboard'); 
    return { success: true };
  } catch (error) {
    console.error("Delete failed:", error);
    return { success: false };
  }
}
