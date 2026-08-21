import React, { useState } from 'react';
import { MaritimeAgent } from '../../data/maritimeAgentsData';
import {
  X,
  Star,
  CheckCircle2,
  Zap,
  Download,
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Wrench,
  ShieldCheck,
  Code2,
  Copy,
  Check,
  Play,
  RotateCcw,
  Terminal,
  Paperclip,
  Share2
} from 'lucide-react';

interface AgentDetailModalProps {
  agent: MaritimeAgent | null;
  onClose: () => void;
  onDeploy: (agent: MaritimeAgent) => void;
  isDarkMode?: boolean;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  agent,
  onClose,
  onDeploy,
  isDarkMode = true
}) => {
  if (!agent) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'playground' | 'knowledge' | 'reviews'>('playground');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'agent'; content: string; time: string }>>([
    {
      role: 'agent',
      content: `Hello! I am **${agent.name}** (${agent.creator.organization}).\n\nI am ready to perform calculations, audit maritime regulations, and optimize your design parameters. Try selecting a sample prompt below or ask any question!`,
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      role: 'user' as const,
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsSimulating(true);

    setTimeout(() => {
      let agentReply = agent.defaultSimulationResponse;
      if (text.toLowerCase().includes('solas') || text.toLowerCase().includes('fire')) {
        agentReply = `### SOLAS Safety Analysis\n\n**Evaluated against SOLAS Chapter II-2 (2024 Consolidated):**\n- **Bulkhead Fire Rating:** Class A-60 certified insulation boundary verified.\n- **Escape Route Width:** Clear passage $\\ge 900\\text{ mm}$ for primary stairways under FSS Code Ch. 13.\n- **Fire Detection:** Addressable smoke & thermal loop with secondary power supply in accordance with Reg II-2/7.`;
      } else if (text.toLowerCase().includes('power') || text.toLowerCase().includes('resistance')) {
        agentReply = `### Powering & Resistance Formulation\n\n- **Effective Power ($P_E$):** $3,480\\text{ kW}$ @ $14.5\\text{ knots}$\n- **Total Resistance ($R_T$):** $468.2\\text{ kN}$\n- **Recommended Engine:** Dual-Fuel 6S50ME-C9.7 with SCR Tier III compliance.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          content: agentReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsSimulating(false);
    }, 1200);
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        id="agent-detail-modal-container"
        className={`w-full max-w-5xl rounded-3xl border overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh] ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/40">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center p-3 border shrink-0 ${agent.iconBg}`}>
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-white">{agent.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
                  {agent.categoryLabel}
                </span>
                {agent.enterpriseReady && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold border border-amber-500/30">
                    ENTERPRISE READY
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">{agent.tagline}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{agent.stats.rating.toFixed(2)} ({agent.stats.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <span>Created by <strong className="text-slate-200">{agent.creator.name}</strong> ({agent.creator.organization})</span>
                {agent.creator.verified && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 inline" />}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => onDeploy(agent)}
              className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/25 transition flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{agent.pricing.type === 'free' ? 'Add Agent to Workspace (Free)' : `Subscribe ($${agent.pricing.amount}/mo)`}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-800/80 flex items-center gap-4 bg-slate-900/50">
          <button
            onClick={() => setActiveTab('playground')}
            className={`py-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'playground'
                ? 'border-violet-500 text-violet-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Interactive Live Playground</span>
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-violet-500 text-violet-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Overview & Capabilities</span>
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`py-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'knowledge'
                ? 'border-violet-500 text-violet-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>RAG & Knowledge Base ({agent.knowledgeBases.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'playground' && (
            <div className="space-y-4">
              <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 min-h-[320px] max-h-[420px] overflow-y-auto space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'agent' && (
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center p-1.5 shrink-0 bg-violet-500/20 text-violet-400 border border-violet-500/30`}>
                        <Bot className="w-5 h-5" />
                      </div>
                    )}
                    <div
                      className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-violet-600 text-white shadow-md'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap font-sans">{m.content}</div>
                      <div className="text-[9px] text-slate-400/80 mt-2 text-right">{m.time}</div>
                    </div>
                  </div>
                ))}
                {isSimulating && (
                  <div className="flex items-center gap-2 text-xs text-violet-400 animate-pulse pl-11">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Agent is computing hydrostatics and querying rules...</span>
                  </div>
                )}
              </div>

              {/* Sample Prompts */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                  Suggested Prompts to Test:
                </span>
                <div className="flex flex-wrap gap-2">
                  {agent.samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700/60 transition text-left"
                    >
                      "{p}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 pt-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={`Ask ${agent.name} a technical calculation, regulation query, or upload files...`}
                    className="w-full pl-4 pr-10 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isSimulating}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-violet-600 text-white hover:bg-violet-500 disabled:opacity-40 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={() =>
                    setMessages([
                      {
                        role: 'agent',
                        content: `Chat session reset. I am **${agent.name}**, ready for your next engineering inquiry.`,
                        time: 'Just now'
                      }
                    ])
                  }
                  className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                  title="Reset Playground"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white mb-2">Technical Description</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{agent.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-3">Core Automated Capabilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {agent.capabilities.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 font-medium">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-3">Connected Engineering Tools & Solvers</h4>
                <div className="flex flex-wrap gap-2">
                  {agent.toolsIntegrated.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 text-xs font-bold border border-indigo-500/20 flex items-center gap-1.5"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-2">Agent System Prompt Preview</h4>
                <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-slate-400 border border-slate-800 relative">
                  {agent.systemPromptPreview}
                  <button
                    onClick={() => handleCopyPrompt(agent.systemPromptPreview)}
                    className="absolute right-3 top-3 px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Indexed Vector Knowledge Bases</h4>
                <p className="text-xs text-slate-400">
                  This agent uses a Retrieval-Augmented Generation (RAG) pipeline trained on authoritative maritime documentation:
                </p>
              </div>

              <div className="space-y-2">
                {agent.knowledgeBases.map((kb, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-violet-400 shrink-0" />
                      <span className="text-xs font-semibold text-slate-200">{kb}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      Vectorized & Grounded
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/60 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>Context Window: <strong className="text-slate-200">{agent.stats.contextTokens}</strong></span>
            <span>•</span>
            <span>Average Execution: <strong className="text-slate-200">{agent.stats.avgLatency}</strong></span>
            <span>•</span>
            <span>Success Rate: <strong className="text-emerald-400">{agent.stats.successRate}</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
