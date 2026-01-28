
'use client';
import { useState, useEffect } from 'react';
import MemberCard from '@/components/MemberCard';
import { Loader2 } from 'lucide-react';
import { FeaturedCreative } from '@/app/actions/admin'; // Re-use the type

export default function SpotlightPage() {
  const [creatives, setCreatives] = useState<FeaturedCreative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCreatives = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
        const response = await fetch(`${baseUrl}/api/featured`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch creatives');
        }
        const data = await response.json();
        setCreatives(data);
      } catch (error) {
        console.error("Spotlight page error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCreatives();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-vibe-purple" size={48} />
      </main>
    );
  }

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
                  creativeLink={creative.creativeLink} 
                />
                <div className="px-2 space-y-4">
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
