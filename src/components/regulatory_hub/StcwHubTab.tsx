import React, { useState } from 'react';
import { STCW_REQUIREMENTS_DATA } from './regulationsData';
import { StcwRequirement } from './regTypes';
import {
  Users,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Award,
  Clock,
  Calendar,
  Shield,
  FileCheck,
  GraduationCap,
  Flame,
  Zap,
  Ship,
  Sparkles,
  Info
} from 'lucide-react';

export const StcwHubTab: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReq, setSelectedReq] = useState<StcwRequirement>(STCW_REQUIREMENTS_DATA[0]);

  const departments = ['All', 'Deck', 'Engine', 'Electro-Technical', 'Special Cargo (Tanker/IGF/Polar)', 'All Crew'];

  const filteredReqs = STCW_REQUIREMENTS_DATA.filter((r) => {
    const matchesDept = selectedDept === 'All' || r.rankDepartment === selectedDept;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.codeSection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              STCW 1978 / 2010 Manila Amendments
            </span>
            <span className="text-xs text-slate-400">Competency Tables, Watchkeeping & Rest Hours</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Standards of Training, Certification & Watchkeeping Hub</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Requirements for Master, Chief Mate, OOW, Chief Engineer, 2nd Engineer, ETO, Tanker/IGF endorsements and mandatory rest hours.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ranks, tables, or courses..."
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-64"
          />
        </div>
      </div>

      {/* Department Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedDept === dept
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Main Layout: Left List + Right Deep Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Requirements Cards */}
        <div className="lg:col-span-5 space-y-3">
          {filteredReqs.map((req) => {
            const isSelected = selectedReq.id === req.id;
            return (
              <div
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className={`p-4 rounded-2xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/30 border-indigo-500/60 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-indigo-300 border border-slate-800 font-mono">
                        {req.codeSection}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{req.rankDepartment}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1.5">{req.title}</h4>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {req.summary}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{req.chapter}</span>
                  <span className="text-indigo-400 font-semibold flex items-center gap-1">
                    {req.mandatoryCertificates.length} Mandatory Modules
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected STCW Requirement Deep Inspector */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-mono">
                  {selectedReq.codeSection}
                </span>
                <span className="text-xs text-slate-400">{selectedReq.chapterTitle}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1.5">{selectedReq.title}</h3>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-indigo-400 shrink-0">
              {selectedReq.rankDepartment}
            </span>
          </div>

          {/* Competency Table Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" /> Mandatory Standard of Competence
            </h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-300">{selectedReq.competencyTable}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedReq.summary}</p>
            </div>
          </div>

          {/* Rest Hours Highlight if applicable */}
          {selectedReq.restHoursMandate && (
            <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Mandatory Rest Hours Law (STCW Section A-VIII/1)
              </h4>
              <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
                {selectedReq.restHoursMandate}
              </p>
            </div>
          )}

          {/* Mandatory Certificates & Courses List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Mandatory Prerequisites & Certificates of Proficiency (CoP)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedReq.mandatoryCertificates.map((cert, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revalidation Cycle */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              Revalidation: {selectedReq.revalidationPeriodYears > 0 ? `Every ${selectedReq.revalidationPeriodYears} Years (Refresher Courses & Sea Service)` : 'Ongoing Operational Watchkeeping'}
            </span>
            <span className="text-indigo-400 font-medium">Flag Endorsement Required</span>
          </div>
        </div>
      </div>
    </div>
  );
};
