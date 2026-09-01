import React, { useState } from 'react';
import { ViewMode, PlanType, Currency } from './types';
import { LanguageProvider } from './lib/i18n';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WaveCanvas } from './components/WaveCanvas';
import { OfflineVesselBanner } from './components/OfflineVesselBanner';
import { LandingPage } from './components/LandingPage';
import { AIChatView } from './components/AIChatView';
import { AIThesisGenerator } from './components/AIThesisGenerator';
import { CalculatorsHub } from './components/CalculatorsHub';
import { LearningHub } from './components/LearningHub';
import { MarketplaceView } from './components/MarketplaceView';
import { JobBoardView } from './components/JobBoardView';
import { CommunityView } from './components/CommunityView';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PromptLibrary } from './components/PromptLibrary';
import { NewsletterModule } from './components/NewsletterModule';
import { MaritimeNewsIntelligenceView } from './components/MaritimeNewsIntelligenceView';
import { AffiliateSystem } from './components/AffiliateSystem';
import { SeoPagesView } from './components/SeoPagesView';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthSystemModal } from './components/AuthSystemModal';
import { SaasSubscriptionBillingView } from './components/SaasSubscriptionBillingView';

// New Maritime Innovation Suite Imports (Prompts 26-45)
import { ShipDesignStudioView } from './components/ShipDesignStudioView';
import { DigitalTwinView } from './components/DigitalTwinView';
import { MarineWeatherView } from './components/MarineWeatherView';
import { MaritimeRegulationsView } from './components/MaritimeRegulationsView';
import { MarineSurveyAssistantView } from './components/MarineSurveyAssistantView';
import { PredictiveMaintView } from './components/PredictiveMaintView';
import { CarbonEmissionsView } from './components/CarbonEmissionsView';
import { FleetManagementView } from './components/FleetManagementView';
import { MaritimeGisView } from './components/MaritimeGisView';
import { AIReportGenerator } from './components/AIReportGenerator';
import { CertificationCenterView } from './components/CertificationCenterView';
import { MaritimeEventsView } from './components/MaritimeEventsView';
import { AITranslatorView } from './components/AITranslatorView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { CollaborationWorkspaceView } from './components/CollaborationWorkspaceView';
import { StartupHubView } from './components/StartupHubView';
import { ProcurementMarketplaceView } from './components/ProcurementMarketplaceView';
import { ResumeBuilderView } from './components/ResumeBuilderView';
import { CybersecurityCenterView } from './components/CybersecurityCenterView';
import { PublicApiSdkView } from './components/PublicApiSdkView';

// Prompts 46-65 Extended Suite Imports
import { NavalArchLabView } from './components/NavalArchLabView';
import { OffshoreRenewablesView } from './components/OffshoreRenewablesView';
import { ShipStructuralView } from './components/ShipStructuralView';
import { PropellerDesignView } from './components/PropellerDesignView';
import { CfdSimulationView } from './components/CfdSimulationView';
import { ShipResistancePoweringView } from './components/ShipResistancePoweringView';
import { MaritimeDataCenterView } from './components/MaritimeDataCenterView';
import { ResearchDatasetMarketplaceView } from './components/ResearchDatasetMarketplaceView';
import { MaritimeFormulaLibraryView } from './components/MaritimeFormulaLibraryView';
import { ShipyardManagementView } from './components/ShipyardManagementView';
import { MarineInsuranceHubView } from './components/MarineInsuranceHubView';
import { MaritimeAiMarketplaceView } from './components/MaritimeAiMarketplaceView';
import { MobileCompanionView } from './components/MobileCompanionView';
import { AiVideoLearningView } from './components/AiVideoLearningView';
import { SmartNotificationsView } from './components/SmartNotificationsView';
import { CloudWorkspaceView } from './components/CloudWorkspaceView';
import { GoogleFormsHubView } from './components/GoogleFormsHubView';
import { AiRecommendationEngineView } from './components/AiRecommendationEngineView';
import { GlobalDirectoryView } from './components/GlobalDirectoryView';

// Prompts 66-85 Comprehensive Maritime Ecosystem
import { DigitalLibraryView } from './components/DigitalLibraryView';
import { AiExamPrepView } from './components/AiExamPrepView';
import { CompanyIntelligenceView } from './components/CompanyIntelligenceView';
import { InteractiveShipDbView } from './components/InteractiveShipDbView';
import { MarineEquipmentDbView } from './components/MarineEquipmentDbView';
import { MaritimeInnovationHubView } from './components/MaritimeInnovationHubView';
import { ConsultancyMarketplaceView } from './components/ConsultancyMarketplaceView';
import { MarineSimulatorsView } from './components/MarineSimulatorsView';
import { AiDesignReviewView } from './components/AiDesignReviewView';
import { AiMaritimeSearchView } from './components/AiMaritimeSearchView';
import { AiProductivitySuiteView } from './components/AiProductivitySuiteView';
import { MaritimeSuperAppView } from './components/MaritimeSuperAppView';

// Prompts 86-105 Enterprise & Operational Modules
import { MaritimeFinanceView } from './components/MaritimeFinanceView';
import { CharteringFreightView } from './components/CharteringFreightView';
import { CargoPlanningView } from './components/CargoPlanningView';
import { BallastWaterView } from './components/BallastWaterView';
import { EnvironmentalHubView } from './components/EnvironmentalHubView';
import { AutonomousShippingView } from './components/AutonomousShippingView';
import { CrewManagementView } from './components/CrewManagementView';
import { MaritimeMedicalView } from './components/MaritimeMedicalView';
import { VoyagePlanningView } from './components/VoyagePlanningView';
import { MarineFuelView } from './components/MarineFuelView';
import { SmartShipView } from './components/SmartShipView';
import { NavalDefenseView } from './components/NavalDefenseView';
import { BlueEconomyView } from './components/BlueEconomyView';
import { InnovationChallengeView } from './components/InnovationChallengeView';
import { WorkflowAutomationView } from './components/WorkflowAutomationView';
import { ExecutiveDashboardView } from './components/ExecutiveDashboardView';
import { MonetizationSuiteView } from './components/MonetizationSuiteView';
import { MaritimeDigitalLibraryView } from './components/MaritimeDigitalLibraryView';
import { MaritimeSimulationCenterView } from './components/MaritimeSimulationCenterView';
import { SponsoredListingsView } from './components/SponsoredListingsView';
import { OffshoreWindDashboardView } from './components/OffshoreWindDashboardView';
import { SuperEcosystemMasterView } from './components/SuperEcosystemMasterView';
import { AiCareerPathPlannerView } from './components/AiCareerPathPlannerView';
import { AiResearchLabView } from './components/AiResearchLabView';
import { MaritimeResearchPlatformView } from './components/MaritimeResearchPlatformView';
import { SmartEcosystemModulesView } from './components/SmartEcosystemModulesView';

// Additional tools
import { AISTrackingView } from './components/AISTrackingView';
import { ComplianceCenterView } from './components/ComplianceCenterView';
import { ClassSocietyHubView } from './components/ClassSocietyHubView';
import { ShipCostEstimatorView } from './components/ShipCostEstimatorView';
import { DryDockPlannerView } from './components/DryDockPlannerView';
import { RiskAssessmentView } from './components/RiskAssessmentView';
import { DocumentLibraryView } from './components/DocumentLibraryView';
import { UnitConverterView } from './components/UnitConverterView';
import { ScholarshipPortalView } from './components/ScholarshipPortalView';
import { UniversityPortalView } from './components/UniversityPortalView';
import { InternshipPortalView } from './components/InternshipPortalView';
import { AIVoiceAssistantModal } from './components/AIVoiceAssistantModal';
import { DocumentHubView } from './components/document_hub/DocumentHubView';

// SaaS UI/UX Design System Components
import { LeftSidebarWorkspace } from './components/LeftSidebarWorkspace';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { UnifiedSaaSHubView } from './components/UnifiedSaaSHubView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [userPlan, setUserPlan] = useState<PlanType>('student');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedPromptForChat, setSelectedPromptForChat] = useState<string | undefined>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mandatory Authentication Gateway State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('mh_logged_in') === 'true';
  });
  const [authGateMessage, setAuthGateMessage] = useState<string | null>(null);
  const [authInitialTab, setAuthInitialTab] = useState<
    'login' | 'signup' | 'forgot' | 'profile' | 'security_2fa' | 'subscription' | 'referral' | 'admin_panel' | 'database_schema'
  >('login');

  // Checkout modal state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutTarget, setCheckoutTarget] = useState<PlanType | 'digital_item'>('professional');
  const [checkoutTitle, setCheckoutTitle] = useState<string | undefined>();
  const [checkoutPrice, setCheckoutPrice] = useState<number>(25);

  // Voice assistant & Auth modal state
  const [voiceAssistantOpen, setVoiceAssistantOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Navigation Handler (Open Access Mode)
  const handleNavigateView = (targetView: ViewMode) => {
    setCurrentView(targetView);
  };

  const openAuthWithTab = (tab: typeof authInitialTab, msg?: string) => {
    setAuthInitialTab(tab);
    setAuthGateMessage(msg || null);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('mh_logged_in');
    localStorage.removeItem('mh_user_data');
    setCurrentView('landing');
  };

  const openPricingModal = (plan?: PlanType) => {
    const target = plan || 'professional';
    setCheckoutTarget(target);
    setCheckoutTitle(`Upgrade to ${target.toUpperCase()} Plan`);
    setCheckoutPrice(target === 'student' ? 8 : target === 'professional' ? 25 : target === 'enterprise' ? 99 : 0);
    setCheckoutOpen(true);
  };

  const handleBuyItem = (title: string, priceUSD: number) => {
    setCheckoutTarget('digital_item');
    setCheckoutTitle(title);
    setCheckoutPrice(priceUSD);
    setCheckoutOpen(true);
  };

  const handlePaymentSuccess = (newPlan: PlanType) => {
    setUserPlan(newPlan);
  };

  return (
    <LanguageProvider>
      <div className={`min-h-screen relative flex flex-col font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}>
      
      {/* Animated Wave Canvas Background */}
      <WaveCanvas isDarkMode={isDarkMode} />

      {/* Offline Vessel Mode & Service Worker Sync Banner */}
      <OfflineVesselBanner />

      {/* Main Top Navigation */}
      <Navbar
        currentView={currentView}
        setView={handleNavigateView}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        userPlan={userPlan}
        currency={currency}
        setCurrency={setCurrency}
        onOpenPricing={() => openPricingModal('professional')}
        onOpenAuthModal={() => openAuthWithTab('login')}
        onSelectPromptForChat={(promptText) => setSelectedPromptForChat(promptText)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Layout Container with Workspace Sidebar & Primary Router */}
      <div className="flex-1 flex w-full relative z-10">
        
        {/* Persistent Collapsible Workspace Sidebar (Desktop) */}
        <LeftSidebarWorkspace
          currentView={currentView}
          onSelectView={handleNavigateView}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          userPlan={userPlan}
          onOpenPricing={() => openPricingModal('professional')}
          onOpenVoiceAssistant={() => setVoiceAssistantOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Primary View Router */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0 overflow-x-hidden">
          {/* 11 Main SaaS Hub Centralized Layouts */}
          {currentView === 'ai_copilot' && (
            <UnifiedSaaSHubView
              hubId="ai_copilot"
              onNavigateView={setCurrentView}
              userPlan={userPlan}
              onOpenPricing={openPricingModal}
              isDarkMode={isDarkMode}
            />
          )}
          {currentView === 'engineering_tools' && (
            <UnifiedSaaSHubView
              hubId="engineering_tools"
              onNavigateView={setCurrentView}
              userPlan={userPlan}
              onOpenPricing={openPricingModal}
              isDarkMode={isDarkMode}
            />
          )}
          {currentView === 'simulation_center' && (
            <UnifiedSaaSHubView
              hubId="simulation_center"
              onNavigateView={setCurrentView}
              userPlan={userPlan}
              onOpenPricing={openPricingModal}
              isDarkMode={isDarkMode}
            />
          )}
          {currentView === 'knowledge_hub' && (
            <UnifiedSaaSHubView
              hubId="knowledge_hub"
              onNavigateView={setCurrentView}
              userPlan={userPlan}
              onOpenPricing={openPricingModal}
              isDarkMode={isDarkMode}
            />
          )}
          {currentView === 'learning_academy' && (
            <UnifiedSaaSHubView
              hubId="learning_academy"
              onNavigateView={setCurrentView}
              userPlan={userPlan}
              onOpenPricing={openPricingModal}
              isDarkMode={isDarkMode}
            />
          )}
          {currentView === 'research_lab' && (
            <UnifiedSaaSHubView
              hubId="research_lab"
              onNavigateView={setCurrentView}
              userPlan={userPlan}
              onOpenPricing={openPricingModal}
              isDarkMode={isDarkMode}
            />
          )}
          {currentView === 'maritime_industry' && (
            <UnifiedSaaSHubView
              hubId="maritime_industry"
              onNavigateView={setCurrentView}
              userPlan={userPlan}
              onOpenPricing={openPricingModal}
              isDarkMode={isDarkMode}
            />
          )}

          {currentView === 'landing' && (
            <LandingPage
              setView={setCurrentView}
              onSelectPlan={(plan) => openPricingModal(plan)}
              currency={currency}
              isDarkMode={isDarkMode}
            />
          )}

        {currentView === 'ai_chat' && (
          <AIChatView
            initialPrompt={selectedPromptForChat}
            userPlan={userPlan}
            currency={currency}
            onOpenPricing={() => openPricingModal('professional')}
          />
        )}
        {currentView === 'prompt_library' && (
          <PromptLibrary
            onSelectPromptForChat={(promptText) => setSelectedPromptForChat(promptText)}
            onNavigateView={setCurrentView}
            currency={currency}
          />
        )}
        {currentView === 'newsletter' && (
          <NewsletterModule
            onNavigateView={setCurrentView}
            currency={currency}
          />
        )}
        {(currentView === 'maritime_news_intelligence' || currentView === 'maritime_news') && (
          <MaritimeNewsIntelligenceView
            userPlan={userPlan}
            onOpenPricing={openPricingModal}
            onNavigateView={handleNavigateView}
            isDarkMode={isDarkMode}
          />
        )}
        {currentView === 'thesis_gen' && <AIThesisGenerator />}
        {currentView === 'calculators' && <CalculatorsHub />}
        {currentView === 'learning' && <LearningHub />}
        {currentView === 'marketplace' && <MarketplaceView onBuyItem={handleBuyItem} currency={currency} />}
        {currentView === 'jobs' && <JobBoardView />}
        {currentView === 'community' && <CommunityView />}
        {currentView === 'dashboard' && <UserDashboard userPlan={userPlan} onUpgrade={() => openPricingModal('professional')} />}
        {currentView === 'admin' && <AdminDashboard />}
        {(currentView === 'saas_billing' || currentView === 'pricing') && (
          <SaasSubscriptionBillingView
            currentPlan={userPlan}
            currency={currency}
            onOpenCheckout={(plan) => openPricingModal(plan)}
            onPlanChanged={(plan) => setUserPlan(plan)}
          />
        )}
        {currentView === 'affiliate' && <AffiliateSystem />}
        {currentView === 'seo' && <SeoPagesView />}

        {/* Prompts 26-45 Maritime Feature Views */}
        {currentView === 'ship_design_studio' && <ShipDesignStudioView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'digital_twin' && <DigitalTwinView />}
        {currentView === 'weather' && <MarineWeatherView />}
        {currentView === 'maritime_regulations' && <MaritimeRegulationsView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'marine_survey' && <MarineSurveyAssistantView />}
        {currentView === 'predictive_maint' && <PredictiveMaintView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'carbon_emissions' && <CarbonEmissionsView />}
        {currentView === 'fleet_mgmt' && <FleetManagementView />}
        {currentView === 'maritime_gis' && <MaritimeGisView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'report_gen' && <AIReportGenerator />}
        {currentView === 'certifications' && <CertificationCenterView />}
        {currentView === 'maritime_events' && <MaritimeEventsView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'ai_translator' && <AITranslatorView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'knowledge_graph' && <KnowledgeGraphView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'collaboration_ws' && <CollaborationWorkspaceView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'startup_hub' && <StartupHubView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'procurement_mkt' && <ProcurementMarketplaceView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'resume_builder' && <ResumeBuilderView />}
        {currentView === 'cybersecurity' && <CybersecurityCenterView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'api_sdk' && <PublicApiSdkView userPlan={userPlan} onOpenPricing={openPricingModal} />}

        {/* Prompts 46-65 Extended Suite Views */}
        {currentView === 'naval_arch_lab' && <NavalArchLabView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'offshore_renewables' && <OffshoreRenewablesView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'ship_structural' && <ShipStructuralView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'propeller_design' && <PropellerDesignView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'cfd_hub' && <CfdSimulationView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'ship_resistance' && <ShipResistancePoweringView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'maritime_data_center' && <MaritimeDataCenterView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'dataset_marketplace' && <ResearchDatasetMarketplaceView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'formula_library' && <MaritimeFormulaLibraryView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'shipyard_mgmt' && <ShipyardManagementView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'marine_insurance' && <MarineInsuranceHubView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {(currentView === 'ai_marketplace' || currentView === 'ai_agent_marketplace') && (
          <MaritimeAiMarketplaceView
            userPlan={userPlan}
            onOpenPricing={openPricingModal}
            onNavigateView={handleNavigateView}
          />
        )}
        {currentView === 'mobile_companion' && <MobileCompanionView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'video_learning' && <AiVideoLearningView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'smart_notifications' && <SmartNotificationsView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'google_forms' && <GoogleFormsHubView />}
        {currentView === 'cloud_workspace' && <CloudWorkspaceView userPlan={userPlan} onOpenPricing={openPricingModal} onNavigateView={setCurrentView} />}
        {currentView === 'recommendation_engine' && <AiRecommendationEngineView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'global_directory' && <GlobalDirectoryView userPlan={userPlan} onOpenPricing={openPricingModal} />}

        {/* Prompts 66-85 Comprehensive Maritime Ecosystem */}
        {currentView === 'digital_library' && <DigitalLibraryView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'ai_exam_prep' && <AiExamPrepView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'company_intelligence' && <CompanyIntelligenceView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'interactive_ship_db' && <InteractiveShipDbView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'marine_equipment_db' && <MarineEquipmentDbView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'maritime_innovation_hub' && <MaritimeInnovationHubView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'consultancy_marketplace' && <ConsultancyMarketplaceView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'marine_simulators' && <MarineSimulatorsView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'ai_design_review' && <AiDesignReviewView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'ai_maritime_search' && <AiMaritimeSearchView userPlan={userPlan} onOpenPricing={openPricingModal} onNavigateView={handleNavigateView} isDarkMode={isDarkMode} />}
        {currentView === 'ai_productivity_suite' && <AiProductivitySuiteView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'maritime_super_app' && <MaritimeSuperAppView userPlan={userPlan} onOpenPricing={openPricingModal} onSelectView={setCurrentView} />}

        {/* Prompts 86-105 Enterprise & Operational Modules */}
        {currentView === 'maritime_finance' && <MaritimeFinanceView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'chartering_freight' && <CharteringFreightView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'cargo_planning' && <CargoPlanningView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'ballast_water' && <BallastWaterView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'environmental_hub' && <EnvironmentalHubView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'autonomous_shipping' && <AutonomousShippingView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'crew_management' && <CrewManagementView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'maritime_medical' && <MaritimeMedicalView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'voyage_planning' && <VoyagePlanningView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'marine_fuel' && <MarineFuelView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'smart_ship' && <SmartShipView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'naval_defense' && <NavalDefenseView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'blue_economy' && <BlueEconomyView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'innovation_challenge' && <InnovationChallengeView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'workflow_automation' && <WorkflowAutomationView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {currentView === 'executive_dashboard' && <ExecutiveDashboardView userPlan={userPlan} onOpenPricing={openPricingModal} />}
        {(currentView === 'monetization_suite' ||
          currentView === 'prompt_store' ||
          currentView === 'template_store' ||
          currentView === 'maritime_bookstore' ||
          currentView === 'ai_resume_service' ||
          currentView === 'tender_subscription' ||
          currentView === 'industry_reports' ||
          currentView === 'saas_app_store' ||
          currentView === 'dtaas_platform') && (
          <MonetizationSuiteView userPlan={userPlan} onOpenPricing={openPricingModal} onSelectView={setCurrentView} />
        )}

        {currentView === 'maritime_digital_library' && (
          <MaritimeDigitalLibraryView userPlan={userPlan} onOpenPricing={openPricingModal} onSelectView={setCurrentView} />
        )}
        {currentView === 'maritime_simulation_center' && (
          <MaritimeSimulationCenterView userPlan={userPlan} onOpenPricing={openPricingModal} onSelectView={setCurrentView} />
        )}
        {currentView === 'offshore_wind_dashboard' && (
          <OffshoreWindDashboardView userPlan={userPlan} onOpenPricing={openPricingModal} onSelectView={setCurrentView} />
        )}
        {currentView === 'super_ecosystem' && (
          <SuperEcosystemMasterView userPlan={userPlan} onOpenPricing={openPricingModal} onSelectView={setCurrentView} />
        )}
        {currentView === 'ai_career_path_planner' && (
          <AiCareerPathPlannerView userPlan={userPlan} onOpenPricing={openPricingModal} onSelectView={setCurrentView} />
        )}
        {currentView === 'ai_research_lab' && (
          <MaritimeResearchPlatformView userPlan={userPlan} onOpenPricing={openPricingModal} onSelectView={setCurrentView} />
        )}
        {[
          'smart_shipyard',
          'maritime_commerce',
          'ai_assistant_builder',
          'maritime_data_exchange',
          'maritime_innovation_marketplace',
          'smart_ocean_platform',
          'autonomous_vessel_hub',
          'marine_robotics_center',
          'maritime_gis_platform',
          'maritime_investment_platform',
          'ai_procurement_platform',
          'global_maritime_directory',
          'maritime_social_network',
          'maritime_streaming_platform',
          'maritime_publishing_platform',
          'ai_business_intelligence',
          'maritime_super_wallet',
          'global_partnership_hub',
          'maritime_metaverse'
        ].includes(currentView) && (
          <SmartEcosystemModulesView
            userPlan={userPlan}
            onOpenPricing={openPricingModal}
            onSelectView={setCurrentView}
            initialModule={currentView}
          />
        )}
        {currentView === 'sponsored_listings' && (
          <SponsoredListingsView userPlan={userPlan} onOpenPricing={openPricingModal} onSelectView={setCurrentView} />
        )}

        {/* Additional Tools */}
        {(currentView === 'document_hub' || currentView === 'doc_converter') && (
          <DocumentHubView
            userPlan={userPlan}
            currency={currency}
            onSetCurrency={setCurrency}
            onOpenCheckoutModal={(plan) => openPricingModal(plan || 'pro_plus')}
          />
        )}
        {currentView === 'ais_tracking' && <AISTrackingView />}
        {currentView === 'compliance' && <ComplianceCenterView />}
        {currentView === 'class_society' && <ClassSocietyHubView />}
        {currentView === 'cost_estimator' && <ShipCostEstimatorView />}
        {currentView === 'dry_dock' && <DryDockPlannerView />}
        {currentView === 'risk_assessment' && <RiskAssessmentView />}
        {currentView === 'doc_library' && <DocumentLibraryView />}
        {currentView === 'unit_converter' && <UnitConverterView />}
        {currentView === 'scholarships' && <ScholarshipPortalView />}
        {currentView === 'universities' && <UniversityPortalView />}
        {currentView === 'internships' && <InternshipPortalView />}
      </main>
      </div>

      {/* Universal Footer */}
      <Footer setView={handleNavigateView} isDarkMode={isDarkMode} />

      {/* Mobile Bottom Navigation Bar & Hub Drawer */}
      <MobileBottomNav
        currentView={currentView}
        onSelectView={handleNavigateView}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenVoiceAssistant={() => setVoiceAssistantOpen(true)}
        onOpenAuthModal={() => openAuthWithTab('login')}
        isLoggedIn={isLoggedIn}
      />

      {/* Global Search & Command Palette Modal (Ctrl+K) */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectView={(v) => {
          handleNavigateView(v);
          setCommandPaletteOpen(false);
        }}
        onSelectPromptForChat={(prompt) => {
          setSelectedPromptForChat(prompt);
          setCurrentView('ai_chat');
          setCommandPaletteOpen(false);
        }}
        userPlan={userPlan}
      />

      {/* AI Voice Assistant Modal */}
      <AIVoiceAssistantModal
        isOpen={voiceAssistantOpen || currentView === 'voice_assistant'}
        onClose={() => {
          setVoiceAssistantOpen(false);
          if (currentView === 'voice_assistant') setCurrentView('landing');
        }}
        onNavigateView={(v) => {
          handleNavigateView(v);
          setVoiceAssistantOpen(false);
        }}
      />

      {/* Checkout Payment Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedPlan={checkoutTarget}
        itemTitle={checkoutTitle}
        priceUSD={checkoutPrice}
        currency={currency}
        onSuccess={handlePaymentSuccess}
      />

      {/* World-Class Authentication & User Account System Modal */}
      <AuthSystemModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setAuthGateMessage(null);
        }}
        userPlan={userPlan}
        onUpdatePlan={setUserPlan}
        isDarkMode={isDarkMode}
        gateMessage={authGateMessage}
        initialTab={authInitialTab}
        isLoggedIn={isLoggedIn}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setAuthModalOpen(false);
          setAuthGateMessage(null);
        }}
        onLogoutSuccess={handleLogout}
      />
    </div>
    </LanguageProvider>
  );
}
