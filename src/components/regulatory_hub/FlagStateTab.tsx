import React, { useState } from 'react';
import { FLAG_STATES_DATA } from './regulationsData';
import { FlagStateRequirement } from './regTypes';
import {
  Globe,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Award,
  Users,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Building
} from 'lucide-react';

export const FlagStateTab: React.FC = () => {
  const [selectedFlagId, setSelectedFlagId] = useState<string>('panama');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedFlag = FLAG_STATES_DATA.find((f) => f.id === selectedFlagId) || FLAG_STATES_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
              Flag State Administration Hub
            </span>
            <span className="text-xs text-slate-400">National Circulars, Safe Manning & RO Delegations</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Flag State Regulatory Intelligence & Marine Notices</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Requirements from Panama, Liberia, Marshall Islands, Bahamas, Singapore, and Bangladesh administrations.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flag circulars..."
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 w-64"
          />
        </div>
      </div>

      {/* Flag State Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {FLAG_STATES_DATA.map((flag) => {
          const isSelected = selectedFlagId === flag.id;
          return (
            <button
              key={flag.id}
              onClick={() => setSelectedFlagId(flag.id)}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                isSelected
                  ? 'bg-teal-950/30 border-teal-500 text-teal-300 shadow-sm shadow-teal-500/10'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <span className="text-2xl">{flag.flagEmoji}</span>
              <span className="font-bold text-xs text-white mt-0.5">{flag.flagCountry}</span>
              <span className="text-[10px] text-slate-400 font-mono">Rank #{flag.fleetRankGT} (GT)</span>
            </button>
          );
        })}
      </div>

      {/* Deep Flag Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Administration Details & Authorized ROs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedFlag.flagEmoji}</span>
              <div>
                <h3 className="text-base font-bold text-white">{selectedFlag.flagCountry}</h3>
                <span className="text-xs text-teal-400 font-medium">{selectedFlag.administrationName}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Authorized Recognized Organizations (ROs / Class Societies)
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selectedFlag.authorizedROs.map((ro, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300"
                  >
                    {ro}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Minimum Safe Manning Philosophy
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                {selectedFlag.minSafeManningOverview}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Statutory Exemption & Dispensation Policy
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                {selectedFlag.nationalExemptionPolicy}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Special Marine Notices & National Circulars */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" /> Active Marine Notices & National Circulars
              </h3>
              <span className="text-xs text-slate-400">{selectedFlag.specialNotices.length} Directives Indexed</span>
            </div>

            <div className="space-y-3">
              {selectedFlag.specialNotices.map((notice, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-xs text-teal-400 font-mono">{notice.noticeNumber}</span>
                    <span className="text-[10px] text-slate-400">Issued: {notice.dateIssued}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{notice.subject}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {notice.requirementSummary}
                  </p>
                  <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Applicability: All {selectedFlag.flagCountry} Registry Vessels</span>
                    <span className="text-teal-400 font-semibold">Mandatory National Law</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
