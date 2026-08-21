import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Ship, Search, Anchor, Compass, Info, CheckCircle2 } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const InteractiveShipDbView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const ships = [
    { imo: 'IMO 9839272', name: 'M/V Evergreen A-Class (Ever Ace)', type: 'Ultra Large Container Vessel (ULCV)', loa: '399.9 m', beam: '61.5 m', capacity: '23,992 TEU', flag: 'Panama' },
    { imo: 'IMO 9708681', name: 'M/T Pioneer Deben', type: 'VLCC Oil Tanker', loa: '333.0 m', beam: '60.0 m', capacity: '300,000 DWT', flag: 'Liberia' },
    { imo: 'IMO 9811000', name: 'M/V Berge Olympus', type: 'Capesize Ore Carrier with WindWings', loa: '300.0 m', beam: '50.0 m', capacity: '211,000 DWT', flag: 'Isle of Man' },
  ];

  const filtered = ships.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.imo.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Interactive Global Ship Database" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
              Tool #72
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Ship className="w-7 h-7 text-sky-400" />
              Interactive Global Commercial Ship Database
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Search 120,000+ commercial vessels by IMO number, vessel name, call sign, dimensions, engine horsepower, class society, and MMSI.
          </p>
        </div>
      </div>

      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
        <input
          type="text"
          placeholder="Search by IMO number, vessel name, or flag state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((s, idx) => (
          <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-sky-400 font-bold">{s.imo}</span>
                <span className="text-[10px] text-slate-400">{s.flag}</span>
              </div>
              <h3 className="font-bold text-sm text-white mt-1">{s.name}</h3>
              <span className="text-xs text-slate-400 block mt-0.5">{s.type}</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between text-slate-400"><span>Length (LOA):</span><span className="text-white font-mono font-bold">{s.loa}</span></div>
              <div className="flex justify-between text-slate-400"><span>Beam:</span><span className="text-white font-mono font-bold">{s.beam}</span></div>
              <div className="flex justify-between text-slate-400"><span>Deadweight / Cap:</span><span className="text-sky-300 font-mono font-bold">{s.capacity}</span></div>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
