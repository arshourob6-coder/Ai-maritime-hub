import React, { useState } from 'react';
import { REGULATORY_AMENDMENTS_DATA } from './regulationsData';
import { RegulatoryAmendment } from './regTypes';
import {
  Calendar,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  FileText,
  Layers,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

export const AmendmentTrackerTab: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const statuses = ['All', 'In Force', 'Coming Soon 2026', 'Adopted (2027/2028)'];

  const filteredAmendments = REGULATORY_AMENDMENTS_DATA.filter((item) => {
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesSearch =
      item.resolutionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.conventionOrBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Future Compliance Horizon
            </span>
            <span className="text-xs text-slate-400">2024–2028 Statutory Implementation Roadmap</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Regulatory Amendments & Resolutions Timeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track adopted IMO resolutions, MEPC carbon mandates, IACS UR effective dates, and new SOLAS safety updates.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search amendments, resolutions..."
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-64"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedStatus === st
                ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="space-y-4">
        {filteredAmendments.map((amend) => (
          <div
            key={amend.id}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-slate-700 transition"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-950 text-amber-300 border border-slate-800 font-mono">
                    {amend.resolutionNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-300">{amend.conventionOrBody}</span>
                  <span className="text-xs text-slate-400">• Adopted: {amend.adoptedDate}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1.5">{amend.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  In Force: <strong>{amend.entryIntoForceDate}</strong>
                </span>
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    amend.status === 'In Force'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {amend.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 font-medium">
              {amend.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Affected Ship Types</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {amend.affectedShipTypes.map((type, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800 text-slate-300">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-amber-950/20 p-3.5 rounded-xl border border-amber-500/20 text-amber-200">
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Required Shipowner Actions</span>
                <ul className="space-y-1 mt-1.5">
                  {amend.actionRequired.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
