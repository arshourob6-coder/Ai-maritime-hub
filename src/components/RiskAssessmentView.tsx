import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Grid,
  CheckCircle2,
  Sliders,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';

interface HazardCard {
  id: string;
  activity: string;
  hazard: string;
  consequence: string;
  initialRisk: 'High' | 'Medium' | 'Low';
  barrierControls: string[];
  residualRisk: 'Low' | 'Medium';
}

const SAMPLE_HAZARDS: HazardCard[] = [
  {
    id: 'hz-1',
    activity: 'Enclosed Space Entry (Fuel Oil Tank #2)',
    hazard: 'Toxic H2S gas accumulation & O2 deficiency (<19.5%)',
    consequence: 'Asphyxiation / Fatal injury',
    initialRisk: 'High',
    barrierControls: [
      'Continuous forced air ventilation for 24 hours prior',
      'Gas measurement calibrated multi-gas detector at 3 depths',
      'Standby safety man with EEBD & lifeline outside manhole'
    ],
    residualRisk: 'Low'
  },
  {
    id: 'hz-2',
    activity: 'Hot Work (Arc Welding Deck Plate Near Vent Pipe)',
    hazard: 'Flammable vapor ignition / Fire spread',
    consequence: 'Explosion & structural hull damage',
    initialRisk: 'High',
    barrierControls: [
      'Hot Work Permit signed by Chief Officer',
      'Gas-free certificate issued for adjacent fuel tanks',
      'Fire watch posted with 2x 9kg CO2 extinguishers for 30 mins post-work'
    ],
    residualRisk: 'Low'
  },
  {
    id: 'hz-3',
    activity: 'Over-the-Side Scaffolding Paint Work',
    hazard: 'Seafarer fall into sea at speed / Drowning',
    consequence: 'Person Overboard (MOB)',
    initialRisk: 'Medium',
    barrierControls: [
      'Work over the side permit + lifejacket & safety harness tied to static line',
      'Dedicated safety lookout seafarer on main deck',
      'MOB lifebuoy with self-igniting light on standby'
    ],
    residualRisk: 'Low'
  }
];

export const RiskAssessmentView: React.FC = () => {
  const [hazards] = useState<HazardCard[]>(SAMPLE_HAZARDS);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Maritime Safety Management System (SMS)
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            HAZID / HAZOP & <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">JSA Risk Assessment Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Generate Job Safety Analysis (JSA), HAZID hazard identification cards, 5x5 Risk Matrix evaluation, and safety barrier control plans.
          </p>
        </div>
      </div>

      {/* 5x5 Risk Matrix Graphic */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Grid className="w-5 h-5 text-rose-400" /> IMO 5x5 Risk Assessment Matrix
          </h3>
          <span className="text-xs text-slate-400 font-mono">Consequence vs Likelihood</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-bold text-slate-950 font-mono">
          <div className="p-2 bg-emerald-400 rounded">L1: Rare</div>
          <div className="p-2 bg-emerald-400 rounded">L2: Unlikely</div>
          <div className="p-2 bg-amber-400 rounded">L3: Possible</div>
          <div className="p-2 bg-orange-500 text-white rounded">L4: Likely</div>
          <div className="p-2 bg-rose-600 text-white rounded">L5: Frequent</div>
        </div>
      </div>

      {/* Hazard Cards */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" /> Active Job Safety Analysis (JSA) Register
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hazards.map((hz) => (
            <div key={hz.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400">
                    JSA ID: {hz.id}
                  </span>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                    hz.initialRisk === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    Initial Risk: {hz.initialRisk}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white">{hz.activity}</h4>
                <p className="text-xs text-rose-300 font-medium"><strong>Hazard:</strong> {hz.hazard}</p>
                <p className="text-[11px] text-slate-400"><strong>Consequence:</strong> {hz.consequence}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">Mitigation Barrier Controls</span>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {hz.barrierControls.map((ctrl, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ctrl}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Residual Risk:</span>
                  <span className="text-emerald-400 font-bold">✓ {hz.residualRisk} (ALARP Compliant)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
