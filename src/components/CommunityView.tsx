import React, { useState, useMemo } from 'react';
import {
  Users,
  MessageSquare,
  Award,
  Sparkles,
  Plus,
  ThumbsUp,
  Send,
  Share2,
  Bookmark,
  TrendingUp,
  Filter,
  Search,
  Image,
  FileCode2,
  BarChart2,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Anchor,
  Compass,
  Paperclip,
  Heart,
  UserPlus,
  UserCheck,
  Flame,
  Briefcase,
  Tag,
  MessageCircle,
  Download,
  Layers,
  Radio,
  X,
  Code,
  FileSpreadsheet,
  MapPin,
  DollarSign,
  ExternalLink,
  BookOpen,
  Microscope
} from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  role: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  isLiked?: boolean;
}

interface Post {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  timestamp: string;
  channel: string;
  category: 'technical' | 'research' | 'job';
  title: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  jobDetails?: {
    location: string;
    employmentType: string;
    salaryRange?: string;
    applyUrl?: string;
  };
  researchDetails?: {
    publicationDOI?: string;
    journal?: string;
    downloadUrl?: string;
  };
  attachment?: {
    type: 'cad' | 'dataset' | 'pdf' | 'image';
    name: string;
    size: string;
    downloads: number;
    url?: string;
  };
  poll?: {
    id: string;
    question: string;
    options: { id: string; label: string; votes: number }[];
    totalVotes: number;
    userVotedOptionId?: string;
  };
  likes: number;
  isLiked?: boolean;
  bookmarks: number;
  isBookmarked?: boolean;
  shares: number;
  comments: Comment[];
  verifiedBadge?: string;
}

interface Member {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  specialty: string;
  postsCount: number;
  followersCount: number;
  isFollowing: boolean;
  badge: string;
}

export const CommunityView: React.FC = () => {
  // Navigation Sub-Tabs
  const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'groups' | 'polls' | 'showcase'>('feed');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Channels
  const channels = [
    { id: 'all', label: '🌐 All Activity Stream', icon: <Globe className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'naval_architecture', label: '⚓ Naval Architecture & Hydrodynamics', icon: <Anchor className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'propeller_design', label: '🌀 Propeller & Blade Optimization', icon: <Compass className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'imo_regulations', label: '📜 IMO Regulations & Class Rules', icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'green_shipping', label: '🌱 Green Fuels & Wind Propulsion', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'cfd_openfoam', label: '💻 CFD & OpenFOAM Simulations', icon: <FileCode2 className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'autonomous_vessels', label: '🧭 Autonomous Ships (MASS)', icon: <Radio className="w-3.5 h-3.5 text-purple-400" /> },
  ];

  // Post Creator State
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newChannel, setNewChannel] = useState('naval_architecture');
  const [newCategory, setNewCategory] = useState<'technical' | 'research' | 'job'>('technical');
  const [newJobLocation, setNewJobLocation] = useState('');
  const [newJobSalary, setNewJobSalary] = useState('');
  const [newResearchJournal, setNewResearchJournal] = useState('');
  const [newCodeLanguage, setNewCodeLanguage] = useState('python');
  const [newCodeSnippet, setNewCodeSnippet] = useState('');
  const [includeCode, setIncludeCode] = useState(false);

  // Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'research' | 'job'>('all');

  // Comment Input State map (postId -> text)
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);

  // Initial Posts Data
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'post-1',
      author: 'Dr. Evelyn Vance, CEng MRINA',
      role: 'Principal Naval Architect',
      company: 'DNV Maritime Advisory / NTNU',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      timestamp: '2 hours ago',
      channel: 'naval_architecture',
      category: 'research',
      verifiedBadge: 'DNV Verified Surveyor',
      title: 'Benchmarking Holtrop-Mennen vs OpenFOAM VOF Wave Resistance on 220m Feeder Container Hull',
      content: 'We recently ran towed-tank validation tests for a 2,800 TEU feeder container vessel with a modified bulbous bow. At Froude number Fn = 0.21, the Holtrop-Mennen empirical formulation underpredicted wave-making resistance by approx 4.2% compared to full Reynolds-Averaged Navier-Stokes (RANS) VOF simulations in OpenFOAM v2312. Here is the Python snippet we used to extract viscous resistance coefficients (1+k) and wave spectra.',
      researchDetails: {
        journal: 'Journal of Ship Research (SNAME)',
        publicationDOI: '10.5957/JSR.2026.220',
      },
      codeSnippet: {
        language: 'python',
        code: `# ITTC 1957 Viscous Resistance & Form Factor Calculation
def calculate_viscous_drag(Rn, form_factor_k=0.18):
    # ITTC 1957 friction line
    Cf = 0.075 / ((math.log10(Rn) - 2.0) ** 2)
    # Total viscous coefficient Cv
    Cv = (1.0 + form_factor_k) * Cf
    return Cv, Cf

print("Feeder Hull Rn=1.2e9 -> Cv:", calculate_viscous_drag(1.2e9))`
      },
      attachment: {
        type: 'cad',
        name: 'Feeder_Container_Bulbous_Bow_IGES_v2.iges',
        size: '14.8 MB',
        downloads: 184,
      },
      likes: 84,
      isLiked: false,
      bookmarks: 32,
      isBookmarked: false,
      shares: 19,
      comments: [
        {
          id: 'c-1',
          author: 'Prof. Henrik Lindqvist',
          role: 'Chair of Hydrodynamics, Chalmers University',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
          timestamp: '1 hour ago',
          content: 'Excellent correlation! Did you notice any free-surface wave breaking near the shoulder at Fn > 0.23? In our Gothenburg tank tests, the non-linear wave crest caused a 6% discrepancy in 1+k extrapolation.',
          likes: 12,
        },
        {
          id: 'c-2',
          author: 'Eng. Hakeem Al-Mansoor',
          role: 'CFD Specialist, Seatrium Shipyard',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
          timestamp: '45 mins ago',
          content: 'Thanks for sharing the IGES geometry! What grid resolution y+ value did you maintain on the hull boundary layer for k-omega SST turbulence model?',
          likes: 8,
        }
      ]
    },
    {
      id: 'post-2',
      author: 'Capt. Thomas Sterling',
      role: 'Fleet Performance Director',
      company: 'Maersk Line / IMO Technical Delegate',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
      timestamp: '5 hours ago',
      channel: 'imo_regulations',
      category: 'technical',
      verifiedBadge: 'IMO Delegate',
      title: 'IMO MEPC 82 Update: Revised CII Reduction Factors (Z-Factors) & EEXI Compliance Deadlines for 2026/2027',
      content: 'Important news for vessel superintendents and shipowners: MEPC 82 has finalized the updated carbon intensity indicator (CII) operational reduction trajectory. Ships falling under "D" or "E" ratings for two consecutive years will require mandatory SEEMP Part III Corrective Action Plans audited by Recognized Organizations (ROs). What energy saving devices (ESDs) is your fleet implementing?',
      poll: {
        id: 'poll-mepc-1',
        question: 'Which Energy Saving Device (ESD) provides the highest ROI for your fleet to maintain CII Rating A/B?',
        options: [
          { id: 'opt-1', label: 'Rotor Sails / Wind-Assisted Propulsion (WAPS)', votes: 142 },
          { id: 'opt-2', label: 'Boss Cap Fins with Cutters (PBCF) + Duct', votes: 98 },
          { id: 'opt-3', label: 'Engine Power Limitation (EPL) + Shaft Generator', votes: 215 },
          { id: 'opt-4', label: 'Silicone Low-Friction Bio-Fouling Hull Coating', votes: 176 },
        ],
        totalVotes: 631,
      },
      likes: 142,
      isLiked: false,
      bookmarks: 78,
      isBookmarked: false,
      shares: 45,
      comments: [
        {
          id: 'c-3',
          author: 'Eng. Sarah Jenkins',
          role: 'Technical Superintendent',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
          timestamp: '3 hours ago',
          content: 'EPL combined with silicone anti-fouling gave our 180k DWT Capesize fleet an immediate 8.5% fuel saving, pushing us from C to B rating smoothly.',
          likes: 24,
        }
      ]
    },
    {
      id: 'post-job-1',
      author: 'Astrid Lindholm',
      role: 'Talent Lead - Naval Engineering',
      company: 'VesselTech Global / Rotterdam Ship Studio',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      timestamp: '6 hours ago',
      channel: 'naval_architecture',
      category: 'job',
      verifiedBadge: 'Verified Employer',
      title: 'Principal Hydrodynamicist & RANS CFD Lead - Zero-Emission Vessel Studio',
      content: 'We are seeking an experienced Naval Architect / Hydrodynamicist to lead our Rotterdam R&D team designing 180m methanol-powered feeder vessels and hydrofoil crew transfer craft. Requirements: 5+ years with OpenFOAM, FINE/Marine, or STAR-CCM+, plus DNV/LR Class approval workflows.',
      jobDetails: {
        location: 'Rotterdam, Netherlands (Hybrid)',
        employmentType: 'Full-Time Permanent',
        salaryRange: '€95,000 - €125,000 / year + Relocation',
      },
      likes: 67,
      isLiked: false,
      bookmarks: 41,
      isBookmarked: false,
      shares: 22,
      comments: []
    },
    {
      id: 'post-3',
      author: 'Lars Olofsson, M.Sc.',
      role: 'Lead Blade Designer',
      company: 'Berg Propulsion / Schottel GmbH',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
      timestamp: '1 day ago',
      channel: 'propeller_design',
      category: 'technical',
      verifiedBadge: 'Propeller Specialist',
      title: 'Wageningen B-Series vs CLT (Contracted Load Tip) Propeller Cavitation Bucket Comparison',
      content: 'When designing 5-bladed controllable pitch propellers (CPP) for high-speed Ro-Pax ferries operating at 24 knots, tip vortex cavitation and pressure pulse levels on the stern transom are critical. CLT end-plates suppress tip vortex strength, shifting the cavitation inception speed up by 1.8 knots.',
      attachment: {
        type: 'pdf',
        name: 'Propeller_Cavitation_Bucket_BSeries_vs_CLT_Analysis.pdf',
        size: '6.2 MB',
        downloads: 312,
      },
      likes: 118,
      isLiked: false,
      bookmarks: 54,
      isBookmarked: false,
      shares: 28,
      comments: []
    },
    {
      id: 'post-res-2',
      author: 'Prof. Dr. Marco Rossi',
      role: 'Director of Maritime AI Lab',
      company: 'Genoa University / MARIN Netherlands',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      timestamp: '1 day ago',
      channel: 'cfd_openfoam',
      category: 'research',
      verifiedBadge: 'Academic Fellow',
      title: 'Research Paper: Deep Neural Network Surrogate Models for Rapid Propeller Open-Water Curves (KT, KQ, η0)',
      content: 'Published in Ocean Engineering (Vol. 308): We trained a physics-informed convolutional network on 14,000 CFD meshes. The model predicts propeller efficiency and cavitation inception buckets within 0.6% deviation in under 20 milliseconds, speeding up preliminary hull-propulsion matching 100x.',
      researchDetails: {
        journal: 'Ocean Engineering (Elsevier Science Direct)',
        publicationDOI: '10.1016/j.oceaneng.2026.109842',
      },
      likes: 156,
      isLiked: false,
      bookmarks: 92,
      isBookmarked: false,
      shares: 51,
      comments: []
    },
    {
      id: 'post-job-2',
      author: 'Karin Lindgren',
      role: 'VP Engineering',
      company: 'Northern Light Hydrogen Ships',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      timestamp: '2 days ago',
      channel: 'green_shipping',
      category: 'job',
      verifiedBadge: 'Verified Employer',
      title: 'Senior Cryogenic Fuel System Engineer - Liquid Hydrogen (LH2) & Fuel Cells',
      content: 'Seeking a Senior Marine Mechanical Engineer to lead safety hazard analysis (HAZID/HAZOP) and bunkering piping design for 120m coastal freighters operating on liquid hydrogen in Norway.',
      jobDetails: {
        location: 'Oslo, Norway',
        employmentType: 'Full-Time Direct Hire',
        salaryRange: 'NOK 1,150,000 - 1,400,000',
      },
      likes: 54,
      isLiked: false,
      bookmarks: 38,
      isBookmarked: false,
      shares: 16,
      comments: []
    }
  ]);

  // Featured Members Data
  const [members, setMembers] = useState<Member[]>([
    {
      id: 'm-1',
      name: 'Dr. Evelyn Vance, CEng MRINA',
      role: 'Principal Naval Architect',
      organization: 'DNV Maritime Advisory',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      specialty: 'Hydrodynamics, RANS CFD & Hull Optimization',
      postsCount: 42,
      followersCount: 1280,
      isFollowing: true,
      badge: 'Top Contributor',
    },
    {
      id: 'm-2',
      name: 'Capt. Thomas Sterling',
      role: 'Fleet Performance Director',
      organization: 'Maersk Line',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
      specialty: 'IMO MEPC Regulations, CII/EEXI, Fleet Decarbonization',
      postsCount: 38,
      followersCount: 2150,
      isFollowing: false,
      badge: 'IMO Delegate',
    },
    {
      id: 'm-3',
      name: 'Prof. Henrik Lindqvist',
      role: 'Chair of Hydrodynamics',
      organization: 'Chalmers University of Technology',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      specialty: 'Seakeeping, GZ Stability Curves & Towed Tank Testing',
      postsCount: 65,
      followersCount: 3400,
      isFollowing: true,
      badge: 'Academic Fellow',
    },
    {
      id: 'm-4',
      name: 'Eng. Hakeem Al-Mansoor',
      role: 'Senior CFD & Shipyard Engineer',
      organization: 'Seatrium Shipyard Singapore',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      specialty: 'OpenFOAM, Structural FEA & Drydock Repairs',
      postsCount: 29,
      followersCount: 890,
      isFollowing: false,
      badge: 'Shipyard Expert',
    },
  ]);

  // Special Groups
  const groups = [
    {
      id: 'g-1',
      name: 'OpenFOAM Marine CFD Working Group',
      members: '3,420 Engineers',
      category: 'Computational Hydrodynamics',
      description: 'Open-source mesh generation, snappyHexMesh, VOF wave resistance, and propeller open water solver scripts.',
      icon: <FileCode2 className="w-5 h-5 text-indigo-400" />,
      joined: true,
    },
    {
      id: 'g-2',
      name: 'IMO CII & MEPC Decarbonization Alliance',
      members: '5,180 Members',
      category: 'Maritime Environmental Compliance',
      description: 'Peer discussions on methanol, ammonia, wind sails, and SEEMP III RO auditing strategies.',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      joined: true,
    },
    {
      id: 'g-3',
      name: 'Autonomous Vessels & MASS COLREGs Lab',
      members: '2,110 Researchers',
      category: 'Smart Shipping & AI Navigation',
      description: 'Reinforcement learning for obstacle avoidance, AIS data fusion, and remote bridge operations.',
      icon: <Radio className="w-5 h-5 text-purple-400" />,
      joined: false,
    },
    {
      id: 'g-4',
      name: 'Offshore Wind CTV & SOV Designers Network',
      members: '1,850 Architects',
      category: 'Offshore Renewables & Workboats',
      description: 'Swath hulls, motion compensation gangways, dynamic positioning (DP2), and battery hybrid propulsion.',
      icon: <Anchor className="w-5 h-5 text-cyan-400" />,
      joined: false,
    },
  ];

  // Category Counts Calculation
  const categoryCounts = useMemo(() => {
    const counts = { all: 0, technical: 0, research: 0, job: 0 };
    posts.forEach((p) => {
      if (selectedChannel === 'all' || p.channel === selectedChannel) {
        counts.all++;
        if (p.category) counts[p.category]++;
      }
    });
    return counts;
  }, [posts, selectedChannel]);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchChannel = selectedChannel === 'all' || post.channel === selectedChannel;
      const matchCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchChannel && matchCategory && matchSearch;
    });
  }, [posts, selectedChannel, selectedCategory, searchQuery]);

  // Handle Post Like
  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  // Handle Post Bookmark
  const handleBookmarkPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isBookmarked = !p.isBookmarked;
          return {
            ...p,
            isBookmarked,
            bookmarks: isBookmarked ? p.bookmarks + 1 : p.bookmarks - 1,
          };
        }
        return p;
      })
    );
  };

  // Handle Poll Vote
  const handlePollVote = (postId: string, optionId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId && p.poll && !p.poll.userVotedOptionId) {
          const updatedOptions = p.poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          );
          return {
            ...p,
            poll: {
              ...p.poll,
              options: updatedOptions,
              totalVotes: p.poll.totalVotes + 1,
              userVotedOptionId: optionId,
            },
          };
        }
        return p;
      })
    );
  };

  // Handle Add Comment
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: 'You (Naval Architect)',
      role: 'Verified Professional Member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      timestamp: 'Just now',
      content: text.trim(),
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  // Create New Post Submit
  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const createdPost: Post = {
      id: `post-${Date.now()}`,
      author: 'You (Naval Architect)',
      role: 'Senior Marine Consultant',
      company: 'Global Naval Studio Member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      timestamp: 'Just now',
      channel: newChannel,
      category: newCategory,
      verifiedBadge: 'Verified Member',
      title: newTitle.trim(),
      content: newContent.trim(),
      jobDetails: newCategory === 'job' ? {
        location: newJobLocation.trim() || 'Remote / Hybrid',
        employmentType: 'Full-Time Position',
        salaryRange: newJobSalary.trim() || 'Competitive Salary',
      } : undefined,
      researchDetails: newCategory === 'research' ? {
        journal: newResearchJournal.trim() || 'Maritime Technology & Hydrodynamics Research',
        publicationDOI: `10.5957/MARITIME.${Date.now().toString().slice(-4)}`,
      } : undefined,
      codeSnippet: includeCode && newCodeSnippet.trim() ? {
        language: newCodeLanguage,
        code: newCodeSnippet.trim(),
      } : undefined,
      likes: 1,
      isLiked: true,
      bookmarks: 0,
      shares: 0,
      comments: [],
    };

    setPosts((prev) => [createdPost, ...prev]);
    setNewTitle('');
    setNewContent('');
    setNewJobLocation('');
    setNewJobSalary('');
    setNewResearchJournal('');
    setNewCodeSnippet('');
    setIncludeCode(false);
    setIsCreatingPost(false);
  };

  // Toggle Follow Member
  const handleToggleFollow = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const isFollowing = !m.isFollowing;
          return {
            ...m,
            isFollowing,
            followersCount: isFollowing ? m.followersCount + 1 : m.followersCount - 1,
          };
        }
        return m;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Platform Header Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-sky-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              OceanConnect Global Network
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              14,280 Verified Maritime Professionals
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Global Maritime Social & Research Network
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            The premier social platform for naval architects, marine superintendents, class society surveyors, and ship captains. Share CAD geometries, benchmark CFD solvers, debate IMO MEPC regulations, and network worldwide.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setIsCreatingPost(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-sky-500/20 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Discussion Post</span>
          </button>
        </div>
      </div>

      {/* Main Social Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'feed'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            Activity Feed
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'members'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Engineers & Surveyors
          </button>

          <button
            onClick={() => setActiveTab('groups')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'groups'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Specialist Groups
          </button>

          <button
            onClick={() => setActiveTab('polls')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'polls'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Industry Technical Polls
          </button>
        </div>

        {/* Global Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search discussions, CAD, members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Modal / Panel for Creating Post */}
      {isCreatingPost && (
        <div className="bg-slate-900 border border-sky-500/40 rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-sky-400" />
              Publish Maritime Discussion / Technical Inquiry
            </h3>
            <button
              onClick={() => setIsCreatingPost(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreatePostSubmit} className="space-y-4 text-xs">
            {/* Post Category Picker */}
            <div>
              <label className="block text-slate-400 font-bold mb-1.5">Post Categorization Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setNewCategory('technical')}
                  className={`p-3 rounded-2xl border text-left font-bold transition flex items-center gap-2.5 ${
                    newCategory === 'technical'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-white text-xs">Technical Discussion</div>
                    <div className="text-[10px] text-slate-400 font-normal">Engineering, IMO rules, CFD</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setNewCategory('research')}
                  className={`p-3 rounded-2xl border text-left font-bold transition flex items-center gap-2.5 ${
                    newCategory === 'research'
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <div className="text-white text-xs">Research Update</div>
                    <div className="text-[10px] text-slate-400 font-normal">Academic papers, datasets</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setNewCategory('job')}
                  className={`p-3 rounded-2xl border text-left font-bold transition flex items-center gap-2.5 ${
                    newCategory === 'job'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-white text-xs">Job Posting</div>
                    <div className="text-[10px] text-slate-400 font-normal">Recruitment & vacancies</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Select Channel</label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold"
                >
                  <option value="naval_architecture">⚓ Naval Architecture & Hydrodynamics</option>
                  <option value="propeller_design">🌀 Propeller & Blade Optimization</option>
                  <option value="imo_regulations">📜 IMO Regulations & Class Rules</option>
                  <option value="green_shipping">🌱 Green Fuels & Wind Propulsion</option>
                  <option value="cfd_openfoam">💻 CFD & OpenFOAM Simulations</option>
                  <option value="autonomous_vessels">🧭 Autonomous Ships (MASS)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Post Title</label>
                <input
                  type="text"
                  placeholder={
                    newCategory === 'job'
                      ? 'e.g., Hiring: Senior Hydrodynamicist - Rotterdam Studio'
                      : newCategory === 'research'
                      ? 'e.g., Research Paper: Machine Learning Surrogates for Hull CFD'
                      : 'e.g., Comparing Holtrop-Mennen vs RANS CFD for 180m RoRo vessel...'
                  }
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Conditional Category Specific Inputs */}
            {newCategory === 'job' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-emerald-950/20 rounded-2xl border border-emerald-500/30">
                <div>
                  <label className="block text-emerald-400 font-bold mb-1">Job Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Rotterdam, Netherlands (Hybrid)"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-emerald-400 font-bold mb-1">Salary Range / Compensation</label>
                  <input
                    type="text"
                    placeholder="e.g., €95,000 - €120,000 / year"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {newCategory === 'research' && (
              <div className="p-3 bg-indigo-950/20 rounded-2xl border border-indigo-500/30">
                <label className="block text-indigo-300 font-bold mb-1">Journal / Conference Publication Name</label>
                <input
                  type="text"
                  placeholder="e.g., Journal of Ship Research (SNAME) / Ocean Engineering"
                  value={newResearchJournal}
                  onChange={(e) => setNewResearchJournal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-400 font-bold mb-1">
                {newCategory === 'job' ? 'Job Description & Qualifications' : 'Discussion Content / Case Study Details'}
              </label>
              <textarea
                rows={4}
                placeholder={
                  newCategory === 'job'
                    ? 'Outline key responsibilities, experience with classification societies, required software skills...'
                    : 'Detail your engineering question, test results, boundary conditions, or regulatory query...'
                }
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* Code Snippet Attachment Toggle */}
            <div className="space-y-2 border-t border-slate-800 pt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCode}
                  onChange={(e) => setIncludeCode(e.target.checked)}
                  className="accent-sky-500"
                />
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-indigo-400" />
                  Attach Code Snippet (Python / OpenFOAM / MATLAB / C++)
                </span>
              </label>

              {includeCode && (
                <div className="space-y-2 pl-6">
                  <div className="flex gap-2">
                    {['python', 'cpp', 'matlab', 'openfoam_dict'].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setNewCodeLanguage(lang)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition ${
                          newCodeLanguage === lang ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={4}
                    placeholder="# Insert code snippet here..."
                    value={newCodeSnippet}
                    onChange={(e) => setNewCodeSnippet(e.target.value)}
                    className="w-full bg-slate-950 font-mono border border-slate-800 rounded-xl p-3 text-xs text-sky-300 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingPost(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-1.5 shadow-lg shadow-sky-500/20"
              >
                <Send className="w-4 h-4" />
                Publish Post
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Feed View with Left Sidebar Channels & Right Sidebar Trending */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Channels List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800 space-y-2 backdrop-blur-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-sky-400" />
                Topic Channels
              </h3>
              <div className="space-y-1 text-xs">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannel(ch.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
                      selectedChannel === ch.id
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {ch.icon}
                    <span className="truncate">{ch.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats Widget */}
            <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800 space-y-3 backdrop-blur-md text-xs">
              <h3 className="font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Network Activity Pulse
              </h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Discussions:</span>
                  <strong className="text-sky-400">1,240 Posts</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">CAD Assets Shared:</span>
                  <strong className="text-emerald-400">480 Files</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IMO Papers Reviewed:</span>
                  <strong className="text-amber-400">310 Articles</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Posts Feed */}
          <div className="lg:col-span-6 space-y-4">
            {/* Categorization Filter Bar */}
            <div className="bg-slate-900/90 p-3.5 rounded-3xl border border-slate-800/80 backdrop-blur-md space-y-2.5 shadow-xl">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-sky-400">
                  <Filter className="w-3.5 h-3.5" />
                  Filter Stream by Category
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Showing {filteredPosts.length} of {posts.length} posts
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center justify-between gap-1.5 ${
                    selectedCategory === 'all'
                      ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Globe className="w-3.5 h-3.5" />
                    All Feeds
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      selectedCategory === 'all' ? 'bg-slate-950 text-sky-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {categoryCounts.all}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedCategory('research')}
                  className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center justify-between gap-1.5 ${
                    selectedCategory === 'research'
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-slate-950 text-indigo-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Research
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      selectedCategory === 'research' ? 'bg-slate-950 text-indigo-300' : 'bg-indigo-950/80 text-indigo-400'
                    }`}
                  >
                    {categoryCounts.research}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedCategory('technical')}
                  className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center justify-between gap-1.5 ${
                    selectedCategory === 'technical'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950 text-cyan-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    Technical
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      selectedCategory === 'technical' ? 'bg-slate-950 text-cyan-300' : 'bg-cyan-950/80 text-cyan-400'
                    }`}
                  >
                    {categoryCounts.technical}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedCategory('job')}
                  className={`px-3 py-2 rounded-2xl text-xs font-bold transition flex items-center justify-between gap-1.5 ${
                    selectedCategory === 'job'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-950 text-emerald-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                    Jobs
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      selectedCategory === 'job' ? 'bg-slate-950 text-emerald-300' : 'bg-emerald-950/80 text-emerald-400'
                    }`}
                  >
                    {categoryCounts.job}
                  </span>
                </button>
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="bg-slate-900/90 p-12 rounded-3xl border border-slate-800 text-center space-y-3">
                <Search className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No posts match your category filter</h3>
                <p className="text-xs text-slate-400">
                  Try switching category filters above or publish a new post in this category.
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold transition"
                >
                  Reset Category Filters
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-900/90 border border-slate-800/80 hover:border-slate-700/80 p-5 sm:p-6 rounded-3xl space-y-4 backdrop-blur-md shadow-xl transition"
                >
                  {/* Category Pill + Author Row */}
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      {/* Post Category Badge */}
                      {post.category === 'job' && (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/40 flex items-center gap-1.5 uppercase tracking-wider">
                          <Briefcase className="w-3 h-3 text-emerald-400" />
                          Job Vacancy
                        </span>
                      )}
                      {post.category === 'research' && (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-black border border-indigo-500/40 flex items-center gap-1.5 uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          Research Update
                        </span>
                      )}
                      {post.category === 'technical' && (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-black border border-cyan-500/40 flex items-center gap-1.5 uppercase tracking-wider">
                          <MessageSquare className="w-3 h-3 text-cyan-400" />
                          Technical Discussion
                        </span>
                      )}

                      <span className="text-[11px] text-slate-500 font-semibold shrink-0">
                        {post.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-2xl object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-sm text-white">{post.author}</span>
                          {post.verifiedBadge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-extrabold border border-sky-500/30 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-sky-400" />
                              {post.verifiedBadge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {post.role} • <strong className="text-slate-300">{post.company}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Title & Body */}
                  <div className="space-y-2">
                    <h2 className="text-base font-bold text-white hover:text-sky-300 transition cursor-pointer">
                      {post.title}
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  {/* Job Details Callout */}
                  {post.jobDetails && (
                    <div className="bg-gradient-to-r from-slate-950 via-emerald-950/20 to-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3 text-slate-300 flex-wrap">
                            <span className="flex items-center gap-1 font-bold text-emerald-400">
                              <MapPin className="w-3.5 h-3.5" />
                              {post.jobDetails.location}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-300 font-semibold">{post.jobDetails.employmentType}</span>
                          </div>
                          {post.jobDetails.salaryRange && (
                            <div className="font-extrabold text-amber-300 text-xs flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                              {post.jobDetails.salaryRange}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => alert(`Inquiry sent to hiring lead for position: ${post.title}`)}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 shrink-0"
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          Apply / Contact Recruiter
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Research Details Callout */}
                  {post.researchDetails && (
                    <div className="bg-gradient-to-r from-slate-950 via-indigo-950/20 to-slate-950 p-4 rounded-2xl border border-indigo-500/30 space-y-3 text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                            {post.researchDetails.journal || 'Peer-Reviewed Journal Publication'}
                          </div>
                          {post.researchDetails.publicationDOI && (
                            <div className="text-[10px] text-slate-400 font-mono">
                              DOI: {post.researchDetails.publicationDOI}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => alert(`Opening paper citation & dataset download for: ${post.title}`)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shrink-0 shadow-lg shadow-indigo-600/20"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Read Full Paper
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Code Snippet if present */}
                  {post.codeSnippet && (
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-3.5 space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-1.5">
                        <span className="font-bold uppercase text-indigo-400 flex items-center gap-1">
                          <Code className="w-3.5 h-3.5" />
                          {post.codeSnippet.language} Script
                        </span>
                        <span>Hydrodynamics Formula</span>
                      </div>
                      <pre className="text-sky-300 overflow-x-auto p-1 leading-relaxed text-[11px]">
                        <code>{post.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Poll if present */}
                  {post.poll && (
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-400 flex items-center gap-1.5">
                          <BarChart2 className="w-4 h-4" />
                          Interactive Technical Survey
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {post.poll.totalVotes} Votes
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white">{post.poll.question}</p>

                      <div className="space-y-2 text-xs">
                        {post.poll.options.map((opt) => {
                          const pct = post.poll?.totalVotes
                            ? Math.round((opt.votes / post.poll.totalVotes) * 100)
                            : 0;
                          const isVoted = post.poll?.userVotedOptionId === opt.id;

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handlePollVote(post.id, opt.id)}
                              className={`w-full text-left p-2.5 rounded-xl border relative overflow-hidden transition ${
                                isVoted
                                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-200 font-bold'
                                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                              }`}
                            >
                              {/* Background Progress Bar */}
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-amber-500/10 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                              <div className="relative z-10 flex justify-between items-center gap-2">
                                <span>{opt.label}</span>
                                <span className="font-bold text-amber-400 text-xs shrink-0">{pct}% ({opt.votes})</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Attachment if present */}
                  {post.attachment && (
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400">
                          <FileSpreadsheet className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-white block truncate">{post.attachment.name}</span>
                          <span className="text-[10px] text-slate-500">{post.attachment.size} • {post.attachment.downloads} downloads</span>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Downloading CAD / Document Asset: ${post.attachment?.name}`)}
                        className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] flex items-center gap-1 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  )}

                  {/* Actions Row */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-1.5 font-bold transition ${
                          post.isLiked ? 'text-sky-400' : 'hover:text-white'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-sky-400' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        onClick={() =>
                          setActiveCommentPostId(
                            activeCommentPostId === post.id ? null : post.id
                          )
                        }
                        className="flex items-center gap-1.5 font-bold hover:text-white transition"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments.length} Comments</span>
                      </button>

                      <button
                        onClick={() => alert('Post link copied to clipboard!')}
                        className="flex items-center gap-1.5 font-bold hover:text-white transition hidden sm:flex"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleBookmarkPost(post.id)}
                      className={`p-1.5 rounded-lg transition ${
                        post.isBookmarked ? 'text-amber-400' : 'hover:text-white'
                      }`}
                      title="Bookmark discussion"
                    >
                      <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Comments Expansion Drawer */}
                  {(activeCommentPostId === post.id || post.comments.length > 0) && (
                    <div className="bg-slate-950 rounded-2xl border border-slate-800/80 p-4 space-y-3 text-xs mt-3">
                      <h4 className="font-bold text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                        Discussion Replies ({post.comments.length})
                      </h4>

                      {/* Comments List */}
                      <div className="space-y-3">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img src={comment.avatar} alt={comment.author} className="w-6 h-6 rounded-full object-cover" />
                                <span className="font-bold text-white text-[11px]">{comment.author}</span>
                                <span className="text-[10px] text-slate-500">({comment.role})</span>
                              </div>
                              <span className="text-[10px] text-slate-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-slate-300 text-xs pl-8">{comment.content}</p>
                          </div>
                        ))}
                      </div>

                      {/* Add Comment Form */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Write a technical response or peer review comment..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) =>
                            setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                          }
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Right Column: Trending Hashtags & Top Members */}
          <div className="lg:col-span-3 space-y-4">
            {/* Trending Hashtags */}
            <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800 space-y-3 backdrop-blur-md text-xs">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                Trending Naval Topics
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '#PropellerCavitation',
                  '#IMO_MEPC82',
                  '#HoltropMennen',
                  '#MethanolDualFuel',
                  '#OffshoreCTV',
                  '#OpenFOAM_VOF',
                  '#SEEMP_Part3',
                  '#RotorSails',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag.replace('#', ''))}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-sky-300 border border-slate-800 text-[11px] font-semibold transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Verified Members Widget */}
            <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800 space-y-3 backdrop-blur-md text-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-sky-400" />
                  Top Naval Architects
                </h3>
                <button onClick={() => setActiveTab('members')} className="text-[10px] text-sky-400 font-bold hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {members.slice(0, 3).map((m) => (
                  <div key={m.id} className="flex items-center justify-between gap-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0">
                        <span className="font-bold text-white text-[11px] block truncate">{m.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{m.organization}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleFollow(m.id)}
                      className={`p-1.5 rounded-xl font-bold transition shrink-0 ${
                        m.isFollowing
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                      }`}
                      title={m.isFollowing ? 'Connected' : 'Connect'}
                    >
                      {m.isFollowing ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members Directory Tab */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-xs">
            <span className="font-bold text-white">Verified Engineers & Class Surveyors Directory</span>
            <span className="text-slate-400">14,280 Registered Members</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {members.map((m) => (
              <div key={m.id} className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl space-y-3 text-center backdrop-blur-md hover:border-slate-700 transition">
                <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-2xl object-cover mx-auto border-2 border-sky-500/30" />
                <div>
                  <h3 className="font-bold text-sm text-white">{m.name}</h3>
                  <p className="text-xs text-sky-400 font-semibold">{m.role}</p>
                  <p className="text-[11px] text-slate-400">{m.organization}</p>
                </div>

                <div className="bg-slate-950 p-2 rounded-xl text-[10px] text-slate-300 space-y-0.5">
                  <div className="font-bold text-slate-400">Specialty:</div>
                  <div>{m.specialty}</div>
                </div>

                <div className="flex justify-around text-[10px] text-slate-400 border-t border-slate-800 pt-2">
                  <span><strong>{m.postsCount}</strong> Posts</span>
                  <span><strong>{m.followersCount}</strong> Followers</span>
                </div>

                <button
                  onClick={() => handleToggleFollow(m.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    m.isFollowing
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md'
                  }`}
                >
                  {m.isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" /> Connected
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" /> Connect Network
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specialist Groups Tab */}
      {activeTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((g) => (
            <div key={g.id} className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  {g.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{g.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-sky-400 font-bold">{g.category}</span> • <span>{g.members}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{g.description}</p>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Active Weekly Benchmarks
                </span>

                <button
                  onClick={() => alert(`Joined ${g.name} Working Group!`)}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
                >
                  Join Working Group
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Industry Technical Polls Tab */}
      {activeTab === 'polls' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-xs text-slate-300">
            <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              Live Technical Industry Polls & Surveys
            </h3>
            <p className="text-slate-400">
              Gather consensus from naval architects and shipping executives on technological transitions, fuel choices, and class society standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts
              .filter((p) => p.poll)
              .map((p) => (
                <div key={p.id} className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <img src={p.avatar} alt={p.author} className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-bold text-white">{p.author}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{p.poll?.question}</h3>

                  <div className="space-y-2 text-xs">
                    {p.poll?.options.map((opt) => {
                      const pct = p.poll?.totalVotes
                        ? Math.round((opt.votes / p.poll.totalVotes) * 100)
                        : 0;
                      const isVoted = p.poll?.userVotedOptionId === opt.id;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handlePollVote(p.id, opt.id)}
                          className={`w-full text-left p-3 rounded-xl border relative overflow-hidden transition ${
                            isVoted
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-200 font-bold'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                          }`}
                        >
                          <div
                            className="absolute left-0 top-0 bottom-0 bg-amber-500/10 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                          <div className="relative z-10 flex justify-between items-center gap-2">
                            <span>{opt.label}</span>
                            <span className="font-bold text-amber-400 text-xs shrink-0">{pct}% ({opt.votes})</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-slate-500 text-right">Total Votes: {p.poll?.totalVotes}</p>
                </div>
              ))}
          </div>
        </div>
      )}

    </div>
  );
};
