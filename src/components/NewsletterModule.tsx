import React, { useState, useEffect } from 'react';
import {
  Mail,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Send,
  Download,
  ShieldCheck,
  Zap,
  Clock,
  ChevronRight,
  Filter,
  Check,
  Globe,
  Users,
  Award,
  AlertCircle,
  CreditCard,
  Crown,
  Lock,
  ArrowRight,
  Search,
  Layers,
  FileText,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Play,
  Pause,
  Volume2,
  Edit3,
  PlusCircle,
  TrendingUp,
  BarChart2,
  Settings,
  Radio,
  Headphones,
  Quote,
  GraduationCap,
  Briefcase,
  DollarSign,
  ExternalLink,
  Eye,
  UserPlus,
  RefreshCw,
  Copy,
  Languages,
  CheckSquare,
  Building2,
  FileCode,
  Sliders,
  SendHorizontal
} from 'lucide-react';
import { ViewMode, Currency, PlanType } from '../types';
import { CheckoutModal } from './CheckoutModal';
import { ALL_NEWSLETTER_TOPICS, FLAT_TOPICS_LIST } from '../data/newsletterTopicsData';

interface NewsletterEdition {
  id: string;
  issueNumber: number;
  date: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  highlights: string[];
  isProOnly?: boolean;
}

interface PublishedArticle {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  authorOrg: string;
  date: string;
  category: string;
  sources: string[];
  credibilityScore: number;
  technicalSummary: string;
  simpleSummary: string;
  executiveSummary: string[];
  keyTakeaways: string[];
  likes: number;
  commentsCount: number;
  readTime: string;
  pdfUrl?: string;
  videoUrl?: string;
  audioNarrationUrl?: string;
  audioDuration?: string;
  isPeerReviewed?: boolean;
  content: string;
}

interface NewsletterModuleProps {
  onNavigateView?: (view: ViewMode) => void;
  compact?: boolean;
  currency?: Currency;
}

export const NewsletterModule: React.FC<NewsletterModuleProps> = ({
  onNavigateView,
  compact = false,
  currency = 'USD'
}) => {
  // Navigation Tabs
  type TabType = 'personalized' | 'global_feed' | 'publishing_studio' | 'community' | 'ai_search' | 'automation' | 'analytics' | 'admin';
  const [activeTab, setActiveTab] = useState<TabType>('personalized');

  // Subscription Preference State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Naval Architect');
  const [userArchetype, setUserArchetype] = useState('Professional');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'IMO SOLAS & MARPOL Regulatory Updates',
    'Naval Architecture & Hydrostatics',
    'Green Shipping & Decarbonization',
    'Dual-Fuel Engine Performance (Methanol vs LNG vs Ammonia)',
    'Digital Twin Hydrodynamics for Real-Time Fuel Optimization'
  ]);
  const [topicSearch, setTopicSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [frequency, setFrequency] = useState('Weekly Digest');
  const [selectedTier, setSelectedTier] = useState<'free' | 'student' | 'pro' | 'enterprise'>('pro');

  const [loading, setLoading] = useState(false);
  const [subResponse, setSubResponse] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Generated Instant Newsletter State
  const [generatedNewsletter, setGeneratedNewsletter] = useState<any | null>(null);
  const [isGeneratingNewsletter, setIsGeneratingNewsletter] = useState(false);

  // Archives & Articles State
  const [archives, setArchives] = useState<NewsletterEdition[]>([]);
  const [selectedEditionModal, setSelectedEditionModal] = useState<NewsletterEdition | null>(null);

  // Global Articles Feed Data
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('All');
  const [feedArticles, setFeedArticles] = useState<PublishedArticle[]>([
    {
      id: 'art-101',
      title: 'IMO MEPC 82 Compliance Roadmap: Carbon Levy, CII Benchmarking & EEXI Power Limitation',
      author: 'Dr. Lars Lindqvist',
      authorRole: 'Senior IMO Regulatory Auditor',
      authorOrg: 'DNV Maritime Research',
      date: 'July 28, 2026',
      category: 'SOLAS & MARPOL',
      sources: ['IMO MEPC.328(76)', 'DNV Research', 'IACS UR M68'],
      credibilityScore: 99,
      technicalSummary: 'Evaluates the mathematical impact of tightening CII annual reduction factor Z to -11% by 2026. Details Engine Power Limitation (EPL) override logging rules under MARPOL Annex VI.',
      simpleSummary: 'Explains new global ocean environmental rules requiring ships to cut carbon emissions faster and report real-time fuel usage to the UN IMO.',
      executiveSummary: [
        'Mandatory GHG Fuel Intensity Standard taking effect in 2027.',
        'Estimated $100/ton carbon levy projections across international container lines.',
        'CAPEX allocation required for bio-fuel blending and shaft power meters.'
      ],
      keyTakeaways: [
        'EPL override records must be submitted to flag state within 14 days',
        'CII rating D or E requires mandatory SEEMP Part III corrective plan',
        'Methanol dual-fuel retrofits offer 65% lifecycle CO2 reduction'
      ],
      likes: 342,
      commentsCount: 28,
      readTime: '6 min read',
      audioDuration: '5:40',
      isPeerReviewed: true,
      content: `The International Maritime Organization (IMO) Marine Environment Protection Committee (MEPC) has ratified revised measures for MARPOL Annex VI Regulation 28. 

Vessels falling into CII Rating 'D' for three consecutive years, or 'E' for a single year, must formulate an updated Ship Energy Efficiency Management Plan (SEEMP Part III) audited by Class societies.

### Key Equations & Calculation Parameters
The Attained Operational CII is calculated as:
$$CII_{attained} = \\frac{\\sum M_j \\cdot C_{CF,j}}{\\text{DWT} \\cdot S}$$
Where $M_j$ represents mass of fuel consumed, $C_{CF,j}$ is fuel carbon factor, and $S$ is distance sailed in nautical miles.`
    },
    {
      id: 'art-102',
      title: 'Hydrodynamic Resistance & Form Factor (1+k) Optimization in OpenFOAM for Container Vessels',
      author: 'Prof. Elena Rostova',
      authorRole: 'Chair of Hydrodynamics',
      authorOrg: 'NTNU Department of Marine Technology',
      date: 'July 25, 2026',
      category: 'Naval Architecture',
      sources: ['ITTC 1957', 'SNAME Transactions', 'OpenFOAM Foundation'],
      credibilityScore: 98,
      technicalSummary: 'Correlates Holtrop-Mennen empirical resistance formulas with RANS OpenFOAM CFD simulations for a 220m post-Panamax hull form across Froude numbers 0.14 to 0.24.',
      simpleSummary: 'Shows how naval architects use computer simulation to reshape ship hulls, cutting wave drag and saving millions in fuel costs.',
      executiveSummary: [
        'Form factor 1+k reduction of 4.2% achieved via bulbous bow reshaping.',
        'Fuel savings estimated at 3.8 metric tons per day at 18 knots.',
        'Mesh convergence verified using Grid Convergence Index (GCI).'
      ],
      keyTakeaways: [
        'y+ values maintained between 30 and 60 for k-omega SST model',
        'Wave resistance C_w drops significantly at Froude number 0.18',
        'ITTC 1957 correlation line matches CFD friction within 1.4%'
      ],
      likes: 289,
      commentsCount: 19,
      readTime: '8 min read',
      audioDuration: '7:15',
      isPeerReviewed: true,
      content: `Numerical wave-making resistance calculations were performed using double-model boundary conditions.

Using Prohaska's method at low Froude numbers ($F_n < 0.12$), the form factor $(1+k_1)$ was determined from the intercept of $C_t / C_f$ vs $F_n^4 / C_f$.`
    },
    {
      id: 'art-103',
      title: 'Autonomous Ship Navigation (MASS Level 3) & AI Computer Vision for COLREGs Avoidance',
      author: 'Capt. Jonathan Vance',
      authorRole: 'Head of Marine Robotics',
      authorOrg: 'Rolls-Royce Autonomous Shipping Lab',
      date: 'July 22, 2026',
      category: 'Autonomous Ships',
      sources: ['IMO MASS Code', 'IEEE Robotics', 'USCG Research'],
      credibilityScore: 97,
      technicalSummary: 'Details deep reinforcement learning models trained on sensor-fusion data (Radar, LiDAR, Optical AIS) enforcing COLREGs Rules 13-17 for multi-vessel encounters.',
      simpleSummary: 'Explains how self-driving ships use cameras and AI radar to navigate safely around other boats without human intervention.',
      executiveSummary: [
        'MASS Level 3 trial completed successfully over 1,200 nautical miles.',
        'COLREGs compliance accuracy verified at 99.8% in dynamic sea clutter.',
        'Zero collision incidents recorded during simulated night fog trials.'
      ],
      keyTakeaways: [
        'Rule 14 Head-on situation resolved with 15-degree starboard alter',
        'Sensor fusion latency reduced to 45 milliseconds using edge AI tensor cores',
        'Cybersecurity encryption meets IACS Recommendation 166'
      ],
      likes: 412,
      commentsCount: 35,
      readTime: '7 min read',
      audioDuration: '6:30',
      isPeerReviewed: true,
      content: `The autonomous collision avoidance architecture relies on a Markov Decision Process (MDP) solver integrated with real-time AIS dynamic target tracking.`
    }
  ]);

  // Audio Player State for News Feed
  const [playingArticleId, setPlayingArticleId] = useState<string | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);

  // Selected Summary View per article ('technical' | 'simple' | 'executive')
  const [summaryViewMap, setSummaryViewMap] = useState<Record<string, 'technical' | 'simple' | 'executive'>>({});

  // Social Modal & Translation State
  const [socialModalArticle, setSocialModalArticle] = useState<PublishedArticle | null>(null);
  const [socialPostFormat, setSocialPostFormat] = useState<'linkedIn' | 'twitter' | 'facebook' | 'telegram'>('linkedIn');
  const [translatedArticleLang, setTranslatedArticleLang] = useState<string>('English');

  // Publishing Studio State
  const [pubTitle, setPubTitle] = useState('');
  const [pubCategory, setPubCategory] = useState('Naval Architecture');
  const [pubDocType, setPubDocType] = useState('Research Article');
  const [pubContent, setPubContent] = useState('');
  const [pubSources, setPubSources] = useState('IMO SOLAS, DNV Rules, ITTC 1957');
  const [isAiWriting, setIsAiWriting] = useState(false);
  const [aiWritingTool, setAiWritingTool] = useState<'assistant' | 'citation' | 'plagiarism' | 'seo' | 'translate'>('assistant');
  const [citationFormat, setCitationFormat] = useState<'IEEE' | 'APA' | 'Harvard' | 'BibTeX'>('IEEE');
  const [generatedCitations, setGeneratedCitations] = useState<string[]>([]);
  const [plagiarismScore, setPlagiarismScore] = useState<number | null>(null);
  const [seoReport, setSeoReport] = useState<any | null>(null);

  // Search Engine State
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [selectedSearchFilter, setSelectedSearchFilter] = useState('All');

  // Verified Source Badge State & Audit Details Modal State
  const [verifiedOnlyFilter, setVerifiedOnlyFilter] = useState(false);
  const [activeVerificationModalArticle, setActiveVerificationModalArticle] = useState<PublishedArticle | null>(null);

  // Helper function to resolve source entity badges and credibility ratings
  const getVerificationDetails = (sources: string[], credibilityScore: number) => {
    const verifiedEntitiesList = [
      { name: 'IMO', full: 'International Maritime Organization', icon: '🏛️', tier: 'UN Regulatory Authority' },
      { name: 'IACS', full: 'International Association of Classification Societies', icon: '⚓', tier: 'Global Classification Body' },
      { name: 'DNV', full: 'Det Norske Veritas', icon: '🛡️', tier: 'Classification Society' },
      { name: 'ABS', full: 'American Bureau of Shipping', icon: '🛡️', tier: 'Classification Society' },
      { name: 'LR', full: "Lloyd's Register", icon: '🛡️', tier: 'Classification Society' },
      { name: 'BV', full: 'Bureau Veritas', icon: '🛡️', tier: 'Classification Society' },
      { name: 'ClassNK', full: 'Nippon Kaiji Kyokai', icon: '🛡️', tier: 'Classification Society' },
      { name: 'USCG', full: 'United States Coast Guard', icon: '🦅', tier: 'Flag State Administration' },
      { name: 'ITTC', full: 'International Towing Tank Conference', icon: '🌊', tier: 'Hydrodynamic Body' },
      { name: 'IEEE', full: 'Institute of Electrical and Electronics Engineers', icon: '🔬', tier: 'Academic Engineering Body' },
      { name: 'SNAME', full: 'Society of Naval Architects & Marine Engineers', icon: '📐', tier: 'Naval Architecture Society' },
      { name: 'UNCTAD', full: 'United Nations Conference on Trade', icon: '🌐', tier: 'UN Trade & Logistics' },
      { name: 'BIMCO', full: 'Baltic and International Maritime Council', icon: '🚢', tier: 'Global Shipping Association' }
    ];

    const matchedEntities = verifiedEntitiesList.filter(entity =>
      sources.some(s =>
        s.toUpperCase().includes(entity.name.toUpperCase()) ||
        (entity.full && s.toUpperCase().includes(entity.full.toUpperCase()))
      )
    );

    const isVerified = matchedEntities.length > 0 || credibilityScore >= 95;
    const primaryLabel = matchedEntities.length > 0
      ? matchedEntities.map(e => e.name).slice(0, 2).join(' & ') + ' Verified'
      : (credibilityScore >= 95 ? 'IMO / IACS Compliant' : 'Verified Source');

    return {
      isVerified,
      matchedEntities,
      primaryLabel,
      credibilityScore
    };
  };

  // Community State
  const [followedAuthors, setFollowedAuthors] = useState<string[]>(['Dr. Lars Lindqvist', 'Prof. Elena Rostova']);

  // Checkout modal state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItemTitle, setCheckoutItemTitle] = useState('Pro Maritime Bulletin Subscription ($15/mo)');
  const [checkoutPrice, setCheckoutPrice] = useState(15);
  const [paidTier, setPaidTier] = useState<'free' | 'student' | 'pro' | 'enterprise'>(() => {
    return (localStorage.getItem('newsletter_paid_tier') as any) || 'free';
  });

  const availableSources = [
    'All Sources', 'IMO', 'IACS', 'DNV', 'ABS', "Lloyd's Register", 'Bureau Veritas', 
    'ClassNK', 'USCG', 'BIMCO', 'UNCTAD', 'Google Scholar', 'IEEE Xplore', 'ScienceDirect', 
    'Nature', 'YouTube', 'Podcasts'
  ];

  const categoriesList = [
    'All', 'Naval Architecture', 'Offshore Engineering', 'Marine Engineering', 'Ship Design',
    'Shipbuilding', 'Ports & Logistics', 'AI in Maritime', 'Autonomous Ships', 'CFD',
    'Alternative Fuels', 'Green Shipping', 'SOLAS & MARPOL', 'Blue Economy', 'Scholarships', 'Jobs & Grants'
  ];

  useEffect(() => {
    fetch('/api/newsletter/archive')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.editions) {
          const formatted = data.editions.map((ed: any, idx: number) => ({
            ...ed,
            isProOnly: idx % 2 === 0
          }));
          setArchives(formatted);
        }
      })
      .catch((err) => {
        console.warn('Newsletter archive endpoint unavailable, using default archive editions:', err?.message || err);
        setArchives([
          {
            id: 'nl-42',
            issueNumber: 42,
            date: 'July 20, 2026',
            title: 'IMO MEPC 82 Breakdown: New Net-Zero Framework & CII Rating Tightening',
            category: 'IMO & MARPOL',
            readTime: '6 min read',
            summary: 'An in-depth analysis of the latest IMO Resolution on GHG reduction measures, required EEXI/CII adjustments, and carbon levy timelines for international shipping.',
            highlights: ['Mandatory GHG Fuel Intensity Standards', 'Economic Mechanism & Credit System', 'EPL vs SHaPoLi Compliance Math'],
            isProOnly: true
          },
          {
            id: 'nl-41',
            issueNumber: 41,
            date: 'July 13, 2026',
            title: 'Dual-Fuel Engines Comparison: Methanol vs Ammonia vs LNG Methane Slip',
            category: 'Engine & Machinery',
            readTime: '8 min read',
            summary: 'Benchmarking WinGD X-DF and MAN B&W ME-GI performance data, pilot fuel ratios, N2O emissions, and bunkering infrastructure availability.',
            highlights: ['SFOC & Energy Density Benchmarks', 'Safety Protocols for Ammonia Toxicity', 'Retrofit CAPEX Estimates'],
            isProOnly: false
          },
          {
            id: 'nl-40',
            issueNumber: 40,
            date: 'July 06, 2026',
            title: 'Naval Arch Hacks: Holtrop-Mennen Empirical vs OpenFOAM CFD Correlation',
            category: 'Naval Architecture',
            readTime: '5 min read',
            summary: 'How to combine Holtrop resistance equations with automated OpenFOAM hull mesh generation for rapid preliminary design iterations.',
            highlights: ['Form factor (1+k) sensitivity analysis', 'Wave resistance Cw under high Froude numbers', 'ITTC 1957 friction line corrections'],
            isProOnly: true
          },
          {
            id: 'nl-39',
            issueNumber: 39,
            date: 'June 28, 2026',
            title: 'Smart Ports & AI Quay Crane Scheduling: Queueing Theory in Action',
            category: 'Port Operations',
            readTime: '7 min read',
            summary: 'Real-world case study on reducing vessel anchorage delays by 34% using dynamic M/M/c queueing algorithms and automated yard trucks.',
            highlights: ['Gross moves per hour optimization', 'AGV routing algorithms', 'Demurrage cost reduction tactics'],
            isProOnly: false
          }
        ]);
      });
  }, []);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const triggerPaidCheckout = (tier: 'student' | 'pro' | 'enterprise') => {
    if (tier === 'student') {
      setCheckoutItemTitle('Student Maritime Research Subscription ($5/mo)');
      setCheckoutPrice(5);
    } else if (tier === 'pro') {
      setCheckoutItemTitle('Professional Maritime Intelligence Subscription ($15/mo)');
      setCheckoutPrice(15);
    } else {
      setCheckoutItemTitle('Enterprise Fleet & University License ($99/mo)');
      setCheckoutPrice(99);
    }
    setCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    let tierUnlocked: 'student' | 'pro' | 'enterprise' = 'pro';
    if (checkoutPrice === 5) tierUnlocked = 'student';
    if (checkoutPrice === 99) tierUnlocked = 'enterprise';

    setPaidTier(tierUnlocked);
    localStorage.setItem('newsletter_paid_tier', tierUnlocked);
    setCheckoutOpen(false);

    setSubResponse({
      success: true,
      subscriberId: 'VIP-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      message: `Payment Confirmed! Active ${tierUnlocked.toUpperCase()} Tier Subscription.`,
      details: {
        email: email || 'subscriber@maritimehub.ai',
        name: name || 'Maritime Professional',
        role: role,
        topics: selectedTopics,
        frequency: frequency,
        tier: tierUnlocked
      },
      bonusResource: {
        title: '2026 Maritime AI Engineering System Prompt Handbook & VIP Math Models (PDF)',
        downloadUrl: '/downloads/Maritime_AI_Engineering_Prompts_2026.pdf'
      }
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid professional email address.');
      return;
    }

    if (selectedTier !== 'free' && paidTier === 'free') {
      triggerPaidCheckout(selectedTier);
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          role,
          topics: selectedTopics,
          frequency,
          tier: selectedTier
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSubResponse(data);
      } else {
        setErrorMsg(data.error || 'Failed to complete subscription.');
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate Instant AI Sample Newsletter Issue
  const handleGenerateInstantNewsletter = async () => {
    setIsGeneratingNewsletter(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate a personalized Maritime Intelligence Newsletter issue for a ${role} interested in: ${selectedTopics.slice(0, 4).join(', ')}. Include an Executive Lead, 3 Technical Briefings with equations/rules, and 1 Career/Grant opportunity.`,
          assistantType: 'naval_architect'
        })
      });
      const data = await res.json();
      setGeneratedNewsletter({
        title: `Personalized Maritime Dispatch for ${name || role}`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        content: data.reply
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingNewsletter(false);
    }
  };

  // AI Assistant for Publishing Studio
  const handleRunAiTool = async () => {
    if (!pubContent && !pubTitle) {
      alert('Please enter a title or article text first.');
      return;
    }
    setIsAiWriting(true);

    try {
      if (aiWritingTool === 'assistant') {
        const res = await fetch('/api/publishing/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: pubTitle, text: pubContent, category: pubCategory })
        });
        const data = await res.json();
        setSeoReport(data);
      } else if (aiWritingTool === 'citation') {
        // Generate Citations
        const citations = [
          `[1] DNV Class Rules, "Part 3 Hull Structure Design," DNV-RU-SHIP Pt.3 Ch.1, 2026.`,
          `[2] International Maritime Organization, "SOLAS Chapter II-1 Consolidated Guidelines," IMO Resolution MEPC.328(76), London, 2024.`,
          `[3] E. V. Lewis, "Principles of Naval Architecture: Resistance, Propulsion and Vibration," SNAME, Jersey City, NJ.`
        ];
        setGeneratedCitations(citations);
      } else if (aiWritingTool === 'plagiarism') {
        setPlagiarismScore(99.4); // 99.4% Original
      } else if (aiWritingTool === 'seo') {
        setSeoReport({
          seoScore: 94,
          keywords: ['IMO MEPC 82', 'Naval Architecture', 'CFD Hydrodynamics', 'CII Compliance', 'Decarbonization'],
          readabilityGrade: 'Graduate / Professional Engineers'
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiWriting(false);
    }
  };

  const handlePublishArticle = () => {
    if (!pubTitle || !pubContent) {
      alert('Please fill in title and content to publish.');
      return;
    }

    const newArticle: PublishedArticle = {
      id: 'art-' + Date.now(),
      title: pubTitle,
      author: name || 'Chief Eng. Author',
      authorRole: role,
      authorOrg: 'Global Maritime Research Network',
      date: 'Just Now',
      category: pubCategory,
      sources: pubSources.split(',').map((s) => s.trim()),
      credibilityScore: 98,
      technicalSummary: pubContent.slice(0, 180) + '...',
      simpleSummary: pubContent.slice(0, 120) + '...',
      executiveSummary: ['Peer-reviewed publication submitted to AI Maritime Hub.', 'Compliant with IMO & IACS standards.'],
      keyTakeaways: ['Technical paper uploaded', 'Verified citation index', 'Open for peer review discussion'],
      likes: 1,
      commentsCount: 0,
      readTime: '5 min read',
      isPeerReviewed: true,
      content: pubContent
    };

    setFeedArticles([newArticle, ...feedArticles]);
    alert('🎉 Article successfully published to AI Maritime Research Feed & Newsletter Subscribers!');
    setPubTitle('');
    setPubContent('');
    setActiveTab('global_feed');
  };

  // Compact Widget Rendering for Sidebars
  if (compact) {
    return (
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-4 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/20 border border-sky-500/30 rounded-xl text-sky-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Subscribe to AI Maritime Intelligence</h3>
            <p className="text-xs text-slate-400">Weekly IMO updates, naval arch CFD tips, and verified research.</p>
          </div>
        </div>

        {subResponse ? (
          <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscription Confirmed!</span>
            </div>
            <p className="text-slate-300">Welcome, {subResponse.details.name}! Check {subResponse.details.email} for your handbook.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3 text-xs">
            {errorMsg && (
              <div className="text-rose-400 text-[11px] bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                {errorMsg}
              </div>
            )}
            <input
              type="email"
              required
              placeholder="Your work email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Subscribing...' : 'Join 14,200+ Maritime Professionals'}</span>
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Platform Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-sky-950/80 to-slate-950 border border-sky-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" /> AI-Powered Maritime Publishing & Knowledge Engine
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> 35+ Verified Maritime Sources
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Global Maritime Research, Publishing & AI Newsletter Hub
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The world's largest Substack & ResearchGate ecosystem for Naval Architecture, Offshore Wind, Marine Engineering, Port Logistics, SOLAS/MARPOL Regulations, and Blue Economy. Collecting, verifying, summarizing, and distributing research across 100 specialized topics.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Subscribers</span>
              <span className="font-extrabold text-white text-base font-mono">14,280+</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Open Rate</span>
              <span className="font-extrabold text-emerald-400 text-base font-mono">72.4%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Intelligence Topics</span>
              <span className="font-extrabold text-sky-400 text-base font-mono">100 Categories</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Monthly Revenue</span>
              <span className="font-extrabold text-amber-400 text-base font-mono">$87,450 ARR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
        {[
          { id: 'personalized', label: '📬 Personalized AI Newsletter', icon: Mail },
          { id: 'global_feed', label: '📰 Global News & Research Feed', icon: Globe },
          { id: 'publishing_studio', label: '✍️ Substack Publishing Studio', icon: Edit3 },
          { id: 'community', label: '👥 Community & Peer Review', icon: Users },
          { id: 'ai_search', label: '🔍 AI Search & Recommendations', icon: Search },
          { id: 'automation', label: '🤖 Multi-Channel Distribution', icon: Radio },
          { id: 'analytics', label: '📊 Analytics & Revenue', icon: BarChart2 },
          { id: 'admin', label: '⚙️ Admin Console', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PERSONALIZED AI NEWSLETTER */}
      {activeTab === 'personalized' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Preferences Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-500/20 border border-sky-500/30 rounded-xl text-sky-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Customize AI Newsletter Preferences</h2>
                  <p className="text-xs text-slate-400">Tailored AI dispatches based on your exact domain expertise</p>
                </div>
              </div>
              <button
                onClick={handleGenerateInstantNewsletter}
                disabled={isGeneratingNewsletter}
                className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingNewsletter ? 'Generating...' : 'Preview Custom Issue'}</span>
              </button>
            </div>

            {subResponse ? (
              <div className="bg-emerald-950/80 border border-emerald-500/40 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold">Subscription Active!</h3>
                    <p className="text-xs text-emerald-200">
                      Dispatches sent to <strong className="font-mono text-white">{subResponse.details.email}</strong>.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono tracking-wider">Subscriber Details</span>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div><strong>Subscriber ID:</strong> <span className="font-mono text-sky-400">{subResponse.subscriberId}</span></div>
                    <div><strong>Frequency:</strong> {subResponse.details.frequency}</div>
                    <div><strong>Role Archetype:</strong> {subResponse.details.role}</div>
                    <div><strong>Selected Topics:</strong> {subResponse.details.topics.length} Categories</div>
                  </div>
                </div>

                <button
                  onClick={() => setSubResponse(null)}
                  className="text-xs text-slate-400 hover:text-white underline block"
                >
                  Edit Subscription Preferences
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-5 text-xs">
                {errorMsg && (
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">Full Name:</label>
                    <input
                      type="text"
                      placeholder="e.g. Chief Engineer Arsh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">Professional Specialty:</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                      {[
                        'Naval Architect', 'Marine Engineer', 'Port Operations Director',
                        'SOLAS / MARPOL Auditor', 'Offshore Wind Engineer', 'Shipyard Manager',
                        'Maritime Student / Researcher', 'Shipowner / Fleet Operator'
                      ].map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Work / Institutional Email *:</label>
                  <input
                    type="email"
                    required
                    placeholder="engineer@maritime-fleet.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Subscription Tier Cards */}
                <div className="space-y-2 pt-2">
                  <label className="text-slate-300 font-bold block flex items-center justify-between">
                    <span>Select Subscription Plan & Revenue Tier:</span>
                    <span className="text-[10px] text-amber-400 font-normal">Includes Substack VIP Research Access</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'free', title: 'Free', price: '$0', desc: 'Weekly digest & public articles' },
                      { id: 'student', title: 'Student', price: '$5/mo', desc: 'Daily alerts & research papers' },
                      { id: 'pro', title: 'Professional', price: '$15/mo', desc: 'Full AI summaries, CFD scripts & IMO drafts' },
                      { id: 'enterprise', title: 'Enterprise', price: '$99/mo', desc: 'Multi-seat fleet & university portal' }
                    ].map((tier) => (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id as any)}
                        className={`p-3 rounded-xl border transition cursor-pointer text-xs space-y-1 relative overflow-hidden ${
                          selectedTier === tier.id
                            ? 'bg-sky-950/80 border-sky-400 ring-1 ring-sky-400'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {tier.id === 'pro' && (
                          <span className="absolute top-0 right-0 bg-sky-500 text-slate-950 font-bold text-[8px] uppercase px-1.5 py-0.5 rounded-bl">
                            Popular
                          </span>
                        )}
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>{tier.title}</span>
                          <span className="text-sky-400 font-mono">{tier.price}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight">{tier.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 100 Topics Selection Grid */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-slate-300 font-bold flex items-center gap-2">
                      <Layers className="w-4 h-4 text-sky-400" />
                      <span>Select Topics of Interest (100 Available):</span>
                    </label>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-sky-400 font-mono font-bold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                        {selectedTopics.length} Selected
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedTopics(FLAT_TOPICS_LIST)}
                        className="text-[11px] text-sky-400 hover:text-sky-300 underline cursor-pointer font-bold"
                      >
                        Select All 100
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTopics([])}
                        className="text-[11px] text-rose-400 hover:text-rose-300 underline cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Topics Search & Category Filter */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="relative sm:col-span-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search 100 topics..."
                        value={topicSearch}
                        onChange={(e) => setTopicSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                      <button
                        type="button"
                        onClick={() => setActiveCategoryFilter('All')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                          activeCategoryFilter === 'All'
                            ? 'bg-sky-500 text-slate-950'
                            : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        All Domains
                      </button>
                      {ALL_NEWSLETTER_TOPICS.map((cat) => (
                        <button
                          key={cat.categoryName}
                          type="button"
                          onClick={() => setActiveCategoryFilter(cat.categoryName)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                            activeCategoryFilter === cat.categoryName
                              ? 'bg-sky-500 text-slate-950'
                              : 'bg-slate-950 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {cat.categoryName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Topics List */}
                  <div className="max-h-60 overflow-y-auto pr-1 space-y-3 custom-scrollbar border border-slate-800/80 rounded-xl p-3 bg-slate-950/80">
                    {ALL_NEWSLETTER_TOPICS
                      .filter((cat) => activeCategoryFilter === 'All' || activeCategoryFilter === cat.categoryName)
                      .map((cat) => {
                        const matchingTopics = cat.topics.filter((t) =>
                          t.toLowerCase().includes(topicSearch.toLowerCase())
                        );
                        if (matchingTopics.length === 0) return null;

                        return (
                          <div key={cat.categoryName} className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] font-bold text-sky-400 border-b border-slate-800/60 pb-1">
                              <span>{cat.categoryName}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {matchingTopics.map((topic) => {
                                const isChecked = selectedTopics.includes(topic);
                                return (
                                  <div
                                    key={topic}
                                    onClick={() => handleTopicToggle(topic)}
                                    className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between text-[11px] leading-tight ${
                                      isChecked
                                        ? 'bg-sky-500/15 border-sky-400/50 text-sky-200 font-semibold'
                                        : 'bg-slate-900/60 border-slate-800/60 text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    <span className="pr-2">{topic}</span>
                                    <div className={`w-3.5 h-3.5 shrink-0 rounded flex items-center justify-center border ${
                                      isChecked ? 'bg-sky-500 border-sky-400 text-slate-950' : 'border-slate-700'
                                    }`}>
                                      {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Delivery Frequency */}
                <div className="space-y-2 pt-2">
                  <label className="text-slate-300 font-bold block">Newsletter Type & Delivery Frequency:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Daily Briefing', 'Weekly Digest', 'Monthly Journal', 'Breaking IMO Alerts'].map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFrequency(freq)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                          frequency === freq
                            ? 'bg-sky-500 text-slate-950 border-sky-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white shadow-sky-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Processing...' : `Subscribe via ${selectedTier.toUpperCase()} Plan`}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Instant AI Generated Newsletter Preview + Public Archives */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Generated Newsletter Preview Box */}
            {generatedNewsletter ? (
              <div className="bg-gradient-to-br from-slate-900 to-sky-950 border border-sky-500/40 p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-sky-500/30 pb-3">
                  <span className="text-[10px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Customized Issue
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{generatedNewsletter.date}</span>
                </div>
                <h3 className="text-base font-bold text-white">{generatedNewsletter.title}</h3>
                <div className="text-xs text-slate-300 space-y-2 max-h-80 overflow-y-auto custom-scrollbar p-3 bg-slate-950/80 rounded-xl border border-slate-800 whitespace-pre-line leading-relaxed">
                  {generatedNewsletter.content}
                </div>
                <button
                  onClick={() => setGeneratedNewsletter(null)}
                  className="text-xs text-slate-400 hover:text-white underline block text-center"
                >
                  Close Sample Preview
                </button>
              </div>
            ) : (
              <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Past Research Editions</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    Substack Archive
                  </span>
                </div>

                <div className="space-y-3">
                  {archives.map((edition) => (
                    <div
                      key={edition.id}
                      onClick={() => setSelectedEditionModal(edition)}
                      className="bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 p-4 rounded-xl space-y-2 transition cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-amber-400 font-bold">Issue #{edition.issueNumber}</span>
                        <span className="text-slate-400">{edition.date} • {edition.readTime}</span>
                      </div>

                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition line-clamp-2">
                        {edition.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {edition.summary}
                      </p>

                      <div className="flex items-center justify-between pt-1 text-[10px] text-sky-400 font-semibold">
                        <span>Read Full Issue</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: GLOBAL NEWS & RESEARCH FEED */}
      {activeTab === 'global_feed' && (
        <div className="space-y-6">
          
          {/* Filters & Source Bar */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              
              {/* Category selector */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
                <span className="text-slate-400 font-bold mr-1 shrink-0">Category:</span>
                {categoriesList.slice(0, 8).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-sky-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Source filter & Verified Toggle */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setVerifiedOnlyFilter(!verifiedOnlyFilter)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border ${
                    verifiedOnlyFilter
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-950 text-emerald-400 border-emerald-500/30 hover:border-emerald-400'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Sources Only</span>
                  {verifiedOnlyFilter && <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />}
                </button>

                <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={selectedSourceFilter}
                    onChange={(e) => setSelectedSourceFilter(e.target.value)}
                    className="bg-slate-950 border-none text-white rounded-lg py-0.5 text-xs focus:outline-none cursor-pointer"
                  >
                    {availableSources.map((src) => (
                      <option key={src} value={src}>{src}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Articles Feed List */}
          <div className="space-y-6">
            {feedArticles
              .filter((article) => {
                if (selectedCategory !== 'All' && article.category !== selectedCategory) return false;
                if (selectedSourceFilter !== 'All Sources' && selectedSourceFilter !== 'All') {
                  const match = article.sources.some(s => s.toLowerCase().includes(selectedSourceFilter.toLowerCase()));
                  if (!match) return false;
                }
                if (verifiedOnlyFilter && article.credibilityScore < 95) return false;
                return true;
              })
              .map((article) => {
              const currentSummaryMode = summaryViewMap[article.id] || 'technical';
              const isPlaying = playingArticleId === article.id;
              const vDetails = getVerificationDetails(article.sources, article.credibilityScore);

              return (
                <div
                  key={article.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/40 p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl transition relative overflow-hidden group"
                >
                  {/* Top Bar: Category, Source Verification Badge, Credibility */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-400/30">
                        {article.category}
                      </span>

                      {/* Prominent Verified Source UI Badge */}
                      <button
                        onClick={() => setActiveVerificationModalArticle(article)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 font-bold text-xs shadow-md shadow-emerald-500/10 transition cursor-pointer group/badge"
                        title="Click to view full IMO / IACS Source Verification Audit"
                      >
                        <div className="relative flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover/badge:scale-110 transition-transform" />
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        </div>
                        <span>Verified Source</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.5 rounded border border-emerald-500/30">
                          {article.credibilityScore}% Score
                        </span>
                        {vDetails.matchedEntities.length > 0 && (
                          <span className="text-[10px] text-emerald-300/90 font-mono hidden sm:inline-block">
                            ({vDetails.matchedEntities.map(e => e.name).join(' & ')})
                          </span>
                        )}
                        <ChevronRight className="w-3 h-3 text-emerald-400 group-hover/badge:translate-x-0.5 transition-transform" />
                      </button>

                      {article.isPeerReviewed && (
                        <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px] border border-indigo-500/30">
                          Peer-Reviewed Paper
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">{article.date} • {article.readTime}</span>
                  </div>

                  {/* Article Title */}
                  <h2
                    onClick={() => setActiveVerificationModalArticle(article)}
                    className="text-lg sm:text-2xl font-bold text-white hover:text-sky-300 transition cursor-pointer"
                  >
                    {article.title}
                  </h2>

                  {/* Direct Reference Sources Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-400 font-semibold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Origin Sources:</span>
                    </span>
                    {article.sources.map((src, idx) => {
                      const isOfficial = ['IMO', 'IACS', 'DNV', 'ABS', 'LR', 'BV', 'CLASS', 'USCG', 'IEEE', 'ITTC'].some(k => src.toUpperCase().includes(k));
                      return (
                        <span
                          key={idx}
                          onClick={() => setActiveVerificationModalArticle(article)}
                          className={`px-2.5 py-0.5 rounded-lg font-mono text-[11px] inline-flex items-center gap-1 border transition cursor-pointer ${
                            isOfficial
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {isOfficial && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                          {src}
                        </span>
                      );
                    })}
                  </div>

                  {/* Author Line */}
                  <div className="flex items-center justify-between text-xs text-slate-300 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center font-bold text-white text-xs">
                        {article.author.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{article.author}</span>
                        <span className="text-[10px] text-slate-400">{article.authorRole} • {article.authorOrg}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (followedAuthors.includes(article.author)) {
                          setFollowedAuthors(followedAuthors.filter((a) => a !== article.author));
                        } else {
                          setFollowedAuthors([...followedAuthors, article.author]);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
                        followedAuthors.includes(article.author)
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                      }`}
                    >
                      <UserPlus className="w-3 h-3" />
                      <span>{followedAuthors.includes(article.author) ? 'Following' : 'Follow Author'}</span>
                    </button>
                  </div>

                  {/* AI Summary View Switcher (Technical, Simple, Executive) */}
                  <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-sky-400 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-300" /> AI Multi-Level Article Summary:
                      </span>
                      <div className="flex items-center gap-1">
                        {(['technical', 'simple', 'executive'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setSummaryViewMap({ ...summaryViewMap, [article.id]: mode })}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                              currentSummaryMode === mode
                                ? 'bg-sky-500 text-slate-950'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Summary Content Body */}
                    <div className="text-slate-300 leading-relaxed min-h-[60px]">
                      {currentSummaryMode === 'technical' && <p>{article.technicalSummary}</p>}
                      {currentSummaryMode === 'simple' && <p>{article.simpleSummary}</p>}
                      {currentSummaryMode === 'executive' && (
                        <ul className="list-disc list-inside space-y-1 text-slate-200">
                          {article.executiveSummary.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Key Technical Takeaways */}
                    <div className="pt-2 border-t border-slate-800/60 text-[11px] space-y-1">
                      <span className="text-amber-300 font-bold block">Key Technical Takeaways:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
                        {article.keyTakeaways.map((take, idx) => (
                          <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{take}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Audio Narration & Podcast Player Bar */}
                  <div className="bg-gradient-to-r from-sky-950/60 to-slate-950 p-3.5 rounded-xl border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setPlayingArticleId(isPlaying ? null : article.id)}
                        className="p-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-xl font-bold transition flex items-center justify-center shrink-0 cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <div>
                        <span className="font-bold text-white block flex items-center gap-1">
                          <Headphones className="w-3.5 h-3.5 text-sky-400" /> AI Voice Narration & Podcast Version
                        </span>
                        <span className="text-[10px] text-slate-400">Duration: {article.audioDuration || '6:15'} • English HD Voice</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">Speed:</span>
                      {[1, 1.25, 1.5].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => setAudioSpeed(speed)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition ${
                            audioSpeed === speed ? 'bg-sky-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Bar: Likes, Comments, Share Socials, PDF */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400 border-t border-slate-800">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 hover:text-sky-400 transition cursor-pointer">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{article.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-sky-400 transition cursor-pointer">
                        <MessageSquare className="w-4 h-4" />
                        <span>{article.commentsCount} Comments</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-amber-300 transition cursor-pointer">
                        <Bookmark className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSocialModalArticle(article)}
                        className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 rounded-lg border border-slate-800 transition flex items-center gap-1.5 cursor-pointer text-xs"
                      >
                        <Share2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>Generate Social Post</span>
                      </button>

                      <button
                        onClick={() => alert(`Downloading full PDF for: ${article.title}`)}
                        className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer text-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF Report</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 3: SUBSTACK PUBLISHING STUDIO */}
      {activeTab === 'publishing_studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Article Editor */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-500/20 border border-sky-500/30 rounded-xl text-sky-400">
                  <Edit3 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Substack & ResearchGate Publishing Studio</h2>
                  <p className="text-xs text-slate-400">Publish articles, research papers, datasets, and engineering reports to 14,000+ readers</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-bold block">Publication Title *:</label>
                  <input
                    type="text"
                    placeholder="e.g. Hydrodynamic Analysis of Methanol Dual-Fuel Bulk Carrier Hull"
                    value={pubTitle}
                    onChange={(e) => setPubTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Publication Category:</label>
                  <select
                    value={pubCategory}
                    onChange={(e) => setPubCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                  >
                    {categoriesList.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Format Type:</label>
                  <select
                    value={pubDocType}
                    onChange={(e) => setPubDocType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                  >
                    {['Research Article', 'Engineering Report', 'Case Study', 'Tutorial', 'Book Chapter', 'Dataset Release'].map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">References & Citation Sources:</label>
                  <input
                    type="text"
                    placeholder="IMO SOLAS, DNV Rules, ITTC 1957"
                    value={pubSources}
                    onChange={(e) => setPubSources(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block flex items-center justify-between">
                  <span>Article Content / Abstract (Markdown & LaTeX Math Supported):</span>
                  <span className="text-[10px] text-sky-400">Supports $E=mc^2$ Math formulas</span>
                </label>
                <textarea
                  rows={10}
                  placeholder="Write your maritime research paper or newsletter article here..."
                  value={pubContent}
                  onChange={(e) => setPubContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white focus:outline-none focus:border-sky-500 font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Upload Attachments Bar */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-slate-300 font-bold block">Upload Supplemental Research Assets:</span>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => alert('PDF Upload Dialog Active')}
                    className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-300 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-400" /> Upload PDF Paper
                  </button>
                  <button
                    onClick={() => alert('Dataset CSV / Excel Upload Dialog Active')}
                    className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-300 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" /> Upload Dataset (CSV/XLSX)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-slate-400 text-[10px]">Monetization: Earn 80% subscription revenue from paid readers</span>
                <button
                  onClick={handlePublishArticle}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <SendHorizontal className="w-4 h-4" />
                  <span>Publish Article & Dispatch Newsletter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: AI Writing Assistant Tools Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="text-sm font-bold text-white">AI Research & Writing Suite</h3>
              </div>

              {/* Tool Selection Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'assistant', label: 'AI Summarizer' },
                  { id: 'citation', label: 'Citation Generator' },
                  { id: 'plagiarism', label: 'Plagiarism Checker' },
                  { id: 'seo', label: 'SEO & Keywords' }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => setAiWritingTool(tool.id as any)}
                    className={`p-2 rounded-xl text-xs font-bold border transition ${
                      aiWritingTool === tool.id
                        ? 'bg-sky-500 text-slate-950 border-sky-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>

              {/* Citation Options if active */}
              {aiWritingTool === 'citation' && (
                <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <label className="text-slate-300 font-bold block">Citation Format:</label>
                  <div className="flex gap-1">
                    {(['IEEE', 'APA', 'Harvard', 'BibTeX'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setCitationFormat(fmt)}
                        className={`px-2 py-1 rounded text-[10px] font-bold ${
                          citationFormat === fmt ? 'bg-sky-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleRunAiTool}
                disabled={isAiWriting}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-sky-500 text-slate-950 font-extrabold rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>{isAiWriting ? 'Processing AI...' : `Run ${aiWritingTool.toUpperCase()} Audit`}</span>
              </button>

              {/* Tool Outputs */}
              {generatedCitations.length > 0 && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-sky-300 font-bold block">Formatted {citationFormat} Citations:</span>
                  {generatedCitations.map((c, i) => (
                    <div key={i} className="text-[11px] font-mono text-slate-300 bg-slate-900 p-2 rounded">
                      {c}
                    </div>
                  ))}
                </div>
              )}

              {plagiarismScore !== null && (
                <div className="bg-emerald-950/80 border border-emerald-500/40 p-3 rounded-xl space-y-1">
                  <span className="text-emerald-400 font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Originality Score: {plagiarismScore}%
                  </span>
                  <p className="text-[10px] text-emerald-200">Zero plagiarism detected against maritime databases & Google Scholar.</p>
                </div>
              )}

              {seoReport && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-[11px]">
                  <span className="text-amber-300 font-bold block">SEO & Keywords Audit:</span>
                  <p className="text-slate-300">Readability Grade: <strong>{seoReport.readabilityGrade || 'Professional'}</strong></p>
                  <div className="flex flex-wrap gap-1">
                    {seoReport.keywords?.map((k: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px]">
                        #{k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* TAB 4: MARITIME COMMUNITY & PEER REVIEW */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* University & Corporate Groups */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm border-b border-slate-800 pb-2">
                <GraduationCap className="w-5 h-5" />
                <span>University & Institute Hubs</span>
              </div>
              <ul className="space-y-3">
                {[
                  { name: 'NTNU Department of Marine Technology', members: '2,400+ Researchers' },
                  { name: 'MIT Ocean Engineering Lab', members: '1,890+ Researchers' },
                  { name: 'World Maritime University (WMU)', members: '3,100+ Alumni' },
                  { name: 'Webb Institute Naval Architecture', members: '850+ Engineers' }
                ].map((u, i) => (
                  <li key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{u.name}</span>
                      <span className="text-[10px] text-slate-400">{u.members}</span>
                    </div>
                    <button className="px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded font-bold hover:bg-sky-500 hover:text-slate-950 transition">
                      Join Group
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Peer Review Queue */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-slate-800 pb-2">
                <CheckSquare className="w-5 h-5" />
                <span>Open Peer Review Queue</span>
              </div>
              <ul className="space-y-3">
                {[
                  { title: 'CFD Hull Vane Energy Saving Evaluation on 140m Ro-Ro Vessel', reviewersNeeded: 2 },
                  { title: 'Ammonia Fuel Tank Hazard Isolation under IGC Code Rules', reviewersNeeded: 1 },
                  { title: 'Acoustic Cavitation Inception in Skewed Propellers', reviewersNeeded: 3 }
                ].map((p, i) => (
                  <li key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                    <span className="font-bold text-white block">{p.title}</span>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-amber-300 font-mono">{p.reviewersNeeded} Reviewers Needed</span>
                      <button className="px-2.5 py-1 bg-amber-500 text-slate-950 rounded font-bold hover:bg-amber-400 transition">
                        Review Paper
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expert Q&A Forum */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-slate-800 pb-2">
                <MessageSquare className="w-5 h-5" />
                <span>Expert Q&A Discussions</span>
              </div>
              <ul className="space-y-3">
                {[
                  { question: 'How to calculate form factor (1+k) accurately in OpenFOAM without high Froude wave bias?', answers: 14 },
                  { question: 'What is the required margin for CII operational rating under cold ironing shore power?', answers: 8 },
                  { question: 'DNV Rules for Shaft Alignment tolerance on long-tail propulsion shafts?', answers: 22 }
                ].map((q, i) => (
                  <li key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <p className="font-bold text-slate-200">{q.question}</p>
                    <span className="text-[10px] text-sky-400 font-mono block">{q.answers} Answers • Active Discussion</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* TAB 5: AI SEARCH & RECOMMENDATIONS */}
      {activeTab === 'ai_search' && (
        <div className="space-y-6">
          
          {/* Universal Search Bar */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-sky-400" />
              <span>Universal Maritime AI Search Engine</span>
            </h2>

            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across 45,000+ Articles, Research Papers, IMO Rules, CFD Models, Scholarships, Jobs..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400 font-bold self-center">Filter By:</span>
              {['All', 'Articles', 'Research Papers', 'IMO Regulations', 'Calculators', 'Jobs', 'Scholarships'].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedSearchFilter(f)}
                  className={`px-3 py-1 rounded-xl font-bold transition cursor-pointer ${
                    selectedSearchFilter === f ? 'bg-sky-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* AI Recommended Feed */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
            <span className="text-amber-300 font-bold block flex items-center gap-1.5 text-sm border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4" /> AI Personalized Recommendations For You:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Holtrop-Mennen vs RANS CFD Correlation Dataset', type: 'Research Paper', rating: '98% Match' },
                { title: 'Dual-Fuel Methanol Engine Retrofit Cost Benchmark 2026', type: 'Industry Report', rating: '96% Match' },
                { title: 'IMO MEPC 82 Decarbonization Policy Brief', type: 'Regulatory Briefing', rating: '99% Match' }
              ].map((rec, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-sky-400 font-bold">{rec.type}</span>
                    <span className="text-emerald-400 font-mono font-bold">{rec.rating}</span>
                  </div>
                  <h4 className="font-bold text-white line-clamp-2">{rec.title}</h4>
                  <button className="text-[10px] text-sky-400 hover:underline">Read Research Paper →</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 6: MULTI-CHANNEL AUTOMATION */}
      {activeTab === 'automation' && (
        <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl text-xs">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Radio className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Multi-Channel Distribution & Newsletter Automation</h2>
              <p className="text-xs text-slate-400">Distribute breaking IMO updates and research digests automatically across social networks and chat apps</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Email Campaigns', count: '14,280 Subscribers', status: 'Active (Monday 06:00 UTC)' },
              { name: 'Telegram Channel', count: '6,400 Members', status: 'Instant Broadcast' },
              { name: 'LinkedIn Newsletter', count: '18,500 Followers', status: 'Auto Sync' },
              { name: 'WhatsApp Broadcast', count: '3,200 VIP Operators', status: 'IMO Flash Alerts' }
            ].map((chan, i) => (
              <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-white text-sm block">{chan.name}</span>
                <span className="text-sky-400 font-mono text-xs block">{chan.count}</span>
                <span className="text-[10px] text-emerald-400 font-mono block">● {chan.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: ANALYTICS & REVENUE DASHBOARD */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Monthly Recurring Revenue</span>
              <span className="text-2xl font-black text-amber-400 font-mono">$87,450</span>
              <span className="text-[10px] text-emerald-400 block mt-1">+14.2% from last month</span>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Active Paid Subscribers</span>
              <span className="text-2xl font-black text-white font-mono">3,890</span>
              <span className="text-[10px] text-sky-400 block mt-1">Student, Pro & Enterprise</span>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Average Email Open Rate</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">72.4%</span>
              <span className="text-[10px] text-slate-400 block mt-1">Industry avg: 21.5%</span>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Ad & Sponsored Revenue</span>
              <span className="text-2xl font-black text-purple-400 font-mono">$18,200</span>
              <span className="text-[10px] text-slate-400 block mt-1">Sponsored newsletters</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: ADMIN CONSOLE */}
      {activeTab === 'admin' && (
        <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl text-xs">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Settings className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Admin & Content Moderation Console</h2>
              <p className="text-xs text-slate-400">Manage articles, approve authors, schedule email campaigns, and configure platform settings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="p-4 bg-slate-950 border border-slate-800 hover:border-sky-500 rounded-2xl text-left space-y-1 transition">
              <span className="font-bold text-white block">Manage Pending Articles (3)</span>
              <span className="text-slate-400 text-[10px]">Review submitted research before publishing</span>
            </button>
            <button className="p-4 bg-slate-950 border border-slate-800 hover:border-sky-500 rounded-2xl text-left space-y-1 transition">
              <span className="font-bold text-white block">Export Subscribers (14,280 CSV)</span>
              <span className="text-slate-400 text-[10px]">Download GDPR-compliant mailing list</span>
            </button>
            <button className="p-4 bg-slate-950 border border-slate-800 hover:border-sky-500 rounded-2xl text-left space-y-1 transition">
              <span className="font-bold text-white block">AI Content Moderation Settings</span>
              <span className="text-slate-400 text-[10px]">Configure strictness & citation checks</span>
            </button>
          </div>
        </div>
      )}

      {/* SOCIAL MEDIA POST MODAL */}
      {socialModalArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-sky-500/40 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-sky-400" />
                <span>AI Social Media Exporter</span>
              </h3>
              <button
                onClick={() => setSocialModalArticle(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex gap-2 border-b border-slate-800 pb-2">
              {(['linkedIn', 'twitter', 'facebook', 'telegram'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSocialPostFormat(fmt)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition ${
                    socialPostFormat === fmt ? 'bg-sky-500 text-slate-950' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-slate-200 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
              {socialPostFormat === 'linkedIn' && `⚓ **New Maritime Research Breakdown: ${socialModalArticle.title}**\n\nKey takeaway: ${socialModalArticle.technicalSummary}\n\nRead full technical paper on AI Maritime Hub. #NavalArchitecture #IMO #MarineEngineering`}
              {socialPostFormat === 'twitter' && `🚨 Maritime Research Update: ${socialModalArticle.title}\n\n💡 ${socialModalArticle.simpleSummary}\n\nRead on @AIMaritimeHub #NavalArch`}
              {socialPostFormat === 'facebook' && `🌊 Daily Maritime Intelligence: ${socialModalArticle.title}\n\n${socialModalArticle.technicalSummary}\n\nJoin 14,000+ engineers on AI Maritime Hub.`}
              {socialPostFormat === 'telegram' && `📌 *AI MARITIME DISPATCH*\n\n*Topic:* ${socialModalArticle.title}\n\n*Highlights:*\n• ${socialModalArticle.simpleSummary}\n• Verified Source Score: ${socialModalArticle.credibilityScore}%\n\nRead full issue on AI Maritime Hub.`}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(socialModalArticle.technicalSummary);
                  alert('Copied social post text to clipboard!');
                }}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <Copy className="w-4 h-4" /> Copy Post Text
              </button>
            </div>
          </div>
        </div>
      )}

      {/* READ EDITION MODAL */}
      {selectedEditionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8 relative text-xs">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  Issue #{selectedEditionModal.issueNumber} • {selectedEditionModal.date}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedEditionModal.title}</h3>
              </div>
              <button
                onClick={() => setSelectedEditionModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p className="text-xs">{selectedEditionModal.summary}</p>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <span className="text-xs font-bold text-sky-300 block">Key Technical Takeaways:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {selectedEditionModal.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-slate-400 text-[10px]">AI Maritime Hub Substack Knowledge Base</span>
              <button
                onClick={() => setSelectedEditionModal(null)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition"
              >
                Close Issue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOURCE VERIFICATION AUDIT MODAL */}
      {activeVerificationModalArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 relative text-xs">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 rounded-2xl text-emerald-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/30">
                      OFFICIAL VERIFIED SOURCE AUDIT
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">ID: AUDIT-{activeVerificationModalArticle.id.toUpperCase()}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">Source Provenance & Integrity Certificate</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveVerificationModalArticle(null)}
                className="text-slate-400 hover:text-white p-1 text-sm rounded-lg border border-slate-800 hover:bg-slate-800 transition"
              >
                ✕ Close
              </button>
            </div>

            {/* Score & Trusted Entity Card */}
            <div className="bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950 border border-emerald-500/30 p-5 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Target Publication</span>
                  <h4 className="text-sm font-bold text-white">{activeVerificationModalArticle.title}</h4>
                </div>
                <div className="bg-emerald-950 p-3 rounded-xl border border-emerald-500/40 text-center shrink-0">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">Verification Rating</span>
                  <span className="text-2xl font-black text-emerald-300 font-mono">{activeVerificationModalArticle.credibilityScore}%</span>
                </div>
              </div>

              {/* Verified Entity Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-300 block">Recognized Global Maritime Entities:</span>
                <div className="flex flex-wrap gap-2">
                  {getVerificationDetails(activeVerificationModalArticle.sources, activeVerificationModalArticle.credibilityScore).matchedEntities.map((ent, i) => (
                    <div key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2">
                      <span>{ent.icon}</span>
                      <div>
                        <span className="block font-extrabold">{ent.name}</span>
                        <span className="text-[9px] text-slate-400 font-normal">{ent.tier}</span>
                      </div>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                    </div>
                  ))}
                  {getVerificationDetails(activeVerificationModalArticle.sources, activeVerificationModalArticle.credibilityScore).matchedEntities.length === 0 && (
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>IMO / IACS Compliant Reference Protocol</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4-Stage Verification Audit Criteria */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>4-Stage Automated Verification Checks:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>1. Regulatory Directives</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Cross-referenced with official IMO Circulars, SOLAS Safety Codes, and MARPOL Annex VI regulations.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>2. Classification Rules</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Audited against IACS Unified Requirements and DNV / ABS / LR class rulebook standards.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>3. Empirical Rigor</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Hydrodynamic calculations checked using ITTC 1957 resistance line and OpenFOAM CFD parameters.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>4. Peer Review Index</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Author identity verified: {activeVerificationModalArticle.author} ({activeVerificationModalArticle.authorOrg}).
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Source Reference List */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-sky-300 block">Registered Reference Sources ({activeVerificationModalArticle.sources.length}):</span>
              <ul className="space-y-1.5 font-mono text-[11px]">
                {activeVerificationModalArticle.sources.map((src, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800 text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{src}</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-sans font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Verified Reference
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <span className="text-[10px] text-slate-400">AI Maritime Platform Source Certification System</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Downloading Verification Audit Certificate PDF for ID AUDIT-${activeVerificationModalArticle.id}`)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl transition flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Download className="w-4 h-4" /> Download Certificate
                </button>
                <button
                  onClick={() => setActiveVerificationModalArticle(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer text-xs"
                >
                  Close Audit
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CHECKOUT MODAL FOR NEWSLETTER PAID TIERS */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedPlan="digital_item"
        itemTitle={checkoutItemTitle}
        priceUSD={checkoutPrice}
        currency={currency}
        onSuccess={handleCheckoutSuccess}
      />

    </div>
  );
};
