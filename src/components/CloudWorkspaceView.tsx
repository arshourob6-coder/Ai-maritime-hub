import React from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType, ViewMode } from '../types';
import { Cloud, File, Upload, Lock, Download, Trash2, FileSpreadsheet, ArrowRight, Database } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onNavigateView?: (view: ViewMode) => void;
}

export const CloudWorkspaceView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing, onNavigateView }) => {
  const files = [
    { name: 'Capesize_Hull_Lines_v3.IGES', type: '3D CAD', size: '142 MB', modified: '2 hours ago' },
    { name: 'Stability_Booklet_Class_Approval.pdf', type: 'PDF Document', size: '18.4 MB', modified: 'Yesterday' },
    { name: 'Wageningen_Propeller_OpenWater.csv', type: 'Dataset', size: '2.1 MB', modified: '3 days ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Cloud Workspace & CAD Vault" />

      {/* Google Forms Featured Banner */}
      <div className="bg-gradient-to-r from-purple-900/80 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 flex items-center gap-1">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Workspace Integration
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
              <Database className="w-3.5 h-3.5" /> Firebase Firestore
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Google Forms Maritime Audit & Survey Suite
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Create SOLAS safety checklists, MARPOL carbon intensity questionnaires, and crew welfare surveys in Google Forms. Synced directly with Firebase Firestore.
          </p>
        </div>

        <button
          onClick={() => onNavigateView && onNavigateView('google_forms')}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl transition shadow-lg flex items-center gap-2 shrink-0 text-xs"
        >
          <span>Open Google Forms Hub</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Tool #63
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Cloud className="w-7 h-7 text-indigo-400" />
              Secure Encrypted Cloud Workspace
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Store, collaborate, version control, and backup 3D CAD files, CFD mesh files, stability booklets, and research thesis drafts.
          </p>
        </div>

        <button
          onClick={() => onOpenPricing && onOpenPricing('professional')}
          className="px-5 py-3 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-2xl transition shadow-lg flex items-center gap-2 shrink-0 text-xs"
        >
          <Upload className="w-4 h-4" />
          <span>Upload File to Vault</span>
        </button>
      </div>

      <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
          <span className="font-bold text-slate-300">Storage Usage: <strong className="text-indigo-400">162.5 MB / 50 GB</strong></span>
          <span className="text-emerald-400 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> AES-256 Encrypted</span>
        </div>

        <div className="space-y-2">
          {files.map((f, idx) => (
            <div key={idx} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">{f.name}</h4>
                  <span className="text-[10px] text-slate-500">{f.type} • {f.size} • {f.modified}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <button className="p-1.5 hover:text-white"><Download className="w-4 h-4" /></button>
                <button className="p-1.5 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};

