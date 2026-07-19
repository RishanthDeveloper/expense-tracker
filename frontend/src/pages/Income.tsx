import React, { useState } from 'react';
import { IncomeForm, IncomeFormData } from '../components/forms/IncomeForm';
import { Plus, TrendingUp, Calendar, DollarSign, Award, Search, Filter, Eye, Edit, Trash2, Tag, ArrowUpRight } from 'lucide-react';

export interface IncomeItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
}

const initialIncomes: IncomeItem[] = [
  { id: '1', title: 'Tech Corp Payroll Deposit', category: 'Salary & Wages', amount: 4250.00, date: '2026-07-17', description: 'Bi-weekly salary payout' },
  { id: '2', title: 'UI/UX Design Retainer', category: 'Freelance & Consulting', amount: 850.00, date: '2026-07-14', description: 'Web app redesign deliverables' },
  { id: '3', title: 'Stock Dividend Payout', category: 'Investments & Dividends', amount: 320.50, date: '2026-07-10', description: 'Q2 Tech ETF dividend' },
  { id: '4', title: 'Consulting Session', category: 'Freelance & Consulting', amount: 450.00, date: '2026-07-05', description: '1-on-1 architecture review' },
  { id: '5', title: 'Performance Bonus', category: 'Gifts & Bonuses', amount: 1500.00, date: '2026-07-01', description: 'Mid-year performance award' },
];

export const IncomePage: React.FC = () => {
  const [incomes, setIncomes] = useState<IncomeItem[]>(initialIncomes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Stats Calculations
  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const monthlyIncome = incomes
    .filter((i) => i.date.startsWith('2026-07'))
    .reduce((acc, curr) => acc + curr.amount, 0);
  const avgIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
  const highestIncome = incomes.length > 0 ? Math.max(...incomes.map((i) => i.amount)) : 0;

  const handleAddIncome = (data: IncomeFormData) => {
    const newItem: IncomeItem = {
      id: Date.now().toString(),
      ...data,
    };
    setIncomes([newItem, ...incomes]);
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setIncomes(incomes.filter((i) => i.id !== id));
  };

  const filteredIncomes = incomes.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 relative">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)] flex items-center space-x-3">
            <span>Income Stream Tracker</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {incomes.length} Records
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Log, categorize, and monitor revenue sources in real time.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="hidden sm:flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm shadow-glow transition-all duration-200 hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Income</span>
        </button>
      </div>

      {/* ===== SUMMARY CARDS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Income */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-emerald-500 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--text-muted)]">
            <span>Total Income</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-emerald-400 font-semibold">+14.2% overall growth</span>
        </div>

        {/* Card 2: Monthly Income */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-indigo-500 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--text-muted)]">
            <span>Monthly Income</span>
            <Calendar className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-indigo-400 font-semibold">July 2026 total</span>
        </div>

        {/* Card 3: Average Income */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-amber-500 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--text-muted)]">
            <span>Average Income</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${avgIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-amber-400 font-semibold">Per deposit average</span>
        </div>

        {/* Card 4: Highest Income */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-teal-500 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--text-muted)]">
            <span>Highest Income</span>
            <Award className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${highestIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-teal-400 font-semibold">Single largest record</span>
        </div>

      </div>

      {/* ===== FILTER BAR ===== */}
      <div className="glass-card p-4 rounded-2xl border border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search income title or category..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Filter */}
        <div className="relative min-w-[160px]">
          <Filter className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-8 pr-8 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Salary & Wages">Salary & Wages</option>
            <option value="Freelance & Consulting">Freelance & Consulting</option>
            <option value="Investments & Dividends">Investments & Dividends</option>
            <option value="Gifts & Bonuses">Gifts & Bonuses</option>
          </select>
        </div>

      </div>

      {/* ===== INCOME TABLE / CARD LIST ===== */}
      <div className="glass-panel rounded-3xl border border-[var(--border)] overflow-hidden">
        
        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--surface-card)] text-[var(--text-dim)] uppercase font-bold tracking-wider border-b border-[var(--border)]">
                <th className="py-3.5 px-6">Income Source</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Amount</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredIncomes.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                  <td className="py-4 px-6 font-semibold text-[var(--text-main)]">
                    <div>{item.title}</div>
                    {item.description && <div className="text-[11px] text-[var(--text-dim)] font-normal">{item.description}</div>}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-muted)]">
                      <Tag className="w-3 h-3 text-emerald-400" />
                      <span>{item.category}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[var(--text-muted)]">{item.date}</td>
                  <td className="py-4 px-6 text-right font-extrabold text-sm text-emerald-400">
                    +${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2 text-[var(--text-muted)]">
                      <button title="View" className="p-1.5 rounded-lg hover:text-emerald-400 hover:bg-[var(--surface-card)]"><Eye className="w-4 h-4" /></button>
                      <button title="Edit" className="p-1.5 rounded-lg hover:text-indigo-400 hover:bg-[var(--surface-card)]"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} title="Delete" className="p-1.5 rounded-lg hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View (<640px) */}
        <div className="sm:hidden divide-y divide-[var(--border)] p-4 space-y-4">
          {filteredIncomes.map((item) => (
            <div key={item.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-main)]">{item.title}</h4>
                  <p className="text-xs text-[var(--text-dim)]">{item.date} • {item.category}</p>
                </div>
                <span className="text-base font-extrabold text-emerald-400">
                  +${item.amount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>Income Record</span>
                </span>

                <div className="flex space-x-3 text-xs text-[var(--text-muted)]">
                  <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ===== MOBILE FLOATING ACTION BUTTON (FAB) ===== */}
      <button
        onClick={() => setShowAddModal(true)}
        aria-label="Add Income"
        className="sm:hidden fixed bottom-20 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-glow flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* ===== ADD INCOME MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel p-6 rounded-3xl max-w-lg w-full border border-[var(--border)] space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[var(--border)] pb-3">
              <h3 className="text-base font-bold text-[var(--text-main)]">Add Income Source</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[var(--text-dim)] hover:text-white text-sm">✕</button>
            </div>
            
            <IncomeForm
              onSubmit={handleAddIncome}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default IncomePage;
