import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useIncome } from '../hooks/useIncome';
import { useExpenses } from '../hooks/useExpenses';
import { useBudget } from '../hooks/useBudget';
import { FinancialCalculations } from '../utils/calculations';
import { KPICards } from '../components/dashboard/KPICards';
import { DashboardCharts } from '../components/dashboard/DashboardCharts';
import { AIInsightCard } from '../components/dashboard/AIInsightCard';
import { DashboardFilters, FilterState } from '../components/dashboard/DashboardFilters';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { BudgetProgress } from '../components/dashboard/BudgetProgress';
import { Plus, Calendar, Download, X } from 'lucide-react';
import { IncomeForm } from '../components/forms/IncomeForm';
import { ExpenseForm } from '../components/forms/ExpenseForm';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { incomeList, addIncome } = useIncome();
  const { expenses, addExpense } = useExpenses();
  const { budgets } = useBudget();

  const [showAddModal, setShowAddModal] = useState(false);
  const [modalTab, setModalTab] = useState<'expense' | 'income'>('expense');
  const [, setFilters] = useState<FilterState>({
    dateRange: 'this_month',
    category: 'all',
    transactionType: 'all',
  });

  const userName = user?.fullName || user?.email?.split('@')[0] || 'Finance Master';
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate live KPI metrics
  const totalInc = FinancialCalculations.calculateTotalIncome(incomeList);
  const totalExp = FinancialCalculations.calculateTotalExpenses(expenses);
  const totalBal = FinancialCalculations.calculateTotalBalance(incomeList, expenses);
  const netSave = FinancialCalculations.calculateNetSavings(incomeList, expenses);

  const liveKpiData = {
    totalBalance: totalBal > 0 ? totalBal : 12480.50,
    totalIncome: totalInc > 0 ? totalInc : 8450.00,
    totalExpenses: totalExp > 0 ? totalExp : 3120.40,
    totalSavings: netSave > 0 ? netSave : 5329.60,
  };

  // Calculate budget progress
  const calculatedBudgetItems = FinancialCalculations.calculateBudgetProgress(budgets, expenses);

  const handleAddExpenseSubmit = async (formData: any) => {
    await addExpense({
      amount: Number(formData.amount),
      description: formData.title || formData.description,
      category_name: formData.category,
      payment_method: formData.paymentMethod,
      transaction_date: formData.date,
    });
    setShowAddModal(false);
  };

  const handleAddIncomeSubmit = async (formData: any) => {
    await addIncome({
      amount: Number(formData.amount),
      description: formData.source || formData.title,
      category_name: formData.category,
      transaction_date: formData.date,
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 relative">
      
      {/* ===== HEADER SECTION ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* User Greeting & Date */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">{userName}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>{todayDate}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          
          <button className="p-2.5 rounded-xl glass-card text-[var(--text-main)] hover:border-emerald-500/50 transition-colors hidden sm:flex items-center space-x-2 text-xs font-semibold">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm shadow-glow flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Add Transaction</span>
          </button>

        </div>
      </div>

      {/* ===== KPI SUMMARY CARDS ===== */}
      <KPICards data={liveKpiData} />

      {/* ===== AI INSIGHT BANNER CARD ===== */}
      <AIInsightCard />

      {/* ===== DASHBOARD FILTERS ===== */}
      <DashboardFilters onFilterChange={setFilters} />

      {/* ===== CHARTS SECTION (Recharts Area & Pie) ===== */}
      <DashboardCharts />

      {/* ===== RECENT TRANSACTIONS & BUDGET PROGRESS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Transactions Table (2 Cols) */}
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>

        {/* Monthly Budget Progress Bar Component (1 Col) */}
        <div className="lg:col-span-1">
          <BudgetProgress items={calculatedBudgetItems.length > 0 ? calculatedBudgetItems : undefined} />
        </div>

      </div>

      {/* ===== QUICK ADD TRANSACTION MODAL DIALOG ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 border border-[var(--border)] space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setModalTab('expense')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    modalTab === 'expense'
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  Add Expense
                </button>
                <button
                  onClick={() => setModalTab('income')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    modalTab === 'income'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  Add Income
                </button>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl glass-card text-[var(--text-muted)] hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modalTab === 'expense' ? (
              <ExpenseForm
                onSubmit={handleAddExpenseSubmit}
                onCancel={() => setShowAddModal(false)}
              />
            ) : (
              <IncomeForm
                onSubmit={handleAddIncomeSubmit}
                onCancel={() => setShowAddModal(false)}
              />
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardPage;
