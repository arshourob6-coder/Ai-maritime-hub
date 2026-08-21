import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  FileText,
  Sparkles,
  Zap,
  RefreshCw,
  Copy,
  Download,
  BookOpen,
  Send,
  Eye,
  Sliders,
  Award,
  ChevronRight,
  ShieldCheck,
  Check,
  MessageSquare,
  HelpCircle,
  FileCheck2,
  Maximize2,
  Users
} from 'lucide-react';

export interface JournalGuideline {
  id: string;
  name: string;
  publisher: string;
  maxAbstractWords: number;
  citationStyle: 'IEEE Numeric [1]' | 'Elsevier Harvard (Author, Year)' | 'APA 7th' | 'Springer Numeric';
  requiresHighlights: boolean;
  maxHighlightsBullets?: number;
  maxHighlightCharLength?: number;
  requiresNomenclature: boolean;
  requiresDataAvailability: boolean;
  requiresGraphicalAbstract: boolean;
  sectionNumbering: '1., 1.1, 1.1.1' | 'I., A., 1.' | 'Unnumbered';
  equationNumbering: '(1), (2)' | 'Eq. (1)' | '[1]';
}

export const JOURNAL_GUIDELINES: JournalGuideline[] = [
  {
    id: 'ocean_eng',
    name: 'Ocean Engineering',
    publisher: 'Elsevier',
    maxAbstractWords: 250,
    citationStyle: 'Elsevier Harvard (Author, Year)',
    requiresHighlights: true,
    maxHighlightsBullets: 5,
    maxHighlightCharLength: 85,
    requiresNomenclature: true,
    requiresDataAvailability: true,
    requiresGraphicalAbstract: true,
    sectionNumbering: '1., 1.1, 1.1.1',
    equationNumbering: '(1), (2)'
  },
  {
    id: 'ieee_joe',
    name: 'IEEE Journal of Oceanic Engineering',
    publisher: 'IEEE',
    maxAbstractWords: 200,
    citationStyle: 'IEEE Numeric [1]',
    requiresHighlights: false,
    requiresNomenclature: true,
    requiresDataAvailability: true,
    requiresGraphicalAbstract: false,
    sectionNumbering: 'I., A., 1.',
    equationNumbering: '(1), (2)'
  },
  {
    id: 'appl_ocean_res',
    name: 'Applied Ocean Research',
    publisher: 'Elsevier',
    maxAbstractWords: 250,
    citationStyle: 'Elsevier Harvard (Author, Year)',
    requiresHighlights: true,
    maxHighlightsBullets: 4,
    maxHighlightCharLength: 85,
    requiresNomenclature: false,
    requiresDataAvailability: true,
    requiresGraphicalAbstract: true,
    sectionNumbering: '1., 1.1, 1.1.1',
    equationNumbering: '(1), (2)'
  },
  {
    id: 'sname_jspd',
    name: 'Journal of Ship Production and Design',
    publisher: 'SNAME',
    maxAbstractWords: 200,
    citationStyle: 'Elsevier Harvard (Author, Year)',
    requiresHighlights: false,
    requiresNomenclature: true,
    requiresDataAvailability: false,
    requiresGraphicalAbstract: false,
    sectionNumbering: '1., 1.1, 1.1.1',
    equationNumbering: '(1), (2)'
  },
  {
    id: 'rina_ijme',
    name: 'International Journal of Maritime Engineering',
    publisher: 'RINA',
    maxAbstractWords: 250,
    citationStyle: 'Elsevier Harvard (Author, Year)',
    requiresHighlights: false,
    requiresNomenclature: true,
    requiresDataAvailability: true,
    requiresGraphicalAbstract: false,
    sectionNumbering: '1., 1.1, 1.1.1',
    equationNumbering: '(1), (2)'
  },
  {
    id: 'mdpi_jmse',
    name: 'Journal of Marine Science and Engineering (JMSE)',
    publisher: 'MDPI',
    maxAbstractWords: 200,
    citationStyle: 'IEEE Numeric [1]',
    requiresHighlights: false,
    requiresNomenclature: false,
    requiresDataAvailability: true,
    requiresGraphicalAbstract: true,
    sectionNumbering: '1., 1.1, 1.1.1',
    equationNumbering: '(1), (2)'
  }
];

export interface AcademicIssue {
  id: string;
  category: 'formatting' | 'methodology' | 'tone_grammar' | 'rigor_uncertainty';
  severity: 'critical' | 'warning' | 'suggestion';
  title: string;
  description: string;
  location: string;
  originalSnippet?: string;
  suggestedFix?: string;
  ruleReference: string;
}

export interface ReviewerFeedback {
  reviewerNumber: number;
  reviewerPersona: string;
  affiliationType: string;
  recommendation: 'Accept' | 'Minor Revision' | 'Major Revision' | 'Reject';
  overallAssessment: string;
  strengths: string[];
  majorCritiques: string[];
  minorPoints: string[];
  scientificScore: number; // out of 10
}

export interface PeerReviewSimulationResult {
  manuscriptTitle: string;
  targetJournal: string;
  associateEditorVerdict: 'Accept with Minor Revisions' | 'Major Revisions Required' | 'Reject & Resubmit' | 'Immediate Accept';
  overallScore: number;
  scoreBreakdown: {
    originality: number;
    technicalRigor: number;
    methodologyValidation: number;
    formattingAdherence: number;
    languageClarity: number;
  };
  executiveSummary: string;
  guidelineCompliancePercentage: number;
  issuesFound: AcademicIssue[];
  passedChecks: string[];
  reviewers: ReviewerFeedback[];
  generatedRebuttalOutline: string;
}

const SAMPLE_PAPERS = [
  {
    id: 'paper_1',
    title: 'Physics-Informed Neural Networks for Free-Surface Wave Resistance Prediction of Ultra-Large Container Vessels',
    authors: 'A. Shourob, L. Larsson, V. Bertram',
    targetJournalId: 'ocean_eng',
    highlights: `- PINN surrogate model for Kelvin wave pattern prediction on 14,000 TEU container hull.\n- Achieves 99.4% accuracy compared to towing tank tests with 14ms inference latency.\n- Replaces expensive unsteady RANS CFD iterations for voyage optimization.`,
    abstract: `In this paper we investigate a huge improvement in ship hydrodynamics using machine learning. We did tests in the towing tank and ran lots of CFD calculations for a container ship. Our PINN model completely solves the wave resistance problem and achieves 99.4% correlation with experiments. The results show big drag reductions in calm water and rough waves. We believe this is the best method available for marine naval architects to compute wave patterns in real time without high-performance computing clusters.`,
    body: `1. Introduction\nShip hydrodynamic resistance is composed of frictional drag and wave-making drag. Classical strip theory and Holtrop-Mennen statistical equations fail for blunt bulbous bows at Froude numbers Fn > 0.22. In this research, we propose a Physics-Informed Neural Network (PINN) that embeds the Navier-Stokes mass and momentum conservation equations into the loss function.\n\n2. Numerical & Experimental Methods\nA 1:40 scale DTC container vessel model was tested in a towing tank of length 150m. The carriage speed was varied between 0.85 m/s and 2.1 m/s. We did not record the water temperature, but it was around room temperature. The CFD domain contained 4.5 million unstructured tetrahedral cells. Turbulence was modeled using k-omega SST. The wall y+ was maintained within reasonable boundaries.\n\n3. Results & Discussion\nThe total resistance coefficient CT is decomposed into CF and CW. As seen in Fig 1, the PINN predicted wave elevation matches towing tank wave probes with a root mean square error of 1.8%. The computational latency on an NVIDIA RTX 4090 GPU was 14.2 milliseconds per hull geometry variation. This provides a huge advantage for genetic algorithm hull form optimization.\n\n4. Conclusion\nWe have proven that PINNs are revolutionary for naval architecture. Future work will extend this framework to 6-DOF pitching and heaving in irregular JONSWAP waves.\n\n5. References\n[1] Holtrop, J., 1982. A statistical power prediction method. Int. Shipbuild. Prog. 29, 166-170.\n[2] Raissi, M., Perdikaris, P., Karniadakis, G.E., 2019. Physics-informed neural networks. J. Comput. Phys. 378, 686-707.\n[3] ITTC, 2011. Testing and extrapolation methods: Resistance test. ITTC Recommended Procedures 7.5-02-02-01.`
  },
  {
    id: 'paper_2',
    title: 'Experimental Investigation of Hydrodynamic Cavitation and Pressure Pulses on High-Skew Marine Propellers in Non-Uniform Wake',
    authors: 'M. Chen, K. Takagi, H. S. Lee',
    targetJournalId: 'appl_ocean_res',
    highlights: `- Cavitation tunnel experiments on CP-propeller in simulated 3D bilge vortex.\n- High-speed stereoscopic PIV captures tip vortex inception at sigma = 0.82.\n- 1st and 2nd blade passage hull pressure fluctuations measured by flush transducers.`,
    abstract: `Cavitation induced hull vibration and underwater radiated noise pose severe operational challenges for commercial container vessels. In this experimental investigation, a high-skew controllable pitch propeller (CP-propeller) model was evaluated inside a cavitation tunnel equipped with wire-mesh wake screens. High-speed shadowgraphy and flush piezoelectric pressure sensors were deployed to quantify cavitation dynamics and hull surface pressure pulses. Results show that sheet cavitation detachment triggers high-amplitude acoustic peaks exceeding 185 dB re 1 uPa.`,
    body: `1. Introduction\nPropeller cavitation causes blade erosion and severe vibration. When the propeller operates in the non-uniform ship wake field, the angle of attack fluctuates during each rotation.\n\n2. Experimental Facility\nExperiments were conducted in the high-speed cavitation tunnel (test section 0.6m x 0.6m). The water was degassed to maintain dissolved oxygen content below 35% saturation.\n\n3. Results\nTip vortex cavitation inception was identified at cavitation number sigma = 0.82. Pressure pulse spectral analysis revealed dominant harmonic peaks at blade passing frequency (BPF = 145 Hz).`
  }
];

export const AiReviewerTool: React.FC<{
  onApplyFixToWorkspace?: (fixedText: string) => void;
}> = ({ onApplyFixToWorkspace }) => {
  const [selectedPaperId, setSelectedPaperId] = useState<string>('paper_1');
  const [targetJournalId, setTargetJournalId] = useState<string>('ocean_eng');
  const [paperTitle, setPaperTitle] = useState<string>(SAMPLE_PAPERS[0].title);
  const [paperAbstract, setPaperAbstract] = useState<string>(SAMPLE_PAPERS[0].abstract);
  const [paperHighlights, setPaperHighlights] = useState<string>(SAMPLE_PAPERS[0].highlights);
  const [paperBody, setPaperBody] = useState<string>(SAMPLE_PAPERS[0].body);
  const [activeTab, setActiveTab] = useState<'editor' | 'review_results' | 'rebuttal_generator' | 'guidelines_matrix'>('review_results');
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [reviewProgress, setReviewProgress] = useState<number>(0);
  const [reviewStage, setReviewStage] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeReviewerTab, setActiveReviewerTab] = useState<number>(0);

  // Review Result State
  const [simulationResult, setSimulationResult] = useState<PeerReviewSimulationResult | null>({
    manuscriptTitle: SAMPLE_PAPERS[0].title,
    targetJournal: 'Ocean Engineering (Elsevier)',
    associateEditorVerdict: 'Major Revisions Required',
    overallScore: 6.8,
    scoreBreakdown: {
      originality: 8.5,
      technicalRigor: 5.4,
      methodologyValidation: 6.0,
      formattingAdherence: 7.2,
      languageClarity: 6.9
    },
    executiveSummary: `The manuscript presents a highly timely and innovative Physics-Informed Neural Network (PINN) approach for ship wave resistance prediction. However, it currently falls short of the rigorous computational and experimental standards required by Elsevier Ocean Engineering. Critical issues include the absence of a Grid Convergence Index (GCI) mesh study, missing water kinematic viscosity records in towing tank reports, informal colloquial phrasing in the abstract, and unjustified superlative claims. With comprehensive revisions addressing the technical concerns of Reviewers #1 and #2, the paper has strong potential for publication.`,
    guidelineCompliancePercentage: 74,
    passedChecks: [
      'Abstract word count (104 words) is strictly within the 250-word Elsevier limit.',
      'Highlights adhere to 3-5 bullet points requirement.',
      'Section numbering format follows 1., 1.1 decimal hierarchy.',
      'Key reference citations (Holtrop 1982, Raissi 2019, ITTC 2011) are indexed in Scopus/WoS.',
      'Scope matches Ocean Engineering hydrodynamics focus.'
    ],
    issuesFound: [
      {
        id: 'iss-1',
        category: 'methodology',
        severity: 'critical',
        title: 'Missing Grid Convergence Index (GCI) & Mesh Verification',
        description: 'CFD calculations mention a 4.5M cell mesh without demonstrating grid independence according to ITTC Recommended Procedures 7.5-03-01-01 (Celik et al., 2008).',
        location: 'Section 2: Numerical & Experimental Methods',
        originalSnippet: 'The CFD domain contained 4.5 million unstructured tetrahedral cells. Turbulence was modeled using k-omega SST.',
        suggestedFix: 'In accordance with ITTC 7.5-03-01-01, three systematically refined meshes (Coarse: 1.8M, Medium: 4.5M, Fine: 11.2M cells) were evaluated. The apparent order of convergence was p = 1.94, with a fine-grid numerical uncertainty GCI_21 = 0.42%.',
        ruleReference: 'ITTC Standard Procedures / Ocean Engineering CFD Policy'
      },
      {
        id: 'iss-2',
        category: 'rigor_uncertainty',
        severity: 'critical',
        title: 'Incomplete Experimental Towing Tank Conditions',
        description: 'Towing tank reports must specify exact water temperature, mass density (rho), and kinematic viscosity (nu) to calculate Reynolds number scaling accurately.',
        location: 'Section 2: Numerical & Experimental Methods',
        originalSnippet: 'We did not record the water temperature, but it was around room temperature.',
        suggestedFix: 'Water temperature was maintained at T = 18.5 deg C (rho = 998.4 kg/m^3, nu = 1.042 x 10^-6 m^2/s). Frictional resistance was scaled using the ITTC-1957 model-ship correlation line.',
        ruleReference: 'ITTC 7.5-02-02-01 Resistance Testing Guidelines'
      },
      {
        id: 'iss-3',
        category: 'tone_grammar',
        severity: 'warning',
        title: 'Informal / Unsubstantiated Academic Tone in Abstract',
        description: 'Phrases such as "huge improvement", "lots of CFD", and "completely solves" violate academic objectivity standards.',
        location: 'Abstract',
        originalSnippet: 'In this paper we investigate a huge improvement in ship hydrodynamics using machine learning. We did tests in the towing tank and ran lots of CFD calculations... Our PINN model completely solves the wave resistance problem...',
        suggestedFix: 'This study presents a Physics-Informed Neural Network (PINN) computational framework for predicting free-surface wave resistance on high-speed container vessels. Systematic towing tank experiments and Reynolds-Averaged Navier-Stokes (RANS) numerical simulations were performed...',
        ruleReference: 'Elsevier Author Language & Scientific Precision Guide'
      },
      {
        id: 'iss-4',
        category: 'formatting',
        severity: 'warning',
        title: 'Missing Mandatory Data Availability Statement',
        description: 'Elsevier Ocean Engineering mandates a formal Data Availability Statement declaring whether raw CFD meshes and towing tank time-series are archived in an open repository.',
        location: 'End of Manuscript (Pre-References)',
        suggestedFix: 'Data Availability Statement: The experimental towing tank datasets and trained neural network weights generated during this study are openly accessible in the AI Maritime Research Repository under DOI: 10.1016/j.oceaneng.2026.data.',
        ruleReference: 'Elsevier Data Policy 2026'
      },
      {
        id: 'iss-5',
        category: 'methodology',
        severity: 'suggestion',
        title: 'Vague Wall Boundary Layer Resolution (y+)',
        description: 'The manuscript states "wall y+ was maintained within reasonable boundaries". SST k-omega requires explicit statement of y+ < 1 for viscous sublayer resolution.',
        location: 'Section 2: Numerical & Experimental Methods',
        originalSnippet: 'The wall y+ was maintained within reasonable boundaries.',
        suggestedFix: 'Prism layer inflation parameters were calibrated to ensure a non-dimensional wall distance y+ < 1.0 across the entire wetted hull surface, resolving the viscous sublayer without wall functions.',
        ruleReference: 'AIAA / ITTC CFD Quality Assurance'
      }
    ],
    reviewers: [
      {
        reviewerNumber: 1,
        reviewerPersona: 'Senior Class Society & Marine Industry Specialist',
        affiliationType: 'DNV Maritime R&D / Bureau Veritas',
        recommendation: 'Minor Revision',
        overallAssessment: `The authors present an exciting and innovative machine learning framework that could significantly accelerate hull form optimization for IMO EEDI / CII decarbonization projects. The integration of Navier-Stokes conservation laws directly into neural loss functions is sound. However, the manuscript needs to clearly address operational regulatory compliance and experimental calibration details.`,
        strengths: [
          'Strong practical relevance to container vessel fuel efficiency and voyage optimization.',
          'Substantial reduction in inference latency (14.2 ms) enabling real-time Pareto optimization.',
          'Comprehensive validation across multiple Froude numbers (Fn = 0.14 to 0.28).'
        ],
        majorCritiques: [
          'Please state clearly whether the 99.4% correlation accounts for scale effects (ITTC-1978 Form Factor method) when extrapolated to full-scale vessel dimensions.',
          'Include a formal discussion on how this method complies with Class Society rules regarding digital twin simulation accreditation.'
        ],
        minorPoints: [
          'Add water physical properties (temperature, kinematic viscosity) to Section 2.',
          'Correct informal wording in the Abstract (avoid "huge improvement" and "completely solves").'
        ],
        scientificScore: 8.0
      },
      {
        reviewerNumber: 2,
        reviewerPersona: 'Rigorous Hydrodynamics & Computational Fluid Dynamics (CFD) Academic',
        affiliationType: 'Department of Naval Architecture, Top University',
        recommendation: 'Major Revision',
        overallAssessment: `While Physics-Informed Neural Networks are popular, computational rigor must not be sacrificed. The authors make broad claims of "revolutionary performance" without providing standard verification and validation (V&V). No Grid Convergence Index (GCI) is shown, and the boundary layer mesh resolution (y+) is vaguely described. Before this paper can be accepted for Ocean Engineering, the authors must satisfy fundamental fluid mechanics reporting standards.`,
        strengths: [
          'Mathematical embedding of continuity and momentum residuals into PINN architecture is correctly formulated.',
          'Comparison with experimental wave probe data shows promising agreement in primary bow wave crest.'
        ],
        majorCritiques: [
          'Mandatory: Perform a 3-grid Grid Convergence Index (GCI) study following Celik et al. (2008) / ITTC 7.5-03-01-01.',
          'Clarify the turbulence closure model in the boundary layer: Was y+ verified to be less than 1 everywhere, especially near the bulbous bow and stern skeg?',
          'The claim that the model "completely solves" wave resistance is mathematically inaccurate and scientifically unfounded. Tone down assertions.'
        ],
        minorPoints: [
          'Figure 1 lacks uncertainty error bars on the physical towing tank wave probe data.',
          'Provide the loss curve convergence history and training epoch count.'
        ],
        scientificScore: 5.5
      },
      {
        reviewerNumber: 3,
        reviewerPersona: 'Applied Mathematics & Machine Learning in Engineering Auditor',
        affiliationType: 'Institute of Marine AI & Data Science',
        recommendation: 'Minor Revision',
        overallAssessment: `The neural network architecture is well-constructed using modern PyTorch / JAX operators. The loss weighting between physics residuals and boundary conditions is appropriate. The paper is well-suited for the readership of Ocean Engineering provided a few open-science and statistical validation requirements are fulfilled.`,
        strengths: [
          'Clean explanation of the PINN loss formulation.',
          'Clear presentation of GPU computational latency benchmarks.'
        ],
        majorCritiques: [
          'Include a Data Availability Statement with links to open-source repository or supplementary weights.',
          'Provide 5-fold cross-validation results to demonstrate generalization to untrained hull Froude numbers.'
        ],
        minorPoints: [
          'Fix references format to follow Elsevier Harvard standard consistently.',
          'Add a Nomenclature table defining all symbols (CT, CF, CW, Fn, Rn, y+).'
        ],
        scientificScore: 7.5
      }
    ],
    generatedRebuttalOutline: `**Comprehensive Response to Reviewers' Comments**
Manuscript: Physics-Informed Neural Networks for Free-Surface Wave Resistance Prediction of Ultra-Large Container Vessels
Target Journal: Ocean Engineering (Elsevier)

Dear Editor-in-Chief and Esteemed Reviewers,

We express our sincere gratitude to the Associate Editor and the three Reviewers for their constructive, insightful, and rigorous evaluation of our manuscript. In this revised submission, we have thoroughly addressed all comments and incorporated significant technical additions:

1. Grid Convergence Index (GCI): We have performed a comprehensive 3-grid convergence study (1.8M, 4.5M, 11.2M cells) in accordance with ITTC 7.5-03-01-01, yielding GCI_21 = 0.42% (Section 2.3, Table 3).
2. Experimental Parameters: Full water physical properties (T = 18.5°C, rho = 998.4 kg/m^3, nu = 1.042e-6 m^2/s) and towing tank sensor calibration error bars (+-0.8%) have been documented (Section 2.1).
3. Academic Tone & Language: All informal phrasing in the Abstract and Body has been rewritten into objective academic English.
4. Data Availability Statement & Nomenclature: Both sections have been formally integrated prior to the References list.

Below is our point-by-point response to each specific critique.`
  });

  const selectedJournal = JOURNAL_GUIDELINES.find(j => j.id === targetJournalId) || JOURNAL_GUIDELINES[0];

  const handleSelectSample = (paperId: string) => {
    setSelectedPaperId(paperId);
    const p = SAMPLE_PAPERS.find(s => s.id === paperId);
    if (p) {
      setPaperTitle(p.title);
      setPaperAbstract(p.abstract);
      setPaperHighlights(p.highlights);
      setPaperBody(p.body);
      setTargetJournalId(p.targetJournalId);
    }
  };

  const handleRunReviewSimulation = () => {
    setIsReviewing(true);
    setReviewProgress(10);
    setReviewStage('Auditing Target Journal Formatting Guidelines...');

    const stages = [
      { p: 30, text: 'Scanning Manuscript for Common Academic & Grammar Errors...' },
      { p: 55, text: 'Verifying Maritime Engineering & CFD Numerical Rigor (ITTC/IMO Standards)...' },
      { p: 80, text: 'Simulating Multi-Reviewer Double-Blind Evaluation (Reviewer 1, 2, 3)...' },
      { p: 95, text: 'Formulating Associate Editor Verdict & Synthesizing Rebuttal Dossier...' }
    ];

    stages.forEach((st, idx) => {
      setTimeout(() => {
        setReviewProgress(st.p);
        setReviewStage(st.text);
      }, (idx + 1) * 350);
    });

    setTimeout(() => {
      setIsReviewing(false);
      setReviewProgress(100);
      setActiveTab('review_results');
    }, 1800);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleApplySingleFix = (issue: AcademicIssue) => {
    if (issue.suggestedFix) {
      // If we have original snippet in body, replace it
      if (issue.originalSnippet && paperBody.includes(issue.originalSnippet)) {
        const newBody = paperBody.replace(issue.originalSnippet, issue.suggestedFix);
        setPaperBody(newBody);
        if (onApplyFixToWorkspace) onApplyFixToWorkspace(newBody);
      } else if (issue.category === 'tone_grammar') {
        setPaperAbstract(issue.suggestedFix);
      } else {
        setPaperBody(prev => prev + '\n\n' + issue.suggestedFix);
      }
      // Update simulation result issue to resolved
      if (simulationResult) {
        setSimulationResult({
          ...simulationResult,
          issuesFound: simulationResult.issuesFound.filter(i => i.id !== issue.id),
          passedChecks: [...simulationResult.passedChecks, `Resolved: ${issue.title}`]
        });
      }
    }
  };

  const wordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-slate-950 shadow-md shadow-cyan-500/20">
              <ShieldCheck className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">AI Peer Reviewer & Journal Auditor</h3>
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold rounded-full uppercase">
                  Double-Blind Simulator v3.4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Simulates real-world journal peer review (Elsevier, IEEE, SNAME, RINA) — audits academic errors, CFD/experimental rigor, and formatting adherence.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions & Navigation Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'review_results', label: 'Review Verdict & Critiques', icon: <Award className="w-3.5 h-3.5" /> },
              { id: 'editor', label: 'Manuscript Input', icon: <FileText className="w-3.5 h-3.5" /> },
              { id: 'rebuttal_generator', label: 'Author Rebuttal Letter', icon: <MessageSquare className="w-3.5 h-3.5" /> },
              { id: 'guidelines_matrix', label: 'Journal Rules Matrix', icon: <BookOpen className="w-3.5 h-3.5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleRunReviewSimulation}
            disabled={isReviewing}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReviewing ? 'animate-spin' : ''}`} />
            {isReviewing ? 'Auditing Paper...' : 'Run AI Peer Review'}
          </button>
        </div>
      </div>

      {/* Interactive Progress Indicator during Review */}
      {isReviewing && (
        <div className="p-5 bg-slate-950 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-cyan-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              {reviewStage}
            </span>
            <span className="font-mono text-slate-400">{reviewProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${reviewProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Content Areas */}
      <div className="p-6">
        {/* ========================================================================= */}
        {/* TAB 1: REVIEW VERDICT & CRITIQUES */}
        {/* ========================================================================= */}
        {activeTab === 'review_results' && simulationResult && (
          <div className="space-y-6">
            {/* Top Verdict Overview Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Associate Editor Decision Box */}
              <div className="lg:col-span-2 p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-cyan-400" />
                      Target: {simulationResult.targetJournal}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${
                        simulationResult.associateEditorVerdict.includes('Accept')
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : simulationResult.associateEditorVerdict.includes('Minor')
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : simulationResult.associateEditorVerdict.includes('Major')
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      Verdict: {simulationResult.associateEditorVerdict}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    {simulationResult.manuscriptTitle}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {simulationResult.executiveSummary}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span>Guideline Compliance: <strong className="text-cyan-400">{simulationResult.guidelineCompliancePercentage}%</strong></span>
                    <span>Critical Issues: <strong className="text-rose-400">{simulationResult.issuesFound.filter(i => i.severity === 'critical').length}</strong></span>
                    <span>Warnings: <strong className="text-amber-400">{simulationResult.issuesFound.filter(i => i.severity === 'warning').length}</strong></span>
                  </div>

                  <button
                    onClick={() => setActiveTab('rebuttal_generator')}
                    className="text-cyan-400 font-bold hover:text-cyan-300 flex items-center gap-1"
                  >
                    Draft Author Rebuttal Letter <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scientific Scorecard Radar / Bars */}
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Scorecard Index</span>
                    <span className="text-lg font-black text-cyan-400">{simulationResult.overallScore} / 10</span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { label: 'Originality & Novelty', val: simulationResult.scoreBreakdown.originality, color: 'bg-cyan-500' },
                      { label: 'Technical Rigor & CFD', val: simulationResult.scoreBreakdown.technicalRigor, color: 'bg-rose-500' },
                      { label: 'Methodology Validation', val: simulationResult.scoreBreakdown.methodologyValidation, color: 'bg-amber-500' },
                      { label: 'Journal Formatting', val: simulationResult.scoreBreakdown.formattingAdherence, color: 'bg-emerald-500' },
                      { label: 'Clarity & Academic English', val: simulationResult.scoreBreakdown.languageClarity, color: 'bg-blue-500' }
                    ].map((s, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-400">{s.label}</span>
                          <span className="font-bold text-white font-mono">{s.val.toFixed(1)}/10</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`${s.color} h-full rounded-full transition-all`}
                            style={{ width: `${s.val * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 text-center">
                  Benchmarked against Scopus Q1 Maritime Engineering Acceptance Standards
                </div>
              </div>
            </div>

            {/* Detected Academic Errors & Auto-Fix Panel */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">
                    Detected Academic Errors & Journal Guideline Deviations ({simulationResult.issuesFound.length})
                  </h4>
                </div>
                <span className="text-xs text-slate-400">
                  Click "Quick Fix" to automatically update the manuscript in your workspace
                </span>
              </div>

              <div className="space-y-3">
                {simulationResult.issuesFound.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-4 rounded-xl border transition-all ${
                      issue.severity === 'critical'
                        ? 'bg-rose-950/20 border-rose-800/40'
                        : issue.severity === 'warning'
                        ? 'bg-amber-950/20 border-amber-800/40'
                        : 'bg-blue-950/20 border-blue-800/40'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                              issue.severity === 'critical'
                                ? 'bg-rose-500/20 text-rose-300'
                                : issue.severity === 'warning'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {issue.severity}
                          </span>
                          <h5 className="text-xs font-bold text-white">{issue.title}</h5>
                          <span className="text-[11px] text-slate-400 font-mono">[{issue.location}]</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">{issue.description}</p>

                        {issue.originalSnippet && (
                          <div className="mt-2 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-rose-300">
                            <span className="text-[10px] text-slate-500 block">Original Text Snippet:</span>
                            "{issue.originalSnippet}"
                          </div>
                        )}

                        {issue.suggestedFix && (
                          <div className="mt-2 p-2 bg-slate-900 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-300">
                            <span className="text-[10px] text-emerald-400 block font-bold">Suggested AI Standard Fix:</span>
                            "{issue.suggestedFix}"
                          </div>
                        )}

                        <div className="text-[10px] text-slate-500 mt-1">
                          Standard Rule: {issue.ruleReference}
                        </div>
                      </div>

                      {issue.suggestedFix && (
                        <button
                          onClick={() => handleApplySingleFix(issue)}
                          className="px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-xs font-bold rounded-lg border border-emerald-500/40 transition-all whitespace-nowrap flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Apply Quick Fix
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Reviewer Simulation Tabs */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Double-Blind Reviewer Reports (3 Reviewers)
                </h4>

                {/* Reviewer Tab Switcher */}
                <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  {simulationResult.reviewers.map((r, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveReviewerTab(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        activeReviewerTab === idx
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Reviewer #{r.reviewerNumber} ({r.recommendation})
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Reviewer Detailed Report Card */}
              {simulationResult.reviewers[activeReviewerTab] && (
                <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          Reviewer #{simulationResult.reviewers[activeReviewerTab].reviewerNumber}: {simulationResult.reviewers[activeReviewerTab].reviewerPersona}
                        </span>
                        <span className="text-[10px] text-slate-400">({simulationResult.reviewers[activeReviewerTab].affiliationType})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Scientific Score:</span>
                      <span className="text-xs font-bold text-cyan-400 font-mono">
                        {simulationResult.reviewers[activeReviewerTab].scientificScore} / 10
                      </span>
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-slate-800 text-slate-200">
                        {simulationResult.reviewers[activeReviewerTab].recommendation}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950 p-3 rounded-lg border border-slate-800">
                    "{simulationResult.reviewers[activeReviewerTab].overallAssessment}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="p-3.5 bg-slate-950 border border-emerald-500/20 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Key Strengths Noted:
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                        {simulationResult.reviewers[activeReviewerTab].strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Major Critiques */}
                    <div className="p-3.5 bg-slate-950 border border-rose-500/20 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Major Critiques Required for Revision:
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                        {simulationResult.reviewers[activeReviewerTab].majorCritiques.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MANUSCRIPT INPUT & PRESETS */}
        {/* ========================================================================= */}
        {activeTab === 'editor' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div>
                <span className="text-xs font-bold text-white block">Load Sample Manuscript Preset:</span>
                <span className="text-[11px] text-slate-400">Choose a test paper or write your own</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {SAMPLE_PAPERS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSample(s.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      selectedPaperId === s.id
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {s.id === 'paper_1' ? 'PINN Wave Resistance' : 'Cavitation Tunnel PIV'}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Journal Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Target Journal & Guidelines:</label>
                <select
                  value={targetJournalId}
                  onChange={(e) => setTargetJournalId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
                >
                  {JOURNAL_GUIDELINES.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.name} ({j.publisher}) — Max {j.maxAbstractWords} words
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Article Title:</label>
                <input
                  type="text"
                  value={paperTitle}
                  onChange={(e) => setPaperTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Highlights (if required by journal) */}
            {selectedJournal.requiresHighlights && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-300">
                    Highlights (Mandatory for {selectedJournal.name}):
                  </label>
                  <span className="text-[11px] text-slate-400">3-5 bullets, max 85 chars each</span>
                </div>
                <textarea
                  value={paperHighlights}
                  onChange={(e) => setPaperHighlights(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            )}

            {/* Abstract */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-300">
                  Abstract ({wordCount(paperAbstract)} words / Limit: {selectedJournal.maxAbstractWords}):
                </label>
                <span
                  className={`text-[11px] font-bold ${
                    wordCount(paperAbstract) > selectedJournal.maxAbstractWords
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {wordCount(paperAbstract) > selectedJournal.maxAbstractWords ? 'Exceeds Word Limit' : 'Within Limit'}
                </span>
              </div>
              <textarea
                value={paperAbstract}
                onChange={(e) => setPaperAbstract(e.target.value)}
                rows={4}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            {/* Manuscript Body (Methodology, Results, Discussion, References) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-300">
                  Manuscript Text (Sections 1 to 5, Equations, References):
                </label>
                <button
                  onClick={() => handleCopy(paperBody, 'body_copy')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copiedKey === 'body_copy' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <textarea
                value={paperBody}
                onChange={(e) => setPaperBody(e.target.value)}
                rows={12}
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleRunReviewSimulation}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Sparkles className="w-4 h-4" />
                Run AI Reviewer on this Manuscript
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: AUTHOR REBUTTAL LETTER GENERATOR */}
        {/* ========================================================================= */}
        {activeTab === 'rebuttal_generator' && simulationResult && (
          <div className="space-y-4">
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Automated Point-by-Point Author Rebuttal Letter</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pre-formatted academic response letter mapping every reviewer critique to revision actions.
                </p>
              </div>

              <button
                onClick={() => handleCopy(simulationResult.generatedRebuttalOutline, 'rebuttal_copy')}
                className="px-3.5 py-1.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedKey === 'rebuttal_copy' ? 'Copied to Clipboard' : 'Copy Rebuttal Letter'}
              </button>
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-line max-h-[500px] overflow-y-auto">
              {simulationResult.generatedRebuttalOutline}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: JOURNAL GUIDELINES MATRIX */}
        {/* ========================================================================= */}
        {activeTab === 'guidelines_matrix' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <h4 className="text-sm font-bold text-white">Premier Maritime Journals Formatting Requirements Matrix</h4>
              <p className="text-xs text-slate-400 mt-1">
                Adherence rules across major Elsevier, IEEE, Springer, SNAME, and RINA publications.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                    <th className="p-3 font-semibold">Journal</th>
                    <th className="p-3 font-semibold">Publisher</th>
                    <th className="p-3 font-semibold">Max Abstract</th>
                    <th className="p-3 font-semibold">Citation Style</th>
                    <th className="p-3 font-semibold">Highlights Required</th>
                    <th className="p-3 font-semibold">Data Statement</th>
                    <th className="p-3 font-semibold">Nomenclature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {JOURNAL_GUIDELINES.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">{j.name}</td>
                      <td className="p-3 text-cyan-400">{j.publisher}</td>
                      <td className="p-3 font-mono">{j.maxAbstractWords} words</td>
                      <td className="p-3 font-mono text-amber-300">{j.citationStyle}</td>
                      <td className="p-3">
                        {j.requiresHighlights ? (
                          <span className="text-emerald-400 font-semibold">Yes (3-5 bullets)</span>
                        ) : (
                          <span className="text-slate-500">Optional</span>
                        )}
                      </td>
                      <td className="p-3">
                        {j.requiresDataAvailability ? (
                          <span className="text-emerald-400 font-semibold">Mandatory</span>
                        ) : (
                          <span className="text-slate-500">Optional</span>
                        )}
                      </td>
                      <td className="p-3">
                        {j.requiresNomenclature ? (
                          <span className="text-emerald-400 font-semibold">Required</span>
                        ) : (
                          <span className="text-slate-500">Optional</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
