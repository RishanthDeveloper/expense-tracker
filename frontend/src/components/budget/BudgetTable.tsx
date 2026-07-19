import React from 'react';
import { BudgetCardData } from './BudgetCard';
import { CheckCircle2, AlertTriangle, AlertCircle, Edit, Trash2, Tag } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface BudgetTableProps {
  budgets?: BudgetCardData[];
  data?: BudgetCardData[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const BudgetTable: React.FC<BudgetTableProps> = ({ budgets, data, onEdit, onDelete }) => {
  const budgetList = data || budgets || [];
  return (
    <div className="glass-panel rounded-3xl border border-[var(--border)] overflow-hidden">
      <div className="p-6 border-b border-[var(--border)]">
        <h3 className="text-base font-bold text-[var(--text-main)]">Detailed Budget Breakdown</h3>
        <p className="text-xs text-[var(--text-muted)]">Category-level budget allocations and consumption status</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[var(--surface-card)] text-[var(--text-dim)] uppercase font-bold tracking-wider border-b border-[var(--border)]">
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6 text-right">Budget Limit</th>
              <th className="py-3.5 px-6 text-right">Spent Amount</th>
              <th className="py-3.5 px-6 text-right">Remaining</th>
              <th className="py-3.5 px-6 text-center">Status</th>
              <th className="py-3.5 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {budgetList.map((b) => {
              const remaining = b.budgetAmount - b.spentAmount;
              const percentage = Math.min(Math.round((b.spentAmount / b.budgetAmount) * 100), 100);

              let statusBadge = {
                label: 'Good',
                bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                icon: <CheckCircle2 className="w-3.5 h-3.5" />,
              };

              if (percentage >= 90) {
                statusBadge = {
                  label: 'Exceeded',
                  bg: 'bg-red-500/10 text-red-400 border-red-500/20',
                  icon: <AlertCircle className="w-3.5 h-3.5" />,
                };
              } else if (percentage >= 70) {
                statusBadge = {
                  label: 'Warning',
                  bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                  icon: <AlertTriangle className="w-3.5 h-3.5" />,
                };
              }

              return (
                <tr key={b.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                  
                  {/* Category */}
                  <td className="py-4 px-6 font-semibold text-[var(--text-main)]">
                    <span className="inline-flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span>{b.category}</span>
                    </span>
                  </td>

                  {/* Budget */}
                  <td className="py-4 px-6 text-right font-bold text-[var(--text-main)]">
                    {formatCurrency(b.budgetAmount)}
                  </td>

                  {/* Spent */}
                  <td className="py-4 px-6 text-right font-semibold text-[var(--text-muted)]">
                    {formatCurrency(b.spentAmount)}
                  </td>

                  {/* Remaining */}
                  <td className={`py-4 px-6 text-right font-bold ${remaining < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {remaining < 0 ? `-${formatCurrency(Math.abs(remaining))}` : formatCurrency(remaining)}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusBadge.bg}`}>
                      {statusBadge.icon}
                      <span>{statusBadge.label} ({percentage}%)</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2 text-[var(--text-muted)]">
                      <button onClick={() => onEdit && onEdit(b.id)} title="Edit" className="p-1.5 rounded-lg hover:text-indigo-400 hover:bg-[var(--surface-card)]">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete && onDelete(b.id)} title="Delete" className="p-1.5 rounded-lg hover:text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
