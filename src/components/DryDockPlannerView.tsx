import React, { useState } from 'react';
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Calendar,
  Layers,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface DryDockTask {
  id: string;
  category: string;
  taskName: string;
  estimatedDays: number;
  costUSD: number;
  status: 'Completed' | 'In Progress' | 'Scheduled' | 'Delayed';
  contractor: string;
}

const SAMPLE_DRYDOCK_TASKS: DryDockTask[] = [
  {
    id: 'dd-1',
    category: 'Hull & Coating',
    taskName: 'High Pressure Water Jetting & Anti-Fouling Paint (3 Coats)',
    estimatedDays: 4,
    costUSD: 145000,
    status: 'In Progress',
    contractor: 'Jotun / Shipyard Coating Crew'
  },
  {
    id: 'dd-2',
    category: 'Propulsion & Shafting',
    taskName: 'Tailshaft Withdrawal & Stern Tube Seal Replacement',
    estimatedDays: 5,
    costUSD: 98000,
    status: 'Scheduled',
    contractor: 'Wärtsilä Service Techs'
  },
  {
    id: 'dd-3',
    category: 'Valves & Sea Chests',
    taskName: 'Overhaul of 24x High & Low Sea Chest Valves',
    estimatedDays: 3,
    costUSD: 42000,
    status: 'Completed',
    contractor: 'Shipyard Piping Shop'
  },
  {
    id: 'dd-4',
    category: 'Anodes & Cathodic',
    taskName: 'Replacement of 180kg Sacrificial Zinc Anodes',
    estimatedDays: 1,
    costUSD: 18500,
    status: 'Completed',
    contractor: 'Corrosion Control Ltd'
  }
];

export const DryDockPlannerView: React.FC = () => {
  const [tasks, setTasks] = useState<DryDockTask[]>(SAMPLE_DRYDOCK_TASKS);

  const totalBudget = tasks.reduce((sum, t) => sum + t.costUSD, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
            <Wrench className="w-3.5 h-3.5 text-indigo-400" /> Class Special Survey & Dry Dock Module
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Shipyard <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Dry Dock Planner</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Schedule shipyard maintenance timelines, hull coating work scopes, tailshaft pulls, sea valve overhauls, and contractor budget tracking.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-bold block">Total Work Scope Budget</span>
          <span className="text-2xl font-mono font-black text-emerald-400">${totalBudget.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 block font-mono">DNV Class Approved Scope</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-bold block">Estimated Dock Duration</span>
          <span className="text-2xl font-mono font-black text-sky-400">12 Days</span>
          <span className="text-[10px] text-slate-400 block font-mono">Target Off-hire limit</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-bold block">Completed Work Items</span>
          <span className="text-2xl font-mono font-black text-emerald-400">2 / 4 Done</span>
          <span className="text-[10px] text-emerald-400 block font-mono">On Schedule</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-bold block">Dry Dock Location</span>
          <span className="text-sm font-bold text-white block mt-1">HRDD Shipyard (Shanghai)</span>
          <span className="text-[10px] text-slate-400 block font-mono">Dock No. 2</span>
        </div>
      </div>

      {/* Task Work List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" /> Dry Dock Work Breakdown Structure (WBS)
        </h3>

        <div className="space-y-3 text-xs">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-800 text-sky-400 text-[10px] font-mono rounded font-bold">{task.category}</span>
                  <span className="font-bold text-white text-sm">{task.taskName}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>Contractor: <strong className="text-slate-200">{task.contractor}</strong></span>
                  <span>Est: <strong className="text-slate-200">{task.estimatedDays} Days</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono font-bold text-emerald-400 text-sm">${task.costUSD.toLocaleString()}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono border ${
                  task.status === 'Completed'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : task.status === 'In Progress'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
