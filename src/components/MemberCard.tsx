import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface MemberCardProps {
  name: string;
  talent: string;
  imageUrl: string;
  creativeLink?: string; // Add optional link prop
}

export default function MemberCard({ name, talent, imageUrl, creativeLink }: MemberCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden group border border-white/5 hover:border-vibe-purple/30 transition-all">
      <div className="relative h-64 w-full">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-gray-400 text-sm uppercase tracking-wider">{talent}</p>
        </div>
        
        {/* Integrate the link button directly into the card or keep it available for the parent */}
        {creativeLink && (
          <a 
            href={creativeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 text-white/70 hover:bg-vibe-purple hover:text-white rounded-lg text-xs font-bold transition-all"
          >
            <ExternalLink size={14} />
            VIEW PORTFOLIO
          </a>
        )}
      </div>
    </div>
  );
}