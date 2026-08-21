import React from 'react';
import {
  Building2,
  ShieldCheck,
  Lock,
  Users,
  Database,
  Key,
  Server,
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { PlanType } from '../../types';

interface EnterpriseAgentsSuiteProps {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  isDarkMode?: boolean;
}

export const EnterpriseAgentsSuite: React.FC<EnterpriseAgentsSuiteProps> = ({
  userPlan = 'student',
  onOpenPricing,
  isDarkMode = true
}) => {
  const enterpriseTiers = [
    {
      title: 'Mega Shipyards & Shipbuilders',
      icon: <Building2 className="w-6 h-6 text-rose-400" />,
      desc: 'Dedicated private AI agents connected to your shipyard ERP, AVEVA Marine, Tribon 3D CAD, and grand block welding schedules.',
      features: [
        'Private On-Premises or VPC Vector DB',
        'AVEVA / Tribon / Rhino 3D Plugins',
        'Block Erection & Goliath Crane Optimization',
        'Zero Data Egress / SOC-2 Type II Certified'
      ]
    },
    {
      title: 'Global Port Authorities & Terminals',
      icon: <Server className="w-6 h-6 text-sky-400" />,
      desc: 'Real-time TOS (Terminal Operating System) AI copilot for dynamic berth allocation, quay crane synchronization, and AIS approach management.',
      features: [
        'Dynamic Berth Allocation Engine',
        'Under Keel Clearance (UKC) Live Feed',
        'Shore Power Peak Load Management',
        'Multi-terminal Employee RBAC Control'
      ]
    },
    {
      title: 'Fleet Owners & Ship Managers',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      desc: 'Fleet-wide autonomous regulatory compliance (SOLAS, MARPOL, FuelEU, EU ETS) and voyage chartering intelligence.',
      features: [
        'Automated Noon Report & Sensor Ingestion',
        'Fleet-wide CII Grade & EU ETS Financial Forecasting',
        'Vessel Document & Class Survey Repository',
        'Unlimited Multi-Seat Team Access'
      ]
    }
  ];

  return (
    <div id="enterprise-agents-suite-root" className="space-y-6">
      {/* Hero Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-900/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-black border border-rose-500/30 flex items-center gap-1.5 w-fit">
            <Lock className="w-3.5 h-3.5" />
            ENTERPRISE GRADE AI ISOLATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Private Maritime AI Agents for Your Enterprise
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Deploy proprietary AI models trained exclusively on your confidential ship designs, internal technical specifications, and internal ERP data. Guaranteed zero model training on customer data.
          </p>
        </div>

        <button
          onClick={() => onOpenPricing && onOpenPricing('enterprise')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs shadow-xl shadow-rose-600/30 transition flex items-center gap-2 shrink-0 self-start md:self-center"
        >
          <span>Schedule Enterprise Briefing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Enterprise Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {enterpriseTiers.map((tier, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2.5">
                {tier.icon}
              </div>
              <h3 className="font-bold text-base text-white">{tier.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{tier.desc}</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800/80">
              {tier.features.map((f, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
