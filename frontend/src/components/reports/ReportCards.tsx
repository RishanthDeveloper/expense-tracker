import React from 'react';
import { TrendingUp, TrendingDown, PiggyBank, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface ReportSummaryData {
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  budgetUtilization: number;
}

interface ReportCardsProps {
  data?: ReportSummaryData;
}

import { formatCurrency } from '../../utils/formatters';

const defaultSummary: ReportSummaryData = {
  totalIncome: 425000.00,
  totalExpense: 100150.40,
  netSavings: 324849.60,
  budgetUtilization: 68.4,
};

export const ReportCards: React.FC<ReportCardsProps> = ({ data = defaultSummary }) => {
  const cards = [
    {
      title: 'Total Income',
      value: formatCurrency(data.totalIncome),
      subtitle: '+16.8% vs previous period',
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      border: 'border-l-emerald-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      title: 'Total Expense',
      value: formatCurrency(data.totalExpense),
      subtitle: '-4.2% vs previous period',
      isPositive: true,
      icon: <TrendingDown className="w-5 h-5 text-red-400" />,
      border: 'border-l-red-500',
      badgeBg: 'bg-teal-500/10 text-teal-400',
    },
    {
      title: 'Net Savings',
      value: formatCurrency(data.netSavings),
      subtitle: '55.9% Net Savings Rate',
      isPositive: true,
      icon: <PiggyBank className="w-5 h-5 text-indigo-400" />,
      border: 'border-l-indigo-500',
      badgeBg: 'bg-indigo-500/10 text-indigo-400',
    },
    {
      title: 'Budget Utilization',
      value: `${data.budgetUtilization}%`,
      subtitle: 'Within safe target threshold',
      isPositive: true,
      icon: <Target className="w-5 h-5 text-amber-400" />,
      border: 'border-l-amber-500',
      badgeBg: 'bg-amber-500/10 text-amber-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`glass-card p-6 rounded-3xl border-l-4 ${card.border} border-[var(--border)] space-y-4 hover:border-emerald-500/40 transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wide uppercase">
              {card.title}
            </span>
            <div className="p-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)]">
              {card.icon}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
              {card.value}
            </h3>

            <div className="flex items-center space-x-1.5 pt-1">
              <span className={`inline-flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${card.badgeBg}`}>
                {card.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                <span>{card.subtitle}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
