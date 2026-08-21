import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Database, Search, Download, Filter, Server, Check } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MaritimeDataCenterView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const datasets = [
    { id: '1', title: 'Global AIS Vessel Movement Data 2025 (50M Signals)', category: 'AIS Tracking', size: '42.5 GB', format: 'Parquet / CSV', downloads: '14.2k' },
    { id: '2', title: 'IMO Global Ship Particulars & Machinery Database', category: 'Fleet Registry', size: '1.8 GB', format: 'PostgreSQL / JSON', downloads: '9.8k' },
    { id: '3', title: 'NOAA Marine Meteorological & Wave Spectrum 10-Yr Archive', category: 'Weather', size: '120 GB', format: 'NetCDF / GRIB2', downloads: '6.5k' },
    { id: '4', title: 'World Port Throughput & Crane Productivity Index', category: 'Port Statistics', size: '350 MB', format: 'CSV / Excel', downloads: '18.1k' },
  ];

  const filtered = datasets.filter((d) =>
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'all' || d.category === categoryFilter)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Data Center" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
              Tool #51
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Database className="w-7 h-7 text-violet-400" />
              Global Maritime Open Data Repository
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Access verified oceanographic, AIS position telemetry, ship machinery particulars, port logistics, and marine climate datasets for AI training and research.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search datasets by keyword, IMO number, or geographic zone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-300 font-bold"
        >
          <option value="all">All Categories</option>
          <option value="AIS Tracking">AIS Tracking</option>
          <option value="Fleet Registry">Fleet Registry</option>
          <option value="Weather">Weather</option>
          <option value="Port Statistics">Port Statistics</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ds) => (
          <div key={ds.id} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 hover:border-violet-500/40 transition space-y-3">
            <div className="flex items-start justify-between">
              <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-bold border border-violet-500/20">
                {ds.category}
              </span>
              <span className="text-slate-500 text-xs font-mono">{ds.size}</span>
            </div>

            <h3 className="font-bold text-sm text-white">{ds.title}</h3>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
              <span>Format: <strong className="text-slate-200">{ds.format}</strong></span>
              <button
                onClick={() => onOpenPricing && onOpenPricing('student')}
                className="px-3 py-1.5 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 font-bold rounded-xl border border-violet-500/30 flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Dataset</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
