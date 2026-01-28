import { NextResponse } from 'next/server';
import { firebaseAdminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!firebaseAdminDb) {
    return NextResponse.json({ error: 'DB not initialized' }, { status: 500 });
  }

  try {
    const snapshot = await firebaseAdminDb.collection('featured')
      .orderBy('createdAt', 'desc')
      .get();
      
    const creatives = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        role: data.role,
        imageUrl: data.imageUrl,
        caption: data.caption,
        creativeLink: data.creativeLink // Ensuring creativeLink is included
      };
    });

    return NextResponse.json(creatives);
  } catch (error) {
    console.error("Featured API Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}