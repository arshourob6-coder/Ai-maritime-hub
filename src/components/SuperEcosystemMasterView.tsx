import React, { useState, useEffect, useRef } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType, ViewMode } from '../types';
import {
  Globe,
  Cpu,
  Store,
  Share2,
  BookOpen,
  Building2,
  Code2,
  DollarSign,
  Zap,
  Sparkles,
  Layers,
  Ship,
  Compass,
  Search,
  Users,
  ShieldCheck,
  TrendingUp,
  Activity,
  Terminal,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Award,
  ArrowRight,
  ExternalLink,
  Download,
  Lock,
  Boxes,
  Radio,
  FileText,
  Video,
  Database,
  Briefcase,
  HelpCircle,
  BarChart3,
  Bot,
  Laptop,
  GraduationCap,
  Network,
  Anchor,
  Flame,
  Key,
  ShieldAlert,
  HardDrive
} from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: ViewMode) => void;
}

export const SuperEcosystemMasterView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView,
}) => {
  // Master Tab Switcher for Prompts 196 to 205
  const [activeTab, setActiveTab] = useState<
    | 'ecosystem'    // 196. Super Ecosystem
    | 'ai_os'        // 197. AI Operating System
    | 'marketplace'  // 198. Everything Marketplace
    | 'innovation'   // 199. Innovation Platform
    | 'knowledge'    // 200. Global Knowledge Network
    | 'enterprise'   // 201. Enterprise Cloud
    | 'app_store'    // 202. Maritime App Store
    | 'business'     // 203. AI Business Platform
    | 'future_tech'  // 204. Future Technologies
    | 'master_hub'   // 205. Final Master Prompt Hub
  >('ecosystem');

  // 197. AI OS Agent States
  const [activeAgents, setActiveAgents] = useState([
    { id: 'ag_01', name: 'SOLAS Safety & Class Auditor', status: 'Active', cpuLoad: '12%', task: 'Auditing Hull Structural Drawings against DNV-RU-SHIP v2026' },
    { id: 'ag_02', name: 'CII & EU ETS Emissions Copilot', status: 'Active', cpuLoad: '18%', task: 'Optimizing Engine RPM & Speed Profile for Voyage #MAR-9021' },
    { id: 'ag_03', name: 'Chartering & Freight Negotiator', status: 'Standby', cpuLoad: '2%', task: 'Monitoring Baltic Dry Index spot rate triggers' },
    { id: 'ag_04', name: 'Predictive Machinery Anomaly Agent', status: 'Active', cpuLoad: '24%', task: 'Processing Main Engine Cylinder #4 Vibration Spectrum' }
  ]);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[SYSTEM] Maritime OS v5.0 Kernel booted in 14ms.',
    '[AGENT-01] SOLAS Compliance Agent initialized with DNV, ABS & Lloyd\'s rulebooks.',
    '[AGENT-02] Real-time Starlink Telemetry feed connected to MMSI 211394000.',
    '[WORKFLOW] Trigger "Fuel Spike > 8%" -> Executing auto-trim adjustment.'
  ]);
  const [newLogInput, setNewLogInput] = useState('');

  // 198. Marketplace State
  const [mktFilter, setMktFilter] = useState<string>('all');
  const [mktSearch, setMktSearch] = useState<string>('');

  // 201. Enterprise Cloud State
  const [activeEnterpriseModule, setActiveEnterpriseModule] = useState<'digital_twin' | 'erp' | 'crm' | 'telemetry'>('digital_twin');

  // 202. App Store Publishing State
  const [devAppTitle, setDevAppTitle] = useState('');
  const [devAppCategory, setDevAppCategory] = useState('AI Agent');
  const [devAppPrice, setDevAppPrice] = useState('49');
  const [publishedAppsCount, setPublishedAppsCount] = useState(148);

  // 204. Future Tech Quantum Simulation State
  const [quantumQubits, setQuantumQubits] = useState(32);
  const [quantumConvergence, setQuantumConvergence] = useState(99.4);
  const [autonomousSwarmCount, setAutonomousSwarmCount] = useState(6);

  // Canvas Ref for Interactive Visualizations
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation Loop for Canvas
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const time = Date.now() * 0.0015;

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      if (activeTab === 'ai_os') {
        // AI OS Neural Workflow Graph Visualizer
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1;

        // Grid lines
        for (let x = 0; x < w; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        // Active Agent Neural Nodes
        const nodes = [
          { x: w * 0.2, y: h * 0.3, label: 'Sensor Ingest', color: '#38bdf8' },
          { x: w * 0.5, y: h * 0.3, label: 'AI Kernel', color: '#818cf8' },
          { x: w * 0.8, y: h * 0.3, label: 'SOLAS Compliance', color: '#34d399' },
          { x: w * 0.35, y: h * 0.7, label: 'Predictive Maint', color: '#fbbf24' },
          { x: w * 0.65, y: h * 0.7, label: 'Auto Actions', color: '#f43f5e' }
        ];

        // Draw connections
        ctx.lineWidth = 2;
        nodes.forEach((n1, i) => {
          nodes.forEach((n2, j) => {
            if (i < j) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 + Math.sin(time + i + j) * 0.1})`;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          });
        });

        // Draw node points
        nodes.forEach(n => {
          ctx.fillStyle = n.color;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 8 + Math.sin(time * 3) * 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#f8fafc';
          ctx.font = '11px monospace';
          ctx.fillText(n.label, n.x - 30, n.y + 22);
        });

      } else if (activeTab === 'enterprise') {
        // Digital Twin Port & Fleet Live Stream Simulation
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;

        // Coastline
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        ctx.quadraticCurveTo(w * 0.3, h * 0.4, w * 0.6, h * 0.6);
        ctx.lineTo(w, h * 0.5);
        ctx.stroke();

        // Animated Vessels
        for (let i = 0; i < 5; i++) {
          const vx = (w * 0.1 + i * 130 + time * 20) % w;
          const vy = h * 0.6 + Math.sin(vx * 0.02 + i) * 25;

          ctx.fillStyle = i === 0 ? '#38bdf8' : '#34d399';
          ctx.beginPath();
          ctx.arc(vx, vy, 6, 0, Math.PI * 2);
          ctx.fill();

          // Vessel Label
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '10px monospace';
          ctx.fillText(`IMO 9840${i}21 [AIS ACTIVE]`, vx - 20, vy - 12);
        }

      } else if (activeTab === 'future_tech') {
        // Autonomous Swarm & Quantum Waveform
        ctx.strokeStyle = '#c084fc'; // Quantum Purple
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        for (let x = 0; x < w; x += 5) {
          const y = h / 2 + Math.sin(x * 0.03 + time * 4) * 35 * Math.cos(x * 0.01 + time);
          ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = '#c084fc';
        ctx.font = '11px monospace';
        ctx.fillText(`QUANTUM HULL SHAPE SOLVER • ${quantumQubits} QUBITS • VQE CONVERGENCE ${quantumConvergence}%`, 20, 30);

      } else {
        // Super Ecosystem Hub Network Matrix
        for (let i = 0; i < 8; i++) {
          const x = (w / 9) * (i + 1);
          const y = h / 2 + Math.sin(time + i) * 40;

          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
          ctx.beginPath();
          ctx.arc(x, y, 18 + Math.sin(time * 2 + i) * 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = '#38bdf8';
        ctx.font = '12px monospace';
        ctx.fillText('GLOBAL AI MARITIME SUPER ECOSYSTEM • 145 INTEGRATED MODULES ACTIVE', 20, 30);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, quantumQubits, quantumConvergence]);

  // Handle Command Submission in OS Terminal
  const handleExecuteCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogInput.trim()) return;
    setTerminalLogs(prev => [...prev, `> ${newLogInput}`, `[KERNEL] Executing instruction: "${newLogInput}" across AI OS agents...`, `[SUCCESS] Task completed in 28ms.`]);
    setNewLogInput('');
  };

  // List of all 10 Master Modules (#196 to #205)
  const masterModules = [
    { id: 'ecosystem', name: '196. Super Ecosystem', icon: Globe, cat: 'Core Platform' },
    { id: 'ai_os', name: '197. AI Operating System', icon: Cpu, cat: 'Kernel & Agents' },
    { id: 'marketplace', name: '198. Everything Marketplace', icon: Store, cat: 'Global Commerce' },
    { id: 'innovation', name: '199. Innovation Platform', icon: Share2, cat: 'R&D Ecosystem' },
    { id: 'knowledge', name: '200. Global Knowledge Network', icon: BookOpen, cat: 'Intelligence' },
    { id: 'enterprise', name: '201. Enterprise Cloud', icon: Building2, cat: 'Port & Fleet ERP' },
    { id: 'app_store', name: '202. Maritime App Store', icon: Code2, cat: 'Dev Monetization' },
    { id: 'business', name: '203. AI Business Platform', icon: DollarSign, cat: 'Finance & Supply' },
    { id: 'future_tech', name: '204. Future Technologies', icon: Zap, cat: 'Deep Tech & Quantum' },
    { id: 'master_hub', name: '205. Master Ecosystem Hub', icon: Sparkles, cat: 'Flagship OS' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="World's Largest Maritime Super Ecosystem (#196-#205)"
      />

      {/* TOP HERO BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Prompts #196 - #205 Master Flagship Platform
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              The Maritime Operating System
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              100% Full Ecosystem Integration
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-3">
            <Globe className="w-10 h-10 text-sky-400" />
            AI Maritime Super Ecosystem & OS
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            The all-in-one operating system unifying AI, education, engineering, research, simulation, compliance, careers, marketplaces, digital twins, enterprise cloud, and deep tech for the global maritime industry.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => onOpenPricing && onOpenPricing('enterprise')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-sky-500/20 transition flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Enterprise OS License
          </button>
        </div>
      </div>

      {/* TOP NAVIGATION TABS (#196 - #205) */}
      <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs gap-1.5 overflow-x-auto">
        {masterModules.map(mod => {
          const Icon = mod.icon;
          const isActive = activeTab === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveTab(mod.id as any)}
              className={`px-3 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{mod.name}</span>
            </button>
          );
        })}
      </div>

      {/* DYNAMIC LIVE CANVAS DISPLAY */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Live Ecosystem Stream ({activeTab.toUpperCase()}) • 60 FPS Engine
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Status: ALL SYSTEMS OPERATIONAL</span>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={720}
            height={220}
            className="w-full h-auto max-h-[220px] object-contain"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 196: SUPER ECOSYSTEM DASHBOARD */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'ecosystem' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Integrated AI Tools</span>
              <div className="text-3xl font-black text-sky-400">145+ Tools</div>
              <p className="text-[11px] text-slate-400">Naval arch, CFD, stability, AIS, compliance</p>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Active Users</span>
              <div className="text-3xl font-black text-emerald-400">250,000+</div>
              <p className="text-[11px] text-slate-400">Engineers, captains, students, shipyards</p>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Fleet Asset Value</span>
              <div className="text-3xl font-black text-indigo-400">$4.2 Billion</div>
              <p className="text-[11px] text-slate-400">Vessels monitored under Digital Twins</p>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Connected Network</span>
              <div className="text-3xl font-black text-amber-400">180+ Shipyards</div>
              <p className="text-[11px] text-slate-400">Global ports & classification societies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" /> Core Ecosystem Pillars
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-300">1. AI & Autonomous Workflows</span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">100% Live</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-300">2. Global Maritime Education</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">STCW Cert</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-300">3. Naval Arch Engineering Lab</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">Maxsurf/CFD</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-300">4. Research & Digital Libraries</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">50k+ Books</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 lg:col-span-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" /> Unified Platform Matrix (#196)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seamlessly bridges academic research, ship design, regulatory compliance, daily vessel operations, career advancement, and enterprise logistics into one single login.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <button onClick={() => onSelectView && onSelectView('ai_chat')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-sky-400 group-hover:text-white">AI Maritime Copilot</div>
                  <div className="text-[10px] text-slate-400">Instant answers & code</div>
                </button>
                <button onClick={() => onSelectView && onSelectView('ship_design_studio')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-emerald-400 group-hover:text-white">Ship Design Studio</div>
                  <div className="text-[10px] text-slate-400">Hull hydrostatics & 3D</div>
                </button>
                <button onClick={() => onSelectView && onSelectView('digital_twin')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-amber-400 group-hover:text-white">Digital Twin Cloud</div>
                  <div className="text-[10px] text-slate-400">Live Starlink telemetry</div>
                </button>
                <button onClick={() => onSelectView && onSelectView('ai_career_path_planner')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-purple-400 group-hover:text-white">AI Career Path Planner</div>
                  <div className="text-[10px] text-slate-400">Skills & STCW Trajectory</div>
                </button>
                <button onClick={() => onSelectView && onSelectView('ai_research_lab')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-indigo-400 group-hover:text-white">210. AI Research Lab</div>
                  <div className="text-[10px] text-slate-400">GPU Notebook & PyTorch ML</div>
                </button>
                <button onClick={() => onSelectView && onSelectView('smart_shipyard')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-sky-400 group-hover:text-white">206. Smart Shipyard</div>
                  <div className="text-[10px] text-slate-400">Welding QA & Production</div>
                </button>
                <button onClick={() => onSelectView && onSelectView('maritime_commerce')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-emerald-400 group-hover:text-white">207. Maritime Commerce</div>
                  <div className="text-[10px] text-slate-400">Spare Parts & Equipment</div>
                </button>
                <button onClick={() => onSelectView && onSelectView('ai_assistant_builder')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-purple-400 group-hover:text-white">208. AI Assistant Builder</div>
                  <div className="text-[10px] text-slate-400">No-code Agent Studio</div>
                </button>
                <button onClick={() => onSelectView && onSelectView('autonomous_vessel_hub')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-amber-400 group-hover:text-white">213. Autonomous Vessel</div>
                  <div className="text-[10px] text-slate-400">MASS Level 4 Simulator</div>
                </button>
                <button onClick={() => onSelectView && onSelectView('maritime_metaverse')} className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-sky-500/50 text-left space-y-1 group">
                  <div className="text-xs font-bold text-pink-400 group-hover:text-white">225. Maritime Metaverse</div>
                  <div className="text-[10px] text-slate-400">3D VR Bridge & Expo</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 197: AI OPERATING SYSTEM */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'ai_os' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active AI Agents Panel */}
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-sky-400" /> Autonomous AI Agents (#197)
              </h3>
              <div className="space-y-3">
                {activeAgents.map(ag => (
                  <div key={ag.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{ag.name}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">{ag.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">{ag.task}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                      <span>CPU Load: <strong className="text-sky-300">{ag.cpuLoad}</strong></span>
                      <span className="font-mono text-slate-400">{ag.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maritime OS Live Terminal & Command Execution */}
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 lg:col-span-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" /> Maritime OS Kernel Command Shell
              </h3>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2 h-56 overflow-y-auto">
                {terminalLogs.map((log, i) => (
                  <div key={i} className={log.startsWith('>') ? 'text-sky-300 font-bold' : log.includes('SUCCESS') ? 'text-emerald-400' : 'text-slate-300'}>
                    {log}
                  </div>
                ))}
              </div>

              <form onSubmit={handleExecuteCommand} className="flex gap-2">
                <input
                  type="text"
                  value={newLogInput}
                  onChange={e => setNewLogInput(e.target.value)}
                  placeholder="Execute kernel instruction (e.g., 'run solas audit --vessel hull_04')"
                  className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Execute
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 198: EVERYTHING MARKETPLACE */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={mktSearch}
                onChange={e => setMktSearch(e.target.value)}
                placeholder="Search 10,000+ AI tools, datasets, books, Maxsurf templates..."
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full sm:w-80"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['all', 'AI Agents', 'Datasets', 'Books', 'Calculators', 'Jobs'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setMktFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    mktFilter === cat ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Autonomic CFD Wave Mesh Agent', author: 'NavalTech AI Ltd', price: '$49/mo', category: 'AI Agents', rating: 4.9 },
              { title: 'Global IMO MARPOL Compliance Dataset 2026', author: 'DNV Maritime Lab', price: '$120', category: 'Datasets', rating: 5.0 },
              { title: '300k DWT VLCC Maxsurf Hull & CAD File Pack', author: 'Arch. Kowalski', price: '$85', category: 'Calculators', rating: 4.8 },
              { title: 'Naval Architecture Advanced Hydrodynamics Handbook', author: 'Prof. Andersen', price: '$35', category: 'Books', rating: 4.9 },
              { title: 'Chief Engineer STCW Officer Exam Question Bank', author: 'Maritime Academy', price: '$29', category: 'Books', rating: 5.0 },
              { title: 'Port AGV Autonomous Dispatch API Token', author: 'SmartPort Systems', price: '$199/mo', category: 'AI Agents', rating: 4.9 },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 hover:border-sky-500/50 transition space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">{item.category}</span>
                    <span className="text-amber-400 font-bold">★ {item.rating}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400">By {item.author}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-sm font-black text-emerald-400">{item.price}</span>
                  <button
                    onClick={() => onOpenPricing && onOpenPricing('professional')}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Acquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 199: INNOVATION PLATFORM */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'innovation' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-sky-400" /> Triple Helix Innovation Hub (#199)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connecting maritime students, universities, researchers, startups, venture investors, shipping lines, shipyards, and IMO governments to co-fund and engineer zero-emission maritime breakthroughs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-sky-400">Active R&D Projects</h4>
                <p className="text-2xl font-black text-white">42 Projects</p>
                <p className="text-[11px] text-slate-400">$18.5M in grant funding allocated</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400">Partner Universities</h4>
                <p className="text-2xl font-black text-white">65 Institutions</p>
                <p className="text-[11px] text-slate-400">MIT, NTNU, Chalmers, Dalian, WMU</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-indigo-400">Venture Accelerator</h4>
                <p className="text-2xl font-black text-white">$50M Fund</p>
                <p className="text-[11px] text-slate-400">Seed & Series A maritime tech investments</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 200: GLOBAL KNOWLEDGE NETWORK */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" /> Global Knowledge Network (#200)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The world's largest repository of peer-reviewed maritime papers, IMO conventions, classification rules, video lectures, and 3D simulation blueprints indexed by semantic AI.
            </p>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-sky-400 flex items-center gap-2">
                <Search className="w-4 h-4" /> AI Research Literature Synthesizer
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter research topic (e.g. 'Methanol dual-fuel combustion CFD modeling')"
                  className="flex-1 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition">
                  Synthesize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 201: ENTERPRISE CLOUD */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'enterprise' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" /> Enterprise Cloud & Digital Twin Platform (#201)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Operational Cloud ERP, CRM, and Digital Twin telemetry for shipping lines, port terminals, and shipyards with real-time Starlink IoT feeds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">Port Terminal Crane STS Rate</span>
                <div className="text-2xl font-black text-emerald-400">34.2 Moves/Hr</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">Fleet Fuel Efficiency Index</span>
                <div className="text-2xl font-black text-sky-400">98.2% Optimal</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">Dry-Dock ERP Schedule</span>
                <div className="text-2xl font-black text-indigo-400">On-Time (0 Delays)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 202: MARITIME APP STORE */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'app_store' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 lg:col-span-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-sky-400" /> Developer App Store & Monetization Engine (#202)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Developers, naval architects, and software engineers publish AI agents, plugins, calculators, and SDKs. Earn 85% revenue share on every subscription and API credit call.
              </p>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-sky-400">Publish New Maritime AI App / Plugin</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={devAppTitle}
                    onChange={e => setDevAppTitle(e.target.value)}
                    placeholder="App Name (e.g. 'Propeller Cavitation AI')"
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                  />
                  <select
                    value={devAppCategory}
                    onChange={e => setDevAppCategory(e.target.value)}
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value="AI Agent">AI Agent</option>
                    <option value="Calculator Plugin">Calculator Plugin</option>
                    <option value="API Endpoint">API Endpoint</option>
                  </select>
                  <input
                    type="number"
                    value={devAppPrice}
                    onChange={e => setDevAppPrice(e.target.value)}
                    placeholder="Monthly Price ($)"
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <button
                  onClick={() => {
                    if (devAppTitle) {
                      setPublishedAppsCount(prev => prev + 1);
                      setDevAppTitle('');
                    }
                  }}
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl transition"
                >
                  Submit App to AI Audit Sandbox & Publish
                </button>
              </div>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" /> App Store Stats
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Active Published Apps:</span>
                  <span className="text-emerald-400 font-black">{publishedAppsCount} Apps</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Developer Revenue Share:</span>
                  <span className="text-sky-400 font-black">85% / 15% Platform</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Total Dev Payouts 2026:</span>
                  <span className="text-indigo-400 font-black">$1,420,000 USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 203: AI BUSINESS PLATFORM */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" /> AI Business & Chartering Platform (#203)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Integrates maritime finance, vessel procurement, time-chartering (TC) rate estimation, bunkering procurement, and P&I marine insurance into one business suite.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">Baltic Dry Index (BDI)</span>
                <div className="text-xl font-black text-emerald-400">1,842 pts (+2.4%)</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">VLSFO Bunker Price (Singapore)</span>
                <div className="text-xl font-black text-sky-400">$620 / Metric Ton</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">Capesize Time-Charter Rate</span>
                <div className="text-xl font-black text-indigo-400">$24,500 / Day</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold">EU ETS Carbon Allowances</span>
                <div className="text-xl font-black text-amber-400">€68.50 / Ton CO2</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 204: FUTURE TECHNOLOGIES */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'future_tech' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" /> Future Technologies & Deep Tech Lab (#204)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Autonomous surface vessels (MASS Level 4), drone subsea inspections, blockchain smart bills of lading, and quantum computing hull optimization sandbox.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-sky-400">MASS Autonomous Vessel Swarm</h4>
                <div className="text-2xl font-black text-white">{autonomousSwarmCount} Ships Active</div>
                <button
                  onClick={() => setAutonomousSwarmCount(prev => prev + 1)}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition"
                >
                  Deploy Autonomous Tug
                </button>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-purple-400">Quantum Hull Solver (VQE)</h4>
                <div className="text-2xl font-black text-white">{quantumQubits} Qubits</div>
                <button
                  onClick={() => {
                    setQuantumQubits(64);
                    setQuantumConvergence(99.9);
                  }}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition"
                >
                  Upgrade to 64 Qubits
                </button>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400">Blockchain Carbon Smart Contract</h4>
                <div className="text-2xl font-black text-white">Verified On-Chain</div>
                <p className="text-[11px] text-slate-400">Solana / Polygon Zero-Knowledge Audit</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 205: FINAL MASTER PROMPT HUB */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'master_hub' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-8 rounded-3xl border border-sky-500/30 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
                #205 Final Master Prompt • Flagship Enterprise Integration
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                The "Microsoft + Google + GitHub + Coursera + LinkedIn + ResearchGate + Autodesk + MarineTraffic + ChatGPT" of Maritime
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
                An all-in-one AI-powered ecosystem for learning, engineering, research, simulation, business, compliance, collaboration, and innovation, backed by enterprise-grade security, global scalability, and multiple recurring revenue streams.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 pt-4">
              {[
                { name: 'Microsoft Enterprise', desc: 'Cloud ERP, Office AI Suite & Document Automation' },
                { name: 'Google Knowledge', desc: 'Global Maritime Search, GIS Mapping & Earth AI' },
                { name: 'GitHub Code & Models', desc: 'Open Source Marine Algorithms, CAD & Maxsurf Files' },
                { name: 'Coursera Academy', desc: 'STCW Officer Courses, Exam Prep & Verified Diplomas' },
                { name: 'LinkedIn Professional', desc: 'Global Maritime Career Network & Job Board' },
                { name: 'ResearchGate R&D', desc: '50,000+ IMO Papers & Academic Collaboration' },
                { name: 'Autodesk Hull Studio', desc: '3D Ship Design, CFD Hydrodynamics & FEA' },
                { name: 'MarineTraffic AIS', desc: 'Global Live Vessel Tracking & Satellite Telemetry' },
                { name: 'ChatGPT Copilot', desc: 'Autonomous Voice & Text AI Maritime Assistant' },
              ].map((brand, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-xs font-black text-sky-400">{brand.name}</div>
                  <div className="text-[11px] text-slate-300 leading-tight">{brand.desc}</div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 rounded-2xl border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Full Platform Monetization & Enterprise Revenue Active</h4>
                <p className="text-xs text-slate-300">Subscriptions, AI Credits, Marketplace Commission, API Calls, Certifications & Enterprise Licensing</p>
              </div>
              <button
                onClick={() => onOpenPricing && onOpenPricing('enterprise')}
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition whitespace-nowrap"
              >
                Launch Master Enterprise Suite
              </button>
            </div>
          </div>
        </div>
      )}

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
