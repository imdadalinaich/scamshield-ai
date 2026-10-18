export type SupportedLanguage = 'en' | 'ur' | 'roman';

export type ScamCategory =
  | 'sms'
  | 'whatsapp'
  | 'call'
  | 'email'
  | 'website'
  | 'job'
  | 'bank'
  | 'prize'
  | 'shopping'
  | 'crypto'
  | 'impersonation';

export type ScanVerdict = 'Safe' | 'Suspicious' | 'Likely Scam' | 'Not Sure';

export type ConfidenceLevel = 'Low' | 'Medium' | 'High';

export interface ScanResult {
  verdict: ScanVerdict;
  score: number; // 0 (definitely safe) to 100 (high probability scam)
  confidence: ConfidenceLevel;
  reasons: string[];
  actions: string[];
  verifySteps: string[];
  category: ScamCategory;
  redFlags: string[];
  matchedKnownHash?: boolean;
  signalsBreakdown: {
    ruleScore: number;
    knownHashMatch: boolean;
    urlRiskScore: number;
    aiScore?: number;
    isOfflineCheck: boolean;
  };
  disclaimer: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email?: string;
  photoURL?: string;
  createdAt: string;
  updatedAt?: string;
  role: 'user' | 'admin';
}

export interface CommunityPost {
  id: string;
  title: string;
  category: ScamCategory;
  story: string;
  avoidedOrLost?: string;
  isAnonymous: boolean;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  ratingCount: number;
  ratingSum: number;
  commentCount: number;
  reportCount: number;
  isHidden: boolean;
  isSample?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  comment: string;
  createdAt: string;
}

export interface CookiePreferences {
  essential: boolean;
  preferences: boolean;
  analytics: boolean;
  answered: boolean;
}

export interface SavedCheck {
  id: string;
  timestamp: number;
  category: ScamCategory;
  verdict: ScanVerdict;
  score: number;
  summary: string;
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionUr: string;
  questionRoman: string;
  optionsEn: string[];
  optionsUr: string[];
  optionsRoman: string[];
  correctIndex: number;
  explanationEn: string;
  explanationUr: string;
  explanationRoman: string;
  category: ScamCategory;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
}
