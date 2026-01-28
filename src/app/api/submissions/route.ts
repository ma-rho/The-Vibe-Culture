import { NextResponse } from 'next/server';
import { firebaseAdminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!firebaseAdminDb) return NextResponse.json([], { status: 500 });

  try {
    const snapshot = await firebaseAdminDb.collection('submissions')
      .orderBy('submittedAt', 'desc')
      .limit(20)
      .get();
      
    const data = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        name: d.name,
        talent: d.talent,
        portfolioLink: d.portfolioLink,
        // Convert Timestamp to ISO string for the client-side dashboard
        submittedAt: d.submittedAt?.toDate?.().toISOString() || new Date().toISOString()
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Submissions API Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
