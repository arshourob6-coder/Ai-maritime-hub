import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, PlanType, Currency } from '../types';
import { useLanguage, MARITIME_LANGUAGES } from '../lib/i18n';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NavbarGlobalSearchBar } from './NavbarGlobalSearchBar';
import { LanguageAccessibilityModal } from './LanguageAccessibilityModal';
import { AllModulesCatalogModal } from './AllModulesCatalogModal';
import { PRIMARY_NAVIGATION_HUBS, NavHub, NavGroup, NavItem } from '../data/navigationHubs';
import {
  Ship,
  Bot,
  Calculator,
  GraduationCap,
  Store,
  Briefcase,
  Users,
  LayoutDashboard,
  ShieldAlert,
  Moon,
  Sun,
  Menu,
  X,
  Compass,
  DollarSign,
  FileCode2,
  Sparkles,
  BookMarked,
  Mail,
  BookOpen,
  Search,
  Globe,
  FileSpreadsheet,
  CheckCircle2,
  Award,
  Bell,
  Newspaper,
  FileText,
  LayoutGrid,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userPlan: PlanType;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenPricing: () => void;
  onOpenAuthModal?: () => void;
  onSelectPromptForChat?: (promptText: string) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setView,
  isDarkMode,
  toggleDarkMode,
  userPlan,
  currency,
  setCurrency,
  onOpenPricing,
  onOpenAuthModal,
  onSelectPromptForChat,
  isLoggedIn = false,
  onLogout,
  onToggleSidebar,
}) => {
  const { currentLanguage, setLanguage, languageInfo, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Global shortcut to open search modal (Cmd/Ctrl + K or /)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName) &&
        !(e.target as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-950/90 border-slate-800/80 text-white' 
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        
        {/* Left: Sidebar Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl border transition hidden md:flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 hover:bg-slate-800' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-sky-600 hover:bg-slate-200'
              }`}
              title="Toggle Workspace Sidebar (Navigation & Telemetry)"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          <div 
            onClick={() => setView('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Ship className="w-4.5 h-4.5 text-sky-400 group-hover:rotate-6 transition" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  AI MARITIME
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  HUB
                </span>
              </div>
              <p className="text-[9px] text-slate-400 -mt-0.5 font-medium hidden sm:block">
                Global Maritime OS & AI Copilot Pro
              </p>
            </div>
          </div>
        </div>

        {/* Center: Desktop Categorized Dropdown System */}
        <nav className="hidden xl:flex items-center gap-1 relative py-1">
          {/* All Modules Catalog Button */}
          <button
            onClick={() => {
              setCatalogModalOpen(true);
              setActiveDropdown(null);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 transition shadow-sm mr-1 shrink-0"
            title="Open Complete 90+ Maritime Modules Catalog"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Modules</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/25 text-sky-300 font-black">
              90+
            </span>
          </button>

          {/* 8 Primary Categorized Hub Dropdowns */}
          {PRIMARY_NAVIGATION_HUBS.map((hub, hubIdx) => {
            const isOpen = activeDropdown === hub.id;
            const isCategoryActive =
              currentView === hub.view ||
              hub.groups.some((group) => group.items.some((item) => item.id === currentView));

            // Align dropdown to the right for later items to prevent screen overflow
            const isRightAligned = hubIdx >= 4;

            return (
              <div
                key={hub.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(hub.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => {
                    setView(hub.view);
                    setActiveDropdown(null);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    isCategoryActive
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm'
                      : isOpen
                      ? 'bg-slate-800 text-white'
                      : isDarkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {hub.icon}
                  <span>{hub.title}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 opacity-60 ${isOpen ? 'rotate-180 text-sky-400 opacity-100' : ''}`} />
                </button>

                {/* Floating Categorized Mega-Dropdown Menu */}
                {isOpen && (
                  <div
                    className={`absolute top-full pt-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                      isRightAligned ? 'right-0' : 'left-0'
                    }`}
                    style={{ width: '640px' }}
                  >
                    <div className="bg-slate-950/98 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-3.5 text-xs space-y-3">
                      {/* Dropdown Header */}
                      <div className="px-2 pb-2.5 border-b border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                            {hub.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-white text-xs tracking-tight">
                                {hub.title} Hub
                              </span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                                {hub.groups.reduce((acc, g) => acc + g.items.length, 0)} Modules
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 line-clamp-1">
                              {hub.tagline}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setView(hub.view);
                            setActiveDropdown(null);
                          }}
                          className="text-[10px] bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 shrink-0"
                        >
                          <span>Open Entire Hub</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* 2-Column Grouped Modules Grid */}
                      <div className="grid grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                        {hub.groups.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-1.5 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/60">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400/90 px-1 flex items-center justify-between">
                              <span>{group.groupTitle}</span>
                              <span className="text-slate-500 font-mono text-[9px]">{group.items.length}</span>
                            </div>

                            <div className="space-y-0.5">
                              {group.items.map((item) => {
                                const isActive = currentView === item.id;
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setView(item.id);
                                      setActiveDropdown(null);
                                    }}
                                    className={`w-full text-left p-1.5 rounded-lg transition flex items-start gap-2 ${
                                      isActive
                                        ? 'bg-sky-500/25 text-sky-300 border border-sky-500/40 shadow-sm'
                                        : 'hover:bg-slate-800/90 text-slate-200 border border-transparent'
                                    }`}
                                  >
                                    <div className="p-1 rounded-md bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                                      {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="font-bold text-xs truncate">
                                          {item.label}
                                        </span>
                                        {item.badge && (
                                          <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                                        {item.desc}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Dropdown Bottom Banner */}
                      <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 px-1">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-sky-400" />
                          <span>IMO, DNV & Lloyd's Register Certified Modules</span>
                        </span>
                        <button
                          onClick={() => {
                            setCatalogModalOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="text-sky-400 hover:text-sky-300 font-bold transition"
                        >
                          View All 90+ Modules →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Controls & Quick Actions */}
        <div className="flex items-center gap-2">
          
          {/* AI Copilot Highlighted Quick Action */}
          <button
            onClick={() => setView('ai_chat')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/20 via-cyan-500/20 to-blue-500/20 hover:from-sky-500/30 hover:to-blue-500/30 border border-sky-400/40 text-sky-300 text-xs font-bold transition shadow-sm"
            title="Open AI Maritime Copilot Pro (Multi-Model Naval Architecture Assistant)"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden lg:inline">AI Copilot Pro</span>
          </button>

          {/* Global Search Bar in Navbar */}
          <NavbarGlobalSearchBar
            onNavigateView={setView}
            onSelectPromptForChat={onSelectPromptForChat}
            isDarkMode={isDarkMode}
            onOpenModal={() => setSearchOpen(true)}
          />

          {/* Search Trigger Shortcut Button (Ctrl+K) */}
          <button
            onClick={() => setSearchOpen(true)}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-sky-300 hover:border-sky-500/40'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Search Platform (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-sky-400" />
            <kbd className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1 py-0.5 rounded border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`p-2 rounded-xl border transition relative ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Notifications Center"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 text-xs space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-sky-400" />
                    Maritime Alerts
                  </span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-mono font-bold">
                    3 New
                  </span>
                </div>
                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  <div 
                    onClick={() => { setView('environmental_hub'); setNotificationsOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sky-300 text-[11px]">IMO MEPC 82 Rule Update</span>
                      <span className="text-[9px] text-slate-500">10m ago</span>
                    </div>
                    <p className="text-[10px] text-slate-400">New CII carbon intensity calculation guidelines effective from Q1 2026.</p>
                  </div>
                  <div 
                    onClick={() => { setView('ai_chat'); setNotificationsOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-300 text-[11px]">CFD Mesh Ready</span>
                      <span className="text-[9px] text-slate-500">1h ago</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Hull hydrodynamics mesh calculation completed with 0.02% error margin.</p>
                  </div>
                  <div 
                    onClick={() => { setView('certifications'); setNotificationsOpen(false); }}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-300 text-[11px]">CPD Certificate Issued</span>
                      <span className="text-[9px] text-slate-500">4h ago</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Your Naval Architecture Hydrostatics certification is ready to download.</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 text-center">
                  <button 
                    onClick={() => { setView('dashboard'); setNotificationsOpen(false); }}
                    className="text-[10px] font-bold text-sky-400 hover:text-sky-300 transition"
                  >
                    View All in Dashboard →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Language Selector Dropdown */}
          <div className="hidden lg:flex items-center gap-1">
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value)}
              className={`text-xs font-bold rounded-xl px-2 py-1.5 border transition cursor-pointer ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-sky-400 hover:border-sky-500/50'
                  : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
              title="Toggle App Language"
            >
              {MARITIME_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>

            <button
              onClick={() => setLangModalOpen(true)}
              className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-semibold ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-sky-400 hover:border-sky-500/50 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title="50+ Languages & WCAG Accessibility"
            >
              <Globe className="w-4 h-4 text-sky-400" />
            </button>
          </div>

          {/* Currency Dropdown */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className={`hidden xl:block text-xs font-semibold rounded-xl px-2 py-1.5 border transition cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-slate-700 text-sky-300 hover:border-sky-500/50'
                : 'bg-slate-100 border-slate-300 text-slate-800'
            }`}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="NOK">NOK (kr)</option>
            <option value="SGD">SGD ($)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="JPY">JPY (¥)</option>
          </select>

          {/* Subscription Plan Badge / Upgrade Trigger */}
          <button
            onClick={onOpenPricing}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
              userPlan === 'enterprise'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                : userPlan === 'professional'
                ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white'
                : userPlan === 'student'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span className="capitalize">{userPlan}</span>
          </button>

          {/* Account & SSO Auth Trigger */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-700"
                title="Sign In"
              >
                Sign In
              </button>
              <button
                onClick={onOpenAuthModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 transition shadow-md shadow-sky-500/20"
                title="Create Account"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/30 transition"
                title="Open User Dashboard"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 text-slate-950 font-black text-[10px] flex items-center justify-center">
                  NA
                </div>
                <span className="hidden md:inline">Dashboard</span>
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition hidden sm:block"
                  title="Sign Out"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-xl border transition ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`xl:hidden border-b px-4 py-3 space-y-2 transition-all max-h-[80vh] overflow-y-auto ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Quick Action Buttons in Mobile Drawer */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => {
                setCatalogModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30"
            >
              <LayoutGrid className="w-4 h-4 text-sky-400" />
              <span>All 90+ Modules</span>
            </button>
            <button
              onClick={() => {
                setSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Global Search</span>
            </button>
          </div>

          {/* Instant Live Filter Input */}
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              placeholder="Instant filter modules (e.g. Hull, AIS, SOLAS)..."
              className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs border outline-none ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-sky-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-sky-500'
              }`}
            />
            {mobileSearchQuery && (
              <button
                onClick={() => setMobileSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* If Search Query Active: Show Matching Results */}
          {mobileSearchQuery.trim() ? (
            <div className="space-y-1 pt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Matching Modules
              </div>
              {PRIMARY_NAVIGATION_HUBS.flatMap((hub) =>
                hub.groups.flatMap((g) =>
                  g.items.map((item) => ({ ...item, hubTitle: hub.title }))
                )
              )
                .filter(
                  (item) =>
                    item.label.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
                    item.desc.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
                    item.hubTitle.toLowerCase().includes(mobileSearchQuery.toLowerCase())
                )
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id);
                      setMobileMenuOpen(false);
                      setMobileSearchQuery('');
                    }}
                    className="w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center justify-between transition hover:bg-slate-800 text-slate-200 border border-slate-800/80"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-slate-900 border border-slate-800">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold">{item.label}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</div>
                      </div>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
            </div>
          ) : (
            <>
              {/* Home Option */}
              <button
                onClick={() => {
                  setView('landing');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold ${
                  currentView === 'landing'
                    ? 'bg-sky-500/20 text-sky-400'
                    : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Ship className="w-4 h-4 text-sky-400" />
                <span>Home Platform Overview</span>
              </button>

              {/* Categorized Dropdown Accordions for Mobile */}
              {PRIMARY_NAVIGATION_HUBS.map((hub) => {
                const isCategoryActive =
                  currentView === hub.view ||
                  hub.groups.some((group) => group.items.some((item) => item.id === currentView));
                const isExpanded = activeDropdown === `mobile_${hub.id}`;
                const totalCount = hub.groups.reduce((acc, g) => acc + g.items.length, 0);

                return (
                  <div key={hub.id} className="space-y-1">
                    <button
                      onClick={() => setActiveDropdown(isExpanded ? null : `mobile_${hub.id}`)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition ${
                        isCategoryActive
                          ? 'bg-sky-500/15 text-sky-400'
                          : isDarkMode
                          ? 'text-slate-300 hover:bg-slate-900'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {hub.icon}
                        <span>{hub.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-bold">
                          {totalCount}
                        </span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform opacity-60 ${isExpanded ? 'rotate-180 text-sky-400 opacity-100' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="pl-3 space-y-3 py-2 border-l-2 border-sky-500/30 ml-3">
                        <button
                          onClick={() => {
                            setView(hub.view);
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-left p-1.5 rounded-lg text-xs font-bold text-sky-400 hover:bg-sky-500/10 flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Open Entire {hub.title} Hub →</span>
                        </button>

                        {hub.groups.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-1 bg-slate-900/40 p-2 rounded-xl border border-slate-800/60">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                              {group.groupTitle}
                            </div>
                            {group.items.map((item) => {
                              const isActive = currentView === item.id;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    setView(item.id);
                                    setMobileMenuOpen(false);
                                  }}
                                  className={`w-full text-left p-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                                    isActive
                                      ? 'bg-sky-500/20 text-sky-300'
                                      : 'text-slate-300 hover:bg-slate-800'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <div className="shrink-0">{item.icon}</div>
                                    <span className="truncate">{item.label}</span>
                                  </div>
                                  {item.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* All Modules Full Catalog Modal */}
      <AllModulesCatalogModal
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
        onNavigateView={(view) => {
          setView(view);
          setCatalogModalOpen(false);
        }}
        isDarkMode={isDarkMode}
      />

      {/* Global Fuzzy Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateView={(view) => {
          setView(view);
          setSearchOpen(false);
        }}
        onSelectPromptForChat={onSelectPromptForChat}
        isDarkMode={isDarkMode}
      />

      {/* 50+ Languages & WCAG Accessibility Modal */}
      <LanguageAccessibilityModal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        isDarkMode={isDarkMode}
      />
    </header>
  );
};
