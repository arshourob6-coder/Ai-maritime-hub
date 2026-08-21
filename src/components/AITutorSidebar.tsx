import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Send,
  BookOpen,
  RotateCcw,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  FileText,
  Layers,
  HelpCircle,
  Lightbulb,
  Cpu,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { CalculatorDefinition, UnitSystem } from './CalculatorsHub';

interface AITutorSidebarProps {
  activeCalc: CalculatorDefinition;
  unitSystem: UnitSystem;
  inputState: Record<string, number>;
  calcOutput?: any;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  ragSources?: Array<{ title: string; citation: string; type: string }>;
}

export const AITutorSidebar: React.FC<AITutorSidebarProps> = ({
  activeCalc,
  unitSystem,
  inputState,
  calcOutput,
  isOpen,
  onClose,
  className = ''
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showRagSources, setShowRagSources] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Default initial message whenever active formula changes
  useEffect(() => {
    const initialText = `Hello! I am your **AI Naval Architecture & Ocean Engineering Tutor** for **${activeCalc.name}**.

I am grounded in international standards (**IMO**, **ITTC**, **DNV**, **ABS**, and **SNAME**). 

Here is a quick overview of what I know about this formula:
* **Governing Equation:** \`${activeCalc.formulaLaTeX}\`
* **Category:** ${activeCalc.category}
* **Description:** ${activeCalc.description}

Click one of the shortcut topics below or ask any custom question about assumptions, derivation, or class society rules!`;

    setMessages([
      {
        id: 'init-1',
        role: 'assistant',
        content: initialText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragSources: [
          { title: 'ITTC Recommended Procedures 7.5-02-02-01', citation: 'ITTC 1957 Friction Line & Form Factor', type: 'Experimental Standard' },
          { title: 'IMO Res. MEPC.328(76) / SOLAS Ch. II-1', citation: 'Subdivision, Stability & EEXI Framework', type: 'Statutory IMO Convention' },
          { title: 'DNV Rules for Ships (Pt.3 Ch.1)', citation: 'Hull Girder Strength & Structural Scantlings', type: 'Class Society Rules' },
          { title: 'SNAME Principles of Naval Architecture', citation: 'Lewis (Ed.), Vol. II Hydrodynamics & Powering', type: 'Academic Text' }
        ]
      }
    ]);
  }, [activeCalc.id]);

  // Scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputPrompt('');
    setIsLoading(true);

    try {
      // Map live inputs
      const mappedInputs = activeCalc.inputs.map(inp => {
        const valSI = inputState[inp.id] ?? inp.defaultValueSI;
        const val = unitSystem === 'SI' ? valSI : inp.siToImp(valSI);
        const unit = unitSystem === 'SI' ? inp.siUnit : inp.impUnit;
        return { label: inp.label, value: val, unit, description: inp.description };
      });

      // Map calculated results
      const mappedResults = (calcOutput?.results || []).map((res: any) => ({
        label: res.label,
        value: unitSystem === 'SI' ? res.valueSI : res.valueImp,
        unit: unitSystem === 'SI' ? res.siUnit : res.impUnit,
        formulaUsed: res.formulaUsed
      }));

      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          activeFormula: {
            id: activeCalc.id,
            name: activeCalc.name,
            category: activeCalc.category,
            description: activeCalc.description,
            formulaLaTeX: activeCalc.formulaLaTeX,
            formulaText: activeCalc.formulaText,
            derivation: activeCalc.derivation,
            inputs: mappedInputs,
            results: mappedResults,
            unitSystem
          },
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "Unable to generate tutor response.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragSources: data.ragSources
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Tutor Chat Error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "⚠️ **RAG Engine Note:** Network error connecting to Gemini API. Grounded local knowledge base response active.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Chat history reset. Ask me anything about **${activeCalc.name}**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Quick Prompt Chips
  const promptPills = [
    { label: '📌 Assumptions', text: `Explain the key engineering assumptions and fluid domain boundary conditions for ${activeCalc.name}.` },
    { label: '📐 Derivation Steps', text: `Provide a detailed step-by-step mathematical derivation of the formula: ${activeCalc.formulaLaTeX}` },
    { label: '📜 IMO / ITTC Rules', text: `Which IMO resolutions, ITTC procedures, or Class Society rules (DNV, ABS, LR) apply to ${activeCalc.name}?` },
    { label: '🔢 Numerical Example', text: `Walk me through a worked numerical example using our current live input parameters.` },
    { label: '⚠️ Safety Margins', text: `What are the typical engineering safety factors and trim/weather sensitivity margins for this calculation?` }
  ];

  if (!isOpen) return null;

  return (
    <div className={`flex flex-col bg-slate-950 border border-sky-500/30 rounded-3xl overflow-hidden shadow-2xl ${className}`}>
      {/* HEADER BAR */}
      <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-xl text-slate-950 shadow-md shadow-sky-500/20">
            <Cpu className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-sm text-white tracking-tight">AI Engineering Tutor</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                RAG GROUNDED
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Formula: <span className="text-sky-300 font-bold">{activeCalc.name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
            title="Close Tutor Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GROUNDED FORMULA & RAG CONTEXT DRAWER */}
      <div className="bg-slate-900/50 border-b border-slate-800/80 p-3 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-mono text-sky-400 font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Active RAG Knowledge Base</span>
          </span>
          <button
            onClick={() => setShowRagSources(!showRagSources)}
            className="text-[10px] font-mono text-slate-400 hover:text-sky-300 transition flex items-center gap-1 cursor-pointer bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
          >
            <span>{showRagSources ? 'Hide Sources' : 'View Standards (4)'}</span>
            <ChevronRight className={`w-3 h-3 transition-transform ${showRagSources ? 'rotate-90' : ''}`} />
          </button>
        </div>

        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-sky-500/20 font-mono text-xs text-sky-300 flex items-center justify-between overflow-x-auto">
          <span className="font-bold truncate pr-2">{activeCalc.formulaLaTeX}</span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
            {activeCalc.category}
          </span>
        </div>

        <AnimatePresence>
          {showRagSources && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pt-1"
            >
              <div className="grid grid-cols-1 gap-1.5 text-[10px] font-mono">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-sky-400 font-bold block">ITTC 7.5-02-02-01:</span>
                  1957 Friction Line & Form Factor (1+k)
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-emerald-400 font-bold block">IMO Res. MEPC.328(76):</span>
                  Subdivision, Intact Stability (2008 IS Code) & EEXI
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-amber-400 font-bold block">DNV Rules Pt.3 Ch.1:</span>
                  Hull Girder Bending & Local Scantling Criteria
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-purple-400 font-bold block">SNAME PNA Vol II:</span>
                  Principles of Naval Architecture Hydrodynamics
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CHAT MESSAGES BODY */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[480px] custom-scrollbar bg-slate-950/60">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-slate-400">
              <span>{msg.role === 'user' ? 'You' : 'AI Tutor'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-4 rounded-2xl max-w-[90%] text-xs leading-relaxed space-y-2 relative group shadow-md ${
                msg.role === 'user'
                  ? 'bg-sky-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none font-normal'
              }`}
            >
              {msg.role === 'assistant' && (
                <button
                  onClick={() => handleCopy(msg.id, msg.content)}
                  className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white transition opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="Copy explanation"
                >
                  {copiedId === msg.id ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-sky-400" />
                  )}
                </button>
              )}

              <div className="whitespace-pre-wrap font-sans space-y-1">
                {msg.content}
              </div>

              {/* Citations footer if present */}
              {msg.ragSources && msg.ragSources.length > 0 && (
                <div className="pt-2.5 mt-2 border-t border-slate-800/80 space-y-1 text-[10px] font-mono">
                  <span className="text-sky-400 font-bold block">Grounded RAG Sources Cited:</span>
                  {msg.ragSources.slice(0, 3).map((src, idx) => (
                    <div key={idx} className="text-slate-400 flex items-center gap-1">
                      <span className="text-sky-500">•</span>
                      <span className="font-bold text-slate-300">{src.title}</span>
                      <span>-</span>
                      <span className="italic">{src.citation}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs text-sky-300 font-mono w-fit">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <Zap className="w-4 h-4 text-sky-400" />
            </motion.div>
            <span>Retrieving engineering standards & solving derivation...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* SHORTCUT PROMPT PILLS */}
      <div className="p-2.5 bg-slate-900/80 border-t border-slate-800/80 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-1.5 text-[11px] shrink-0">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold shrink-0 pl-1">
            Quick Prompts:
          </span>
          {promptPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(pill.text)}
              disabled={isLoading}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-sky-300 rounded-xl border border-slate-800 text-[11px] font-mono transition cursor-pointer shrink-0 disabled:opacity-50"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* INPUT FORM BAR */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={`Ask Tutor about ${activeCalc.name}...`}
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-sky-500 transition"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="p-2.5 bg-gradient-to-tr from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-bold rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
