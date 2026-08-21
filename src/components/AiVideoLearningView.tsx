import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { PlayCircle, Video, FileText, CheckCircle2, Subtitles, Award } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const AiVideoLearningView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [selectedLesson, setSelectedLesson] = useState('1');

  const lessons = [
    { id: '1', title: 'Principles of Intact Ship Stability & GZ Curves', duration: '18 min', instructor: 'AI Prof. A. Vane', completed: true },
    { id: '2', title: 'Wageningen B-Series Propeller Cavitation Limits', duration: '24 min', instructor: 'AI Dr. K. Olsen', completed: false },
    { id: '3', title: 'IMO CII Carbon Rating & Alternative Fuels (Methanol / Ammonia)', duration: '32 min', instructor: 'AI Chief Eng. M. Torres', completed: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="AI Video Learning Hub" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              Tool #61
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Video className="w-7 h-7 text-rose-400" />
              AI Video Academy & Subtitled Lectures
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            AI-generated video lessons with synchronized transcripts, multi-language subtitles, interactive knowledge check quizzes, and certificates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="h-[320px] bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <div className="text-center space-y-3 z-10">
              <button className="w-16 h-16 bg-rose-500/90 hover:bg-rose-400 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-2xl transition transform hover:scale-105">
                <PlayCircle className="w-8 h-8 fill-slate-950 text-rose-500" />
              </button>
              <div className="text-sm font-bold text-white">Lecture Video Player Active</div>
              <span className="text-xs text-rose-300 font-mono">Subtitles: English • Spanish • Norwegian • Japanese</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">Course Syllabus</h3>

          <div className="space-y-2">
            {lessons.map((les) => (
              <div
                key={les.id}
                onClick={() => setSelectedLesson(les.id)}
                className={`p-3 rounded-2xl border transition cursor-pointer ${selectedLesson === les.id ? 'bg-rose-500/10 border-rose-500/40' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                  <span>{les.title}</span>
                  {les.completed && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{les.instructor}</span>
                  <span>{les.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
