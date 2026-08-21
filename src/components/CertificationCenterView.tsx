import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Calendar
} from 'lucide-react';

interface CertItem {
  id: string;
  name: string;
  issuer: 'IMO / Flag State' | 'STCW' | 'DNV' | 'ABS' | 'IMarEST';
  issueDate: string;
  expiryDate: string;
  status: 'Valid' | 'Refresher Due' | 'Expired';
  progressPct: number;
}

const SAMPLE_CERTS: CertItem[] = [
  {
    id: 'crt-1',
    name: 'STCW II/2 Master Unlimited Endorsement',
    issuer: 'STCW',
    issueDate: '2022-03-15',
    expiryDate: '2027-03-15',
    status: 'Valid',
    progressPct: 100
  },
  {
    id: 'crt-2',
    name: 'Advanced Training for Oil & Chemical Tankers (STCW V/1-1)',
    issuer: 'IMO / Flag State',
    issueDate: '2021-11-10',
    expiryDate: '2026-11-10',
    status: 'Refresher Due',
    progressPct: 88
  },
  {
    id: 'crt-3',
    name: 'DNV Certified Hull Structural Inspector',
    issuer: 'DNV',
    issueDate: '2023-05-20',
    expiryDate: '2028-05-20',
    status: 'Valid',
    progressPct: 100
  },
  {
    id: 'crt-4',
    name: 'IMarEST Chartered Marine Engineer (CEng CMarEng)',
    issuer: 'IMarEST',
    issueDate: '2020-01-01',
    expiryDate: 'Life Membership (CPD Active)',
    status: 'Valid',
    progressPct: 100
  }
];

export const CertificationCenterView: React.FC = () => {
  const [certs] = useState<CertItem[]>(SAMPLE_CERTS);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-indigo-400" /> Professional Maritime Qualifications
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Maritime <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Certification & Renewal Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Track STCW certificates, Flag State endorsements, DNV/ABS surveyor licenses, and IMarEST Chartered Engineer renewals.
          </p>
        </div>
      </div>

      {/* Certs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-slate-800 text-sky-400 font-mono text-[10px] font-bold">{c.issuer}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
                c.status === 'Valid'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {c.status}
              </span>
            </div>

            <h3 className="font-bold text-sm text-white">{c.name}</h3>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Issue Date: {c.issueDate}</span>
                <span className="text-emerald-400">Expiry: {c.expiryDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
