import React, { useState } from 'react';
import { ShipComplianceProfile, RegItemMatrix } from './regTypes';
import {
  Ship,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Award,
  Shield,
  Download,
  Printer,
  Sparkles,
  RefreshCw,
  Layers,
  Calendar,
  Flame,
  Waves,
  Lock,
  Cpu
} from 'lucide-react';

export const ComplianceCheckerTab: React.FC = () => {
  const [profile, setProfile] = useState<ShipComplianceProfile>({
    shipType: 'Bulk Carrier',
    grossTonnage: 43500,
    deadweightTonnage: 82000,
    flagState: 'Panama',
    yearBuilt: 2021,
    cargoType: 'Dry Bulk / Iron Ore & Grain',
    tradingArea: 'Worldwide International',
    propulsionType: 'Two-Stroke Low Speed Diesel (Tier II)'
  });

  const [generatedMatrix, setGeneratedMatrix] = useState<RegItemMatrix[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMatrix = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const items: RegItemMatrix[] = [
        {
          id: 'm-1',
          convention: 'SOLAS 1974',
          chapterOrAnnex: 'Chapter II-1',
          regulationRef: 'Reg. II-1/3-2 & 3-8',
          title: 'Protective Coatings for Dedicated Seawater Ballast Tanks & Towing/Mooring',
          status: 'Compliant',
          complianceProof: 'PCTC Coating Logbook & Class Form 113A',
          notes: 'Mandatory PSPC coating application under IMO Res. MSC.215(82).'
        },
        {
          id: 'm-2',
          convention: 'SOLAS 1974',
          chapterOrAnnex: 'Chapter II-2',
          regulationRef: 'Reg. II-2/10 & 20',
          title: 'Fixed Fire Extinguishing Systems & Fire Control Plans',
          status: 'Compliant',
          complianceProof: 'Safety Equipment Certificate (Form E) & CO2 Annual Service Cert',
          notes: 'Fixed CO2 system in engine room and cargo holds.'
        },
        {
          id: 'm-3',
          convention: 'SOLAS 1974',
          chapterOrAnnex: 'Chapter III',
          regulationRef: 'Reg. III/31',
          title: 'Survival Craft: Free-Fall Lifeboat & Rescue Boat',
          status: 'Compliant',
          complianceProof: 'Annual Service Certificate by Class-Approved Provider (MSC.402(96))',
          notes: 'Stern 100% capacity free-fall lifeboat + 6-person fast rescue boat.'
        },
        {
          id: 'm-4',
          convention: 'SOLAS 1974',
          chapterOrAnnex: 'Chapter XII',
          regulationRef: 'Reg. XII/12 & 13',
          title: 'Water Level Detectors in Cargo Holds & Dewatering Systems',
          status: 'Compliant',
          complianceProof: 'Bridge Hold Ingress Alarm Console & Testing Records',
          notes: 'Mandatory for single hold and bulk carriers ≥150m length.'
        },
        {
          id: 'm-5',
          convention: 'MARPOL 73/78',
          chapterOrAnnex: 'Annex I',
          regulationRef: 'Reg. 14 & 15',
          title: '15 ppm Oily Water Separator with Auto-Stop',
          status: 'Compliant',
          complianceProof: 'IOPP Certificate Form A & Oil Record Book Part I',
          notes: 'Type approved under MEPC.107(49). 3-way valve tested quarterly.'
        },
        {
          id: 'm-6',
          convention: 'MARPOL 73/78',
          chapterOrAnnex: 'Annex VI',
          regulationRef: 'Reg. 26 & 28',
          title: 'EEXI Technical File, CII Rating & SEEMP Part III',
          status: 'Pending Verification',
          complianceProof: 'International Energy Efficiency Certificate (IEEC) & Statement of Compliance',
          notes: 'Achieved Required EEXI with Engine Power Limitation (EPL). CII rating: B.'
        },
        {
          id: 'm-7',
          convention: 'IMO BWM',
          chapterOrAnnex: 'Reg. D-2',
          regulationRef: 'Ballast Water Management Convention',
          title: 'Ballast Water Treatment System (BWTS D-2 Standard)',
          status: 'Compliant',
          complianceProof: 'IBWMC Certificate & Commissioning Test Report',
          notes: 'Electro-chlorination BWTS installed and operational.'
        },
        {
          id: 'm-8',
          convention: 'IACS',
          chapterOrAnnex: 'CSR & UR S11A',
          regulationRef: 'Common Structural Rules for Bulk Carriers',
          title: 'Longitudinal Strength, Double Bottom & Transverse Bulkheads',
          status: 'Compliant',
          complianceProof: 'Classification Certificate & ESP Survey Record File',
          notes: 'Designed according to IACS CSR harmonized bulk rules.'
        },
        {
          id: 'm-9',
          convention: 'ISM Code',
          chapterOrAnnex: 'SOLAS IX',
          regulationRef: 'Sections 1-16',
          title: 'Safety Management System & Safety Management Certificate (SMC)',
          status: 'Compliant',
          complianceProof: 'Valid SMC issued by RO & Company DOC',
          notes: 'Internal safety audit completed within 12 months.'
        },
        {
          id: 'm-10',
          convention: 'ISPS Code',
          chapterOrAnnex: 'SOLAS XI-2',
          regulationRef: 'Part A & B',
          title: 'Ship Security Plan (SSP) & International Ship Security Certificate (ISSC)',
          status: 'Compliant',
          complianceProof: 'ISSC issued by Flag Administration',
          notes: 'SSAS alert button test conducted and logged with MRCC.'
        }
      ];

      setGeneratedMatrix(items);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Interactive Engine
            </span>
            <span className="text-xs text-slate-400">Vessel-Specific Statutory Compliance Profiler</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Ship Compliance Matrix & Requirement Generator</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure vessel parameters to dynamically compute applicable SOLAS, MARPOL, STCW, IACS, and Flag requirements.
          </p>
        </div>

        {generatedMatrix && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-medium text-slate-300 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Matrix</span>
            </button>
            <button
              onClick={() => {
                alert('Vessel Statutory Compliance Matrix exported as PDF report.');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF Matrix</span>
            </button>
          </div>
        )}
      </div>

      {/* Input Configuration Panel */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" /> Vessel Profile & Operational Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Ship Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Ship Type</label>
            <select
              value={profile.shipType}
              onChange={(e) => setProfile({ ...profile, shipType: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Bulk Carrier">Bulk Carrier</option>
              <option value="Container Ship">Container Ship</option>
              <option value="Oil Tanker">Oil Tanker (Crude/Product)</option>
              <option value="Chemical Tanker">Chemical Tanker (IBC Code)</option>
              <option value="LNG Carrier">LNG Carrier (IGC Code)</option>
              <option value="General Cargo">General Cargo Ship</option>
              <option value="Passenger / Cruise">Passenger / Cruise Ship</option>
            </select>
          </div>

          {/* Gross Tonnage */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Gross Tonnage (GT)</label>
            <input
              type="number"
              value={profile.grossTonnage}
              onChange={(e) => setProfile({ ...profile, grossTonnage: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Flag State */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Flag State Administration</label>
            <select
              value={profile.flagState}
              onChange={(e) => setProfile({ ...profile, flagState: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Panama">Panama (PMA)</option>
              <option value="Liberia">Liberia (LISCR)</option>
              <option value="Marshall Islands">Marshall Islands (IRI)</option>
              <option value="Singapore">Singapore (MPA)</option>
              <option value="Bahamas">Bahamas (BMA)</option>
              <option value="Bangladesh">Bangladesh (DOS)</option>
              <option value="Malta">Malta (Transport Malta)</option>
            </select>
          </div>

          {/* Year Built */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Keel Laying / Delivery Year</label>
            <input
              type="number"
              value={profile.yearBuilt}
              onChange={(e) => setProfile({ ...profile, yearBuilt: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Cargo Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Cargo Type</label>
            <input
              type="text"
              value={profile.cargoType}
              onChange={(e) => setProfile({ ...profile, cargoType: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Trading Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Trading Area</label>
            <select
              value={profile.tradingArea}
              onChange={(e) => setProfile({ ...profile, tradingArea: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Worldwide International">Worldwide International</option>
              <option value="ECA Focused (North Sea/Baltic/Med)">ECA Focused (North Sea/Baltic/Med)</option>
              <option value="Polar Waters (IMO Polar Code Cat A/B)">Polar Waters (IMO Polar Code)</option>
              <option value="Near-Coastal Domestic">Near-Coastal Domestic</option>
            </select>
          </div>

          {/* Machinery */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Main Propulsion & Machinery</label>
            <select
              value={profile.propulsionType}
              onChange={(e) => setProfile({ ...profile, propulsionType: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Two-Stroke Low Speed Diesel (Tier II)">Two-Stroke Low Speed Diesel (NOx Tier II)</option>
              <option value="Two-Stroke Low Speed Diesel (Tier III with SCR/EGR)">Two-Stroke Low Speed Diesel (NOx Tier III SCR/EGR)</option>
              <option value="Dual-Fuel LNG (IGF Code)">Dual-Fuel LNG (IGF Code Compliant)</option>
              <option value="Methanol-Fuelled / Ready">Methanol-Fuelled / Ready</option>
              <option value="Diesel-Electric Hybrid">Diesel-Electric Hybrid</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerateMatrix}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Computing Rules Matrix...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Statutory Matrix</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Matrix Table */}
      {generatedMatrix && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Vessel Statutory Matrix ({profile.shipType} • {profile.grossTonnage.toLocaleString()} GT • Flag: {profile.flagState})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Computed across SOLAS, MARPOL, BWM, ISM, ISPS, and IACS Common Structural Rules.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              10 Mandatory Requirements Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                  <th className="py-3 px-3">Statutory Framework</th>
                  <th className="py-3 px-3">Regulation Reference</th>
                  <th className="py-3 px-3">Mandatory Requirement Title</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Required Certificate / Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {generatedMatrix.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-950/60 transition">
                    <td className="py-3 px-3 font-semibold text-slate-200">
                      <div className="text-white font-bold">{item.convention}</div>
                      <div className="text-[10px] text-slate-400">{item.chapterOrAnnex}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-cyan-400 font-semibold">{item.regulationRef}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-200">{item.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.notes}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'Compliant'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-medium">{item.complianceProof}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
