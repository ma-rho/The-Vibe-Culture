import { NextResponse } from 'next/server';
import { firebaseAdminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!firebaseAdminDb) {
    return NextResponse.json({ error: 'DB not initialized' }, { status: 500 });
  }

  try {
    const snapshot = await firebaseAdminDb.collection('events')
      .orderBy('date', 'asc')
      .get();
      
    const events = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || 'Untitled Event',
        date: data.date || '',
        link: data.link || '',
      };
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Events API Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}