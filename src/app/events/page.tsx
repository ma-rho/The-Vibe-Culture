
'use client';
import { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import { Loader2 } from 'lucide-react';
import { EventData } from '@/app/actions/admin'; // Re-use the type definition

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
        const response = await fetch(`${baseUrl}/api/events`, { cache: 'no-store' });
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Events page error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const upcoming = events.filter(e => e.date >= today);
  const past = events.filter(e => e.date < today);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-vibe-purple" size={48} />
      </main>
    );
  }

  return (
    <main className="min-h-screen p-10 bg-black space-y-20">
      <section>
        <h2 className="text-4xl font-black text-spotlight italic mb-8">UPCOMING VIBES</h2>
        {upcoming.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcoming.map(e => (
              <EventCard key={e.id} {...e} description="Live Culture Session" />
            ))}
          </div>
        ) : (
           <div className="py-20 text-center text-white/20 italic">
            No upcoming vibes. Check back soon.
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section>
          <h2 className="text-2xl font-black text-white/20 italic mb-8 border-b border-white/5 pb-4 uppercase tracking-[0.5em]">The Archive</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {past.map(e => (
              <EventCard key={e.id} {...e} description="Past Event" isPast={true} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
