import React from 'react';
import { Eye, Edit, Trash2, ArrowUpRight, ArrowDownRight, Tag } from 'lucide-react';

export interface TransactionItem {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface RecentTransactionsProps {
  transactions?: TransactionItem[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

import { formatCurrency } from '../../utils/formatters';

const defaultTransactions: TransactionItem[] = [
  { id: '1', date: '2026-07-18', category: 'Housing & Rent', description: 'Monthly Apartment Lease', amount: 45000.00, type: 'expense' },
  { id: '2', date: '2026-07-17', category: 'Salary & Income', description: 'Tech Corp Payroll Deposit', amount: 250000.00, type: 'income' },
  { id: '3', date: '2026-07-16', category: 'Food & Groceries', description: 'Supermarket Groceries', amount: 8450.00, type: 'expense' },
  { id: '4', date: '2026-07-15', category: 'Utilities', description: 'Electricity & Wi-Fi Bill', amount: 3250.00, type: 'expense' },
  { id: '5', date: '2026-07-14', category: 'Freelance Design', description: 'UI/UX Client Retainer', amount: 45000.00, type: 'income' },
];

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions = defaultTransactions,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="glass-panel rounded-3xl border border-[var(--border)] overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-main)]">Recent Transactions</h3>
          <p className="text-xs text-[var(--text-muted)]">Latest income and expense records</p>
        </div>
        <button className="text-xs font-semibold text-emerald-400 hover:underline">
          View All ({transactions.length})
        </button>
      </div>

      {/* ===== DESKTOP TABLE VIEW (sm and up) ===== */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[var(--surface-card)] text-[var(--text-dim)] uppercase font-bold tracking-wider border-b border-[var(--border)]">
              <th className="py-3.5 px-6">Transaction</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Type</th>
              <th className="py-3.5 px-6 text-right">Amount</th>
              <th className="py-3.5 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                
                {/* Description */}
                <td className="py-4 px-6 font-semibold text-[var(--text-main)]">
                  {t.description}
                </td>

                {/* Category */}
                <td className="py-4 px-6">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-muted)]">
                    <Tag className="w-3 h-3 text-emerald-400" />
                    <span>{t.category}</span>
                  </span>
                </td>

                {/* Date */}
                <td className="py-4 px-6 text-[var(--text-muted)]">
                  {t.date}
                </td>

                {/* Type */}
                <td className="py-4 px-6">
                  {t.type === 'income' ? (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>Income</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400">
                      <ArrowDownRight className="w-3 h-3" />
                      <span>Expense</span>
                    </span>
                  )}
                </td>

                {/* Amount */}
                <td className={`py-4 px-6 text-right font-bold text-sm ${
                  t.type === 'income' ? 'text-emerald-400' : 'text-[var(--text-main)]'
                }`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center space-x-2 text-[var(--text-muted)]">
                    <button
                      onClick={() => onView && onView(t.id)}
                      title="View Details"
                      className="p-1.5 rounded-lg hover:text-emerald-400 hover:bg-[var(--surface-card)] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit && onEdit(t.id)}
                      title="Edit"
                      className="p-1.5 rounded-lg hover:text-indigo-400 hover:bg-[var(--surface-card)] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(t.id)}
                      title="Delete"
                      className="p-1.5 rounded-lg hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARD LIST VIEW (<sm) ===== */}
      <div className="sm:hidden divide-y divide-[var(--border)] p-4 space-y-4">
        {transactions.map((t) => (
          <div key={t.id} className="pt-4 first:pt-0 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-[var(--text-main)]">{t.description}</h4>
                <p className="text-xs text-[var(--text-dim)]">{t.date} • {t.category}</p>
              </div>
              <span className={`text-base font-extrabold ${
                t.type === 'income' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              {t.type === 'income' ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                  Income
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400">
                  Expense
                </span>
              )}

              <div className="flex items-center space-x-3 text-xs text-[var(--text-muted)]">
                <button onClick={() => onView && onView(t.id)} className="hover:text-emerald-400">View</button>
                <button onClick={() => onEdit && onEdit(t.id)} className="hover:text-indigo-400">Edit</button>
                <button onClick={() => onDelete && onDelete(t.id)} className="hover:text-red-400">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
