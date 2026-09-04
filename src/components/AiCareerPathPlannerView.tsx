import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType, ViewMode } from '../types';
import {
  Compass,
  Award,
  BookOpen,
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
  UserCheck,
  GraduationCap,
  TrendingUp,
  FileText,
  Search,
  Zap,
  Sliders,
  ChevronRight,
  Download,
  Building2,
  RefreshCw,
  HelpCircle,
  BarChart3,
  Globe,
  Layers,
  Send,
  Cpu,
  Bot
} from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: ViewMode) => void;
}

export const AiCareerPathPlannerView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView,
}) => {
  // User Input State
  const [currentRole, setCurrentRole] = useState('3rd Engineer / Naval Arch Graduate');
  const [targetGoal, setTargetGoal] = useState('Senior Maritime Sustainability Engineer & CII Superintendent');
  const [yearsExperience, setYearsExperience] = useState('3');
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([
    'STCW III/1 OICEW',
    'BWM & MARPOL Auditor',
    'GMDSS Radio License'
  ]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Main Engine Maintenance',
    'Maxsurf Hull Modeling',
    'Python & Data Analysis',
    'CAD 2D/3D Drafting'
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Active Tab View in Planner
  const [activeTab, setActiveTab] = useState<'roadmap' | 'learning' | 'research' | 'jobs' | 'ai_copilot'>('roadmap');

  // AI Copilot Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Hello Cadet/Engineer! I am your AI Maritime Career Copilot. I have analyzed your skills in Maxsurf, Engine Maintenance, and MARPOL auditing. To reach Senior CII Superintendent, I recommend completing the EU ETS Carbon Accounting certification in our Learning Hub.',
      time: 'Just now'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Pre-configured STCW & Technical Certification Options
  const availableCerts = [
    'STCW III/1 OICEW',
    'STCW III/2 Chief Engineer',
    'STCW II/1 Officer in Charge of Navigational Watch',
    'STCW II/2 Master Mariner / Captain',
    'GMDSS Radio License',
    'BWM & MARPOL Auditor',
    'DP Operator Advanced Certificate',
    'IGF Code Dual-Fuel / LNG Handling',
    'ISO 50001 Energy Management Lead Auditor',
    'DNV Qualified Hull Superintendent'
  ];

  // Pre-configured Skill Tags
  const availableSkills = [
    'Main Engine Maintenance',
    'Maxsurf Hull Modeling',
    'Python & Data Analysis',
    'CAD 2D/3D Drafting',
    'IMO EEXI & CII Calculations',
    'COLREGs & ECDIS Navigation',
    'CFD OpenFOAM Hydrodynamics',
    'Dry-Dock Budgeting & ERP',
    'Starlink Fleet Telemetry',
    'Autonomous Vessel Operations (MASS)'
  ];

  const handleToggleCert = (cert: string) => {
    if (selectedCertifications.includes(cert)) {
      setSelectedCertifications(selectedCertifications.filter(c => c !== cert));
    } else {
      setSelectedCertifications([...selectedCertifications, cert]);
    }
  };

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim() && !selectedSkills.includes(newSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userText = userInput;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: now }]);
    setUserInput('');
    setIsGenerating(true);

    setTimeout(() => {
      let aiReply = `Based on your goal (${targetGoal}) and current experience (${yearsExperience} yrs), here is my recommendation:\n`;
      if (userText.toLowerCase().includes('salary') || userText.toLowerCase().includes('pay')) {
        aiReply += `• Target Role Salary Range: $95,000 - $140,000 USD/year in global shipping hubs (Rotterdam, Singapore, Oslo).\n• Key factor to unlock top tier: IMO EEXI/CII Decarbonization certification.`;
      } else if (userText.toLowerCase().includes('cert') || userText.toLowerCase().includes('license')) {
        aiReply += `• Essential STCW Certs needed: IGF Code Dual-Fuel Handling + DNV Lead Auditor.\n• You can prepare for these using our Certification Center in AI Maritime Hub.`;
      } else {
        aiReply += `• Focus on building your CFD & CII decarbonization portfolio.\n• Complete the 3 research papers suggested in the Research tab and practice on the Maritime Simulator.`;
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsGenerating(false);
    }, 800);
  };

  // Calculated Career Gap Metrics
  const matchPercentage = Math.min(95, 40 + selectedCertifications.length * 10 + selectedSkills.length * 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-slate-100">
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="AI Career Path Planner & Skill Gap Matrix"
      />

      {/* TOP HERO HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              AI Maritime Career Intelligence Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              STCW & IMO Aligned
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Personalized Trajectory
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Target className="w-9 h-9 text-sky-400" />
            AI Career Path Planner & Skills Matrix
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Analyze your maritime qualifications, STCW certifications, and technical skills to generate tailored learning roadmaps, research topics, and matching job opportunities across the global maritime ecosystem.
          </p>
        </div>

        {/* Global Match Score Metric Widget */}
        <div className="flex flex-col items-center justify-center p-5 bg-slate-950/80 rounded-2xl border border-sky-500/30 shrink-0 text-center relative z-10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Target Role Readiness</span>
          <div className="text-3xl font-black text-emerald-400">{matchPercentage}% Match</div>
          <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${matchPercentage}%` }} />
          </div>
          <span className="text-[10px] text-sky-300 pt-1 font-mono">{selectedSkills.length} Skills • {selectedCertifications.length} Certs</span>
        </div>
      </div>

      {/* INPUT PROFILE & PROFILE SETUP CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Role & Target Settings */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <UserCheck className="w-4 h-4 text-sky-400" /> Current & Target Career Goal
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1">Current Position / Role</label>
              <input
                type="text"
                value={currentRole}
                onChange={e => setCurrentRole(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1">Target Maritime Goal / Role</label>
              <input
                type="text"
                value={targetGoal}
                onChange={e => setTargetGoal(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1">Years of Sea Service / Experience</label>
              <select
                value={yearsExperience}
                onChange={e => setYearsExperience(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="0-1">0 - 1 Years (Cadet / Student)</option>
                <option value="3">2 - 4 Years (Junior Officer / Engineer)</option>
                <option value="6">5 - 8 Years (Senior Officer / Arch)</option>
                <option value="10">10+ Years (Master / Chief Eng / Executive)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Middle Column: STCW Certifications Selector */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-4 h-4 text-emerald-400" /> Active Certifications & Licenses
          </h3>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {availableCerts.map(cert => {
              const isChecked = selectedCertifications.includes(cert);
              return (
                <button
                  key={cert}
                  onClick={() => handleToggleCert(cert)}
                  className={`w-full text-left p-2 rounded-xl text-xs font-semibold border transition flex items-center justify-between ${
                    isChecked
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="truncate">{cert}</span>
                  {isChecked ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Skills Matrix Selector */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Zap className="w-4 h-4 text-amber-400" /> Technical & Operational Skills
          </h3>

          <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
            {availableSkills.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => handleToggleSkill(skill)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                    isSelected
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleAddCustomSkill} className="flex gap-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              value={newSkillInput}
              onChange={e => setNewSkillInput(e.target.value)}
              placeholder="Add custom skill..."
              className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button type="submit" className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition">
              Add
            </button>
          </form>
        </div>
      </div>

      {/* PLANNER SECTION NAVIGATION TABS */}
      <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'roadmap' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Compass className="w-4 h-4" /> 1. Milestone Roadmap
        </button>
        <button
          onClick={() => setActiveTab('learning')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'learning' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 2. Recommended Courses
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'research' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> 3. Research & Thesis Topics
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'jobs' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Briefcase className="w-4 h-4" /> 4. Matched Opportunities
        </button>
        <button
          onClick={() => setActiveTab('ai_copilot')}
          className={`px-4 py-2.5 rounded-xl font-extrabold transition flex items-center gap-2 whitespace-nowrap shrink-0 ${
            activeTab === 'ai_copilot' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Bot className="w-4 h-4" /> 5. AI Career Copilot
        </button>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 1: MILESTONE ROADMAP */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" /> Tailored Trajectory to "{targetGoal}"
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Estimated Timeframe: 12 - 18 Months
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Phase 1 */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 text-[10px] font-bold">Phase 1 (Months 1-3)</span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">In Progress</span>
                </div>
                <h4 className="font-bold text-sm text-white">Foundation & Core Decarbonization</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Complete MARPOL Annex VI & CII Energy Efficiency Course</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Master Maxsurf 3D Hull Analysis in Naval Arch Lab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-sky-400 mt-0.5 shrink-0" />
                    <span>Obtain IGF Code Dual-Fuel Tanker Handling Cert</span>
                  </li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">Phase 2 (Months 4-9)</span>
                  <span className="text-xs text-slate-400 font-mono">Upcoming</span>
                </div>
                <h4 className="font-bold text-sm text-white">Advanced Simulation & Audit Mastery</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-600 mt-0.5 shrink-0" />
                    <span>Complete 20 hours on Marine Simulation Center (Engine Room)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-600 mt-0.5 shrink-0" />
                    <span>Publish 1 Thesis Paper on Dual-Fuel Ammonia Combustion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-600 mt-0.5 shrink-0" />
                    <span>DNV Lead Auditor ISO 50001 Qualification</span>
                  </li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">Phase 3 (Months 10-18)</span>
                  <span className="text-xs text-slate-400 font-mono">Final Step</span>
                </div>
                <h4 className="font-bold text-sm text-white">Superintendent Placement & AI Fleet Management</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-600 mt-0.5 shrink-0" />
                    <span>Apply to Top 5 Matched Superintendent Roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-600 mt-0.5 shrink-0" />
                    <span>Manage Digital Twin Telemetry for 5 Target Vessels</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 2: RECOMMENDED COURSES */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'learning' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'IMO CII & EU ETS Fleet Decarbonization Masterclass',
              provider: 'AI Maritime Academy',
              duration: '12 Hours • Self-Paced',
              linkView: 'learning_hub' as ViewMode,
              match: 'High Match (98%)',
              desc: 'Learn how to calculate Energy Efficiency Existing Ship Index (EEXI) and manage EU carbon allowances.'
            },
            {
              title: 'Advanced Naval Architecture: Hull Resistance & Maxsurf',
              provider: 'Naval Arch Lab',
              duration: '24 Hours • Interactive Lab',
              linkView: 'naval_arch_lab' as ViewMode,
              match: 'Skill Bridge (94%)',
              desc: 'Hands-on 3D hull modeling, stability curves, and CFD drag reduction techniques.'
            },
            {
              title: 'Engine Room Emergency Response & Simulator Training',
              provider: 'Maritime Sim Center',
              duration: '15 Hours • STCW Approved',
              linkView: 'maritime_simulation_center' as ViewMode,
              match: 'STCW Required (100%)',
              desc: 'Practice cold-start procedures, blackouts, and dual-fuel BOG management on live physics canvas.'
            },
          ].map((course, idx) => (
            <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">{course.match}</span>
                  <span className="text-slate-400">{course.provider}</span>
                </div>
                <h4 className="font-bold text-sm text-white">{course.title}</h4>
                <p className="text-xs text-slate-400">{course.desc}</p>
                <div className="text-[11px] text-sky-400 font-mono pt-1">{course.duration}</div>
              </div>

              <button
                onClick={() => onSelectView && onSelectView(course.linkView)}
                className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                Launch Module <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 3: RESEARCH & THESIS TOPICS */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'research' && (
        <div className="space-y-4">
          {[
            {
              topic: 'CFD Hydrodynamic Analysis of Bulker Hull Forms under Micro-Bubble Lubrication',
              field: 'Hydrodynamics & Fuel Savings',
              relevance: 'Directly relates to your target role in Fleet Energy Efficiency.',
              paperCount: '42 Papers in Digital Library'
            },
            {
              topic: 'Life-Cycle Assessment (LCA) of Ammonia vs. Methanol Dual-Fuel Propulsion Systems',
              field: 'Alternative Marine Fuels',
              relevance: 'Essential knowledge for maritime compliance superintendents.',
              paperCount: '128 Papers in Digital Library'
            },
            {
              topic: 'Machine Learning Anomaly Detection in Main Engine Vibration Telemetry',
              field: 'AI & Predictive Maintenance',
              relevance: 'Leverages your Python & Data Analysis skill tag.',
              paperCount: '85 Papers in Digital Library'
            }
          ].map((res, i) => (
            <div key={i} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">{res.field}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{res.paperCount}</span>
                </div>
                <h4 className="font-bold text-sm text-white">{res.topic}</h4>
                <p className="text-xs text-slate-400">{res.relevance}</p>
              </div>

              <button
                onClick={() => onSelectView && onSelectView('maritime_digital_library')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl transition shrink-0 flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" /> Open Papers
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 4: MATCHED JOB OPPORTUNITIES */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Maritime Sustainability & CII Superintendent',
              company: 'Wilhelmsen Ship Management',
              location: 'Oslo, Norway / Remote Hybrid',
              salary: '$110,000 - $135,000 / yr',
              matchScore: '96% Match',
              tags: ['MARPOL Annex VI', 'CII', 'Maxsurf', 'Engine Diagnostics']
            },
            {
              title: 'Senior Naval Architect (Green Fleet Retrofits)',
              company: 'DNV Maritime Advisory',
              location: 'Rotterdam, Netherlands',
              salary: '€85,000 - €105,000 / yr',
              matchScore: '91% Match',
              tags: ['Maxsurf 3D', 'CFD', 'Class Rules', 'Python']
            },
            {
              title: 'Fleet Performance & Energy Efficiency Engineer',
              company: 'Maersk Line A/S',
              location: 'Copenhagen, Denmark / Singapore',
              salary: '$95,000 - $120,000 / yr',
              matchScore: '88% Match',
              tags: ['Telemetry', 'Starlink IoT', 'Bunker Optimization']
            }
          ].map((job, idx) => (
            <div key={idx} className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    {job.matchScore}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {job.company}</span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-white">{job.title}</h4>
                  <p className="text-xs text-slate-400">{job.location} • <strong className="text-emerald-400">{job.salary}</strong></p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {job.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectView && onSelectView('jobs')}
                className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
              >
                Apply with AI Hub Profile <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 5: AI CAREER COPILOT CHAT */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'ai_copilot' && (
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bot className="w-5 h-5 text-indigo-400" /> AI Maritime Career Copilot
          </h3>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 h-64 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-lg space-y-1 ${
                  msg.sender === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <div className="text-[9px] opacity-70 text-right">{msg.time}</div>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="text-xs text-sky-400 font-mono animate-pulse">AI Copilot analyzing maritime regulations & career paths...</div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Ask about salary ranges, STCW license requirements, or transition advice..."
              className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Ask Copilot
            </button>
          </form>
        </div>
      )}

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
