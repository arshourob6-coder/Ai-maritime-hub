import React, { useState } from 'react';
import {
  Shield,
  BookOpen,
  Waves,
  Users,
  Award,
  Globe,
  Sparkles,
  Sliders,
  Calendar,
  Layers,
  Bell,
  Scale,
  Calculator,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

import { ImoConventionsTab } from './ImoConventionsTab';
import { SolasHubTab } from './SolasHubTab';
import { MarpolHubTab } from './MarpolHubTab';
import { StcwHubTab } from './StcwHubTab';
import { IacsRulesTab } from './IacsRulesTab';
import { ClassSocietiesTab } from './ClassSocietiesTab';
import { FlagStateTab } from './FlagStateTab';
import { RuleSearchAiTab } from './RuleSearchAiTab';
import { ComplianceCheckerTab } from './ComplianceCheckerTab';
import { AmendmentTrackerTab } from './AmendmentTrackerTab';
import { CertificatesTrackerTab } from './CertificatesTrackerTab';
import { RegulationComparisonTab } from './RegulationComparisonTab';
import { RegulatoryAlertsTab } from './RegulatoryAlertsTab';
import { ProfessionalToolsTab } from './ProfessionalToolsTab';

export type RegHubTab =
  | 'search_ai'
  | 'compliance_checker'
  | 'imo_rules'
  | 'solas'
  | 'marpol'
  | 'stcw'
  | 'iacs'
  | 'class_societies'
  | 'flag_state'
  | 'comparison'
  | 'amendments'
  | 'certificates'
  | 'alerts'
  | 'pro_tools';

export const RegulatoryHubView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RegHubTab>('search_ai');

  const navigationItems = [
    { id: 'search_ai', label: 'Rule Search AI', icon: Sparkles, badge: 'RAG AI' },
    { id: 'compliance_checker', label: 'Ship Compliance Matrix', icon: Sliders, badge: 'Interactive' },
    { id: 'imo_rules', label: 'IMO Conventions', icon: BookOpen },
    { id: 'solas', label: 'SOLAS Hub', icon: Shield },
    { id: 'marpol', label: 'MARPOL Hub', icon: Waves },
    { id: 'stcw', label: 'STCW Hub', icon: Users },
    { id: 'iacs', label: 'IACS Requirements', icon: Layers },
    { id: 'class_societies', label: 'Classification Rules', icon: Award },
    { id: 'flag_state', label: 'Flag State Notices', icon: Globe },
    { id: 'comparison', label: 'Rules Comparison', icon: Scale },
    { id: 'amendments', label: 'Amendments 2024-28', icon: Calendar },
    { id: 'certificates', label: 'HSSC Certificates', icon: CheckCircle2 },
    { id: 'alerts', label: 'PSC Alerts', icon: Bell, badge: 'Live' },
    { id: 'pro_tools', label: 'Calculators & Subscriptions', icon: Calculator }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 lg:p-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Global Regulatory & Classification Intelligence
              </span>
              <span className="text-xs text-slate-400 font-mono">IMO • IACS • DNV • ABS • LR • BV • Flag States</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              International Maritime Regulatory Hub
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Unified statutory intelligence system integrating IMO Conventions (SOLAS, MARPOL, STCW), IACS Unified Requirements, 7 major Classification Societies, Flag State Marine Circulars, and interactive compliance verification engines.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-2xl text-center">
              <div className="text-lg font-black text-white font-mono">15+</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">SOLAS Chapters</div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-2xl text-center">
              <div className="text-lg font-black text-emerald-400 font-mono">VI</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">MARPOL Annexes</div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-2xl text-center">
              <div className="text-lg font-black text-cyan-400 font-mono">7</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Class Societies</div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-3 rounded-2xl text-center">
              <div className="text-lg font-black text-purple-400 font-mono">100%</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">RAG Citations</div>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-slate-300">
              Regulatory notice: Verify statutory information against the latest official publications from the IMO, authorized Classification Society, and Flag Administration.
            </span>
          </div>
          <span className="font-mono text-emerald-400/90 shrink-0">GISIS / IACS 2026 Aligned</span>
        </div>
      </div>

      {/* Navigation Sub-Menu Horizontal Scrollable Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as RegHubTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap transition shrink-0 ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                    isActive ? 'bg-slate-950 text-emerald-300' : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Component Render */}
      <div className="transition-all duration-200">
        {activeTab === 'search_ai' && <RuleSearchAiTab />}
        {activeTab === 'compliance_checker' && <ComplianceCheckerTab />}
        {activeTab === 'imo_rules' && <ImoConventionsTab />}
        {activeTab === 'solas' && <SolasHubTab />}
        {activeTab === 'marpol' && <MarpolHubTab />}
        {activeTab === 'stcw' && <StcwHubTab />}
        {activeTab === 'iacs' && <IacsRulesTab />}
        {activeTab === 'class_societies' && <ClassSocietiesTab />}
        {activeTab === 'flag_state' && <FlagStateTab />}
        {activeTab === 'comparison' && <RegulationComparisonTab />}
        {activeTab === 'amendments' && <AmendmentTrackerTab />}
        {activeTab === 'certificates' && <CertificatesTrackerTab />}
        {activeTab === 'alerts' && <RegulatoryAlertsTab />}
        {activeTab === 'pro_tools' && <ProfessionalToolsTab />}
      </div>
    </div>
  );
};
