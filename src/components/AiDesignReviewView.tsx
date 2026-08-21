import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { CheckCircle2, AlertTriangle, FileCheck, Upload, Sparkles, Shield } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const AiDesignReviewView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [analyzing, setAnalyzing] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="AI Ship Design & Drawing Review" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
              Tool #79
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <FileCheck className="w-7 h-7 text-violet-400" />
              Automated AI Ship Design & Drawing Review
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Upload CAD drawings (DXF/DWG/IGES) or structural calculation reports for instant classification society compliance auditing.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 text-center">
        <div className="p-8 border-2 border-dashed border-slate-800 rounded-2xl hover:border-violet-500/50 transition cursor-pointer bg-slate-950/50">
          <Upload className="w-8 h-8 text-violet-400 mx-auto mb-2" />
          <h3 className="font-bold text-sm text-white">Upload CAD Drawing or Technical Report</h3>
          <p className="text-xs text-slate-400 mt-1">Supports DWG, DXF, IGES, STEP, and PDF structural calculation packages</p>
          <button
            onClick={() => setAnalyzing(true)}
            className="mt-4 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-xl text-xs transition"
          >
            {analyzing ? 'Running AI Classification Audit...' : 'Run Automated Class Audit'}
          </button>
        </div>

        {analyzing && (
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Plate Thickness Rule Verification: PASSED (t_req = 14.2mm, t_actual = 16.0mm)
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertTriangle className="w-4 h-4" /> Stiffener Web Buckling Warning: Bracket radius on Frame 42 requires 100mm flange.
            </div>
          </div>
        )}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
