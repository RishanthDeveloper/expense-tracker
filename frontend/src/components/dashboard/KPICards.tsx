import React from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export interface KPIData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
}

interface KPICardsProps {
  data?: KPIData;
}

export const KPICards: React.FC<KPICardsProps> = ({
  data = {
    totalBalance: 324850.00,
    totalIncome: 425000.00,
    totalExpenses: 100150.00,
    totalSavings: 324850.00,
  },
}) => {
  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(data.totalBalance),
      change: '+8.4% vs last month',
      isPositive: true,
      icon: <Wallet className="w-5 h-5 text-emerald-400" />,
      glowColor: 'border-l-emerald-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      title: 'Total Income',
      value: formatCurrency(data.totalIncome),
      change: '+14.2% vs last month',
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
      glowColor: 'border-l-indigo-500',
      badgeBg: 'bg-indigo-500/10 text-indigo-400',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(data.totalExpenses),
      change: '-3.8% vs last month',
      isPositive: true, // Decreasing expense is good
      icon: <TrendingDown className="w-5 h-5 text-teal-400" />,
      glowColor: 'border-l-teal-500',
      badgeBg: 'bg-teal-500/10 text-teal-400',
    },
    {
      title: 'Net Savings',
      value: formatCurrency(data.totalSavings),
      change: '+18.6% vs target',
      isPositive: true,
      icon: <PiggyBank className="w-5 h-5 text-amber-400" />,
      glowColor: 'border-l-amber-500',
      badgeBg: 'bg-amber-500/10 text-amber-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`glass-card p-5 rounded-3xl border-l-4 ${card.glowColor} space-y-3 transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
        >
          {/* Top row: Icon + Title */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              {card.title}
            </span>
            <div className="p-2.5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)]">
              {card.icon}
            </div>
          </div>

          {/* Value */}
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
              {card.value}
            </h3>

            {/* Change indicator badge */}
            <div className="flex items-center space-x-1.5 text-xs">
              <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full font-bold text-[11px] ${card.badgeBg}`}>
                {card.isPositive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span>{card.change}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
