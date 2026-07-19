import React, { useState } from 'react';
import { CreditCard, Tag, Calendar, FileText, Upload, Plus, Loader2 } from 'lucide-react';

export interface ExpenseFormData {
  title: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  description?: string;
  receiptName?: string;
}

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void> | void;
  onCancel: () => void;
  initialData?: Partial<ExpenseFormData>;
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

const paymentMethods = [
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'Cash',
  'Apple / Google Pay',
];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isSubmitting = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || categories[0]);
  const [amount, setAmount] = useState<string>(initialData?.amount ? String(initialData.amount) : '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState(initialData?.paymentMethod || paymentMethods[0]);
  const [description, setDescription] = useState(initialData?.description || '');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedAmount = parseFloat(amount);

    if (!title.trim()) {
      setError('Please provide an Expense Title.');
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
      paymentMethod,
      description: description.trim(),
      receiptName: receiptFile?.name,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {error}
        </div>
      )}

      {/* Expense Title */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[var(--text-main)] block">
          Expense Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Monthly Whole Foods Grocery"
          className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
          required
        />
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

      {/* Date & Payment Method Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* Payment Method */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--text-main)] block">
            Payment Method *
          </label>
          <div className="relative">
            <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
            >
              {paymentMethods.map((pm) => (
                <option key={pm} value={pm}>
                  {pm}
                </option>
              ))}
            </select>
          </div>
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
            placeholder="Itemized notes, store location..."
            rows={2}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Optional Receipt Upload */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-[var(--text-main)] block">
          Receipt Attachment (Optional)
        </label>
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border)]">
          <Upload className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
            className="text-xs text-[var(--text-muted)] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 cursor-pointer"
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
              <span>Save Expense</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
