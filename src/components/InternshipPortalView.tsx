import React, { useState } from 'react';
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Send,
  Search
} from 'lucide-react';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  type: 'Naval Architecture' | 'Deck Cadet' | 'Engine Cadet' | 'Port Operations';
}

const SAMPLE_INTERNSHIPS: Internship[] = [
  {
    id: 'int-1',
    title: 'Assistant Naval Architect Trainee',
    company: 'DNV Maritime Advisory',
    location: 'Hamburg, Germany 🇩🇪',
    duration: '6 Months',
    stipend: '€1,800 / Month',
    type: 'Naval Architecture'
  },
  {
    id: 'int-2',
    title: 'Engine Cadet Sea Training',
    company: 'Maersk Line A/S',
    location: 'Global Sea Voyages 🚢',
    duration: '12 Months Sea Time',
    stipend: '$1,200 / Month + Boarding',
    type: 'Engine Cadet'
  },
  {
    id: 'int-3',
    title: 'Container Terminal Operations Intern',
    company: 'PSA Singapore',
    location: 'Singapore 🇸🇬',
    duration: '3 Months',
    stipend: '$2,100 SGD / Month',
    type: 'Port Operations'
  }
];

export const InternshipPortalView: React.FC = () => {
  const [internships] = useState<Internship[]>(SAMPLE_INTERNSHIPS);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const handleApply = (id: string) => {
    setAppliedIds((prev) => [...prev, id]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5 text-sky-400" /> Maritime Cadet & Student Career Gateway
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Maritime Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">Internship Portal</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Apply to deck cadetships, naval architecture trainee programs, and port logistics internships with 1-click AI applications.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {internships.map((item) => {
          const isApplied = appliedIds.includes(item.id);
          return (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-sky-400 font-mono text-[10px] font-bold">{item.type}</span>
                <h3 className="font-bold text-sm text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 font-medium flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" /> {item.company}
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-bold">{item.stipend}</span>
                <button
                  onClick={() => handleApply(item.id)}
                  disabled={isApplied}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    isApplied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-black'
                  }`}
                >
                  {isApplied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{isApplied ? 'Applied' : 'Apply Now'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
