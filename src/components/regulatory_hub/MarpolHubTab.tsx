import React, { useState } from 'react';
import { MARPOL_ANNEXES_DATA } from './regulationsData';
import { MarpolAnnex } from './regTypes';
import {
  Waves,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Layers,
  Award,
  Shield,
  Droplet,
  Flame,
  Wind,
  Trash2,
  Biohazard,
  Gauge,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

export const MarpolHubTab: React.FC = () => {
  const [selectedAnnexIndex, setSelectedAnnexIndex] = useState<number>(5); // Default to Annex VI (Decarbonization / Air)
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedAnnex = MARPOL_ANNEXES_DATA[selectedAnnexIndex] || MARPOL_ANNEXES_DATA[0];

  const getAnnexIcon = (annexNum: number) => {
    switch (annexNum) {
      case 1: return <Droplet className="w-4 h-4 text-amber-400" />;
      case 2: return <Biohazard className="w-4 h-4 text-emerald-400" />;
      case 3: return <Layers className="w-4 h-4 text-purple-400" />;
      case 4: return <Waves className="w-4 h-4 text-blue-400" />;
      case 5: return <Trash2 className="w-4 h-4 text-rose-400" />;
      case 6: return <Wind className="w-4 h-4 text-cyan-400" />;
      default: return <Waves className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              MARPOL 73/78 Hub
            </span>
            <span className="text-xs text-slate-400">Annexes I through VI Environmental Intelligence</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Marine Pollution Prevention & Carbon Intensity Center</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Discharge criteria, ECA regulations, EEXI/CII decarbonization targets, and mandatory record books.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>MEPC.377(80) 2023 GHG Aligned</span>
        </div>
      </div>

      {/* Annex Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {MARPOL_ANNEXES_DATA.map((anx, idx) => {
          const isSelected = selectedAnnexIndex === idx;
          return (
            <button
              key={anx.annexNumber}
              onClick={() => setSelectedAnnexIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300 shadow-sm shadow-emerald-500/10'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                {getAnnexIcon(anx.annexNumber)}
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {anx.roman}
                </span>
              </div>
              <div className="mt-2">
                <div className="font-bold text-xs text-white line-clamp-1">{anx.shortName}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{anx.title}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep Annex View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Overview & Requirements */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {selectedAnnex.roman}
              </span>
              <span className="text-xs text-slate-400 font-mono">In Force: {selectedAnnex.inForceDate}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{selectedAnnex.title}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                {selectedAnnex.summary}
              </p>
            </div>

            {/* Required Certificates */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Mandatory Certificates
              </h4>
              <div className="space-y-1.5">
                {selectedAnnex.requiredCertificates.map((cert, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plans & Record Books */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" /> Required Plans & Records
              </h4>
              <div className="space-y-1.5">
                {selectedAnnex.requiredPlansAndRecords.map((plan, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{plan}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2024-2028 Amendments Timeline */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-rose-400" /> Key Amendments (2024–2028)
            </h4>
            <div className="space-y-2">
              {selectedAnnex.keyAmendments2024_2028.map((amend, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{amend}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Discharge Criteria & Technical Standards Matrix */}
        <div className="lg:col-span-8 space-y-6">
          {/* Discharge Criteria Matrix */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Waves className="w-4 h-4 text-emerald-400" /> Operational Discharge Criteria & Limitations
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Statutory boundaries comparing Outside Special Areas vs. Inside Special Areas vs. Zero-Discharge Zones.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedAnnex.dischargeCriteria.map((crit, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-xs text-emerald-400">{crit.area}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      Substance: {crit.substance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {crit.limitOrCondition}
                  </p>
                  <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <FileText className="w-3 h-3 text-cyan-400" />
                      Required Logging: <strong className="text-slate-200">{crit.recordRequired}</strong>
                    </span>
                    <span className="text-emerald-400 text-[10px] font-semibold">Strict Liability</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Equipment Specifications */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-400" /> Mandatory Technical Equipment & Onboard Hardware
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedAnnex.mandatoryEquipment.map((eq, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 font-medium">{eq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
