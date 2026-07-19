import React from 'react';
import { Tag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export interface CategorySummaryStat {
  category: string;
  type: 'income' | 'expense';
  totalAmount: number;
  transactionCount: number;
  sharePercentage: number;
}

const defaultStats: CategorySummaryStat[] = [
  { category: 'Salary & Wages', type: 'income', totalAmount: 250000.00, transactionCount: 14, sharePercentage: 67.0 },
  { category: 'Housing & Rent', type: 'expense', totalAmount: 45000.00, transactionCount: 7, sharePercentage: 47.5 },
  { category: 'Freelance Consulting', type: 'income', totalAmount: 45000.00, transactionCount: 12, sharePercentage: 23.0 },
  { category: 'Food & Groceries', type: 'expense', totalAmount: 18450.00, transactionCount: 28, sharePercentage: 20.3 },
  { category: 'Investments & Dividends', type: 'income', totalAmount: 15000.00, transactionCount: 6, sharePercentage: 10.0 },
  { category: 'Shopping & Apparel', type: 'expense', totalAmount: 12500.00, transactionCount: 15, sharePercentage: 13.5 },
  { category: 'Utilities & Bills', type: 'expense', totalAmount: 8200.00, transactionCount: 14, sharePercentage: 10.3 },
  { category: 'Transport & Fuel', type: 'expense', totalAmount: 6500.00, transactionCount: 18, sharePercentage: 8.4 },
];

interface ReportTableProps {
  stats?: CategorySummaryStat[];
}

export const ReportTable: React.FC<ReportTableProps> = ({ stats = defaultStats }) => {
  const statList = stats;
  return (
    <div className="glass-panel rounded-3xl border border-[var(--border)] overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)]">Comprehensive Category Breakdown</h3>
          <p className="text-xs text-[var(--text-muted)] font-mono">YTD Transaction statistics & share analysis</p>
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[var(--surface-card)] text-[var(--text-dim)] uppercase font-bold tracking-wider border-b border-[var(--border)]">
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Type</th>
              <th className="py-3.5 px-6 text-center">Transactions</th>
              <th className="py-3.5 px-6 text-right">Total Amount</th>
              <th className="py-3.5 px-6 text-right">% Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {statList.map((stat, idx) => (
              <tr key={idx} className="hover:bg-[var(--surface-hover)] transition-colors">
                
                {/* Category */}
                <td className="py-4 px-6 font-semibold text-[var(--text-main)]">
                  <span className="inline-flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <span>{stat.category}</span>
                  </span>
                </td>

                {/* Type */}
                <td className="py-4 px-6">
                  {stat.type === 'income' ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>Income</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                      <ArrowDownRight className="w-3 h-3" />
                      <span>Expense</span>
                    </span>
                  )}
                </td>

                {/* Count */}
                <td className="py-4 px-6 text-center font-medium text-[var(--text-muted)]">
                  {stat.transactionCount} records
                </td>

                {/* Total Amount */}
                <td className={`py-4 px-6 text-right font-extrabold ${stat.type === 'income' ? 'text-emerald-400' : 'text-[var(--text-main)]'}`}>
                  {stat.type === 'income' ? '+' : '-'}{formatCurrency(stat.totalAmount)}
                </td>

                {/* Share Percentage Bar */}
                <td className="py-4 px-6 text-right font-semibold text-[var(--text-main)]">
                  <div className="flex items-center justify-end space-x-2">
                    <div className="w-16 bg-[var(--surface-card)] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${stat.type === 'income' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                        style={{ width: `${stat.sharePercentage}%` }}
                      />
                    </div>
                    <span>{stat.sharePercentage}%</span>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
