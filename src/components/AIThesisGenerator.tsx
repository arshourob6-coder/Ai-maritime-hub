import React, { useState } from 'react';
import { FileCode2, Sparkles, Download, Loader2, BookOpen, Copy, Check, FileText } from 'lucide-react';

export const AIThesisGenerator: React.FC = () => {
  const [topic, setTopic] = useState('Hydrodynamic Optimization of Dual-Fuel Methanol Container Ships Using AI CFD');
  const [academicLevel, setAcademicLevel] = useState('Master of Science (M.Sc)');
  const [paperType, setPaperType] = useState('Master Thesis Draft');
  const [citationFormat, setCitationFormat] = useState('IEEE Format');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || loading) return;

    setLoading(true);
    setGeneratedContent(null);

    try {
      const res = await fetch('/api/ai/thesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          academicLevel,
          paperType,
          format: citationFormat,
        }),
      });
      const data = await res.json();
      setGeneratedContent(data.content || "Failed to generate thesis content.");
    } catch (err: any) {
      console.error(err);
      setGeneratedContent("Error: " + (err.message || "Failed to connect to AI thesis generator."));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Maritime_Thesis_${topic.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    a.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
            <FileCode2 className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">AI Thesis & Assignment Generator</h2>
            <p className="text-xs text-slate-400">Automates academic literature reviews, research methodologies, and IEEE citations</p>
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
          World Maritime University Standard
        </span>
      </div>

      {/* Generator Form */}
      <form onSubmit={handleGenerate} className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Thesis / Research Topic Title
          </label>
          <input
            type="text"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-slate-950 border border-sky-500/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400/50"
            placeholder="e.g., Evaluation of MARPOL Annex VI Carbon Intensity Indicator (CII) for Bulk Carriers..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Level</label>
            <select
              value={academicLevel}
              onChange={(e) => setAcademicLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="B.Sc Naval Architecture">B.Sc Naval Architecture</option>
              <option value="Master of Science (M.Sc)">Master of Science (M.Sc)</option>
              <option value="Ph.D. Marine Engineering">Ph.D. Marine Engineering</option>
              <option value="STCW Chief Engineer License">STCW Chief Engineer License</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Document Type</label>
            <select
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="Master Thesis Draft">Master Thesis Draft</option>
              <option value="Literature Review Chapter">Literature Review Chapter</option>
              <option value="Research Proposal">Research Proposal</option>
              <option value="Engineering Assignment Solution">Engineering Assignment Solution</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Citation Format</label>
            <select
              value={citationFormat}
              onChange={(e) => setCitationFormat(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="IEEE Format">IEEE Citation Format</option>
              <option value="APA 7th Edition">APA 7th Edition</option>
              <option value="ISO 690 Maritime Standard">ISO 690 Standard</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-500 hover:from-cyan-500 hover:to-sky-400 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Thesis Chapter & Citations...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Generate Thesis Draft with AI</span>
            </>
          )}
        </button>
      </form>

      {/* Result Display */}
      {generatedContent && (
        <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Generated Academic Document</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedContent);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleDownloadMarkdown}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .MD</span>
              </button>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-wrap p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 max-h-[600px] overflow-y-auto">
            {generatedContent}
          </div>
        </div>
      )}
    </div>
  );
};
