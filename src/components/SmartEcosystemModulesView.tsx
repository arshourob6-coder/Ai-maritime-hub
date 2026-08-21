import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { CommunityView } from './CommunityView';
import { PlanType, ViewMode } from '../types';
import {
  Building2,
  ShoppingCart,
  Bot,
  Database,
  Lightbulb,
  Globe2,
  Navigation,
  Anchor,
  MapPin,
  Coins,
  FileCheck,
  Search,
  Users,
  Tv,
  BookOpen,
  LineChart,
  Wallet,
  Handshake,
  Box,
  BrainCircuit,
  Play,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  Filter,
  Plus,
  Send,
  Download,
  Shield,
  Activity,
  Zap,
  HardDrive,
  Cpu,
  Radio,
  Share2,
  Terminal,
  ExternalLink,
  Tag,
  DollarSign,
  Briefcase,
  Video,
  Award,
  Book,
  Maximize2
} from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: ViewMode) => void;
  initialModule?: string;
}

export const SmartEcosystemModulesView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView,
  initialModule = 'smart_shipyard',
}) => {
  const [activeModule, setActiveModule] = useState<string>(initialModule);

  // Module 206: Smart Shipyard
  const [shipyardTab, setShipyardTab] = useState<'production' | 'welding' | 'robots' | 'twin'>('production');

  // Module 207: Maritime Commerce
  const [commerceCartCount, setCommerceCartCount] = useState<number>(0);
  const [commerceSearch, setCommerceSearch] = useState('');

  // Module 208: AI Assistant Builder
  const [botName, setBotName] = useState('MARPOL Compliance Agent');
  const [botPrompt, setBotPrompt] = useState('You are an expert IMO MARPOL Annex VI auditor. Inspect fuel sulfur limits and logbook anomalies.');
  const [botTesting, setBotTesting] = useState(false);
  const [botChat, setBotChat] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Hello! I am your custom MARPOL Compliance Agent. Ask me anything about VLSFO 0.50% limits or Scrubber washwater regulations.' }
  ]);
  const [botInput, setBotInput] = useState('');

  // Module 209: Data Exchange
  const [dataSubscribed, setDataSubscribed] = useState<string[]>(['ais_global_feed']);

  // Module 211: Innovation Marketplace
  const [startupPledge, setStartupPledge] = useState<number>(5000);

  // Module 212: Smart Ocean
  const [oceanLayer, setOceanLayer] = useState<'sst' | 'salinity' | 'currents' | 'plankton'>('sst');

  // Module 213: Autonomous Vessel
  const [autoNavMode, setAutoNavMode] = useState<'auto_avoid' | 'remote_bridge' | 'loiter'>('auto_avoid');

  // Module 214: Marine Robotics
  const [rovDepth, setRovDepth] = useState<number>(340);

  // Module 215: Maritime GIS
  const [gisLayers, setGisLayers] = useState<string[]>(['bathymetry', 'eez', 'cables']);

  // Module 216: Investment Platform
  const [investAmount, setInvestAmount] = useState<number>(10000);

  // Module 217: AI Procurement
  const [rfqStatus, setRfqStatus] = useState<'draft' | 'analyzing' | 'sent'>('draft');

  // Module 218: Global Directory
  const [dirFilter, setDirFilter] = useState<'all' | 'ports' | 'shipyards' | 'class'>('all');

  // Module 219: Social Network
  const [posts, setPosts] = useState([
    { id: 1, author: 'Chief Engineer Marco Rossi', role: 'Superintendent @ Maersk', text: 'Just completed testing methanol dual-fuel main engine trial on 16,000 TEU vessel. Zero misfire recorded!', likes: 42, comments: 8 },
    { id: 2, author: 'Dr. Elena Rostova', role: 'Hydrodynamics Lead @ DNV', text: 'New paper published on PINN neural network optimization for bulbous bow drag reduction.', likes: 89, comments: 14 }
  ]);
  const [newPostText, setNewPostText] = useState('');

  // Module 220: Streaming Platform
  const [currentVideo, setCurrentVideo] = useState('Supertanker Drydocking Masterclass');

  // Module 221: Publishing Platform
  const [pubTab, setPubTab] = useState<'papers' | 'journals' | 'submit'>('papers');

  // Module 222: AI Business Intelligence
  const [biMetric, setBiMetric] = useState<'ebitda' | 'cii' | 'bDI'>('ebitda');

  // Module 223: Super Wallet
  const [walletBalance, setWalletBalance] = useState({ usd: 14250.00, credits: 8500, eth: 2.45 });

  // Module 224: Global Partnership Hub
  const [mouSigned, setMouSigned] = useState(false);

  // Module 225: Metaverse
  const [metaverseScene, setMetaverseScene] = useState<'bridge' | 'engine' | 'expo'>('bridge');

  // Handler for Assistant Builder Test Chat
  const handleSendBotChat = () => {
    if (!botInput.trim()) return;
    const userMsg = botInput;
    setBotChat(prev => [...prev, { sender: 'user', text: userMsg }]);
    setBotInput('');
    setBotTesting(true);

    setTimeout(() => {
      setBotChat(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `[${botName} AI Response]: Analyzed query regarding "${userMsg}". Verified against IMO Resolution MEPC.328(76) & MARPOL Annex VI Regulation 14. Compliance status verified with 99.4% confidence.`
        }
      ]);
      setBotTesting(false);
    }, 600);
  };

  const modulesList = [
    { id: 'smart_shipyard', num: '206', title: 'Smart Shipyard Platform', icon: Building2, desc: 'Production planning, welding QA, robotics & digital twin hull fabrication' },
    { id: 'maritime_commerce', num: '207', title: 'Maritime Commerce', icon: ShoppingCart, desc: 'Global B2B marine parts, equipment, safety gear & software marketplace' },
    { id: 'ai_assistant_builder', num: '208', title: 'Maritime AI Assistant Builder', icon: Bot, desc: 'No-code custom agent studio with custom RAG & system directives' },
    { id: 'maritime_data_exchange', num: '209', title: 'Maritime Data Exchange', icon: Database, desc: 'Marketplace for AIS streams, weather, hydrographic & port datasets' },
    { id: 'maritime_innovation_marketplace', num: '211', title: 'Innovation Marketplace', icon: Lightbulb, desc: 'Maritime startup incubator, IP licensing & venture capital syndicate' },
    { id: 'smart_ocean_platform', num: '212', title: 'Smart Ocean Platform', icon: Globe2, desc: 'Satellite SST, environmental buoy sensors, biodiversity & climate sinks' },
    { id: 'autonomous_vessel_hub', num: '213', title: 'Autonomous Vessel Hub', icon: Navigation, desc: 'MASS Level 4 autonomous navigation, sensor fusion & collision avoidance' },
    { id: 'marine_robotics_center', num: '214', title: 'Marine Robotics Center', icon: Anchor, desc: 'ROV/AUV underwater inspection drones & subsea manipulator control' },
    { id: 'maritime_gis_platform', num: '215', title: 'Maritime GIS Platform', icon: MapPin, desc: 'Spatial GIS layers for bathymetry, nautical charts, EEZ & subsea cables' },
    { id: 'maritime_investment_platform', num: '216', title: 'Maritime Investment Platform', icon: Coins, desc: 'Green ship financing, port crowdfunding & ROI yield analytics' },
    { id: 'ai_procurement_platform', num: '217', title: 'AI Procurement Platform', icon: FileCheck, desc: 'Automated RFQs, AI supplier quotation matching & PO generation' },
    { id: 'global_maritime_directory', num: '218', title: 'Global Maritime Directory', icon: Search, desc: '50,000+ verified ports, shipyards, classification societies & suppliers' },
    { id: 'maritime_social_network', num: '219', title: 'Maritime Social Network', icon: Users, desc: 'Professional network for mariners, naval architects, researchers & executives' },
    { id: 'maritime_streaming_platform', num: '220', title: 'Maritime Streaming Platform', icon: Tv, desc: 'Documentaries, RINA lectures, 4K ship walkthroughs & technical webinars' },
    { id: 'maritime_publishing_platform', num: '221', title: 'Maritime Publishing Platform', icon: BookOpen, desc: 'Technical journals, peer-reviewed papers, books & digital press' },
    { id: 'ai_business_intelligence', num: '222', title: 'AI Business Intelligence', icon: LineChart, desc: 'Executive C-suite dashboards, predictive EBITDA & Baltic Dry futures' },
    { id: 'maritime_super_wallet', num: '223', title: 'Maritime Super Wallet', icon: Wallet, desc: 'Multi-currency digital wallet, AI compute credits & smart contract escrow' },
    { id: 'global_partnership_hub', num: '224', title: 'Global Partnership Hub', icon: Handshake, desc: 'University-industry alliance portal, MoU builder & joint R&D grants' },
    { id: 'maritime_metaverse', num: '225', title: 'Maritime Metaverse', icon: Box, desc: 'Immersive VR/AR virtual campus, 3D bridge simulation & expo halls' },
  ];

  const currentModObj = modulesList.find(m => m.id === activeModule) || modulesList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="Maritime AI Flagship Super Ecosystem Platform (Modules 206-225)"
      />

      {/* TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Flagship Super Ecosystem
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              20 Integrated Modules (206–225)
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Globe2 className="w-9 h-9 text-sky-400" />
            Global Maritime AI Super Platform
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Unified maritime OS connecting shipyards, commerce, AI agents, data exchange, autonomous navigation, robotics, GIS, investments, procurement, directory, streaming, publishing, and the metaverse.
          </p>
        </div>

        {/* Selected Module Indicator */}
        <div className="p-4 bg-slate-950/90 rounded-2xl border border-sky-500/30 text-xs space-y-1.5 z-10 shrink-0 w-full lg:w-72">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Active Module Selected</div>
          <div className="text-sm font-extrabold text-white flex items-center gap-2">
            <currentModObj.icon className="w-4 h-4 text-sky-400" />
            Module {currentModObj.num}: {currentModObj.title}
          </div>
          <div className="text-[11px] text-slate-400 line-clamp-1">{currentModObj.desc}</div>
        </div>
      </div>

      {/* MODULE SELECTOR GRID MENU */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-sky-400" /> Select Super Ecosystem Module (206–225)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {modulesList.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-400 shadow-lg scale-[1.02]'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-sky-500/50 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-center">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-sky-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    #{mod.num}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight line-clamp-1">{mod.title}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 206: SMART SHIPYARD PLATFORM */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'smart_shipyard' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-6 h-6 text-sky-400" /> Module 206: Smart Shipyard Platform
              </h2>
              <p className="text-xs text-slate-400">Production planning, ultrasonic welding QA, welding robots & hull digital twin.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShipyardTab('production')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${shipyardTab === 'production' ? 'bg-sky-600 text-white' : 'bg-slate-950 text-slate-400'}`}>Production</button>
              <button onClick={() => setShipyardTab('welding')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${shipyardTab === 'welding' ? 'bg-sky-600 text-white' : 'bg-slate-950 text-slate-400'}`}>Welding QA</button>
              <button onClick={() => setShipyardTab('robots')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${shipyardTab === 'robots' ? 'bg-sky-600 text-white' : 'bg-slate-950 text-slate-400'}`}>Robotics</button>
              <button onClick={() => setShipyardTab('twin')} className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${shipyardTab === 'twin' ? 'bg-sky-600 text-white' : 'bg-slate-950 text-slate-400'}`}>Digital Twin</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-bold">Block Fabrication Progress</div>
              <div className="text-2xl font-black text-emerald-400">84.2%</div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '84%' }} />
              </div>
              <p className="text-[11px] text-slate-400 pt-1">Block 304 (Double Bottom) ready for erection.</p>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-bold">Robotic Weld Seam Pass Rate</div>
              <div className="text-2xl font-black text-sky-400">99.8%</div>
              <p className="text-[11px] text-slate-400">AI Ultrasonic NDT inspection verified 1,420m seams.</p>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-bold">Estimated Delivery Milestone</div>
              <div className="text-2xl font-black text-indigo-400">Nov 14, 2026</div>
              <p className="text-[11px] text-slate-400">Hull #782 LNG Carrier on track without delay.</p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 207: MARITIME COMMERCE */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_commerce' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-sky-400" /> Module 207: Global Maritime E-Commerce Store
              </h2>
              <p className="text-xs text-slate-400">Order spare parts, pumps, radar equipment, IMO books, and safety gear with instant quote engine.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-sky-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4" /> Cart ({commerceCartCount})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Alfa Laval Purifier Spare Seal Kit', price: '$1,250', stock: 'In Stock (Rotterdam Depot)', category: 'Spare Parts' },
              { title: 'Furuno FAR-3000 Marine Radar Magnetron', price: '$4,800', stock: 'In Stock (Singapore Depot)', category: 'Navigation Equipment' },
              { title: 'IMO SOLAS LSA Code & Liferaft Package', price: '$650', stock: 'In Stock (Chittagong Port)', category: 'Safety Equipment' },
            ].map((item, i) => (
              <div key={i} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold">{item.category}</span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <div className="text-lg font-black text-emerald-400">{item.price}</div>
                  <div className="text-[11px] text-slate-400">{item.stock}</div>
                </div>
                <button
                  onClick={() => setCommerceCartCount(c => c + 1)}
                  className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Order Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 208: MARITIME AI ASSISTANT BUILDER */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'ai_assistant_builder' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bot className="w-6 h-6 text-sky-400" /> Module 208: Maritime No-Code AI Assistant Builder
            </h2>
            <p className="text-xs text-slate-400">Configure system instructions, attach RAG knowledge manuals, and publish custom AI agents.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Configuration Form */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">1. Agent Profile & Directives</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Agent Name</label>
                  <input
                    type="text"
                    value={botName}
                    onChange={e => setBotName(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">System Prompt / Role Instructions</label>
                  <textarea
                    rows={4}
                    value={botPrompt}
                    onChange={e => setBotPrompt(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200"
                  />
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300 font-bold">RAG Document Manual Attached</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">IMO_MARPOL_2026.pdf</span>
                </div>
              </div>
            </div>

            {/* Right: Realtime Agent Test Playground */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>2. Interactive Test Playground</span>
                <span className="text-emerald-400 font-mono text-[10px]">{botName} Active</span>
              </h3>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 h-48 overflow-y-auto space-y-2 text-xs">
                {botChat.map((msg, idx) => (
                  <div key={idx} className={`p-2.5 rounded-xl ${msg.sender === 'user' ? 'bg-sky-600/30 text-sky-200 ml-6 text-right' : 'bg-slate-800 text-slate-200 mr-6'}`}>
                    <div className="text-[9px] font-bold text-slate-400 mb-0.5">{msg.sender === 'user' ? 'You' : botName}</div>
                    <div>{msg.text}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask agent a question..."
                  value={botInput}
                  onChange={e => setBotInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendBotChat()}
                  className="flex-1 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white"
                />
                <button onClick={handleSendBotChat} className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 209: DATA EXCHANGE */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_data_exchange' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Database className="w-6 h-6 text-sky-400" /> Module 209: Global Maritime Data Exchange
            </h2>
            <p className="text-xs text-slate-400">Subscribe to verified real-time AIS feeds, satellite oceanography, and port congestion datasets via REST API.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'ais_global_feed', name: 'Global High-Frequency AIS Feed', price: '$499/mo', desc: 'Realtime vessel coordinates, draft, ETA & heading' },
              { id: 'port_congestion', name: 'Global Top 100 Port Congestion Stream', price: '$299/mo', desc: 'Anchorage waiting times, berth turnaround & TEU throughput' },
              { id: 'hydrographic_bathymetry', name: 'High-Res Bathymetry & Seabed Mesh', price: '$199/mo', desc: '1m resolution multibeam sonar seabed grids' },
            ].map(ds => (
              <div key={ds.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white">{ds.name}</h4>
                  <div className="text-lg font-black text-sky-400">{ds.price}</div>
                  <p className="text-xs text-slate-400">{ds.desc}</p>
                </div>
                <button
                  onClick={() => setDataSubscribed(prev => prev.includes(ds.id) ? prev.filter(x => x !== ds.id) : [...prev, ds.id])}
                  className={`w-full py-2 text-xs font-bold rounded-xl transition ${
                    dataSubscribed.includes(ds.id) ? 'bg-emerald-600 text-white' : 'bg-sky-600 text-white hover:bg-sky-500'
                  }`}
                >
                  {dataSubscribed.includes(ds.id) ? 'API Key Active (Subscribed)' : 'Subscribe to API Stream'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 211: INNOVATION MARKETPLACE */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_innovation_marketplace' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-sky-400" /> Module 211: Maritime Innovation Marketplace
            </h2>
            <p className="text-xs text-slate-400">Connect startups, venture capital syndicates, patent licensing, and university research commercialization.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Seed Stage Venture</span>
              <h3 className="text-base font-bold text-white">OceanCleanse - Ultrasonic Biofouling Prevention</h3>
              <p className="text-xs text-slate-300">Patent-pending transducer array that prevents barnacle attachment on ship hulls without toxic copper paints.</p>
              <div className="flex justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                <span>Funding Goal: <strong className="text-white">$1.2M</strong></span>
                <span>Raised: <strong className="text-emerald-400">$840,000 (70%)</strong></span>
              </div>
              <button className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition">
                Pledge Investment / Request Pitch Deck
              </button>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">IP Patent License</span>
              <h3 className="text-base font-bold text-white">RINA Tech Patent #2026-MAR-882</h3>
              <p className="text-xs text-slate-300">Hydrofoil-assisted catamaran hull geometry reducing fuel consumption by 18% at 28 knots.</p>
              <div className="flex justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                <span>Licensing Royalty: <strong className="text-white">2.5% per vessel built</strong></span>
              </div>
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition">
                Apply for Commercial License
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 212: SMART OCEAN PLATFORM */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'smart_ocean_platform' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe2 className="w-6 h-6 text-sky-400" /> Module 212: Smart Ocean & Climate Analytics
            </h2>
            <p className="text-xs text-slate-400">Satellite sea surface temperature (SST), ocean currents, acidification, and marine biodiversity protection.</p>
          </div>

          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">Satellite Observation Stream</span>
              <div className="flex gap-2">
                {(['sst', 'salinity', 'currents', 'plankton'] as const).map(l => (
                  <button key={l} onClick={() => setOceanLayer(l)} className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${oceanLayer === l ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
              <Globe2 className="w-12 h-12 text-sky-400 animate-pulse" />
              <div className="text-sm font-bold text-white">Active Map Layer: {oceanLayer.toUpperCase()} Sea Surface Data</div>
              <p className="text-xs text-slate-400 max-w-md">Copernicus Sentinel-3 Satellite & NOAA Buoy Network sync complete. Mean SST: 24.2°C (+0.4°C anomaly).</p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 213: AUTONOMOUS VESSEL HUB */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'autonomous_vessel_hub' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Navigation className="w-6 h-6 text-sky-400" /> Module 213: Autonomous Vessel (MASS) Control Hub
            </h2>
            <p className="text-xs text-slate-400">MASS Level 4 autonomous navigation simulator, COLREG collision avoidance algorithms, and remote bridge link.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 md:col-span-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Remote Autonomous Vessel #104 (YARA Birkeland II)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">AUTONOMOUS ENGAGED</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5 text-sky-300">
                <p>• Course over Ground (COG): 245° | Speed (SOG): 12.4 knots</p>
                <p>• COLREG Assessment: Clear (Target Vessel 2.4nm on Port Quarter)</p>
                <p>• LiDAR + FLIR Infrared Radar Fusion: 100% Signal Integrity</p>
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white">Shore Control Commands</h3>
              <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition">
                Engage COLREG Auto-Avoidance
              </button>
              <button className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition">
                Takeover Manual Joystick Control
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 214: MARINE ROBOTICS CENTER */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'marine_robotics_center' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Anchor className="w-6 h-6 text-sky-400" /> Module 214: Marine Robotics & Subsea ROV Center
            </h2>
            <p className="text-xs text-slate-400">ROV/AUV underwater drone telemetry, pipeline inspection cameras, and robotic manipulator control.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white">ROV Telemetry Stream</div>
              <div className="text-2xl font-black text-sky-400">{rovDepth} meters</div>
              <div className="text-[11px] text-slate-400">Subsea Pipeline Weld Inspection #14</div>
              <button onClick={() => setRovDepth(d => d + 20)} className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition">
                Lower ROV Depth (+20m)
              </button>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 md:col-span-2">
              <div className="text-xs font-bold text-white">Subsea 4K Sonar & Visual Inspection Camera</div>
              <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 text-center space-y-2">
                <Radio className="w-8 h-8 text-emerald-400 mx-auto animate-ping" />
                <div className="text-xs text-slate-300 font-mono">Ultrasonic Thickness Test: 18.4mm (No corrosion detected)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 215: MARITIME GIS PLATFORM */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_gis_platform' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-sky-400" /> Module 215: Spatial Maritime GIS Platform
            </h2>
            <p className="text-xs text-slate-400">Interactive GIS map layers: ENC nautical charts, bathymetry, EEZ boundaries, and subsea cables.</p>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex gap-2 flex-wrap">
              {['bathymetry', 'eez', 'cables', 'wind_farms', 'sec_zones'].map(layer => (
                <button
                  key={layer}
                  onClick={() => setGisLayers(prev => prev.includes(layer) ? prev.filter(x => x !== layer) : [...prev, layer])}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${gisLayers.includes(layer) ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                >
                  {layer.toUpperCase()} Layer
                </button>
              ))}
            </div>

            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 text-center space-y-2">
              <MapPin className="w-10 h-10 text-sky-400 mx-auto" />
              <div className="text-sm font-bold text-white">GIS Vector Render Engine Active</div>
              <p className="text-xs text-slate-400">Rendered {gisLayers.length} spatial layers across North Sea & Malacca Strait navigation corridors.</p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 216: MARITIME INVESTMENT PLATFORM */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_investment_platform' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Coins className="w-6 h-6 text-sky-400" /> Module 216: Maritime Green Investment & Crowdfunding
            </h2>
            <p className="text-xs text-slate-400">Participate in green ship retrofits, methanol dual-fuel syndicates, and port infrastructure bonds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">7.8% Target APY Yield</span>
              <h3 className="text-base font-bold text-white">Methanol Dual-Fuel Feeder Vessel Syndicate</h3>
              <p className="text-xs text-slate-300">10-year long-term time charter contracted with Maersk Line for Northern Europe feeder loops.</p>
              <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition">
                Invest $10,000 Share Unit
              </button>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold">6.5% Green Bond Yield</span>
              <h3 className="text-base font-bold text-white">Port of Rotterdam Shore-Power Solar Grid</h3>
              <p className="text-xs text-slate-300">Infrastructure bond backed by Dutch municipal port terminal revenues.</p>
              <button className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition">
                Buy Green Port Bond
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 217: AI PROCUREMENT PLATFORM */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'ai_procurement_platform' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-sky-400" /> Module 217: AI Automated Procurement Engine
            </h2>
            <p className="text-xs text-slate-400">Automate RFQs, match IMPA/ISSA spare parts codes, and generate PO contracts automatically.</p>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">RFQ #2026-992: Main Engine Exhaust Valve Spindles</span>
              <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold">3 Supplier Bids Received</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {[
                { supplier: 'MAN Energy Solutions (Rotterdam)', price: '$14,200', delivery: '2 Days', score: '98% Match' },
                { supplier: 'Wärtsilä Genuine Parts (Singapore)', price: '$13,800', delivery: '4 Days', score: '94% Match' },
                { supplier: 'Hyundai Global Service (Busan)', price: '$12,500', delivery: '6 Days', score: '91% Match' },
              ].map((bid, i) => (
                <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white">{bid.supplier}</div>
                  <div className="text-emerald-400 font-bold">{bid.price}</div>
                  <div className="text-[11px] text-slate-400">Lead Time: {bid.delivery}</div>
                  <button className="w-full mt-2 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold rounded-lg transition">
                    Issue Purchase Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 218: GLOBAL MARITIME DIRECTORY */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'global_maritime_directory' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Search className="w-6 h-6 text-sky-400" /> Module 218: Global Maritime Verified Directory
            </h2>
            <p className="text-xs text-slate-400">50,000+ verified ports, shipyards, classification societies, marine consultants, and bunkering suppliers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Port of Singapore Authority (PSA)', type: 'Port Authority', location: 'Singapore', verified: true },
              { name: 'DNV Classification Society', type: 'Classification Society', location: 'Oslo, Norway', verified: true },
              { name: 'Seatrium Shipyard Group', type: 'Shipyard / Repair', location: 'Singapore', verified: true },
            ].map((entry, idx) => (
              <div key={idx} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold">{entry.type}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="font-bold text-sm text-white">{entry.name}</h4>
                <p className="text-xs text-slate-400">{entry.location}</p>
                <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition border border-slate-800">
                  View Full Profile & Contact
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 219: MARITIME SOCIAL NETWORK */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_social_network' && (
        <CommunityView />
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 220: MARITIME STREAMING PLATFORM */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_streaming_platform' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Tv className="w-6 h-6 text-sky-400" /> Module 220: Maritime Streaming & Video Network
            </h2>
            <p className="text-xs text-slate-400">4K documentaries, RINA lectures, shipyard drydocking walkthroughs, and safety webinars.</p>
          </div>

          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-3">
            <div className="w-full h-64 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center flex-col space-y-2">
              <Play className="w-12 h-12 text-sky-400 animate-pulse" />
              <div className="text-sm font-bold text-white">Now Playing: {currentVideo}</div>
            </div>
            <div className="flex gap-2 justify-center">
              {['Supertanker Drydocking Masterclass', 'Autonomous Ship Navigation 2026', 'LNG Carrier Cargo Operations'].map(title => (
                <button key={title} onClick={() => setCurrentVideo(title)} className={`px-3 py-1.5 text-xs font-bold rounded-xl ${currentVideo === title ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
                  {title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 221: MARITIME PUBLISHING PLATFORM */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_publishing_platform' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-sky-400" /> Module 221: Maritime Publishing & Digital Press
            </h2>
            <p className="text-xs text-slate-400">Peer-reviewed journals, naval architecture textbooks, technical magazines, and publishing press.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold">Vol. 42 Issue 3</span>
              <h3 className="text-base font-bold text-white">Journal of Naval Architecture & Ocean Engineering</h3>
              <p className="text-xs text-slate-300">12 peer-reviewed articles covering CFD hull mesh optimization, wave energy harvesting, and ammonia fuel safety.</p>
              <button className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition">
                Read Full Issue PDF
              </button>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Textbook Release</span>
              <h3 className="text-base font-bold text-white">Modern Ship Stability & Trim Handbook (2026 Edition)</h3>
              <p className="text-xs text-slate-300">Comprehensive guide by Prof. H. Olsen covering intact & damage stability calculations for chief mates.</p>
              <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition">
                Download Digital eBook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 222: AI BUSINESS INTELLIGENCE */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'ai_business_intelligence' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <LineChart className="w-6 h-6 text-sky-400" /> Module 222: Executive AI Business Intelligence
            </h2>
            <p className="text-xs text-slate-400">Predictive EBITDA forecasting, fleet CII rating trajectory, and Baltic Dry Freight futures analytics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-bold">Q3 Projected EBITDA</div>
              <div className="text-2xl font-black text-emerald-400">$24.8M</div>
              <div className="text-[11px] text-slate-400">+12.4% vs Q2 prior forecast</div>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-bold">Fleet CII Average Rating</div>
              <div className="text-2xl font-black text-sky-400">Rating A</div>
              <div className="text-[11px] text-slate-400">100% compliant with IMO 2026 targets</div>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-bold">Baltic Dry Index (BDI)</div>
              <div className="text-2xl font-black text-indigo-400">1,842 pts</div>
              <div className="text-[11px] text-slate-400">+45 pts today</div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 223: MARITIME SUPER WALLET */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_super_wallet' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Wallet className="w-6 h-6 text-sky-400" /> Module 223: Maritime Super Wallet & AI Credits
            </h2>
            <p className="text-xs text-slate-400">Manage multi-currency fiat balance, compute credits for GPU training, and smart contract escrows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-bold">USD Fiat Balance</div>
              <div className="text-2xl font-black text-emerald-400">${walletBalance.usd.toLocaleString()}</div>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-bold">AI Compute Credits</div>
              <div className="text-2xl font-black text-sky-400">{walletBalance.credits} Credits</div>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-bold">Smart Contract Escrow</div>
              <div className="text-2xl font-black text-indigo-400">{walletBalance.eth} ETH</div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 224: GLOBAL PARTNERSHIP HUB */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'global_partnership_hub' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Handshake className="w-6 h-6 text-sky-400" /> Module 224: Global Strategic Partnership Hub
            </h2>
            <p className="text-xs text-slate-400">MoU agreement builder, university-industry alliance portal, and joint R&D grant applications.</p>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">University R&D Alliance Agreement (MoU)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${mouSigned ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {mouSigned ? 'MOU SIGNED & ACTIVE' : 'PENDING SIGNATURE'}
              </span>
            </div>
            <p className="text-xs text-slate-300">Joint research partnership between World Maritime University (WMU) and Global AI Maritime Platform.</p>
            <button onClick={() => setMouSigned(!mouSigned)} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition">
              {mouSigned ? 'Revoke MoU Agreement' : 'Digitally Sign Partnership MoU'}
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* MODULE 225: MARITIME METAVERSE */}
      {/* ---------------------------------------------------------------------- */}
      {activeModule === 'maritime_metaverse' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Box className="w-6 h-6 text-sky-400" /> Module 225: Maritime Metaverse & 3D Virtual Campus
            </h2>
            <p className="text-xs text-slate-400">Immersive VR/AR virtual campus, 3D vessel bridge simulation, virtual expo halls, and avatar collaboration.</p>
          </div>

          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">3D WebGL / WebXR Environment</span>
              <div className="flex gap-2">
                {(['bridge', 'engine', 'expo'] as const).map(scene => (
                  <button key={scene} onClick={() => setMetaverseScene(scene)} className={`px-3 py-1 text-xs font-bold rounded-xl ${metaverseScene === scene ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400'}`}>
                    {scene.toUpperCase()} Scene
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-12 rounded-xl border border-slate-800 text-center space-y-3">
              <Box className="w-12 h-12 text-sky-400 mx-auto animate-bounce" />
              <div className="text-base font-bold text-white">Loaded Virtual Room: {metaverseScene.toUpperCase()} World</div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">WebXR Spatial Audio & VR Headset Connected. 18 Users currently exploring virtual Expo booth.</p>
            </div>
          </div>
        </div>
      )}

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
