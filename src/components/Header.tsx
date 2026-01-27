'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { onAuthStateChanged, signOut, User } from 'firebase/auth'; // Firebase SDK
import { auth } from '@/lib/firebase'; // Your client-side config
import { ChevronDown, LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for click-outside logic

  // 1. Monitor Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Click-Outside Logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-vibe-black/60 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
          <Image 
            src="/tvcheader2.PNG" 
            alt="The Vibe Culture" 
            width={240} 
            height={80} 
            className="w-48 md:w-60 h-auto filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            priority 
          />
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-10 text-sm font-black uppercase tracking-[0.2em]">
          <Link href="/culture" className="text-white/70 hover:text-vibe-purple transition-colors">Culture</Link>
          <Link href="/events" className="text-white/70 hover:text-vibe-red transition-colors">Events</Link>
          <Link href="/spotlight" className="text-white/70 hover:text-vibe-pink transition-colors">Spotlight</Link>
          <Link href="/submit" className="text-white/70 hover:text-white transition-colors">Submit</Link>
        </nav>

        {/* 3. Dropdown Container with Ref */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="group bg-gradient-to-r from-vibe-purple to-vibe-pink hover:from-vibe-red hover:to-vibe-purple text-white font-black py-2.5 px-6 rounded-full flex items-center transition-all duration-500 shadow-[0_0_15px_rgba(139,44,245,0.4)] hover:shadow-vibe-red/50 focus:outline-none"
          >
            <span className="text-xs uppercase tracking-tighter">Get Involved</span>
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-60 bg-vibe-black/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 py-3 z-50 animate-fade-in-down">
              <Link href="/membership" onClick={() => setIsDropdownOpen(false)} className="block px-6 py-3 text-sm font-bold text-white/80 hover:bg-vibe-purple hover:text-white transition-all uppercase tracking-widest">Join the Culture</Link>
              
              <div className="h-px bg-white/5 my-2 mx-4" />

              <Link href="/culture" onClick={() => setIsDropdownOpen(false)} className="block px-6 py-3 text-sm font-bold text-white/80 hover:bg-vibe-purple hover:text-white transition-all uppercase tracking-widest">Culture</Link>
              <Link href="/events" onClick={() => setIsDropdownOpen(false)} className="block px-6 py-3 text-sm font-bold text-white/80 hover:bg-vibe-purple hover:text-white transition-all uppercase tracking-widest">Events</Link>
              <Link href="/spotlight" onClick={() => setIsDropdownOpen(false)} className="block px-6 py-3 text-sm font-bold text-white/80 hover:bg-vibe-purple hover:text-white transition-all uppercase tracking-widest">Spotlight</Link>
              <Link href="/submit" onClick={() => setIsDropdownOpen(false)} className="block px-6 py-3 text-sm font-bold text-white/80 hover:bg-vibe-purple hover:text-white transition-all uppercase tracking-widest">Submit</Link>

              <div className="h-px bg-white/5 my-2 mx-4" />
              
              {/* 4. Conditional Admin Logic */}
              {user ? (
                <>
                  <Link 
                    href="/admin/dashboard" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-vibe-purple hover:bg-vibe-purple hover:text-white transition-all uppercase tracking-widest"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-3 w-full text-left px-6 py-3 text-sm font-bold text-vibe-red hover:bg-vibe-red hover:text-white transition-all uppercase tracking-widest"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  href="/admin/login" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest italic"
                >
                  <ShieldCheck size={16} />
                  Admin Access
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}