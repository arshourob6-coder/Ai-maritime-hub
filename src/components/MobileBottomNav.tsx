import React, { useState } from 'react';
import { ViewMode } from '../types';
import {
  Globe,
  Bot,
  Calculator,
  Compass,
  LayoutDashboard,
  Menu,
  X,
  BookOpen,
  GraduationCap,
  Store,
  Briefcase,
  Users,
  Search,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface MobileBottomNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenSearch: () => void;
  onOpenPricing: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenPricing
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const primaryTabs = [
    { id: 'home', label: 'Home', view: 'landing' as ViewMode, icon: <Globe className="w-5 h-5" /> },
    { id: 'ai_copilot', label: 'AI Copilot', view: 'ai_copilot' as ViewMode, icon: <Bot className="w-5 h-5" /> },
    { id: 'engineering_tools', label: 'Tools', view: 'engineering_tools' as ViewMode, icon: <Calculator className="w-5 h-5" /> },
    { id: 'simulation_center', label: 'Sims', view: 'simulation_center' as ViewMode, icon: <Compass className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', view: 'dashboard' as ViewMode, icon: <LayoutDashboard className="w-5 h-5" /> }
  ];

  const all11Hubs = [
    { id: 'home', label: 'Home Hub', desc: 'News, featured tools & research', view: 'landing' as ViewMode, icon: <Globe className="w-5 h-5 text-sky-400" /> },
    { id: 'ai_copilot', label: 'AI Copilot Suite', desc: 'Chat, agents & report generator', view: 'ai_copilot' as ViewMode, icon: <Bot className="w-5 h-5 text-cyan-400" /> },
    { id: 'engineering_tools', label: 'Engineering Tools', desc: 'Ship design, hydrostatics & CFD', view: 'engineering_tools' as ViewMode, icon: <Calculator className="w-5 h-5 text-indigo-400" /> },
    { id: 'simulation_center', label: 'Simulation Center', desc: 'Bridge, engine & dynamic 3D sims', view: 'simulation_center' as ViewMode, icon: <Compass className="w-5 h-5 text-emerald-400" /> },
    { id: 'knowledge_hub', label: 'Knowledge Hub', desc: 'Digital library, IMO & Class rules', view: 'knowledge_hub' as ViewMode, icon: <BookOpen className="w-5 h-5 text-amber-400" /> },
    { id: 'learning_academy', label: 'Learning Academy', desc: 'Courses, certs & AI tutor', view: 'learning_academy' as ViewMode, icon: <GraduationCap className="w-5 h-5 text-purple-400" /> },
    { id: 'research_lab', label: 'Research Lab', desc: 'Literature review & thesis assistant', view: 'research_lab' as ViewMode, icon: <Sparkles className="w-5 h-5 text-pink-400" /> },
    { id: 'marketplace', label: 'Marketplace', desc: 'AI tools, CAD files & templates', view: 'marketplace' as ViewMode, icon: <Store className="w-5 h-5 text-teal-400" /> },
    { id: 'maritime_industry', label: 'Maritime Industry', desc: 'Jobs, shipyards, ports & BDI', view: 'maritime_industry' as ViewMode, icon: <Briefcase className="w-5 h-5 text-blue-400" /> },
    { id: 'community', label: 'Community', desc: 'Forums, peer review & events', view: 'community' as ViewMode, icon: <Users className="w-5 h-5 text-lime-400" /> },
    { id: 'dashboard', label: 'User Dashboard', desc: 'Workspace, projects & token telemetry', view: 'dashboard' as ViewMode, icon: <LayoutDashboard className="w-5 h-5 text-rose-400" /> }
  ];

  const handleSelect = (view: ViewMode) => {
    onNavigate(view);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Fixed Bar (Only on small screens) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg px-2 py-1.5 shadow-2xl safe-area-inset-bottom">
        <div className="flex items-center justify-around">
          {primaryTabs.map((tab) => {
            const isActive = currentView === tab.view || (tab.id === 'home' && currentView === 'landing');
            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.view)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-h-[44px] min-w-[50px] ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-400' : ''}`}>
                  {tab.icon}
                </div>
                <span className="text-[10px] mt-0.5">{tab.label}</span>
              </button>
            );
          })}

          {/* More Hubs Drawer Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 text-slate-400 hover:text-white rounded-xl min-h-[44px] min-w-[50px]"
          >
            <div className="p-1 rounded-lg">
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">All 11</span>
          </button>
        </div>
      </nav>

      {/* Full 11-Hub Mobile Slide-up Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-md flex flex-col justify-end">
          <div className="bg-slate-900 border-t border-slate-700 rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">All 11 Maritime Hubs</h3>
                <p className="text-xs text-slate-400">Discover full platform architecture</p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hubs Grid in Drawer */}
            <div className="grid grid-cols-1 gap-2.5 mt-4">
              {all11Hubs.map((hub) => (
                <div
                  key={hub.id}
                  onClick={() => handleSelect(hub.view)}
                  className="flex items-center justify-between p-3 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      {hub.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{hub.label}</h4>
                      <p className="text-xs text-slate-400">{hub.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              ))}
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                <Search className="w-4 h-4 text-cyan-400" />
                Search (Ctrl+K)
              </button>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenPricing();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-semibold"
              >
                <Sparkles className="w-4 h-4" />
                SaaS Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
