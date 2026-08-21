import { SeoArticle } from '../types';

export interface BlogArticle extends SeoArticle {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  updatedDate: string;
  schemaType: 'TechArticle' | 'NewsArticle' | 'EducationalArticle';
  canonicalUrl: string;
  metaDescription: string;
  targetKeywords: string[];
  readabilityScore: number; // 0-100
  likes: number;
  views: number;
}

export interface SponsoredUniversity {
  id: string;
  name: string;
  location: string;
  countryFlag: string;
  logoUrl: string;
  programTitle: string;
  degreeLevel: 'Bachelor' | 'Master' | 'PhD' | 'Executive Certificate';
  description: string;
  badge: 'Top Ranked' | 'Featured Partner' | 'DNV Certified' | 'Scholarship Available';
  applyUrl: string;
  tuitionDiscount?: string;
}

export interface SponsoredCompany {
  id: string;
  name: string;
  industryCategory: 'Classification Society' | 'Engine Manufacturer' | 'Shipyard' | 'Maritime Software' | 'Green Tech';
  logoUrl: string;
  tagline: string;
  promoBannerUrl: string;
  ctaText: string;
  ctaLink: string;
  featuredProduct: string;
}

export interface PromotedCourseAd {
  id: string;
  title: string;
  sponsorName: string;
  rating: number;
  enrolledStudents: number;
  badgeText: string;
  priceUSD: number;
  discountPriceUSD?: number;
  thumbnailUrl: string;
  targetRoles: string[];
}

export const SAMPLE_BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'solas-2026-compliance-guide',
    title: 'SOLAS 2026 Amendments: Complete Maritime Engineering & Safety Manual',
    category: 'IMO Regulations',
    excerpt: 'Deep-dive analysis of new SOLAS Chapter II-1 subdivision standards, Chapter II-2 fire safety upgrades, and digital logbook verification protocols enforced by Port State Control.',
    readTime: '9 min read',
    publishedDate: 'July 20, 2026',
    updatedDate: 'July 24, 2026',
    author: {
      name: 'Dr. Aris Thorne, FRINA',
      role: 'Principal Naval Architect & IMO Delegate',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    schemaType: 'TechArticle',
    canonicalUrl: 'https://maritimehub.ai/blog/solas-2026-compliance-guide',
    metaDescription: 'Comprehensive SOLAS 2026 compliance manual for marine engineers, naval architects, and ship managers. Download checklists and AI audit prompts.',
    targetKeywords: ['SOLAS 2026 Amendments', 'IMO Safety Code', 'Ship Subdivision Stability', 'LSA Code Audit'],
    keywords: ['SOLAS 2026', 'IMO Regulations', 'Maritime Safety', 'Port State Control', 'Naval Engineering'],
    readabilityScore: 88,
    likes: 342,
    views: 4890,
    contentMarkdown: `# SOLAS 2026 Amendments: Complete Maritime Engineering & Safety Manual

The **International Maritime Organization (IMO)** has officially enacted the 2026 amendments to the **SOLAS (Safety of Life at Sea)** convention. This comprehensive guide outlines the critical operational, structural, and digital requirements that shipyards, naval architects, and marine engineers must implement.

---

## 1. Chapter II-1: Subdivision & Intact/Damage Stability Standards

Key changes to SOLAS Chapter II-1 center on enhanced **Attained Subdivision Index (A)** calculations for passenger and cargo vessels above 80 meters in length:

- **Damage Control Documentation**: Real-time computerized stability calculation software approved by Classification Societies (DNV, Lloyd's Register, ClassNK) is now mandatory on all newbuilds.
- **Watertight Door Status Indicators**: Dual-redundant optical and digital telemetry required at the Navigation Bridge and Engine Control Room (ECR).

\`\`\`
Subdivision Index Formula: A = ∑ (p_i × s_i × v_i) ≥ R
Where:
p_i = Probability of compartment i flooding
s_i = Probability of surviving flooding of compartment i
v_i = Factor accounting for horizontal boundaries
\`\`\`

---

## 2. Chapter II-2: Enhanced Fire Protection & Battery Room Safety

With the surge in **hybrid and electric propulsion vessels**, new amendments explicitly target lithium-ion battery compartments and alternative fuel spaces (Methanol, Ammonia, LNG):

1. **Fixed Gas Fire Extinguishing Systems**: Novec 1230 / FK-5-1-12 or high-expansion foam mandatory in all energy storage rooms.
2. **Thermal Runaway Early Detection**: Off-gas hydrogen & VOC detectors linked to automatic ventilation shut-offs.

---

## 3. Digital Logbooks & IMO MSC.1/Circ.1600 Verification

Port State Control (PSC) inspectors in the EU, US Coast Guard, and Tokyo MOU will now accept **Cryptographically Signed Electronic Record Books** for:
- Oil Record Book (Part I & II)
- Cargo Record Book
- Garbage Record Book
- Ballast Water Record Book

> **Pro Tip:** Use the *AI Maritime Hub SOLAS Auditor* in our AI Chat assistant to evaluate your ship's compliance documents against the latest MSC circulars.`
  },
  {
    id: 'blog-2',
    slug: 'methanol-vs-ammonia-decarbonization-2026',
    title: 'Methanol vs Ammonia: Dual-Fuel Marine Engine Hydrodynamic & Thermodynamic Analysis',
    category: 'Decarbonization & Green Tech',
    excerpt: 'Comparative technical study analyzing energy density, bunkering logistics, pilot fuel ratios, and CAPEX/OPEX payback for green methanol vs green ammonia marine powerplants.',
    readTime: '12 min read',
    publishedDate: 'July 18, 2026',
    updatedDate: 'July 23, 2026',
    author: {
      name: 'Prof. Hiroshi Tanaka',
      role: 'Chief Marine Propulsion Researcher',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    schemaType: 'TechArticle',
    canonicalUrl: 'https://maritimehub.ai/blog/methanol-vs-ammonia-decarbonization-2026',
    metaDescription: 'Detailed engineering comparison between Methanol and Ammonia dual-fuel engines for bulk carriers, container ships, and tankers.',
    targetKeywords: ['Methanol Marine Fuel', 'Ammonia Dual Fuel Engine', 'Green Shipping OPEX', 'IMO CII Compliance'],
    keywords: ['Methanol Engine', 'Ammonia Fuel', 'Green Shipping', 'Marine Decarbonization', 'CII Rating'],
    readabilityScore: 82,
    likes: 512,
    views: 7320,
    contentMarkdown: `# Methanol vs Ammonia: Dual-Fuel Marine Engine Hydrodynamic & Thermodynamic Analysis

As the **IMO 2030 and 2050 GHG reduction targets** approach, shipowners are ordering dual-fuel ocean-going vessels at unprecedented rates. The two primary frontrunners are **Green Methanol (CH3OH)** and **Green Ammonia (NH3)**.

---

## Technical Performance Matrix

| Metric | Very Low Sulfur Fuel Oil (VLSFO) | Green Methanol | Green Ammonia |
| :--- | :--- | :--- | :--- |
| **Lower Heating Value (LHV)** | 42.7 MJ/kg | 19.9 MJ/kg | 18.6 MJ/kg |
| **Volumetric Energy Density** | 36.0 GJ/m³ | 15.8 GJ/m³ | 12.7 GJ/m³ |
| **Storage Temperature** | Ambient | Ambient | -33.4 °C (or 10 bar) |
| **Toxicity Level** | Low | Low-Moderate | Extremely High |
| **Pilot Fuel Needed** | N/A | 3-5% Diesel | 5-10% Diesel |
| **CO2 Emission Factor** | 3.114 g/g fuel | ~0 (Well-to-Wake) | 0 (Zero Carbon) |

---

## Tank Space Impact on Container Ship Capacity

Because methanol requires ~2.3x and ammonia requires ~2.8x the tank volume of conventional VLSFO for the same nautical range, naval architects must alter cargo hold layouts:

1. **Methanol Tankage**: Can utilize double-bottom and deep tanks with stainless steel lining or epoxy coatings.
2. **Ammonia Tankage**: Requires Type C independent pressure vessels, reducing TEU capacity by approximately **2.4% to 3.8%** on an 18,000 TEU ultra-large container vessel (ULCV).`
  },
  {
    id: 'blog-3',
    slug: 'cfd-mesh-optimization-openfoam',
    title: 'Automated CFD Mesh Optimization for Ship Hull Resistance Reduction using OpenFOAM',
    category: 'Engineering Tutorials',
    excerpt: 'Step-by-step tutorial on generating snappyHexMesh boundary layers, calculating y+ values for turbulent hull flow, and calculating wave-making resistance coefficients.',
    readTime: '15 min read',
    publishedDate: 'July 12, 2026',
    updatedDate: 'July 21, 2026',
    author: {
      name: 'Elena Vance, MSc',
      role: 'Hydrodynamics Simulation Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    schemaType: 'EducationalArticle',
    canonicalUrl: 'https://maritimehub.ai/blog/cfd-mesh-optimization-openfoam',
    metaDescription: 'Master OpenFOAM CFD hull resistance simulations. Learn snappyHexMesh configuration, boundary layer grid refinement, and wave pattern visualization.',
    targetKeywords: ['OpenFOAM Ship CFD', 'Hull Resistance Simulation', 'snappyHexMesh Tutorial', 'Froude Wave Pattern'],
    keywords: ['CFD Simulation', 'OpenFOAM', 'Hydrodynamics', 'Hull Resistance', 'Naval Architecture'],
    readabilityScore: 78,
    likes: 289,
    views: 3950,
    contentMarkdown: `# Automated CFD Mesh Optimization for Ship Hull Resistance Reduction using OpenFOAM

Computational Fluid Dynamics (CFD) is now standard in naval architecture for predicting **Effective Power (PE)** and optimizing energy saving devices (ESDs) like Mewis ducts and pre-swirl stators.

---

## 1. Boundary Layer y+ Calculation for k-omega SST Turbulence Model

For accurate frictional resistance calculation, the first cell distance ($y_1$) off the hull surface must ensure $y^+ \approx 1$ (for resolved boundary layers) or $30 < y^+ < 300$ (when using wall functions).

\`\`\`
y_1 = (y^+ × ν) / u_τ
Where:
ν = Kinematic viscosity of sea water (1.188 × 10^-6 m²/s at 15°C)
u_τ = Friction velocity = √(τ_w / ρ)
\`\`\`

---

## 2. Setting Up Volume of Fluid (VOF) Free Surface in 'interFoam'

To capture Kelvin wave patterns and bow wave breaking, refinement boxes around the free surface waterline must have at least 15-20 cells per wave height:

\`\`\`systemd
// snappyHexMeshDict refinement snippet
refinementSurfaces
{
    hull
    {
        level (4 5);
        patchInfo { type wall; }
    }
}
refinementRegions
{
    freeSurfaceBox
    {
        mode inside;
        levels ((1.0 4));
    }
}
\`\`\``
  },
  {
    id: 'blog-4',
    slug: 'hkc-2025-green-ship-recycling-mastery',
    title: 'Hong Kong Convention 2025/2026: Ship Recycling & Hazardous Material Inventory (IHM)',
    category: 'Ship Recycling & Green Tech',
    excerpt: 'Detailed compliance manual on IHM Part I preparation, HazMat visual sampling, asbestos abatement, and green shipyard audits under HKC rules.',
    readTime: '8 min read',
    publishedDate: 'July 08, 2026',
    updatedDate: 'July 19, 2026',
    author: {
      name: 'Capt. Marcus Lindqvist',
      role: 'Senior Green Ship Recycling Auditor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    schemaType: 'TechArticle',
    canonicalUrl: 'https://maritimehub.ai/blog/hkc-2025-green-ship-recycling-mastery',
    metaDescription: 'Learn how to generate IHM Part I, II, III for HKC ship recycling compliance with automated AI documentation tools.',
    targetKeywords: ['HKC Ship Recycling', 'IHM Hazardous Materials', 'Asbestos Clearance Certificate', 'Green Yard Audit'],
    keywords: ['HKC 2025', 'IHM Management', 'Ship Recycling', 'Green Yard', 'Asbestos Audit'],
    readabilityScore: 85,
    likes: 198,
    views: 2840,
    contentMarkdown: `# Hong Kong Convention (HKC) 2025/2026: Ship Recycling & Hazardous Material Inventory (IHM)

With the **Hong Kong International Convention for the Safe and Environmentally Sound Recycling of Ships (HKC)** entering global force, shipowners and ship recycling facilities (SRFs) face mandatory compliance checks across Alang (India), Chattogram (Bangladesh), and Aliaga (Turkey).

---

## Key Hazardous Substances Regulated under HKC Table A & B:
- **Table A (Prohibited in new ships)**: Asbestos, Ozone Depleting Substances (ODS), PCBs, Organotin Anti-fouling compounds.
- **Table B (Restricted & Quantified)**: Cadmium, Hexavalent Chromium, Lead, Mercury, Polybrominated Biphenyls (PBBs), Radioactive Substances.`
  }
];

export const SPONSORED_UNIVERSITIES: SponsoredUniversity[] = [
  {
    id: 'uni-1',
    name: 'World Maritime University (WMU)',
    location: 'Malmö, Sweden',
    countryFlag: '🇸🇪',
    logoUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
    programTitle: 'MSc in Maritime Affairs & Decarbonization Policy',
    degreeLevel: 'Master',
    description: 'Founded by the IMO. Specialist post-graduate education in Maritime Law, Safety Administration, Shipping Management & Port Governance.',
    badge: 'Top Ranked',
    applyUrl: 'https://wmu.se',
    tuitionDiscount: '$3,000 IMO Fellow Grant'
  },
  {
    id: 'uni-2',
    name: 'NTNU - Norwegian University of Science & Technology',
    location: 'Trondheim, Norway',
    countryFlag: '🇳🇴',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    programTitle: 'MSc Marine Technology & Autonomous Ship Engineering',
    degreeLevel: 'Master',
    description: 'World-renowned towing tank hydrodynamic testing facilities, marine cybernetics labs, and zero-emission vessel design programs.',
    badge: 'DNV Certified',
    applyUrl: 'https://ntnu.edu',
    tuitionDiscount: 'Full Merit Scholarship'
  },
  {
    id: 'uni-3',
    name: 'TU Delft (Delft University of Technology)',
    location: 'Delft, Netherlands',
    countryFlag: '🇳🇱',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    programTitle: 'MSc Marine Engineering & Offshore Dredging Tech',
    degreeLevel: 'Master',
    description: 'Leader in naval architectural hydrodynamics, offshore floating wind turbine substructures, and computational fluid mechanics.',
    badge: 'Featured Partner',
    applyUrl: 'https://tudelft.nl',
    tuitionDiscount: '15% Partner Waiver'
  },
  {
    id: 'uni-4',
    name: 'Maine Maritime Academy / SUNY Maritime',
    location: 'Maine & New York, USA',
    countryFlag: '🇺🇸',
    logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
    programTitle: 'BSc / Executive MS Marine Engineering Operations',
    degreeLevel: 'Bachelor',
    description: 'USCG License Unlimited Engineering Officer training paired with modern AI power generation and thermal plant management.',
    badge: 'Scholarship Available',
    applyUrl: 'https://mainemaritime.edu',
    tuitionDiscount: 'USCG Officer Stipend'
  }
];

export const SPONSORED_COMPANIES: SponsoredCompany[] = [
  {
    id: 'comp-1',
    name: 'DNV Maritime AI Suite',
    industryCategory: 'Classification Society',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    tagline: 'Automated Hull Structural Analysis & SOLAS 2026 Compliance',
    promoBannerUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Explore DNV Veracity AI',
    ctaLink: 'https://dnv.com/maritime',
    featuredProduct: 'DNV Nauticus 3D Hull Simulator & Veracity AI API'
  },
  {
    id: 'comp-2',
    name: 'Wärtsilä Decarbonization Hub',
    industryCategory: 'Engine Manufacturer',
    logoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
    tagline: 'W25 & W32 Methanol Dual-Fuel Propulsion Systems',
    promoBannerUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Download Fuel Tech Spec',
    ctaLink: 'https://wartsila.com',
    featuredProduct: 'Wärtsilä 25 Methanol Engine & Carbon Capture System'
  },
  {
    id: 'comp-3',
    name: 'Damen Shipyards Group',
    industryCategory: 'Shipyard',
    logoUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=200&q=80',
    tagline: 'Standardized Modular Tugboats & Electric Ferries',
    promoBannerUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Request Fleet Proposal',
    ctaLink: 'https://damen.com',
    featuredProduct: 'RSD E-Tug 2513 Fully Electric Harbor Tug'
  }
];

export const PROMOTED_COURSES_ADS: PromotedCourseAd[] = [
  {
    id: 'ad-course-1',
    title: 'Autonomous Vessel Navigation & COLREGs AI Algorithms',
    sponsorName: 'Kongsberg Maritime Academy',
    rating: 4.9,
    enrolledStudents: 3120,
    badgeText: 'Sponsored Masterclass',
    priceUSD: 89,
    discountPriceUSD: 49,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80',
    targetRoles: ['Naval Architect', 'Marine Engineer', 'Captain']
  },
  {
    id: 'ad-course-2',
    title: 'LNG & Methanol Bunkering Safety Certification (IGF Code)',
    sponsorName: 'Lloyds Register Academy',
    rating: 4.8,
    enrolledStudents: 2450,
    badgeText: 'IMO Certified Partner',
    priceUSD: 110,
    discountPriceUSD: 75,
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    targetRoles: ['Chief Engineer', 'Safety Officer', 'Surveyor']
  }
];

export interface AffiliateRecord {
  id: string;
  referredUser: string;
  emailMasked: string;
  planName: string;
  signupDate: string;
  status: 'Active' | 'Trial' | 'Cancelled' | 'Refunded';
  monthlySubscriptionUSD: number;
  commissionRatePercent: number; // 10%
  monthlyCommissionUSD: number;
}

export interface PayoutHistoryRecord {
  id: string;
  payoutDate: string;
  amountUSD: number;
  payoutMethod: 'Stripe Direct' | 'PayPal' | 'Bank Wire (IBAN)' | 'USDT Crypto';
  status: 'Completed' | 'Processing' | 'Pending';
  transactionReference: string;
}

export const SAMPLE_AFFILIATE_RECORDS: AffiliateRecord[] = [
  {
    id: 'ref-101',
    referredUser: 'Vanguard Maritime Ltd',
    emailMasked: 'contact@vanguard****.com',
    planName: 'Enterprise Plan',
    signupDate: 'July 14, 2026',
    status: 'Active',
    monthlySubscriptionUSD: 99,
    commissionRatePercent: 10,
    monthlyCommissionUSD: 9.90
  },
  {
    id: 'ref-102',
    referredUser: 'Capt. Jonathan Hayes',
    emailMasked: 'j.hayes@danish****.dk',
    planName: 'Professional Plan',
    signupDate: 'July 18, 2026',
    status: 'Active',
    monthlySubscriptionUSD: 25,
    commissionRatePercent: 10,
    monthlyCommissionUSD: 2.50
  },
  {
    id: 'ref-103',
    referredUser: 'MIT Marine Tech Club',
    emailMasked: 'marinetech@mit****.edu',
    planName: 'Student Bundle (10x)',
    signupDate: 'July 20, 2026',
    status: 'Active',
    monthlySubscriptionUSD: 80,
    commissionRatePercent: 10,
    monthlyCommissionUSD: 8.00
  },
  {
    id: 'ref-104',
    referredUser: 'Pacific Shipyard Engineering',
    emailMasked: 'designs@pacific****.sg',
    planName: 'Enterprise Plan',
    signupDate: 'July 22, 2026',
    status: 'Active',
    monthlySubscriptionUSD: 99,
    commissionRatePercent: 10,
    monthlyCommissionUSD: 9.90
  },
  {
    id: 'ref-105',
    referredUser: 'Nordic Hydrodynamics AS',
    emailMasked: 'sims@nordic****.no',
    planName: 'Professional Plan',
    signupDate: 'July 24, 2026',
    status: 'Active',
    monthlySubscriptionUSD: 25,
    commissionRatePercent: 10,
    monthlyCommissionUSD: 2.50
  }
];

export const SAMPLE_PAYOUT_HISTORY: PayoutHistoryRecord[] = [
  {
    id: 'PAY-8821',
    payoutDate: 'July 01, 2026',
    amountUSD: 120.00,
    payoutMethod: 'Stripe Direct',
    status: 'Completed',
    transactionReference: 'ch_3M0918239081290312'
  },
  {
    id: 'PAY-8104',
    payoutDate: 'June 01, 2026',
    amountUSD: 95.50,
    payoutMethod: 'PayPal',
    status: 'Completed',
    transactionReference: 'PP-9902182019'
  },
  {
    id: 'PAY-7640',
    payoutDate: 'May 01, 2026',
    amountUSD: 64.00,
    payoutMethod: 'Bank Wire (IBAN)',
    status: 'Completed',
    transactionReference: 'TR-BANK-2026050182'
  }
];
