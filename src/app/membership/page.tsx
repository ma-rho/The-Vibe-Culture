'use client';

import { useState } from 'react';
import CalendlyWidget from '@/components/CalendlyWidget';

export default function MembershipPage() {
  const [category, setCategory] = useState('');
  const [tier, setTier] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setTier(''); // Reset tier when category changes
  };

  const handleTierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTier(e.target.value);
  };

  const getCalendlyUrl = () => {
    if (tier) {
      return `https://calendly.com/srevoteam/30min?a1=${encodeURIComponent(tier)}`;
    }
    return 'https://calendly.com/srevoteam/30min';
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-purple-600">Membership</h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <div className="bg-gray-900 rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">Creative Sign-Up Structure</h2>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-2">🔹 Tier 1: Community Member — FREE</h3>
                <p className="font-bold">For: DJs, photographers, dancers, poets, models</p>
                <ul className="list-disc list-inside mt-2 text-gray-400">
                  <li>Access to events & shoots</li>
                  <li>Social media promotion</li>
                  <li>Commission-based gigs</li>
                  <li>Networking & collabs</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-2">🔸 Tier 2: Performance Member — £40–£60 one-time</h3>
                <p className="font-bold">For: Artists, MCs, spoken-word performers</p>
                <ul className="list-disc list-inside mt-2 text-gray-400">
                  <li>Guaranteed performance slot (1–2 per month)</li>
                  <li>Professional event photos/videos</li>
                  <li>Promotion on The Vibe Culture socials</li>
                  <li>Priority booking for showcases</li>
                  <li>Discounted creative services</li>
                </ul>
                <p className="mt-2 text-sm text-purple-400">Starting price: £40</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-purple-400 mb-2">🔥 Tier 3: Featured / Managed Talent — Invite-only</h3>
                <p className="font-bold">Pricing: Revenue split model</p>
                <p className="mt-2 text-gray-400">Used for top-performing artists once demand is proven.</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Select Your Membership</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select id="category" value={category} onChange={handleCategoryChange} className="w-full bg-gray-800 border-gray-700 rounded-md p-2">
                    <option value="">Select Category</option>
                    <option value="Creative">Creative</option>
                    <option value="Performance">Performance</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="tier" className="block text-sm font-medium text-gray-300 mb-1">Tier</label>
                  <select id="tier" value={tier} onChange={handleTierChange} disabled={!category} className="w-full bg-gray-800 border-gray-700 rounded-md p-2 disabled:opacity-50">
                    <option value="">Select Tier</option>
                    {category === 'Creative' && <option value="Tier 1: Community Member">Tier 1: Community Member</option>}
                    {category === 'Performance' && <option value="Tier 2: Performance Member">Tier 2: Performance Member</option>}
                  </select>
                </div>
              </div>
               <p className="text-sm text-gray-400">Tier 3 is invite-only and cannot be selected here.</p>
            </div>
          </div>

          <div>
            <div className="bg-gray-900 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Schedule Your Onboarding Call</h2>
                {tier ? (
                    <CalendlyWidget url={getCalendlyUrl()} />
                ) : (
                    <div className="text-center text-gray-400 h-[630px] flex items-center justify-center">
                        <p>Please select a category and tier to schedule your meeting.</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
