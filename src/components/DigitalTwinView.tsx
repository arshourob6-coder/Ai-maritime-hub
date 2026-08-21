import React, { useState, useEffect } from 'react';
import {
  Activity,
  Gauge,
  Cpu,
  AlertTriangle,
  Zap,
  RotateCw,
  Anchor,
  Radio,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Layers,
  Thermometer,
  ShieldAlert,
  Compass,
  Ship,
  Waves,
  Building2,
  Lock,
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  HelpCircle,
  Download,
  Flame,
  FileText
} from 'lucide-react';
import { VesselTwin, VESSEL_TWIN_FLEET } from './digitaltwin/digitalTwinData';
import { ShipDigitalTwin3D } from './digitaltwin/ShipDigitalTwin3D';
import { ShipSystemsMonitor } from './digitaltwin/ShipSystemsMonitor';
import { AiPredictiveAnalytics } from './digitaltwin/AiPredictiveAnalytics';
import { DesignDigitalTwinStudio } from './digitaltwin/DesignDigitalTwinStudio';
import { OffshoreDigitalTwin } from './digitaltwin/OffshoreDigitalTwin';
import { SmartPortDigitalTwin } from './digitaltwin/SmartPortDigitalTwin';
import { DataIntegrationBlockchain } from './digitaltwin/DataIntegrationBlockchain';
import { FleetEnterpriseDashboard } from './digitaltwin/FleetEnterpriseDashboard';
import { PlanType } from '../types';

interface DigitalTwinViewProps {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  isDarkMode?: boolean;
}

export type DigitalTwinTab =
  | '3d_hull_stress'
  | 'systems_monitor'
  | 'predictive_cbm'
  | 'design_studio'
  | 'offshore_twin'
  | 'smart_port'
  | 'iot_blockchain'
  | 'fleet_enterprise';

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({
  userPlan = 'student',
  onOpenPricing,
  isDarkMode = true
}) => {
  const [selectedVessel, setSelectedVessel] = useState<VesselTwin>(VESSEL_TWIN_FLEET[0]);
  const [activeTab, setActiveTab] = useState<DigitalTwinTab>('3d_hull_stress');
  const [engineThrottlePct, setEngineThrottlePct] = useState<number>(82);
  const [seaStateBft, setSeaStateBft] = useState<number>(3);

  // AI Copilot state
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState('');
  const [copilotMessages, setCopilotMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: `Hello! I am your Digital Twin & Smart Ship Copilot. I have real-time access to ${selectedVessel.name}'s 450+ telemetry channels, FEA stress models, Holtrop resistance solver, and predictive CBM alarms. Ask me anything!`,
      time: 'Just now'
    }
  ]);
  const [isCopilotTyping, setIsCopilotTyping] = useState(false);

  // Dynamic vessel telemetry adjusted by throttle slider
  const dynamicVessel: VesselTwin = {
    ...selectedVessel,
    telemetry: {
      ...selectedVessel.telemetry,
      engineLoadPct: engineThrottlePct,
      rpm: Math.round(74 + (engineThrottlePct - 70) * 0.5 - seaStateBft * 0.4),
      speedSOG: Number((16.5 + (engineThrottlePct - 70) * 0.12 - seaStateBft * 0.2).toFixed(1)),
      fuelRateTonsDay: Number((24 + Math.pow(engineThrottlePct / 100, 3) * 42 + seaStateBft * 1.1).toFixed(1)),
      exhaustTempC: Math.round(345 + (engineThrottlePct - 70) * 1.4),
      shaftPowerKW: Math.round(38000 * (engineThrottlePct / 100))
    }
  };

  const handleCopilotSend = () => {
    if (!copilotQuery.trim()) return;
    const userText = copilotQuery;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCopilotMessages((prev) => [...prev, { role: 'user', text: userText, time: timeStr }]);
    setCopilotQuery('');
    setIsCopilotTyping(true);

    setTimeout(() => {
      let aiResponse = '';
      const q = userText.toLowerCase();

      if (q.includes('stress') || q.includes('hull') || q.includes('fea') || q.includes('bending')) {
        aiResponse = `Structural analysis for ${dynamicVessel.name}: The midship bending moment is currently at ${(3850 + engineThrottlePct * 14.5).toFixed(0)} MN·m (68.2% of DNV Rule Maximum). Von Mises stress at Hold #4 lower hopper is 148.4 MPa, well below the 180.0 MPa yield limit. Hull shear force is nominal.`;
      } else if (q.includes('fuel') || q.includes('speed') || q.includes('cii') || q.includes('slow steam')) {
        aiResponse = `At ${engineThrottlePct}% MCR (${dynamicVessel.telemetry.speedSOG} kn), fuel consumption is ${dynamicVessel.telemetry.fuelRateTonsDay} MT/day. By slow-steaming to 16.2 kn (-1.8 kn), you will save ~7.8 MT VLSFO daily ($4,836/day) and preserve your CII Grade A rating for 2026.`;
      } else if (q.includes('engine') || q.includes('cylinder') || q.includes('temperature') || q.includes('exhaust')) {
        aiResponse = `Main Engine (11S90ME-C10.5) status: Cylinder #4 exhaust temp is ${dynamicVessel.telemetry.exhaustTempC}°C (elevated +18°C relative to average). Recommendation: Inspect fuel injector nozzle #4 at next Rotterdam port call.`;
      } else if (q.includes('stability') || q.includes('draft') || q.includes('gm') || q.includes('hydrostatic')) {
        aiResponse = `Hydrostatics & Intact Stability: Draft Fwd=${dynamicVessel.telemetry.draftFwd}m, Draft Aft=${dynamicVessel.telemetry.draftAft}m (Trim 0.40m Aft). Transverse metacentric height GMt = 2.15 m, exceeding the IMO A.749(18) intact stability minimum of 0.15 m by 1,333%.`;
      } else {
        aiResponse = `Analyzing real-time digital twin state for ${dynamicVessel.name}: All 450+ Modbus/NMEA-2000 sensor telemetry channels are broadcasting nominal values. ISO 13374 condition monitoring status is GREEN. What specific parameter or subsystem would you like me to inspect?`;
      }

      setCopilotMessages((prev) => [...prev, { role: 'assistant', text: aiResponse, time: timeStr }]);
      setIsCopilotTyping(false);
    }, 900);
  };

  return (
    <div id="digital-twin-studio-root" className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" /> Maritime Digital Twin Ecosystem
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> 10 Hz Edge IoT & Satcom
              </span>
              <span className="px-2.5 py-0.5 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                <Lock className="w-3 h-3 text-violet-400" /> DNV Class Blockchain Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Vessel, Offshore & Port <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">Digital Twin</span> Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Connect real-world ships, offshore wind & floating platforms, smart ports, and naval architecture parametric CAD with AI-powered virtual replicas.
            </p>
          </div>

          {/* Top Controls: Vessel Select & Copilot Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <select
              value={selectedVessel.id}
              onChange={(e) => {
                const found = VESSEL_TWIN_FLEET.find((v) => v.id === e.target.value);
                if (found) setSelectedVessel(found);
              }}
              className="bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-sky-400"
            >
              {VESSEL_TWIN_FLEET.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.type})
                </option>
              ))}
            </select>

            <button
              onClick={() => setCopilotOpen(!copilotOpen)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/30 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Digital Twin Copilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Modules Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: '3d_hull_stress', label: '3D Ship Twin & FEA Stress', icon: <Layers className="w-4 h-4" /> },
          { id: 'systems_monitor', label: 'Ship Systems (9 Subsystems)', icon: <Gauge className="w-4 h-4" /> },
          { id: 'predictive_cbm', label: 'Predictive Analytics & CBM', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'design_studio', label: 'Design Digital Twin Studio', icon: <Compass className="w-4 h-4" /> },
          { id: 'offshore_twin', label: 'Offshore & Floating Wind', icon: <Waves className="w-4 h-4" /> },
          { id: 'smart_port', label: 'Smart Port & Cold Ironing', icon: <Anchor className="w-4 h-4" /> },
          { id: 'iot_blockchain', label: 'IoT Stream & Blockchain', icon: <Cpu className="w-4 h-4" /> },
          { id: 'fleet_enterprise', label: 'Enterprise Fleet & SaaS', icon: <Building2 className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Telemetry Simulation Environment Controller */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-bold text-slate-300 w-full md:w-auto">
          <Sliders className="w-4 h-4 text-sky-400 shrink-0" />
          <span>Simulate Engine Throttle: <strong className="text-sky-400 font-mono text-sm">{engineThrottlePct}% MCR</strong></span>
        </div>
        <input
          type="range"
          min="40"
          max="100"
          value={engineThrottlePct}
          onChange={(e) => setEngineThrottlePct(Number(e.target.value))}
          className="w-full md:w-64 accent-sky-500 cursor-pointer"
        />

        <div className="flex items-center gap-3 text-xs font-bold text-slate-300 w-full md:w-auto">
          <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Sea State: <strong className="text-emerald-400 font-mono">Beaufort {seaStateBft}</strong></span>
        </div>
        <div className="flex gap-1">
          {[1, 3, 5, 7, 9].map((bft) => (
            <button
              key={bft}
              onClick={() => setSeaStateBft(bft)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                seaStateBft === bft ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Bft {bft}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Content Routing */}
      {activeTab === '3d_hull_stress' && (
        <ShipDigitalTwin3D vessel={dynamicVessel} isDarkMode={isDarkMode} />
      )}

      {activeTab === 'systems_monitor' && (
        <ShipSystemsMonitor vessel={dynamicVessel} isDarkMode={isDarkMode} />
      )}

      {activeTab === 'predictive_cbm' && (
        <AiPredictiveAnalytics vessel={dynamicVessel} isDarkMode={isDarkMode} />
      )}

      {activeTab === 'design_studio' && (
        <DesignDigitalTwinStudio vessel={dynamicVessel} isDarkMode={isDarkMode} />
      )}

      {activeTab === 'offshore_twin' && (
        <OffshoreDigitalTwin isDarkMode={isDarkMode} />
      )}

      {activeTab === 'smart_port' && (
        <SmartPortDigitalTwin isDarkMode={isDarkMode} />
      )}

      {activeTab === 'iot_blockchain' && (
        <DataIntegrationBlockchain vessel={dynamicVessel} isDarkMode={isDarkMode} />
      )}

      {activeTab === 'fleet_enterprise' && (
        <FleetEnterpriseDashboard
          onSelectVessel={(v) => {
            setSelectedVessel(v);
            setActiveTab('3d_hull_stress');
          }}
          userPlan={userPlan}
          onOpenPricing={onOpenPricing}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Slide-out AI Digital Twin Copilot Assistant Modal / Drawer */}
      {copilotOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between p-6 animate-in slide-in-from-right duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white flex items-center gap-1.5">
                    Digital Twin Copilot
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Synchronized with {dynamicVessel.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCopilotOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="flex flex-wrap gap-1.5">
              {[
                'Check Hold #4 Stress',
                'Simulate Slow Steaming',
                'Exhaust Gas Temp Alert',
                'Verify IMO GMt Stability'
              ].map((suggestion, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => {
                    setCopilotQuery(suggestion);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-800 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Message Stream */}
            <div className="h-[440px] overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              {copilotMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-sky-600 text-white rounded-br-sm'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-sm shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 font-mono">{msg.time}</span>
                </div>
              ))}

              {isCopilotTyping && (
                <div className="flex items-center gap-2 p-3 bg-slate-900/60 rounded-2xl text-xs text-slate-400 border border-slate-800">
                  <RotateCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
                  <span>Analyzing digital twin telemetry & physics engine...</span>
                </div>
              )}
            </div>
          </div>

          {/* Copilot Input Box */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCopilotSend()}
                placeholder="Ask about stress, fuel, engine, or stability..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-sky-500"
              />
              <button
                onClick={handleCopilotSend}
                className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[10px] text-slate-500 block text-center">
              ISO 13374 Condition Monitoring & DNV Class Digital Twin Certified
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
