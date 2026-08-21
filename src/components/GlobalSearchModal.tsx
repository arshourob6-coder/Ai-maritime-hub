import React, { useState, useEffect, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';
import { ViewMode } from '../types';
import {
  GlobalSearchItem,
  buildGlobalSearchIndex,
} from '../data/globalSearchIndex';
import {
  Search,
  X,
  Calculator,
  BookOpen,
  GraduationCap,
  Bot,
  Store,
  Briefcase,
  Compass,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Command,
  CornerDownLeft,
  Flame,
  Tag,
  Zap,
  Filter
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: ViewMode) => void;
  onSelectPromptForChat?: (promptText: string) => void;
  isDarkMode: boolean;
}

type FilterCategory = 'all' | 'calculator' | 'blog' | 'course' | 'prompt' | 'marketplace' | 'job' | 'section';

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  onSelectPromptForChat,
  isDarkMode,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Initialize all searchable items
  const allItems = useMemo(() => buildGlobalSearchIndex(), []);

  // Configure Fuse.js instance
  const fuse = useMemo(() => {
    return new Fuse(allItems, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.25 },
        { name: 'tags', weight: 0.2 },
        { name: 'subtitle', weight: 0.1 },
        { name: 'category', weight: 0.05 },
      ],
      threshold: 0.38,
      distance: 100,
      minMatchCharLength: 2,
      includeMatches: true,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [allItems]);

  // Perform search and filter
  const searchResults = useMemo(() => {
    let results: GlobalSearchItem[] = [];

    if (!query.trim()) {
      // Show default top picks when empty
      results = allItems.slice(0, 12);
    } else {
      const fuseResults = fuse.search(query.trim());
      results = fuseResults.map((r) => r.item);
    }

    if (selectedFilter !== 'all') {
      results = results.filter((item) => item.type === selectedFilter);
    }

    return results;
  }, [query, selectedFilter, fuse, allItems]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset selectedIndex when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedFilter]);

  // Keyboard navigation listener (Ctrl+K to open, Esc to close, Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K or '/' key to open search when not in input
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger parent open handled via Navbar shortcut
        }
        return;
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
      } else if (e.key === 'Enter') {
        if (searchResults.length > 0 && searchResults[selectedIndex]) {
          e.preventDefault();
          handleSelectResult(searchResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, onClose]);

  // Auto scroll focused item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const handleSelectResult = (item: GlobalSearchItem) => {
    if (item.type === 'prompt' && item.actionPayload) {
      if (onSelectPromptForChat) {
        onSelectPromptForChat(item.actionPayload);
      }
      onNavigateView('ai_chat');
    } else {
      onNavigateView(item.targetView);
    }
    onClose();
  };

  const handleCopyPrompt = (e: React.MouseEvent, item: GlobalSearchItem) => {
    e.stopPropagation();
    if (item.actionPayload) {
      navigator.clipboard.writeText(item.actionPayload);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getItemIcon = (type: GlobalSearchItem['type']) => {
    switch (type) {
      case 'calculator':
        return <Calculator className="w-4 h-4 text-sky-400" />;
      case 'blog':
        return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case 'course':
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case 'prompt':
        return <Bot className="w-4 h-4 text-amber-400" />;
      case 'marketplace':
        return <Store className="w-4 h-4 text-purple-400" />;
      case 'job':
        return <Briefcase className="w-4 h-4 text-blue-400" />;
      case 'section':
        return <Compass className="w-4 h-4 text-teal-400" />;
      default:
        return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTypeBadgeClass = (type: GlobalSearchItem['type']) => {
    switch (type) {
      case 'calculator':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      case 'blog':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'course':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'prompt':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'marketplace':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'job':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'section':
        return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  const filterTabs: { id: FilterCategory; label: string; count?: number }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'calculator', label: 'Calculators' },
    { id: 'prompt', label: 'AI Prompts' },
    { id: 'blog', label: 'SEO Blog' },
    { id: 'course', label: 'Courses' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'job', label: 'Jobs' },
    { id: 'section', label: 'Sections' },
  ];

  const popularSearches = [
    'Smart Shipyard #206',
    'Subsea ROV #214',
    'Autonomous MASS #213',
    'Hydrostatics',
    'SOLAS 2026',
    'Green Investment #216',
    'Holtrop Resistance',
    'AI Lab & GPU Notebook',
    'GZ Stability Curve',
    'Metaverse #225'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      {/* Backdrop Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Palette Window */}
      <div className={`relative w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all transform duration-200 ${
        isDarkMode
          ? 'bg-slate-900 border-slate-700/80 text-white shadow-sky-950/40'
          : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}>
        
        {/* Search Input Field Bar */}
        <div className={`p-3.5 sm:p-4 border-b flex items-center gap-3 relative ${
          isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
        }`}>
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across 225+ AI modules, prompts, calculators, blog articles, courses, or jobs..."
            className={`w-full bg-transparent text-sm sm:text-base outline-none font-medium placeholder:text-slate-400 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Clear Query"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] text-slate-300 font-mono">
            <span>ESC</span>
            <span className="text-slate-500">to close</span>
          </div>
        </div>

        {/* Filter Pills Header */}
        <div className={`px-3 py-2 border-b flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none ${
          isDarkMode ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-200 bg-slate-100/60'
        }`}>
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 mr-1" />
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-400 shadow-sm'
                    : isDarkMode
                    ? 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Popular Tags / Quick Suggestions if Query is Empty */}
        {!query && (
          <div className={`px-4 py-2.5 border-b text-xs flex items-center gap-2 overflow-x-auto ${
            isDarkMode ? 'border-slate-800/60 bg-slate-900/50 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}>
            <span className="flex items-center gap-1 text-amber-400 font-bold shrink-0">
              <Flame className="w-3.5 h-3.5" /> Popular:
            </span>
            <div className="flex items-center gap-1.5 flex-nowrap">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-2 py-0.5 rounded-md bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/20 whitespace-nowrap transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700"
        >
          {searchResults.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-sm">No maritime resources found for "{query}"</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try searching for keywords like <span className="text-sky-400">"SOLAS"</span>, <span className="text-sky-400">"Hydrostatics"</span>, <span className="text-sky-400">"GZ Curve"</span>, or <span className="text-sky-400">"CFD"</span>.
                </p>
              </div>
            </div>
          ) : (
            searchResults.map((item, index) => {
              const isFocused = index === selectedIndex;
              return (
                <div
                  key={`${item.id}_${index}`}
                  data-index={index}
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 relative group ${
                    isFocused
                      ? isDarkMode
                        ? 'bg-sky-500/15 border-sky-500/50 text-white shadow-sm'
                        : 'bg-sky-50 border-sky-300 text-slate-900 shadow-sm'
                      : isDarkMode
                      ? 'bg-slate-900/60 border-slate-800/70 hover:border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  {/* Category Icon Box */}
                  <div className={`p-2.5 rounded-lg border shrink-0 mt-0.5 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    {getItemIcon(item.type)}
                  </div>

                  {/* Main Item Content */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm truncate tracking-tight">
                        {item.title}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getTypeBadgeClass(item.type)}`}>
                        {item.badgeText || item.type}
                      </span>
                      {item.priceUSD !== undefined && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          ${item.priceUSD}
                        </span>
                      )}
                    </div>

                    {item.subtitle && (
                      <p className="text-xs text-sky-400/90 font-medium mt-0.5 truncate">
                        {item.subtitle}
                      </p>
                    )}

                    <p className={`text-xs mt-1 line-clamp-2 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {item.description}
                    </p>

                    {/* Tags list */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {item.tags.slice(0, 4).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className={`text-[9px] px-1.5 py-0.5 rounded border ${
                              isDarkMode
                                ? 'bg-slate-950/80 text-slate-400 border-slate-800'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 self-center">
                    {item.type === 'prompt' ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handleCopyPrompt(e, item)}
                          className={`p-1.5 rounded-lg border text-xs transition ${
                            copiedId === item.id
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : isDarkMode
                              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Copy AI Prompt text"
                        >
                          {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => handleSelectResult(item)}
                          className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-sm transition"
                        >
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span className="hidden sm:inline">Run Prompt</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSelectResult(item)}
                        className={`p-2 rounded-lg border transition ${
                          isFocused
                            ? 'bg-sky-500 text-white border-sky-400 shadow-sm'
                            : isDarkMode
                            ? 'bg-slate-800 text-slate-300 border-slate-700 group-hover:border-sky-500/50'
                            : 'bg-slate-100 text-slate-700 border-slate-200 group-hover:border-sky-400'
                        }`}
                        title="Open Resource"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className={`p-2.5 px-4 border-t flex items-center justify-between text-xs ${
          isDarkMode ? 'border-slate-800 bg-slate-950/80 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'
        }`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">↑↓</span> navigate
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">↵</span> open
            </span>
          </div>

          <div className="flex items-center gap-1 text-sky-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fuzzy Search Engine (Fuse.js)</span>
          </div>
        </div>

      </div>
    </div>
  );
};
