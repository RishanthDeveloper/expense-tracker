import React from 'react';
import { Target, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export interface BudgetCardData {
  id: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  month: string;
}

interface BudgetCardProps {
  data: BudgetCardData;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

import { formatCurrency } from '../../utils/formatters';

export const BudgetCard: React.FC<BudgetCardProps> = ({ data, onEdit, onDelete }) => {
  const remaining = data.budgetAmount - data.spentAmount;
  const percentage = Math.min(Math.round((data.spentAmount / (data.budgetAmount || 1)) * 100), 100);

  // Status & Color Determination
  // Good: 0 - 70%
  // Warning: 70 - 90%
  // Danger/Exceeded: > 90%
  let statusBadge = {
    label: 'Good',
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    barBg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    borderColor: 'border-l-emerald-500',
  };

  if (percentage >= 90) {
    statusBadge = {
      label: 'Exceeded',
      bg: 'bg-red-500/10 text-red-400 border-red-500/30',
      barBg: 'bg-gradient-to-r from-amber-500 to-red-500',
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      borderColor: 'border-l-red-500',
    };
  } else if (percentage >= 70) {
    statusBadge = {
      label: 'Warning',
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      barBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      borderColor: 'border-l-amber-500',
    };
  }

  return (
    <div className={`glass-card p-6 rounded-3xl border-l-4 ${statusBadge.borderColor} border-[var(--border)] space-y-5 hover:border-emerald-500/40 transition-all duration-300`}>
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] flex items-center justify-center text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[var(--text-main)]">{data.category}</h4>
            <p className="text-xs text-[var(--text-dim)]">{data.month} Target</p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusBadge.bg}`}>
          {statusBadge.icon}
          <span>{statusBadge.label} ({percentage}%)</span>
        </span>
      </div>

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline text-xs">
          <span className="text-[var(--text-muted)]">
            Spent: <strong className="text-[var(--text-main)]">{formatCurrency(data.spentAmount)}</strong>
          </span>
          <span className="text-[var(--text-muted)]">
            Budget: <strong className="text-[var(--text-main)]">{formatCurrency(data.budgetAmount)}</strong>
          </span>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="w-full bg-[var(--surface-card)] h-3 rounded-full overflow-hidden p-0.5 border border-[var(--border)]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${statusBadge.barBg}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] pt-1">
          <span className="text-[var(--text-dim)]">{percentage}% consumed</span>
          <span className={`font-bold ${remaining < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {remaining < 0 ? `-${formatCurrency(Math.abs(remaining))} over` : `${formatCurrency(remaining)} remaining`}
          </span>
        </div>
      </div>

      {/* Quick Action Footer */}
      {(onEdit || onDelete) && (
        <div className="pt-3 border-t border-[var(--border)] flex justify-end space-x-3 text-xs font-medium">
          {onEdit && (
            <button onClick={() => onEdit(data.id)} className="text-[var(--text-muted)] hover:text-indigo-400 transition-colors">
              Edit Limit
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(data.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors">
              Delete
            </button>
          )}
        </div>
      )}

    </div>
  );
};
