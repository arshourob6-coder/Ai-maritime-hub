import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Anchor, Sparkles, Layers, Box, Cpu, Download, RefreshCw, Sliders, CheckCircle, FileText } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const ShipDesignStudioView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [vesselType, setVesselType] = useState('Container Ship');
  const [loa, setLoa] = useState(250);
  const [beam, setBeam] = useState(32.2);
  const [draft, setDraft] = useState(11.5);
  const [cb, setCb] = useState(0.68);
  const [designSpeed, setDesignSpeed] = useState(21.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'3d' | 'ga' | 'lines' | 'hydrostatics'>('3d');

  const handleGenerateHull = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  const displacementTonnes = Math.round(loa * beam * draft * cb * 1.025);
  const froudeNumber = (designSpeed * 0.51444) / Math.sqrt(9.81 * loa);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      
      {/* Top Subscription Callout */}
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="AI Ship Design Studio" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
              Tool #26
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Box className="w-7 h-7 text-sky-400" />
              AI Ship Design Studio
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Generate parametric hull forms, General Arrangement (GA) drawings, lines plans, and hydrostatic calculations using AI physics models.
          </p>
        </div>

        <button
          onClick={handleGenerateHull}
          disabled={isGenerating}
          className="px-5 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Optimizing Hull Mesh...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Hull & GA Plan</span>
            </>
          )}
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Sidebar */}
        <div className="lg:col-span-4 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-5">
          <h3 className="font-bold text-sm text-sky-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Parametric Ship Inputs
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Vessel Type</label>
              <select
                value={vesselType}
                onChange={(e) => setVesselType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="Container Ship">Container Ship (Ultra Large)</option>
                <option value="Bulk Carrier">Bulk Carrier (Capesize)</option>
                <option value="LNG Tanker">LNG / LBG Carrier (Membrane)</option>
                <option value="Oil Tanker">VLCC Oil Tanker</option>
                <option value="Naval Frigate">Naval Stealth Frigate</option>
                <option value="Offshore Crew Vessel">Offshore Wind CTV / SOV</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Length Overall (LOA)</span>
                <span className="text-sky-400 font-mono font-bold">{loa} m</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                value={loa}
                onChange={(e) => setLoa(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Moulded Beam (B)</span>
                <span className="text-sky-400 font-mono font-bold">{beam} m</span>
              </div>
              <input
                type="range"
                min="8"
                max="60"
                step="0.1"
                value={beam}
                onChange={(e) => setBeam(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Design Draft (T)</span>
                <span className="text-sky-400 font-mono font-bold">{draft} m</span>
              </div>
              <input
                type="range"
                min="2"
                max="22"
                step="0.1"
                value={draft}
                onChange={(e) => setDraft(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Block Coefficient (Cb)</span>
                <span className="text-sky-400 font-mono font-bold">{cb}</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="0.88"
                step="0.01"
                value={cb}
                onChange={(e) => setCb(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Design Service Speed</span>
                <span className="text-sky-400 font-mono font-bold">{designSpeed} knots</span>
              </div>
              <input
                type="range"
                min="8"
                max="32"
                step="0.5"
                value={designSpeed}
                onChange={(e) => setDesignSpeed(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Displacement (Δ):</span>
              <span className="text-white font-mono font-bold">{displacementTonnes.toLocaleString()} MT</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Froude Number (Fn):</span>
              <span className="text-white font-mono font-bold">{froudeNumber.toFixed(3)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>L/B Ratio:</span>
              <span className="text-white font-mono font-bold">{(loa / beam).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => onOpenPricing && onOpenPricing('professional')}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold rounded-xl text-xs transition border border-slate-700 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CAD / Maxsurf IGES</span>
          </button>
        </div>

        {/* CAD & Viewport Canvas */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between">
          
          {/* Viewport Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4 text-xs">
            <button
              onClick={() => setActiveTab('3d')}
              className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === '3d' ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              3D Hull View
            </button>
            <button
              onClick={() => setActiveTab('ga')}
              className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === 'ga' ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              GA Arrangement Plan
            </button>
            <button
              onClick={() => setActiveTab('lines')}
              className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === 'lines' ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              Lines Plan (Body Plan)
            </button>
            <button
              onClick={() => setActiveTab('hydrostatics')}
              className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === 'hydrostatics' ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              Hydrostatic Curves
            </button>
          </div>

          {/* Interactive Graphic Canvas Display */}
          <div className="my-6 min-h-[320px] bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center p-6 overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:20px_20px]" />

            {activeTab === '3d' && (
              <div className="relative text-center space-y-4">
                <div className="w-80 h-36 mx-auto bg-gradient-to-r from-sky-500/30 via-indigo-500/30 to-purple-500/30 rounded-full border-2 border-sky-400/80 shadow-[0_0_30px_rgba(56,189,248,0.2)] flex items-center justify-center relative transform -rotate-3 hover:rotate-0 transition duration-500">
                  <div className="absolute top-2 left-6 text-[10px] font-mono text-sky-300">Bow Bulb Included</div>
                  <div className="absolute bottom-2 right-6 text-[10px] font-mono text-indigo-300">Stern Skeg & Propeller Hub</div>
                  <Cpu className="w-12 h-12 text-sky-400 animate-pulse" />
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Parametric Mesh • LOA {loa}m x B {beam}m x T {draft}m • Cb {cb}
                </div>
              </div>
            )}

            {activeTab === 'ga' && (
              <div className="w-full space-y-3">
                <div className="h-28 bg-slate-900 rounded-xl border border-sky-500/40 p-3 flex flex-col justify-between text-[11px] font-mono">
                  <div className="flex justify-between border-b border-slate-800 pb-1 text-sky-400">
                    <span>SUPERSTRUCTURE & BRIDGE</span>
                    <span>CARGO HOLDS 1 - 6</span>
                    <span>ENGINE ROOM & BOW THRUSTER</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 my-2">
                    {[1, 2, 3, 4, 5, 6].map((h) => (
                      <div key={h} className="bg-slate-800/80 border border-slate-700 rounded p-1.5 text-center text-[10px] text-slate-300">
                        Hold #{h}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center text-xs text-slate-400 font-mono">
                  General Arrangement • IMO SOLAS Double Bottom Layout Compliant
                </div>
              </div>
            )}

            {activeTab === 'lines' && (
              <div className="w-full flex items-center justify-center gap-8">
                <div className="w-40 h-40 border-2 border-dashed border-sky-500/50 rounded-full flex items-center justify-center text-[11px] text-sky-300 font-mono p-4 text-center">
                  Stations 0 - 10 (Aft Body Lines)
                </div>
                <div className="w-40 h-40 border-2 border-dashed border-indigo-500/50 rounded-full flex items-center justify-center text-[11px] text-indigo-300 font-mono p-4 text-center">
                  Stations 10 - 20 (Fore Body Lines)
                </div>
              </div>
            )}

            {activeTab === 'hydrostatics' && (
              <div className="w-full space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between p-2 bg-slate-900 rounded">
                  <span>KMt (Transverse Metacentric Height):</span>
                  <span className="text-sky-400 font-bold">14.85 m</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-900 rounded">
                  <span>LCB (Longitude Center of Buoyancy):</span>
                  <span className="text-sky-400 font-bold">122.40 m from AFT</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-900 rounded">
                  <span>TPC (Tonnes Per Cm Immersion):</span>
                  <span className="text-sky-400 font-bold">64.2 MT/cm</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-900 rounded">
                  <span>MTC (Moment to Change Trim 1cm):</span>
                  <span className="text-sky-400 font-bold">1,820 MT-m</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>DNV & ABS Hull Class Rules Validated</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onOpenPricing && onOpenPricing('professional')}
                className="px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold rounded-xl border border-sky-500/40 transition"
              >
                Download PDF & DXF
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Subscription Banner Footer */}
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
