import React, { useState } from 'react';
import { useAI } from '../../hooks/useAI';
import { Sparkles, Lightbulb, TrendingUp, ShieldCheck, Loader2, RefreshCw } from 'lucide-react';

export interface AIAnalysisResult {
  spendingSummary: string;
  savingTips: string;
  monthlyAdvice: string;
}

const initialInsight: AIAnalysisResult = {
  spendingSummary: "Your total spending this month is ₹1,00,150, down 3.8% compared to June. Your highest expense category remains Housing & Rent (₹45,000.00).",
  savingTips: "Switching grocery vendors or leveraging seasonal discounts could save up to ₹5,000/month. Additionally, streamlining unused streaming subscriptions saves ₹1,500/month.",
  monthlyAdvice: "You are on track to save 68% of your income! Reallocate your extra cash flow into your High-Yield Savings or Mutual Fund SIP before July 31st.",
};

export const AIInsightCard: React.FC = () => {
  const { isGenerating, generateInsight, lastAnalysis } = useAI();
  const [insight, setInsight] = useState<AIAnalysisResult>(initialInsight);
  const [lastUpdated, setLastUpdated] = useState('Just now');

  const handleGenerateAI = async () => {
    try {
      const res = await generateInsight('Generate comprehensive financial summary for dashboard');
      if (res.analysis) {
        setInsight({
          spendingSummary: res.analysis.spendingAnalysis || insight.spendingSummary,
          savingTips: res.analysis.savingTips.join(' ') || insight.savingTips,
          monthlyAdvice: `Financial Health Score: ${res.analysis.financialScore}/100. Maintain disciplined savings rate.`,
        });
      } else if (res.responseText) {
        setInsight((prev) => ({
          ...prev,
          spendingSummary: res.responseText,
        }));
      }
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch {
      // Fallback update
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-[var(--surface)] to-emerald-500/5 space-y-6 relative overflow-hidden">
      
      {/* Glow highlight effect */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-500 flex items-center justify-center text-white shadow-glow">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center space-x-2">
              <span>Gemini AI Financial Insights</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Gemini 1.5 Pro
              </span>
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Automated financial audit • Updated {lastUpdated}
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white font-semibold text-xs shadow-glow flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Cash Flow...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate AI Analysis</span>
            </>
          )}
        </button>
      </div>

      {/* Insight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Spending Summary */}
        <div className="glass-card p-4 rounded-2xl space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
            <TrendingUp className="w-4 h-4" />
            <span>Spending Summary</span>
          </div>
          <p className="text-xs text-[var(--text-main)] leading-relaxed font-medium">
            {insight.spendingSummary}
          </p>
        </div>

        {/* 2. Saving Tips */}
        <div className="glass-card p-4 rounded-2xl space-y-2 border-l-4 border-l-indigo-500">
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs">
            <Lightbulb className="w-4 h-4" />
            <span>Saving Tips</span>
          </div>
          <p className="text-xs text-[var(--text-main)] leading-relaxed font-medium">
            {lastAnalysis?.savingTips ? lastAnalysis.savingTips.join(' ') : insight.savingTips}
          </p>
        </div>

        {/* 3. Monthly Advice */}
        <div className="glass-card p-4 rounded-2xl space-y-2 border-l-4 border-l-teal-500">
          <div className="flex items-center space-x-2 text-teal-400 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Monthly Strategy</span>
          </div>
          <p className="text-xs text-[var(--text-main)] leading-relaxed font-medium">
            {insight.monthlyAdvice}
          </p>
        </div>

      </div>

    </div>
  );
};
