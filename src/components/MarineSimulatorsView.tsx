import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType, ViewMode } from '../types';
import { RotateCcw, Compass, Navigation, Activity, Wind } from 'lucide-react';
import { OffshoreWindDashboardView } from './OffshoreWindDashboardView';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: ViewMode) => void;
}

export const MarineSimulatorsView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing, onSelectView }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'offshore_wind'>('offshore_wind');
  const [isRunning, setIsRunning] = useState(false);
  const [heading] = useState(240);
  const [speed, setSpeed] = useState(14.5);
  const [rudder, setRudder] = useState(0);

  return (
    <div className="space-y-6">
      {/* Sub-header tab toggle inside MarineSimulatorsView */}
      <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between">
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-bold shadow">
          <button
            onClick={() => setActiveTab('offshore_wind')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'offshore_wind'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wind className="w-4 h-4 text-cyan-300" />
            <span>Offshore Wind SCADA Telemetry & AI Digital Twin</span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'simulator'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 text-teal-300" />
            <span>6-DOF Bridge & Engine Maneuvering Sim</span>
          </button>
        </div>
      </div>

      {activeTab === 'offshore_wind' ? (
        <OffshoreWindDashboardView userPlan={userPlan} onOpenPricing={onOpenPricing} onSelectView={onSelectView} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-6 text-slate-100">
          <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Browser Marine Simulators" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                  Tool #78
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <Compass className="w-7 h-7 text-teal-400" />
                  Interactive Marine Engineering & Bridge Simulators
                </h1>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                Browser-native real-time physics simulators: ship handling & maneuvering, engine telegraph control, cargo ballasting, and wind wave response.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-400" /> 6-DOF Ship Maneuvering & Bridge Simulator
              </h3>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                  isRunning ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                }`}
              >
                {isRunning ? 'Pause Simulation' : 'Start Simulation'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 block">Bridge Controls</span>
                <div>
                  <label className="text-[11px] text-slate-400 flex justify-between">
                    <span>Rudder Angle</span>
                    <span className="font-mono text-teal-300">{rudder}°</span>
                  </label>
                  <input
                    type="range"
                    min="-35"
                    max="35"
                    value={rudder}
                    onChange={(e) => setRudder(Number(e.target.value))}
                    className="w-full accent-teal-400 mt-1"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 flex justify-between">
                    <span>Engine Speed</span>
                    <span className="font-mono text-teal-300">{speed} knots</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full accent-teal-400 mt-1"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center items-center text-center space-y-2 col-span-2">
                <div className="w-24 h-24 rounded-full border-2 border-teal-500/40 flex items-center justify-center relative">
                  <Navigation className="w-8 h-8 text-teal-400 transform transition-transform" style={{ transform: `rotate(${heading}deg)` }} />
                </div>
                <span className="text-xs font-mono font-bold text-white">Heading: {heading}° | Speed: {speed} knots</span>
                <span className="text-[11px] text-slate-400">Rudder response active • Seakeeping Beaufort Scale 4</span>
              </div>
            </div>
          </div>

          <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
        </div>
      )}
    </div>
  );
};
