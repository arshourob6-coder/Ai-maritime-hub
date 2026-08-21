import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Clock,
  Wrench,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  Activity,
  Sliders,
  DollarSign,
  ArrowRight,
  Filter,
  Plus
} from 'lucide-react';
import { VesselTwin, PREDICTIVE_WORK_ORDERS, PredictiveWorkOrder } from './digitalTwinData';

interface AiPredictiveAnalyticsProps {
  vessel: VesselTwin;
  isDarkMode?: boolean;
}

export const AiPredictiveAnalytics: React.FC<AiPredictiveAnalyticsProps> = ({
  vessel,
  isDarkMode = true
}) => {
  const [workOrders, setWorkOrders] = useState<PredictiveWorkOrder[]>(PREDICTIVE_WORK_ORDERS);
  const [filterCriticality, setFilterCriticality] = useState<string>('all');
  const [selectedWO, setSelectedWO] = useState<PredictiveWorkOrder | null>(workOrders[0]);
  const [simulatedSpeedReductionKnots, setSimulatedSpeedReductionKnots] = useState<number>(1.8);

  const filteredOrders = workOrders.filter((wo) => {
    return filterCriticality === 'all' || wo.criticality.toLowerCase() === filterCriticality.toLowerCase();
  });

  // Calculate dynamic savings for speed optimization
  const currentSpeed = vessel.telemetry.speedSOG;
  const targetSpeed = Math.max(12, currentSpeed - simulatedSpeedReductionKnots);
  const currentFuelTons = vessel.telemetry.fuelRateTonsDay;
  const newFuelTons = (currentFuelTons * Math.pow(targetSpeed / currentSpeed, 3)).toFixed(1);
  const fuelSavedTons = (currentFuelTons - Number(newFuelTons)).toFixed(1);
  const dailyDollarSaved = (Number(fuelSavedTons) * 620).toFixed(0); // $620/MT VLSFO
  const euEtsSavedUSD = (Number(fuelSavedTons) * 3.114 * 85).toFixed(0); // €85/ton CO2 converted to USD
  const totalDailyFinancialBenefit = Number(dailyDollarSaved) + Number(euEtsSavedUSD);

  const handleApproveWorkOrder = (woId: string) => {
    alert(`Work Order ${woId} approved and dispatched to Chief Engineer PMS & Shipyard Spares Procurement (AMOS/SAP PM)!`);
  };

  return (
    <div id="ai-predictive-analytics-root" className="space-y-6">
      
      {/* Top Section: Remaining Useful Life & Predictive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* RUL Card 1: Main Engine Bearings */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Remaining Useful Life (RUL)</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
              WEIBULL β=1.85
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Main Bearing #4 (Babbitt)</h4>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
              14,200 <span className="text-xs font-sans text-slate-400">operating hrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[82%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Installed: 2022</span>
              <span>Predicted End-of-Life: 2029</span>
            </div>
          </div>
        </div>

        {/* RUL Card 2: Turbocharger Rotor */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Remaining Useful Life (RUL)</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
              ATTENTION
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Turbocharger Rotor Blades</h4>
            <div className="text-2xl font-black font-mono text-amber-400 mt-1">
              2,800 <span className="text-xs font-sans text-slate-400">operating hrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[45%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Fatigue Cycles: 8.4M</span>
              <span className="text-amber-400 font-bold">Overhaul @ Rotterdam</span>
            </div>
          </div>
        </div>

        {/* RUL Card 3: Stern Tube Seal */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Remaining Useful Life (RUL)</span>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold font-mono">
              OPTIMAL
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Stern Tube Inflatable Seal</h4>
            <div className="text-2xl font-black font-mono text-sky-400 mt-1">
              8,600 <span className="text-xs font-sans text-slate-400">operating hrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-sky-500 h-full w-[68%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Oil Leak Rate: 0.0 L/d</span>
              <span>Next Dry Dock: 2028</span>
            </div>
          </div>
        </div>

      </div>

      {/* Speed, Fuel & CII Optimization Twin Simulator */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-black border border-violet-500/30">
                AI ENERGY & CII SOLVER
              </span>
              <span className="text-xs text-slate-400">ISO 15016 Speed-Power Hydrodynamic Twin</span>
            </div>
            <h3 className="text-lg font-black text-white mt-1">
              Eco-Speed & Carbon Cost Reduction Optimizer
            </h3>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Baseline Speed:</span>
            <strong className="text-white">{currentSpeed} kn</strong>
            <span className="text-slate-400">→ Target:</span>
            <strong className="text-emerald-400">{targetSpeed.toFixed(1)} kn</strong>
          </div>
        </div>

        {/* Speed Adjustment Slider */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-violet-400" />
              Adjust Slow Steaming Delta:
            </span>
            <span className="text-violet-400 font-mono font-bold">
              -{simulatedSpeedReductionKnots} knots reduction
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="4.0"
            step="0.1"
            value={simulatedSpeedReductionKnots}
            onChange={(e) => setSimulatedSpeedReductionKnots(Number(e.target.value))}
            className="w-full accent-violet-500 cursor-pointer"
          />
        </div>

        {/* Simulation Output Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block font-mono">DAILY FUEL SAVED</span>
            <div className="text-xl font-black font-mono text-emerald-400">-{fuelSavedTons} <span className="text-xs font-sans text-slate-400">MT/day</span></div>
            <span className="text-[10px] text-slate-400">New rate: {newFuelTons} MT/day</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block font-mono">BUNKER COST SAVING</span>
            <div className="text-xl font-black font-mono text-emerald-400">${dailyDollarSaved} <span className="text-xs font-sans text-slate-400">/day</span></div>
            <span className="text-[10px] text-slate-400">Based on $620/MT VLSFO</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block font-mono">EU ETS CO2 ALLOWANCES</span>
            <div className="text-xl font-black font-mono text-violet-400">${euEtsSavedUSD} <span className="text-xs font-sans text-slate-400">/day</span></div>
            <span className="text-[10px] text-slate-400">Carbon tax liability saved</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 block font-mono">TOTAL DAILY BENEFIT</span>
            <div className="text-xl font-black font-mono text-sky-400">${totalDailyFinancialBenefit.toLocaleString()} <span className="text-xs font-sans text-slate-400">/day</span></div>
            <span className="text-[10px] text-emerald-400 font-bold">CII: Grade A Maintained</span>
          </div>
        </div>
      </div>

      {/* Predictive Maintenance Work Orders Hub */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-400" />
              Condition-Based Maintenance (CBM) & Work Orders
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              AI-generated work orders based on vibration FFT spectra, thermal gradients, and lube oil degradation models.
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterCriticality}
              onChange={(e) => setFilterCriticality(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-sky-500"
            >
              <option value="all">All Criticalities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="routine">Routine</option>
            </select>
          </div>
        </div>

        {/* Work Orders List & Selected Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {filteredOrders.map((wo) => (
              <div
                key={wo.id}
                onClick={() => setSelectedWO(wo)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  selectedWO?.id === wo.id
                    ? 'bg-slate-950 border-amber-500 ring-1 ring-amber-500/50 shadow-md'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400 font-bold">{wo.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      wo.criticality === 'High' ? 'bg-amber-500/20 text-amber-300' :
                      wo.criticality === 'Urgent' ? 'bg-rose-500/20 text-rose-300' :
                      'bg-sky-500/20 text-sky-300'
                    }`}>
                      {wo.criticality}
                    </span>
                    {wo.classSurveyItem && (
                      <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 text-[10px] font-bold">
                        CLASS SURVEY ITEM
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-white">{wo.component}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{wo.actionRequired}</p>
                </div>

                <div className="flex sm:flex-col items-end justify-between shrink-0 text-right">
                  <span className="text-xs font-mono font-black text-amber-400">
                    ~{wo.predictedFailureHorizonHrs} hrs horizon
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    AI Confidence: {wo.confidenceScorePct}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Work Order Action Sheet */}
          {selectedWO && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-mono text-slate-400 font-bold">{selectedWO.id} DETAILS</span>
                  <span className="font-bold text-emerald-400">${selectedWO.estCostUSD.toLocaleString()} EST.</span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white">{selectedWO.component}</h4>
                  <span className="text-slate-400 text-[11px]">System: {selectedWO.system}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 font-mono text-[11px]">
                  <div>Spare Part: <strong className="text-sky-400">{selectedWO.partNumber}</strong></div>
                  <div>Lead Time: <strong className="text-white">4 Business Days (Rotterdam Hub)</strong></div>
                  <div>Survey Requirement: <strong className="text-violet-300">{selectedWO.classSurveyItem ? 'DNV Surveyor Sign-Off' : 'Chief Engineer Log'}</strong></div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium block">Action Protocol:</span>
                  <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-[11px]">
                    {selectedWO.actionRequired}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleApproveWorkOrder(selectedWO.id)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 mt-4"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Dispatch Work Order</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
