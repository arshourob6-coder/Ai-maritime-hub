import React, { useState } from 'react';
import { ViewMode } from '../types';
import { Ship, Mail, CheckCircle2, ShieldCheck, ExternalLink, Globe } from 'lucide-react';

interface FooterProps {
  setView: (view: ViewMode) => void;
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setView, isDarkMode = true }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
      } catch (err) {
        // Continue fallback
      }
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={`border-t transition-colors duration-300 relative z-10 ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-800 text-slate-300' 
        : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Ship className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                AI MARITIME <span className="text-sky-400">HUB</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The World's First Complete AI Platform for Maritime Professionals, Naval Architects, Marine Engineers, Port Operators, and Researchers.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-sky-300 mb-2">Subscribe to Weekly Maritime AI Intelligence</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed! Check your inbox for free template downloads.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter professional email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-sky-500 w-full"
                  />
                  <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1 shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* AI Tools & Modules */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">AI Platforms</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView('ai_chat')} className="hover:text-sky-400 transition">
                  AI Maritime Chatbot
                </button>
              </li>
              <li>
                <button onClick={() => setView('prompt_library')} className="hover:text-sky-400 transition text-amber-300 font-semibold flex items-center gap-1">
                  Prompt Library (Verified)
                </button>
              </li>
              <li>
                <button onClick={() => setView('newsletter')} className="hover:text-sky-400 transition text-emerald-400 font-semibold flex items-center gap-1">
                  Weekly Newsletter Hub
                </button>
              </li>
              <li>
                <button onClick={() => setView('thesis_gen')} className="hover:text-sky-400 transition">
                  AI Thesis Generator
                </button>
              </li>
              <li>
                <button onClick={() => setView('calculators')} className="hover:text-sky-400 transition">
                  Hydrostatics & Resistance AI
                </button>
              </li>
              <li>
                <button onClick={() => setView('calculators')} className="hover:text-sky-400 transition">
                  HKC IHM HazMat Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setView('calculators')} className="hover:text-sky-400 transition">
                  SOLAS & MARPOL Auditor
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Marketplace */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setView('learning')} className="hover:text-sky-400 transition">
                  Maritime Courses
                </button>
              </li>
              <li>
                <button onClick={() => setView('marketplace')} className="hover:text-sky-400 transition">
                  Digital Product Shop
                </button>
              </li>
              <li>
                <button onClick={() => setView('jobs')} className="hover:text-sky-400 transition">
                  Job & Internship Board
                </button>
              </li>
              <li>
                <button onClick={() => setView('affiliate')} className="hover:text-sky-400 transition">
                  Affiliate Program (10%)
                </button>
              </li>
              <li>
                <button onClick={() => setView('seo')} className="hover:text-sky-400 transition">
                  SEO Articles & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Payment Gateways & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Global Payments</h4>
            <p className="text-[11px] text-slate-400 mb-2">
              Supports global and regional payment gateways:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Stripe', 'PayPal', 'Paddle', 'LemonSqueezy', 'SSLCommerz', 'bKash', 'Nagad', 'Apple Pay', 'Google Pay'].map((gw) => (
                <span
                  key={gw}
                  className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-medium text-slate-300 border border-slate-700"
                >
                  {gw}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SSL Encrypted & IMO Compliant Architecture</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © 2026 AI Maritime Hub. All rights reserved. Class Society Rule Compliant.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setView('seo')} className="hover:text-slate-300 transition">
              SOLAS 2026 Guide
            </button>
            <button onClick={() => setView('seo')} className="hover:text-slate-300 transition">
              MARPOL Annex VI
            </button>
            <button onClick={() => setView('seo')} className="hover:text-slate-300 transition">
              HKC Ship Recycling
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
