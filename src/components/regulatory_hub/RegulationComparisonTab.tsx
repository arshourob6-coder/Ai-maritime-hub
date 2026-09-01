import React, { useState } from 'react';
import {
  Scale,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Lock,
  Flame,
  Waves,
  Zap,
  Globe
} from 'lucide-react';

interface ComparisonTopic {
  id: string;
  topicTitle: string;
  category: string;
  imoBaseline: {
    rule: string;
    details: string;
    mandatoryLevel: string;
  };
  iacsStandard: {
    rule: string;
    details: string;
    mandatoryLevel: string;
  };
  classRules: {
    rule: string;
    details: string;
    mandatoryLevel: string;
  };
  flagStateRules: {
    rule: string;
    details: string;
    mandatoryLevel: string;
  };
}

const COMPARISON_DATA: ComparisonTopic[] = [
  {
    id: 'comp-1',
    topicTitle: 'Operational Technology (OT) Cyber Security on Commercial Ships',
    category: 'Cyber & Automation',
    imoBaseline: {
      rule: 'IMO Res. MSC.428(98) / ISM Code',
      details: 'Mandates that cyber risks are identified and addressed within the vessel Safety Management System (SMS) at the first Document of Compliance (DOC) audit.',
      mandatoryLevel: 'Mandatory via SMS'
    },
    iacsStandard: {
      rule: 'IACS UR E26 & UR E27 (Rev 1)',
      details: 'Mandatory technical requirements for shipboard OT architecture, network segmentation, firewalls, and component verification for newbuild contracts from 1 July 2024.',
      mandatoryLevel: 'Mandatory for IACS Class'
    },
    classRules: {
      rule: 'DNV "Cyber Secure" / ABS "CyberSafety"',
      details: 'Optional advanced class notations (Cyber Secure Advanced/Essential) offering third-party penetration testing and continuous SIEM monitoring.',
      mandatoryLevel: 'Class Notation / Enhanced'
    },
    flagStateRules: {
      rule: 'Panama MMC-364 / USCG Cyber Alert',
      details: 'Flag circular requires mandatory reporting of any cyber incident resulting in loss of propulsion, steering, or navigation within 24 hours.',
      mandatoryLevel: 'National Law & Incident Reporting'
    }
  },
  {
    id: 'comp-2',
    topicTitle: 'Marine Fuel Sulfur & Carbon Intensity Decarbonization Targets',
    category: 'Marine Environment & Decarbonization',
    imoBaseline: {
      rule: 'MARPOL Annex VI Reg. 14, 26, 28',
      details: 'Global 0.50% S cap (0.10% in ECAs). Mandatory annual CII calculation (ratings A to E) with corrective SEEMP Part III plan for rated D for 3 years or E for 1 year.',
      mandatoryLevel: 'Statutory Convention'
    },
    iacsStandard: {
      rule: 'IACS Unified Interpretations UI MPC115',
      details: 'Harmonized survey and calculation guidelines for EEXI and Engine Power Limitation (EPL) seal validation during statutory surveys.',
      mandatoryLevel: 'Harmonized Class Standard'
    },
    classRules: {
      rule: 'BV "CleanShip" / LR "Gas Fuelled" / DNV "Fuel Ready"',
      details: 'Structural and piping approval for alternative fuels (LNG, Methanol, Ammonia, Hydrogen) with specialized risk assessment HAZID/HAZOP.',
      mandatoryLevel: 'Class Design Rules'
    },
    flagStateRules: {
      rule: 'Singapore MPA Biofuel Circular / EU ETS MRV',
      details: 'National bunkering standard SS 648 and Flag authorization for B24/B30 biofuel blends without requiring NOx re-certification.',
      mandatoryLevel: 'National Bunkering Directive'
    }
  },
  {
    id: 'comp-3',
    topicTitle: 'Safe Mooring & Towing Equipment (Snap-back Zone Safety)',
    category: 'Safety of Construction',
    imoBaseline: {
      rule: 'SOLAS Reg. II-1/3-8 & MSC.1/Circ.1619/1620',
      details: 'Design of mooring arrangements to minimize snap-back risk; mandatory Line Management Plan (LMP) and inspection routines for all lines.',
      mandatoryLevel: 'Mandatory Statutory'
    },
    iacsStandard: {
      rule: 'IACS UR A2 (Shipboard fittings and supporting hull)',
      details: 'Standardized calculation of Safe Working Load (SWL) and Safe Towing Load (TOW) for bollards, chocks, and fairleads welded to hull.',
      mandatoryLevel: 'Mandatory Strength Rules'
    },
    classRules: {
      rule: 'ABS "SafeMooring" / DNV "Mooring Safe"',
      details: 'Verification of mooring winch brake holding capacity (BHC) and automated tensioning sensor calibration.',
      mandatoryLevel: 'Class Survey Standard'
    },
    flagStateRules: {
      rule: 'Panama Canal Authority (ACP) Mooring Rules',
      details: 'Specific requirement for 4 chock locations and wire/synthetic mooring line tensile strengths for transit through Neopanamax locks.',
      mandatoryLevel: 'Special Canal Requirement'
    }
  }
];

export const RegulationComparisonTab: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('comp-1');

  const selectedTopic = COMPARISON_DATA.find((t) => t.id === selectedTopicId) || COMPARISON_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Comparative Analysis Engine
            </span>
            <span className="text-xs text-slate-400">Harmonization vs National Variations</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">IMO vs IACS vs Class Society vs Flag State Comparison</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare international treaty baselines against IACS unified requirements, proprietary class rules, and national flag circulars.
          </p>
        </div>
      </div>

      {/* Topic Switcher Pills */}
      <div className="flex flex-wrap gap-2">
        {COMPARISON_DATA.map((top) => (
          <button
            key={top.id}
            onClick={() => setSelectedTopicId(top.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              selectedTopicId === top.id
                ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span>{top.topicTitle}</span>
          </button>
        ))}
      </div>

      {/* Side-by-Side 4-Tier Matrix */}
      <div className="space-y-4">
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Subject Analysis</span>
            <h3 className="text-base font-bold text-white mt-0.5">{selectedTopic.topicTitle}</h3>
          </div>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300">
            {selectedTopic.category}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. IMO Convention Baseline */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  1. IMO Global Baseline
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{selectedTopic.imoBaseline.rule}</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {selectedTopic.imoBaseline.details}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-400 font-semibold">
              {selectedTopic.imoBaseline.mandatoryLevel}
            </div>
          </div>

          {/* 2. IACS Unified Requirement */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  2. IACS Standard
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{selectedTopic.iacsStandard.rule}</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {selectedTopic.iacsStandard.details}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-blue-400 font-semibold">
              {selectedTopic.iacsStandard.mandatoryLevel}
            </div>
          </div>

          {/* 3. Class Society Rules */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  3. Class Society Rules
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{selectedTopic.classRules.rule}</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {selectedTopic.classRules.details}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-400 font-semibold">
              {selectedTopic.classRules.mandatoryLevel}
            </div>
          </div>

          {/* 4. Flag State National Law */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  4. Flag State National Law
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{selectedTopic.flagStateRules.rule}</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {selectedTopic.flagStateRules.details}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-teal-400 font-semibold">
              {selectedTopic.flagStateRules.mandatoryLevel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
