export interface AIHistoryRecord {
  id: string;
  user_id: string;
  prompt: string;
  response: string;
  tokens_used?: number;
  created_at: string;
}

export interface AIAnalysisResponse {
  spendingAnalysis: string;
  overspendingWarnings: string[];
  savingTips: string[];
  financialScore: number;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendations?: AIAnalysisResponse;
}
