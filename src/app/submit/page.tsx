'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function SubmitPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [talent, setTalent] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // This creates the 'submissions' collection automatically on the first entry
      await addDoc(collection(db, 'submissions'), {
        name,
        email,
        talent,
        portfolioLink,
        message,
        submittedAt: new Date(),
      });
      alert('SUCCESS: Your vibe has been recorded.');
      setName('');
      setEmail('');
      setTalent('');
      setPortfolioLink('');
      setMessage('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('ERROR: Connection to the underground failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full p-4 rounded-xl bg-vibe-black/40 border border-white/10 text-white placeholder:text-white/20 focus:border-vibe-purple focus:ring-2 focus:ring-vibe-purple/20 outline-none transition-all";
  const labelStyle = "block text-vibe-pink text-xs font-black uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="min-h-screen bg-transparent text-white p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-5xl font-black mb-12 text-center text-spotlight">SUBMIT TALENT</h1>
        
        <div className="glass-card rounded-3xl p-10">
          {/* FIX 1: Attached the handleSubmit here */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelStyle}>Full Name</label>
              <input 
                type="text" 
                className={inputStyle} 
                placeholder="Your Stage Name" 
                value={name} // FIX 2: Bind value to state
                onChange={(e) => setName(e.target.value)} // FIX 3: Update state
                required 
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Email</label>
                <input 
                  type="email" 
                  className={inputStyle} 
                  placeholder="vibe@culture.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label className={labelStyle}>Main Talent</label>
                <input 
                  type="text" 
                  className={inputStyle} 
                  placeholder="Producer / DJ" 
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Portfolio Link</label>
              <input 
                type="url" 
                className={inputStyle} 
                placeholder="Soundcloud / Instagram / Portfolio" 
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
                required 
              />
            </div>

            <div>
              <label className={labelStyle}>Message / Vibe</label>
              <textarea 
                rows={4} 
                className={inputStyle} 
                placeholder="Tell us your story..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-vibe-purple hover:bg-vibe-red text-white font-black py-5 rounded-full text-xl transition-all shadow-lg shadow-vibe-purple/20 scale-100 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'UPLOADING...' : 'SEND SUBMISSION'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}