import Link from "next/link";
import { getEvents, getFeatured } from "@/app/actions/admin";
import HomeCarousel from "@/components/HomeCarousel";

export default async function Home() {
  // Fetch dynamic data from Firestore via Server Actions
  const [events, creatives] = await Promise.all([
    getEvents(),
    getFeatured()
  ]);

  // Format Creative data for the carousel component
  const creativeItems = creatives.map((c) => ({
    id: c.id,
    title: c.name,
    subtitle: c.role,
    image: c.imageUrl,
    link: "/spotlight",
  }));

  // Format Event data and use Microlink for automated screenshots
  const eventItems = events.map((e) => ({
    id: e.id,
    title: e.title,
    subtitle: e.date,
    // Automated screengrab from the event link
    image: `https://api.microlink.io/?url=${encodeURIComponent(e.link)}&screenshot=true&meta=false&embed=screenshot.url`,
    link: "/events",
  }));

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-transparent">
      <main className="flex-1 flex flex-col items-center justify-center text-center z-10 w-full max-w-7xl">
        <div className="animate-fade-in-down">
          {/* Headline using the Spotlight Gradient */}
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-spotlight drop-shadow-[0_0_15px_rgba(245,54,164,0.3)] uppercase">
            Where the Underground <br /> Meets the Spotlight
          </h1>
          
          <p className="text-lg md:text-2xl mb-12 max-w-2xl mx-auto text-white/80 font-medium">
            A platform for underground creatives to showcase talent and connect with a global audience.
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
            <Link href="/membership" className="bg-vibe-purple hover:bg-vibe-purple/80 text-white font-black py-4 px-10 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(139,44,245,0.4)] scale-100 hover:scale-105 active:scale-95">
              JOIN THE CULTURE
            </Link>
            <Link href="/submit" className="bg-vibe-red hover:bg-vibe-red/80 text-white font-black py-4 px-10 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,31,68,0.4)] scale-100 hover:scale-105 active:scale-95">
              SUBMIT TALENT
            </Link>
          </div>
        </div>

        {/* Dynamic Section Containers */}
        <div className="mt-32 w-full grid md:grid-cols-2 gap-8 min-h-[500px]">
          
          {/* FEATURED CREATIVES CAROUSEL */}
          <div className="p-1 rounded-3xl bg-gradient-to-br from-vibe-purple/20 to-transparent border border-white/10 group">
            <div className="bg-black/40 backdrop-blur-md p-8 md:p-10 h-full rounded-3xl flex flex-col">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-3xl font-black italic uppercase group-hover:text-vibe-purple transition-colors">
                  Spotlight
                </h2>
                <Link href="/spotlight" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white">
                  View All
                </Link>
              </div>

              <div className="flex-1">
                {creatives.length > 0 ? (
                  <HomeCarousel items={creativeItems} accentColor="purple" />
                ) : (
                  <div className="h-full flex items-center justify-center border border-dashed border-white/20 rounded-2xl">
                    <p className="text-white/40 italic">Creative carousel coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LATEST EVENTS CAROUSEL */}
          <div className="p-1 rounded-3xl bg-gradient-to-br from-vibe-red/20 to-transparent border border-white/10 group">
            <div className="bg-black/40 backdrop-blur-md p-8 md:p-10 h-full rounded-3xl flex flex-col">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-3xl font-black italic uppercase group-hover:text-vibe-red transition-colors">
                  Latest Events
                </h2>
                <Link href="/events" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white">
                  View All
                </Link>
              </div>

              <div className="flex-1">
                {events.length > 0 ? (
                  <HomeCarousel items={eventItems} accentColor="red" />
                ) : (
                  <div className="h-full flex items-center justify-center border border-dashed border-white/20 rounded-2xl">
                    <p className="text-white/40 italic">Latest events preview coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}