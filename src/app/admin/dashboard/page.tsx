'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  getSubmissions, 
  getEvents, 
  createEvent, 
  deleteItem, 
  uploadFeaturedCreative,
  SubmissionData, 
  EventData 
} from '@/app/actions/admin';
import withAdminAuth from '@/components/withAdminAuth';
import { Trash2, Plus, Users, Star, Calendar, Upload, X, Loader2, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

function AdminDashboard() {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Image Preview State
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    try {
      const [subs, evs] = await Promise.all([getSubmissions(), getEvents()]);
      setSubmissions(subs);
      setEvents(evs);
    } catch (error) {
      console.error("Fetch error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearPreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Loader2 className="animate-spin text-vibe-purple" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-6 md:p-10 space-y-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-6xl font-black text-spotlight italic tracking-tighter">VIBE CONTROL</h1>
          <p className="text-white/40 uppercase tracking-[0.5em] text-xs">Administrative Command Center</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* SECTION 1: FEATURED CREATIVES UPLOAD */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <Star className="text-vibe-pink" />
            <h2 className="text-xl font-black uppercase tracking-widest italic">Spotlight Editor</h2>
          </div>

          <form action={async (formData) => {
            setUploading(true);
            try {
              await uploadFeaturedCreative(formData);
              clearPreview();
              alert("Creative Published!");
            } catch (err) {
              alert("Upload failed.");
            } finally {
              setUploading(false);
            }
          }} className="space-y-4">
            
            {/* Custom File Picker UI */}
            <div className="relative group">
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
                required 
              />
              {!previewUrl ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-vibe-pink/50 hover:bg-white/5 transition-all"
                >
                  <Upload className="text-vibe-pink mb-2" />
                  <p className="text-[10px] uppercase font-bold text-white/40">Select Member Photo</p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/20">
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                  <button 
                    type="button"
                    onClick={clearPreview}
                    className="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-vibe-red transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <input name="name" placeholder="Stage Name" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm" required />
              <input name="role" placeholder="Talent (e.g. Visual Artist)" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm" required />
              <textarea name="caption" placeholder="Short spotlight bio..." className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm h-20 resize-none" required />
            </div>

            <button 
              type="submit" 
              disabled={uploading}
              className="w-full bg-vibe-pink hover:bg-vibe-purple disabled:opacity-50 p-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all"
            >
              {uploading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />} 
              {uploading ? 'Uploading...' : 'Publish Spotlight'}
            </button>
          </form>
        </div>

        {/* SECTION 2: EVENT MANAGEMENT */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-black/40">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-vibe-red" />
              <h2 className="text-xl font-black uppercase tracking-widest italic">Events & Archives</h2>
            </div>
            
            <form action={async (formData) => {
              const title = formData.get('title') as string;
              const date = formData.get('date') as string;
              const link = formData.get('link') as string;
              await createEvent({
                title, date, link,
                description: ''
              });
              loadData();
            }} className="grid md:grid-cols-3 gap-3 mb-8">
              <input name="title" placeholder="Event Name" className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm" required />
              <input name="date" type="date" className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm" required />
              <input name="link" type="url" placeholder="RSVP Link" className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm" required />
              <button type="submit" className="md:col-span-3 bg-vibe-red hover:bg-white hover:text-black p-3 rounded-full font-black uppercase text-[10px] transition-all">
                Add Event to Live Site
              </button>
            </form>

            <div className="grid md:grid-cols-2 gap-4 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {events.map((ev) => (
                <div key={ev.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 group">
                  <div>
                    <p className="font-bold text-sm">{ev.title}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-tighter">{ev.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={ev.link} target="_blank" className="p-2 text-white/20 hover:text-vibe-purple transition-all">
                      <LinkIcon size={16} />
                    </a>
                    <button onClick={() => { if(confirm("Delete event?")) deleteItem('events', ev.id).then(loadData) }} className="p-2 text-white/20 hover:text-vibe-red transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: RECENT SUBMISSIONS */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-black/40">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-vibe-purple" />
              <h2 className="text-xl font-black uppercase tracking-widest italic">New Submissions</h2>
            </div>
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="font-bold text-vibe-pink text-sm">{sub.name}</p>
                    <p className="text-[10px] text-white/40 italic">{sub.talent}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={sub.portfolioLink} target="_blank" className="text-[10px] uppercase font-black text-vibe-purple underline">Portfolio</a>
                    <button onClick={() => { if(confirm("Delete?")) deleteItem('submissions', sub.id).then(loadData) }} className="text-white/10 hover:text-vibe-red">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAdminAuth(AdminDashboard);