import React, { useState } from 'react';
import { SAMPLE_JOBS } from '../data/maritimeData';
import { JobListing } from '../types';
import { Briefcase, MapPin, DollarSign, Clock, Building, Plus, CheckCircle2 } from 'lucide-react';

export const JobBoardView: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);

  const filteredJobs = SAMPLE_JOBS.filter((j) =>
    filterType === 'All' ? true : j.type === filterType
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Maritime Job & Internship Marketplace</h2>
            <p className="text-xs text-slate-400">Connect with DNV, Maersk, Subsea7, PSA, and Lloyd’s Register recruiters</p>
          </div>
        </div>

        <button
          onClick={() => alert("Post Job Listing Modal: Shipping companies and classification societies can sponsor listings.")}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Post Maritime Job ($199)</span>
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Full-time', 'Contract', 'Internship', 'Remote'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterType === t
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className={`bg-slate-900/90 border p-6 rounded-2xl transition shadow-xl space-y-4 ${
              job.sponsored ? 'border-amber-500/40 bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900' : 'border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {job.sponsored && (
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      SPONSORED
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-semibold">{job.company}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{job.title}</h3>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold text-emerald-400 font-mono block">{job.salaryRange}</span>
                <span className="text-[10px] text-slate-500">{job.postedDate}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300">{job.description}</p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-sky-400" /> {job.location}</span>
                <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-blue-400" /> {job.type}</span>
              </div>

              {appliedJobId === job.id ? (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" /> Application Submitted!
                </span>
              ) : (
                <button
                  onClick={() => setAppliedJobId(job.id)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition"
                >
                  Quick Apply with AI Resume
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
