import React, { useState } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType } from '../types';
import { Calendar, MapPin, Users, Ticket, Video, ExternalLink, Sparkles } from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
}

export const MaritimeEventsView: React.FC<Props> = ({ userPlan = 'student', onOpenPricing }) => {
  const [filterType, setFilterType] = useState('All');

  const events = [
    { id: 1, title: 'Posidonia International Shipping Exhibition 2026', date: 'June 8-12, 2026', location: 'Athens, Greece', type: 'Conference', attendees: '32,000+', online: false },
    { id: 2, title: 'SMM Hamburg - The Maritime Green Transition Forum', date: 'Sept 1-4, 2026', location: 'Hamburg, Germany', type: 'Exhibition', attendees: '40,000+', online: false },
    { id: 3, title: 'Global Autonomous Ship Design Webinar', date: 'August 14, 2026', location: 'Online Live Stream', type: 'Webinar', attendees: '1,500+', online: true },
    { id: 4, title: 'International Naval Architecture Student Hackathon', date: 'Oct 20-22, 2026', location: 'London, UK / Online', type: 'Competition', attendees: '800+', online: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-slate-100">
      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} featureName="Maritime Events & Conferences Portal" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              Tool #37
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <Calendar className="w-7 h-7 text-purple-400" />
              Global Maritime Events & Conferences
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Discover upcoming international maritime exhibitions, webinars, engineering workshops, and naval architecture design competitions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div key={ev.id} className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-purple-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30">
                {ev.type}
              </span>
              {ev.online && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <Video className="w-3.5 h-3.5" /> Virtual Stream
                </span>
              )}
            </div>

            <h3 className="text-lg font-black text-white">{ev.title}</h3>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>{ev.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{ev.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>{ev.attendees} Registered Delegates</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => onOpenPricing && onOpenPricing('student')}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs rounded-xl hover:opacity-90 transition flex items-center gap-1.5"
              >
                <Ticket className="w-4 h-4" />
                <span>Get VIP Delegate Pass</span>
              </button>
              <span className="text-[11px] text-slate-400">Free with Student Plan</span>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionBanner userPlan={userPlan} onOpenPricing={onOpenPricing} compact />
    </div>
  );
};
