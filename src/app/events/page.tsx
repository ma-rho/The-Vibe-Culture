// src/app/events/page.tsx
export const dynamic = 'force-dynamic';
import { getEvents } from '@/app/actions/admin';
import EventCard from '@/components/EventCard';

export default async function EventsPage() {
  const events = await getEvents();
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const upcoming = events.filter(e => e.date >= today);
  const past = events.filter(e => e.date < today);

  return (
    <main className="min-h-screen p-10 bg-black space-y-20">
      <section>
        <h2 className="text-4xl font-black text-spotlight italic mb-8">UPCOMING VIBES</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcoming.map(e => (
            <EventCard key={e.id} {...e} description="Live Culture Session" />
          ))}
        </div>
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