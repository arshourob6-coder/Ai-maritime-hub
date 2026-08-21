import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Compass, Navigation, ShieldCheck, Wind, Cloud, MapPin } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const VoyagePlanningView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [departure, setDeparture] = useState('Rotterdam, Netherlands');
  const [destination, setDestination] = useState('Singapore');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Voyage Passage Planning" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
              Tool #95
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Compass className="w-7 h-7 text-sky-400" />
              IMO Resolution A.893(21) Passage Planning & Weather Routing
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            4-stage voyage planning (Appraisal, Planning, Execution, Monitoring), ECA zone fuel switching, and weather-optimized routes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400" /> Route Waypoints
          </h3>

          <div>
            <label className="text-xs text-slate-400 block">Port of Departure</label>
            <input
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block">Port of Arrival</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 lg:col-span-2">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Navigation className="w-4 h-4 text-sky-400" /> Route Optimization Metrics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block">Great Circle Distance</span>
              <span className="text-base font-black font-mono text-white">8,350 NM</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block">Fuel Savings Route</span>
              <span className="text-base font-black font-mono text-emerald-400">-4.8% VLSFO</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block">Estimated ETA</span>
              <span className="text-base font-black font-mono text-sky-300">22d 14h</span>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
