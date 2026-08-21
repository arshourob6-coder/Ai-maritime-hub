import React, { useState } from 'react';
import { X, Check, Megaphone, Building2, GraduationCap, DollarSign, Send, Sparkles, Trophy } from 'lucide-react';

interface SponsorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SponsorPortalModal: React.FC<SponsorPortalModalProps> = ({ isOpen, onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState<'banner' | 'university' | 'course' | 'newsletter'>('banner');
  const [durationMonths, setDurationMonths] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const packagePricing = {
    banner: 250,      // $250 / mo for Leaderboard & Article Ads
    university: 450,  // $450 / mo for Featured University Spotlight
    course: 350,      // $350 / mo for Promoted Course Masterclass
    newsletter: 600   // $600 / issue for 15,000+ Maritime AI Newsletter Subscribers
  };

  const totalPrice = packagePricing[selectedPackage] * durationMonths;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-sky-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0">
            <Megaphone className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Sponsor & Advertise with Maritime AI Hub</h2>
            <p className="text-xs text-slate-400">Reach 35,000+ Naval Architects, Marine Engineers, Ship Captains, and Maritime Cadets</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-extrabold text-white">Sponsorship Booking Submitted!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Thank you, <strong>{companyName || 'Partner'}</strong>! Our advertising team will review your booking and email invoice/creative specs to <strong>{contactEmail}</strong> within 2 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Package Selection Cards */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">1. Select Advertising Placement:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Option 1: AdSense & Leaderboard Banner */}
                <div
                  onClick={() => setSelectedPackage('banner')}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    selectedPackage === 'banner'
                      ? 'bg-sky-500/15 border-sky-400 text-sky-300'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">Sponsored Leaderboard Banner</h4>
                      <span className="text-xs font-mono font-bold text-emerald-400">$250/mo</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Header & Footer placement across all 15 Maritime tools & SEO guides.</p>
                  </div>
                </div>

                {/* Option 2: Featured Maritime University */}
                <div
                  onClick={() => setSelectedPackage('university')}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    selectedPackage === 'university'
                      ? 'bg-sky-500/15 border-sky-400 text-sky-300'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">University & Academy Spotlight</h4>
                      <span className="text-xs font-mono font-bold text-emerald-400">$450/mo</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Top spot in Learning Hub with direct student application link & scholarship tag.</p>
                  </div>
                </div>

                {/* Option 3: Promoted Masterclass */}
                <div
                  onClick={() => setSelectedPackage('course')}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    selectedPackage === 'course'
                      ? 'bg-sky-500/15 border-sky-400 text-sky-300'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Trophy className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">Promoted Course Placement</h4>
                      <span className="text-xs font-mono font-bold text-emerald-400">$350/mo</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Featured badge on Course Catalog & AI Chat recommendations.</p>
                  </div>
                </div>

                {/* Option 4: Newsletter Sponsor */}
                <div
                  onClick={() => setSelectedPackage('newsletter')}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    selectedPackage === 'newsletter'
                      ? 'bg-sky-500/15 border-sky-400 text-sky-300'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">Newsletter Dedicated Feature</h4>
                      <span className="text-xs font-mono font-bold text-emerald-400">$600/issue</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Top article feature sent to 15,000+ verified maritime email subscribers.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Campaign Duration Slider */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">Duration:</span>
                <span className="font-mono font-bold text-sky-400">{durationMonths} Month{durationMonths > 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 Mo</span>
                <span>3 Mo (5% off)</span>
                <span>6 Mo (10% off)</span>
                <span>12 Mo (20% off)</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Company / University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. World Maritime University / DNV"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Contact Email *</label>
                <input
                  type="email"
                  required
                  placeholder="marketing@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-300">Website / Target Landing Page URL</label>
                <input
                  type="url"
                  placeholder="https://company.com/maritime-ai"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Total Price & Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Campaign Investment</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-mono">${totalPrice}</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Advertising Request</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
