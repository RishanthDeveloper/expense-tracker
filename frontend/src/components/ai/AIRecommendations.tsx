import React from 'react';
import { AIAnalysisResponse } from '../../types/ai';
import { TrendingUp, AlertTriangle, Lightbulb, Award } from 'lucide-react';

interface AIRecommendationsProps {
  data?: AIAnalysisResponse;
}

const defaultData: AIAnalysisResponse = {
  spendingAnalysis: "Housing accounts for 65% of monthly outflows ($1,450), followed by Food & Groceries ($620). Your spending velocity is 8% lower than June, indicating great budgeting discipline.",
  overspendingWarnings: [
    "Food & Groceries is currently +12% above your target allocation.",
    "Detected 3 recurring digital subscriptions billed within 48 hours of each other.",
  ],
  savingTips: [
    "Consolidate cloud subscriptions to save $89/month.",
    "Set up an automatic 20% payroll transfer to your High-Yield Savings account.",
    "Shop with weekly digital coupons to trim grocery bills by up to 15%.",
  ],
  financialScore: 92,
};

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ data = defaultData }) => {
  return (
    <div className="space-y-6">
      
      {/* Financial Health Score Header Card */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-[var(--surface)] to-emerald-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-glow">
            {data.financialScore}
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)] flex items-center space-x-2">
              <span>Financial Health Score</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Grade A+ • Excellent savings rate & low debt velocity
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          Top 5% Budgeter
        </div>
      </div>

      {/* 3 Modular Insight Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Spending Analysis */}
        <div className="glass-card p-6 rounded-3xl border-l-4 border-l-emerald-500 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <TrendingUp className="w-4 h-4" />
            <span>Spending Analysis</span>
          </div>
          <p className="text-xs text-[var(--text-main)] leading-relaxed font-medium">
            {data.spendingAnalysis}
          </p>
        </div>

        {/* 2. Overspending Warnings */}
        <div className="glass-card p-6 rounded-3xl border-l-4 border-l-amber-500 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>Overspending Warnings</span>
          </div>
          <ul className="space-y-2 text-xs text-[var(--text-main)] font-medium">
            {data.overspendingWarnings.map((warning, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Personalized Saving Tips */}
        <div className="glass-card p-6 rounded-3xl border-l-4 border-l-indigo-500 space-y-3">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs">
            <Lightbulb className="w-4 h-4" />
            <span>Personalized Saving Tips</span>
          </div>
          <ul className="space-y-2 text-xs text-[var(--text-main)] font-medium">
            {data.savingTips.map((tip, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
