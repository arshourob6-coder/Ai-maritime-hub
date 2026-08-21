import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Upload,
  FileText,
  Wrench,
  Cpu,
  DollarSign,
  ShieldCheck,
  Check,
  CheckCircle2,
  Play,
  Key,
  Layers,
  FileCode,
  Lock,
  Globe,
  Sliders,
  Database,
  ArrowRight,
  RefreshCw,
  Plus,
  Trash2
} from 'lucide-react';
import { MaritimeAgent } from '../../data/maritimeAgentsData';

interface AgentCreationStudioProps {
  onAgentCreated: (newAgent: MaritimeAgent) => void;
  isDarkMode?: boolean;
}

export const AgentCreationStudio: React.FC<AgentCreationStudioProps> = ({
  onAgentCreated,
  isDarkMode = true
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'engineering' | 'academic' | 'regulations' | 'industry' | 'enterprise'>('engineering');
  const [selectedModel, setSelectedModel] = useState<'Gemini 3.0 Pro' | 'Claude 3.5 Sonnet' | 'GPT-4o' | 'DeepSeek-R1'>('Gemini 3.0 Pro');
  const [systemPrompt, setSystemPrompt] = useState(
    'You are an authoritative Naval Architecture & Marine Engineering AI Assistant. You compute exact hydrostatic metrics, format equations in LaTeX ($...$), cite relevant IACS / IMO standards, and verify structural safety factors.'
  );
  const [pricingType, setPricingType] = useState<'free' | 'subscription' | 'enterprise'>('subscription');
  const [priceAmount, setPriceAmount] = useState(39);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'SOLAS_Consolidated_2024_PartB.pdf',
    'IACS_UR_S11A_Wave_Loads.pdf'
  ]);
  const [selectedTools, setSelectedTools] = useState<string[]>([
    'Hydrostatic Integration Solver',
    'LaTeX Equation Formatter',
    'IMO Rulebook Search Grounding'
  ]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedAgent, setPublishedAgent] = useState<MaritimeAgent | null>(null);

  const handleAddFile = () => {
    const sampleFiles = [
      'DNV_Rules_Ship_Structures_Pt3.pdf',
      'Wageningen_B_Series_Coefficients.csv',
      'Towing_Tank_Holtrop_Data.json',
      'Port_State_Control_Inspection_Manual.pdf'
    ];
    const nextFile = sampleFiles.find((f) => !uploadedFiles.includes(f));
    if (nextFile) {
      setUploadedFiles([...uploadedFiles, nextFile]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f !== fileName));
  };

  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter((t) => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      const newAgent: MaritimeAgent = {
        id: `custom-agent-${Date.now()}`,
        name: name || 'Custom Maritime Engineering Copilot',
        tagline: tagline || 'Specialized AI assistant for naval architecture & operations',
        description: description || 'Custom created maritime agent with specialized knowledge base and integrated engineering tools.',
        category,
        categoryLabel:
          category === 'engineering'
            ? 'Engineering & Design'
            : category === 'academic'
            ? 'Academic & Research'
            : category === 'regulations'
            ? 'Regulations & Class Rules'
            : category === 'industry'
            ? 'Industry & Operations'
            : 'Enterprise Solutions',
        creator: {
          name: 'My Workspace Team',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          organization: 'Verified Maritime Hub Creator',
          verified: true,
          tier: 'Platinum Expert',
          totalSales: '$0'
        },
        iconName: category === 'engineering' ? 'Compass' : category === 'regulations' ? 'FileCheck' : 'Sparkles',
        iconBg: 'from-violet-500/20 to-purple-600/30 border-violet-500/40 text-violet-300',
        pricing: {
          type: pricingType,
          amount: pricingType === 'free' ? 0 : priceAmount,
          currency: 'USD',
          period: pricingType === 'subscription' ? 'mo' : undefined
        },
        stats: {
          installs: 1,
          runsTotal: '1',
          rating: 5.0,
          reviewCount: 1,
          avgLatency: '0.8s',
          successRate: '100%',
          contextTokens: '1M tokens'
        },
        supportedModels: [selectedModel, 'Gemini 2.5 Flash'],
        capabilities: [
          'Custom RAG knowledge synthesis',
          'Automated formula and regulatory verification',
          'Document analysis & technical report generation'
        ],
        toolsIntegrated: selectedTools,
        samplePrompts: [
          'Run preliminary analysis using connected knowledge bases.',
          'Verify rule compliance for 150m vessel condition.',
          'Draft executive engineering memo in Markdown.'
        ],
        knowledgeBases: uploadedFiles,
        systemPromptPreview: systemPrompt,
        defaultSimulationResponse: `### Automated Report from ${name || 'Your Custom Agent'}\n\nAll connected knowledge sources and tools (${selectedTools.join(', ')}) are synchronized and operational.\n- **Status:** Active & Ready\n- **Model Backbone:** ${selectedModel}\n- **Security Sandbox:** Encrypted RAG Pipeline`
      };

      setPublishedAgent(newAgent);
      onAgentCreated(newAgent);
      setIsPublishing(false);
    }, 1500);
  };

  return (
    <div id="agent-creation-studio-root" className="space-y-6">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-violet-950/70 via-slate-900 to-indigo-950/70 p-6 rounded-3xl border border-violet-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Agent Creation Studio
            </span>
            <span className="text-xs text-slate-400">No-Code Maritime Agent Builder</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Build, Train & Monetize Custom Maritime AI Agents
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Train specialized AI assistants with your company's naval architecture PDFs, calculation rules, and APIs. Earn 70–80% recurring royalties on every subscriber.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-2xl border border-slate-800 shrink-0">
          {[
            { s: 1, label: 'Identity' },
            { s: 2, label: 'Prompt' },
            { s: 3, label: 'Knowledge' },
            { s: 4, label: 'Tools & Model' },
            { s: 5, label: 'Monetize' }
          ].map((item) => (
            <button
              key={item.s}
              onClick={() => setStep(item.s as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                step === item.s
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{item.s}. {item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Body */}
      {publishedAgent ? (
        <div className="bg-slate-900/90 p-8 rounded-3xl border border-emerald-500/40 text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">Agent Published Successfully!</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              <strong>{publishedAgent.name}</strong> is now live on the AI Maritime Marketplace and ready for global engineering workflows.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-lg mx-auto text-left font-mono text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>API Gateway Key:</span>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>
            <div className="p-2 rounded bg-slate-900 text-slate-400 select-all overflow-x-auto text-[11px]">
              x-maritime-agent-key: amh_live_{publishedAgent.id.replace(/[^a-zA-Z0-9]/g, '')}_sec8941
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setPublishedAgent(null)}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Another Agent</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Center: Config Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* STEP 1: IDENTITY */}
            {step === 1 && (
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-violet-400" />
                  Step 1: Agent Identity & Target Domain
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Agent Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Propeller Wake Optimizer Pro"
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tagline (One-line Pitch)</label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g., Wageningen B-Series optimization & cavitation analysis"
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="engineering">Engineering & Design</option>
                      <option value="academic">Academic & Research</option>
                      <option value="regulations">Regulations & Class Rules</option>
                      <option value="industry">Industry & Operations</option>
                      <option value="enterprise">Enterprise Solutions</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Detailed Description</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what mathematical formulas, rules, or operational workflows this agent automates..."
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <span>Next: System Prompt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SYSTEM PROMPT */}
            {step === 2 && (
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-violet-400" />
                  Step 2: System Persona & Behavioral Guardrails
                </h3>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    System Instruction (Prompt Engineering)
                  </label>
                  <textarea
                    rows={6}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-violet-500 leading-relaxed"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Specify tone, calculation rigor, boundary conditions, and reference codes (e.g. SOLAS, IACS, DNV).
                  </p>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <span>Next: Knowledge Bases</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: KNOWLEDGE BASES */}
            {step === 3 && (
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-violet-400" />
                  Step 3: Upload Maritime Knowledge & Rulebooks (RAG)
                </h3>

                <div className="border-2 border-dashed border-slate-800 hover:border-violet-500/50 rounded-2xl p-6 text-center transition cursor-pointer bg-slate-950/40" onClick={handleAddFile}>
                  <Upload className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">Click or Drag & Drop Documents to Vectorize</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, CSV, Excel, DXF, TXT up to 250MB</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300">Synchronized Knowledge Embeddings:</span>
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-violet-400" />
                        <span className="text-xs text-slate-200 font-medium">{file}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(file)}
                        className="text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <span>Next: Tools & Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: TOOLS & MODEL */}
            {step === 4 && (
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-violet-400" />
                  Step 4: Connect Solvers & LLM Engine
                </h3>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Select LLM Backbone</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Gemini 3.0 Pro', 'Claude 3.5 Sonnet', 'GPT-4o', 'DeepSeek-R1'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedModel(m)}
                        className={`p-3 rounded-2xl text-left border text-xs font-bold transition flex items-center justify-between ${
                          selectedModel === m
                            ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{m}</span>
                        {selectedModel === m && <Check className="w-4 h-4 text-violet-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Integrated Solvers & Plugins</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Hydrostatic Integration Solver',
                      'LaTeX Equation Formatter',
                      'IMO Rulebook Search Grounding',
                      'Wageningen B-Series Engine',
                      'IACS Section Modulus Solver',
                      'OpenFOAM Mesh Exporter'
                    ].map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTool(tool)}
                        className={`p-2.5 rounded-2xl text-left border text-xs font-medium transition flex items-center justify-between ${
                          selectedTools.includes(tool)
                            ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="truncate">{tool}</span>
                        {selectedTools.includes(tool) && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <span>Next: Monetization</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: MONETIZE */}
            {step === 5 && (
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-violet-400" />
                  Step 5: Pricing, Monetization & Publishing
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'free', label: 'Free Public', desc: 'Build community authority' },
                    { id: 'subscription', label: 'Monthly Sub', desc: 'Recurring creator revenue' },
                    { id: 'enterprise', label: 'Enterprise Only', desc: 'Custom private deployment' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPricingType(p.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        pricingType === p.id
                          ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="font-bold text-xs block text-white">{p.label}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{p.desc}</span>
                    </button>
                  ))}
                </div>

                {pricingType === 'subscription' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Monthly Subscription Price:</span>
                      <span className="text-lg font-black text-violet-400">${priceAmount}/mo</span>
                    </div>
                    <input
                      type="range"
                      min={9}
                      max={199}
                      step={5}
                      value={priceAmount}
                      onChange={(e) => setPriceAmount(Number(e.target.value))}
                      className="w-full accent-violet-500"
                    />
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                      <span>Creator Payout (75%): <strong className="text-emerald-400">${(priceAmount * 0.75).toFixed(2)}/subscriber</strong></span>
                      <span>Platform Fee: 25%</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(4)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
                  >
                    {isPublishing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Compiling & Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span>Publish Agent to Marketplace</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Live Preview Card */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Live Marketplace Card Preview:
            </span>
            <div className="bg-slate-900/90 p-5 rounded-3xl border border-violet-500/40 space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-violet-500/20 border border-violet-500/30 text-violet-300 flex items-center justify-center shrink-0">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{name || 'Your Agent Name'}</h4>
                    <span className="text-[10px] text-slate-400">by My Workspace Team (Verified)</span>
                  </div>
                </div>
                <span className="text-xs font-black text-violet-400">
                  {pricingType === 'free' ? 'FREE' : `$${priceAmount}/mo`}
                </span>
              </div>

              <p className="text-xs text-violet-300/90 font-medium line-clamp-1">
                {tagline || 'Tagline will appear here...'}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 text-[11px] text-slate-400 font-mono line-clamp-3">
                {systemPrompt}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Model: <strong>{selectedModel}</strong></span>
                <span>Docs: <strong>{uploadedFiles.length} RAG sources</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
