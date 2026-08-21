import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Bell, ShieldCheck, Briefcase, GraduationCap, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const SmartNotificationsView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'IMO MEPC 82 Revised GHG Strategy Released', category: 'Regulations', time: '10 mins ago', read: false },
    { id: '2', title: 'Senior Naval Architect Position Open at Damen Shipyards', category: 'Jobs', time: '2 hours ago', read: false },
    { id: '3', title: 'Full Master Scholarship at NTNU Trondheim Open for 2027', category: 'Scholarship', time: '1 day ago', read: true },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Smart Maritime Notifications" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
              Tool #62
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Bell className="w-7 h-7 text-sky-400" />
              Smart Maritime News & Regulatory Alerts
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Real-time personalized push & email notifications for IMO circulars, class rule amendments, job postings, and maritime AI updates.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition shrink-0"
        >
          Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-2xl border transition flex items-center justify-between ${notif.read ? 'bg-slate-900/50 border-slate-800/80 opacity-70' : 'bg-slate-900/90 border-sky-500/30 shadow-lg'}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-sky-300 uppercase">{notif.category}</span>
                  <span className="text-[10px] text-slate-500">• {notif.time}</span>
                </div>
                <h3 className="font-bold text-xs text-white mt-0.5">{notif.title}</h3>
              </div>
            </div>

            {!notif.read && <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />}
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
