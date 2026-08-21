import React, { useState } from 'react';
import { ShipParticulars, StepCalculationResult } from '../../types/propeller';
import { Calculator, BookOpen, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

interface PropellerCalculationsLatexProps {
  shipParticulars: ShipParticulars;
  stepResults: StepCalculationResult[];
}

export const PropellerCalculationsLatex: React.FC<PropellerCalculationsLatexProps> = ({
  shipParticulars,
  stepResults,
}) => {
  const [unitSystem, setUnitSystem] = useState<'SI' | 'Imperial'>('SI');
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const currentStepData = stepResults.find((s) => s.stepNumber === selectedStep) || stepResults[0];

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6 text-slate-100">
      {/* Header and Unit Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">
              Theoretical Formulations
            </span>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-cyan-400" />
              ITTC / SNAME Hydrodynamic Equations & Derivations
            </h2>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Exact mathematical formulations with unit conversions, worked numerical examples, and AI derivation breakdowns.
          </p>
        </div>

        {/* SI vs Imperial Toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setUnitSystem('SI')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              unitSystem === 'SI' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            SI Units (m, kW, kN)
          </button>
          <button
            onClick={() => setUnitSystem('Imperial')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              unitSystem === 'Imperial' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Imperial (ft, HP, lbf)
          </button>
        </div>
      </div>

      {/* 16-Step Selection Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
        {stepResults.map((s) => (
          <button
            key={s.stepNumber}
            onClick={() => setSelectedStep(s.stepNumber)}
            className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between ${
              selectedStep === s.stepNumber
                ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-slate-500">Step {s.stepNumber}</span>
            <span className="text-xs font-black truncate text-cyan-300">{s.symbol}</span>
            <span className="text-[11px] font-bold mt-1 text-white">
              {unitSystem === 'SI'
                ? `${s.value} ${s.unit}`
                : `${(s.value * (s.unit === 'kN' ? 224.8 : s.unit === 'm' ? 3.28084 : 1)).toFixed(1)} ${
                    s.unit === 'kN' ? 'lbf' : s.unit === 'm' ? 'ft' : s.unit
                  }`}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Step Detailed Mathematical Card */}
      {currentStepData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-3xl border border-slate-800">
          {/* Equation Display Box */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 font-black text-sm">
                Step #{currentStepData.stepNumber}
              </span>
              <h3 className="text-lg font-black text-white">{currentStepData.title}</h3>
            </div>

            {/* Rendered Math Formula Display */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center font-mono text-cyan-300 text-lg shadow-inner">
              <span className="text-slate-400 text-xs block mb-1 font-sans">Formula:</span>
              <span className="tracking-wide">{currentStepData.formulaLatex}</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
              {currentStepData.description}
            </p>

            {/* Variable Definition Legend */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                Symbol Definitions & Inputs:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-cyan-400 font-bold">V_a (Advance Speed):</span>{' '}
                  {(shipParticulars.serviceSpeedKnots * 0.514444 * (1 - shipParticulars.wakeFraction)).toFixed(2)} m/s
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-cyan-400 font-bold">ρ (Seawater Density):</span> {shipParticulars.waterDensity}{' '}
                  kg/m³
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-cyan-400 font-bold">w (Wake Fraction):</span> {shipParticulars.wakeFraction}
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-cyan-400 font-bold">t (Thrust Deduction):</span> {shipParticulars.thrustDeduction}
                </div>
              </div>
            </div>
          </div>

          {/* Worked Numerical Example & AI Explanation */}
          <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Worked Hydrodynamic Numerical Calculation
            </h4>

            <div className="text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-slate-200">
              <div className="text-slate-400 text-[11px] font-sans">Step-by-Step Worked Derivation:</div>
              <div className="text-cyan-300">1. Input: V_ship = {shipParticulars.serviceSpeedKnots} knots</div>
              <div className="text-cyan-300">2. V_a = {shipParticulars.serviceSpeedKnots} × 0.5144 × (1 - {shipParticulars.wakeFraction}) = {(shipParticulars.serviceSpeedKnots * 0.514444 * (1 - shipParticulars.wakeFraction)).toFixed(2)} m/s</div>
              <div className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                Result: {currentStepData.symbol} = {currentStepData.value} {currentStepData.unit}
              </div>
            </div>

            <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-800/40 space-y-1.5 text-xs text-cyan-200">
              <span className="font-bold flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> AI Engineering Notes:
              </span>
              <p className="text-[11px] text-cyan-300/90 leading-relaxed">
                This formulation complies strictly with ITTC 1978 open water test procedures and MARIN Wageningen B-Series regressive polynomial fits.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
