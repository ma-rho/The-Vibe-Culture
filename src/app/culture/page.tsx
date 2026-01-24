export default function CulturePage() {
  return (
    <div className="min-h-screen bg-transparent text-white p-8 md:p-20">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-5xl md:text-8xl font-black mb-16 text-center text-spotlight tracking-tighter">
          OUR CULTURE
        </h1>
        
        <div className="glass-card rounded-3xl p-10 md:p-16 mb-12 relative overflow-hidden">
          {/* Subtle glow behind content */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-vibe-purple/20 blur-[100px]" />
          
          <h2 className="text-4xl font-black mb-6 text-white border-l-4 border-vibe-purple pl-6">OUR ETHOS</h2>
          <p className="text-xl text-white/70 mb-10 leading-relaxed italic font-medium">
            "The Vibe Culture is more than a brand; it&apos;s a movement. We are a collective of artists, creators, and visionaries dedicated to fostering a supportive and collaborative environment.&quot;
          </p>
          
          <div className="grid gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-vibe-purple/30 transition-colors">
              <h3 className="text-vibe-purple font-black text-xl mb-2 uppercase italic">Creativity</h3>
              <p className="text-white/80">We believe in the power of artistic expression to inspire change and connect people across the underground.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-vibe-red/30 transition-colors">
              <h3 className="text-vibe-red font-black text-xl mb-2 uppercase italic">Community</h3>
              <p className="text-white/80">We are a family of like-minded individuals who uplift and empower one another to reach the spotlight.</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-10 border-vibe-red/20">
          <h2 className="text-3xl font-black mb-6 text-vibe-red uppercase">Community Guidelines</h2>
          <ul className="space-y-4">
            {[
              { label: 'Respect', desc: 'Treat all members with dignity.' },
              { label: 'Inclusivity', desc: 'Zero-tolerance for hate speech.' },
              { label: 'Integrity', desc: 'Respect original work and IP.' }
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-4 text-lg">
                <div className="h-2 w-2 rounded-full bg-vibe-red" />
                <p><span className="font-black uppercase text-white/90 mr-2">{item.label}:</span> 
                <span className="text-white/60">{item.desc}</span></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}