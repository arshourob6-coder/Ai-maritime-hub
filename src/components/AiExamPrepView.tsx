import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Award, CheckCircle2, HelpCircle, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const AiExamPrepView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const question = {
    text: 'According to the IMO Intact Stability Code, what is the minimum required initial metacentric height (GM0) for cargo vessels over 24m in length?',
    options: ['0.15 m', '0.20 m', '0.35 m', '0.50 m'],
    correct: 0,
    explanation: 'IMO Resolution A.749(18) Section 3.1.2.4 mandates a minimum initial GM0 of not less than 0.15 meters.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="AI Maritime Exam Prep" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Tool #67
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Award className="w-7 h-7 text-emerald-400" />
              AI Maritime Officer & Engineer Exam Prep
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Adaptive mock exams for STCW Chief Mate/Master, Class 1/2 Marine Engineer, Chief Engineer, RINA & SNAME Professional Engineer (PE) licenses.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
          <span className="font-bold text-emerald-400 uppercase">STCW Master / Naval Architecture PE Mock</span>
          <span className="text-slate-400 font-mono">Question 14 of 50</span>
        </div>

        <h3 className="font-bold text-sm sm:text-base text-white leading-relaxed">{question.text}</h3>

        <div className="space-y-2">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAnswer(idx)}
              className={`w-full p-3.5 rounded-2xl border text-xs font-bold text-left transition flex items-center justify-between ${
                selectedAnswer === idx
                  ? idx === question.correct
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                    : 'bg-rose-500/20 border-rose-500 text-rose-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{opt}</span>
              {selectedAnswer === idx && idx === question.correct && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-emerald-400 block">Explanation:</span>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
