import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SubscriptionBanner } from './SubscriptionBanner';
import { PlanType, ViewMode } from '../types';
import {
  MARITIME_SEARCH_DATABASE,
  SEARCH_CATEGORIES,
  POPULAR_SEARCH_QUERIES,
  MARITIME_SEARCH_LANGUAGES,
  INITIAL_SEARCH_FILTERS,
  SearchFilterState,
  MaritimeSearchResult
} from '../data/maritimeSearchData';
import {
  Search,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe,
  BookOpen,
  Filter,
  SlidersHorizontal,
  Bot,
  FileText,
  Upload,
  Layers,
  CheckCircle2,
  Copy,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  ArrowRight,
  Calculator,
  Compass,
  Ship,
  Briefcase,
  Building2,
  GraduationCap,
  FileSpreadsheet,
  Zap,
  Download,
  Send,
  RefreshCw,
  X,
  Lock,
  Star,
  Check,
  Mic,
  MicOff,
  Radio,
  Volume2,
  AlertCircle
} from 'lucide-react';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onNavigateView?: (view: ViewMode) => void;
  initialQuery?: string;
  isDarkMode?: boolean;
}

type SearchTab = 'search' | 'doc_intelligence' | 'comparator' | 'research_assistant' | 'architecture';

export const AiMaritimeSearchView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onNavigateView,
  initialQuery = '',
  isDarkMode = true,
}) => {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<SearchTab>('search');
  
  // Search State
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState<SearchFilterState>(INITIAL_SEARCH_FILTERS);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedAiModel, setSelectedAiModel] = useState('gemini-2.5-pro');
  const [userRole, setUserRole] = useState<'naval_architect' | 'marine_engineer' | 'surveyor' | 'student' | 'shipowner'>('naval_architect');

  // Bookmarks & Saved Searches
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['imo-solas-ii1-stab', 'dnv-rules-pt3-ch1-hull']);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCitationModal, setShowCitationModal] = useState<MaritimeSearchResult | null>(null);
  const [citationFormat, setCitationFormat] = useState<'bibtex' | 'apa' | 'ieee'>('bibtex');
  const [memoCopied, setMemoCopied] = useState(false);

  // Document Intelligence State
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-1');
  const [docChatQuery, setDocChatQuery] = useState('');
  const [docChatHistory, setDocChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Document loaded: "IMO MEPC.377(80) Operational Carbon Intensity Guidelines". Ask me anything about CII reduction factors, correction formulas (fc, fi), or SEEMP Part III requirements.' }
  ]);
  const [isAnalyzingDoc, setIsAnalyzingDoc] = useState(false);

  // Rule Comparator State
  const [compareRuleA, setCompareRuleA] = useState('dnv_pt3');
  const [compareRuleB, setCompareRuleB] = useState('abs_mvr');

  // Interactive AI Follow-up in Search
  const [aiAssistantFollowUp, setAiAssistantFollowUp] = useState('');
  const [aiAssistantMessages, setAiAssistantMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);

  // Voice Search / Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechTranscript, setSpeechTranscript] = useState<string>('');
  const [isSpeakingSynthesis, setIsSpeakingSynthesis] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Auto trigger search if initialQuery is provided
  useEffect(() => {
    if (initialQuery && initialQuery.trim().length > 0) {
      setQuery(initialQuery);
      setHasSearched(true);
    }
  }, [initialQuery]);

  // Clean up speech recognition & synthesis on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Execute Search
  const handleExecuteSearch = (searchQuery?: string) => {
    const q = searchQuery !== undefined ? searchQuery : query;
    if (!q.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate smart semantic search retrieval & embedding reranking
    setTimeout(() => {
      setIsSearching(false);
    }, 350);
  };

  // Start Voice-to-Text Search Recognition
  const startVoiceSearch = () => {
    setSpeechError(null);
    setSpeechTranscript('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback: Simulate realistic maritime voice recognition query
      setIsListening(true);
      setSpeechTranscript('Listening to voice audio...');
      const sampleVoiceQueries = [
        'SOLAS damage stability attained index requirements for container vessels',
        'Compare DNV and ABS hull girder vertical wave bending moment rules',
        'Holtrop and Mennen calm water resistance formula and form factor',
        'IMO MARPOL Annex VI operational carbon intensity indicator reduction factor',
        'Post-Panamax parametric rolling damping with bilge keels'
      ];

      setTimeout(() => {
        const spoken = sampleVoiceQueries[Math.floor(Math.random() * sampleVoiceQueries.length)];
        setQuery(spoken);
        setSpeechTranscript(`"${spoken}"`);
        setTimeout(() => {
          setIsListening(false);
          handleExecuteSearch(spoken);
        }, 1200);
      }, 1800);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Language tag mapping for multilingual maritime voice input
      const langMap: Record<string, string> = {
        en: 'en-US',
        zh: 'zh-CN',
        el: 'el-GR',
        ja: 'ja-JP',
        ko: 'ko-KR',
        no: 'nb-NO',
        es: 'es-ES',
        de: 'de-DE',
        tl: 'fil-PH',
        id: 'id-ID',
        fr: 'fr-FR',
        pt: 'pt-PT'
      };
      recognition.lang = langMap[selectedLanguage] || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechTranscript('Listening... Speak your maritime or engineering question');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setQuery(currentTranscript);
        setSpeechTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setSpeechError(`Microphone notice (${event.error}). You can also type directly or try speaking again.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setQuery((latestQuery) => {
          if (latestQuery.trim()) {
            handleExecuteSearch(latestQuery);
          }
          return latestQuery;
        });
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err: any) {
      setIsListening(false);
      setSpeechError(err.message || 'Microphone activation error. Please check browser permissions.');
    }
  };

  // Stop Voice Search
  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error(e);
      }
    }
    setIsListening(false);
  };

  // Text-to-Speech playback for AI Synthesis answer
  const toggleSpeakSynthesis = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeakingSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeakingSynthesis(false);
      return;
    }

    const cleanText = text.replace(/[*#$_\\]/g, '').slice(0, 450);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeakingSynthesis(false);
    utterance.onerror = () => setIsSpeakingSynthesis(false);
    setIsSpeakingSynthesis(true);
    window.speechSynthesis.speak(utterance);
  };

  // Filtered Search Results
  const searchResults = useMemo(() => {
    let list = MARITIME_SEARCH_DATABASE;

    // Filter by Category Tab
    if (activeCategory !== 'all') {
      list = list.filter((item) => item.category === activeCategory);
    }

    // Filter by Query text (Semantic & Keyword simulation)
    if (query.trim()) {
      const qLower = query.toLowerCase();
      const keywords = qLower.split(' ').filter(w => w.length > 2);
      
      list = list.filter((item) => {
        const fullText = `${item.title} ${item.source} ${item.publisherOrOrg} ${item.summary} ${item.keyPoints.join(' ')} ${item.engineeringField.join(' ')} ${item.shipType?.join(' ') || ''} ${item.classSociety || ''} ${item.regulation || ''}`.toLowerCase();
        
        // Match exact or multi-word
        if (fullText.includes(qLower)) return true;
        return keywords.some(k => fullText.includes(k));
      });
    }

    // Advanced Facet Filters
    if (filters.shipType !== 'all') {
      list = list.filter((item) => item.shipType?.some(t => t.toLowerCase().includes(filters.shipType.toLowerCase())));
    }
    if (filters.engineeringField !== 'all') {
      list = list.filter((item) => item.engineeringField.some(f => f.toLowerCase().includes(filters.engineeringField.toLowerCase())));
    }
    if (filters.classSociety !== 'all') {
      list = list.filter((item) => item.classSociety?.toLowerCase() === filters.classSociety.toLowerCase());
    }
    if (filters.regulation !== 'all') {
      list = list.filter((item) => item.regulation?.toLowerCase().includes(filters.regulation.toLowerCase()));
    }
    if (filters.tier !== 'all') {
      list = list.filter((item) => item.tier === filters.tier);
    }
    if (filters.minCitations > 0) {
      list = list.filter((item) => (item.citations || 0) >= filters.minCitations);
    }

    return list;
  }, [query, activeCategory, filters]);

  // AI-Generated Comprehensive Synthesized Answer (Simulated from Top Grounded Maritime Results)
  const aiAnswerSynthesis = useMemo(() => {
    if (!query.trim() || searchResults.length === 0) return null;

    const topItem = searchResults[0];
    const qLower = query.toLowerCase();

    let directAnswer = `Based on verified maritime authorities including ${topItem.source} and the latest classification societies & IMO conventions:`;
    let citations = [topItem.source, topItem.doiOrRef || 'IMO Technical Circular'].filter(Boolean);
    let formulas = topItem.formulas || [];

    if (qLower.includes('solas') || qLower.includes('stability') || qLower.includes('lifeboat')) {
      directAnswer = `According to SOLAS Chapter II-1 (Resolution MSC.536(107)) and Chapter III LSA codes, intact and probabilistic damage stability requirements mandate that Attained Subdivision Index A ≥ Required Index R. For lifeboats and rescue craft, capacity must accommodate 100% of persons onboard on each side for passenger vessels, with gravity davit deployment verified under 20° list and 10° trim conditions.`;
    } else if (qLower.includes('dnv') || qLower.includes('abs') || qLower.includes('buckling') || qLower.includes('strength')) {
      directAnswer = `In hull structural scantling assessments, DNV Pt.3 Ch.1 requires verifying minimum section modulus Zmin against extreme North Atlantic wave bending moments (Mw,v), applying PULS code for plate buckling. ABS Part 3 applies a net scantling approach with explicit corrosion deductions (tc = 0.5–2.5 mm). Both rules enforce Von Mises yield criteria σ_vm ≤ 0.85 σ_yield.`;
    } else if (qLower.includes('holtrop') || qLower.includes('power') || qLower.includes('resistance')) {
      directAnswer = `The Holtrop & Mennen (1984) method calculates calm water resistance as RT = RF(1+k1) + RW + RB + RTR + RA. Skin friction RF is derived using the ITTC 1957 line, while wave-making resistance RW is parameterized based on Froude number Fn, beam-to-length ratio, and prismatic coefficient Cp.`;
    } else if (qLower.includes('cii') || qLower.includes('carbon') || qLower.includes('mepc') || qLower.includes('emissions')) {
      directAnswer = `Under IMO MEPC.377(80) and MARPOL Annex VI Regulation 28, annual operational CII is calculated as total grams of CO2 emitted divided by vessel deadweight capacity multiplied by nautical distance sailed. The annual reduction factor Z increases progressively from 11% (2024) to 28% (2030) baseline. Corrective action plans (SEEMP Part III) are required for vessels receiving rating D for 3 consecutive years or E for 1 year.`;
    } else {
      directAnswer = `${topItem.summary} Key engineering guidelines and compliance matrices from ${topItem.publisherOrOrg} establish that proper numerical derivation and Class society verification must be conducted before design approval.`;
    }

    return {
      title: `AI Technical Synthesis for "${query}"`,
      model: selectedAiModel === 'gemini-2.5-pro' ? 'Gemini 2.5 Pro (Maritime Specialist)' : selectedAiModel === 'gpt-4o-marine' ? 'GPT-4o Maritime' : selectedAiModel === 'claude-3.5-sonnet' ? 'Claude 3.5 Sonnet' : 'DeepSeek-R1 Marine',
      directAnswer,
      keyChecklist: topItem.keyPoints,
      formulas,
      citations: [
        { title: topItem.title, source: topItem.source, ref: topItem.doiOrRef || 'Ref 2025/IMO' },
        ...(searchResults[1] ? [{ title: searchResults[1].title, source: searchResults[1].source, ref: searchResults[1].doiOrRef || 'Class Rule' }] : [])
      ]
    };
  }, [query, searchResults, selectedAiModel]);

  // Bookmark Toggle
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Copy Citation Helper
  const handleCopyCitation = (item: MaritimeSearchResult, format: 'bibtex' | 'apa' | 'ieee') => {
    let text = '';
    if (format === 'bibtex') {
      text = `@article{${item.id.replace(/-/g, '_')},\n  title={${item.title}},\n  author={${item.authorOrEntity || 'Maritime Research Group'}},\n  journal={${item.source}},\n  year={${item.year}},\n  publisher={${item.publisherOrOrg}},\n  url={https://aimaritimehub.com/search/${item.id}}\n}`;
    } else if (format === 'apa') {
      text = `${item.authorOrEntity || item.publisherOrOrg} (${item.year}). ${item.title}. ${item.source}. https://doi.org/${item.doiOrRef || 'aimaritimehub/2026'}`;
    } else {
      text = `[1] ${item.authorOrEntity || item.publisherOrOrg}, "${item.title}," ${item.source}, vol. 1, pp. 1-12, ${item.year}.`;
    }

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Document Intelligence Sample Docs
  const SAMPLE_DOCS = [
    {
      id: 'doc-1',
      title: 'IMO_MEPC.377(80)_2023_CII_Guidelines.pdf',
      type: 'IMO Convention Regulation',
      pages: 42,
      fileSize: '3.8 MB',
      summary: 'Guidelines on operational carbon intensity calculation, trial voyage exclusions, fc/fi ice factor calibrations, and SEEMP Part III remediation verification.',
      extractedFormulas: [
        'CII = (FC * CF) / (Capacity * Distance)',
        'Reference Line = a * Capacity^(-c)',
        'Rating Boundary D_upper = exp(d4) * Reference Line'
      ],
      complianceScore: '98% Pass',
      hazmatCheck: 'Clean / Green Tier'
    },
    {
      id: 'doc-2',
      title: 'DNV_Rules_Part3_Ch1_Longitudinal_Strength.pdf',
      type: 'Class Society Rulebook',
      pages: 128,
      fileSize: '8.4 MB',
      summary: 'Rules for calculating hull girder vertical wave bending moments, midship section modulus, high-tensile material factors (k=0.72 for NV-36), and PULS panel buckling.',
      extractedFormulas: [
        'Zmin = c * L^2 * B * (Cb + 0.7) * k [cm³]',
        'Mw,v = -0.11 * fr * Cw * L^2 * B * (Cb + 0.7) [kNm]',
        'PULS Buckling Safety Factor eta = sigma_act / sigma_crit <= 1.0'
      ],
      complianceScore: '100% Verified',
      hazmatCheck: 'Structural Safe'
    },
    {
      id: 'doc-3',
      title: 'Holtrop_Mennen_1984_Powering_Prediction_Method.pdf',
      type: 'Naval Architecture Paper',
      pages: 36,
      fileSize: '2.1 MB',
      summary: 'Empirical power prediction equations for calm water resistance, form factor (1+k1), bulbous bow immersion resistance (RB), and transom immersion (RTR).',
      extractedFormulas: [
        'RT = RF*(1+k1) + RW + RB + RTR + RA',
        'CF = 0.075 / (log10(Re) - 2)^2',
        'PE = RT * V_ship'
      ],
      complianceScore: 'Academic Gold Standard',
      hazmatCheck: 'N/A'
    }
  ];

  const activeDoc = SAMPLE_DOCS.find((d) => d.id === selectedDocId) || SAMPLE_DOCS[0];

  // Document Chat Handler
  const handleDocChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docChatQuery.trim()) return;

    const userText = docChatQuery;
    setDocChatHistory((prev) => [...prev, { role: 'user', text: userText }]);
    setDocChatQuery('');
    setIsAnalyzingDoc(true);

    setTimeout(() => {
      let botResponse = `Regarding "${userText}" in ${activeDoc.title}: According to Section 4.2, the requirement mandates that all calculations conform to official Class standards with explicit verification parameters. The extracted formula is integrated directly into the digital twin module.`;
      if (userText.toLowerCase().includes('formula') || userText.toLowerCase().includes('equation')) {
        botResponse = `The primary mathematical formulation extracted from ${activeDoc.title} is: ${activeDoc.extractedFormulas[0]}. All units are standardized under SI naval architecture guidelines.`;
      } else if (userText.toLowerCase().includes('compliance') || userText.toLowerCase().includes('rule')) {
        botResponse = `Compliance status for ${activeDoc.title} is ${activeDoc.complianceScore}. Verified against IACS unified standards and IMO MEPC resolutions.`;
      }
      setDocChatHistory((prev) => [...prev, { role: 'assistant', text: botResponse }]);
      setIsAnalyzingDoc(false);
    }, 600);
  };

  // Rule Comparator Data
  const COMPARISON_DATA = [
    {
      aspect: 'Minimum Section Modulus (Zmin)',
      dnv: 'Zmin = c · L² · B · (Cb + 0.7) · k (cm³). Explicit PULS buckling criteria.',
      abs: 'Zmin = C1 · C2 · L² · B · (Cb + 0.7) · Q. Net scantling approach (tc subtracted).',
      iacs: 'Harmonized under IACS Common Structural Rules (CSR-BC&OT).',
      winner: 'DNV for FEA mesh flexibility / ABS for corrosion explicit margins'
    },
    {
      aspect: 'Corrosion Margin Additions (tc)',
      dnv: 'Nominal thickness minus rule corrosion additions based on tank cargo type (0.5–2.0 mm).',
      abs: 'Strict net thickness design. Standard corrosion addition 1.0–2.5 mm for ballast tanks.',
      iacs: 'Standardized 25-year design life corrosion deduction matrix.',
      winner: 'Harmonized'
    },
    {
      aspect: 'Dynamic Wave Load Probability',
      dnv: 'Exceedance probability of 10⁻⁸ in severe North Atlantic sea state.',
      abs: 'Equivalent 10⁻⁸ probability standard with dynamic component factoring.',
      iacs: 'Standardized across all 12 IACS member societies.',
      winner: 'Identical Safety Factor'
    },
    {
      aspect: 'Fatigue Design Factor (DFF)',
      dnv: 'DFF = 1.0 to 2.0 depending on inspectability and critical weld category.',
      abs: 'FDA (Fatigue Damage Assessment) notation with spectral fatigue analysis.',
      iacs: 'IACS CSR standard 25-year target with S-N curves in seawater with CP.',
      winner: 'DNV FLA automated mesh integration'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} py-6 px-3 sm:px-6 lg:px-8 space-y-6`}>
      {/* Top Subscription Banner */}
      <SubscriptionBanner
        userPlan={userPlan}
        onOpenPricing={onOpenPricing}
        featureName="AI Maritime Search Engine (Google for Maritime Industry)"
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Hero Section */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition shadow-xl ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-sky-950/40 border-slate-800'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-extrabold border border-cyan-500/30 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  Tool #81 • Enterprise Maritime Search
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 text-[11px] font-bold border border-sky-400/30">
                  Google for Maritime Industry
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-[11px] font-bold border border-purple-400/30">
                  145,000+ Indexed Vetted Assets
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  AI Maritime Search Engine
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Discover, analyze, compare, and extract maritime knowledge across IMO conventions, classification rules (DNV, ABS, LR, BV), peer-reviewed research papers (SNAME, RINA, IEEE), 3D ship designs, engineering calculators, and live industry data.
              </p>
            </div>

            {/* Persona Switcher & Model Selector */}
            <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
              <div className="p-2 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-sky-400" />
                  AI Engine:
                </span>
                <select
                  value={selectedAiModel}
                  onChange={(e) => setSelectedAiModel(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-sky-300 rounded-xl px-2.5 py-1 font-bold text-xs focus:outline-none cursor-pointer"
                >
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Maritime)</option>
                  <option value="gpt-4o-marine">GPT-4o Maritime</option>
                  <option value="claude-3.5-sonnet">Claude 3.5 Sonnet (Regulatory)</option>
                  <option value="deepseek-r1">DeepSeek-R1 (Naval Math)</option>
                </select>
              </div>

              <div className="p-2 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Language:
                </span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-emerald-300 rounded-xl px-2 py-1 font-bold text-xs focus:outline-none cursor-pointer"
                >
                  {MARITIME_SEARCH_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'search', label: 'AI Semantic Search', icon: <Search className="w-4 h-4" />, badge: 'Unified' },
              { id: 'doc_intelligence', label: 'Document Intelligence Studio', icon: <FileText className="w-4 h-4" />, badge: 'PDF & OCR' },
              { id: 'comparator', label: 'Regulation & Rule Comparator', icon: <Layers className="w-4 h-4" />, badge: 'DNV vs ABS' },
              { id: 'research_assistant', label: 'Research & Thesis Lab', icon: <BookOpen className="w-4 h-4" />, badge: 'BibTeX' },
              { id: 'architecture', label: 'Search Engine Architecture', icon: <Database className="w-4 h-4" />, badge: 'Vector RAG' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SearchTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-extrabold'
                    : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                    activeTab === tab.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-cyan-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: UNIFIED AI SEMANTIC SEARCH */}
        {activeTab === 'search' && (
          <div className="space-y-6">

            {/* Main Search Input & Bar */}
            <div className={`p-4 sm:p-6 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            } space-y-4`}>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleExecuteSearch();
                }}
                className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      isListening
                        ? "🎙️ Listening... Speak your maritime or engineering question..."
                        : "Ask any maritime question (e.g., SOLAS damage stability, DNV buckling rules, Holtrop resistance formula...)"
                    }
                    className={`w-full pl-12 pr-24 py-3.5 rounded-2xl text-sm font-medium transition focus:outline-none ${
                      isListening
                        ? 'bg-rose-950/20 border-rose-500 text-white placeholder-rose-300 ring-2 ring-rose-500/40'
                        : isDarkMode
                        ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                        : 'bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-600'
                    }`}
                  />

                  {/* Actions inside Input Field (Clear + Microphone Voice-to-Text) */}
                  <div className="absolute right-2.5 top-2 flex items-center gap-1">
                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery('');
                          setHasSearched(false);
                          setSpeechTranscript('');
                        }}
                        className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
                        title="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    {/* Microphone Voice-to-Text Trigger Button */}
                    <button
                      type="button"
                      onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                      title={isListening ? "Stop Voice Listening" : "Voice-to-Text Maritime Search"}
                      className={`p-2 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                        isListening
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 animate-pulse ring-2 ring-rose-300'
                          : isDarkMode
                          ? 'bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/50'
                          : 'bg-white hover:bg-slate-200 text-cyan-600 border border-slate-300 shadow-sm'
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4 text-white animate-bounce" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
                    className={`px-4 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition ${
                      showFiltersDrawer
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : isDarkMode
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="Toggle Advanced Technical & Academic Filters"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    <span>Filters</span>
                    {(filters.shipType !== 'all' || filters.classSociety !== 'all' || filters.regulation !== 'all' || filters.engineeringField !== 'all') && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </button>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/25 disabled:opacity-50 cursor-pointer"
                  >
                    {isSearching ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-slate-950" />
                    )}
                    <span>AI Search</span>
                  </button>
                </div>
              </form>

              {/* Voice Search Active Listening Real-Time State Banner */}
              {isListening && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-2xl text-xs text-rose-200 animate-in fade-in duration-200 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping absolute" />
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                    </div>
                    <Radio className="w-4 h-4 text-rose-400 animate-pulse shrink-0" />
                    <div>
                      <div className="font-extrabold text-white flex items-center gap-2">
                        <span>Voice-to-Text Search Active</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-500/30 text-rose-200 border border-rose-500/40 font-mono">
                          {MARITIME_SEARCH_LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'English'}
                        </span>
                      </div>
                      <div className="text-[11px] text-rose-300/90 italic mt-0.5">
                        {speechTranscript || 'Speak your maritime question, hull parameters, Class rules or formulas...'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {/* Live Audio Visualizer Bars */}
                    <div className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-900/50 rounded-xl border border-rose-500/30">
                      <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-5 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-6 bg-rose-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="w-1 h-4 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '75ms' }} />
                      <span className="w-1 h-5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '225ms' }} />
                    </div>
                    <button
                      type="button"
                      onClick={stopVoiceSearch}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition cursor-pointer shadow-md"
                    >
                      Done & Search
                    </button>
                  </div>
                </div>
              )}

              {/* Speech Error Banner */}
              {speechError && (
                <div className="flex items-center justify-between p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-xs text-amber-300 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{speechError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSpeechError(null)}
                    className="p-1 text-amber-400 hover:text-white rounded-lg"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* 16-Silo Quick Categories Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {SEARCH_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        if (!hasSearched) setHasSearched(true);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                          : isDarkMode
                          ? 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-[10px] opacity-60 font-mono">({cat.count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Popular Query Suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Trending Questions:
                </span>
                {POPULAR_SEARCH_QUERIES.slice(0, 5).map((popQuery, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(popQuery);
                      handleExecuteSearch(popQuery);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition text-left truncate max-w-xs"
                  >
                    "{popQuery}"
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Advanced Filters Drawer */}
            {showFiltersDrawer && (
              <div className="p-5 rounded-3xl bg-slate-900/95 border border-slate-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Multi-Dimensional Maritime Facets
                  </h3>
                  <button
                    onClick={() => setFilters(INITIAL_SEARCH_FILTERS)}
                    className="text-[11px] font-bold text-slate-400 hover:text-rose-400 transition"
                  >
                    Reset All Filters
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  {/* Ship Type */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">Ship Type / Vessel Category</label>
                    <select
                      value={filters.shipType}
                      onChange={(e) => setFilters({ ...filters, shipType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                    >
                      <option value="all">All Vessel Types</option>
                      <option value="bulk">Bulk Carrier (Capesize/Ultramax)</option>
                      <option value="tanker">Oil & Chemical Tankers</option>
                      <option value="container">Container Ships (Post-Panamax)</option>
                      <option value="lng">LNG / LPG Carriers</option>
                      <option value="ro-ro">Ro-Ro & Passenger Ferries</option>
                      <option value="offshore">Offshore Wind CTV / SOV</option>
                      <option value="tug">Tugs & Workboats</option>
                    </select>
                  </div>

                  {/* Engineering Discipline */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">Engineering Discipline</label>
                    <select
                      value={filters.engineeringField}
                      onChange={(e) => setFilters({ ...filters, engineeringField: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                    >
                      <option value="all">All Engineering Fields</option>
                      <option value="stability">Hydrostatics & Stability</option>
                      <option value="hydrodynamics">Hydrodynamics & Resistance</option>
                      <option value="structural">Structural FEA & Scantlings</option>
                      <option value="propeller">Propeller Design & Cavitation</option>
                      <option value="decarbonization">Decarbonization & CII (MEPC 82)</option>
                      <option value="machinery">Marine Machinery & Dual Fuel</option>
                    </select>
                  </div>

                  {/* Classification Society */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">Classification Society</label>
                    <select
                      value={filters.classSociety}
                      onChange={(e) => setFilters({ ...filters, classSociety: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                    >
                      <option value="all">All Class Societies (IACS)</option>
                      <option value="dnv">DNV (Det Norske Veritas)</option>
                      <option value="abs">ABS (American Bureau of Shipping)</option>
                      <option value="lr">Lloyd's Register (LR)</option>
                      <option value="bv">Bureau Veritas (BV)</option>
                      <option value="classnk">ClassNK (Nippon Kaiji Kyokai)</option>
                    </select>
                  </div>

                  {/* Regulation Framework */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">Regulatory Framework</label>
                    <select
                      value={filters.regulation}
                      onChange={(e) => setFilters({ ...filters, regulation: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                    >
                      <option value="all">All International Regulations</option>
                      <option value="solas">SOLAS (Safety of Life at Sea)</option>
                      <option value="marpol">MARPOL (Annex I-VI / CII)</option>
                      <option value="hkc">Hong Kong Convention (HKC 2025)</option>
                      <option value="stcw">STCW 2010</option>
                      <option value="iacs">IACS CSR / UR</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* AI Synthesized Answer Card */}
            {aiAnswerSynthesis && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/40 border border-cyan-500/30 shadow-2xl space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                        {aiAnswerSynthesis.title}
                      </h3>
                      <span className="text-[10px] text-cyan-300/80 font-mono">
                        Engine: {aiAnswerSynthesis.model} • Multi-source grounded
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSpeakSynthesis(aiAnswerSynthesis.directAnswer)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                        isSpeakingSynthesis
                          ? 'bg-rose-500/20 text-rose-300 border-rose-400/40 animate-pulse'
                          : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-cyan-500/40'
                      }`}
                      title={isSpeakingSynthesis ? "Stop voice audio" : "Listen to audio readout"}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isSpeakingSynthesis ? 'text-rose-400 animate-bounce' : 'text-cyan-400'}`} />
                      <span>{isSpeakingSynthesis ? 'Speaking...' : 'Listen'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const memoText = `# ${aiAnswerSynthesis.title}\n\n${aiAnswerSynthesis.directAnswer}\n\n## Key Compliance Checklist\n${aiAnswerSynthesis.keyChecklist.map(k => `- ${k}`).join('\n')}\n\n## References\n${aiAnswerSynthesis.citations.map(c => `- ${c.title} (${c.source})`).join('\n')}`;
                        navigator.clipboard.writeText(memoText);
                        setMemoCopied(true);
                        setTimeout(() => setMemoCopied(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      {memoCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{memoCopied ? 'Memo Copied!' : 'Copy Technical Memo'}</span>
                    </button>
                  </div>
                </div>

                {/* Direct Executive Answer */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {aiAnswerSynthesis.directAnswer}
                </p>

                {/* Extracted Mathematical Formulas */}
                {aiAnswerSynthesis.formulas && aiAnswerSynthesis.formulas.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                      <Calculator className="w-3 h-3" />
                      Extracted Mathematical Equations & Formulations
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {aiAnswerSynthesis.formulas.map((form, fIdx) => (
                        <div key={fIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                          <span className="text-[11px] font-bold text-sky-300">{form.name}</span>
                          <div className="p-1.5 rounded-lg bg-slate-950 font-mono text-xs text-amber-300 overflow-x-auto">
                            {form.latex}
                          </div>
                          <p className="text-[10px] text-slate-400">{form.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Checklist & Verifiable Grounded Citations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Core Engineering & Regulatory Takeaways
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {aiAnswerSynthesis.keyChecklist.slice(0, 3).map((kp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                      Grounded Authorities & Citations
                    </span>
                    <div className="space-y-1 text-xs">
                      {aiAnswerSynthesis.citations.map((cite, cIdx) => (
                        <div key={cIdx} className="p-1.5 rounded-lg bg-slate-900/80 flex items-center justify-between gap-2">
                          <span className="text-[11px] font-medium text-slate-200 truncate">{cite.title}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 whitespace-nowrap">
                            {cite.ref}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Header & Relevancy Counter */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold">
                Found <span className="text-cyan-400">{searchResults.length}</span> verified maritime assets matching your query
              </span>
              <span className="text-[11px] text-slate-500">
                Sorted by AI Hybrid Semantic Relevance Score
              </span>
            </div>

            {/* Search Results Grid / List */}
            <div className="space-y-4">
              {searchResults.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <Search className="w-10 h-10 text-slate-600 mx-auto" />
                  <h3 className="text-base font-bold text-white">No exact maritime records found</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Try broadening your keywords or clearing the category and classification filters.
                  </p>
                  <button
                    onClick={() => {
                      setQuery('');
                      setActiveCategory('all');
                      setFilters(INITIAL_SEARCH_FILTERS);
                    }}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-xl text-xs font-bold border border-cyan-500/30"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              ) : (
                searchResults.map((item) => {
                  const isBookmarked = bookmarkedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`p-5 sm:p-6 rounded-3xl border transition group ${
                        isDarkMode
                          ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 hover:border-cyan-500/40'
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-cyan-400 shadow-sm'
                      } space-y-3`}
                    >
                      {/* Top Badges & Source */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                            {item.category.replace(/_/g, ' ')}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            {item.source} • {item.year}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {item.badge}
                            </span>
                          )}
                          {item.classSociety && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                              {item.classSociety}
                            </span>
                          )}
                          {item.regulation && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                              {item.regulation}
                            </span>
                          )}
                        </div>

                        {/* Relevance Score & Bookmark */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            {item.relevanceScore}% Semantic Match
                          </span>
                          <button
                            onClick={() => toggleBookmark(item.id)}
                            className={`p-1.5 rounded-xl border transition ${
                              isBookmarked
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                            title="Bookmark this asset"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Summary */}
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>

                      {/* Formulas if present */}
                      {item.formulas && item.formulas.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                          <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                            <Calculator className="w-3 h-3" />
                            {item.formulas[0].name}
                          </span>
                          <div className="font-mono text-xs text-cyan-300 bg-slate-900 px-2 py-1 rounded">
                            {item.formulas[0].latex}
                          </div>
                        </div>
                      )}

                      {/* Key Points */}
                      <ul className="space-y-1 text-xs text-slate-300 pt-1">
                        {item.keyPoints.slice(0, 2).map((kp, kpIdx) => (
                          <li key={kpIdx} className="flex items-start gap-1.5 text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{kp}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Footer Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                          {item.citations && (
                            <span>{item.citations.toLocaleString()} Citations</span>
                          )}
                          {item.doiOrRef && (
                            <span className="font-mono text-slate-500">Ref: {item.doiOrRef}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setShowCitationModal(item);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3 text-sky-400" />
                            <span>Cite (BibTeX)</span>
                          </button>

                          {item.linkAction && (
                            <button
                              onClick={() => {
                                if (item.linkAction?.viewTarget && onNavigateView) {
                                  onNavigateView(item.linkAction.viewTarget as ViewMode);
                                }
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-extrabold transition flex items-center gap-1"
                            >
                              <span>{item.linkAction.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DOCUMENT INTELLIGENCE STUDIO (UPLOAD & OCR) */}
        {activeTab === 'doc_intelligence' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                  AI Document Intelligence & Vector Parser
                </span>
                <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Upload & Analyze Maritime Technical Documents
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Drag and drop PDFs, Class rulebooks, research papers, stability books, GA drawings, and survey records for automated formula extraction, compliance auditing, and multi-model conversational Q&A.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-purple-500/40 hover:border-purple-400 rounded-3xl p-8 text-center bg-purple-950/10 transition cursor-pointer space-y-2">
                <Upload className="w-10 h-10 text-purple-400 mx-auto animate-bounce" />
                <h3 className="font-bold text-sm text-white">Drop maritime PDF, DWG, TXT, or Excel calculation sheet here</h3>
                <p className="text-xs text-slate-400">Supports files up to 100 MB • Encrypted Enterprise Vault • SOC2 Compliant</p>
                <div className="pt-2">
                  <button className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition">
                    Browse Local File System
                  </button>
                </div>
              </div>

              {/* Sample Preloaded Documents Selector */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Or Select Preloaded Sample Engineering Document:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {SAMPLE_DOCS.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer space-y-1.5 ${
                        selectedDocId === doc.id
                          ? 'bg-purple-500/20 border-purple-400 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-purple-300">{doc.type}</span>
                        <span className="text-[10px] text-slate-500">{doc.pages} Pages</span>
                      </div>
                      <h4 className="font-bold text-xs text-white truncate">{doc.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{doc.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Document Analysis & Q&A Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Extracted Metadata & Formulas */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-purple-400" />
                      Extracted Technical Structure
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {activeDoc.complianceScore}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold">Document Title:</span>
                      <p className="font-mono text-cyan-300 text-xs mt-0.5">{activeDoc.title}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Executive AI Summary:</span>
                      <p className="text-slate-300 leading-relaxed mt-0.5">{activeDoc.summary}</p>
                    </div>
                  </div>

                  {/* Extracted Formulas */}
                  <div className="pt-2 space-y-2">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5" />
                      Extracted Mathematical Equations ({activeDoc.extractedFormulas.length})
                    </span>
                    <div className="space-y-1.5">
                      {activeDoc.extractedFormulas.map((form, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                          {form}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Chat with Document */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col h-96">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      Document Chat Copilot
                    </h3>
                    <span className="text-[10px] text-slate-400">Context: {activeDoc.title.slice(0, 20)}...</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
                    {docChatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-cyan-500/20 text-cyan-200 ml-8 border border-cyan-500/30'
                            : 'bg-slate-950 text-slate-200 mr-8 border border-slate-800'
                        }`}
                      >
                        <span className="text-[9px] font-bold uppercase text-slate-500 block mb-0.5">
                          {msg.role === 'user' ? 'You' : 'Document AI Agent'}
                        </span>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                    ))}
                    {isAnalyzingDoc && (
                      <div className="p-2.5 rounded-xl bg-slate-950 text-slate-400 text-xs flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                        <span>Analyzing document vector nodes...</span>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleDocChat} className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={docChatQuery}
                      onChange={(e) => setDocChatQuery(e.target.value)}
                      placeholder="Ask questions about this specific document..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGULATION & CLASS RULE COMPARATOR */}
        {activeTab === 'comparator' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Regulatory Intelligence Engine
                </span>
                <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  Side-by-Side Classification Society & IMO Rule Comparator
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Direct cross-comparison between DNV, ABS, Lloyd’s Register, Bureau Veritas, and SOLAS/MARPOL rules for scantlings, corrosion margins, buckling formulas, and survey timelines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <label className="text-xs font-bold text-slate-300">Rule Standard A:</label>
                  <select
                    value={compareRuleA}
                    onChange={(e) => setCompareRuleA(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-sky-300 font-bold focus:outline-none"
                  >
                    <option value="dnv_pt3">DNV Rules Pt.3 Ch.1 (Hull Structural Scantlings)</option>
                    <option value="solas_ii1">IMO SOLAS Chapter II-1 (Probabilistic Stability)</option>
                    <option value="lr_waps">Lloyd’s Register WAPS (Wind Propulsion)</option>
                  </select>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <label className="text-xs font-bold text-slate-300">Rule Standard B:</label>
                  <select
                    value={compareRuleB}
                    onChange={(e) => setCompareRuleB(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-bold focus:outline-none"
                  >
                    <option value="abs_mvr">ABS Marine Vessel Rules Part 3 (Hull Construction)</option>
                    <option value="iacs_csr">IACS Common Structural Rules (CSR-BC&OT)</option>
                    <option value="mepc_82">IMO MARPOL Annex VI MEPC 82 (CII / Decarb)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                DNV vs ABS Technical Comparison Matrix
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold">
                      <th className="py-3 px-4">Engineering Aspect</th>
                      <th className="py-3 px-4 text-sky-300">DNV Class Rules</th>
                      <th className="py-3 px-4 text-cyan-300">ABS Marine Rules</th>
                      <th className="py-3 px-4 text-emerald-300">IACS CSR Harmonization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {COMPARISON_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-950/60 transition">
                        <td className="py-3 px-4 font-bold text-white align-top">{row.aspect}</td>
                        <td className="py-3 px-4 text-slate-300 align-top">{row.dnv}</td>
                        <td className="py-3 px-4 text-slate-300 align-top">{row.abs}</td>
                        <td className="py-3 px-4 text-slate-300 align-top">{row.iacs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RESEARCH & THESIS LAB */}
        {activeTab === 'research_assistant' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
                  Academic & Doctoral Research Hub
                </span>
                <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-pink-400" />
                  Naval Architecture Literature Review & Thesis Finder
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Synthesize across 52,000+ SNAME, RINA, IEEE Oceanic, and Ocean Engineering peer-reviewed publications. Export instant BibTeX, APA 7, and IEEE citations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-xs text-pink-300">1. Literature Synthesis</h4>
                  <p className="text-[11px] text-slate-400">Automated literature review outlines with research gaps identified in hydrodynamics and decarbonization.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-xs text-cyan-300">2. Citation Generator</h4>
                  <p className="text-[11px] text-slate-400">Export formatted BibTeX, APA 7, and IEEE entries directly into LaTeX and Overleaf workspaces.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-xs text-emerald-300">3. Journal Matcher</h4>
                  <p className="text-[11px] text-slate-400">Match your manuscript abstract to Ocean Engineering, Applied Ocean Research, or RINA IJME.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SEARCH ENGINE ARCHITECTURE & TRANSPARENCY */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                  Vector RAG & Deep Retrieval
                </span>
                <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  AI Maritime Search Architecture & Technology
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  How AI Maritime Hub indexes, vectorizes, and serves high-precision naval architecture engineering knowledge with zero hallucination guarantee.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">1</div>
                  <h4 className="font-bold text-xs text-white">Hybrid Retrieval</h4>
                  <p className="text-[11px] text-slate-400">Dense vector semantic embeddings combined with sparse BM25 keyword matching across 145k items.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-300 font-bold">2</div>
                  <h4 className="font-bold text-xs text-white">Maritime Knowledge Graph</h4>
                  <p className="text-[11px] text-slate-400">Entity linking connects ship types to applicable IMO conventions, Class rules, and FEA formulas.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">3</div>
                  <h4 className="font-bold text-xs text-white">Multi-Model Synthesis</h4>
                  <p className="text-[11px] text-slate-400">Gemini 2.5 Pro and DeepSeek-R1 verify mathematical derivations and generate structured checklists.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold">4</div>
                  <h4 className="font-bold text-xs text-white">Enterprise Private Vault</h4>
                  <p className="text-[11px] text-slate-400">Zero data retention guarantee for proprietary shipyard blueprints and confidential survey reports.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Citation Modal */}
      {showCitationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Formatted Citation Export
              </h3>
              <button
                onClick={() => setShowCitationModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              {(['bibtex', 'apa', 'ieee'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setCitationFormat(fmt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition ${
                    citationFormat === fmt
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-950 text-slate-300 border border-slate-800'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 font-mono text-xs text-amber-300 overflow-x-auto max-h-48 border border-slate-800">
              {citationFormat === 'bibtex' && (
                <pre>{`@article{${showCitationModal.id.replace(/-/g, '_')},\n  title={${showCitationModal.title}},\n  author={${showCitationModal.authorOrEntity || 'Maritime Research Group'}},\n  journal={${showCitationModal.source}},\n  year={${showCitationModal.year}},\n  publisher={${showCitationModal.publisherOrOrg}},\n  url={https://aimaritimehub.com/search/${showCitationModal.id}}\n}`}</pre>
              )}
              {citationFormat === 'apa' && (
                <p>{`${showCitationModal.authorOrEntity || showCitationModal.publisherOrOrg} (${showCitationModal.year}). ${showCitationModal.title}. ${showCitationModal.source}. https://doi.org/${showCitationModal.doiOrRef || 'aimaritimehub/2026'}`}</p>
              )}
              {citationFormat === 'ieee' && (
                <p>{`[1] ${showCitationModal.authorOrEntity || showCitationModal.publisherOrOrg}, "${showCitationModal.title}," ${showCitationModal.source}, vol. 1, pp. 1-12, ${showCitationModal.year}.`}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  handleCopyCitation(showCitationModal, citationFormat);
                  setShowCitationModal(null);
                }}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs rounded-xl transition"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
