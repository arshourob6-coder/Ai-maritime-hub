import { useState } from 'react';
import { ExternalLink, X, Info, GraduationCap, Building2, BookOpen, ShieldCheck, Sparkles, DollarSign } from 'lucide-react';
import { SPONSORED_UNIVERSITIES, SPONSORED_COMPANIES, PROMOTED_COURSES_ADS } from '../data/blogAndAdsData';

interface AdSenseBannerProps {
  type?: 'leaderboard' | 'sidebar' | 'in_article' | 'university_card' | 'company_banner' | 'promoted_course';
  slotId?: string;
  className?: string;
  onOpenSponsorModal?: () => void;
}

export const AdSenseBanner = ({
  type = 'leaderboard',
  slotId = 'slot-9821-maritime-ai',
  className = '',
  onOpenSponsorModal
}: AdSenseBannerProps) => {
  const [closed, setClosed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  if (closed) return null;

  // Render Sponsored University Spot
  if (type === 'university_card') {
    const uni = SPONSORED_UNIVERSITIES[Math.floor(Math.random() * SPONSORED_UNIVERSITIES.length)] || SPONSORED_UNIVERSITIES[0];
    return (
      <div className={`bg-slate-900/90 border border-sky-500/30 rounded-2xl p-5 relative overflow-hidden group hover:border-sky-400/60 transition shadow-xl ${className}`}>
        {/* Sponsored Badge */}
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-sky-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Featured Maritime University</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
            {uni.badge}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <img
            src={uni.logoUrl}
            alt={uni.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
          />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition flex items-center gap-1.5">
              <span>{uni.name}</span>
              <span className="text-xs">{uni.countryFlag}</span>
            </h4>
            <p className="text-xs text-sky-300 font-semibold">{uni.programTitle}</p>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{uni.description}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          {uni.tuitionDiscount && (
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              🎁 {uni.tuitionDiscount}
            </span>
          )}
          <a
            href={uni.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs rounded-lg transition flex items-center gap-1"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // Render Sponsored Company / Shipyard Banner
  if (type === 'company_banner') {
    const comp = SPONSORED_COMPANIES[0];
    return (
      <div className={`bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/80 border border-sky-500/30 rounded-2xl p-5 relative overflow-hidden shadow-2xl ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-sky-400" />
            <span>Sponsored Industry Partner</span>
          </span>
          <button
            onClick={() => setClosed(true)}
            className="text-slate-500 hover:text-white p-1 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-400 px-2 py-0.5 bg-sky-500/10 rounded border border-sky-500/20">
                {comp.industryCategory}
              </span>
              <h3 className="text-base font-extrabold text-white">{comp.name}</h3>
            </div>
            <p className="text-xs text-slate-300 font-medium">{comp.tagline}</p>
            <p className="text-[11px] text-slate-400">Featured System: <strong className="text-slate-200">{comp.featuredProduct}</strong></p>
          </div>

          <div className="md:col-span-1 flex flex-col items-end justify-center gap-2">
            <a
              href={comp.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
            >
              <span>{comp.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onOpenSponsorModal}
              className="text-[10px] text-slate-400 hover:text-sky-300 underline cursor-pointer"
            >
              Advertise with Us
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Promoted Course Ad
  if (type === 'promoted_course') {
    const courseAd = PROMOTED_COURSES_ADS[0];
    return (
      <div className={`bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 shadow-xl space-y-3 ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Promoted Academy Masterclass</span>
          </div>
          <span className="bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">{courseAd.badgeText}</span>
        </div>

        <div className="flex gap-3">
          <img
            src={courseAd.thumbnailUrl}
            alt={courseAd.title}
            className="w-20 h-20 rounded-xl object-cover border border-slate-800 shrink-0"
          />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">{courseAd.title}</h4>
            <p className="text-[11px] text-slate-400">By {courseAd.sponsorName}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-amber-400 font-bold">★ {courseAd.rating}</span>
              <span className="text-slate-500">({courseAd.enrolledStudents} enrolled)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-extrabold text-emerald-400 font-mono">${courseAd.discountPriceUSD}</span>
            {courseAd.priceUSD && (
              <span className="text-xs text-slate-500 line-through font-mono">${courseAd.priceUSD}</span>
            )}
          </div>
          <button className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-lg transition">
            Enroll Partner Course
          </button>
        </div>
      </div>
    );
  }

  // Default: Google AdSense Responsive Leaderboard / Rectangular Banner Unit
  return (
    <div className={`relative bg-slate-950/90 border border-slate-800 rounded-2xl p-3 shadow-lg my-4 text-slate-300 ${className}`}>
      
      {/* AdSense Top Header Badge */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 border-b border-slate-800/80 mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono font-bold text-[9px]">
            Google AdSense
          </span>
          <span className="text-slate-400">Ads by Google • Slot ID: {slotId}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-slate-500 hover:text-slate-300 transition"
            title="Ad choices & sponsorship info"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setClosed(true)}
            className="text-slate-500 hover:text-slate-300 transition"
            title="Close Ad"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="p-3 mb-3 bg-slate-900 rounded-xl text-xs text-slate-300 space-y-1 border border-slate-800">
          <p className="font-bold text-sky-400">Why am I seeing this ad?</p>
          <p className="text-[11px] text-slate-400">This ad unit helps fund free access to Maritime AI prompts, calculators, and research databases. Pro & Enterprise subscribers enjoy 100% Ad-Free experience.</p>
        </div>
      )}

      {/* Ad Contents */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Maritime Tech Sponsor</span>
            <h4 className="text-xs sm:text-sm font-bold text-white">DNV Veracity & Lloyd’s Register AI Hull Safety API</h4>
            <p className="text-[11px] text-slate-400">Automate SOLAS 2026 structural compliance and hull CFD meshing via cloud API.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSponsorModal}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition flex items-center gap-1"
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Sponsor Spot</span>
          </button>
          <a
            href="https://dnv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold rounded-lg transition flex items-center gap-1"
          >
            <span>Visit Sponsor</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
};
