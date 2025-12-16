
export interface UserInputs {
  mode: 'individual' | 'compatibility' | 'decision';
  // chartStyle removed as per request to make it global
  language: 'en' | 'hi' | 'es' | 'fr' | 'de' | 'ja';
  dob: string;
  gender: 'male' | 'female' | 'other';
  timeOfBirth?: string;
  placeOfBirth?: string;
  primaryLifestyle?: string;
  secondaryLifestyle?: string;
  // Partner details for compatibility
  partnerDob?: string;
  partnerGender?: 'male' | 'female' | 'other';
  partnerTimeOfBirth?: string;
  partnerPlaceOfBirth?: string;
  // Decision Mode
  decisionCategory?: string;
  decisionContext?: string;
  decisionUrgency?: 'low' | 'medium' | 'high';
  // Image Generation
  includeImage?: boolean;
}

export interface LuckyElements {
  colors: string;
  numbers: string;
  direction: string;
  deityOrMantra: string;
}

export interface LifeBalanceScores {
  love: number;
  career: number;
  health: number;
  family: number;
  spirituality: number;
}

export interface AnimalPersona {
  animal: string;
  emoji: string;
  description: string;
}

export interface PokemonPersona {
  name: string;
  type: string;
  description: string;
}

export interface WeeklyForecast {
  title: string;
  dos: string[];
  avoids: string[];
}

export interface CompatibilityMilestone {
  event: string;
  period: string;
  description: string;
}

export interface CompatibilityReport {
  overallScore: number;
  loveLevel: string;
  elementalVibe: string;
  relationshipDynamic: string;
  communicationStyle: string;
  communicationTips: string[];
  challengesToAvoid: string[];
  auspiciousMilestones: CompatibilityMilestone[];
  sexualChemistry: string[];
  financialCompatibility: string[];
  coupleWeeklyForecast: WeeklyForecast;
  relationshipBalance: {
    intimacy: number;
    trust: number;
    communication: number;
    fun: number;
    growth: number;
  };
  sharedLuckyElements: {
    colors: string;
    numbers: string;
    places: string;
    activities: string;
  };
}

export interface DecisionAnalysis {
  moonPhase: string;
  nakshatra: string;
  score: number;
  verdict: 'Green' | 'Yellow' | 'Red';
  reasoning: string;
  bestAction: string;
  timingTip: string;
  riskNote: string;
  disclaimer: string;
}

export interface AnalysisResult {
  language?: 'en' | 'hi' | 'es' | 'fr' | 'de' | 'ja';
  rootNumber: number;
  sunSign: string; // Western Zodiac
  moonSign: string; // Vedic Rashi
  nakshatra: string;
  basicSummary: string;
  animalPersona: AnimalPersona;
  pokemonPersona: PokemonPersona;
  weeklyForecast: WeeklyForecast;
  personality: string[];
  loveMarriage: string[];
  careerMoney: string[];
  health: string[];
  areasToAvoid: string[];
  strengthBoosters: string[];
  luckyElements: LuckyElements;
  practicalTips: string[];
  lifeBalanceScores: LifeBalanceScores;
  luckyDays: string[];
  festivalInsights: string;
  compatibilityReport?: CompatibilityReport;
  decisionAnalysis?: DecisionAnalysis;
  generatedImage?: string; // Base64 string for the generated image
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
