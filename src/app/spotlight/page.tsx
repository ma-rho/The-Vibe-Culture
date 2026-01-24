import { getFeatured } from '@/app/actions/admin';
import MemberCard from '@/components/MemberCard';

export default async function SpotlightPage() {
  const creatives = await getFeatured();

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-20">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-7xl md:text-9xl font-black text-spotlight italic tracking-tighter">
            SPOTLIGHT
          </h1>
          <p className="text-vibe-purple uppercase tracking-[1em] text-sm font-bold">
            Featured Talent & Creatives
          </p>
        </header>

        {creatives.length === 0 ? (
          <div className="py-20 text-center text-white/20 italic">
            No creatives featured yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-10">
            {creatives.map((creative) => (
              <div key={creative.id} className="group space-y-6">
                <MemberCard 
                  name={creative.name}
                  talent={creative.role}
                  imageUrl={creative.imageUrl}
                />
                <div className="px-2">
                  <p className="text-white/60 text-sm leading-relaxed italic border-l-2 border-vibe-pink pl-4">
                    &quot;{creative.caption}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}