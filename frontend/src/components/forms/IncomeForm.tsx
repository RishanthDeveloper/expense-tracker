import React, { useState } from 'react';
import { DollarSign, Tag, Calendar, FileText, Plus, Loader2 } from 'lucide-react';

export interface IncomeFormData {
  title: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
}

interface IncomeFormProps {
  onSubmit: (data: IncomeFormData) => Promise<void> | void;
  onCancel: () => void;
  initialData?: Partial<IncomeFormData>;
  isSubmitting?: boolean;
}

const categories = [
  'Salary & Wages',
  'Freelance & Consulting',
  'Investments & Dividends',
  'Business Profit',
  'Rental Income',
  'Gifts & Bonuses',
  'Other Income',
];

export const IncomeForm: React.FC<IncomeFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isSubmitting = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || categories[0]);
  const [amount, setAmount] = useState<string>(initialData?.amount ? String(initialData.amount) : '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(initialData?.description || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedAmount = parseFloat(amount);

    if (!title.trim()) {
      setError('Please provide an Income Title/Source.');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be greater than $0.');
      return;
    }

    await onSubmit({
      title: title.trim(),
      category,
      amount: parsedAmount,
      date,
      description: description.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {error}
        </div>
      )}

      {/* Income Source / Title */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[var(--text-main)] block">
          Income Source / Title *
        </label>
        <div className="relative">
          <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Tech Corp Monthly Salary"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
            required
          />
        </div>
      </div>

      {/* Category & Amount Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--text-main)] block">
            Category *
          </label>
          <div className="relative">
            <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
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

        {/* Amount */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--text-main)] block">
            Amount ($) *
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
            required
          />
        </div>
      </div>

      {/* Date */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[var(--text-main)] block">
          Transaction Date *
        </label>
        <div className="relative">
          <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[var(--text-main)] block">
          Description (Optional)
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 absolute left-3 top-3 text-[var(--text-dim)]" />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Additional notes..."
            rows={3}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
          />
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
              <span>Save Income</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
