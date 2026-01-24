'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false, // We handle the redirect ourselves
        password,
      });

      if (res?.error) {
        setError('INVALID ACCESS KEY');
      } else {
        // Successful login - go to dashboard
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('CONNECTION ERROR: Check your Cloud Workstation URL in .env');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-vibe-black/60 backdrop-blur-2xl p-10 rounded-[2rem] border border-white/10 w-full max-w-md">
        <h1 className="text-4xl font-black mb-8 text-center text-spotlight italic tracking-tighter">
          ADMIN ACCESS
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-4 bg-black/40 rounded-xl border border-white/10 text-white outline-none focus:border-vibe-purple transition-all"
            required
          />
          {error && <p className="text-vibe-red text-xs font-bold text-center italic">{error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-vibe-purple hover:bg-vibe-red text-white font-black py-4 rounded-full transition-all uppercase italic"
          >
            {loading ? 'Verifying...' : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}