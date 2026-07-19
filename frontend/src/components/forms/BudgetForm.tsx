import React, { useState } from 'react';
import { Target, DollarSign, Calendar, Plus, Loader2 } from 'lucide-react';

export interface BudgetFormData {
  category: string;
  amount: number;
  month: number;
  year: number;
}

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => Promise<void> | void;
  onCancel: () => void;
  initialData?: Partial<BudgetFormData>;
  isSubmitting?: boolean;
}

const categories = [
  'Housing & Rent',
  'Food & Groceries',
  'Dining & Restaurants',
  'Utilities & Bills',
  'Shopping & Apparel',
  'Transport & Fuel',
  'Health & Medical',
  'Entertainment & Subscriptions',
  'Education',
  'Other Expense',
];

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

export const BudgetForm: React.FC<BudgetFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isSubmitting = false,
}) => {
  const [category, setCategory] = useState(initialData?.category || categories[0]);
  const [amount, setAmount] = useState<string>(initialData?.amount ? String(initialData.amount) : '');
  const [month, setMonth] = useState<number>(initialData?.month || new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(initialData?.year || new Date().getFullYear());
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Monthly Limit must be greater than $0.');
      return;
    }

    await onSubmit({
      category,
      amount: parsedAmount,
      month,
      year,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {error}
        </div>
      )}

      {/* Category Selection */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[var(--text-main)] block">
          Select Category *
        </label>
        <div className="relative">
          <Target className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Monthly Limit (Amount) */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[var(--text-main)] block">
          Monthly Limit Amount ($) *
        </label>
        <div className="relative">
          <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 500.00"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
            required
          />
        </div>
      </div>

      {/* Month & Year Selection */}
      <div className="grid grid-cols-2 gap-4">
        {/* Month */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--text-main)] block">
            Target Month *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Year */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--text-main)] block">
            Target Year *
          </label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
          >
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs font-semibold text-[var(--text-main)] hover:bg-[var(--surface-hover)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs shadow-glow flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Save Budget Limit</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
