import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Globe, Search, MapPin, Building, Anchor, GraduationCap, Phone, ExternalLink } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const GlobalDirectoryView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const directory = [
    { name: 'HD Hyundai Heavy Industries (Ulsan Shipyard)', type: 'Shipyard', country: 'South Korea', details: 'World largest shipbuilding facility, 10 graving docks.' },
    { name: 'Port of Rotterdam Authority', type: 'Port', country: 'Netherlands', details: 'Largest port in Europe, automated container terminals.' },
    { name: 'NTNU Dept. of Marine Technology (Trondheim)', type: 'University', country: 'Norway', details: 'Leading ocean engineering research tank & hydrodynamic labs.' },
    { name: 'DNV Maritime Head Office (Høvik)', type: 'Classification Society', country: 'Norway', details: 'World leading classification society & advisory.' },
  ];

  const filtered = directory.filter((d) =>
    (d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.country.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === 'all' || d.type === typeFilter)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Global Maritime Directory" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Tool #65
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Globe className="w-7 h-7 text-cyan-400" />
              Worldwide Maritime Directory & Institutional Index
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Searchable global directory of major shipyards, commercial ports, naval architecture universities, classification societies, and shipping lines.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search directory by organization name, city, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-300 font-bold"
        >
          <option value="all">All Institution Types</option>
          <option value="Shipyard">Shipyards</option>
          <option value="Port">Ports</option>
          <option value="University">Universities</option>
          <option value="Classification Society">Classification Societies</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition">
            <div className="flex items-start justify-between">
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold border border-cyan-500/20">
                {item.type}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {item.country}
              </span>
            </div>

            <h3 className="font-bold text-sm text-white">{item.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.details}</p>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button className="text-xs text-cyan-400 font-bold hover:underline flex items-center gap-1">
                <span>View Full Profile</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
