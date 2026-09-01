import React, { useState } from 'react';
import { PlanType, Currency } from '../../types';
import {
  Layers,
  Scissors,
  Minimize2,
  RotateCw,
  Lock,
  Unlock,
  Stamp,
  EyeOff,
  Move,
  Trash2,
  Download,
  Plus,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Zap,
  FileText
} from 'lucide-react';

interface PdfPowerToolsTabProps {
  userPlan: PlanType;
  currency: Currency;
  onOpenPricing: () => void;
}

export const PdfPowerToolsTab: React.FC<PdfPowerToolsTabProps> = ({
  userPlan,
  currency,
  onOpenPricing
}) => {
  const [activeTool, setActiveTool] = useState<
    'merge' | 'split' | 'compress' | 'rotate' | 'protect' | 'unlock' | 'watermark'
  >('merge');

  // Simulated state for PDF merge files
  const [mergeFiles, setMergeFiles] = useState<Array<{ id: string; name: string; pages: number; size: string }>>([
    { id: '1', name: 'General_Arrangement_GA_Plan_RevC.pdf', pages: 4, size: '6.4 MB' },
    { id: '2', name: 'Midship_Section_Scantlings_DNV.pdf', pages: 8, size: '4.1 MB' },
    { id: '3', name: 'Trim_and_Stability_Summary_Booklet.pdf', pages: 18, size: '9.2 MB' }
  ]);

  // Split state
  const [splitRange, setSplitRange] = useState('1-5, 8, 12-18');
  // Compression level
  const [compressionRatio, setCompressionRatio] = useState<'recommended' | 'extreme' | 'low'>('recommended');
  // Watermark text
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL - SHIP DESIGN');
  // Password
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleExecute = () => {
    setIsProcessing(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsProcessing(false);
      switch (activeTool) {
        case 'merge':
          setStatusMessage(`Successfully merged ${mergeFiles.length} PDF blueprints into "Merged_Maritime_Dossier_${Date.now()}.pdf" (30 Pages, 19.7 MB).`);
          break;
        case 'split':
          setStatusMessage(`Extracted requested page range "${splitRange}" into standalone PDF (12 Pages, 5.8 MB).`);
          break;
        case 'compress':
          setStatusMessage(`PDF compressed by 68%! Size reduced from 14.2 MB to 4.54 MB while maintaining 300 DPI vector lines.`);
          break;
        case 'rotate':
          setStatusMessage(`Rotated all 24 drawings 90° clockwise and saved orientation profile.`);
          break;
        case 'protect':
          setStatusMessage(`Applied AES-256 military encryption. Document now requires password for viewing and printing.`);
          break;
        case 'unlock':
          setStatusMessage(`Successfully stripped security permissions lock. Unrestricted PDF ready.`);
          break;
        case 'watermark':
          setStatusMessage(`Applied semi-transparent watermark "${watermarkText}" across all 18 pages.`);
          break;
      }
    }, 1200);
  };

  const removeMergeItem = (id: string) => {
    setMergeFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">PDF Power Operations Hub</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Reorder, merge, split, encrypt, watermark, and compress maritime PDF documents with zero loss of CAD line clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Power Tools Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'merge', label: 'Merge PDFs', icon: <Layers className="w-4 h-4" /> },
          { id: 'split', label: 'Split & Extract', icon: <Scissors className="w-4 h-4" /> },
          { id: 'compress', label: 'Compress PDF', icon: <Minimize2 className="w-4 h-4" /> },
          { id: 'rotate', label: 'Rotate Pages', icon: <RotateCw className="w-4 h-4" /> },
          { id: 'protect', label: 'Encrypt / Protect', icon: <Lock className="w-4 h-4" /> },
          { id: 'unlock', label: 'Unlock PDF', icon: <Unlock className="w-4 h-4" /> },
          { id: 'watermark', label: 'Add Watermark', icon: <Stamp className="w-4 h-4" /> }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id as any);
              setStatusMessage(null);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTool === tool.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-inner'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            {tool.icon}
            <span>{tool.label}</span>
          </button>
        ))}
      </div>

      {/* Main Tool Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        {activeTool === 'merge' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Files to Merge in Order</span>
              <button
                onClick={() => {
                  setMergeFiles(prev => [
                    ...prev,
                    { id: Date.now().toString(), name: `Class_Survey_Appendix_${prev.length + 1}.pdf`, pages: 6, size: '2.8 MB' }
                  ]);
                }}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" /> Add another PDF
              </button>
            </div>

            <div className="space-y-2">
              {mergeFiles.map((file, idx) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-slate-800/80 border border-slate-700/70 rounded-xl text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-[10px] text-cyan-400 font-bold">
                      {idx + 1}
                    </span>
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-white font-medium">{file.name}</span>
                    <span className="text-slate-400 text-[11px] font-mono">({file.pages} pages, {file.size})</span>
                  </div>
                  <button
                    onClick={() => removeMergeItem(file.id)}
                    className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTool === 'split' && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-white block">Specify Page Ranges or Individual Pages:</label>
            <input
              type="text"
              value={splitRange}
              onChange={(e) => setSplitRange(e.target.value)}
              placeholder="e.g. 1-4, 8, 11-15"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <p className="text-[11px] text-slate-400">
              Use hyphens for ranges (e.g. 1-10) and commas for individual pages. Perfect for extracting single chapters or stability calculations.
            </p>
          </div>
        )}

        {activeTool === 'compress' && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-white block">Select Compression Target:</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'low', label: 'Low Compression', sub: 'Highest Quality (300 DPI)' },
                { id: 'recommended', label: 'Recommended', sub: 'Balanced Size & Clarity (150 DPI)' },
                { id: 'extreme', label: 'Extreme Compression', sub: 'Maximum Reduction (72 DPI)' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setCompressionRatio(lvl.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    compressionRatio === lvl.id
                      ? 'bg-cyan-500/15 border-cyan-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold block">{lvl.label}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{lvl.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTool === 'watermark' && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-white block">Custom Watermark Stamp Text:</label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              placeholder="e.g. DRAFT FOR CLASS REVIEW ONLY"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <div className="flex gap-2">
              {['CONFIDENTIAL', 'PRELIMINARY DESIGN', 'FOR CLASS APPROVAL ONLY', 'RESTRICTED'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setWatermarkText(preset)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 rounded-lg transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )}

        {(activeTool === 'protect' || activeTool === 'unlock') && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-white block">
              {activeTool === 'protect' ? 'Set AES-256 Encryption Password:' : 'Enter Current Password to Unlock:'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter strong security passphrase"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        )}

        {activeTool === 'rotate' && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
            <RotateCw className="w-8 h-8 text-cyan-400 mx-auto" />
            <p className="text-xs text-slate-300">
              Rotate all pages in current document 90° clockwise.
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleExecute}
          disabled={isProcessing}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Processing PDF Operation...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Apply {activeTool.toUpperCase()} Operation</span>
            </>
          )}
        </button>

        {/* Status result */}
        {statusMessage && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs">
            <span className="text-emerald-300 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {statusMessage}
            </span>
            <button
              onClick={() => alert('Downloading processed PDF...')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
