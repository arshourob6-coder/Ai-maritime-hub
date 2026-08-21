import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AITutorSidebar } from './AITutorSidebar';
import { CalculatorDefinition, UnitSystem } from './CalculatorsHub';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Zap,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Ship,
  Info,
  ChevronDown,
  ChevronUp,
  Dices,
  Layers,
  ArrowRight,
  BookOpen,
  Bot
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

interface FormulaSolverProps {
  activeCalc: CalculatorDefinition;
  unitSystem: UnitSystem;
  inputState: Record<string, number>;
  onInputChange: (inputId: string, value: number) => void;
  onApplyPreset?: (preset: any) => void;
  vesselPresets?: Array<{
    name: string;
    type: string;
    lengthBP: number;
    beam: number;
    draft: number;
    blockCoeff: number;
    waterplaneCoeff: number;
    speedKnots: number;
    engineMCR: number;
  }>;
}

export const FormulaSolver: React.FC<FormulaSolverProps> = ({
  activeCalc,
  unitSystem,
  inputState,
  onInputChange,
  onApplyPreset,
  vesselPresets = []
}) => {
  const [copiedLatex, setCopiedLatex] = useState(false);
  const [showDerivation, setShowDerivation] = useState(false);
  const [showKey, setShowKey] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedTimestamp, setCalculatedTimestamp] = useState<number | null>(Date.now());
  const [hasCalculated, setHasCalculated] = useState(true);
  const [autoFilledPresetName, setAutoFilledPresetName] = useState<string | null>(null);
  const [showTutorSidebar, setShowTutorSidebar] = useState(false);

  // Run calculation
  const calcOutput = React.useMemo(() => {
    return activeCalc.calculate(inputState);
  }, [activeCalc, inputState]);

  // Handle Copy LaTeX
  const handleCopyLaTeX = () => {
    navigator.clipboard.writeText(activeCalc.formulaLaTeX);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  // Auto-populate preset
  const handlePresetClick = (preset: any) => {
    if (onApplyPreset) {
      onApplyPreset(preset);
      setAutoFilledPresetName(preset.name);
      setTimeout(() => setAutoFilledPresetName(null), 3000);
    }
  };

  // Auto-populate default SI values
  const handleAutoPopulateDefaults = () => {
    activeCalc.inputs.forEach((inp) => {
      onInputChange(inp.id, inp.defaultValueSI);
    });
    setAutoFilledPresetName('Default Standard Values');
    setTimeout(() => setAutoFilledPresetName(null), 2500);
  };

  // Auto-populate Max values
  const handleAutoPopulateMax = () => {
    activeCalc.inputs.forEach((inp) => {
      onInputChange(inp.id, inp.max);
    });
    setAutoFilledPresetName('Maximum Boundary Values');
    setTimeout(() => setAutoFilledPresetName(null), 2500);
  };

  // Auto-populate Min values
  const handleAutoPopulateMin = () => {
    activeCalc.inputs.forEach((inp) => {
      onInputChange(inp.id, inp.min);
    });
    setAutoFilledPresetName('Minimum Boundary Values');
    setTimeout(() => setAutoFilledPresetName(null), 2500);
  };

  // Randomize realistic inputs within min/max
  const handleRandomizeInputs = () => {
    activeCalc.inputs.forEach((inp) => {
      const randomVal = inp.min + Math.random() * (inp.max - inp.min);
      const rounded = Math.round(randomVal / inp.step) * inp.step;
      onInputChange(inp.id, Number(rounded.toFixed(3)));
    });
    setAutoFilledPresetName('Randomized Realistic Scenario');
    setTimeout(() => setAutoFilledPresetName(null), 2500);
  };

  // Handle explicit Calculate trigger
  const handleCalculateClick = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setHasCalculated(true);
      setCalculatedTimestamp(Date.now());
      // Scroll smoothly to results element if needed
      const resultsEl = document.getElementById('formula-solver-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 300);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl backdrop-blur-xl transition-all">
      {/* SOLVER HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono font-extrabold text-[10px] border border-sky-500/30 flex items-center gap-1">
              <Zap className="w-3 h-3 text-sky-400" />
              FORMULA SOLVER ENGINE
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {unitSystem} Mode • {activeCalc.inputs.length} Active Inputs
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{activeCalc.name}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">{activeCalc.description}</p>
        </div>

        {/* Quick Actions & Latex Copy */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowTutorSidebar(!showTutorSidebar)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer ${
              showTutorSidebar
                ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/25 font-black'
                : 'bg-slate-950 hover:bg-slate-800 text-sky-300 hover:text-sky-200 border-sky-500/30'
            }`}
            title="Toggle RAG AI Engineering Tutor Sidebar"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>AI Tutor (RAG)</span>
          </button>

          <button
            onClick={handleCopyLaTeX}
            className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
            title="Copy LaTeX code"
          >
            {copiedLatex ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">LaTeX Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-sky-400" />
                <span>Copy LaTeX</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RAG-ENABLED AI TUTOR EXPANDABLE SIDEBAR / PANEL */}
      <AnimatePresence>
        {showTutorSidebar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <AITutorSidebar
              activeCalc={activeCalc}
              unitSystem={unitSystem}
              inputState={inputState}
              calcOutput={calcOutput}
              isOpen={showTutorSidebar}
              onClose={() => setShowTutorSidebar(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: LATEX FORMULA DISPLAY CARD */}
      <div className="bg-slate-950/90 border border-sky-500/30 rounded-2xl p-5 space-y-4 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <span className="text-[11px] font-extrabold font-mono text-sky-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>LaTeX Governing Equation</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKey(!showKey)}
              className="text-[10px] font-mono font-bold text-slate-400 hover:text-sky-300 flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 cursor-pointer transition"
            >
              <Info className="w-3 h-3 text-sky-400" />
              <span>{showKey ? 'Hide Symbol Key' : 'Variable Decoder Key'}</span>
            </button>
            <button
              onClick={() => setShowDerivation(!showDerivation)}
              className="text-[10px] font-mono font-bold text-slate-400 hover:text-sky-300 flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 cursor-pointer transition"
            >
              <span>{showDerivation ? 'Hide Derivation' : 'Show Derivation'}</span>
              {showDerivation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Big LaTeX Formula Code Box */}
        <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800/90 text-center font-mono text-sky-300 text-sm sm:text-base md:text-lg overflow-x-auto shadow-md tracking-wide">
          <span className="inline-block py-1 px-3 bg-slate-950/60 rounded-lg border border-sky-500/20 text-sky-300 font-bold">
            {activeCalc.formulaLaTeX}
          </span>
        </div>

        <p className="text-xs text-slate-300 font-medium leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
          <strong className="text-slate-100">Formula Description:</strong> {activeCalc.formulaText}
        </p>

        {/* Derivation Expandable */}
        <AnimatePresence>
          {showDerivation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900/90 p-4 rounded-xl border border-amber-500/30 space-y-1.5 text-xs text-slate-300">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Physics Derivation & Fundamental Equations:</span>
                </span>
                <p className="leading-relaxed font-mono text-[11px] text-slate-300">{activeCalc.derivation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Variable Decoder Key Grid */}
        <AnimatePresence>
          {showKey && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pt-1"
            >
              <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                  Variable Definitions & Live Values:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  {activeCalc.inputs.map((inp) => {
                    const currentValSI = inputState[inp.id] ?? inp.defaultValueSI;
                    const val = unitSystem === 'SI' ? currentValSI : inp.siToImp(currentValSI);
                    const unit = unitSystem === 'SI' ? inp.siUnit : inp.impUnit;
                    return (
                      <div
                        key={inp.id}
                        className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <span className="font-bold text-sky-300 font-mono text-[11px] block truncate">
                            {inp.label}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block">{inp.description}</span>
                        </div>
                        <span className="font-mono text-[11px] font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                          {val.toFixed(inp.step < 0.1 ? 3 : 1)} {unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 2: AUTO-POPULATE & PRESET INPUT BAR */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Auto-Populate & Quick Benchmark Presets
            </span>
          </div>

          {/* Quick Auto-Fill Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <button
              onClick={handleAutoPopulateDefaults}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-sky-300 font-mono font-bold rounded-lg border border-slate-800 transition cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3 text-sky-400" />
              <span>Defaults</span>
            </button>
            <button
              onClick={handleRandomizeInputs}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-purple-300 font-mono font-bold rounded-lg border border-slate-800 transition cursor-pointer flex items-center gap-1"
            >
              <Dices className="w-3 h-3 text-purple-400" />
              <span>Randomize</span>
            </button>
            <button
              onClick={handleAutoPopulateMin}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-[10px] rounded-lg border border-slate-800 cursor-pointer"
            >
              Min Bound
            </button>
            <button
              onClick={handleAutoPopulateMax}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-[10px] rounded-lg border border-slate-800 cursor-pointer"
            >
              Max Bound
            </button>
          </div>
        </div>

        {/* Vessel Presets Bar */}
        {vesselPresets.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 font-mono">
              Ship Benchmarks:
            </span>
            {vesselPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetClick(preset)}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-sky-300 font-mono font-semibold rounded-xl border border-slate-800 transition cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <Ship className="w-3 h-3 text-sky-400" />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Preset Applied Toast Notice */}
        <AnimatePresence>
          {autoFilledPresetName && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="p-2.5 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-mono font-bold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Auto-populated formula inputs for: {autoFilledPresetName}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INPUT FIELDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeCalc.inputs.map((inp) => {
            const currentValueSI = inputState[inp.id] ?? inp.defaultValueSI;
            const displayValue =
              unitSystem === 'SI' ? currentValueSI : inp.siToImp(currentValueSI);
            const displayUnit = unitSystem === 'SI' ? inp.siUnit : inp.impUnit;

            return (
              <div
                key={inp.id}
                className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800/90 space-y-2.5 hover:border-slate-700 transition shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span>{inp.label}</span>
                  </label>
                  <span className="font-mono text-sky-400 font-black bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/30 text-xs shadow-inner">
                    {displayValue.toFixed(inp.step < 0.1 ? 3 : 1)} {displayUnit}
                  </span>
                </div>

                <input
                  type="range"
                  min={unitSystem === 'SI' ? inp.min : inp.siToImp(inp.min)}
                  max={unitSystem === 'SI' ? inp.max : inp.siToImp(inp.max)}
                  step={inp.step}
                  value={displayValue}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    const siVal = unitSystem === 'SI' ? val : inp.impToSi(val);
                    onInputChange(inp.id, siVal);
                  }}
                  className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span className="truncate pr-2">{inp.description}</span>
                  <input
                    type="number"
                    value={displayValue}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      const siVal = unitSystem === 'SI' ? val : inp.impToSi(val);
                      onInputChange(inp.id, siVal);
                    }}
                    className="w-20 bg-slate-900 border border-slate-800 text-slate-200 font-bold text-right px-2 py-1 rounded-lg focus:outline-none focus:border-sky-500 text-xs"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: PROMINENT CALCULATE BUTTON WITH ANIMATION TRIGGER */}
      <div className="pt-2 flex flex-col items-center justify-center space-y-3 border-t border-slate-800/80">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCalculateClick}
          disabled={isCalculating}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 hover:from-sky-400 hover:via-indigo-400 hover:to-sky-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-sky-500/25 transition cursor-pointer flex items-center justify-center gap-3 border border-sky-300/40 relative overflow-hidden group"
        >
          {isCalculating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Zap className="w-5 h-5 text-slate-950" />
              </motion.div>
              <span>Solving Formula Equations...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 text-slate-950 fill-slate-950 group-hover:scale-110 transition-transform" />
              <span>SOLVE & CALCULATE RESULTS</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>
        <span className="text-[10px] font-mono text-slate-400">
          Executes LaTeX substitution, class criteria verification, & performance curves
        </span>
      </div>

      {/* SECTION 4: ANIMATED RESULTS SECTION */}
      <AnimatePresence mode="wait">
        {hasCalculated && (
          <motion.div
            key={calculatedTimestamp || 'results-block'}
            id="formula-solver-results"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="space-y-6 pt-4 border-t border-slate-800"
          >
            {/* AI Warning Alerts */}
            {calcOutput.warnings && calcOutput.warnings.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-rose-950/50 border border-rose-500/60 p-4 rounded-2xl space-y-1.5 text-xs shadow-lg"
              >
                <div className="flex items-center gap-2 text-rose-300 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Engineering Class Criteria & Boundary Warning:</span>
                </div>
                {calcOutput.warnings.map((w, i) => (
                  <p key={i} className="text-slate-200 font-mono pl-6 text-[11px]">
                    • {w}
                  </p>
                ))}
              </motion.div>
            )}

            {/* Calculated Key Result Cards Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Calculated Solution Output</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  Calculation Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {calcOutput.results.map((res, idx) => {
                  const val = unitSystem === 'SI' ? res.valueSI : res.valueImp;
                  const unit = unitSystem === 'SI' ? res.siUnit : res.impUnit;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 + 0.1, duration: 0.35 }}
                      className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 p-5 rounded-2xl space-y-2 shadow-xl relative overflow-hidden group hover:border-emerald-400/70 transition"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        {res.label}
                      </span>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono tracking-tight">
                          {typeof val === 'number' ? val.toLocaleString() : val}
                        </span>
                        <span className="text-xs font-mono font-extrabold text-slate-300 bg-slate-800 px-2 py-1 rounded-lg">
                          {unit}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                        <span>Eq: {res.formulaUsed}</span>
                        {res.description && <span className="text-slate-500 italic">{res.description}</span>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Step-by-Step Mathematical Substitution */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-inner">
              <span className="text-xs font-extrabold text-sky-400 block uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Step-by-Step LaTeX Substitution Solution:</span>
              </span>
              <div className="space-y-2 font-mono text-xs text-slate-300">
                {calcOutput.stepByStep.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.2 }}
                    className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-slate-200 flex items-start gap-3"
                  >
                    <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 shrink-0 mt-0.5">
                      Step {idx + 1}
                    </span>
                    <p className="leading-relaxed flex-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Performance Graph if present */}
            {calcOutput.chartData && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-inner">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-sky-300 flex items-center gap-2 font-mono">
                    <BarChart3 className="w-4 h-4 text-sky-400" />
                    <span>{calcOutput.chartTitle || 'Formula Output Curve'}</span>
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">Recharts Visualizer</span>
                </div>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={calcOutput.chartData}>
                      <defs>
                        <linearGradient id="solverChartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey={calcOutput.chartXKey} stroke="#64748b" tick={{ fontSize: 10 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#334155',
                          borderRadius: '12px',
                          fontSize: '11px',
                          color: '#f8fafc'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey={calcOutput.chartYKey || 'value'}
                        stroke="#38bdf8"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#solverChartGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
