import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Sparkles, Mail, FileText, CheckSquare, Calendar, PenTool } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const AiProductivitySuiteView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [activeTool, setActiveTool] = useState<'email' | 'meeting' | 'tasks'>('email');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime AI Productivity Suite" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              Tool #84
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-blue-400" />
              Maritime AI Executive Productivity Suite
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Automated chartering email drafts, port agency request letters, technical meeting summaries, task boards, and presentation deck generation.
          </p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTool('email')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTool === 'email' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-4 h-4" /> Chartering & Port Mail Assistant
        </button>
        <button
          onClick={() => setActiveTool('meeting')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTool === 'meeting' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" /> Technical Meeting Summarizer
        </button>
      </div>

      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
        {activeTool === 'email' && (
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-white">AI Chartering Email Writer</h3>
            <textarea
              rows={4}
              placeholder="e.g. Draft a Laytime Statement of Facts (SoF) dispute letter for M/V Ocean Star at Port of Rotterdam..."
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => onOpenPricing && onOpenPricing('professional')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition"
            >
              Generate Professional Draft
            </button>
          </div>
        )}

        {activeTool === 'meeting' && (
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-white">AI Technical Meeting Transcript Summarizer</h3>
            <textarea
              rows={4}
              placeholder="Paste meeting transcript regarding drydock inspection findings..."
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => onOpenPricing && onOpenPricing('professional')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition"
            >
              Extract Action Items & Summary
            </button>
          </div>
        )}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
