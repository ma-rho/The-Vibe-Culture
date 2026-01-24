import Image from 'next/image';

interface MemberCardProps {
  name: string;
  talent: string;
  imageUrl: string;
}

export default function MemberCard({ name, talent, imageUrl }: MemberCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden group hover:border-vibe-red/40 transition-all">
      <div className="relative h-72 w-full overflow-hidden">
        <Image src={imageUrl} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-vibe-black to-transparent opacity-60" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black text-white tracking-tight">{name}</h3>
        <p className="text-vibe-pink font-bold text-sm uppercase">{talent}</p>
      </div>
    </div>
  );
}
