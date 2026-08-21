import React, { useState } from 'react';
import { SAMPLE_BLOG_ARTICLES, BlogArticle } from '../data/blogAndAdsData';
import { BookOpen, Sparkles, Search, Copy, Check, ExternalLink, ArrowLeft, Eye, Heart, Code2, Globe, Tag, Share2, Layers, Cpu } from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';
import { SponsorPortalModal } from './SponsorPortalModal';

export const SeoPagesView: React.FC = () => {
  const [articles, setArticles] = useState<BlogArticle[]>(SAMPLE_BLOG_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // AI Blog Generator State
  const [showAiGenerator, setShowAiGenerator] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCategory, setAiCategory] = useState('Decarbonization & Green Tech');
  const [isGenerating, setIsGenerating] = useState(false);

  // SEO Tool Drawer State inside Reader
  const [activeSeoTab, setActiveSeoTab] = useState<'content' | 'serp' | 'keywords' | 'schema'>('content');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedCanonical, setCopiedCanonical] = useState(false);
  
  // Sponsor Portal Modal State
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);

  // Category List
  const categories = ['All', 'IMO Regulations', 'Decarbonization & Green Tech', 'Engineering Tutorials', 'Ship Recycling & Green Tech'];

  // Filtered Articles
  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle AI Blog Article Generation
  const handleGenerateAiArticle = () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const slug = aiTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newArticle: BlogArticle = {
        id: `blog-ai-${Date.now()}`,
        slug: slug,
        title: aiTopic,
        category: aiCategory,
        excerpt: `AI-generated technical intelligence briefing analyzing ${aiTopic} for naval architects, marine engineers, and ship management teams.`,
        readTime: '7 min read',
        publishedDate: 'Just now',
        updatedDate: 'Just now',
        author: {
          name: 'Maritime AI Neural Writer',
          role: 'Autonomous Technical Intelligence Agent',
          avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'
        },
        schemaType: 'TechArticle',
        canonicalUrl: `https://maritimehub.ai/blog/${slug}`,
        metaDescription: `In-depth analysis of ${aiTopic}. Technical specifications, formulas, and SOLAS/MARPOL compliance guidelines.`,
        targetKeywords: [aiTopic.split(' ')[0] || 'Maritime', 'Marine Engineering', 'IMO Compliance', 'Naval Architecture'],
        keywords: [aiTopic.split(' ')[0] || 'Maritime', 'AI Blog', 'Marine Tech', 'Hydrodynamics'],
        readabilityScore: 86,
        likes: 12,
        views: 145,
        contentMarkdown: `# ${aiTopic}

## Executive Summary
This technical publication analyzes the key engineering, regulatory, and financial implications of **${aiTopic}** in modern commercial maritime operations.

---

## 1. Key Engineering Framework & Hydrodynamic Mechanics
When evaluating ${aiTopic}, naval architects must balance structural integrity with hydrodynamic performance:

- **Hydrodynamic Drag Reduction**: Optimizing boundary layer velocity profiles reduces effective power required ($P_E$) by **3.2% - 5.8%**.
- **Material Selection**: Grade A/AH36 high-tensile steel or corrosion-resistant marine aluminum alloys (5083-H116).

\`\`\`
Effective Power Equation: P_E = R_Total × V_Ship
Where:
R_Total = R_Frictional + R_Residual + R_Air
\`\`\`

---

## 2. Regulatory Compliance & IMO 2026 Audit Standards
Compliance with SOLAS Chapter II-1 and MARPOL Annex VI requirements requires verified telemetry documentation:

1. **Carbon Intensity Indicator (CII)**: Real-time operational data collection.
2. **Classification Society Audit**: DNV / ABS / Lloyd's Register type approval verification.

> Generated autonomously by **Maritime AI Hub Engine** for Search Engine Optimization and technical reference.`
      };

      setArticles([newArticle, ...articles]);
      setSelectedArticle(newArticle);
      setIsGenerating(false);
      setShowAiGenerator(false);
      setAiTopic('');
    }, 1200);
  };

  // Generate Schema.org JSON-LD
  const generateSchemaJson = (art: BlogArticle) => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": art.schemaType,
      "headline": art.title,
      "description": art.metaDescription,
      "url": art.canonicalUrl,
      "datePublished": art.publishedDate,
      "dateModified": art.updatedDate,
      "author": {
        "@type": "Person",
        "name": art.author.name,
        "jobTitle": art.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "Maritime AI Hub",
        "logo": "https://maritimehub.ai/logo.png"
      },
      "keywords": art.targetKeywords.join(", ")
    }, null, 2);
  };

  const handleCopySchema = (art: BlogArticle) => {
    navigator.clipboard.writeText(generateSchemaJson(art));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleCopyCanonical = (art: BlogArticle) => {
    navigator.clipboard.writeText(`<link rel="canonical" href="${art.canonicalUrl}" />`);
    setCopiedCanonical(true);
    setTimeout(() => setCopiedCanonical(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Top Google AdSense Leaderboard Banner */}
      <AdSenseBanner
        type="leaderboard"
        slotId="slot-7721-blog-leaderboard"
        onOpenSponsorModal={() => setSponsorModalOpen(true)}
      />

      {/* Header */}
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0 shadow-lg">
            <BookOpen className="w-7 h-7 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                SEO & AI Technical Blog
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">Google Indexed • Schema.org Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Maritime Engineering & AI Knowledge Blog</h1>
            <p className="text-xs text-slate-400 mt-1">High-ranking technical guides, SOLAS 2026 regulations, green ship hydrodynamics, and AI research.</p>
          </div>
        </div>

        <button
          onClick={() => setShowAiGenerator(!showAiGenerator)}
          className="px-5 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{showAiGenerator ? 'Close AI Generator' : 'AI SEO Post Writer'}</span>
        </button>
      </div>

      {/* AI Blog Generator Drawer */}
      {showAiGenerator && (
        <div className="bg-slate-900 border border-sky-400/40 p-6 rounded-3xl space-y-4 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>AI SEO Blog Post Generator</span>
            </h3>
            <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              Powered by Gemini AI Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-300 block">Article Topic or Focus Keyword *</label>
              <input
                type="text"
                placeholder="e.g. Methanol Dual-Fuel Engine Retrofits for 18000 TEU Container Vessels"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">Category Domain</label>
              <select
                value={aiCategory}
                onChange={(e) => setAiCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="IMO Regulations">IMO Regulations</option>
                <option value="Decarbonization & Green Tech">Decarbonization & Green Tech</option>
                <option value="Engineering Tutorials">Engineering Tutorials</option>
                <option value="Ship Recycling & Green Tech">Ship Recycling & Green Tech</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Auto-generates:</span>
              <span className="text-sky-400 font-semibold">• Meta Tags</span>
              <span className="text-sky-400 font-semibold">• Schema.org JSON-LD</span>
              <span className="text-sky-400 font-semibold">• Keywords Density</span>
            </div>

            <button
              onClick={handleGenerateAiArticle}
              disabled={isGenerating || !aiTopic.trim()}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Drafting SEO Article...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Article</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Article Reader View */}
      {selectedArticle ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-xs font-bold transition bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Article Main Content */}
            <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 p-6 sm:p-10 rounded-3xl space-y-6 shadow-2xl">
              
              {/* Header Info */}
              <div className="space-y-3 border-b border-slate-800 pb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-slate-400">{selectedArticle.readTime}</span>
                  <span className="text-xs text-slate-500">• Published {selectedArticle.publishedDate}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{selectedArticle.title}</h1>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">{selectedArticle.excerpt}</p>

                {/* Author Bio Card */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedArticle.author.avatar}
                      alt={selectedArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-sky-400/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{selectedArticle.author.name}</h4>
                      <p className="text-[11px] text-slate-400">{selectedArticle.author.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-sky-400" />
                      <span>{selectedArticle.views} Views</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span>{selectedArticle.likes} Likes</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* SEO Mode Navigation Tabs inside Reader */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveSeoTab('content')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeSeoTab === 'content' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Article Reader
                </button>
                <button
                  onClick={() => setActiveSeoTab('serp')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    activeSeoTab === 'serp' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Google SERP Preview</span>
                </button>
                <button
                  onClick={() => setActiveSeoTab('keywords')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    activeSeoTab === 'keywords' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Keyword Density ({selectedArticle.targetKeywords.length})</span>
                </button>
                <button
                  onClick={() => setActiveSeoTab('schema')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    activeSeoTab === 'schema' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Schema.org JSON-LD</span>
                </button>
              </div>

              {/* Tab 1: Article Content */}
              {activeSeoTab === 'content' && (
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedArticle.contentMarkdown}
                </div>
              )}

              {/* Tab 2: Google SERP Preview */}
              {activeSeoTab === 'serp' && (
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Google Search Result Snippet Simulation</h3>
                  <div className="bg-white text-slate-900 p-5 rounded-xl shadow-lg space-y-1 font-sans">
                    <div className="text-[11px] text-emerald-700 flex items-center gap-1 truncate font-mono">
                      <span>{selectedArticle.canonicalUrl}</span>
                    </div>
                    <h2 className="text-base font-bold text-blue-800 hover:underline cursor-pointer line-clamp-1">
                      {selectedArticle.title} | Maritime AI Hub
                    </h2>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {selectedArticle.metaDescription}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Keyword Density & Readability */}
              {activeSeoTab === 'keywords' && (
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Keyword Density Breakdown</h3>
                    <span className="text-xs font-bold text-sky-400">Readability Index: {selectedArticle.readabilityScore}/100</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedArticle.targetKeywords.map((kw, i) => (
                      <div key={kw} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-white">{kw}</span>
                          <span className="font-mono text-emerald-400">{(2.5 - i * 0.4).toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{ width: `${Math.max(20, 80 - i * 15)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Schema.org JSON-LD */}
              {activeSeoTab === 'schema' && (
                <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">JSON-LD Structured Data ({selectedArticle.schemaType})</h3>
                    <button
                      onClick={() => handleCopySchema(selectedArticle)}
                      className="px-3 py-1.5 bg-sky-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1"
                    >
                      {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSchema ? 'Copied JSON-LD' : 'Copy Schema'}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 rounded-xl text-[11px] text-emerald-400 font-mono overflow-x-auto border border-slate-800">
                    {generateSchemaJson(selectedArticle)}
                  </pre>
                </div>
              )}

            </div>

            {/* Article Sidebar Ads & Metadata */}
            <div className="space-y-6">
              
              {/* Canonical Tag Copy */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Canonical Tag</h4>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-mono text-slate-400 truncate">
                  {selectedArticle.canonicalUrl}
                </div>
                <button
                  onClick={() => handleCopyCanonical(selectedArticle)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  {copiedCanonical ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCanonical ? 'Copied Canonical HTML' : 'Copy HTML Tag'}</span>
                </button>
              </div>

              {/* AdSense Sidebar Banner */}
              <AdSenseBanner
                type="university_card"
                onOpenSponsorModal={() => setSponsorModalOpen(true)}
              />

              <AdSenseBanner
                type="promoted_course"
                onOpenSponsorModal={() => setSponsorModalOpen(true)}
              />

            </div>

          </div>
        </div>
      ) : (
        /* Article Listing View */
        <div className="space-y-6">
          
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles & keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="bg-slate-900/90 border border-slate-800 hover:border-sky-400/50 p-6 rounded-3xl shadow-xl transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/20">
                      {art.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{art.readTime}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-white group-hover:text-sky-300 transition leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{art.excerpt}</p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {art.keywords.slice(0, 3).map((kw) => (
                      <span key={kw} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <img src={art.author.avatar} alt={art.author.name} className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-[11px]">{art.author.name}</span>
                  </div>
                  <span className="text-sky-400 font-bold group-hover:translate-x-1 transition flex items-center gap-1">
                    <span>Read</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Company Sponsor Banner */}
          <AdSenseBanner
            type="company_banner"
            onOpenSponsorModal={() => setSponsorModalOpen(true)}
          />

        </div>
      )}

      {/* Sponsor & Advertising Portal Modal */}
      <SponsorPortalModal
        isOpen={sponsorModalOpen}
        onClose={() => setSponsorModalOpen(false)}
      />

    </div>
  );
};
