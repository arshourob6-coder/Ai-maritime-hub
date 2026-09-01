import React, { useState } from 'react';
import {
  Bell,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Shield,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  Flame,
  Waves,
  Users,
  Lock
} from 'lucide-react';

interface RegulatoryAlert {
  id: string;
  title: string;
  source: string;
  severity: 'Critical' | 'Urgent' | 'Informational';
  date: string;
  summary: string;
  affectedParties: string;
  actionRequired: string;
}

const ALERTS_DATA: RegulatoryAlert[] = [
  {
    id: 'alt-1',
    title: 'Paris & Tokyo MoU Concentrated Inspection Campaign (CIC) on Crew Rest Hours & MLC',
    source: 'Paris MoU / Tokyo MoU Secretariats',
    severity: 'Urgent',
    date: '2025-08-01',
    summary: 'Joint annual CIC announced focusing on Seafarers Hours of Work and Rest (STCW Section A-VIII/1) and MLC 2006 Standard A2.3. PSCOs will scrutinize daily electronic rest hour logs against bridge/engine bell books and cargo watch registers.',
    affectedParties: 'All foreign merchant vessels calling ports in Europe and Asia-Pacific',
    actionRequired: 'Ensure electronic rest records are reconciled daily with deck/engine watch logs with zero overlapping discrepancies.'
  },
  {
    id: 'alt-2',
    title: 'Mandatory Implementation of IACS UR E26 & E27 Cyber Resilience for New Shipbuilding Contracts',
    source: 'IACS Council Directive',
    severity: 'Critical',
    date: '2024-07-01',
    summary: 'All newbuilding contracts signed on or after 1 July 2024 must fully incorporate IACS UR E26 (vessel cyber design) and UR E27 (system supplier component cyber security).',
    affectedParties: 'Shipowners, Shipyards, Marine Equipment Manufacturers, Classification Societies',
    actionRequired: 'Submit Cyber Security Design Topologies and Equipment Type Approval Certificates to Class before keel laying.'
  },
  {
    id: 'alt-3',
    title: 'Mediterranean Sea 0.10% Sulfur Emission Control Area (Med SECA) in Full Effect',
    source: 'IMO MEPC.361(79) / MARPOL Annex VI',
    severity: 'Critical',
    date: '2025-05-01',
    summary: 'The Mediterranean Sea has officially entered into force as an SOx Emission Control Area. Ships operating in the Mediterranean must burn fuel with a sulfur content not exceeding 0.10% m/m or run approved EGCS scrubbers.',
    affectedParties: 'All ships transiting or trading in the Mediterranean Sea Basin',
    actionRequired: 'Update Fuel Oil Changeover Procedures in SMS and log manifold switch coordinates in official bridge logs.'
  },
  {
    id: 'alt-4',
    title: 'IMO Revised GHG Decarbonization Strategy: Enhanced CII Reduction Factors for 2026',
    source: 'IMO MEPC.377(80)',
    severity: 'Urgent',
    date: '2026-01-01',
    summary: 'Stricter Carbon Intensity Indicator (CII) reduction factors take effect for 2026 voyages. Vessels falling into Category D for 3 consecutive years or Category E for 1 year must submit a revised SEEMP Part III with Corrective Action Plan (CAP).',
    affectedParties: 'Cargo, Bulk, and Container Ships ≥5,000 GT',
    actionRequired: 'Optimize voyage speed profiles, weather routing, and hull fouling cleaning routines to maintain CII Grade C or above.'
  }
];

export const RegulatoryAlertsTab: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  const filteredAlerts = ALERTS_DATA.filter(
    (a) => selectedSeverity === 'All' || a.severity === selectedSeverity
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
              <Bell className="w-3 h-3" /> Live Bulletin
            </span>
            <span className="text-xs text-slate-400">Statutory Bulletins & Port State Control Campaigns</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Real-Time Maritime Regulatory Alerts & PSC Bulletins</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Active warnings, Port State Control CIC targets, IMO resolutions, and upcoming enforcement dates.
          </p>
        </div>
      </div>

      {/* Severity Filter */}
      <div className="flex gap-2">
        {['All', 'Critical', 'Urgent', 'Informational'].map((sev) => (
          <button
            key={sev}
            onClick={() => setSelectedSeverity(sev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedSeverity === sev
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Alert Stream */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-slate-700 transition"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    alert.severity === 'Critical'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{alert.source}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1.5">{alert.title}</h3>
              </div>

              <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {alert.date}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 font-medium">
              {alert.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Affected Stakeholders</span>
                <p className="text-slate-200 font-medium mt-0.5">{alert.affectedParties}</p>
              </div>
              <div className="bg-rose-950/20 p-3.5 rounded-xl border border-rose-500/20 text-rose-200">
                <span className="text-[10px] text-rose-400 uppercase font-bold tracking-wider">Mandatory Compliance Action</span>
                <p className="font-medium mt-0.5">{alert.actionRequired}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
