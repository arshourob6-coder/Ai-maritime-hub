import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  Layers,
  Sparkles,
  BookOpen,
  Award,
  Check,
  X
} from 'lucide-react';

interface ComplianceRule {
  id: string;
  convention: 'SOLAS' | 'MARPOL' | 'STCW' | 'MLC 2006' | 'ISM Code' | 'ISPS Code' | 'Hong Kong Convention';
  title: string;
  reference: string;
  description: string;
  status: 'Compliant' | 'Pending Audit' | 'Gap Identified';
  requiredItems: string[];
}

const SAMPLE_COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: 'solas-ii1',
    convention: 'SOLAS',
    title: 'Intact & Damage Stability Requirements',
    reference: 'SOLAS Ch. II-1, Reg. 5-1',
    description: 'Vessels must be supplied with stability information approved by Flag State / Class Society matching actual Lightship weight.',
    status: 'Compliant',
    requiredItems: ['Approved Stability Booklet', 'Onboard Loading Computer Software Certification', 'Inclining Experiment Report']
  },
  {
    id: 'marpol-vi',
    convention: 'MARPOL',
    title: 'Annex VI - Fuel Oil Sulfur Cap & CII Data',
    reference: 'MARPOL Annex VI, Reg. 14 & 28',
    description: 'Global fuel sulfur limit 0.50% m/m (0.10% in ECA zones). SEEMP Part III mandatory for carbon intensity data collection.',
    status: 'Compliant',
    requiredItems: ['Bunker Delivery Notes (BDN)', 'IAPP Certificate', 'Approved SEEMP Part III Plan']
  },
  {
    id: 'stcw-v1',
    convention: 'STCW',
    title: 'Watchkeeping Standards & Rest Hours',
    reference: 'STCW Code Section A-VIII/1',
    description: 'Minimum 10 hours rest in any 24-hour period, divided into no more than two periods. Hours of rest logs must be maintained.',
    status: 'Compliant',
    requiredItems: ['Seafarer Certificate of Competency (CoC)', 'Hours of Rest Software Records', 'STCW Endorsement Letters']
  },
  {
    id: 'mlc-2006',
    convention: 'MLC 2006',
    title: 'Maritime Labour Convention - Accommodation & Catering',
    reference: 'MLC Title 3 & Title 4',
    description: 'Seafarer living quarters, food quality, medical care, and financial security for repatriation (P&I Certificate).',
    status: 'Compliant',
    requiredItems: ['Maritime Labour Certificate (MLC)', 'DMLC Part I & Part II', 'Financial Security Certificate']
  },
  {
    id: 'ism-code',
    convention: 'ISM Code',
    title: 'Safety Management System (SMS) Audit',
    reference: 'ISM Code Reg. 9 & 12',
    description: 'Non-conformity reporting, emergency drill execution, and annual Internal/External ISM Safety Audits.',
    status: 'Pending Audit',
    requiredItems: ['Document of Compliance (DOC)', 'Safety Management Certificate (SMC)', 'Near-Miss Incident Register']
  }
];

export const ComplianceCenterView: React.FC = () => {
  const [selectedConvention, setSelectedConvention] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [rules, setRules] = useState<ComplianceRule[]>(SAMPLE_COMPLIANCE_RULES);

  const filteredRules = rules.filter(r => {
    const matchesConvention = selectedConvention === 'All' || r.convention === selectedConvention;
    const matchesQuery = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesConvention && matchesQuery;
  });

  const toggleStatus = (id: string) => {
    setRules(prev => prev.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === 'Compliant' ? 'Gap Identified' : 'Compliant';
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> IMO International Maritime Conventions
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Maritime <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Compliance & Audit Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Automated compliance audits for IMO SOLAS, MARPOL, STCW, MLC 2006, ISM/ISPS, and Hong Kong Ship Recycling Convention.
          </p>
        </div>
      </div>

      {/* Convention Filter Buttons */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {['All', 'SOLAS', 'MARPOL', 'STCW', 'MLC 2006', 'ISM Code', 'ISPS Code', 'Hong Kong Convention'].map((conv) => (
          <button
            key={conv}
            onClick={() => setSelectedConvention(conv)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedConvention === conv
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {conv}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-2 text-xs">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search regulation, SOLAS chapter, or MARPOL annex..."
          className="w-full bg-transparent text-white outline-none"
        />
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => (
          <div key={rule.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-slate-800 text-sky-400 font-mono text-[10px] rounded-full font-bold border border-slate-700">
                {rule.convention} • {rule.reference}
              </span>
              <button
                onClick={() => toggleStatus(rule.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono border transition ${
                  rule.status === 'Compliant'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {rule.status === 'Compliant' ? '✓ COMPLIANT' : '⚠ AUDIT GAP'}
              </button>
            </div>

            <h3 className="font-extrabold text-sm text-white">{rule.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Required Documentation</span>
              <ul className="space-y-1 text-xs text-slate-300">
                {rule.requiredItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
