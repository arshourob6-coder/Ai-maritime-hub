import React, { useState } from 'react';
import { PlanType, Currency } from '../../types';
import { DocumentJobItem } from './docTypes';
import {
  Clock,
  HardDrive,
  Trash2,
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface HistoryStorageTabProps {
  userPlan: PlanType;
  historyJobs: DocumentJobItem[];
  onDeleteJob: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryStorageTab: React.FC<HistoryStorageTabProps> = ({
  userPlan,
  historyJobs,
  onDeleteJob,
  onClearAll
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = historyJobs.filter(j => 
    j.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.sourceFormat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.targetFormat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Compute used storage
  const totalStorageBytes = historyJobs.reduce((acc, curr) => acc + (curr.convertedSize || curr.originalSize), 0);
  const totalStorageMB = (totalStorageBytes / (1024 * 1024)).toFixed(2);
  const maxStorageLimitMB = userPlan === 'free' ? 50 : userPlan === 'student' ? 500 : userPlan === 'professional' ? 2000 : userPlan === 'pro_plus' ? 10000 : 50000;
  const storagePercentage = Math.min(100, Math.round((parseFloat(totalStorageMB) / maxStorageLimitMB) * 100));

  return (
    <div className="space-y-6">
      {/* Storage & Privacy Controls Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl">
            <HardDrive className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400 font-medium">Temporary Cloud Storage</span>
              <span className="text-white font-bold font-mono">{totalStorageMB} MB / {maxStorageLimitMB} MB</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all"
                style={{ width: `${Math.max(5, storagePercentage)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Auto-Purge Active</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Documents auto-delete after 24 hours</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white block">Privacy Actions</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Purge all files immediately</span>
          </div>
          <button
            onClick={onClearAll}
            disabled={historyJobs.length === 0}
            className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge All</span>
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Conversion & AI Logs</h3>
            <span className="text-[11px] font-mono text-cyan-400 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700">
              {filteredJobs.length} Files
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search filename or format..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 w-full sm:w-64"
            />
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
            <FileText className="w-8 h-8 text-slate-700 mx-auto mb-2" />
            <span>No document history found. Convert files or run AI document tools to see your activity logs.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  <th className="pb-3 pl-2">File Name</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Size</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Auto-Delete</th>
                  <th className="pb-3 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-2 max-w-xs truncate">
                        <FileText className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="text-white font-medium truncate">{job.fileName}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-mono rounded border border-slate-700 text-[10px]">
                        {job.sourceFormat} → {job.targetFormat}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300 font-mono">
                      {formatFileSize(job.convertedSize || job.originalSize)}
                    </td>
                    <td className="py-3 text-slate-400 font-mono text-[11px]">
                      {job.timestamp}
                    </td>
                    <td className="py-3 text-amber-400 font-mono text-[11px]">
                      in 23h 48m
                    </td>
                    <td className="py-3 text-right pr-2 space-x-2">
                      <a
                        href={job.downloadUrl || '#'}
                        download={job.fileName}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                      <button
                        onClick={() => onDeleteJob(job.id)}
                        className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete now"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
