import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AIService } from '../services/ai.service';
import { useIncome } from './useIncome';
import { useExpenses } from './useExpenses';
import { useBudget } from './useBudget';
import { AIAnalysisResponse, AIHistoryRecord } from '../types/ai';

export function useAI() {
  const queryClient = useQueryClient();
  const { incomeList } = useIncome();
  const { expenses } = useExpenses();
  const { budgets } = useBudget();

  const [lastAnalysis, setLastAnalysis] = useState<AIAnalysisResponse | undefined>(undefined);

  // Calculate live financial context for AI prompt
  const totalIncome = incomeList.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  // Fetch query history from Supabase ai_history
  const { data: history = [], isLoading: historyLoading } = useQuery({
    queryKey: ['ai_history'],
    queryFn: () => AIService.getHistory(),
  });

  // Generate insight mutation
  const generateInsightMutation = useMutation({
    mutationFn: (prompt: string) =>
      AIService.generateFinancialInsight(prompt, {
        totalIncome,
        totalExpenses,
        budgetCount: budgets.length,
      }),
    onSuccess: (data) => {
      if (data.analysis) {
        setLastAnalysis(data.analysis);
      }
      queryClient.invalidateQueries({ queryKey: ['ai_history'] });
    },
  });

  return {
    history: history as AIHistoryRecord[],
    historyLoading,
    lastAnalysis,
    isGenerating: generateInsightMutation.isPending,
    generateInsight: generateInsightMutation.mutateAsync,
  };
}
