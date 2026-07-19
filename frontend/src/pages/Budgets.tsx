import React, { useState } from 'react';
import { useBudget } from '../hooks/useBudget';
import { useExpenses } from '../hooks/useExpenses';
import { FinancialCalculations } from '../utils/calculations';
import { BudgetForm, BudgetFormData } from '../components/forms/BudgetForm';
import { BudgetCard } from '../components/budget/BudgetCard';
import { BudgetTable } from '../components/budget/BudgetTable';
import { Plus, Target, DollarSign, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export const BudgetsPage: React.FC = () => {
  const { budgets, addBudget, deleteBudget } = useBudget();
  const { expenses } = useExpenses();
  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate live category progress
  const calculatedProgress = FinancialCalculations.calculateBudgetProgress(budgets, expenses);

  // Stats
  const totalAllocated = budgets.reduce((acc, b) => acc + (b.amount || 0), 0);
  const totalSpent = FinancialCalculations.calculateTotalExpenses(expenses);
  const remainingBudget = totalAllocated - totalSpent;
  const exceededCount = calculatedProgress.filter((b) => (b.spentAmount / (b.budgetAmount || 1)) >= 0.9).length;

  const handleCreateBudget = async (data: BudgetFormData) => {
    await addBudget({
      category_name: data.category,
      amount: data.amount,
      month: Number(data.month),
      year: Number(data.year),
    });
    setShowAddModal(false);
  };

  const handleDeleteBudget = async (id: string) => {
    await deleteBudget(id);
  };

  return (
    <div className="space-y-8 relative">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)] flex items-center space-x-3">
            <span>Budget Management</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {budgets.length} Targets Active
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Set category limits, monitor spending velocity, and prevent overspending.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm shadow-glow flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Budget</span>
        </button>
      </div>

      {/* ===== SUMMARY METRIC CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Total Allocated */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-indigo-500 space-y-1">
          <div className="flex items-center justify-between text-[var(--text-dim)]">
            <span className="text-xs font-medium">Total Allocated</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${totalAllocated.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-[var(--text-muted)] font-mono">Monthly Budget Limit</span>
        </div>

        {/* 2. Spent to Date */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-emerald-500 space-y-1">
          <div className="flex items-center justify-between text-[var(--text-dim)]">
            <span className="text-xs font-medium">Spent to Date</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-emerald-400 font-semibold font-mono">
            {totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0}% of budget used
          </span>
        </div>

        {/* 3. Remaining Pool */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-teal-500 space-y-1">
          <div className="flex items-center justify-between text-[var(--text-dim)]">
            <span className="text-xs font-medium">Remaining Pool</span>
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
          </div>
          <p className={`text-2xl font-extrabold ${remainingBudget < 0 ? 'text-red-400' : 'text-teal-400'}`}>
            ${remainingBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-[var(--text-muted)] font-mono">Available for rest of month</span>
        </div>

        {/* 4. Exceeded / Warnings */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-amber-500 space-y-1">
          <div className="flex items-center justify-between text-[var(--text-dim)]">
            <span className="text-xs font-medium">Risk Status</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400">
            {exceededCount} Categories
          </p>
          <span className="text-[11px] text-amber-400 font-medium">Near or over limit</span>
        </div>

      </div>

      {/* ===== BUDGET CARDS GRID ===== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[var(--text-main)]">Active Category Targets</h3>
        </div>

        {calculatedProgress.length === 0 ? (
          <div className="glass-card p-8 rounded-3xl text-center space-y-3 border border-[var(--border)]">
            <Target className="w-10 h-10 text-emerald-400 mx-auto opacity-50" />
            <p className="text-sm font-semibold text-[var(--text-main)]">No active budgets found.</p>
            <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
              Create your first category budget to start monitoring monthly spending limits and receiving overspending alerts!
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-semibold shadow-glow"
            >
              Create First Budget
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculatedProgress.map((item) => (
              <BudgetCard
                key={item.id}
                data={{
                  id: item.id,
                  category: item.category,
                  budgetAmount: item.budgetAmount,
                  spentAmount: item.spentAmount,
                  month: item.month,
                }}
                onDelete={handleDeleteBudget}
              />
            ))}
          </div>
        )}
      </div>

      {/* ===== DETAILED BUDGET TABLE ===== */}
      <BudgetTable
        data={calculatedProgress.map((item) => ({
          id: item.id,
          category: item.category,
          budgetAmount: item.budgetAmount,
          spentAmount: item.spentAmount,
          month: item.month,
        }))}
        onDelete={handleDeleteBudget}
      />

      {/* ===== CREATE BUDGET MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-[var(--border)] space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center space-x-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Create Category Budget</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl glass-card text-[var(--text-muted)] hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <BudgetForm
              onSubmit={handleCreateBudget}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default BudgetsPage;
