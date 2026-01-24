import Link from 'next/link';

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  link?: string;     // Added dynamic link
  isPast?: boolean;
}

export default function EventCard({ title, date, description, link, isPast = false }: EventCardProps) {
  return (
    <div className={`glass-card rounded-3xl p-6 border border-white/10 bg-white/5 transition-all ${isPast ? 'opacity-40 grayscale' : 'hover:border-vibe-purple/50'}`}>
      <h3 className={`text-2xl font-bold mb-2 ${isPast ? 'text-gray-400' : 'text-vibe-purple'}`}>{title}</h3>
      <p className="text-vibe-pink text-xs font-black uppercase mb-4 tracking-widest">{date}</p>
      <p className="text-gray-300 mb-6 text-sm leading-relaxed">{description}</p>
      
      {!isPast && link ? (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-white text-black px-8 py-2 rounded-full font-black uppercase text-[10px] hover:bg-vibe-pink hover:text-white transition-all tracking-tighter"
        >
          RSVP Now
        </a>
      ) : !isPast && (
        <span className="text-white/20 text-[10px] uppercase font-bold italic">Link coming soon</span>
      )}

      {isPast && (
        <span className="text-white/20 text-[10px] uppercase font-bold italic">Event Concluded</span>
      )}
    </div>
  );
}