import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { TrendingUp, PieChart as PieIcon } from 'lucide-react';

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface DashboardChartsProps {
  monthlyData?: MonthlyData[];
  categoryData?: CategoryData[];
}

const defaultMonthlyData: MonthlyData[] = [
  { month: 'Jan', income: 6200, expenses: 3100 },
  { month: 'Feb', income: 6800, expenses: 3400 },
  { month: 'Mar', income: 7100, expenses: 2900 },
  { month: 'Apr', income: 6500, expenses: 3800 },
  { month: 'May', income: 7800, expenses: 3200 },
  { month: 'Jun', income: 8200, expenses: 3500 },
  { month: 'Jul', income: 8450, expenses: 3120 },
];

const defaultCategoryData: CategoryData[] = [
  { name: 'Housing & Rent', value: 1450, color: '#10B981' }, // Emerald
  { name: 'Food & Groceries', value: 620, color: '#6366F1' },  // Indigo
  { name: 'Shopping & Leisure', value: 480, color: '#F59E0B' },// Amber
  { name: 'Utilities', value: 310, color: '#06B6D4' },          // Cyan
  { name: 'Transport & Fuel', value: 260, color: '#EC4899' },   // Pink
];

// Custom Tooltip component for light/dark theme compatibility
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-xl border border-[var(--border)] shadow-xl text-xs space-y-1">
        <p className="font-bold text-[var(--text-main)] mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[var(--text-muted)]">{entry.name}:</span>
            <span className="font-semibold text-[var(--text-main)]">
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  monthlyData = defaultMonthlyData,
  categoryData = defaultCategoryData,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* ===== LEFT CHART (2/3 width on desktop): Income vs Expenses Area/Line Chart ===== */}
      <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-[var(--border)] space-y-4 flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">Income vs Expenses</h3>
              <p className="text-xs text-[var(--text-muted)]">Monthly cash flow trend (2026)</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-semibold">
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[var(--text-muted)]">Income</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-[var(--text-muted)]">Expenses</span>
            </div>
          </div>
        </div>

        {/* Recharts Area Container */}
        <div className="w-full h-72 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} vertical={false} />
              
              <XAxis
                dataKey="month"
                stroke="var(--text-dim)"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              
              <YAxis
                stroke="var(--text-dim)"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val / 1000}k`}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorIncome)"
              />
              
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#6366F1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ===== RIGHT CHART (1/3 width on desktop): Expense Category Pie/Donut Chart ===== */}
      <div className="glass-panel p-6 rounded-3xl border border-[var(--border)] space-y-4 flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <PieIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)]">Expense Categories</h3>
            <p className="text-xs text-[var(--text-muted)]">Share by spending type</p>
          </div>
        </div>

        {/* Recharts Pie Container */}
        <div className="w-full h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--bg)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: 'var(--text-muted)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};
