import React, { useState } from 'react';
import { PlanType, Currency } from '../../types';
import {
  Sparkles,
  Bot,
  FileText,
  FileSpreadsheet,
  Languages,
  Edit3,
  CheckCheck,
  FileSearch,
  SplitSquareVertical,
  Layers,
  Send,
  Download,
  Copy,
  Check,
  RefreshCw,
  Zap,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Table,
  UploadCloud,
  Eye,
  Sliders
} from 'lucide-react';

interface AiDocToolsTabProps {
  userPlan: PlanType;
  currency: Currency;
  onOpenPricing: () => void;
}

export type AiDocToolId = 
  | 'summarizer'
  | 'chat_qa'
  | 'table_extractor'
  | 'text_extractor'
  | 'translator'
  | 'rewriter'
  | 'proofreader'
  | 'report_generator'
  | 'doc_compare'
  | 'classifier';

export const AiDocToolsTab: React.FC<AiDocToolsTabProps> = ({
  userPlan,
  currency,
  onOpenPricing
}) => {
  const [activeTool, setActiveTool] = useState<AiDocToolId>('summarizer');
  const [inputText, setInputText] = useState(`IMO RESOLUTION MEPC.328(76)
AMENDMENTS TO THE ANNEX OF THE PROTOCOL OF 1997 TO AMEND THE INTERNATIONAL CONVENTION FOR THE PREVENTION OF POLLUTION FROM SHIPS, 1973, AS MODIFIED BY THE PROTOCOL OF 1978 RELATING THERETO
(Revised MARPOL Annex VI)

THE MARINE ENVIRONMENT PROTECTION COMMITTEE,
RECALLING Article 38(a) of the Convention on the International Maritime Organization concerning the functions of the Marine Environment Protection Committee conferred upon it by international conventions for the prevention and control of marine pollution from ships,
NOTING article 16 of the International Convention for the Prevention of Pollution from Ships, 1973, under which amendments to MARPOL Annex VI (Regulations for the Prevention of Air Pollution from Ships) are adopted,
ADOPTS, in accordance with article 16(2)(d) of the 1973 Convention, the amendments to MARPOL Annex VI, the text of which is set out in the annex to the present resolution;
DETERMINES that the Attained Energy Efficiency Existing Ship Index (EEXI) shall be calculated in accordance with regulation 23 for each ship of 400 gross tonnage and above.`);
  
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: 'Hello! I am your AI Document Copilot. Upload or paste any maritime document, class rulebook, charter party, or towing tank report, and ask me anything about it.',
      time: '10:00 AM'
    }
  ]);
  const [targetLanguage, setTargetLanguage] = useState('Bengali');
  const [rewriteTone, setRewriteTone] = useState<'academic' | 'executive' | 'technical' | 'simplified'>('academic');
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Compare documents secondary text state
  const [docBText, setDocBText] = useState(`IMO RESOLUTION MEPC.328(76) - REVISED DRAFT 2026
AMENDMENTS TO MARPOL ANNEX VI (ENERGY EFFICIENCY EXISTING SHIP INDEX & CII)

THE MARINE ENVIRONMENT PROTECTION COMMITTEE,
DETERMINES that Attained EEXI calculation shall apply strictly to all cargo and passenger ships above 400 GT, incorporating ShaPoLi (Shaft Power Limitation) and Engine Power Limitation (EPL) overrides during safety emergencies at sea.`);

  const aiToolsList: Array<{ id: AiDocToolId; name: string; desc: string; icon: any; badge?: string }> = [
    { id: 'summarizer', name: 'AI PDF Summarizer', desc: 'Generate executive summary, key takeaways & action items', icon: <FileText className="w-4 h-4 text-cyan-400" />, badge: 'POPULAR' },
    { id: 'chat_qa', name: 'Chat with Document', desc: 'Interactive Q&A and clause verification on your files', icon: <Bot className="w-4 h-4 text-indigo-400" />, badge: 'PRO' },
    { id: 'table_extractor', name: 'Extract Tables', desc: 'Auto-detect tables and export to CSV, Excel & JSON', icon: <Table className="w-4 h-4 text-emerald-400" /> },
    { id: 'text_extractor', name: 'Extract Clean Text', desc: 'Pull markdown and structured text without formatting artifacts', icon: <FileSearch className="w-4 h-4 text-sky-400" /> },
    { id: 'translator', name: 'Translate Document', desc: 'Accurate translation in 35+ maritime languages', icon: <Languages className="w-4 h-4 text-amber-400" /> },
    { id: 'rewriter', name: 'Rewrite & Enhance', desc: 'Rephrase to academic, executive, or technical tone', icon: <Edit3 className="w-4 h-4 text-pink-400" /> },
    { id: 'proofreader', name: 'Proofread & Audit', desc: 'Grammar, naval terminology, and consistency checker', icon: <CheckCheck className="w-4 h-4 text-teal-400" /> },
    { id: 'report_generator', name: 'Generate Report', desc: 'Convert raw survey data into formal class-standard reports', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { id: 'doc_compare', name: 'Compare 2 Documents', desc: 'Visual side-by-side diff highlighting changes & deletions', icon: <SplitSquareVertical className="w-4 h-4 text-rose-400" /> },
    { id: 'classifier', name: 'AI Classification', desc: 'Auto-categorize document type, confidence & metadata', icon: <Layers className="w-4 h-4 text-blue-400" /> }
  ];

  const handleRunAiTool = () => {
    setIsProcessing(true);
    setOutputResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      switch (activeTool) {
        case 'summarizer':
          setOutputResult(`### Executive Summary: IMO Res. MEPC.328(76) MARPOL Annex VI

**1. Core Regulatory Mandate**
* Adopts amendments to MARPOL Annex VI regarding the **Attained Energy Efficiency Existing Ship Index (EEXI)** and **Carbon Intensity Indicator (CII)** framework.
* Applies to all ocean-going vessels of **400 GT and above**.

**2. Key Technical Takeaways**
* Requires calculation of Attained EEXI in accordance with Regulation 23.
* Requires verification against the Required EEXI threshold before initial safety/IAPP certificate renewal.
* Recognizes Engine Power Limitation (EPL) and Shaft Power Limitation (ShaPoLi) as acceptable technical compliance measures.

**3. Action Items for Shipowners & Technical Managers**
* Conduct vessel EEXI technical file verification with Recognized Organizations (RO: DNV, ABS, ClassNK).
* Calibrate fuel mass consumption flowmeters and SEEMP Part III carbon intensity operational plans.`);
          break;

        case 'table_extractor':
          setOutputResult(`### Extracted Hydrostatic & EEXI Reference Table (CSV / Excel format)

\`\`\`csv
Parameter,Ship Type,GT Threshold,Required EEXI Reduction Factor (Y)
Bulk Carrier,Capesize,>= 200000 DWT,20%
Bulk Carrier,Panamax,70000 - 200000 DWT,20%
Gas Carrier,LNG Carrier,>= 65000 DWT,30%
Tanker,VLCC,>= 200000 DWT,15%
Container Ship,Post-Panamax,>= 120000 DWT,50%
Ro-Ro Cargo,Vehicle Carrier,>= 10000 DWT,15%
\`\`\`

*Exported 6 rows, 4 columns with 99.8% OCR structure confidence.*`);
          break;

        case 'translator':
          if (targetLanguage === 'Bengali') {
            setOutputResult(`### আন্তর্জাতিক মেরিটাইম অর্গানাইজেশন (IMO) রেজোলিউশন MEPC.328(76) বঙ্গানুবাদ

**সংশোধিত মারপোল অ্যানেক্স VI (জাহাজ থেকে বায়ু দূষণ প্রতিরোধ):**
মেরিন এনভায়রনমেন্ট প্রটেকশন কমিটি (MEPC) আন্তর্জাতিক কনভেনশনের ধারা অনুযায়ী ৪০০ গ্রস টন (GT) বা তার বেশি ওজনের প্রতিটি সক্রিয় বাণিজ্যিক জাহাজের জন্য **বিদ্যমান জাহাজের শক্তি দক্ষতা সূচক (EEXI)** হিসাব করা এবং কার্বন নির্গমন কমানোর বাধ্যবাধকতা জারি করছে।`);
          } else {
            setOutputResult(`### Translated Document to ${targetLanguage}
[Official Maritime Translation verified against IMO Multi-Lingual Terminology Database (GISIS)].
Resolution MEPC.328(76) - EEXI calculations and operational CII rating requirements applicable to commercial vessels >= 400 GT.`);
          }
          break;

        case 'rewriter':
          setOutputResult(`### Rewritten Document (Tone: ${rewriteTone.toUpperCase()})

"Pursuant to the statutory authority under MARPOL Annex VI (Resolution MEPC.328(76)), international maritime operators are legally obligated to compute and submit verified Attained EEXI dossiers for all commercial vessels exceeding 400 gross tonnage, establishing rigorous baseline compliance with IMO decarbonization directives."`);
          break;

        case 'proofreader':
          setOutputResult(`### Proofreading & Terminology Audit Results

* **Total Sentences Analyzed:** 14
* **Grammar & Syntax Score:** 98/100
* **Naval Architecture Terminology Check:** PASS (100% compliant with IMO & SNAME glossaries)
* **Recommendations:**
  - Standardized "gross tonnage" to official acronym "GT" per IMO FAL conventions.
  - Active voice converted: "EEXI shall be calculated" → "Technical managers must calculate Attained EEXI".`);
          break;

        case 'report_generator':
          setOutputResult(`### Formal Maritime Technical Inspection & Compliance Report
**Doc Ref:** MH-TECH-2026-0881 | **Status:** CLASS APPROVED
**Vessel Category:** 115,000 DWT Aframax Crude Oil Tanker
**Regulation Standard:** IMO MEPC.328(76) / DNV Rules Pt. 3

1. **Executive Assessment:** The vessel propulsion train and hull form require a 12.4% shaft power de-rating (ShaPoLi) to satisfy Phase 2 EEXI baselines.
2. **Defects & Anomalies:** None observed in fuel flow telemetry.
3. **Surveyor Sign-off:** Verified by AI Maritime Hub Technical Audit System.`);
          break;

        case 'classifier':
          setOutputResult(`### AI Maritime Document Classification

* **Document Category:** Statutory IMO Environmental Convention & Resolution
* **Sub-category:** MARPOL Annex VI / EEXI & CII Regulations
* **Classification Confidence:** 99.7%
* **Governing Body:** International Maritime Organization (IMO) - MEPC
* **Applicable Vessel Classes:** Bulk Carriers, Tankers, Gas Carriers, Container Ships >= 400 GT
* **Metadata Tags:** \`#MARPOL\`, \`#EEXI\`, \`#Decarbonization\`, \`#MEPC328\`, \`#DNV\``);
          break;

        case 'doc_compare':
          setOutputResult(`### Document Diff & Semantic Comparison (Doc A vs Doc B)

* **Similarity Index:** 82.4% Match
* **Key Additions in Document B:**
  - \`+ REVISED DRAFT 2026\` (Title Header)
  - \`+ Incorporating ShaPoLi (Shaft Power Limitation)\` (Clause 2)
  - \`+ Engine Power Limitation (EPL) overrides during safety emergencies at sea\` (Clause 3)
* **Key Deletions from Document A:**
  - \`- Protocol of 1997 preamble background clauses omitted for brevity.\``);
          break;

        default:
          setOutputResult('Processed document successfully using AI Maritime Engine.');
      }
    }, 1200);
  };

  const handleSendChat = () => {
    if (!chatQuestion.trim() || isProcessing) return;
    const userQ = chatQuestion;
    setChatQuestion('');
    const newHistory = [
      ...chatHistory,
      { role: 'user' as const, text: userQ, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    setChatHistory(newHistory);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setChatHistory([
        ...newHistory,
        {
          role: 'assistant',
          text: `Based on the uploaded document (**IMO Resolution MEPC.328(76)**):\n\n1. **Applicability:** It explicitly applies to all ships of **400 GT and above**.\n2. **Regulation:** Regulation 23 governs the Attained EEXI calculation.\n3. **Compliance Requirement:** Shipowners must prepare an EEXI Technical File for approval before the first survey after 1 January 2023.\n\nLet me know if you would like me to extract the specific reduction factor formula or Class Society survey guidelines!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">AI Document Intelligence Suite</h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                10 AI Tools
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Summarize, chat with documents, extract tables, translate in 35+ languages, and generate formal class reports.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">AI Engine:</span>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
            Gemini 3.6 Pro Maritime
          </span>
        </div>
      </div>

      {/* Tool Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {aiToolsList.map((tool) => {
          const isSelected = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id);
                setOutputResult(null);
              }}
              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-500/15 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <div className="p-1.5 bg-slate-800/90 rounded-lg border border-slate-700/50">
                  {tool.icon}
                </div>
                {tool.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {tool.badge}
                  </span>
                )}
              </div>
              <div>
                <span className="text-xs font-bold block truncate">{tool.name}</span>
                <span className="text-[10px] text-slate-400 block line-clamp-1 mt-0.5">{tool.desc}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Workspace Area */}
      {activeTool === 'chat_qa' ? (
        /* Chat with Document Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Document Preview (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col h-[520px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                Source Document Text
              </span>
              <span className="text-[11px] text-slate-400 font-mono">1,240 words</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none focus:outline-none focus:border-indigo-500 leading-relaxed"
              placeholder="Paste document text or upload file..."
            />
          </div>

          {/* Interactive Chat Console (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col h-[520px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">Ask Anything About This Document</span>
              </div>
              <button
                onClick={() => setChatHistory([])}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Clear chat
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-800 border border-slate-750 text-slate-200 rounded-bl-none whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 font-mono">{msg.time}</span>
                </div>
              ))}
              {isProcessing && (
                <div className="flex items-center gap-2 text-indigo-400 text-xs p-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Searching document and synthesizing answer...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Ask e.g. What is the GT limit? Which regulation defines Required EEXI?"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSendChat}
                disabled={isProcessing || !chatQuestion.trim()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-40 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </div>
          </div>
        </div>
      ) : activeTool === 'doc_compare' ? (
        /* Document Comparison Diff View */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-white block">Document A (Original / Baseline)</span>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-white block">Document B (Revised / Amendment)</span>
              <textarea
                value={docBText}
                onChange={(e) => setDocBText(e.target.value)}
                rows={8}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono resize-none focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={handleRunAiTool}
            disabled={isProcessing}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Differences & Structural Diff...</span>
              </>
            ) : (
              <>
                <SplitSquareVertical className="w-4 h-4" />
                <span>Compare Both Documents</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Standard Single Document AI Tool Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input Text & Specific Tool Controls (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Input Document / Clause
              </span>
              <button
                onClick={() => setInputText('')}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Clear
              </button>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={11}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono resize-none focus:outline-none focus:border-indigo-500 leading-relaxed"
              placeholder="Paste or type document content here..."
            />

            {/* Tool-specific configuration controls */}
            {activeTool === 'translator' && (
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium block">Target Language:</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {['Bengali', 'Spanish', 'Chinese', 'French', 'Arabic', 'German', 'Japanese', 'Norwegian'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setTargetLanguage(lang)}
                      className={`py-1.5 px-2 text-xs rounded-lg font-medium transition-all ${
                        targetLanguage === lang
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTool === 'rewriter' && (
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium block">Target Tone:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'academic', label: 'Academic & Formal' },
                    { id: 'executive', label: 'Executive Summary' },
                    { id: 'technical', label: 'Technical Spec' },
                    { id: 'simplified', label: 'Simplified Plain' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setRewriteTone(t.id as any)}
                      className={`py-1.5 px-2 text-xs rounded-lg font-medium transition-all ${
                        rewriteTone === t.id
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleRunAiTool}
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing with Gemini 3.6 Pro Maritime...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute {aiToolsList.find(t => t.id === activeTool)?.name}</span>
                </>
              )}
            </button>
          </div>

          {/* Right: AI Output Console (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  AI Output & Verified Analysis
                </span>
                {outputResult && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4">
                {outputResult ? (
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap max-h-[380px] overflow-y-auto">
                    {outputResult}
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-800 rounded-xl p-12 text-center text-slate-500 text-xs">
                    <Bot className="w-8 h-8 mx-auto text-slate-700 mb-2" />
                    <span>Run an AI Document tool on the left to see instant generated summaries, tables, or translations.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero Data Training Pledge
              </span>
              <span>Encrypted Maritime Sandbox</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
