import React, { useState } from 'react';
import { IACS_REQUIREMENTS_DATA } from './regulationsData';
import { IacsItem } from './regTypes';
import {
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Zap,
  Lock,
  Cpu,
  Anchor,
  Compass,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const IacsRulesTab: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIacs, setSelectedIacs] = useState<IacsItem>(IACS_REQUIREMENTS_DATA[0]);

  const types = ['All', 'UR', 'UI', 'CSR'];

  const filteredItems = IACS_REQUIREMENTS_DATA.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              IACS Integration Hub
            </span>
            <span className="text-xs text-slate-400">International Association of Classification Societies</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Unified Requirements (UR) & Unified Interpretations (UI)</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore IACS mandatory technical requirements (UR E26/E27 Cyber Resilience, UR S11A Hull Strength, CSR, and UR M67 Gas Engines).
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search UR E26, UR S11A, CSR..."
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedType === t
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {t === 'UR' ? 'Unified Requirements (UR)' : t === 'UI' ? 'Unified Interpretations (UI)' : t === 'CSR' ? 'Common Structural Rules (CSR)' : 'All IACS Standards'}
          </button>
        ))}
      </div>

      {/* Grid: Left List + Right Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: IACS Cards */}
        <div className="lg:col-span-5 space-y-3">
          {filteredItems.map((item) => {
            const isSelected = selectedIacs.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedIacs(item)}
                className={`p-4 rounded-2xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-950/30 border-blue-500/60 shadow-md shadow-blue-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-blue-300 border border-slate-800 font-mono">
                        {item.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{item.category}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1.5">{item.title}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    {item.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Mandatory Implementation: {item.implementationDate}</span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected IACS Inspector */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono">
                  {selectedIacs.code}
                </span>
                <span className="text-xs text-slate-400">{selectedIacs.category}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1.5">{selectedIacs.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                <span><strong>Adopted:</strong> {selectedIacs.adoptedDate}</span>
                <span><strong>Mandatory In-Force:</strong> {selectedIacs.implementationDate}</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              {selectedIacs.status}
            </span>
          </div>

          {/* Core Technical Scope */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-blue-400" /> Standard Overview & Scope
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 font-medium">
              {selectedIacs.summary}
            </p>
          </div>

          {/* Ship Design & Yard Impact */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Direct Impact on Ship Design & Construction
            </h4>
            <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200/90 leading-relaxed font-medium">
              {selectedIacs.impactOnDesign}
            </div>
          </div>

          {/* IACS Member Mandatory Rule */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Binding on DNV, ABS, LR, BV, ClassNK, RINA, CCS, KR, IRS
            </span>
            <span className="text-[11px] text-slate-500">IACS Resolution Series</span>
          </div>
        </div>
      </div>
    </div>
  );
};
