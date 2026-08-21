import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  imoStandard?: boolean;
}

export const MARITIME_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English (US/UK)', nativeName: 'English (IMO SMCP)', flag: '🇬B', region: 'Global IMO Standard', imoStandard: true },
  { code: 'zh', name: 'Mandarin Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', region: 'Asia-Pacific (Shipbuilding Hub)' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Europe/Latin America' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Asia-Pacific (Fleet Tech)' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', region: 'Nordic Offshore & Cleantech' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Europe (Naval Engineering)' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', region: 'Global Merchant Shipping Hub' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'Europe/Africa' },
  { code: 'tl', name: 'Tagalog / Filipino', nativeName: 'Filipino', flag: '🇵🇭', region: 'Global Crew & Seafarers' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', region: 'Port of Rotterdam & Dredging' },
];

export interface TranslationDictionary {
  [key: string]: {
    [langCode: string]: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Navigation & Branding
  brandTitle: {
    en: 'AI Maritime Studio',
    zh: 'AI 海事智能工作室',
    es: 'Estudio Marítimo de IA',
    ja: 'AI 海事スタジオ',
    no: 'AI Maritim Studio',
    de: 'AI Maritimes Studio',
    el: 'Στούντιο Τεχνητής Νοημοσύνης Ναυτιλίας',
    fr: 'Studio Maritime IA',
    tl: 'AI Maritime Studio',
    nl: 'AI Maritiem Studio',
  },
  home: {
    en: 'Home',
    zh: '首页',
    es: 'Inicio',
    ja: 'ホーム',
    no: 'Hjem',
    de: 'Startseite',
    el: 'Αρχική',
    fr: 'Accueil',
    tl: 'Tahanan',
    nl: 'Home',
  },
  aiAssistant: {
    en: 'Maritime AI Co-Pilot',
    zh: '海事 AI 智能副驾',
    es: 'Co-piloto Marítimo de IA',
    ja: '海事 AI コパイロット',
    no: 'Maritim AI Medpilot',
    de: 'Maritimer AI-Kopilot',
    el: 'Συγκυβερνήτης Ναυτιλίας AI',
    fr: 'Co-pilote Maritime IA',
    tl: 'Maritime AI Co-Pilot',
    nl: 'Maritieme AI Copiloot',
  },
  shipDesign: {
    en: 'Ship Design Studio 3D',
    zh: '3D 船舶设计工作室',
    es: 'Estudio de Diseño Naval 3D',
    ja: '3D 船舶設計スタジオ',
    no: '3D Skipsdesignstudio',
    de: '3D Schiffsentwurfsstudio',
    el: 'Στούντιο Σχεδίασης Πλοίων 3D',
    fr: 'Studio de Conception Navale 3D',
    tl: '3D Ship Design Studio',
    nl: '3D Scheepsontwerp Studio',
  },
  digitalTwin: {
    en: 'Digital Twin Telemetry',
    zh: '数字孪生遥测中心',
    es: 'Telemetría Gemelo Digital',
    ja: 'デジタルツインテレメトリ',
    no: 'Digital Tvilling Telemetri',
    de: 'Digitaler Zwilling Telemetrie',
    el: 'Τηλεμετρία Ψηφιακού Διδύμου',
    fr: 'Jumeau Numérique Téléométrie',
    tl: 'Digital Twin Telemetry',
    nl: 'Digitale Tweeling Telemetrie',
  },
  weather: {
    en: 'Marine Weather & Voyage Radar',
    zh: '海洋气象与航线雷达',
    es: 'Meteorología Marina y Radar de Navegación',
    ja: '海洋気象＆航海レーダー',
    no: 'Meteo & Rader Seilas',
    de: 'Seewetter & Routenradar',
    el: 'Θαλάσσιος Καιρός & Ραντάρ Πλεύσης',
    fr: 'Météo Marine & Radar de Voyage',
    tl: 'Weather at Radar ng Bapor',
    nl: 'Zeeweer & Vaarroute Radar',
  },
  regulations: {
    en: 'IMO & Class Compliance Hub',
    zh: 'IMO 与船级社合规中心',
    es: 'Centro de Cumplimiento IMO y Sociedades de Clasificación',
    ja: 'IMO＆船級合規ハブ',
    no: 'IMO & Klasse Regelverk',
    de: 'IMO & Klassifikations-Compliance',
    el: 'Κέντρο Συμμόρφωσης IMO & Κλάσεων',
    fr: 'Conformité IMO & Sociétés de Classification',
    tl: 'IMO & Class Compliance Hub',
    nl: 'IMO & Klasse Regelgeving',
  },
  carbonEmissions: {
    en: 'CII & Carbon Calculator',
    zh: 'CII 碳排放与脱碳计算器',
    es: 'Calculadora de Carbono y CII',
    ja: 'CII＆脱炭素計算機',
    no: 'CII & Karbonkalkulator',
    de: 'CII & CO2-Emissionsrechner',
    el: 'Υπολογιστής Άνθρακα & CII',
    fr: 'Calculateur CII & Carbone',
    tl: 'CII at Carbon Calculator',
    nl: 'CII & CO2 Calculator',
  },
  fleetMgmt: {
    en: 'Fleet Operations & AIS Tracking',
    zh: '船队运营与 AIS 实时追踪',
    es: 'Operaciones de Flota y Rastreo AIS',
    ja: '全船運航＆AIS追跡',
    no: 'Flåtestyring & AIS-sporing',
    de: 'Flottenmanagement & AIS-Tracking',
    el: 'Διαχείριση Στόλου & Παρακολούθηση AIS',
    fr: 'Gestion de Flotte & Suivi AIS',
    tl: 'Fleet Operations at AIS Tracking',
    nl: 'Vlootbeheer & AIS Tracking',
  },
  calculators: {
    en: 'Naval Arch Calculators (GZ, Resistance)',
    zh: '造船工程计算器 (GZ稳性, 阻力)',
    es: 'Calculadoras Navales (Curva GZ, Resistencia)',
    ja: '造船工学計算機 (GZ復原力, 抵抗)',
    no: 'Skipsingeniør Kalkulatorer (GZ, Motstand)',
    de: 'Schiffbau Rechner (GZ-Kurve, Widerstand)',
    el: 'Υπολογιστές Ναυπηγικής (GZ, Αντίσταση)',
    fr: 'Calculateurs d\'Architecture Navale (GZ, Résistance)',
    tl: 'Naval Arch Calculators (GZ, Resistance)',
    nl: 'Scheepsbouw Calculatoren (GZ, Weerstand)',
  },
  dashboard: {
    en: 'Dashboard & Active Sessions',
    zh: '个人中心与会话管理',
    es: 'Panel de Control y Sesiones Activas',
    ja: 'ダッシュボード＆アクティブセッション',
    no: 'Kontrollpanel & Sesjoner',
    de: 'Dashboard & Aktive Sitzungen',
    el: 'Πίνακας Ελέγχου & Ενεργές Συνεδρίες',
    fr: 'Tableau de Bord & Sessions Actives',
    tl: 'Dashboard at Active Sessions',
    nl: 'Dashboard & Actieve Sessies',
  },
  pricing: {
    en: 'Pricing & Plans',
    zh: '订阅套餐与定价',
    es: 'Planes y Precios',
    ja: '料金プラン',
    no: 'Abonnement & Priser',
    de: 'Preise & Tarife',
    el: 'Πλάνα & Τιμολόγηση',
    fr: 'Tarifs & Abonnements',
    tl: 'Preso at Plano',
    nl: 'Prijzen & Abonnementen',
  },
  signIn: {
    en: 'Sign In / Account',
    zh: '登录 / 账号中心',
    es: 'Iniciar Sesión / Cuenta',
    ja: 'ログイン / アカウント',
    no: 'Logg inn / Konto',
    de: 'Anmelden / Konto',
    el: 'Σύνδεση / Λογαριασμός',
    fr: 'Connexion / Compte',
    tl: 'Mag-sign In / Account',
    nl: 'Inloggen / Account',
  },
  searchPlaceholder: {
    en: 'Search 65+ maritime tools, formulas, IMO codes, ships...',
    zh: '搜索 65+ 海事工具、计算公式、IMO 规范、船舶数据...',
    es: 'Buscar en más de 65 herramientas marítimas, fórmulas, códigos IMO...',
    ja: '65以上の海事ツール、計算公式、IMO規程、船舶データを検索...',
    no: 'Søk i 65+ maritime verktøy, formler, IMO-koder, skip...',
    de: 'Durchsuchen Sie 65+ maritime Werkzeuge, Formeln, IMO-Codes...',
    el: 'Αναζήτηση σε 65+ ναυτιλιακά εργαλεία, τύπους, κώδικες IMO...',
    fr: 'Rechercher parmi plus de 65 outils maritimes, formules, codes IMO...',
    tl: 'Maghanap sa 65+ maritime tools, formulas, IMO codes, barko...',
    nl: 'Zoek in 65+ maritieme tools, formules, IMO codes...',
  },

  // Actions & Buttons
  languageSelectTitle: {
    en: 'Language & Region Settings',
    zh: '语言与语言区域设置',
    es: 'Configuración de Idioma y Región',
    ja: '言語と地域の設定',
    no: 'Språk og Region Innstillinger',
    de: 'Sprach- und Regionseinstellungen',
    el: 'Ρυθμίσεις Γλώσσας & Περιοχής',
    fr: 'Paramètres de Langue et Région',
    tl: 'Mga Setting ng Wika at Rehiyon',
    nl: 'Taal & Regio Instellingen',
  },
  selectLanguagePrompt: {
    en: 'Select your preferred language for the Maritime Innovation Suite:',
    zh: '请选择您海事智能平台的主选语言：',
    es: 'Seleccione su idioma preferido para la suite marítima:',
    ja: '海洋イノベーションスイートの希望言語を選択してください：',
    no: 'Velg ditt foretrukne språk for den maritim plattformen:',
    de: 'Wählen Sie Ihre bevorzugte Sprache für die maritime Plattform:',
    el: 'Επιλέξτε την προτιμώμενη γλώσσα για τη ναυτιλιακή πλατφόρμα:',
    fr: 'Sélectionnez votre langue préférée pour la suite maritime :',
    tl: 'Pumili ng iyong gustong wika para sa maritime platform:',
    nl: 'Selecteer uw gewenste taal voor de maritieme suite:',
  },
  activeSessionsTitle: {
    en: 'Active Device Sessions',
    zh: '当前活跃设备会话',
    es: 'Sesiones Activas de Dispositivos',
    ja: 'アクティブなデバイスセッション',
    no: 'Aktive Enhets-sesjoner',
    de: 'Aktive Gerätesitzungen',
    el: 'Ενεργές Συνεδρίες Συσκευών',
    fr: 'Sessions d\'Appareils Actives',
    tl: 'Active Device Sessions',
    nl: 'Actieve Apparaatsessies',
  },
  terminateSession: {
    en: 'Log Out / Terminate',
    zh: '登出 / 远程终止',
    es: 'Cerrar Sesión / Terminar',
    ja: 'ログアウト / 終了',
    no: 'Logg ut / Avslutt',
    de: 'Abmelden / Beenden',
    el: 'Aποσύνδεση / Τερματισμός',
    fr: 'Déconnexion / Terminer',
    tl: 'Mag-Log Out / Isara',
    nl: 'Uitloggen / Beëindigen',
  },
  terminateAllOthers: {
    en: 'Terminate All Other Sessions',
    zh: '一键终止其他所有设备',
    es: 'Cerrar Todas las Otras Sesiones',
    ja: '他のすべてのセッションを終了',
    no: 'Avslutt Alle Andre Sesjoner',
    de: 'Alle anderen Sitzungen beenden',
    el: 'Τερματισμός Όλων των Άλλων Συνεδριών',
    fr: 'Terminer toutes les autres sessions',
    tl: 'Isara Lahat ng Ibang Session',
    nl: 'Beëindig Alle Andere Sessies',
  },
  currentDevice: {
    en: 'Current Device',
    zh: '当前正在使用的设备',
    es: 'Dispositivo Actual',
    ja: '現在のデバイス',
    no: 'Denne Enheten',
    de: 'Aktuelles Gerät',
    el: 'Τρέχουσα Συσκευή',
    fr: 'Appareil Actuel',
    tl: 'Kasalukuyang Gamit na Device',
    nl: 'Huidig Apparaat',
  },
  securityAlerts: {
    en: 'Security & SSO Governance',
    zh: '安全控制与 SSO 单点登录',
    es: 'Seguridad y Gobernanza SSO',
    ja: 'セキュリティ＆SSOガバナンス',
    no: 'Sikkerhet & SSO Styring',
    de: 'Sicherheit & SSO-Sicherheit',
    el: 'Ασφάλεια & Διακυβέρνηση SSO',
    fr: 'Sécurité & Gouvernance SSO',
    tl: 'Seguridad at SSO Governance',
    nl: 'Beveiliging & SSO Beheer',
  },
  applyChanges: {
    en: 'Apply Language Settings',
    zh: '应用语言设置',
    es: 'Aplicar Configuración',
    ja: '設定を適用',
    no: 'Anvend Innstillinger',
    de: 'Einstellungen anwenden',
    el: 'Εφαρμογή Ρυθμίσεων',
    fr: 'Appliquer les Paramètres',
    tl: 'I-apply ang Settings',
    nl: 'Instellingen Toepassen',
  },
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  languageInfo: SupportedLanguage;
  t: (key: string, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem('app_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const setLanguage = (code: string) => {
    const valid = MARITIME_LANGUAGES.some((l) => l.code === code);
    if (valid) {
      setCurrentLanguage(code);
    }
  };

  const languageInfo = MARITIME_LANGUAGES.find((l) => l.code === currentLanguage) || MARITIME_LANGUAGES[0];

  const t = (key: string, defaultText?: string): string => {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][currentLanguage]) {
      return TRANSLATIONS[key][currentLanguage];
    }
    if (TRANSLATIONS[key] && TRANSLATIONS[key]['en']) {
      return TRANSLATIONS[key]['en'];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languageInfo, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return fallback if called outside provider
    return {
      currentLanguage: 'en',
      setLanguage: () => {},
      languageInfo: MARITIME_LANGUAGES[0],
      t: (key: string, defaultText?: string) => TRANSLATIONS[key]?.['en'] || defaultText || key,
    };
  }
  return context;
};
