import React, { useState } from 'react';
import { SOLAS_CHAPTERS_DATA } from './regulationsData';
import { SolasChapter } from './regTypes';
import {
  Shield,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  ExternalLink,
  Flame,
  LifeBuoy,
  Radio,
  Compass,
  Lock,
  Anchor,
  Sliders,
  CheckSquare
} from 'lucide-react';

export const SolasHubTab: React.FC = () => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(1); // Chapter II-1 default
  const [expandedRegs, setExpandedRegs] = useState<Record<string, boolean>>({ 'Reg. II-1/3-1 & 3-8': true });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [checklistFilter, setChecklistFilter] = useState<'All' | 'Equipment' | 'Stability' | 'Fire'>('All');

  const selectedChapter = SOLAS_CHAPTERS_DATA[selectedChapterIndex] || SOLAS_CHAPTERS_DATA[0];

  const toggleRegExpand = (regNumber: string) => {
    setExpandedRegs((prev) => ({ ...prev, [regNumber]: !prev[regNumber] }));
  };

  const getChapterIcon = (roman: string) => {
    switch (roman) {
      case 'I': return <FileText className="w-4 h-4 text-slate-400" />;
      case 'II-1': return <Sliders className="w-4 h-4 text-cyan-400" />;
      case 'II-2': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'III': return <LifeBuoy className="w-4 h-4 text-emerald-400" />;
      case 'IV': return <Radio className="w-4 h-4 text-blue-400" />;
      case 'V': return <Compass className="w-4 h-4 text-teal-400" />;
      case 'IX': return <Award className="w-4 h-4 text-purple-400" />;
      case 'XI-1 / XI-2': return <Lock className="w-4 h-4 text-amber-400" />;
      case 'XIV / XV': return <Anchor className="w-4 h-4 text-sky-400" />;
      default: return <Shield className="w-4 h-4 text-emerald-400" />;
    }
  };

  const filteredRegulations = selectedChapter.keyRegulations.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              SOLAS 1974 Hub
            </span>
            <span className="text-xs text-slate-400">Chapters I through XV Detailed Regulatory Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">International Convention for the Safety of Life at Sea</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Full statutory breakdown of construction, stability, fire protection, LSA, navigation, ISM, and ISPS mandates.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search regulations in chapter..."
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-64"
          />
        </div>
      </div>

      {/* Chapters Navigation Horizontal Rail */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
        {SOLAS_CHAPTERS_DATA.map((ch, idx) => {
          const isSelected = selectedChapterIndex === idx;
          return (
            <button
              key={ch.chapter}
              onClick={() => setSelectedChapterIndex(idx)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300 shadow-sm shadow-cyan-500/10'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {getChapterIcon(ch.roman)}
              <span>{ch.chapter}: {ch.roman}</span>
            </button>
          );
        })}
      </div>

      {/* Chapter Overview & Deep Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chapter Meta & Associated Certificates */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {selectedChapter.chapter}
              </span>
              <span className="text-xs text-slate-400 font-medium">{selectedChapter.checklistsCount} Audit Items</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{selectedChapter.title}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                {selectedChapter.description}
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Associated Statutory Certificates
              </h4>
              <div className="space-y-1.5">
                {selectedChapter.certificatesAssociated.map((cert, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick SOLAS Summary Facts */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Compliance Enforcement
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>Statutory surveys must occur within a ±3 month window of the vessel's annual anniversary date.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>Non-compliance with Chapter II-2 (Fire) or Chapter III (LSA) are primary grounds for immediate PSC detention.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Regulations Accordion & Detailed Breakdown */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" /> Key Regulations in {selectedChapter.chapter}
            </h3>
            <span className="text-xs text-slate-400">{filteredRegulations.length} Regulations Indexed</span>
          </div>

          <div className="space-y-3">
            {filteredRegulations.map((reg) => {
              const isExpanded = !!expandedRegs[reg.regNumber];
              return (
                <div
                  key={reg.regNumber}
                  className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden transition"
                >
                  <div
                    onClick={() => toggleRegExpand(reg.regNumber)}
                    className="p-4 cursor-pointer hover:bg-slate-850 flex items-start justify-between gap-3 select-none"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                          {reg.regNumber}
                        </span>
                        <span className="text-xs font-bold text-white">{reg.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1.5">{reg.summary}</p>
                    </div>

                    <button className="p-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/60 space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Applicability</span>
                          <p className="text-slate-200 font-medium mt-0.5">{reg.applicability}</p>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Legal Classification</span>
                          <p className="text-emerald-400 font-medium mt-0.5">{reg.legalType}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                          Mandatory Equipment, Plans & Manuals Required Onboard
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                          {reg.requiredEquipmentOrDoc.map((item, idx) => (
                            <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-slate-300">
                              <CheckSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-slate-400">
                        <span><strong>Amendment History:</strong> {reg.amendmentsHistory}</span>
                        <span className="text-cyan-400 font-medium flex items-center gap-1">
                          Verified RAG Source <Shield className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
