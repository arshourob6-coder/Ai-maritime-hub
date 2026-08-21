import React, { useState, useEffect } from 'react';
import { PlanType, ViewMode } from '../types';
import {
  Sparkles,
  BookOpen,
  FileText,
  Bot,
  Layers,
  GraduationCap,
  Calculator,
  Cpu,
  Database,
  Quote,
  PenTool,
  BookmarkCheck,
  Send,
  Users,
  Building2,
  Briefcase,
  Lightbulb,
  DollarSign,
  BarChart3,
  Brain,
  Search,
  Download,
  Upload,
  Copy,
  CheckCircle2,
  AlertCircle,
  Clock,
  Play,
  Share2,
  Terminal,
  ExternalLink,
  ChevronRight,
  Filter,
  Zap,
  Globe,
  Award,
  RefreshCw,
  FolderGit2,
  Tag,
  Kanban,
  FileCode2,
  Check,
  HelpCircle,
  Lock,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import {
  INITIAL_RESEARCH_TOPICS,
  TOP_JOURNALS,
  UPCOMING_CONFERENCES,
  FUNDING_DATABASE,
  MARITIME_PATENTS_DB,
  GLOBAL_MARITIME_DATASETS,
  UNIVERSITY_RANKINGS,
  ResearchTopic,
  JournalInfo,
  ConferenceInfo,
  FundingOpportunity,
  MaritimePatentItem,
  DatasetItem
} from './research/ResearchData';
import { AiReviewerTool } from './research/AiReviewerTool';

interface Props {
  userPlan?: PlanType;
  onOpenPricing?: (plan?: PlanType) => void;
  onSelectView?: (view: ViewMode) => void;
  initialPillar?: number;
}

export const MaritimeResearchPlatformView: React.FC<Props> = ({
  userPlan = 'student',
  onOpenPricing,
  onSelectView,
  initialPillar = 1
}) => {
  // Active Navigation Pillar (1 to 20)
  const [activePillar, setActivePillar] = useState<number>(initialPillar);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ----------------------------------------------------
  // Pillar 1: Research Discovery Hub State
  // ----------------------------------------------------
  const [selectedField, setSelectedField] = useState<string>('Naval Architecture');
  const [generatedTopics, setGeneratedTopics] = useState<ResearchTopic[]>(INITIAL_RESEARCH_TOPICS);
  const [isGeneratingTopic, setIsGeneratingTopic] = useState(false);
  const [customKeyword, setCustomKeyword] = useState('');
  const [trendSearch, setTrendSearch] = useState('');

  const maritimeFields = [
    'Naval Architecture',
    'Marine Engineering',
    'Offshore Engineering',
    'Port & Logistics',
    'Shipbuilding',
    'Maritime AI',
    'Renewable Energy',
    'Ship Recycling',
    'Autonomous Ships',
    'Blue Economy'
  ];

  const handleGenerateTopic = () => {
    setIsGeneratingTopic(true);
    setTimeout(() => {
      const newTopic: ResearchTopic = {
        id: `rt-${Date.now()}`,
        field: selectedField,
        category: selectedField as any,
        title: `AI-Driven Multiphysics Optimization of ${selectedField} Systems with Real-Time Boundary Layer & Hydrodynamic Physics Constraints`,
        gapDescription: `Current computational tools lack real-time coupling between fluid-structure interaction (FSI) and operational carbon intensity (CII) under non-stationary metocean conditions.`,
        noveltyScore: Math.floor(Math.random() * 8 + 92),
        complexity: 'High',
        potentialJournals: ['Ocean Engineering', 'Applied Ocean Research', 'IEEE Journal of Oceanic Engineering'],
        trendingKeywords: [selectedField, 'PINN', 'Decarbonization', 'Nonlinear Hydrodynamics', 'CII Grade A'],
        suggestedMethodology: 'Hybrid High-Order BEM with Deep Neural Operator surrogate models trained on wave tank validation experiments.',
        trlLevel: 3
      };
      setGeneratedTopics([newTopic, ...generatedTopics]);
      setIsGeneratingTopic(false);
    }, 900);
  };

  // ----------------------------------------------------
  // Pillar 2: Literature Review Assistant State
  // ----------------------------------------------------
  const [litSearchQuery, setLitSearchQuery] = useState('Hydrodynamic drag reduction air lubrication container ship');
  const [selectedDatabase, setSelectedDatabase] = useState<'all' | 'scopus' | 'ieee' | 'sciencedirect' | 'springer' | 'mdpi'>('all');
  const [isSearchingLit, setIsSearchingLit] = useState(false);
  const [litMatrixActive, setLitMatrixActive] = useState(false);

  // ----------------------------------------------------
  // Pillar 3: Research Paper Intelligence State
  // ----------------------------------------------------
  const [uploadedPaperTitle, setUploadedPaperTitle] = useState('Experimental & Numerical Investigation of Wing Sails on VLCC Tankers');
  const [paperAnalysisMode, setPaperAnalysisMode] = useState<'abstract' | 'findings' | 'methodology' | 'limitations' | 'critical_review' | 'future_work'>('findings');
  const [isAnalyzingPaper, setIsAnalyzingPaper] = useState(false);

  // ----------------------------------------------------
  // Pillar 4: AI Research Assistant (Interactive Copilot)
  // ----------------------------------------------------
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState('Explain how Holtrop-Mennen statistical method calculates form factor (1+k1) and where it loses accuracy for high-block coefficient blunt hulls.');
  const [aiAssistantResponses, setAiAssistantResponses] = useState<{ query: string; answer: string; timestamp: string }[]>([
    {
      query: 'What are the main assumptions of strip theory in ship seakeeping in irregular waves?',
      answer: 'Strip theory (Salvesen, Tuck, and Faltinsen, 1970) assumes:\n1. The ship is slender ($L \\gg B, D$).\n2. Forward speed $U$ is moderate (Froude number $Fn < 0.4$).\n3. High-frequency wave oscillation assumption where transverse 2D hydrodynamic flow dominates.\n4. Linear superposition of wave excitation forces and radiation damping coefficients across each transverse station.\n\nLimitations: Strip theory loses accuracy for high-speed catamarans ($Fn > 0.45$) and large-amplitude nonlinear pitching/slamming in extreme sea states.',
      timestamp: '10:14 AM'
    }
  ]);
  const [isCopilotTyping, setIsCopilotTyping] = useState(false);

  const handleAskCopilot = () => {
    if (!aiAssistantPrompt.trim()) return;
    setIsCopilotTyping(true);
    const q = aiAssistantPrompt;
    setAiAssistantPrompt('');
    setTimeout(() => {
      let ans = '';
      if (q.toLowerCase().includes('holtrop') || q.toLowerCase().includes('form factor')) {
        ans = `Holtrop & Mennen (1982) form factor formulation:\n\n$(1+k_1) = 0.93 + 0.487118 \\cdot c_{14} \\cdot \\left(\\frac{B}{L}\\right)^{1.06806} \\cdot \\left(\\frac{T}{L}\\right)^{0.46106} \\cdot \\left(\\frac{L}{L_R}\\right)^{0.121563} \\cdot \\left(\\frac{L^3}{\\nabla}\\right)^{0.36486} \\cdot (1 - C_P)^{-0.604247}$\n\n**Key Limitations for Blunt Hulls ($C_B > 0.82$, e.g., VLCCs/Capesize):**\n1. Severe 3D boundary layer separation at the aft shoulder is not fully captured.\n2. Over-predicts viscous resistance when stern lines have severe concave bulbous skegs.\n3. Recommendation: Perform Reynolds-Averaged Navier-Stokes (RANS) CFD with SST $k$-$\\omega$ turbulence modeling for $C_B > 0.80$.`;
      } else if (q.toLowerCase().includes('methodology') || q.toLowerCase().includes('proposal')) {
        ans = `Recommended Academic Methodology Architecture:\n1. **Analytical Phase**: Establish governing partial differential equations (Navier-Stokes / Airy Wave Potential).\n2. **Numerical Phase**: Discretize domain with boundary element method (BEM) or finite volume (OpenFOAM) with grid convergence index (GCI) verification.\n3. **Validation Phase**: Compare numerical skin friction ($C_F$) and wave elevation ($\\\\zeta$) against ITTC-1978 recommended baseline data.\n4. **Uncertainty Quantification**: Monte Carlo sensitivity analysis across Froude numbers and ballast draft conditions.`;
      } else {
        ans = `AI Maritime Analysis for: "${q}"\n\n- **Theoretical Framework**: Formulated according to ITTC & IMO Marine Environment Protection Committee (MEPC) guidelines.\n- **Mathematical Model**: Governed by continuity equation $\\nabla \\cdot \\mathbf{u} = 0$ and momentum conservation with nonlinear surface tension.\n- **Recommended Next Step**: Formulate a hypothesis-driven pilot simulation and evaluate against Class Society (DNV/ABS) rulebook design limits.`;
      }
      setAiAssistantResponses(prev => [...prev, { query: q, answer: ans, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsCopilotTyping(false);
    }, 850);
  };

  // ----------------------------------------------------
  // Pillar 5: Research Project Workspace State
  // ----------------------------------------------------
  const [workspaceTab, setWorkspaceTab] = useState<'ai_reviewer' | 'notebook' | 'timeline' | 'kanban' | 'team'>('ai_reviewer');
  const [notebookContent, setNotebookContent] = useState(
`# Research Project: AI-Coupled Wave Resistance Optimization
**Principal Investigator**: Capt. Dr. A. Shourob (Department of Naval Architecture)
**Target Journal**: Ocean Engineering (Elsevier)

## 1. Mathematical Formulation
The total hydrodynamic resistance $R_T$ is decomposed according to the ITTC-1978 scheme:
$$R_T = (1 + k_1) R_{FO} + R_W + R_{APP} + R_A$$

Where:
- $R_{FO}$: Frictional resistance of equivalent flat plate (ITTC-1957 line)
- $(1 + k_1)$: Viscous form factor
- $R_W$: Free-surface wave-making resistance
- $R_A$: Correlation roughness allowance

## 2. Experimental Towing Tank Test Matrix
- Model Scale: $\\lambda = 1:40$
- Froude Number Range: $Fn \\in [0.12, 0.28]$ (Step $0.02$)
- Carriage Velocity: $v_m = 0.85 - 1.98 \\text{ m/s}$
- Water Temp: $18.5^\\circ\\text{C}$ (Kinematic Viscosity $\\nu = 1.042 \\times 10^{-6} \\text{ m}^2/\\text{s}$)

## 3. Preliminary Finding
Bulbous bow protrusion ratio $L_{pr} / L_{WL} = 0.038$ creates destructive wave interference, cancelling the primary bow divergent wave crest by $28.4\\%$ at $Fn = 0.22$.`
  );

  // ----------------------------------------------------
  // Pillar 6: Thesis & Dissertation Assistant State
  // ----------------------------------------------------
  const [thesisField, setThesisField] = useState('Naval Architecture');
  const [thesisDegree, setThesisDegree] = useState<'BSc' | 'MSc' | 'PhD'>('PhD');
  const [thesisTitleInput, setThesisTitleInput] = useState('Autonomous Ship Collision Avoidance using Multi-Agent Reinforcement Learning and AIS Big Data');
  const [thesisProposalGenerated, setThesisProposalGenerated] = useState(false);
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);
  const [activeThesisChapter, setActiveThesisChapter] = useState<number>(1);

  const handleGenerateProposal = () => {
    setIsGeneratingProposal(true);
    setTimeout(() => {
      setThesisProposalGenerated(true);
      setIsGeneratingProposal(false);
    }, 1000);
  };

  // ----------------------------------------------------
  // Pillar 7: Research Methodology Hub State
  // ----------------------------------------------------
  const [methodologyCategory, setMethodologyCategory] = useState<'quantitative' | 'qualitative' | 'engineering'>('engineering');
  const [cfdMeshCells, setCfdMeshCells] = useState(4500000);
  const [turbulenceModel, setTurbulenceModel] = useState<'k-omega SST' | 'k-epsilon Realizable' | 'Spalart-Allmaras' | 'LES (Large Eddy)'>('k-omega SST');
  const [yPlusValue, setYPlusValue] = useState(1.2);

  // ----------------------------------------------------
  // Pillar 8: Data Science & AI Lab State
  // ----------------------------------------------------
  const [activeNotebookLang, setActiveNotebookLang] = useState<'python' | 'matlab'>('python');
  const [pythonScript, setPythonScript] = useState(
`import numpy as np
import torch
import torch.nn as nn

# Physics-Informed Neural Network (PINN) for Hull Pressure Distribution
class ShipPINN(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(3, 128),  # (x, y, z) hull coordinates
            nn.Tanh(),
            nn.Linear(128, 128),
            nn.Tanh(),
            nn.Linear(128, 4)   # (u, v, w velocity + p pressure)
        )
    
    def forward(self, coords):
        return self.net(coords)

model = ShipPINN().cuda() if torch.cuda.is_available() else ShipPINN()
print("[CUDA CORE] Physics-Informed Neural Network initialized.")
print("[SOLVER] Enforcing Navier-Stokes momentum residuals along wetted surface.")
print("[READY] Dataset: DTC Container Ship 14,000 TEU Hull Mesh.")
`
  );
  const [executingCode, setExecutingCode] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    'Python 3.11.8 (OpenFOAM 11 + PyTorch 2.3 CUDA 12.1 Environment)',
    'NVIDIA H100 SXM5 80GB Active • Device: cuda:0',
    'Ready for execution.'
  ]);
  const [pinnLoss, setPinnLoss] = useState<number[]>([0.84, 0.62, 0.41, 0.28, 0.19, 0.12, 0.082, 0.045, 0.023]);

  const handleRunCode = () => {
    setExecutingCode(true);
    setTimeout(() => {
      setExecutionLogs(prev => [
        ...prev,
        `>>> Executing Python Script...`,
        `[TRAINING] Epoch 100/1000 - Loss: 0.0384 - Continuity Residual: 1.2e-5`,
        `[TRAINING] Epoch 500/1000 - Loss: 0.0142 - Momentum Residual: 8.4e-6`,
        `[TRAINING] Epoch 1000/1000 - Loss: 0.0028 - Wave Drag Cp Convergence: 99.4%`,
        `[SUCCESS] Model weights exported to 'ship_pinn_model.pt' (14.2 MB).`,
        `[EVALUATION] Mean Absolute Error vs Towing Tank: 1.84% (Passed Class Society Spec).`
      ]);
      setExecutingCode(false);
    }, 1100);
  };

  // ----------------------------------------------------
  // Pillar 10: Citation & Reference Manager State
  // ----------------------------------------------------
  const [citationFormat, setCitationFormat] = useState<'APA' | 'IEEE' | 'Harvard' | 'Vancouver' | 'Chicago' | 'BibTeX'>('IEEE');
  const [searchDoi, setSearchDoi] = useState('10.1016/j.oceaneng.2024.116892');
  const [resolvedCitation, setResolvedCitation] = useState({
    title: 'Hydrodynamic Optimization of Bulbous Bow for Ultra-Large Container Ships Using Surrogate Modeling',
    authors: 'Shourob, A., Larsson, L., & Bertram, V.',
    journal: 'Ocean Engineering',
    volume: '298',
    pages: '116892',
    year: '2024',
    doi: '10.1016/j.oceaneng.2024.116892'
  });

  const getFormattedCitation = () => {
    switch (citationFormat) {
      case 'IEEE':
        return `[1] A. Shourob, L. Larsson, and V. Bertram, "${resolvedCitation.title}," *Ocean Engineering*, vol. ${resolvedCitation.volume}, p. ${resolvedCitation.pages}, ${resolvedCitation.year}, doi: ${resolvedCitation.doi}.`;
      case 'APA':
        return `Shourob, A., Larsson, L., & Bertram, V. (${resolvedCitation.year}). ${resolvedCitation.title}. *Ocean Engineering*, ${resolvedCitation.volume}, ${resolvedCitation.pages}. https://doi.org/${resolvedCitation.doi}`;
      case 'Harvard':
        return `Shourob, A., Larsson, L. and Bertram, V., ${resolvedCitation.year}. ${resolvedCitation.title}. *Ocean Engineering*, ${resolvedCitation.volume}, p.${resolvedCitation.pages}.`;
      case 'BibTeX':
        return `@article{shourob2024hydrodynamic,\n  title={${resolvedCitation.title}},\n  author={Shourob, A. and Larsson, L. and Bertram, V.},\n  journal={Ocean Engineering},\n  volume={${resolvedCitation.volume}},\n  pages={${resolvedCitation.pages}},\n  year={${resolvedCitation.year}},\n  publisher={Elsevier},\n  doi={${resolvedCitation.doi}}\n}`;
      case 'Chicago':
        return `Shourob, A., L. Larsson, and V. Bertram. "${resolvedCitation.title}." *Ocean Engineering* ${resolvedCitation.volume} (${resolvedCitation.year}): ${resolvedCitation.pages}.`;
      case 'Vancouver':
        return `1. Shourob A, Larsson L, Bertram V. ${resolvedCitation.title}. Ocean Eng. ${resolvedCitation.year};${resolvedCitation.volume}:${resolvedCitation.pages}.`;
    }
  };

  // ----------------------------------------------------
  // Pillar 11: AI Academic Writing Assistant State
  // ----------------------------------------------------
  const [writingTool, setWritingTool] = useState<'grammar' | 'technical_rewrite' | 'paraphrase' | 'academic_tone' | 'cover_letter'>('technical_rewrite');
  const [inputWritingText, setInputWritingText] = useState(
    "We did a test in the water tank to see if the ship uses less fuel with bubbles. The bubbles made the drag go down by 10% which is very good."
  );
  const [outputWritingText, setOutputWritingText] = useState(
    "Hydrodynamic towing tank experiments were conducted to evaluate boundary layer frictional drag reduction via micro-bubble air lubrication. Experimental results demonstrated a statistically significant 10.2% reduction in total viscous resistance ($C_V$), substantiating its efficacy for voyage fuel economy."
  );
  const [isImprovingText, setIsImprovingText] = useState(false);

  const handleImproveWriting = () => {
    setIsImprovingText(true);
    setTimeout(() => {
      if (writingTool === 'cover_letter') {
        setOutputWritingText(
`Dear Editor-in-Chief,

I am pleased to submit our original research article titled "Physics-Informed Neural Networks for Real-Time Wave Drag Prediction in Extreme Sea States" for consideration of publication in Ocean Engineering.

In this work, we present a novel hybrid computational framework that addresses the longstanding trade-off between numerical fidelity and computational latency in ship hydrodynamics. Our proposed architecture achieves a 99.4% accuracy correlation with experimental towing tank benchmarks while reducing inference time to 14 milliseconds.

This manuscript is original, has not been published previously, and is not under consideration elsewhere. All authors have approved the manuscript and agree with its submission to Ocean Engineering.

Sincerely,
Dr. A. Shourob
Department of Naval Architecture & Marine Engineering`
        );
      } else {
        setOutputWritingText(
`Experimental hydrodynamic towing tank evaluations were performed to quantify viscous boundary layer friction mitigation via micro-bubble air injection. The empirical data demonstrated an optimal 10.4% reduction in total hydrodynamic resistance ($R_T$), establishing a viable pathway for IMO EEXI and CII decarbonization compliance.`
        );
      }
      setIsImprovingText(false);
    }, 750);
  };

  // ----------------------------------------------------
  // Pillar 12: Journal & Conference Intelligence State
  // ----------------------------------------------------
  const [journalSearchAbstract, setJournalSearchAbstract] = useState(
    "This study investigates turbulent flow and free-surface wave resistance around a 14,000 TEU container vessel using physics-informed neural networks and OpenFOAM verification."
  );
  const [journalFilter, setJournalFilter] = useState('All');

  // ----------------------------------------------------
  // Pillar 13: Publication Assistant State
  // ----------------------------------------------------
  const [publicationDocType, setPublicationDocType] = useState<'article' | 'conference' | 'technical_report' | 'review_paper'>('article');
  const [reviewerComment, setReviewerComment] = useState(
    "Reviewer #2: The authors have not provided grid convergence index (GCI) verification for the CFD mesh. How can the reader trust that the 10% drag reduction is not a numerical discretization artifact?"
  );
  const [reviewerResponseGenerated, setReviewerResponseGenerated] = useState(
`**Response to Reviewer #2 (Comment 1):**

We thank Reviewer #2 for this critical and insightful observation regarding numerical uncertainty quantification. 

**Action Taken:**
In the revised manuscript (Section 3.4, Pages 12-14, Table 4), we have incorporated a comprehensive Grid Convergence Index (GCI) analysis following the standard ITTC Recommended Procedures (7.5-03-01-01) and Celik et al. (2008). 

Three systematically refined unstructured meshes were evaluated:
- Coarse Mesh ($N_3 = 1.85 \\times 10^6$ cells)
- Medium Mesh ($N_2 = 4.50 \\times 10^6$ cells)
- Fine Mesh ($N_1 = 11.20 \\times 10^6$ cells)

The apparent order of convergence was calculated as $p = 1.94$, yielding a fine-grid numerical uncertainty $GCI_{21} = 0.42\\%$. This confirms that the observed $10.2\\%$ drag reduction exceeds numerical uncertainty by more than an order of magnitude.`
  );

  // ----------------------------------------------------
  // Pillar 20: 8 Autonomous AI Research Agents State
  // ----------------------------------------------------
  const [activeAgentId, setActiveAgentId] = useState<string>('lit_agent');
  const [agentRunning, setAgentRunning] = useState<boolean>(false);
  const [agentProgress, setAgentProgress] = useState<number>(0);
  const [agentResult, setAgentResult] = useState<string | null>(null);

  const aiAgents = [
    {
      id: 'lit_agent',
      name: 'Literature Review Agent',
      icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
      description: 'Synthesizes 50+ papers into a structured matrix with methodology breakdown and research gaps.',
      outputFormat: 'Systematic Literature Review (SLR) Matrix'
    },
    {
      id: 'thesis_agent',
      name: 'Thesis & Dissertation Agent',
      icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
      description: 'Drafts comprehensive proposal, chapter outlines, research questions, and defense slides.',
      outputFormat: 'Proposal & Chapters 1-6 Plan'
    },
    {
      id: 'citation_agent',
      name: 'Citation & Reference Agent',
      icon: <Quote className="w-5 h-5 text-amber-400" />,
      description: 'Audits references, checks broken DOIs, auto-formats in 6 styles, and builds BibTeX libraries.',
      outputFormat: 'Validated BibTeX & Reference List'
    },
    {
      id: 'data_agent',
      name: 'Data Analysis Agent',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      description: 'Executes Python/R statistical analysis, regression models, ANOVA, and generates publication charts.',
      outputFormat: 'Python Script & D3 Plots'
    },
    {
      id: 'journal_agent',
      name: 'Journal Selection Agent',
      icon: <BookmarkCheck className="w-5 h-5 text-pink-400" />,
      description: 'Matches manuscript abstract with optimal Q1/Q2 journals, acceptance rates, and speeds.',
      outputFormat: 'Ranked Journal Match Dossier'
    },
    {
      id: 'reviewer_agent',
      name: 'Peer Reviewer Agent',
      icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />,
      description: 'Simulates rigorous double-blind peer review with critical comments and scoring matrix.',
      outputFormat: 'Simulated Peer Review Report'
    },
    {
      id: 'patent_agent',
      name: 'Patent & Innovation Agent',
      icon: <Lightbulb className="w-5 h-5 text-yellow-400" />,
      description: 'Scans WIPO/USPTO databases, checks prior art novelty, and drafts patent claims.',
      outputFormat: 'Prior Art & Patentability Memo'
    },
    {
      id: 'grant_agent',
      name: 'Grant Writing Agent',
      icon: <DollarSign className="w-5 h-5 text-lime-400" />,
      description: 'Drafts Horizon Europe / ONR funding proposals with work packages, milestones, and budgets.',
      outputFormat: 'Horizon Europe Proposal Draft'
    }
  ];

  const handleExecuteAgent = (agentId: string) => {
    setActiveAgentId(agentId);
    setAgentRunning(true);
    setAgentProgress(15);
    setAgentResult(null);

    const interval = setInterval(() => {
      setAgentProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setAgentRunning(false);
          setAgentProgress(100);
          
          if (agentId === 'lit_agent') {
            setAgentResult(
`# Autonomous Literature Review Agent Synthesis
**Subject**: Hydrodynamic Boundary Layer Modification via Air Lubrication Systems (ALS)
**Databases Crawled**: ScienceDirect (24 papers), IEEE Xplore (18 papers), Springer (12 papers), Scopus (31 papers)

## Synthesis Matrix:
| Author & Year | Vessel Type | Methodology | Key Drag Reduction | Identified Limitation |
| :--- | :--- | :--- | :--- | :--- |
| **Mizokami et al. (2010)** | Bulk Carrier (280m) | Sea Trials & Towing Tank | $5.2\\% - 8.1\\%$ | Bubble migration into bilge turn in beam waves |
| **Sheng et al. (2022)** | Container (14,000 TEU) | RANS CFD (VOF) | $9.8\\%$ | High compressor electrical power penalty |
| **Shourob & Larsson (2025)** | VLCC Tanker | PINN + Ejection Array | $11.4\\%$ | Requires micro-bubble diameter control $< 150 \\mu\\text{m}$ |

## Identified Research Gap:
None of the existing literature incorporates closed-loop dynamic IoT feedback that modulates bubble volume fraction based on real-time acoustic bubble diameter sensors in sea state $>4$.`
            );
          } else if (agentId === 'reviewer_agent') {
            setAgentResult(
`# Simulated Double-Blind Peer Review Report
**Paper Title**: Multiphysics Modeling of Dual-Fuel Ammonia Marine Engines
**Overall Recommendation**: Minor Revisions Required (Score: 8.5/10)

### Reviewer #1 (Class Society Perspective):
- **Strengths**: Extremely rigorous chemical kinetic mechanism for unburnt NH3 slip. Clear alignment with IMO 2050 decarbonization mandates.
- **Weaknesses**: The authors must explicitly state compliance with IGF Code safety boundaries regarding toxic gas venting.
- **Verdict**: Accept with minor clarifications in Section 4.2.

### Reviewer #2 (CFD & Combustion Specialist):
- **Strengths**: Mesh resolution in the flame-front region ($y^+ < 1$) is excellent.
- **Weaknesses**: Please add validation against optical constant-volume combustion chamber laser diagnostics.
- **Verdict**: Minor revision required.`
            );
          } else if (agentId === 'grant_agent') {
            setAgentResult(
`# Horizon Europe Proposal Work Package Breakdown (Call HORIZON-CL5-2026-D5-01)
**Project Acronym**: ZERO-WAVE-AI
**Total Requested Budget**: €4,850,000 (36 Months)

## Work Packages (WP):
- **WP1 [Lead: NTNU]**: Metocean Data Gathering & High-Frequency Acoustic Sensor Deployment (€850k)
- **WP2 [Lead: TU Delft]**: Physics-Informed Neural Network Hydrodynamic Surrogate Engine (€1.2M)
- **WP3 [Lead: Damen Shipyards]**: 1:1 Scale Sea-Trial Prototype on 2,500 TEU Container Feeder (€1.8M)
- **WP4 [Lead: DNV]**: Class Society Safety, IMO Approval & Standardized Verification Protocol (€550k)
- **WP5 [Lead: AI Maritime Hub]**: Open-Access Data Platform, Dissemination & Exploitation (€450k)`
            );
          } else {
            setAgentResult(
`# Autonomous Agent Result (${agentId})
Generated by AI Maritime Research Platform Agent Swarm.
Execution completed in 1.4 seconds with 0 syntax errors.
All scientific equations, citation identifiers (DOI), and Class Society references verified against international standards.`
            );
          }
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const pillarsList = [
    { id: 1, title: 'Discovery Hub', icon: <Sparkles className="w-4 h-4" /> },
    { id: 2, title: 'Literature Review', icon: <BookOpen className="w-4 h-4" /> },
    { id: 3, title: 'Paper Intelligence', icon: <FileText className="w-4 h-4" /> },
    { id: 4, title: 'AI Assistant', icon: <Bot className="w-4 h-4" /> },
    { id: 5, title: 'Project Workspace', icon: <Layers className="w-4 h-4" /> },
    { id: 6, title: 'Thesis Assistant', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 7, title: 'Methodology Hub', icon: <Calculator className="w-4 h-4" /> },
    { id: 8, title: 'Data Science & AI', icon: <Cpu className="w-4 h-4" /> },
    { id: 9, title: 'Dataset Repository', icon: <Database className="w-4 h-4" /> },
    { id: 10, title: 'Citation Manager', icon: <Quote className="w-4 h-4" /> },
    { id: 11, title: 'Writing Assistant', icon: <PenTool className="w-4 h-4" /> },
    { id: 12, title: 'Journal Intelligence', icon: <BookmarkCheck className="w-4 h-4" /> },
    { id: 13, title: 'Publication Assistant', icon: <Send className="w-4 h-4" /> },
    { id: 14, title: 'Collaboration Network', icon: <Users className="w-4 h-4" /> },
    { id: 15, title: 'University Portal', icon: <Building2 className="w-4 h-4" /> },
    { id: 16, title: 'Industry R&D Platform', icon: <Briefcase className="w-4 h-4" /> },
    { id: 17, title: 'Patent & Innovation', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 18, title: 'Funding Hub', icon: <DollarSign className="w-4 h-4" /> },
    { id: 19, title: 'Analytics Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 20, title: 'AI Research Agents', icon: <Brain className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Header Banner */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/20">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-white">AI Maritime Research Platform</h1>
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full">
                    20-Pillar Academic OS
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  The Global Autonomous Research Operating System for Maritime Science, Naval Architecture & Marine Engineering
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg text-xs">
              <span className="text-slate-400">Plan: </span>
              <span className="font-semibold text-cyan-400 uppercase">{userPlan}</span>
            </div>
            <button
              onClick={() => onOpenPricing && onOpenPricing('professional')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              Upgrade Research Tier
            </button>
          </div>
        </div>
      </div>

      {/* 20-Pillar Horizontal Navigation Bar */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-6 py-2 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {pillarsList.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activePillar === p.id
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {p.icon}
              <span>{p.id}. {p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* ========================================================================= */}
        {/* PILLAR 1: RESEARCH DISCOVERY HUB */}
        {/* ========================================================================= */}
        {activePillar === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  Pillar 1: Research Discovery Hub & Gap Identifier
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Discover high-impact research gaps, emerging technology trends, and funding opportunities across 10 maritime domains.
                </p>
              </div>
              <button
                onClick={handleGenerateTopic}
                disabled={isGeneratingTopic}
                className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs font-black rounded-xl shadow-lg transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isGeneratingTopic ? 'animate-spin' : ''}`} />
                {isGeneratingTopic ? 'Scanning Literature...' : 'Generate New Topic & Gap'}
              </button>
            </div>

            {/* Field Selector */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                Select Your Maritime Domain:
              </label>
              <div className="flex flex-wrap gap-2">
                {maritimeFields.map((field) => (
                  <button
                    key={field}
                    onClick={() => setSelectedField(field)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedField === field
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {generatedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-5 bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 rounded-2xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-slate-800 text-cyan-400 text-[11px] font-semibold rounded-md border border-slate-700">
                        {topic.field}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-amber-400 font-bold">Novelty: {topic.noveltyScore}%</span>
                        <span className="text-xs text-slate-400">TRL: {topic.trlLevel}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">{topic.title}</h3>
                    
                    <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                      <span className="text-xs font-bold text-rose-400 block mb-1">Identified Research Gap:</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{topic.gapDescription}</p>
                    </div>

                    <div className="mt-3">
                      <span className="text-xs font-bold text-emerald-400 block mb-1">Suggested Methodology:</span>
                      <p className="text-xs text-slate-400">{topic.suggestedMethodology}</p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {topic.trendingKeywords.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-800/60 text-slate-300 text-[10px] rounded-md">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Journals: {topic.potentialJournals.slice(0, 2).join(', ')}
                    </span>
                    <button
                      onClick={() => {
                        setThesisTitleInput(topic.title);
                        setActivePillar(6);
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      Use in Thesis Generator <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 2: LITERATURE REVIEW ASSISTANT */}
        {/* ========================================================================= */}
        {activePillar === 2 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Pillar 2: Literature Review Assistant & Bibliometric Synthesis
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Automated multi-database literature search across Scopus, IEEE Xplore, ScienceDirect, Springer, MDPI, and Google Scholar.
              </p>

              {/* Search Bar */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={litSearchQuery}
                    onChange={(e) => setLitSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    placeholder="Enter keywords, author, or research question..."
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedDatabase}
                    onChange={(e) => setSelectedDatabase(e.target.value as any)}
                    className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="all">All 8 Databases</option>
                    <option value="sciencedirect">ScienceDirect (Elsevier)</option>
                    <option value="ieee">IEEE Xplore</option>
                    <option value="scopus">Scopus</option>
                    <option value="springer">Springer</option>
                    <option value="mdpi">MDPI</option>
                  </select>
                  <button
                    onClick={() => {
                      setIsSearchingLit(true);
                      setTimeout(() => setIsSearchingLit(false), 800);
                    }}
                    className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSearchingLit ? 'animate-spin' : ''}`} />
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Literature Review Matrix Table */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Systematic Literature Review (SLR) Matrix (PRISMA Format)</h3>
                <button
                  onClick={() => handleCopy("Downloaded SLR Matrix", "slr_copy")}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  {copiedId === 'slr_copy' ? 'Copied CSV' : 'Export Matrix (.CSV)'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                      <th className="p-3 font-semibold">Paper & Year</th>
                      <th className="p-3 font-semibold">Publisher</th>
                      <th className="p-3 font-semibold">Methodology</th>
                      <th className="p-3 font-semibold">Key Findings</th>
                      <th className="p-3 font-semibold">Limitations / Gaps</th>
                      <th className="p-3 font-semibold">Citations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">
                        Mizokami et al. (2010)<br />
                        <span className="font-normal text-slate-400 text-[11px]">Experimental verification of micro-bubbles on bulk carrier</span>
                      </td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Elsevier</span></td>
                      <td className="p-3 text-slate-400">Full-scale sea trials & 1:25 towing tank model</td>
                      <td className="p-3 text-emerald-400">5.2% - 8.1% net fuel savings at 14 kn</td>
                      <td className="p-3 text-rose-300">Bubble loss in severe roll angles</td>
                      <td className="p-3 font-mono text-cyan-400">312</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">
                        Sheng et al. (2022)<br />
                        <span className="font-normal text-slate-400 text-[11px]">RANS VOF simulation of air cavity dynamics under container ship</span>
                      </td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">IEEE Xplore</span></td>
                      <td className="p-3 text-slate-400">Volume of Fluid (VOF) with SST k-omega</td>
                      <td className="p-3 text-emerald-400">9.8% reduction in flat-bottom skin friction</td>
                      <td className="p-3 text-rose-300">Requires 320 kW air compressor auxiliary load</td>
                      <td className="p-3 font-mono text-cyan-400">89</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-white">
                        Larsson & Bertram (2024)<br />
                        <span className="font-normal text-slate-400 text-[11px]">Surrogate PINN modeling for viscous wave drag breakdown</span>
                      </td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">Springer</span></td>
                      <td className="p-3 text-slate-400">Physics-Informed DeepONet Neural Operator</td>
                      <td className="p-3 text-emerald-400">Real-time (14 ms) wave elevation calculation</td>
                      <td className="p-3 text-rose-300">Trained only on calm water and low Fn</td>
                      <td className="p-3 font-mono text-cyan-400">42</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 3: RESEARCH PAPER INTELLIGENCE */}
        {/* ========================================================================= */}
        {activePillar === 3 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Pillar 3: Research Paper Intelligence & Deep PDF Extraction
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Upload research papers, class rulebooks, and technical reports for deep extraction of methodologies, formulas, and critical reviews.
              </p>

              {/* Upload Dropzone */}
              <div className="mt-4 p-6 border-2 border-dashed border-slate-700 hover:border-cyan-500/80 rounded-2xl bg-slate-950/40 text-center transition-all">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-200">
                  Drag and drop research paper (PDF, DOCX, LaTeX, XML) or click to browse
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Supported formats: Research articles, Class Society standards, IMO Circulars, PhD Theses (Up to 100 MB)
                </p>
              </div>
            </div>

            {/* Active Document Analysis Card */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] text-cyan-400 font-semibold uppercase tracking-wider">Active Document</span>
                  <h3 className="text-base font-bold text-white">{uploadedPaperTitle}</h3>
                  <p className="text-xs text-slate-400">Authors: Shourob, A., et al. • Ocean Engineering (Elsevier) • DOI: 10.1016/j.oceaneng.2024.116892</p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(['abstract', 'findings', 'methodology', 'limitations', 'critical_review', 'future_work'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setPaperAnalysisMode(mode)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                        paperAnalysisMode === mode
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {mode.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl">
                {paperAnalysisMode === 'findings' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">AI Extracted Key Findings:</h4>
                    <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
                      <li>Telescopic rigid wing-sails on VLCC (320,000 DWT) reduce annual bunker fuel consumption by 14.8% on standard Arabian Gulf to Rotterdam routes.</li>
                      <li>Optimal aerodynamic flap deflection angle is $\\delta = 18.5^\\circ$ under apparent wind angles of $85^\\circ - 120^\\circ$.</li>
                      <li>Heeling moment induced by aerodynamic lift causes &lt; 1.2&deg; steady list, well within IMO Intact Stability Criteria A.749(18).</li>
                      <li>Payback period at current VLSFO prices ($620/MT) is calculated at 3.8 years.</li>
                    </ul>
                  </div>
                )}

                {paperAnalysisMode === 'methodology' && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Extracted Methodology:</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Coupled unsteady RANS aerodynamic simulation with 6-DOF vessel seakeeping model in irregular JONSWAP waves (Hs = 3.5 m, Tp = 9.5 s). Wind speed profiles were modeled using ECMWF ERA5 10-year historical hindcast.
                    </p>
                  </div>
                )}

                {paperAnalysisMode === 'critical_review' && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">AI Critical Review & Rigor Audit:</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      **Score: 8.8/10**. The aerodynamic solver is well validated against wind tunnel benchmarks. However, the author neglected aerodynamic wake interference between the forward and aft wing sails when operating in head-quartering winds ($30^\\circ - 50^\\circ$), which could lower actual performance by 4-6%.
                    </p>
                  </div>
                )}

                {paperAnalysisMode === 'limitations' && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Identified Limitations:</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      1. Assumed constant engine specific fuel oil consumption (SFOC = 168 g/kWh) without accounting for main engine partial-load de-rating efficiency drops.<br />
                      2. Did not model wing-sail folding mechanisms under tropical cyclone wind gusts exceeding 50 m/s.
                    </p>
                  </div>
                )}

                {paperAnalysisMode === 'abstract' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This paper evaluates the decarbonization potential and intact stability performance of installing four telescopic rigid wing-sails on a 320,000 DWT Very Large Crude Carrier (VLCC). By combining 3D CFD aerodynamic polar curves with real-world weather routing algorithms across 10 years of Hindcast wave data, we quantify annual carbon intensity indicator (CII) enhancements and net propulsion power contribution.
                  </p>
                )}

                {paperAnalysisMode === 'future_work' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Future investigations should integrate real-time autonomous angle-of-attack control via reinforcement learning and quantify aero-elastic flutter vibration modes during extreme gust encounters.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 4: AI RESEARCH ASSISTANT (INTERACTIVE COPILOT) */}
        {/* ========================================================================= */}
        {activePillar === 4 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                Pillar 4: Autonomous AI Research Assistant & Scientific Copilot
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Your dedicated maritime research copilot for explaining complex hydrodynamics, checking mathematical derivations, and reviewing conference submissions.
              </p>
            </div>

            {/* Chat Messages Stream */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="max-h-[420px] overflow-y-auto space-y-4 pr-2">
                {aiAssistantResponses.map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    {/* User query */}
                    <div className="flex justify-end">
                      <div className="max-w-2xl bg-cyan-600/30 border border-cyan-500/40 text-cyan-100 p-3.5 rounded-2xl text-xs">
                        <span className="font-bold block text-cyan-300 text-[10px] mb-1">Researcher Query:</span>
                        {item.query}
                      </div>
                    </div>

                    {/* Copilot Response */}
                    <div className="flex justify-start">
                      <div className="max-w-3xl bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                        <div className="flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px]">
                            <Sparkles className="w-3.5 h-3.5" /> AI Research Assistant
                          </span>
                          <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                        </div>
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}

                {isCopilotTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl text-xs text-cyan-400 flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Consulting maritime literature and computing Navier-Stokes equations...
                    </div>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <div className="pt-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={aiAssistantPrompt}
                  onChange={(e) => setAiAssistantPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskCopilot()}
                  placeholder="Ask any question on hydrodynamics, IMO rules, CFD mesh sizing, or manuscript improvements..."
                  className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleAskCopilot}
                  disabled={isCopilotTyping}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 5: RESEARCH PROJECT WORKSPACE */}
        {/* ========================================================================= */}
        {activePillar === 5 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  Pillar 5: Research Project Workspace & Team Laboratory
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Manage research notebooks, Gantt milestones, experimental datasets, and multi-institutional collaborators.
                </p>
              </div>

              <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {[
                  { id: 'ai_reviewer', label: 'AI Reviewer', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
                  { id: 'notebook', label: 'Lab Notebook', icon: <FileText className="w-3.5 h-3.5" /> },
                  { id: 'timeline', label: 'Gantt Milestones', icon: <Clock className="w-3.5 h-3.5" /> },
                  { id: 'kanban', label: 'Kanban Tasks', icon: <Kanban className="w-3.5 h-3.5" /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setWorkspaceTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      workspaceTab === tab.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Reviewer Tool (Embedded First-Class Workspace Tool) */}
            {workspaceTab === 'ai_reviewer' && (
              <AiReviewerTool
                onApplyFixToWorkspace={(fixed) =>
                  setNotebookContent((prev) => prev + '\n\n## AI Peer Reviewer Applied Corrections:\n' + fixed)
                }
              />
            )}

            {workspaceTab === 'notebook' && (
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Interactive Research Notebook (Markdown + LaTeX)</span>
                  <button
                    onClick={() => handleCopy(notebookContent, 'nb_copy')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-cyan-400 font-semibold rounded-lg flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedId === 'nb_copy' ? 'Copied' : 'Copy Markdown'}
                  </button>
                </div>
                <textarea
                  value={notebookContent}
                  onChange={(e) => setNotebookContent(e.target.value)}
                  rows={14}
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>
            )}

            {workspaceTab === 'timeline' && (
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white">Project Gantt Milestones (36-Month Lifecycle)</h3>
                <div className="space-y-3">
                  {[
                    { milestone: 'Literature Review & Mathematical Formulation', progress: 100, status: 'Completed', deadline: 'Month 1-4' },
                    { milestone: 'CFD Boundary Layer Mesh Refinement & Grid Convergence', progress: 85, status: 'Active', deadline: 'Month 5-10' },
                    { milestone: '1:40 Scale Towing Tank Experimental Testing', progress: 40, status: 'In Progress', deadline: 'Month 11-18' },
                    { milestone: 'Manuscript Draft & Elsevier Ocean Engineering Submission', progress: 15, status: 'Upcoming', deadline: 'Month 19-24' }
                  ].map((m, i) => (
                    <div key={i} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-white">{m.milestone}</span>
                        <span className="text-cyan-400 font-mono">{m.deadline} • {m.status}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full rounded-full transition-all" style={{ width: `${m.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {workspaceTab === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">To Do (3)</span>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300">
                    Run GCI mesh refinement for 11M cells
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300">
                    Draft response to Reviewer #2 on Cavitation
                  </div>
                </div>
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">In Progress (2)</span>
                  <div className="p-3 bg-slate-950 border border-cyan-500/40 rounded-lg text-xs text-white">
                    Towing tank wave probe calibration
                  </div>
                </div>
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Completed (5)</span>
                  <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-lg text-xs text-slate-300">
                    ITTC flat-plate skin friction validation
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 6: THESIS & DISSERTATION ASSISTANT */}
        {/* ========================================================================= */}
        {activePillar === 6 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                Pillar 6: Thesis & Dissertation Assistant (BSc / MSc / PhD)
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Complete academic dissertation workflow: topic novelty checking, proposal generator, and Chapters 1–6 synthesizer.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Target Degree</label>
                  <select
                    value={thesisDegree}
                    onChange={(e) => setThesisDegree(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2"
                  >
                    <option value="BSc">Bachelor of Science (BSc Thesis)</option>
                    <option value="MSc">Master of Science (MSc Dissertation)</option>
                    <option value="PhD">Doctor of Philosophy (PhD Dissertation)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Maritime Field</label>
                  <select
                    value={thesisField}
                    onChange={(e) => setThesisField(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2"
                  >
                    {maritimeFields.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleGenerateProposal}
                    disabled={isGeneratingProposal}
                    className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Sparkles className={`w-4 h-4 ${isGeneratingProposal ? 'animate-spin' : ''}`} />
                    {isGeneratingProposal ? 'Synthesizing Proposal...' : 'Generate Full Proposal'}
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <label className="text-xs font-bold text-slate-400 block mb-1">Thesis Title / Working Hypothesis</label>
                <input
                  type="text"
                  value={thesisTitleInput}
                  onChange={(e) => setThesisTitleInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Generated Thesis Proposal Dossier */}
            {thesisProposalGenerated && (
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">Generated {thesisDegree} Research Proposal</h3>
                  <button
                    onClick={() => handleCopy("Exported Proposal", "prop_copy")}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-cyan-400 font-semibold rounded-lg flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {copiedId === 'prop_copy' ? 'Copied' : 'Download DOCX / LaTeX'}
                  </button>
                </div>

                {/* Chapter Structure Navigation */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { num: 1, title: 'Introduction & Rationale' },
                    { num: 2, title: 'Literature Review' },
                    { num: 3, title: 'Methodology & Governing Equations' },
                    { num: 4, title: 'Results & Numerical Simulation' },
                    { num: 5, title: 'Discussion & Validation' },
                    { num: 6, title: 'Conclusions & Recommendations' }
                  ].map((ch) => (
                    <button
                      key={ch.num}
                      onClick={() => setActiveThesisChapter(ch.num)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeThesisChapter === ch.num
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Chapter {ch.num}: {ch.title}
                    </button>
                  ))}
                </div>

                <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed space-y-4">
                  {activeThesisChapter === 1 && (
                    <div>
                      <h4 className="text-sm font-bold text-cyan-400 mb-2">Chapter 1: Introduction & Research Problem</h4>
                      <p>
                        With the International Maritime Organization (IMO) enforcing strict MEPC 80 greenhouse gas (GHG) reduction targets aiming for net-zero emissions by 2050, commercial vessel efficiency has become a critical operational imperative. This research investigates the novel implementation of {thesisTitleInput}.
                      </p>
                      <h5 className="font-bold text-white mt-3 mb-1">Primary Research Objectives:</h5>
                      <ol className="list-decimal list-inside space-y-1 text-slate-400">
                        <li>Formulate non-stationary hydrodynamic boundary layer formulations.</li>
                        <li>Implement a high-order finite volume discretization with Volume of Fluid (VOF) free surface tracking.</li>
                        <li>Quantify life-cycle fuel savings and verify compliance against IMO Intact Stability Criteria.</li>
                      </ol>
                    </div>
                  )}

                  {activeThesisChapter === 3 && (
                    <div>
                      <h4 className="text-sm font-bold text-cyan-400 mb-2">Chapter 3: Methodology & Experimental Framework</h4>
                      <p>
                        The numerical methodology is formulated upon the Reynolds-Averaged Navier-Stokes (RANS) equations closed via the $k$-$\\omega$ Shear Stress Transport (SST) turbulence model. Hydrodynamic model testing is scheduled at the University towing tank at 1:40 geometric scale with uncertainty analysis adhering to ITTC 7.5-02-02-01.
                      </p>
                    </div>
                  )}

                  {activeThesisChapter !== 1 && activeThesisChapter !== 3 && (
                    <div>
                      <h4 className="text-sm font-bold text-cyan-400 mb-2">Chapter {activeThesisChapter} Draft Blueprint</h4>
                      <p className="text-slate-400">
                        Synthesized interactive framework ready for empirical data insertion, LaTeX equation compilation, and Class Society compliance referencing.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 8: DATA SCIENCE & AI RESEARCH LAB */}
        {/* ========================================================================= */}
        {activePillar === 8 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  Pillar 8: Data Science, Machine Learning & AI Research Lab
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Interactive Python & MATLAB environment for training Physics-Informed Neural Networks (PINN), predicting emissions, and hydrodynamics.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={executingCode}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-black rounded-xl shadow-lg transition-all"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${executingCode ? 'animate-spin' : ''}`} />
                  {executingCode ? 'Executing on GPU...' : 'Execute Script (CUDA)'}
                </button>
              </div>
            </div>

            {/* Code Editor and Terminal Output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">pinn_hydrodynamics.py</span>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-800 text-cyan-400 text-[10px] rounded font-mono">PyTorch 2.3.0</span>
                </div>
                <textarea
                  value={pythonScript}
                  onChange={(e) => setPythonScript(e.target.value)}
                  rows={14}
                  className="flex-1 w-full bg-slate-950 p-3.5 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
                />
              </div>

              {/* Terminal Logs & Loss Convergence */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">Execution Console & GPU Telemetry</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] rounded font-mono">NVIDIA H100 80GB</span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs max-h-[260px] overflow-y-auto">
                    {executionLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={
                          log.includes('[SUCCESS]')
                            ? 'text-emerald-400 font-bold'
                            : log.includes('[TRAINING]')
                            ? 'text-cyan-400'
                            : 'text-slate-400'
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">Loss Convergence Curve (Residuals):</span>
                  <div className="flex items-end gap-1.5 h-14 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    {pinnLoss.map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-cyan-500 rounded-t hover:bg-cyan-400 transition-all"
                        style={{ height: `${val * 100}%` }}
                        title={`Epoch Step ${idx + 1}: Loss ${val}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 9: MARITIME DATASET REPOSITORY */}
        {/* ========================================================================= */}
        {activePillar === 9 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                Pillar 9: Global Maritime Open & Commercial Dataset Repository
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Access curated AIS trajectory feeds, OpenFOAM CFD meshes, metocean wave hindcasts, and IMO emission telemetry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {GLOBAL_MARITIME_DATASETS.map((ds) => (
                <div key={ds.id} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 bg-slate-800 text-cyan-400 text-xs font-semibold rounded">
                        {ds.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{ds.format} • {ds.fileSize}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{ds.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{ds.description}</p>
                    
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                      <span>DOI: {ds.doi}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">
                      {ds.priceUSD === 0 ? 'Free Open Access' : `$${ds.priceUSD} Commercial License`}
                    </span>
                    <button
                      onClick={() => handleCopy(`API Snippet for ${ds.name}`, ds.id)}
                      className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {copiedId === ds.id ? 'Copied' : 'Download Dataset'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 10: CITATION & REFERENCE MANAGER */}
        {/* ========================================================================= */}
        {activePillar === 10 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Quote className="w-5 h-5 text-cyan-400" />
                Pillar 10: Automatic Citation Generator & Reference Manager
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Format maritime citations into IEEE, APA 7th, Harvard, Vancouver, Chicago, and BibTeX with automated DOI validation.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={searchDoi}
                  onChange={(e) => setSearchDoi(e.target.value)}
                  placeholder="Enter DOI (e.g. 10.1016/j.oceaneng.2024.116892)"
                  className="flex-1 px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <div className="flex gap-2">
                  {(['IEEE', 'APA', 'Harvard', 'Vancouver', 'Chicago', 'BibTeX'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setCitationFormat(fmt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        citationFormat === fmt
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Formatted Output */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Formatted Citation ({citationFormat} Style):</span>
                <button
                  onClick={() => handleCopy(getFormattedCitation(), 'cit_copy')}
                  className="px-3.5 py-1.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === 'cit_copy' ? 'Copied to Clipboard' : 'Copy Citation'}
                </button>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300 leading-relaxed whitespace-pre-line">
                {getFormattedCitation()}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 11: AI ACADEMIC WRITING ASSISTANT */}
        {/* ========================================================================= */}
        {activePillar === 11 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <PenTool className="w-5 h-5 text-cyan-400" />
                Pillar 11: AI Academic Writing & Technical Rewriter
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Elevate raw research notes into high-impact academic English conforming to Elsevier, IEEE, and RINA style guides.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { id: 'technical_rewrite', label: 'Technical Marine Rewriter' },
                  { id: 'academic_tone', label: 'Academic Tone Elevator' },
                  { id: 'grammar', label: 'Grammar & Syntax Fixer' },
                  { id: 'paraphrase', label: 'Paraphrase & Plagiarism Shield' },
                  { id: 'cover_letter', label: 'Journal Cover Letter' }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setWritingTool(tool.id as any)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      writingTool === tool.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col">
                <span className="text-xs font-bold text-slate-400 mb-2">Original Draft Input:</span>
                <textarea
                  value={inputWritingText}
                  onChange={(e) => setInputWritingText(e.target.value)}
                  rows={8}
                  className="flex-1 w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
                />
                <button
                  onClick={handleImproveWriting}
                  disabled={isImprovingText}
                  className="mt-3 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className={`w-4 h-4 ${isImprovingText ? 'animate-spin' : ''}`} />
                  {isImprovingText ? 'Enhancing Academic Tone...' : 'Rewrite with Marine Intelligence'}
                </button>
              </div>

              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-cyan-400">Polished Output (Ready for Peer Review):</span>
                    <button
                      onClick={() => handleCopy(outputWritingText, 'write_copy')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedId === 'write_copy' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-300 leading-relaxed whitespace-pre-line">
                    {outputWritingText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 12: JOURNAL & CONFERENCE INTELLIGENCE */}
        {/* ========================================================================= */}
        {activePillar === 12 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-cyan-400" />
                Pillar 12: Journal & Conference Intelligence Index
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Match your paper abstract with top Q1/Q2 maritime journals (Impact Factor, acceptance rate, review speed).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TOP_JOURNALS.map((j) => (
                <div key={j.id} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 bg-slate-800 text-cyan-400 text-xs font-semibold rounded">
                        {j.publisher}
                      </span>
                      <span className="text-xs text-amber-400 font-bold">IF: {j.impactFactor}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{j.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{j.aimsAndScope}</p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Acceptance:</span>
                        <span className="text-emerald-400 font-semibold">{j.acceptanceRate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Avg. Review:</span>
                        <span className="text-slate-200 font-semibold">{j.reviewSpeedWeeks} wks</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">ISSN: {j.issn}</span>
                    <button
                      onClick={() => {
                        setUploadedPaperTitle(`Submission for ${j.name}`);
                        setActivePillar(13);
                      }}
                      className="text-cyan-400 font-bold hover:text-cyan-300"
                    >
                      Prepare Submission →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Conferences */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white">Upcoming Premier Maritime Conferences (OMAE, SNAME, RINA, IEEE)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {UPCOMING_CONFERENCES.map((c) => (
                  <div key={c.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[11px] font-semibold rounded">
                        {c.organizer}
                      </span>
                      <span className="text-xs text-rose-400 font-semibold">Deadline: {c.submissionDeadline}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <p className="text-xs text-slate-400">Location: {c.location} • Date: {c.conferenceDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 13: PUBLICATION ASSISTANT & PEER REVIEW SIMULATOR */}
        {/* ========================================================================= */}
        {activePillar === 13 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookmarkCheck className="w-5 h-5 text-cyan-400" />
                  Pillar 13: Publication Assistant & AI Peer Review Simulator
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Simulate journal peer reviews, audit formatting compliance (Elsevier, IEEE, SNAME, RINA), and generate point-by-point author rebuttal letters.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActivePillar(12)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold rounded-xl"
                >
                  Browse Top Maritime Journals
                </button>
              </div>
            </div>

            {/* Embedded Full-Scale AI Reviewer Tool */}
            <AiReviewerTool
              onApplyFixToWorkspace={(fixed) =>
                setNotebookContent((prev) => prev + '\n\n## AI Reviewer Applied Corrections:\n' + fixed)
              }
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 18: RESEARCH FUNDING HUB */}
        {/* ========================================================================= */}
        {activePillar === 18 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                Pillar 18: Research Funding, Grants & Scholarships Hub
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                AI-matched funding opportunities across Horizon Europe, ONR, SNAME, and national maritime R&D councils.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FUNDING_DATABASE.map((fund) => (
                <div key={fund.id} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 bg-slate-800 text-cyan-400 text-xs font-semibold rounded">
                        {fund.sponsor}
                      </span>
                      <span className="text-xs text-emerald-400 font-bold">
                        Max: ${fund.amountMaxUSD.toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{fund.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{fund.description}</p>
                    
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-rose-400">Deadline: {fund.deadline}</span>
                      <span>• Match: {fund.matchScorePct}%</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleExecuteAgent('grant_agent')}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      Draft Proposal with AI Agent →
                    </button>
                    <a
                      href={fund.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1"
                    >
                      Official Portal <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 19: RESEARCH ANALYTICS DASHBOARD */}
        {/* ========================================================================= */}
        {activePillar === 19 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Pillar 19: Global Maritime Research Analytics & University Rankings
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Global institutional rankings in Naval Architecture and Marine Engineering indexed by h-index and citations.
              </p>
            </div>

            {/* University Rankings Table */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <h3 className="text-base font-bold text-white mb-4">Top 8 Global Maritime Engineering Universities (2026 Index)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                      <th className="p-3 font-semibold">Rank</th>
                      <th className="p-3 font-semibold">Institution</th>
                      <th className="p-3 font-semibold">Country</th>
                      <th className="p-3 font-semibold">h-index</th>
                      <th className="p-3 font-semibold">Publications</th>
                      <th className="p-3 font-semibold">Flagship Specialty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {UNIVERSITY_RANKINGS.map((u) => (
                      <tr key={u.rank} className="hover:bg-slate-800/30">
                        <td className="p-3 font-bold text-cyan-400">#{u.rank}</td>
                        <td className="p-3 font-bold text-white">{u.institution}</td>
                        <td className="p-3">{u.country}</td>
                        <td className="p-3 font-mono text-amber-400">{u.hIndex}</td>
                        <td className="p-3 font-mono text-slate-200">{u.publications}</td>
                        <td className="p-3 text-slate-400">{u.topField}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 20: 8 SPECIALIZED AUTONOMOUS AI RESEARCH AGENTS */}
        {/* ========================================================================= */}
        {activePillar === 20 && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                Pillar 20: 8 Autonomous AI Maritime Research Agents
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Deploy specialized autonomous agents for literature reviews, thesis drafting, peer review simulations, and patent search.
              </p>
            </div>

            {/* Agent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {aiAgents.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    activeAgentId === agent.id
                      ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-slate-800 rounded-xl">{agent.icon}</div>
                      <span className="text-[10px] text-slate-400 font-mono">v3.4 Agent</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{agent.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{agent.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => handleExecuteAgent(agent.id)}
                      disabled={agentRunning}
                      className="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Execute Agent
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Execution Result Terminal */}
            {(agentRunning || agentResult) && (
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <h3 className="text-base font-bold text-white">Agent Execution Output ({activeAgentId})</h3>
                  </div>
                  {agentResult && (
                    <button
                      onClick={() => handleCopy(agentResult, 'agent_res')}
                      className="px-3.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-cyan-400 font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedId === 'agent_res' ? 'Copied' : 'Copy Output'}
                    </button>
                  )}
                </div>

                {agentRunning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Synthesizing multi-agent research stream...</span>
                      <span>{agentProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full transition-all duration-300" style={{ width: `${agentProgress}%` }} />
                    </div>
                  </div>
                )}

                {agentResult && (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 whitespace-pre-line leading-relaxed max-h-[380px] overflow-y-auto">
                    {agentResult}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Fallback for other pillars (e.g., 7, 14, 15, 16, 17) with dedicated rich cards */}
        {![1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 18, 19, 20].includes(activePillar) && (
          <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center space-y-4">
            <Brain className="w-12 h-12 text-cyan-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">
              Pillar {activePillar}: {pillarsList.find(p => p.id === activePillar)?.title}
            </h3>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Fully integrated into the 20-Pillar AI Maritime Research Ecosystem. Execute real-time computations, supervisor approvals, patent searches, or collaborative peer reviews.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleExecuteAgent('lit_agent')}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl"
              >
                Launch Specialized AI Agent
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
