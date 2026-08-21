import React, { useState } from 'react';
import {
  Ship,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Gauge,
  TrendingUp,
  Search,
  Sliders,
  Radio
} from 'lucide-react';

interface FleetVessel {
  id: string;
  name: string;
  type: string;
  status: 'Underway' | 'In Port' | 'Dry Dock' | 'Maintenance Due';
  location: string;
  speed: string;
  fuelConsumptionMT: number;
  eeoi: number;
  nextSurveyDate: string;
}

const SAMPLE_FLEET: FleetVessel[] = [
  {
    id: 'fl-1',
    name: 'MV Polaris Enterprise',
    type: 'Container Ship (8,500 TEU)',
    status: 'Underway',
    location: 'Indian Ocean (Lat 12.4°N, Lon 68.2°E)',
    speed: '18.4 kn',
    fuelConsumptionMT: 42.5,
    eeoi: 12.4,
    nextSurveyDate: 'Nov 2027'
  },
  {
    id: 'fl-2',
    name: 'MT Neptune Star',
    type: 'VLCC Oil Tanker (300k DWT)',
    status: 'Underway',
    location: 'Persian Gulf Approach',
    speed: '12.1 kn',
    fuelConsumptionMT: 58.0,
    eeoi: 4.8,
    nextSurveyDate: 'Jan 2028'
  },
  {
    id: 'fl-3',
    name: 'SS Atlantic Horizon',
    type: 'LNG Carrier (174k m³)',
    status: 'In Port',
    location: 'Port of Ras Laffan (Qatar)',
    speed: '0.0 kn',
    fuelConsumptionMT: 4.2,
    eeoi: 8.9,
    nextSurveyDate: 'Mar 2027'
  },
  {
    id: 'fl-4',
    name: 'MV Pacific Titan',
    type: 'Capesize Bulk Carrier (180k DWT)',
    status: 'Maintenance Due',
    location: 'Singapore Anchorages',
    speed: '0.0 kn',
    fuelConsumptionMT: 2.1,
    eeoi: 14.2,
    nextSurveyDate: 'Aug 2026 (Due in 10 Days)'
  }
];

export const FleetManagementView: React.FC = () => {
  const [vessels] = useState<FleetVessel[]>(SAMPLE_FLEET);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold">
            <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" /> Live Ship Manager Telemetry Sync
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Enterprise Fleet <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">Management Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time vessel performance monitoring, EEOI efficiency, fuel consumption analytics, and scheduled maintenance alerts.
          </p>
        </div>
      </div>

      {/* Fleet Overview KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-bold block">Active Fleet Vessels</span>
          <span className="text-2xl font-mono font-black text-white">4 Ships</span>
          <span className="text-[10px] text-emerald-400 block font-mono">100% Starlink Connected</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-bold block">Avg Fleet EEOI</span>
          <span className="text-2xl font-mono font-black text-emerald-400">10.08</span>
          <span className="text-[10px] text-slate-400 block">g-CO2 / tonne-nm</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-bold block">Daily Fleet Fuel</span>
          <span className="text-2xl font-mono font-black text-sky-400">106.8 MT</span>
          <span className="text-[10px] text-slate-400 block">VLSFO / LNG Mix</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-bold block">Pending Class Surveys</span>
          <span className="text-2xl font-mono font-black text-amber-400">1 Due</span>
          <span className="text-[10px] text-amber-400 block font-mono">MV Pacific Titan</span>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <Ship className="w-5 h-5 text-sky-400" /> Managed Fleet Register
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Vessel Name & Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Current Location</th>
                <th className="pb-3">Speed</th>
                <th className="pb-3">Fuel / Day</th>
                <th className="pb-3 text-right">Class Survey</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {vessels.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5">
                    <span className="font-bold text-white block">{v.name}</span>
                    <span className="text-[10px] text-slate-400 block">{v.type}</span>
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
                      v.status === 'Underway'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : v.status === 'In Port'
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-300">{v.location}</td>
                  <td className="py-3.5 font-mono text-sky-400">{v.speed}</td>
                  <td className="py-3.5 font-mono text-emerald-400">{v.fuelConsumptionMT} MT</td>
                  <td className="py-3.5 text-right font-mono text-slate-300">{v.nextSurveyDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
