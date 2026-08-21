import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { BookOpen, Search, ShieldAlert, FileText, CheckCircle, Sparkles, Scale, ExternalLink } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MaritimeRegulationsView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [searchTerm, setSearchTerm] = useState('MARPOL Annex VI NOx Tier III');
  const [selectedConvention, setSelectedConvention] = useState('MARPOL');
  const [aiSummary, setAiSummary] = useState<string | null>(
    'MARPOL Annex VI Tier III standards apply to marine diesel engines installed on ships constructed on or after 1 January 2016 operating in NOx Emission Control Areas (ECAs). Requires SCR (Selective Catalytic Reduction) or EGR (Exhaust Gas Recirculation) to reduce NOx emissions by 80% compared to Tier I.'
  );

  const conventions = [
    { code: 'SOLAS', name: 'Safety of Life at Sea (1974/1988)', chapters: 14 },
    { code: 'MARPOL', name: 'Prevention of Pollution from Ships (73/78)', annexes: 6 },
    { code: 'STCW', name: 'Standards of Training & Watchkeeping (2010)', sections: 8 },
    { code: 'MLC', name: 'Maritime Labour Convention (2006)', titles: 5 },
    { code: 'COLREG', name: 'International Regulations for Preventing Collisions', rules: 41 },
    { code: 'ISM', name: 'International Safety Management Code', clauses: 16 }
  ];

  const handleSearch = () => {
    setAiSummary(
      `AI analysis for "${searchTerm}" under ${selectedConvention}: Fully compliant with IMO resolution MEPC.328(76). Requires verified EEXI technical file and SEEMP Part III onboard for all vessels ≥5,000 GT.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Regulations Hub" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Tool #29
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Scale className="w-7 h-7 text-emerald-400" />
              IMO & Maritime Regulations AI Hub
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Search SOLAS, MARPOL, STCW, MLC, COLREG, and class society rules with AI simplified explanations, clause lookups, and compliance guidelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Conventions List */}
        <div className="lg:col-span-4 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Major Conventions
          </h3>

          <div className="space-y-2">
            {conventions.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedConvention(c.code)}
                className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between ${
                  selectedConvention === c.code
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="font-black text-sm">{c.code}</div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{c.name}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* AI Query & Search Result */}
        <div className="lg:col-span-8 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., SOLAS Chapter II-2 Fire Protection Requirements"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleSearch}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Search</span>
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                AI Executive Summary & Clause Interpretation
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Convention: {selectedConvention}</span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-sans">{aiSummary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <div className="text-slate-400 font-bold mb-1">Mandatory Equipment</div>
                <div className="text-emerald-300">Continuous Emission Monitoring System (CEMS) & NOx Technical File</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <div className="text-slate-400 font-bold mb-1">PSC Inspection Priority</div>
                <div className="text-amber-300">High Priority (Defect results in detention under Paris MoU)</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => onOpenPricing && onOpenPricing('professional')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold rounded-xl text-xs transition border border-slate-700"
            >
              Export IMO Regulatory Compliance Checklist (PDF)
            </button>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
