import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Building, Search, Globe, Ship, Users, ExternalLink, ShieldCheck } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const CompanyIntelligenceView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const companies = [
    { name: 'A.P. Moller - Maersk', type: 'Container Shipping Line', hq: 'Copenhagen, Denmark', fleet: '740+ Vessels', employees: '100,000+' },
    { name: 'HD Hyundai Heavy Industries', type: 'Shipbuilding & Marine Engineering', hq: 'Ulsan, South Korea', fleet: '10 Graving Docks', employees: '15,000+' },
    { name: 'DNV Group', type: 'Classification Society & Risk Advisory', hq: 'Høvik, Norway', fleet: '13,000 Classed Ships', employees: '12,000+' },
    { name: 'Wärtsilä Corporation', type: 'Marine Power & Decarbonization Tech', hq: 'Helsinki, Finland', fleet: 'Dual-Fuel Engines', employees: '17,500+' },
  ];

  const filtered = companies.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Company Intelligence" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Tool #70
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Building className="w-7 h-7 text-cyan-400" />
              Global Maritime Company Intelligence & Fleet Insights
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Corporate profiles, fleet ownership structures, ESG rating scores, shipyard backlog, orderbooks, and executive contacts.
          </p>
        </div>
      </div>

      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
        <input
          type="text"
          placeholder="Search by company name, headquarters city, or sector..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((c, idx) => (
          <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold border border-cyan-500/20">
              {c.type}
            </span>
            <h3 className="font-bold text-sm text-white">{c.name}</h3>
            <div className="text-xs text-slate-400 space-y-1">
              <div>HQ: <strong className="text-slate-200">{c.hq}</strong></div>
              <div>Fleet / Assets: <strong className="text-cyan-400">{c.fleet}</strong></div>
              <div>Global Workforce: <strong className="text-slate-200">{c.employees}</strong></div>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
