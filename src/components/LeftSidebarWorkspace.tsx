import React, { useState } from 'react';
import { ViewMode, PlanType, UserRole } from '../types';
import {
  LayoutDashboard,
  FolderGit2,
  Bot,
  Bookmark,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Ship,
  Calculator,
  Compass,
  BookOpen,
  GraduationCap,
  Store,
  Briefcase,
  Users,
  ShieldAlert,
  Flame,
  Activity,
  Layers,
  HelpCircle,
  LogOut,
  Sliders,
  UserCheck,
  FileText
} from 'lucide-react';

interface LeftSidebarWorkspaceProps {
  isOpen: boolean;
  onToggle: () => void;
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  userPlan: PlanType;
  userRole?: UserRole;
  onOpenPricing: () => void;
  onOpenAuthModal?: () => void;
  onOpenSettings?: () => void;
}

export const LeftSidebarWorkspace: React.FC<LeftSidebarWorkspaceProps> = ({
  isOpen,
  onToggle,
  currentView,
  onNavigate,
  userPlan,
  userRole = 'Professional',
  onOpenPricing,
  onOpenAuthModal,
  onOpenSettings
}) => {
  const [pinnedSection, setPinnedSection] = useState<'workspace' | 'hubs'>('workspace');

  // Main Workspace Menu Items
  const workspaceItems = [
    { id: 'dashboard', label: 'Overview & Workspace', view: 'dashboard' as ViewMode, icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'regulatory_hub', label: 'IMO & Class Regulatory Hub', view: 'regulatory_hub' as ViewMode, icon: <ShieldAlert className="w-4 h-4 text-emerald-400" /> },
    { id: 'doc_converter', label: 'Document Converter & Hub', view: 'document_hub' as ViewMode, icon: <FileText className="w-4 h-4 text-cyan-400" /> },
    { id: 'projects', label: 'My Projects (6 Active)', view: 'collaboration_ws' as ViewMode, icon: <FolderGit2 className="w-4 h-4 text-sky-400" /> },
    { id: 'agents', label: 'My AI Agents & Custom Bots', view: 'ai_assistant_builder' as ViewMode, icon: <Bot className="w-4 h-4 text-cyan-400" /> },
    { id: 'resources', label: 'Saved Resources & Bookmarks', view: 'maritime_digital_library' as ViewMode, icon: <Bookmark className="w-4 h-4 text-amber-400" /> },
    { id: 'billing', label: 'Billing & Subscriptions', view: 'saas_billing' as ViewMode, icon: <CreditCard className="w-4 h-4 text-emerald-400" /> },
    { id: 'settings', label: 'Settings & Security', view: 'admin' as ViewMode, icon: <Settings className="w-4 h-4 text-slate-400" /> }
  ];

  // 11 Core Navigation Hubs for quick access
  const coreHubs = [
    { id: 'home', label: 'Home Hub', view: 'landing' as ViewMode, icon: <Ship className="w-4 h-4 text-sky-400" /> },
    { id: 'doc_converter', label: 'Document Processing Hub', view: 'document_hub' as ViewMode, icon: <FileText className="w-4 h-4 text-emerald-400" /> },
    { id: 'ai_copilot', label: 'AI Copilot Suite', view: 'ai_copilot' as ViewMode, icon: <Bot className="w-4 h-4 text-cyan-400" /> },
    { id: 'engineering_tools', label: 'Engineering Tools', view: 'engineering_tools' as ViewMode, icon: <Calculator className="w-4 h-4 text-indigo-400" /> },
    { id: 'simulation_center', label: 'Simulation Center', view: 'simulation_center' as ViewMode, icon: <Compass className="w-4 h-4 text-emerald-400" /> },
    { id: 'knowledge_hub', label: 'Knowledge Hub', view: 'knowledge_hub' as ViewMode, icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
    { id: 'learning_academy', label: 'Learning Academy', view: 'learning_academy' as ViewMode, icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
    { id: 'research_lab', label: 'Research Lab', view: 'research_lab' as ViewMode, icon: <Activity className="w-4 h-4 text-pink-400" /> },
    { id: 'marketplace', label: 'Marketplace', view: 'marketplace' as ViewMode, icon: <Store className="w-4 h-4 text-teal-400" /> },
    { id: 'maritime_industry', label: 'Maritime Industry', view: 'maritime_industry' as ViewMode, icon: <Briefcase className="w-4 h-4 text-blue-400" /> },
    { id: 'community', label: 'Community', view: 'community' as ViewMode, icon: <Users className="w-4 h-4 text-lime-400" /> },
    { id: 'dashboard', label: 'User Dashboard', view: 'dashboard' as ViewMode, icon: <LayoutDashboard className="w-4 h-4 text-rose-400" /> }
  ];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        title="Open Workspace Sidebar"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-r-xl text-slate-300 hover:text-cyan-400 shadow-xl transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    );
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-slate-950/95 border-r border-slate-800/90 backdrop-blur-xl flex flex-col justify-between shadow-2xl transition-all">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400">
              <Ship className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-tight text-white block">Workspace OS</span>
              <span className="text-[10px] text-cyan-400 font-mono">Role: {userRole}</span>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs Switcher */}
        <div className="flex items-center p-2 gap-1 border-b border-slate-800/80 bg-slate-900/40">
          <button
            onClick={() => setPinnedSection('workspace')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg text-center transition-all ${
              pinnedSection === 'workspace'
                ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Workspace
          </button>
          <button
            onClick={() => setPinnedSection('hubs')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg text-center transition-all ${
              pinnedSection === 'hubs'
                ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            11 Hubs
          </button>
        </div>

        {/* Navigation List */}
        <div className="p-2 space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto">
          {pinnedSection === 'workspace' ? (
            workspaceItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.view)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-inner font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })
          ) : (
            coreHubs.map((hub) => {
              const isActive = currentView === hub.view;
              return (
                <button
                  key={hub.id}
                  onClick={() => onNavigate(hub.view)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-inner font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{hub.icon}</span>
                  <span className="truncate">{hub.label}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom Token Quota & Subscription Widget */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              AI Token Quota
            </span>
            <span className="text-cyan-400 font-mono text-[11px] font-semibold">1.8M / 2.5M</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[72%]" />
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
            <span className="text-slate-400 uppercase font-mono font-medium">{userPlan} Plan</span>
            <button
              onClick={onOpenPricing}
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline"
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* User Quick Switch Account Profile button */}
        {onOpenAuthModal && (
          <button
            onClick={onOpenAuthModal}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs text-slate-300 hover:text-white transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Manage 2FA & Roles</span>
          </button>
        )}
      </div>
    </aside>
  );
};
