import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Cpu, Search, Cog, Zap, Sliders, FileText } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MarineEquipmentDbView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const equipment = [
    { model: 'MAN B&W 11G95ME-C9.5', category: '2-Stroke Main Diesel Engine', power: '68,530 kW @ 80 RPM', sfc: '162 g/kWh', manufacturer: 'MAN Energy Solutions' },
    { model: 'Wärtsilä 31 Dual Fuel (DF)', category: '4-Stroke Auxiliary / Main Engine', power: '9,800 kW @ 750 RPM', sfc: '165 g/kWh', manufacturer: 'Wärtsilä' },
    { model: 'Alfa Laval PureBallast 3.2', category: 'Ballast Water Treatment System (BWTS)', power: '1,500 m3/h UV Flow', sfc: '45 kW', manufacturer: 'Alfa Laval' },
  ];

  const filtered = equipment.filter((e) => e.model.toLowerCase().includes(searchTerm.toLowerCase()) || e.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Marine Machinery & Equipment DB" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
              Tool #73
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Cpu className="w-7 h-7 text-violet-400" />
              Marine Machinery Specs & Equipment Database
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Searchable technical specs for 2-stroke diesel engines, dual-fuel LNG/methanol systems, ballast water treatment plants, boilers, and pumps.
          </p>
        </div>
      </div>

      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
        <input
          type="text"
          placeholder="Search by equipment model, manufacturer, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">{item.manufacturer}</span>
              <h3 className="font-bold text-sm text-white mt-1">{item.model}</h3>
              <span className="text-xs text-slate-400 block mt-0.5">{item.category}</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between text-slate-400"><span>Power Output:</span><span className="text-violet-300 font-mono font-bold">{item.power}</span></div>
              <div className="flex justify-between text-slate-400"><span>SFOC / Energy:</span><span className="text-white font-mono font-bold">{item.sfc}</span></div>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
