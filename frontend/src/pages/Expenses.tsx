import React, { useState } from 'react';
import { ExpenseForm, ExpenseFormData } from '../components/forms/ExpenseForm';
import { 
  Plus, 
  TrendingDown, 
  Clock, 
  Calendar, 
  Zap, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Tag, 
  ArrowDownRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export interface ExpenseItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  description?: string;
  receiptName?: string;
}

const initialExpenses: ExpenseItem[] = [
  { id: '1', title: 'Monthly Apartment Lease', category: 'Housing & Rent', amount: 1450.00, date: '2026-07-18', paymentMethod: 'Bank Transfer', description: 'July rent payment' },
  { id: '2', title: 'Whole Foods Grocery Market', category: 'Food & Groceries', amount: 184.20, date: '2026-07-16', paymentMethod: 'Credit Card', description: 'Weekly organic groceries' },
  { id: '3', title: 'Electric & Internet Utility Bill', category: 'Utilities & Bills', amount: 125.50, date: '2026-07-15', paymentMethod: 'Debit Card', description: 'Power grid + Fiber optic internet' },
  { id: '4', title: 'Gas Station Fuel Refill', category: 'Transport & Fuel', amount: 65.00, date: '2026-07-12', paymentMethod: 'Credit Card', description: 'Full tank unleaded 95' },
  { id: '5', title: 'Cloud Hosting & SaaS Subscriptions', category: 'Entertainment & Subscriptions', amount: 89.00, date: '2026-07-08', paymentMethod: 'Credit Card', description: 'Vite & Vercel Pro plans' },
];

export const ExpensePage: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Stats Calculations
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const todayDateStr = new Date().toISOString().split('T')[0];
  const todaysExpense = expenses
    .filter((e) => e.date === todayDateStr)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const monthlyExpense = expenses
    .filter((e) => e.date.startsWith('2026-07'))
    .reduce((acc, curr) => acc + curr.amount, 0);
  const largestExpense = expenses.length > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0;

  const handleAddExpense = (data: ExpenseFormData) => {
    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      ...data,
    };
    setExpenses([newItem, ...expenses]);
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const filteredExpenses = expenses.filter((item) => {
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
            <span>Expenses & Outflows</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
              {expenses.length} Logged
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Track expenses, inspect receipts, and optimize category spending limits.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="hidden sm:flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm shadow-glow transition-all duration-200 hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* ===== SUMMARY CARDS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Expense */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-red-500 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--text-muted)]">
            <span>Total Outflow</span>
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-teal-400 font-semibold">-3.8% vs last month</span>
        </div>

        {/* Card 2: Today's Expense */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-amber-500 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--text-muted)]">
            <span>Today's Expense</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${todaysExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-amber-400 font-semibold">Real-time daily tracker</span>
        </div>

        {/* Card 3: Monthly Expense */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-indigo-500 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--text-muted)]">
            <span>Monthly Expense</span>
            <Calendar className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${monthlyExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-indigo-400 font-semibold">July 2026 total</span>
        </div>

        {/* Card 4: Largest Expense */}
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-purple-500 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--text-muted)]">
            <span>Largest Expense</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${largestExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-purple-400 font-semibold">Housing & Rent</span>
        </div>

      </div>

      {/* ===== AI EXPENSE ANALYSIS SECTION STUB ===== */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-[var(--surface)] to-transparent space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)]">AI Expense Optimization Audit</h3>
            <p className="text-xs text-[var(--text-muted)]">Automated pattern recognition & overspending alerts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Top Spending */}
          <div className="glass-card p-4 rounded-2xl space-y-1.5 border-l-4 border-l-indigo-500">
            <div className="font-bold text-indigo-400">Top Spending Category</div>
            <p className="text-[var(--text-main)] font-semibold">Housing & Rent (65% of monthly total)</p>
            <p className="text-[var(--text-dim)]">Fixed recurring commitment</p>
          </div>

          {/* Overspending Alert */}
          <div className="glass-card p-4 rounded-2xl space-y-1.5 border-l-4 border-l-amber-500">
            <div className="font-bold text-amber-400 flex items-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Overspending Warning</span>
            </div>
            <p className="text-[var(--text-main)] font-semibold">Food & Groceries is +12% above average</p>
            <p className="text-[var(--text-dim)]">Consider meal planning for next 10 days</p>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-4 rounded-2xl space-y-1.5 border-l-4 border-l-emerald-500">
            <div className="font-bold text-emerald-400 flex items-center space-x-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>AI Recommendation</span>
            </div>
            <p className="text-[var(--text-main)] font-semibold">Potential $110/mo savings detected</p>
            <p className="text-[var(--text-dim)]">Consolidate SaaS & utility payment methods</p>
          </div>

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
            placeholder="Search expense title, store, or category..."
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
            <option value="Housing & Rent">Housing & Rent</option>
            <option value="Food & Groceries">Food & Groceries</option>
            <option value="Utilities & Bills">Utilities & Bills</option>
            <option value="Transport & Fuel">Transport & Fuel</option>
            <option value="Entertainment & Subscriptions">Subscriptions</option>
          </select>
        </div>

      </div>

      {/* ===== EXPENSE TABLE / EXPANDABLE MOBILE CARD LIST ===== */}
      <div className="glass-panel rounded-3xl border border-[var(--border)] overflow-hidden">
        
        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--surface-card)] text-[var(--text-dim)] uppercase font-bold tracking-wider border-b border-[var(--border)]">
                <th className="py-3.5 px-6">Expense Item</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Method</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Amount</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredExpenses.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                  <td className="py-4 px-6 font-semibold text-[var(--text-main)]">
                    <div>{item.title}</div>
                    {item.description && <div className="text-[11px] text-[var(--text-dim)] font-normal">{item.description}</div>}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-muted)]">
                      <Tag className="w-3 h-3 text-red-400" />
                      <span>{item.category}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[var(--text-muted)]">{item.paymentMethod}</td>
                  <td className="py-4 px-6 text-[var(--text-muted)]">{item.date}</td>
                  <td className="py-4 px-6 text-right font-extrabold text-sm text-[var(--text-main)]">
                    -${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2 text-[var(--text-muted)]">
                      <button title="View Details" className="p-1.5 rounded-lg hover:text-emerald-400 hover:bg-[var(--surface-card)]"><Eye className="w-4 h-4" /></button>
                      <button title="Edit" className="p-1.5 rounded-lg hover:text-indigo-400 hover:bg-[var(--surface-card)]"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} title="Delete" className="p-1.5 rounded-lg hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Expandable Card List View (<640px) */}
        <div className="sm:hidden divide-y divide-[var(--border)] p-4 space-y-4">
          {filteredExpenses.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="pt-4 first:pt-0 space-y-2">
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="flex justify-between items-start cursor-pointer"
                >
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-main)] flex items-center space-x-1">
                      <span>{item.title}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 text-[var(--text-dim)]" />}
                    </h4>
                    <p className="text-xs text-[var(--text-dim)]">{item.date} • {item.category}</p>
                  </div>
                  <span className="text-base font-extrabold text-red-400">
                    -${item.amount.toFixed(2)}
                  </span>
                </div>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="p-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] space-y-2 text-xs text-[var(--text-muted)] animate-fadeIn">
                    <p><strong>Payment Method:</strong> {item.paymentMethod}</p>
                    {item.description && <p><strong>Notes:</strong> {item.description}</p>}
                    {item.receiptName && <p className="text-emerald-400"><strong>Receipt:</strong> {item.receiptName}</p>}

                    <div className="flex justify-between items-center pt-2 border-t border-[var(--border)]">
                      <span className="inline-flex items-center space-x-1 text-[10px] text-red-400 font-semibold bg-red-500/10 px-2 py-0.5 rounded-full">
                        <ArrowDownRight className="w-3 h-3" />
                        <span>Expense Outflow</span>
                      </span>

                      <div className="flex space-x-4 text-xs font-semibold">
                        <button onClick={() => handleDelete(item.id)} className="text-red-400">Delete</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* ===== MOBILE FLOATING ACTION BUTTON ===== */}
      <button
        onClick={() => setShowAddModal(true)}
        aria-label="Add Expense"
        className="sm:hidden fixed bottom-20 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-glow flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* ===== ADD EXPENSE MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel p-6 rounded-3xl max-w-lg w-full border border-[var(--border)] space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[var(--border)] pb-3">
              <h3 className="text-base font-bold text-[var(--text-main)]">Add Expense Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[var(--text-dim)] hover:text-white text-sm">✕</button>
            </div>
            
            <ExpenseForm
              onSubmit={handleAddExpense}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default ExpensePage;
