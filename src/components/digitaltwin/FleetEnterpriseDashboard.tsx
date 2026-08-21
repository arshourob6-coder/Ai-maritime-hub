import React, { useState } from 'react';
import {
  Building2,
  Users,
  ShieldCheck,
  Zap,
  DollarSign,
  Download,
  CreditCard,
  CheckCircle2,
  Ship,
  TrendingUp,
  Activity,
  Lock,
  ArrowRight
} from 'lucide-react';
import { VesselTwin, VESSEL_TWIN_FLEET } from './digitalTwinData';
import { PlanType } from '../../types';

interface FleetEnterpriseDashboardProps {
  onSelectVessel: (vessel: VesselTwin) => void;
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  isDarkMode?: boolean;
}

export const FleetEnterpriseDashboard: React.FC<FleetEnterpriseDashboardProps> = ({
  onSelectVessel,
  userPlan = 'student',
  onOpenPricing,
  isDarkMode = true
}) => {
  const [selectedRole, setSelectedRole] = useState<'superintendent' | 'chief_engineer' | 'naval_architect' | 'port_master'>('superintendent');

  const fleetPlans = [
    {
      name: 'Basic Digital Twin',
      price: '$1,200',
      period: '/mo per ship',
      desc: 'Real-time telemetry, basic 3D hull viewer, and daily fuel tracking.',
      features: [
        'Live IoT & NMEA 2000 Ingestion',
        'ISO 15016 Fuel Speed Normalization',
        'CII Grade Tracking & Alerting',
        '3 Active User Seats'
      ],
      cta: 'Deploy Basic Twin'
    },
    {
      name: 'Professional Fleet Analytics',
      price: '$3,800',
      period: '/mo per ship',
      popular: true,
      desc: 'Full CBM predictive maintenance, FEA stress hotspots, and AI anomaly detection.',
      features: [
        'Full 3D FEA Stress & Thermal Machinery Hotspots',
        'Weibull RUL Predictive Work Order Generation',
        'EU ETS & FuelEU Maritime Cost Minimizer',
        'Subsea & Offshore Asset Module Access',
        '15 Team Seats + Class Surveyor Portal'
      ],
      cta: 'Deploy Pro Fleet Twin'
    },
    {
      name: 'Enterprise Smart Maritime Platform',
      price: '$9,500',
      period: '/mo enterprise',
      desc: 'Private on-prem/VPC digital twin cloud with shipyard ERP and TOS port integration.',
      features: [
        'Dedicated Private Digital Twin Cluster',
        'Shipyard CAD (AVEVA/Rhino) & TOS Connector',
        'Blockchain Class Survey Certification API',
        'Zero Data Egress / SOC-2 Type II Guarantee',
        'Unlimited Fleet Vessels & Dedicated Architect'
      ],
      cta: 'Schedule Enterprise Deployment'
    }
  ];

  return (
    <div id="fleet-enterprise-dashboard-root" className="space-y-6">
      
      {/* Fleet Overview Matrix */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-black text-lg text-white flex items-center gap-2">
              <Ship className="w-5 h-5 text-sky-400" />
              Global Fleet Digital Twin Matrix ({VESSEL_TWIN_FLEET.length} Monitored Vessels)
            </h3>
            <p className="text-xs text-slate-400">Click any vessel to load its virtual twin telemetry and 3D simulation canvas.</p>
          </div>

          <button
            onClick={() => alert('Exporting full fleet digital twin telemetry log in standardized ISO 19848 JSON / Excel format...')}
            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-2 self-start sm:self-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Fleet ISO 19848 Data</span>
          </button>
        </div>

        {/* Fleet Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="pb-3 font-semibold">VESSEL NAME</th>
                <th className="pb-3 font-semibold">TYPE</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold">SPEED / POWER</th>
                <th className="pb-3 font-semibold">CII GRADE</th>
                <th className="pb-3 font-semibold">OVERALL HEALTH</th>
                <th className="pb-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {VESSEL_TWIN_FLEET.map((v) => (
                <tr key={v.id} className="hover:bg-slate-950/60 transition group">
                  <td className="py-3.5 font-bold text-white">
                    {v.name}
                    <span className="block text-[10px] text-slate-500 font-mono">{v.imo} • {v.flag}</span>
                  </td>
                  <td className="py-3.5 text-slate-300">{v.type}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {v.currentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-slate-300">
                    {v.telemetry.speedSOG} kn • {(v.telemetry.shaftPowerKW / 1000).toFixed(1)} MW
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded font-mono font-black text-xs ${
                      v.telemetry.ciiRating === 'A' ? 'bg-emerald-500/20 text-emerald-300' :
                      v.telemetry.ciiRating === 'B' ? 'bg-sky-500/20 text-sky-300' :
                      'bg-amber-500/20 text-amber-300'
                    }`}>
                      GRADE {v.telemetry.ciiRating}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">{v.healthScores.overall}%</span>
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${v.healthScores.overall > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${v.healthScores.overall}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onSelectVessel(v)}
                      className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
                    >
                      Inspect Twin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Twin SaaS & Enterprise Licensing Grid */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-black border border-violet-500/30">
            DIGITAL TWIN MONETIZATION & SAAS TIERS
          </span>
          <h3 className="text-2xl font-black text-white">
            Smart Maritime Digital Twin Subscription Plans
          </h3>
          <p className="text-xs text-slate-400">
            Scale from single-vessel condition monitoring to fleet-wide autonomous operations with class-certified telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fleetPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 relative overflow-hidden ${
                plan.popular
                  ? 'bg-slate-900 border-sky-500 ring-2 ring-sky-500/40 shadow-2xl shadow-sky-950/60'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-sky-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Most Popular Fleet Plan
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-bold text-base text-white">{plan.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenPricing && onOpenPricing('enterprise')}
                className={`w-full py-3 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-black shadow-lg shadow-sky-500/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
