import React, { useState } from 'react';
import {
  GraduationCap,
  Globe,
  Award,
  BookOpen,
  MapPin,
  Search,
  ExternalLink
} from 'lucide-react';

interface MaritimeUniversity {
  id: string;
  name: string;
  country: string;
  flagEmoji: string;
  globalRank: string;
  programs: string[];
  description: string;
}

const SAMPLE_UNIVERSITIES: MaritimeUniversity[] = [
  {
    id: 'wmu',
    name: 'World Maritime University (WMU)',
    country: 'Sweden',
    flagEmoji: '🇸🇪',
    globalRank: '#1 IMO Institution',
    programs: ['MSc Maritime Affairs', 'PhD Maritime Affairs', 'Postgraduate Diplomas'],
    description: 'Founded by the IMO in 1983, WMU is the premier global institute for postgraduate maritime education, policy, and marine research.'
  },
  {
    id: 'chalmers',
    name: 'Chalmers University of Technology',
    country: 'Sweden',
    flagEmoji: '🇸🇪',
    globalRank: '#15 Naval Architecture',
    programs: ['BSc Marine Engineering', 'MSc Naval Architecture & Ocean Engineering'],
    description: 'World-leading research in hydrodynamics, green ship propulsion, wind-assisted rotor sails, and ship stability.'
  },
  {
    id: 'ntnu',
    name: 'Norwegian Univ of Science and Tech (NTNU)',
    country: 'Norway',
    flagEmoji: '🇳🇴',
    globalRank: '#8 Marine Tech',
    programs: ['MSc Marine Technology', 'MSc Subsea Engineering'],
    description: 'Home to the Tyholt Ocean Basin laboratory for autonomous ship testing and offshore wind hydrodynamics.'
  }
];

export const UniversityPortalView: React.FC = () => {
  const [unis] = useState<MaritimeUniversity[]>(SAMPLE_UNIVERSITIES);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Global Maritime Higher Education
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Top Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Maritime Universities</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Explore world-renowned academies for Naval Architecture, Marine Engineering, Port Logistics, and Ocean Technology.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {unis.map((u) => (
          <div key={u.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-xl">{u.flagEmoji}</span>
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-[10px] font-bold">{u.globalRank}</span>
              </div>

              <h3 className="font-bold text-sm text-white">{u.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{u.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1 text-xs">
              <span className="text-[10px] text-sky-400 font-bold block uppercase">Programs Offered:</span>
              <ul className="space-y-0.5 text-[11px] text-slate-300">
                {u.programs.map((p, idx) => (
                  <li key={idx}>• {p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
