'use client';

import { useState, useEffect, useRef } from 'react';
// We keep mutations (create/delete/upload) as actions, 
// but we REMOVE getSubmissions, getEvents, and getFeatured.
import { 
  createEvent, 
  deleteItem, 
  uploadFeaturedCreative,
  SubmissionData, 
  EventData,
  FeaturedCreative 
} from '@/app/actions/admin';
import withAdminAuth from '@/components/withAdminAuth';
import { Trash2, Plus, Users, Star, Calendar, Upload, X, Loader2, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
// Import the image compression library
import imageCompression from 'browser-image-compression';

function AdminDashboard() {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [featured, setFeatured] = useState<FeaturedCreative[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // NEW: Fetch data from API routes instead of direct server actions
  const loadData = async () => {
    try {
      setLoading(true);
      // It is important to use an absolute URL or a relative path that works in your environment
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

      const [subsRes, evsRes, featRes] = await Promise.all([
        fetch(`${baseUrl}/api/submissions`, { cache: 'no-store' }),
        fetch(`${baseUrl}/api/events`, { cache: 'no-store' }),
        fetch(`${baseUrl}/api/featured`, { cache: 'no-store' })
      ]);

      if (!subsRes.ok || !evsRes.ok || !featRes.ok) {
        throw new Error('One or more APIs failed to respond');
      }

      const [subs, evs, feat] = await Promise.all([
        subsRes.json(),
        evsRes.json(),
        featRes.json()
      ]);

      setSubmissions(subs);
      setEvents(evs);
      setFeatured(feat);
    } catch (error) {
      console.error("Dashboard data load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
        {/* COLUMN 1: SPOTLIGHT EDITOR */}
        <div className="space-y-8">
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <Star className="text-vibe-pink" />
              <h2 className="text-xl font-black uppercase tracking-widest italic">Spotlight Editor</h2>
            </div>

            {/* COMPRESSION LOGIC ADDED TO THE FORM ACTION */}
            <form action={async (formData) => {
              setUploading(true);
              try {
                // Get the original image file from the form data
                const imageFile = formData.get('image') as File;
                if (!imageFile || imageFile.size === 0) {
                  throw new Error('Please select an image to upload.');
                }

                // Set compression options
                const options = {
                  maxSizeMB: 2, // This will compress the image to be under 2MB
                  maxWidthOrHeight: 1920, // This will resize the image to a max width/height of 1920px
                  useWebWorker: true,
                };

                // Compress the image
                const compressedFile = await imageCompression(imageFile, options);

                // Create a new FormData object to hold the compressed image and other data
                const newFormData = new FormData();
                newFormData.append('name', formData.get('name')!);
                newFormData.append('role', formData.get('role')!);
                newFormData.append('caption', formData.get('caption')!);
                newFormData.append('creativeLink', formData.get('creativeLink')!);
                // Append the compressed file, keeping the original file name
                newFormData.append('image', compressedFile, imageFile.name);

                // Call the server action with the new form data
                await uploadFeaturedCreative(newFormData);
                
                clearPreview();
                await loadData(); // Refresh list after upload
                alert("Creative Published!");
              } catch (err) {
                const errorMessage = err instanceof Error ? err.message : String(err);
                alert("Upload failed: " + errorMessage);
              } finally {
                setUploading(false);
              }
            }} className="space-y-4">
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
                <input name="role" placeholder="Talent (e.g. DJ, Producer)" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm" required />
                <input name="creativeLink" type="url" placeholder="Portfolio/Social Link" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm" />
                <textarea name="caption" placeholder="Short bio or caption..." className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm h-20 resize-none" required />
              </div>

              <button 
                type="submit" 
                disabled={uploading}
                className="w-full bg-vibe-pink hover:bg-vibe-purple disabled:opacity-50 p-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all"
              >
                {uploading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />} 
                {uploading ? 'Publishing...' : 'Publish Spotlight'}
              </button>
            </form>
          </div>

          {/* ACTIVE SPOTLIGHT LIST */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-black/40">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 italic">Live in Spotlight</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {featured.map((creative) => (
                <div key={creative.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-vibe-pink/30 flex-shrink-0">
                    <Image src={creative.imageUrl} alt={creative.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{creative.name}</p>
                    <p className="text-[10px] text-white/40 uppercase">{creative.role}</p>
                  </div>
                  <button 
                    onClick={() => { if(confirm("Remove from spotlight?")) deleteItem('featured', creative.id).then(loadData) }}
                    className="p-2 text-white/20 hover:text-vibe-red transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2 & 3: EVENTS & SUBMISSIONS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* EVENTS MANAGEMENT */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-black/40">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-vibe-red" />
              <h2 className="text-xl font-black uppercase tracking-widest italic">Events & Archives</h2>
            </div>
            
            <form action={async (formData) => {
              const res = await createEvent({
                title: formData.get('title') as string,
                date: formData.get('date') as string,
                link: formData.get('link') as string,
                description: 'Vibe Culture Event'
              });
              if (res.success) loadData();
            }} className="grid md:grid-cols-3 gap-3 mb-8">
              <input name="title" placeholder="Event Name" className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm" required />
              <input name="date" type="date" className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm" required />
              <input name="link" type="url" placeholder="RSVP/Ticket Link" className="bg-white/5 border border-white/10 p-3 rounded-xl text-sm" required />
              <button type="submit" className="md:col-span-3 bg-vibe-red hover:bg-white hover:text-black p-3 rounded-full font-black uppercase text-[10px] transition-all">
                Add New Event
              </button>
            </form>

            <div className="grid md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {events.map((ev) => (
                <div key={ev.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="font-bold text-sm">{ev.title}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-tighter">{ev.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={ev.link} target="_blank" className="p-2 text-white/20 hover:text-vibe-purple transition-all">
                      <LinkIcon size={16} />
                    </a>
                    <button 
                      onClick={() => { if(confirm("Delete event?")) deleteItem('events', ev.id).then(loadData) }}
                      className="p-2 text-white/20 hover:text-vibe-red transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMISSIONS MANAGEMENT */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-black/40">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-vibe-purple" />
              <h2 className="text-xl font-black uppercase tracking-widest italic">Talent Submissions</h2>
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {submissions.length === 0 ? (
                <p className="text-center text-white/20 py-10 italic">No submissions yet.</p>
              ) : (
                submissions.map((sub) => (
                  <div key={sub.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div>
                      <p className="font-bold text-vibe-pink text-sm">{sub.name}</p>
                      <p className="text-[10px] text-white/40 italic">{sub.talent}</p>
                      <p className="text-[8px] text-white/20 uppercase mt-1">
                        Submitted: {new Date(sub.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <a 
                        href={sub.portfolioLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase font-black text-vibe-purple underline hover:text-white transition-all"
                      >
                        View Portfolio
                      </a>
                      <button 
                        onClick={() => { if(confirm("Delete submission?")) deleteItem('submissions', sub.id).then(loadData) }}
                        className="text-white/10 hover:text-vibe-red transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default withAdminAuth(AdminDashboard);