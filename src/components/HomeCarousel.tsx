'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

interface HomeCarouselProps {
  items: CarouselItem[];
  accentColor: 'purple' | 'red';
}

export default function HomeCarousel({ items, accentColor }: HomeCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const colorClass = accentColor === 'purple' ? 'vibe-purple' : 'vibe-red';

  return (
    <div className="relative group h-full flex flex-col">
      {/* Navigation Controls */}
      <div className="absolute top-0 right-0 z-20 flex gap-2">
        <button onClick={scrollPrev} className={`p-1 rounded-full bg-white/5 hover:bg-${colorClass} transition-colors border border-white/10`}>
          <ChevronLeft size={16} />
        </button>
        <button onClick={scrollNext} className={`p-1 rounded-full bg-white/5 hover:bg-${colorClass} transition-colors border border-white/10`}>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="overflow-hidden flex-1 mt-8" ref={emblaRef}>
        <div className="flex h-full">
          {items.map((item) => (
            <div key={item.id} className="relative flex-[0_0_100%] min-w-0 h-full pl-4">
              <Link href={item.link} className="block relative h-full w-full rounded-xl overflow-hidden group/item">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 group-hover/item:scale-110 transition-transform duration-700"
                  unoptimized={item.image.includes('microlink')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-left">
                  <p className={`text-${colorClass} font-black text-[10px] uppercase tracking-[0.3em]`}>
                    {item.subtitle}
                  </p>
                  <h3 className="text-xl font-black uppercase italic leading-tight">{item.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}