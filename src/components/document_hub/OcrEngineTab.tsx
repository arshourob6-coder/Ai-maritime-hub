import React, { useState } from 'react';
import { PlanType, Currency } from '../../types';
import {
  Eye,
  Scan,
  FileText,
  Languages,
  Sparkles,
  Download,
  Copy,
  Check,
  RefreshCw,
  Zap,
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  FileCode,
  Image as ImageIcon
} from 'lucide-react';

interface OcrEngineTabProps {
  userPlan: PlanType;
  currency: Currency;
  onOpenPricing: () => void;
}

export const OcrEngineTab: React.FC<OcrEngineTabProps> = ({
  userPlan,
  currency,
  onOpenPricing
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English & Bengali (Multi-script)');
  const [ocrMode, setOcrMode] = useState<'searchable_pdf' | 'editable_docx' | 'plain_text' | 'markdown'>('searchable_pdf');
  const [enhanceScan, setEnhanceScan] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ocrResultText, setOcrResultText] = useState<string | null>(`LLOYD'S REGISTER OF SHIPPING - HULL THICKNESS MEASUREMENT REPORT
REPORT NO: LR-TM-2026-9041 | VESSEL: M/V PACIFIC NAVIGATOR (IMO 9482104)
DATE OF SURVEY: 14-JAN-2026 | LOCATION: SINGAPORE DRYDOCK #3

SECTION 1: BOTTOM SHELL & KEEL PLATING
Plate ID | Original Thk (mm) | Measured Thk (mm) | Diminution (%) | Class Status
A-01     | 24.0               | 23.2               | 3.3%           | ACCEPTABLE
A-02     | 24.0               | 22.8               | 5.0%           | ACCEPTABLE
B-04     | 22.5               | 19.1               | 15.1%          | SUBSTANTIAL CORROSION - RE-MEASURE IN 1 YR
K-01     | 28.0               | 27.4               | 2.1%           | ACCEPTABLE

REMARKS:
Ultrasonic thickness gauge (Krautkrämer USM 35X) calibrated against 20.0mm carbon steel step wedge. Temperature: 28°C.`);

  const handleRunOcr = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (!ocrResultText) return;
    navigator.clipboard.writeText(ocrResultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl text-purple-400">
            <Scan className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">High-Accuracy Optical Character Recognition (OCR)</h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Neural OCR v4.1
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Extract tabular data, formulas, and text from old scanned drawings, class certificates, shipyard survey logs, and handwritten notes.
            </p>
          </div>
        </div>
      </div>

      {/* Main OCR Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload & OCR Settings (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="border-2 border-dashed border-slate-700/80 hover:border-purple-500 rounded-xl p-6 text-center bg-slate-950/60 cursor-pointer transition-colors">
            <UploadCloud className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <span className="text-xs font-bold text-white block">Upload Scanned Document or Image</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Supports PDF, TIFF, PNG, JPG up to 100 MB</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-white block mb-1.5">Document Language & Script:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              >
                <option>English (Technical & Marine)</option>
                <option>English & Bengali (Multi-script)</option>
                <option>Chinese (Simplified & Traditional Maritime)</option>
                <option>Japanese (ClassNK Standards)</option>
                <option>Korean (Shipbuilding Standards)</option>
                <option>Norwegian (DNV Maritime)</option>
                <option>French (Bureau Veritas)</option>
                <option>German & Spanish</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1.5">Output Format:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'searchable_pdf', label: 'Searchable PDF' },
                  { id: 'editable_docx', label: 'Word (.docx)' },
                  { id: 'plain_text', label: 'Plain Text (.txt)' },
                  { id: 'markdown', label: 'Markdown (.md)' }
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setOcrMode(fmt.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all text-center ${
                      ocrMode === fmt.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">AI Scan Enhancement</span>
                <span className="text-[10px] text-slate-400 block">De-skew, de-speckle & increase contrast</span>
              </div>
              <input
                type="checkbox"
                checked={enhanceScan}
                onChange={(e) => setEnhanceScan(e.target.checked)}
                className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
              />
            </div>

            <button
              onClick={handleRunOcr}
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-purple-500 via-pink-600 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning & Recognizing Text...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Execute Neural OCR Recognition</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: OCR Result & Live Verification (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white">Recognized Text Output (99.8% Confidence)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => alert('Downloading OCR result...')}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {ocrMode.toUpperCase()}</span>
                </button>
              </div>
            </div>

            <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
              {ocrResultText}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Tabular layout recognized & aligned automatically
            </span>
            <span className="font-mono">Processing time: 1.4s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
