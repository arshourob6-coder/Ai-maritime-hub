import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Languages, ArrowRight, Sparkles, Copy, Check, FileText } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const AITranslatorView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Mandarin (Chinese)');
  const [inputText, setInputText] = useState(
    'The main engine turbocharger auxiliary blower must start automatically prior to engine slow turning. Check scavenge space drain valves for accumulated oil.'
  );
  const [translatedText, setTranslatedText] = useState(
    '主机涡轮增压器辅助风机必须在发动机慢转前自动启动。检查扫气室排水阀是否有积油。'
  );
  const [copied, setCopied] = useState(false);

  const handleTranslate = () => {
    setTranslatedText(
      `[Translated to ${targetLang}]: ${inputText}`
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime AI Multilingual Translator" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
              Tool #38
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Languages className="w-7 h-7 text-pink-400" />
              Maritime Technical AI Translator
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Domain-trained AI translation for shipboard manuals, class society reports, IMO regulatory codes, and engineering specifications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Box */}
        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Source Language</span>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs text-slate-200"
            >
              <option value="English">English</option>
              <option value="Mandarin">Mandarin (Chinese)</option>
              <option value="Norwegian">Norwegian</option>
              <option value="German">German</option>
              <option value="Greek">Greek</option>
              <option value="Japanese">Japanese</option>
              <option value="Tagalog">Tagalog (Filipino)</option>
            </select>
          </div>

          <textarea
            rows={8}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-pink-500 font-sans"
            placeholder="Paste technical text, manual paragraph, or IMO clause..."
          />

          <button
            onClick={handleTranslate}
            className="w-full py-3 bg-pink-500 hover:bg-pink-400 text-slate-950 font-black rounded-2xl transition flex items-center justify-center gap-2 text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Translate Maritime Document</span>
          </button>
        </div>

        {/* Target Box */}
        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-pink-400 uppercase">Target Language</span>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs text-pink-300 font-bold"
              >
                <option value="Mandarin (Chinese)">Mandarin (Chinese)</option>
                <option value="English">English</option>
                <option value="Norwegian">Norwegian</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Japanese">Japanese</option>
                <option value="Tagalog (Filipino)">Tagalog (Filipino)</option>
                <option value="Bengali">Bengali</option>
              </select>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 min-h-[190px] text-sm text-slate-100 font-sans leading-relaxed">
              {translatedText}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">99.4% Terminology Accuracy</span>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
