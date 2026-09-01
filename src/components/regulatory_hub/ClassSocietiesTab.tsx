import React, { useState } from 'react';
import { CLASS_SOCIETIES_DATA } from './regulationsData';
import { ClassSocietyRuleItem } from './regTypes';
import {
  Award,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Layers,
  Sparkles,
  Sliders,
  ExternalLink,
  ChevronRight,
  Anchor,
  Zap,
  Globe
} from 'lucide-react';

export const ClassSocietiesTab: React.FC = () => {
  const [selectedSocietyCode, setSelectedSocietyCode] = useState<string>('DNV');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedSociety =
    CLASS_SOCIETIES_DATA.find((s) => s.societyCode === selectedSocietyCode) || CLASS_SOCIETIES_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Classification Society Rules Hub
            </span>
            <span className="text-xs text-slate-400">Searchable Rulebooks & Class Notations</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Classification Societies Technical Rules & Notations</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare DNV, ABS, Lloyd's Register, Bureau Veritas, ClassNK, RINA, and CCS hull, machinery, and green notations.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search class notations, rules..."
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-64"
          />
        </div>
      </div>

      {/* Society Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {CLASS_SOCIETIES_DATA.map((soc) => {
          const isSelected = selectedSocietyCode === soc.societyCode;
          return (
            <button
              key={soc.id}
              onClick={() => setSelectedSocietyCode(soc.societyCode)}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                isSelected
                  ? 'bg-amber-950/30 border-amber-500 text-amber-300 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <span className="text-2xl">{soc.flagEmoji}</span>
              <span className="font-bold text-sm text-white mt-0.5">{soc.societyCode}</span>
              <span className="text-[10px] text-slate-400 truncate w-full">{soc.country}</span>
            </button>
          );
        })}
      </div>

      {/* Deep Rulebook Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Society Meta */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedSociety.flagEmoji}</span>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedSociety.societyName} ({selectedSociety.societyCode})</h3>
                  <span className="text-xs text-slate-400">{selectedSociety.country} • Headquartered</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 border border-slate-800 text-amber-400">
                Edition {selectedSociety.latestUpdateYear}
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Governing Rule Reference</span>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-mono">
                {selectedSociety.ruleDocRef}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Technical Philosophy</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                {selectedSociety.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Right Notations & Modules */}
        <div className="lg:col-span-7 space-y-4">
          {/* Class Notations Showcase */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Representative Class Notations ({selectedSociety.societyCode})
              </h3>
              <span className="text-xs text-slate-400 font-mono">IACS Recognized</span>
            </div>

            <div className="space-y-2">
              {selectedSociety.classNotationsSample.map((notation, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 text-slate-200 font-medium">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{notation}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Notation Code
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Survey Cycles & Structural Strength */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" /> Class Survey Regime & Condition Assessment
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong>Annual Survey:</strong> General visual inspection of hull, weather decks, closures, machinery, and safety systems.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong>Intermediate Survey (Year 2/3):</strong> Includes internal examination of ballast tanks and expanded machinery checks.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong>Special Survey (Class Renewal - Year 5):</strong> Thorough structural close-up surveys, ultrasonic thickness measurements (UTM), pressure testing of tanks, and drydocking inspection of bottom plating, sea chests, rudder, and propeller.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
