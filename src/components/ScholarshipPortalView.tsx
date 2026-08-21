import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Calendar,
  DollarSign,
  Globe,
  Search,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface Scholarship {
  id: string;
  title: string;
  institution: string;
  country: string;
  amountUSD: string;
  deadline: string;
  degree: 'MSc / PhD' | 'BSc / Cadetship' | 'Short Course';
  description: string;
}

const SAMPLE_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'sch-1',
    title: 'Nippon Foundation - WMU Fellowship Program',
    institution: 'World Maritime University (WMU)',
    country: 'Malmö, Sweden 🇸🇪',
    amountUSD: 'Full Tuition + $22,000 Stipend',
    deadline: 'Nov 30, 2026',
    degree: 'MSc / PhD',
    description: 'Full funding for maritime safety, marine environmental protection, and port management postgraduate degrees.'
  },
  {
    id: 'sch-2',
    title: 'IMarEST Lord Kelvin Maritime Engineering Scholarship',
    institution: 'Institute of Marine Engineering, Science & Technology',
    country: 'London, UK 🇬🇧',
    amountUSD: '$12,000 / Year',
    deadline: 'Oct 15, 2026',
    degree: 'BSc / Cadetship',
    description: 'Annual scholarship for outstanding students pursuing undergraduate degrees in Naval Architecture and Marine Engineering.'
  },
  {
    id: 'sch-3',
    title: 'Australian Maritime College International Cadetship Grant',
    institution: 'University of Tasmania (AMC)',
    country: 'Launceston, Australia 🇦🇺',
    amountUSD: '50% Tuition Discount',
    deadline: 'Dec 10, 2026',
    degree: 'BSc / Cadetship',
    description: 'Merit-based grant for international students enrolled in Bachelor of Applied Science (Nautical Science).'
  }
];

export const ScholarshipPortalView: React.FC = () => {
  const [scholarships] = useState<Scholarship[]>(SAMPLE_SCHOLARSHIPS);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Global Education & Financial Aid Portal
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Global Maritime <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Scholarship Database</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Search fully funded fellowships at World Maritime University, AMC, Solent, and IMarEST with AI essay generator assistance.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scholarships.map((sch) => (
          <div key={sch.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-sky-400">{sch.degree}</span>
                <span className="text-emerald-400">{sch.country}</span>
              </div>

              <h3 className="font-bold text-sm text-white">{sch.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{sch.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Award Value:</span>
                <span>{sch.amountUSD}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Deadline:</span>
                <span className="text-amber-400">{sch.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
