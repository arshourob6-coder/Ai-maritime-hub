import React, { useState, useEffect, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';
import { ViewMode } from '../types';
import { GlobalSearchItem, buildGlobalSearchIndex } from '../data/globalSearchIndex';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Bot,
  Calculator,
  Compass,
  History,
  BookOpen,
  GraduationCap,
  Store,
  Briefcase,
  CornerDownLeft,
  Command,
  Zap
} from 'lucide-react';

interface NavbarGlobalSearchBarProps {
  onNavigateView: (view: ViewMode) => void;
  onSelectPromptForChat?: (promptText: string) => void;
  isDarkMode: boolean;
  onOpenModal: () => void;
}

export const NavbarGlobalSearchBar: React.FC<NavbarGlobalSearchBarProps> = ({
  onNavigateView,
  onSelectPromptForChat,
  isDarkMode,
  onOpenModal,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'section' | 'calculator' | 'prompt' | 'course'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ai_maritime_recent_searches');
      return saved ? JSON.parse(saved) : ['Smart Shipyard', 'Hydrostatics', 'Autonomous MASS', 'SOLAS 2026'];
    } catch {
      return ['Smart Shipyard', 'Hydrostatics', 'Autonomous MASS', 'SOLAS 2026'];
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize search index
  const allItems = useMemo(() => buildGlobalSearchIndex(), []);

  // Fuse.js search setup
  const fuse = useMemo(() => {
    return new Fuse(allItems, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'subtitle', weight: 0.25 },
        { name: 'description', weight: 0.2 },
        { name: 'tags', weight: 0.15 },
      ],
      threshold: 0.38,
      distance: 100,
      minMatchCharLength: 1,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [allItems]);

  // Compute live search results
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 8);
    }
    const rawResults = fuse.search(query.trim()).map((r) => r.item);
    if (selectedFilter === 'all') return rawResults.slice(0, 10);
    return rawResults.filter((item) => item.type === selectedFilter).slice(0, 10);
  }, [query, fuse, allItems, selectedFilter]);

  // AI Smart Intent Match Logic
  const aiSmartMatch = useMemo(() => {
    if (!query.trim() || query.length < 2) return null;

    const q = query.toLowerCase();

    if (q.includes('weld') || q.includes('shipyard') || q.includes('hull scan') || q.includes('fabricat')) {
      const item = allItems.find((i) => i.targetView === 'smart_shipyard');
      if (item) return { item, reason: 'AI detected shipyard fabrication & 3D laser scanning intent' };
    }
    if (q.includes('rov') || q.includes('subsea') || q.includes('underwater') || q.includes('robot')) {
      const item = allItems.find((i) => i.targetView === 'marine_robotics_center');
      if (item) return { item, reason: 'AI detected subsea inspection & ROV swarm robotics intent' };
    }
    if (q.includes('mass') || q.includes('autonomous') || q.includes('lidar') || q.includes('unmanned')) {
      const item = allItems.find((i) => i.targetView === 'autonomous_vessel_hub');
      if (item) return { item, reason: 'AI detected autonomous shipping & COLREGs evasion intent' };
    }
    if (q.includes('hydrostatic') || q.includes('displacement') || q.includes('gz curve') || q.includes('metacentr')) {
      const item = allItems.find((i) => i.id === 'calc-hydrostatics' || i.id === 'calc-stability');
      if (item) return { item, reason: 'AI detected naval architecture stability & hydrostatics calculation' };
    }
    if (q.includes('green') || q.includes('esg') || q.includes('poseidon') || q.includes('taxonom')) {
      const item = allItems.find((i) => i.targetView === 'maritime_investment_platform');
      if (item) return { item, reason: 'AI detected green shipping investment & ESG decarbonization finance' };
    }
    if (q.includes('metaverse') || q.includes('vr bridge') || q.includes('expo') || q.includes('3d campus')) {
      const item = allItems.find((i) => i.targetView === 'maritime_metaverse');
      if (item) return { item, reason: 'AI detected WebGL 3D metaverse & virtual bridge training' };
    }
    if (q.includes('spare') || q.includes('impa') || q.includes('valve') || q.includes('part')) {
      const item = allItems.find((i) => i.targetView === 'maritime_commerce');
      if (item) return { item, reason: 'AI detected B2B marine machinery & spare parts procurement' };
    }
    if (q.includes('bdi') || q.includes('baltic') || q.includes('freight rate') || q.includes('charter')) {
      const item = allItems.find((i) => i.targetView === 'ai_business_intelligence');
      if (item) return { item, reason: 'AI detected C-Suite executive shipping market intelligence' };
    }

    // Default top result if score is strong
    if (searchResults.length > 0) {
      return { item: searchResults[0], reason: `AI best matched module for "${query}"` };
    }

    return null;
  }, [query, allItems, searchResults]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation inside inline search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey && query.trim()) {
        // Run as direct prompt in AI Chat
        if (onSelectPromptForChat) {
          onSelectPromptForChat(query);
        }
        onNavigateView('ai_chat');
        setIsOpen(false);
        setQuery('');
        return;
      }

      if (aiSmartMatch && selectedIndex === 0) {
        handleSelectItem(aiSmartMatch.item);
      } else if (searchResults[selectedIndex]) {
        handleSelectItem(searchResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectItem = (item: GlobalSearchItem) => {
    saveRecentSearch(item.title);
    if (item.type === 'prompt' && item.actionPayload) {
      if (onSelectPromptForChat) {
        onSelectPromptForChat(item.actionPayload);
      }
      onNavigateView('ai_chat');
    } else {
      onNavigateView(item.targetView);
    }
    setIsOpen(false);
    setQuery('');
  };

  const saveRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem('ai_maritime_recent_searches', JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save recent search:', err);
    }
  };

  const getItemIcon = (type: GlobalSearchItem['type']) => {
    switch (type) {
      case 'calculator':
        return <Calculator className="w-3.5 h-3.5 text-sky-400" />;
      case 'blog':
        return <BookOpen className="w-3.5 h-3.5 text-cyan-400" />;
      case 'course':
        return <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />;
      case 'prompt':
        return <Bot className="w-3.5 h-3.5 text-amber-400" />;
      case 'marketplace':
        return <Store className="w-3.5 h-3.5 text-purple-400" />;
      case 'job':
        return <Briefcase className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-teal-400" />;
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md hidden md:block select-none">
      {/* Search Input Box */}
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-200 ${
          isOpen
            ? 'bg-slate-900 border-sky-500/80 shadow-lg shadow-sky-500/10 ring-2 ring-sky-500/20'
            : isDarkMode
            ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
            : 'bg-slate-100 border-slate-300 hover:border-slate-400'
        }`}
      >
        <Search className="w-4 h-4 text-sky-400 ml-3 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="AI Search 225+ modules, tools, formulas..."
          className={`w-full py-1.5 pl-2 pr-16 text-xs bg-transparent focus:outline-none transition-colors ${
            isDarkMode ? 'text-white placeholder-slate-400' : 'text-slate-900 placeholder-slate-500'
          }`}
        />

        {query ? (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="p-1 mr-1 text-slate-400 hover:text-white rounded-md transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="absolute right-2 flex items-center gap-1 pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-slate-800 text-sky-400 border border-slate-700/80 flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </div>
        )}
      </div>

      {/* Floating Suggestions & AI Index Dropdown */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 mt-2 w-full rounded-2xl border shadow-2xl overflow-hidden z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150 ${
            isDarkMode ? 'bg-slate-950/95 border-slate-800 text-white backdrop-blur-2xl' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
          }`}
        >
          {/* Top AI Header / Filter Tabs */}
          <div className="p-2 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-1 overflow-x-auto">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-extrabold uppercase text-sky-400 tracking-wider px-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400" /> AI Index
              </span>
              {[
                { id: 'all', label: 'All (225+)' },
                { id: 'section', label: 'Modules' },
                { id: 'calculator', label: 'Calculators' },
                { id: 'prompt', label: 'AI Prompts' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition ${
                    selectedFilter === tab.id
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenModal();
              }}
              className="text-[10px] font-bold text-sky-400 hover:underline flex items-center gap-1 shrink-0 px-1"
            >
              Full Search <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Recent Searches (when query is empty) */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="p-2 border-b border-slate-800/50 bg-slate-900/30">
              <div className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                <History className="w-3 h-3 text-slate-400" /> Recent Searches
              </div>
              <div className="flex flex-wrap gap-1">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 text-slate-300 text-[10px] font-medium border border-slate-700/60 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Smart Intent Match Banner */}
          {aiSmartMatch && (
            <div
              onClick={() => handleSelectItem(aiSmartMatch.item)}
              className="p-2.5 mx-2 my-1.5 rounded-xl bg-gradient-to-r from-sky-950/80 via-indigo-950/80 to-blue-950/80 border border-sky-500/40 hover:border-sky-400 cursor-pointer transition group shadow-md"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-300 animate-pulse" /> AI Smart Match
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-sky-300 transition flex items-center gap-1">
                  Click to open <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <div className="font-bold text-xs text-white group-hover:text-sky-300 transition">
                {aiSmartMatch.item.title}
              </div>
              <div className="text-[11px] text-sky-200/80 line-clamp-1 mt-0.5">
                {aiSmartMatch.reason}
              </div>
            </div>
          )}

          {/* Main Search Results List */}
          <div className="max-h-72 overflow-y-auto p-1.5 space-y-1 divide-y divide-slate-800/40">
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <div
                    key={`${item.id}_${index}`}
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-2 rounded-xl cursor-pointer transition flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-sky-500/15 border border-sky-500/30 text-white'
                        : 'hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                      {getItemIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-white truncate">{item.title}</span>
                        {item.badgeText && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
                            {item.badgeText}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center space-y-2">
                <p className="text-xs text-slate-400">No exact module matches found for "{query}"</p>
                {query.trim() && (
                  <button
                    onClick={() => {
                      if (onSelectPromptForChat) {
                        onSelectPromptForChat(query);
                      }
                      onNavigateView('ai_chat');
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
                  >
                    <Bot className="w-3.5 h-3.5" /> Ask AI Assistant in Chat <CornerDownLeft className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-2 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-[10px] text-slate-400 px-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 bg-slate-800 rounded border border-slate-700">↵</kbd> Navigate
              <span className="ml-2">
                <kbd className="px-1 bg-slate-800 rounded border border-slate-700">Shift+↵</kbd> AI Chat
              </span>
            </span>
            <span className="font-bold text-sky-400">225 Maritime Modules Indexed</span>
          </div>
        </div>
      )}
    </div>
  );
};
