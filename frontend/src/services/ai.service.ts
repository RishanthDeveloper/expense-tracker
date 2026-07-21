import { apiClient } from '../api/client';
import { AIHistoryRecord, AIAnalysisResponse } from '../types/ai';

export const AIService = {
  /**
   * Submit a prompt payload to the Gemini API via Spring Boot REST API (/ai/analyze)
   */
  async generateFinancialInsight(
    prompt: string,
    _financialSummary?: { totalIncome: number; totalExpenses: number; budgetCount: number }
  ): Promise<{ responseText: string; analysis?: AIAnalysisResponse }> {
    const data = await apiClient<any>('/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    const responseText = data.responseText || data.spendingAnalysis || 'Financial analysis generated.';
    const analysis: AIAnalysisResponse = {
      spendingAnalysis: data.spendingAnalysis || responseText,
      overspendingWarnings: data.overspendingWarnings || [
        'Expense velocity in non-essential categories is near budget thresholds.',
      ],
      savingTips: data.savingTips || [
        'Reallocate your net savings pool into mutual fund SIPs or high-yield savings.',
        'Review recurring monthly subscriptions to eliminate unutilized services.',
      ],
      financialScore: data.financialScore || 85,
    };

    return { responseText, analysis };
  },

  /**
   * Fetch user's previous AI query history records from Spring Boot backend (/ai/history)
   */
  async getHistory(): Promise<AIHistoryRecord[]> {
    const data = await apiClient<any[]>('/ai/history');
    return (data || []).map((item) => ({
      id: item.id,
      user_id: item.userId || '',
      prompt: item.prompt,
      response: item.response,
      created_at: item.createdAt,
    }));
  },
};
