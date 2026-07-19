import React from 'react';
import { Target, AlertCircle, CheckCircle } from 'lucide-react';

export interface CategoryBudget {
  name: string;
  spent: number;
  limit: number;
  color: string;
}

interface BudgetProgressProps {
  monthlyBudget?: number;
  monthlySpent?: number;
  categories?: CategoryBudget[];
  items?: Array<{
    id: string;
    category: string;
    budgetAmount: number;
    spentAmount: number;
    remainingAmount: number;
    percentageUsed: number;
    month: string;
  }>;
}

import { formatCurrency } from '../../utils/formatters';

const defaultCategories: CategoryBudget[] = [
  { name: 'Housing & Rent', spent: 45000, limit: 50000, color: 'bg-emerald-500' },
  { name: 'Food & Groceries', spent: 18450, limit: 25000, color: 'bg-indigo-500' },
  { name: 'Shopping & Leisure', spent: 12500, limit: 15000, color: 'bg-amber-500' },
  { name: 'Utilities & Subscriptions', spent: 8200, limit: 10000, color: 'bg-teal-500' },
];

export const BudgetProgress: React.FC<BudgetProgressProps> = ({
  monthlyBudget = 100000,
  monthlySpent = 84150,
  categories = defaultCategories,
  items,
}) => {
  const displayCategories: CategoryBudget[] = items
    ? items.map((it) => ({
        name: it.category,
        spent: it.spentAmount,
        limit: it.budgetAmount,
        color: 'bg-emerald-500',
      }))
    : categories;
  const remaining = monthlyBudget - monthlySpent;
  const percentage = Math.min(Math.round((monthlySpent / monthlyBudget) * 100), 100);

  const getStatusBadge = () => {
    if (percentage >= 90) {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Near Limit ({percentage}%)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>On Track ({percentage}%)</span>
      </span>
    );
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-[var(--border)] space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)]">Monthly Budget Target</h3>
            <p className="text-xs text-[var(--text-muted)]">July 2026 Spending Limits</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Main Budget Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline text-xs">
          <div>
            <span className="text-[var(--text-muted)]">Spent: </span>
            <span className="font-extrabold text-base text-[var(--text-main)]">
              ${monthlySpent.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Limit: </span>
            <span className="font-semibold text-[var(--text-main)]">
              {formatCurrency(monthlyBudget)}
            </span>
          </div>
        </div>

        {/* Progress Track */}
        <div className="w-full bg-[var(--surface-card)] h-3 rounded-full overflow-hidden p-0.5 border border-[var(--border)]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage > 90 ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-gradient-to-r from-emerald-500 to-indigo-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-[var(--text-dim)] pt-1">
          <span>{percentage}% of monthly budget used</span>
          <span className="font-semibold text-emerald-400">{formatCurrency(remaining)} remaining</span>
        </div>
      </div>

      {/* Category Breakdowns */}
      <div className="space-y-3 pt-2 border-t border-[var(--border)]">
        <h4 className="text-xs font-semibold text-[var(--text-main)] uppercase tracking-wider">
          Category Limits
        </h4>

        <div className="space-y-4">
          {displayCategories.map((cat, idx) => {
            const catPercent = Math.min(Math.round((cat.spent / cat.limit) * 100), 100);
            return (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between items-center text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--text-main)]">{cat.name}</span>
                  <span>
                    {formatCurrency(cat.spent)} / <span className="text-[var(--text-dim)]">{formatCurrency(cat.limit)}</span>
                  </span>
                </div>
                <div className="w-full bg-[var(--surface-card)] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all`}
                    style={{ width: `${catPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
