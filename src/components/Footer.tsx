import { Instagram, Twitter, Music2 } from 'lucide-react';
import Link from 'next/link';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/vibeculturelive?igsh=bW10OTZsZzFlMmlw&utm_source=qr',
    icon: <Instagram size={20} />,
    color: 'hover:text-vibe-pink'
  },
  {
    name: 'X',
    href: 'https://x.com/vibeculturelive?s=21&t=q66QMnn9tmGEiCHOTk0WYA',
    icon: <Twitter size={20} />, // Twitter icon for X
    color: 'hover:text-vibe-purple'
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@the.vibe.culture?_r=1&_t=ZN-93LEsQWhEve',
    icon: <Music2 size={20} />, // TikTok style icon
    color: 'hover:text-vibe-red'
  }
];

export default function Footer() {
  return (
    <footer className="w-full mt-auto p-12 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
        
        {/* Social Icons */}
        <div className="flex space-x-8">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white/40 transition-all duration-300 transform hover:scale-125 ${social.color}`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Branding & Copyright */}
        <div className="text-center space-y-2">
          <p className="uppercase tracking-[0.5em] text-[10px] font-black text-white/20">
            Underground Royalty
          </p>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
            © 2026 The Vibe Culture • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}