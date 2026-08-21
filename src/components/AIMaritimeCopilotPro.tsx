import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Ship,
  ShieldCheck,
  Globe,
  Anchor,
  Loader2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  ExternalLink,
  BookOpen,
  Mic,
  MicOff,
  Radio,
  AlertCircle,
  Cpu,
  Layers,
  Database,
  Plus,
  Sliders,
  Play,
  Zap,
  Bookmark,
  Share2,
  CheckCircle2,
  FileText,
  Upload,
  Calculator,
  Compass,
  FileSpreadsheet,
  Download,
  Terminal,
  FolderOpen,
  Users,
  GraduationCap,
  Scale,
  RefreshCw,
  Building,
  Key,
  Flame,
  Award,
  ChevronRight,
  TrendingUp,
  FileCode,
  FileCheck2,
  Code
} from 'lucide-react';
import {
  ChatMessage,
  CopilotModelEngine,
  CopilotSpecialization,
  CopilotProjectMemory,
  CopilotUploadedFile,
  CopilotCalculationItem,
  CopilotGeneratedReport,
  CopilotStudyMilestone,
  PlanType,
  Currency
} from '../types';

interface AIMaritimeCopilotProProps {
  initialPrompt?: string;
  userPlan?: PlanType;
  currency?: Currency;
  onOpenPricing?: () => void;
}

export const AIMaritimeCopilotPro: React.FC<AIMaritimeCopilotProProps> = ({
  initialPrompt,
  userPlan = 'student',
  currency = 'USD',
  onOpenPricing
}) => {
  // Navigation sub-tabs inside Copilot Pro
  type CopilotTab = 'chat' | 'document_analysis' | 'step_by_step_solver' | 'regulatory_auditor' | 'report_generator' | 'study_roadmap' | 'project_memory' | 'enterprise_api';
  const [activeTab, setActiveTab] = useState<CopilotTab>('chat');

  // AI Model Selection & Configuration
  const [selectedModel, setSelectedModel] = useState<CopilotModelEngine>('auto-route');
  const [specialization, setSpecialization] = useState<CopilotSpecialization>('naval_architect');
  const [useProjectMemory, setUseProjectMemory] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechVolume, setSpeechVolume] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Credit / Token Usage State
  const [usedCredits, setUsedCredits] = useState<number>(4);
  const maxCredits = userPlan === 'enterprise' ? 99999 : userPlan === 'professional' ? 1500 : userPlan === 'student' ? 150 : 10;

  // Selected Active Vessel Memory Project
  const [projects, setProjects] = useState<CopilotProjectMemory[]>([
    {
      id: 'proj-1',
      name: 'Project Ocean Voyager (14,000 TEU NeoPanamax)',
      vesselType: 'Container Vessel',
      lengthBP: 366.0,
      beam: 51.2,
      draft: 15.5,
      displacement: 165000,
      classificationSociety: 'DNV',
      engineModel: 'MAN B&W 11G95ME-C9.5 (68,640 kW)',
      operatingSpeedKnots: 22.0,
      notes: 'Optimum trim by stern 0.45m. Bulbous bow retrofit planned for 18 knot slow steaming profile.',
      lastUpdated: 'Today, 14:32'
    },
    {
      id: 'proj-2',
      name: 'Project NorthStar Alpha (Offshore Wind Substation)',
      vesselType: 'Jacket Platform Substation',
      lengthBP: 65.0,
      beam: 45.0,
      draft: 28.0,
      displacement: 8500,
      classificationSociety: 'ABS',
      engineModel: 'Auxiliary Dual-Fuel GenSets (4x 2,400 kW)',
      operatingSpeedKnots: 0,
      notes: '100-year storm wave height Hs=15.2m. 4-legged steel tubular jacket in 42m water depth.',
      lastUpdated: 'Yesterday'
    }
  ]);
  const [activeProjectId, setActiveProjectId] = useState<string>('proj-1');
  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  // Chat Conversation State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      content: `Welcome to **AI Maritime Copilot Pro** — the central intelligence engine for naval architects, marine engineers, offshore specialists, and classification auditors.

Currently synchronized with **${activeProject.name}** (${activeProject.classificationSociety} Rules). Multi-model auto routing enabled.

Ask any engineering calculation, upload stability booklets & drawings, draft class reports, or inspect IMO SOLAS/MARPOL requirements.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assistantType: 'naval_architect',
      sources: [
        { title: 'IMO SOLAS Consolidated Edition 2024', url: 'https://www.imo.org' },
        { title: 'DNV Rules for Classification of Ships (Pt.3 Ch.1)', url: 'https://www.dnv.com' },
        { title: 'SNAME Principles of Naval Architecture', url: 'https://www.sname.org' }
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState<string>(initialPrompt || '');
  const [loading, setLoading] = useState<boolean>(false);

  // Microphone & Speech Recognition
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [recognitionRef, setRecognitionRef] = useState<any>(null);

  // Document Analysis State
  const [uploadedFiles, setUploadedFiles] = useState<CopilotUploadedFile[]>([
    {
      id: 'file-1',
      name: 'NeoPanamax_LinesPlan_Hydrostatics.pdf',
      size: '14.2 MB',
      type: 'PDF',
      uploadDate: '2026-08-19',
      status: 'Audited',
      findingsCount: 3,
      summary: 'Hydrostatics, cross curves, and GZ stability envelopes evaluated against DNV-RU-SHIP and IMO 2008 IS Code.',
      complianceScore: 98.4
    },
    {
      id: 'file-2',
      name: 'Midship_Section_Scantlings_Rev04.dxf',
      size: '28.6 MB',
      type: 'CAD/DXF',
      uploadDate: '2026-08-20',
      status: 'Audited',
      findingsCount: 2,
      summary: 'Plate thickness and longitudinal stiffener section moduli evaluated against IACS UR S11A.',
      complianceScore: 96.1
    },
    {
      id: 'file-3',
      name: 'CII_Voyage_Fuel_Logs_2025_Q4.xlsx',
      size: '4.8 MB',
      type: 'Spreadsheet',
      uploadDate: '2026-08-20',
      status: 'Ready',
      findingsCount: 4,
      summary: 'Raw fuel consumption, distance sailed, and transport work for MARPOL Annex VI Reg 28 verification.',
      complianceScore: 92.0
    }
  ]);
  const [selectedFileForAudit, setSelectedFileForAudit] = useState<CopilotUploadedFile | null>(uploadedFiles[0]);
  const [isAnalyzingDoc, setIsAnalyzingDoc] = useState(false);
  const [docAuditOutput, setDocAuditOutput] = useState<string | null>(null);

  // Calculation Solver State
  const [calculationCategory, setCalculationCategory] = useState<'Hydrostatics' | 'Resistance & Powering' | 'Structural Scantling' | 'Offshore Mooring' | 'Propulsion & Cavitation' | 'CII & Emissions'>('Resistance & Powering');
  const [calcProblemInput, setCalcProblemInput] = useState<string>(
    'Calculate total resistance (Rt) and brake power (Pb) for a 180m vessel at 19.5 knots using Holtrop-Mennen method.'
  );
  const [isSolvingCalc, setIsSolvingCalc] = useState(false);
  const [solvedCalcResult, setSolvedCalcResult] = useState<string | null>(null);

  // Regulatory Code Inspector State
  const [selectedRegCode, setSelectedRegCode] = useState<'SOLAS' | 'MARPOL' | 'STCW' | 'IACS' | 'DNV' | 'ABS'>('SOLAS');
  const [regSearchTerm, setRegSearchTerm] = useState<string>('Damage Stability and Double Bottom');

  // Report Generator State
  const [reportTitle, setReportTitle] = useState<string>('Vessel Hydrostatic & Hull Scantling Verification Report');
  const [reportType, setReportType] = useState<string>('Class Approval Submittal');
  const [vesselNameInput, setVesselNameInput] = useState<string>('M/V Pacific Pioneer');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [generatedReportText, setGeneratedReportText] = useState<string | null>(null);

  // Study Plan Generator State
  const [studyGoal, setStudyGoal] = useState<string>('Pass STCW Class 1 Chief Mate & PE Naval Architecture Exam');
  const [studyHours, setStudyHours] = useState<number>(12);
  const [isGeneratingStudyPlan, setIsGeneratingStudyPlan] = useState(false);
  const [studyPlanOutput, setStudyPlanOutput] = useState<string | null>(null);

  // Auto-scroll chat to bottom
  const chatBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  // Voice Dictation
  const startListening = () => {
    setSpeechError(null);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('Speech Recognition API is not supported in this browser. Please type your query.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInputQuery(currentTranscript);
      };
      recognition.onerror = (event: any) => {
        setIsListening(false);
        setSpeechError(`Microphone notice: ${event.error}`);
      };
      recognition.onend = () => setIsListening(false);

      recognition.start();
      setRecognitionRef(recognition);
    } catch (err: any) {
      setIsListening(false);
      setSpeechError(err.message || 'Could not start microphone');
    }
  };

  const stopListening = () => {
    if (recognitionRef) {
      try {
        recognitionRef.stop();
      } catch (err) {
        console.error(err);
      }
    }
    setIsListening(false);
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#$_\\]/g, '').slice(0, 400);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Handle Chat Submit
  const handleSendMessage = async (customText?: string) => {
    const text = customText || inputQuery;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputQuery('');
    setLoading(true);
    setUsedCredits(prev => Math.min(prev + 1, maxCredits));

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `${text} (Vessel Context: ${activeProject.name}, Type: ${activeProject.vesselType}, LBP=${activeProject.lengthBP}m, Beam=${activeProject.beam}m, Draft=${activeProject.draft}m, Class=${activeProject.classificationSociety})`,
          assistantType: specialization,
          modelChoice: selectedModel,
          useMemory: useProjectMemory,
          history: useProjectMemory ? messages.slice(-6).map(m => ({ role: m.sender, content: m.content })) : []
        })
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: data.reply || 'No response received from AI Maritime engine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        assistantType: specialization,
        sources: data.sources || [
          { title: 'IMO SOLAS Consolidated 2024', url: 'https://www.imo.org' },
          { title: 'DNV Rules for Classification of Ships', url: 'https://www.dnv.com' }
        ]
      };

      setMessages(prev => [...prev, botMsg]);
      if (speechVolume) {
        speakText(botMsg.content);
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          content: `⚠️ Error executing query with ${selectedModel}: ${err.message || 'Connection error'}. Falling back to internal maritime rules.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Trigger Document Analysis
  const handleAnalyzeDocument = async (file: CopilotUploadedFile) => {
    setSelectedFileForAudit(file);
    setIsAnalyzingDoc(true);
    setDocAuditOutput(null);

    try {
      const res = await fetch('/api/ai/copilot/document-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileContentSample: file.summary,
          analysisScope: 'Full Naval Architecture, Scantlings & Statutory Rule Audit'
        })
      });
      const data = await res.json();
      setDocAuditOutput(data.analysis);
      setUsedCredits(prev => Math.min(prev + 2, maxCredits));
    } catch (err: any) {
      setDocAuditOutput(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzingDoc(false);
    }
  };

  // Trigger Step-by-Step Calculation
  const handleSolveCalculation = async () => {
    if (!calcProblemInput.trim() || isSolvingCalc) return;
    setIsSolvingCalc(true);
    setSolvedCalcResult(null);

    try {
      const res = await fetch('/api/ai/copilot/solve-calculation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemStatement: calcProblemInput,
          calculationCategory,
          parameters: {
            vesselName: activeProject.name,
            lengthBP: activeProject.lengthBP,
            beam: activeProject.beam,
            draft: activeProject.draft,
            displacement: activeProject.displacement,
            speedKnots: activeProject.operatingSpeedKnots
          }
        })
      });
      const data = await res.json();
      setSolvedCalcResult(data.solution);
      setUsedCredits(prev => Math.min(prev + 1, maxCredits));
    } catch (err: any) {
      setSolvedCalcResult(`Calculation error: ${err.message}`);
    } finally {
      setIsSolvingCalc(false);
    }
  };

  // Trigger Report Generation
  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    setGeneratedReportText(null);

    try {
      const res = await fetch('/api/ai/copilot/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportTitle,
          reportType,
          vesselName: vesselNameInput,
          classificationSociety: activeProject.classificationSociety,
          clientName: 'Global Maritime Ship Management & Engineering Group',
          details: {
            lengthBP: activeProject.lengthBP,
            beam: activeProject.beam,
            draft: activeProject.draft,
            displacement: activeProject.displacement,
            powerKw: 14850
          }
        })
      });
      const data = await res.json();
      setGeneratedReportText(data.reportMarkdown);
      setUsedCredits(prev => Math.min(prev + 3, maxCredits));
    } catch (err: any) {
      setGeneratedReportText(`Report generation failed: ${err.message}`);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Trigger Study Plan Generator
  const handleGenerateStudyPlan = async () => {
    setIsGeneratingStudyPlan(true);
    setStudyPlanOutput(null);

    try {
      const res = await fetch('/api/ai/copilot/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userGoal: studyGoal,
          currentLevel: 'Junior Naval Architect / Marine Cadet',
          targetExamOrRole: 'STCW Class 1 / SNAME PE License',
          availableHoursPerWeek: studyHours
        })
      });
      const data = await res.json();
      setStudyPlanOutput(data.studyPlan);
      setUsedCredits(prev => Math.min(prev + 2, maxCredits));
    } catch (err: any) {
      setStudyPlanOutput(`Study plan failed: ${err.message}`);
    } finally {
      setIsGeneratingStudyPlan(false);
    }
  };

  // Export Helpers
  const handleDownloadReport = (format: 'pdf' | 'docx' | 'csv' | 'pptx') => {
    const text = generatedReportText || solvedCalcResult || docAuditOutput || 'No report content available.';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Maritime_Copilot_Report_${Date.now()}.${format === 'pdf' ? 'txt' : format === 'docx' ? 'doc' : format === 'csv' ? 'csv' : 'ppt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 text-slate-100 font-sans">
      
      {/* Top Header & Intelligence Engine Banner */}
      <div className="bg-slate-900/95 border border-sky-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 border border-sky-400/40">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  AI Maritime Copilot
                  <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                    PRO
                  </span>
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" /> Multi-Model Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Central Intelligence Engine for Naval Architecture, Offshore Dynamics & IMO Statutory Compliance
              </p>
            </div>
          </div>

          {/* Credits & Subscription Meter */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5 px-4">
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-end gap-1">
                <span>AI Credits:</span>
                <span className="font-bold text-sky-400">{userPlan === 'enterprise' ? 'Unlimited' : `${maxCredits - usedCredits} / ${maxCredits}`}</span>
              </div>
              <div className="w-28 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-gradient-to-r from-sky-500 to-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (usedCredits / maxCredits) * 100)}%` }}
                />
              </div>
            </div>

            {onOpenPricing && (
              <button
                type="button"
                onClick={onOpenPricing}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-1 cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 fill-slate-950" />
                <span>Upgrade</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Controls: Multi-Model Switcher, Persona, Active Vessel Memory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 text-xs">
          
          {/* AI Model Engine Selector */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col justify-between space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-400" /> AI Engine Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as CopilotModelEngine)}
              className="bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-sky-400 cursor-pointer"
            >
              <option value="auto-route">⚡ Auto Smart Router (Recommended)</option>
              <option value="gemini-3.6-flash">Google Gemini 3.6 Flash (Deep Search)</option>
              <option value="gpt-4o">OpenAI GPT-4o (Maritime Logic)</option>
              <option value="claude-3.5-sonnet">Claude 3.5 Sonnet (Specs & Code)</option>
              <option value="deepseek-r1-maritime">DeepSeek R1 (Hydrodynamic Math)</option>
            </select>
          </div>

          {/* Specialization Persona */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col justify-between space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <Ship className="w-3.5 h-3.5 text-emerald-400" /> Specialist Persona
            </label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value as CopilotSpecialization)}
              className="bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              <option value="naval_architect">📐 Naval Architect & Hydrodynamics</option>
              <option value="marine_engineer">⚙️ Marine Propulsion & Machinery</option>
              <option value="offshore_engineer">🌊 Offshore & Subsea Structures</option>
              <option value="solas_marpol">📜 IMO SOLAS, MARPOL & Class Auditor</option>
              <option value="researcher_academic">📚 Maritime Academic Researcher</option>
              <option value="student_mentor">🎓 Cadet & Student Exam Mentor</option>
              <option value="port_operations">🏗️ Port Logistics & Terminal Director</option>
              <option value="ship_recycling">⚓ HKC & EU Ship Recycling Lead</option>
            </select>
          </div>

          {/* Active Vessel Project Memory */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col justify-between space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-400" /> Project AI Memory
              </span>
              <button
                type="button"
                onClick={() => setUseProjectMemory(!useProjectMemory)}
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  useProjectMemory ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {useProjectMemory ? 'ACTIVE' : 'OFF'}
              </button>
            </label>
            <select
              value={activeProjectId}
              onChange={(e) => setActiveProjectId(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-indigo-400 cursor-pointer truncate"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Speech Audio Voice Read-Back Toggle */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col justify-between space-y-1">
            <label className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-rose-400" /> Voice Synthesizer
            </label>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSpeechVolume(!speechVolume)}
                className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  speechVolume
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {speechVolume ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>Voice Playback: {speechVolume ? 'ON' : 'OFF'}</span>
              </button>
              {isSpeaking && (
                <button
                  type="button"
                  onClick={() => speakText('')}
                  className="px-2 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-[10px] hover:bg-rose-500"
                >
                  Mute
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin border-t border-slate-800/60 pt-3">
          {[
            { id: 'chat', label: 'Copilot Chat', icon: Bot },
            { id: 'document_analysis', label: 'Document & PDF Audit', icon: FileText, badge: 'Smart' },
            { id: 'step_by_step_solver', label: 'Calculations Solver', icon: Calculator },
            { id: 'regulatory_auditor', label: 'IMO & Class Rules', icon: ShieldCheck },
            { id: 'report_generator', label: 'Report Generator', icon: FileCheck2 },
            { id: 'study_roadmap', label: 'Study & Exam Prep', icon: GraduationCap },
            { id: 'project_memory', label: 'Project Workspaces', icon: FolderOpen },
            { id: 'enterprise_api', label: 'Enterprise & API', icon: Code, badge: 'Pro' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as CopilotTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25'
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-sky-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase ${
                      isActive ? 'bg-slate-950 text-sky-400' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COPILOT CHAT WORKSPACE */}
      {/* ========================================================================= */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          
          {/* Active Project Context Tag */}
          <div className="bg-sky-950/40 border border-sky-500/30 rounded-2xl px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-sky-300">
              <Bookmark className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                <strong>Grounding Context:</strong> {activeProject.name} (LBP {activeProject.lengthBP}m, Beam {activeProject.beam}m, Speed {activeProject.operatingSpeedKnots} kn, {activeProject.classificationSociety})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('project_memory')}
              className="text-[11px] text-sky-400 hover:text-sky-200 underline font-semibold self-start sm:self-auto"
            >
              Edit Project Memory →
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-4 sm:p-6 min-h-[480px] max-h-[620px] overflow-y-auto space-y-6 shadow-inner">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 border border-sky-400/40 flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-3xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-3 shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans space-y-2">{msg.content}</div>

                  {/* Regulatory & Academic Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                      <div className="font-bold text-sky-300 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Regulatory & Classification Standards:</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.sources.map((s, idx) => (
                          <a
                            key={idx}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-sky-400 hover:border-sky-500 transition text-[10px]"
                          >
                            {s.title} <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/40">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'assistant' && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => speakText(msg.content)}
                          className="hover:text-white flex items-center gap-1 p-1 rounded hover:bg-slate-800 transition"
                          title="Read aloud"
                        >
                          <Volume2 className="w-3 h-3 text-sky-400" />
                          <span>Listen</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(msg.id, msg.content)}
                          className="hover:text-white flex items-center gap-1 p-1 rounded hover:bg-slate-800 transition"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-sky-400 text-xs bg-sky-950/60 p-4 rounded-2xl border border-sky-500/30 max-w-md shadow-lg">
                <Loader2 className="w-5 h-5 animate-spin text-sky-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">AI Maritime Engine processing...</div>
                  <div className="text-[11px] text-slate-400">Evaluating multi-model reasoning and class society rules with {selectedModel}</div>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompt Shortcuts */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Quick Calculations & Audits:
            </span>
            {[
              "Check DNV midship section modulus Zmin for L=180m container ship",
              "Calculate wave force on 2.4m jacket leg using Morison equation for Hs=14m",
              "Audit MARPOL Annex VI CII reduction factor Z for 2026",
              "Derive transverse metacentric height GM for flooded double bottom"
            ].map((shortcut, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(shortcut)}
                className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-3 py-1 rounded-xl transition"
              >
                {shortcut.slice(0, 50)}...
              </button>
            ))}
          </div>

          {/* Voice Listening Alert */}
          {isListening && (
            <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/30 p-3 rounded-2xl text-xs text-rose-300 animate-pulse">
              <Radio className="w-4 h-4 text-rose-400 animate-spin" />
              <span>Listening to your voice query... Speak engineering terms, hull parameters, or IMO rules clearly.</span>
              <button
                type="button"
                onClick={stopListening}
                className="ml-auto font-bold underline hover:text-white cursor-pointer"
              >
                Stop
              </button>
            </div>
          )}

          {speechError && (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{speechError}</span>
            </div>
          )}

          {/* Query Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={
                  isListening
                    ? "Listening... Speak your engineering query..."
                    : `Ask AI Maritime Copilot (${selectedModel})...`
                }
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-sky-500/40 rounded-2xl pl-4 pr-12 py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/50 shadow-xl"
              />

              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop Voice Dictation" : "Dictate Query via Microphone"}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 animate-bounce'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-sky-300'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Copilot</span>
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DOCUMENT & PDF AUDIT */}
      {/* ========================================================================= */}
      {activeTab === 'document_analysis' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sky-400" /> Maritime Document & Drawing Intelligence
                </h3>
                <p className="text-xs text-slate-400">
                  Upload PDFs, DXF CAD files, stability booklets, and voyage fuel spreadsheets for instant DNV/ABS compliance extraction.
                </p>
              </div>
              <label className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-2 self-start sm:self-auto shadow-md">
                <Upload className="w-4 h-4" />
                <span>Upload New File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const newFile: CopilotUploadedFile = {
                        id: `file-${Date.now()}`,
                        name: e.target.files[0].name,
                        size: `${(e.target.files[0].size / (1024 * 1024)).toFixed(1)} MB`,
                        type: e.target.files[0].name.endsWith('.pdf') ? 'PDF' : e.target.files[0].name.endsWith('.dxf') ? 'CAD/DXF' : 'Spreadsheet',
                        uploadDate: 'Just now',
                        status: 'Ready',
                        findingsCount: 0,
                        summary: 'Uploaded user document ready for AI technical audit.',
                        complianceScore: 95.0
                      };
                      setUploadedFiles(prev => [newFile, ...prev]);
                      handleAnalyzeDocument(newFile);
                    }
                  }}
                />
              </label>
            </div>

            {/* Uploaded Files Table */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {uploadedFiles.map((file) => {
                const isSelected = selectedFileForAudit?.id === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => handleAnalyzeDocument(file)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-400 shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-sky-400 shrink-0" />
                        <div>
                          <div className="font-bold text-xs text-white truncate max-w-[180px]">{file.name}</div>
                          <div className="text-[10px] text-slate-400">{file.type} • {file.size}</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        {file.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2">{file.summary}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>Score: <strong className="text-emerald-400">{file.complianceScore}%</strong></span>
                      <span className="text-sky-400 font-bold">Run Audit →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Analysis Results View */}
          {isAnalyzingDoc ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center space-y-3 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
              <h4 className="text-base font-bold text-white">Auditing Maritime Document Specifications...</h4>
              <p className="text-xs text-slate-400 max-w-md">
                Extracting principal dimensions, cross-checking intact stability envelopes with 2008 IS Code and IACS UR S11A scantling requirements.
              </p>
            </div>
          ) : docAuditOutput ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-sm text-white">
                    Audit Findings for {selectedFileForAudit?.name}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadReport('pdf')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Export Report
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
                {docAuditOutput}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: STEP-BY-STEP CALCULATION SOLVER */}
      {/* ========================================================================= */}
      {activeTab === 'step_by_step_solver' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-sky-400" /> Step-by-Step Maritime Calculation Solver
                </h3>
                <p className="text-xs text-slate-400">
                  Solve complex naval architecture, resistance, mooring, and structural equations with full mathematical derivations and class safety factors.
                </p>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                'Resistance & Powering',
                'Hydrostatics',
                'Structural Scantling',
                'Offshore Mooring',
                'Propulsion & Cavitation',
                'CII & Emissions'
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCalculationCategory(cat as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    calculationCategory === cat
                      ? 'bg-sky-500 text-slate-950 shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Problem Statement Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Enter Problem Statement or Engineering Specs</label>
              <textarea
                rows={3}
                value={calcProblemInput}
                onChange={(e) => setCalcProblemInput(e.target.value)}
                placeholder="e.g. Calculate Holtrop wave resistance and required brake power for a 180m vessel at 19.5 knots..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSolveCalculation}
                disabled={isSolvingCalc || !calcProblemInput.trim()}
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                {isSolvingCalc ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isSolvingCalc ? 'Deriving Solution...' : 'Solve Step-by-Step'}</span>
              </button>
            </div>
          </div>

          {/* Solved Results */}
          {isSolvingCalc ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center space-y-3 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
              <h4 className="text-base font-bold text-white">Calculating Governing Equations...</h4>
              <p className="text-xs text-slate-400">Substituting physical parameters and verifying safety margins against DNV/ABS rules.</p>
            </div>
          ) : solvedCalcResult ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Mathematical Derivation & Solution
                </h4>
                <button
                  type="button"
                  onClick={() => copyToClipboard('calc-sol', solvedCalcResult)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                >
                  {copiedId === 'calc-sol' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'calc-sol' ? 'Copied' : 'Copy LaTeX'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
                {solvedCalcResult}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: IMO & CLASS RULES AUDITOR */}
      {/* ========================================================================= */}
      {activeTab === 'regulatory_auditor' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" /> Interactive IMO & Classification Society Rule Auditor
              </h3>
              <p className="text-xs text-slate-400">
                Explore statutory codes, Unified Requirements (UR), and classification rules with verified citations and risk checklists.
              </p>
            </div>

            {/* Code Selector */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { code: 'SOLAS', label: 'IMO SOLAS 2024' },
                { code: 'MARPOL', label: 'MARPOL Annex I-VI' },
                { code: 'STCW', label: 'STCW 2010 Code' },
                { code: 'IACS', label: 'IACS UR CSR' },
                { code: 'DNV', label: 'DNV Rules for Ships' },
                { code: 'ABS', label: 'ABS Marine Rules' }
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelectedRegCode(item.code as any)}
                  className={`p-3 rounded-2xl border text-center transition ${
                    selectedRegCode === item.code
                      ? 'bg-sky-950 border-sky-400 text-white shadow-lg ring-1 ring-sky-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-black text-sm text-sky-400">{item.code}</div>
                  <div className="text-[10px] text-slate-400 truncate">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Search / Rule Topic */}
            <div className="flex gap-2">
              <input
                type="text"
                value={regSearchTerm}
                onChange={(e) => setRegSearchTerm(e.target.value)}
                placeholder="Search rule clauses (e.g. Chapter II-1 Reg 9 Double Bottom, CII Annex VI)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
              />
              <button
                type="button"
                onClick={() => handleSendMessage(`Explain ${selectedRegCode} requirements regarding "${regSearchTerm}" with exact regulations and checklist.`)}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Inspect Code
              </button>
            </div>
          </div>

          {/* Key Quick Standards Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400">SOLAS Chapter II-1 / Reg 8-1</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">Mandatory</span>
              </div>
              <h4 className="font-bold text-sm text-white">System Capabilities & Operational Information after Flooding</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Passenger ships of 120m+ must maintain essential propulsion, steering, navigation, and lighting for safe return to port under safe area guidelines.
              </p>
              <div className="text-[11px] text-sky-400 font-semibold cursor-pointer hover:underline" onClick={() => handleSendMessage("Explain SOLAS Chapter II-1 Safe Return to Port calculations.")}>
                Explore SRtP Calculation Guidelines →
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">MARPOL Annex VI / Reg 28</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">In Effect</span>
              </div>
              <h4 className="font-bold text-sm text-white">Operational Carbon Intensity Indicator (CII)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Requires annual reduction factor scaling to -11% by 2026. Ships rated D for 3 consecutive years or E for 1 year must submit a corrective SEEMP Plan Part III.
              </p>
              <div className="text-[11px] text-sky-400 font-semibold cursor-pointer hover:underline" onClick={() => handleSendMessage("How to calculate Attained CII vs Required CII for bulk carrier?")}>
                Calculate Vessel CII Rating Bounds →
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: AUTOMATED REPORT GENERATOR */}
      {/* ========================================================================= */}
      {activeTab === 'report_generator' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-sky-400" /> Automated Shipyard & Class Engineering Report Generator
              </h3>
              <p className="text-xs text-slate-400">
                Generate formal submittal reports, design memos, and stability reviews with document control tables and multi-format exports.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-400">Report Title</label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1"
                >
                  <option value="Class Approval Submittal">Class Approval Submittal</option>
                  <option value="Stability Assessment">Stability Assessment (2008 IS Code)</option>
                  <option value="CII Carbon Audit">CII Carbon & Energy Audit</option>
                  <option value="Structural FEA Memo">Structural FEA & Scantling Memo</option>
                  <option value="Offshore Mooring Design">Offshore Mooring & Wave Force Report</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400">Vessel Name</label>
                <input
                  type="text"
                  value={vesselNameInput}
                  onChange={(e) => setVesselNameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleGenerateReport}
                disabled={isGeneratingReport}
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                {isGeneratingReport ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isGeneratingReport ? 'Compiling Deliverable...' : 'Generate Formal Report'}</span>
              </button>
            </div>
          </div>

          {generatedReportText && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-sm text-white">{reportTitle}</h4>
                  <p className="text-[11px] text-slate-400">Classification Society: {activeProject.classificationSociety} • Status: Approved for Review</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleDownloadReport('pdf')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadReport('docx')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> Word (.docx)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadReport('csv')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" /> Excel (.csv)
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
                {generatedReportText}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: STUDY & EXAM PREP ROADMAP */}
      {/* ========================================================================= */}
      {activeTab === 'study_roadmap' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sky-400" /> Maritime Engineering Study & Licensing Roadmap
              </h3>
              <p className="text-xs text-slate-400">
                Personalized study curriculums for CoC Chief Mate/Chief Engineer, SNAME PE Naval Architecture, and university examinations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-400">Target Certification or Learning Goal</label>
                <input
                  type="text"
                  value={studyGoal}
                  onChange={(e) => setStudyGoal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400">Study Pacing (Hours / Week)</label>
                <input
                  type="number"
                  value={studyHours}
                  onChange={(e) => setStudyHours(Number(e.target.value))}
                  min={2}
                  max={40}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleGenerateStudyPlan}
                disabled={isGeneratingStudyPlan}
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                {isGeneratingStudyPlan ? <Loader2 className="w-4 h-4 animate-spin" /> : <GraduationCap className="w-4 h-4" />}
                <span>{isGeneratingStudyPlan ? 'Designing Syllabus...' : 'Create 8-Week Curriculum'}</span>
              </button>
            </div>
          </div>

          {studyPlanOutput && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Structured Curriculum Plan
                </h4>
                <button
                  type="button"
                  onClick={() => copyToClipboard('study-plan', studyPlanOutput)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Syllabus
                </button>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
                {studyPlanOutput}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: PROJECT MEMORY WORKSPACES */}
      {/* ========================================================================= */}
      {activeTab === 'project_memory' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-sky-400" /> Persistent Vessel Project Workspaces
                </h3>
                <p className="text-xs text-slate-400">
                  AI memory automatically preserves vessel particulars, machinery specs, and classification rules across every prompt session.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newProj: CopilotProjectMemory = {
                    id: `proj-${Date.now()}`,
                    name: 'Project LNG Carrier 174k m3',
                    vesselType: 'LNG Tanker (Membrane)',
                    lengthBP: 290.0,
                    beam: 46.4,
                    draft: 12.5,
                    displacement: 98000,
                    classificationSociety: 'BV',
                    engineModel: 'WinGD 5X72DF Dual-Fuel (2x 15,200 kW)',
                    operatingSpeedKnots: 19.5,
                    notes: 'IGC Code compliance, boil-off rate 0.085% per day.',
                    lastUpdated: 'Just now'
                  };
                  setProjects(prev => [...prev, newProj]);
                  setActiveProjectId(newProj.id);
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 self-start sm:self-auto shadow"
              >
                <Plus className="w-4 h-4" /> Add Vessel Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => {
                const isSelected = activeProjectId === proj.id;
                return (
                  <div
                    key={proj.id}
                    className={`p-5 rounded-2xl border transition flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-400 shadow-xl'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-sky-400">{proj.vesselType}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                          {proj.classificationSociety}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-white mt-1">{proj.name}</h4>
                      <p className="text-xs text-slate-400 mt-2">{proj.notes}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-[11px]">
                      <div>
                        <div className="text-slate-400">LBP / Beam:</div>
                        <div className="font-bold text-white">{proj.lengthBP}m / {proj.beam}m</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Draft / Displ:</div>
                        <div className="font-bold text-white">{proj.draft}m / {proj.displacement.toLocaleString()}t</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Speed:</div>
                        <div className="font-bold text-emerald-400">{proj.operatingSpeedKnots} kn</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">Updated: {proj.lastUpdated}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveProjectId(proj.id);
                          setActiveTab('chat');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                        }`}
                      >
                        {isSelected ? 'Active Memory' : 'Switch & Chat →'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: ENTERPRISE & PUBLIC API SDK */}
      {/* ========================================================================= */}
      {activeTab === 'enterprise_api' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-sky-400" /> Enterprise Maritime Intelligence API & SDK
                </h3>
                <p className="text-xs text-slate-400">
                  Integrate AI Maritime Copilot directly into your fleet ERP, shipyard CAD pipeline, or chartering desks.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl self-start sm:self-auto">
                Enterprise Gateway
              </span>
            </div>

            {/* API Key Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-sky-400" /> Live API Bearer Token
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value="mh_live_sec_994821a8f9c10d32b509"
                  readOnly
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard('api-key', 'mh_live_sec_994821a8f9c10d32b509')}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                >
                  {copiedId === 'api-key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'api-key' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Code Snippet Tabs */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300">Sample cURL & Python Integration</div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-sky-300 overflow-x-auto">
                <pre>{`# Call AI Maritime Copilot Pro from any terminal or server
curl -X POST https://ai-maritime-hub.com/api/ai/chat \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer mh_live_sec_994821a8f9c10d32b509" \\
  -d '{
    "message": "Calculate Holtrop total resistance for LBP=180m, B=32m, T=11m at 19.5 knots",
    "assistantType": "naval_architect",
    "modelChoice": "deepseek-r1-maritime",
    "useMemory": true
  }'`}</pre>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-sky-950/40 p-4 rounded-2xl border border-sky-500/30">
              <div className="text-xs text-slate-300">
                Need private on-premise deployments or custom class society fine-tuned models for your shipyard?
              </div>
              <button
                type="button"
                onClick={onOpenPricing}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer whitespace-nowrap"
              >
                Contact Enterprise Team
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
