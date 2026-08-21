import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Users, FolderPlus, FileCode, MessageSquare, History, Lock, Plus, Share2 } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const CollaborationWorkspaceView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [activeProject, setActiveProject] = useState('18,000 TEU Container Ship Hull FEA');

  const projects = [
    { name: '18,000 TEU Container Ship Hull FEA', members: 6, files: 12, lastModified: '10 mins ago', status: 'Active' },
    { name: 'Offshore Substation Jacket Foundation Design', members: 4, files: 8, lastModified: '2 hours ago', status: 'Active' },
    { name: 'LNG Fuel Tank Thermal Insulation Analysis', members: 3, files: 5, lastModified: 'Yesterday', status: 'In Review' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Team Collaboration Workspace" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              Tool #40
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Users className="w-7 h-7 text-blue-400" />
              Team Engineering Collaboration Workspace
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Shared naval architecture projects, version-controlled CAD & calculation sheets, real-time comments, and role-based access control.
          </p>
        </div>

        <button
          onClick={() => onOpenPricing && onOpenPricing('enterprise')}
          className="px-5 py-3 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black rounded-2xl transition flex items-center gap-2"
        >
          <FolderPlus className="w-4 h-4" />
          <span>New Team Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Project List */}
        <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-blue-400 uppercase tracking-wider">Active Workspace Projects</h3>

          <div className="space-y-2">
            {projects.map((p) => (
              <button
                key={p.name}
                onClick={() => setActiveProject(p.name)}
                className={`w-full text-left p-4 rounded-2xl border transition ${
                  activeProject === p.name
                    ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="font-bold text-sm">{p.name}</div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                  <span>{p.members} Engineers</span>
                  <span>•</span>
                  <span>{p.files} Files</span>
                  <span>•</span>
                  <span className="text-blue-400">{p.lastModified}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-white">{activeProject}</h2>
              <span className="text-xs text-slate-400">Enterprise Cloud Sync Enabled</span>
            </div>
            <button
              onClick={() => onOpenPricing && onOpenPricing('enterprise')}
              className="px-3 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold rounded-xl text-xs"
            >
              Invite Teammates
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase">Version History & CAD Assets</h4>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-sky-400" />
                <span className="text-white font-medium">Hull_Mesh_rev4.3.igs</span>
              </div>
              <span className="text-slate-400 text-[10px]">Updated by Chief Naval Architect • 10m ago</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-medium">Stability_Booklet_DNV_Approved.pdf</span>
              </div>
              <span className="text-slate-400 text-[10px]">Approved • Yesterday</span>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
