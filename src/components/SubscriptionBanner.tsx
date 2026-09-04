import React from 'react';
import { PlanType } from '../types';
import { Sparkles, ShieldCheck, Crown, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SubscriptionBannerProps {
  userPlan?: PlanType | string;
  onOpenPricing?: (plan?: PlanType) => void;
  onUpgrade?: () => void;
  badge?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  featureName?: string;
}

export const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({
  userPlan = 'student',
  onOpenPricing,
  onUpgrade,
  badge,
  title,
  subtitle,
  compact = false,
  featureName
}) => {
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else if (onOpenPricing) {
      onOpenPricing(userPlan === 'enterprise' ? 'enterprise' : 'professional');
    }
  };
  const getPlanDetails = (plan?: PlanType | string) => {
    switch (plan) {
      case 'enterprise':
        return {
          label: 'ENTERPRISE PLAN',
          color: 'from-amber-500 via-purple-500 to-indigo-500',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          icon: <Crown className="w-4 h-4 text-amber-400" />,
          perk: 'Unlimited API, Priority Compute & Custom SLA'
        };
      case 'professional':
        return {
          label: 'PROFESSIONAL PLAN',
          color: 'from-sky-500 via-indigo-500 to-purple-500',
          badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          icon: <Sparkles className="w-4 h-4 text-sky-400" />,
          perk: 'High-Precision Hydrodynamics, Live Satellite AIS & PDF Export'
        };
      case 'student':
        return {
          label: 'STUDENT PLAN',
          color: 'from-emerald-500 to-sky-500',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          icon: <Zap className="w-4 h-4 text-emerald-400" />,
          perk: '1,000,000 AI Tokens / Month & Full Learning Suite'
        };
      default:
        return {
          label: 'FREE PLAN',
          color: 'from-slate-600 to-slate-800',
          badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
          icon: <ShieldCheck className="w-4 h-4 text-slate-400" />,
          perk: 'Basic Tools & Limited Daily Queries'
        };
    }
  };

  const details = getPlanDetails(userPlan);

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border flex items-center gap-1.5 ${details.badgeBg}`}>
            {details.icon}
            <span>{details.label}</span>
          </span>
          <span className="text-slate-300 font-medium hidden sm:inline">{details.perk}</span>
        </div>

        <button
          onClick={() => onOpenPricing && onOpenPricing(userPlan === 'enterprise' ? 'enterprise' : 'professional')}
          className="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-black rounded-xl transition shadow flex items-center gap-1 shrink-0 text-[11px]"
        >
          <span>{userPlan === 'enterprise' ? 'Manage Plan' : 'Upgrade Plan'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-5 sm:p-6 my-6 text-xs relative overflow-hidden shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border flex items-center gap-1 ${details.badgeBg}`}>
              {details.icon}
              <span>{badge || `Active Subscription: ${details.label}`}</span>
            </span>
            {featureName && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Unlocked for {featureName}
              </span>
            )}
          </div>

          <h4 className="text-sm sm:text-base font-black text-white">
            {title || (
              <>Need higher quota or enterprise tools? <span className="text-sky-400">Upgrade your subscription anytime.</span></>
            )}
          </h4>

          <p className="text-slate-300 leading-relaxed text-[11px]">
            {subtitle || `${details.perk}. Switch between Student ($8/mo), Professional ($25/mo), or Enterprise ($99/mo) plans with 100% money-back guarantee.`}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={() => onOpenPricing ? onOpenPricing('student') : handleUpgrade()}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition text-[11px]"
          >
            Student ($8/mo)
          </button>
          <button
            onClick={handleUpgrade}
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 font-black rounded-xl transition shadow-lg text-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Upgrade Subscription</span>
          </button>
        </div>

      </div>
    </div>
  );
};
