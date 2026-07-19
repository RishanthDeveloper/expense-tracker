import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, TrendingUp } from 'lucide-react';

export interface MonthlyComparison {
  month: string;
  income: number;
  expense: number;
  savings?: number;
}

export interface CategoryPie {
  name: string;
  value: number;
  color: string;
}

export interface SavingsGrowth {
  month: string;
  savings: number;
  cumulativeSavings?: number;
}

const defaultMonthlyData: MonthlyComparison[] = [
  { month: 'Jan', income: 6200, expense: 3100, savings: 3100 },
  { month: 'Feb', income: 6800, expense: 3400, savings: 3400 },
  { month: 'Mar', income: 7100, expense: 2900, savings: 4200 },
  { month: 'Apr', income: 6500, expense: 3800, savings: 2700 },
  { month: 'May', income: 7800, expense: 3200, savings: 4600 },
  { month: 'Jun', income: 8200, expense: 3500, savings: 4700 },
  { month: 'Jul', income: 8450, expense: 3120, savings: 5330 },
];

const defaultCategoryData: CategoryPie[] = [
  { name: 'Housing & Rent', value: 10150, color: '#10B981' },
  { name: 'Food & Groceries', value: 4340, color: '#6366F1' },
  { name: 'Utilities & Bills', value: 2205, color: '#06B6D4' },
  { name: 'Shopping & Leisure', value: 2890, color: '#F59E0B' },
  { name: 'Transport & Fuel', value: 1765, color: '#EC4899' },
];

const defaultSavingsGrowth: SavingsGrowth[] = [
  { month: 'Jan', savings: 3100, cumulativeSavings: 3100 },
  { month: 'Feb', savings: 6500, cumulativeSavings: 6500 },
  { month: 'Mar', savings: 10700, cumulativeSavings: 10700 },
  { month: 'Apr', savings: 13400, cumulativeSavings: 13400 },
  { month: 'May', savings: 18000, cumulativeSavings: 18000 },
  { month: 'Jun', savings: 22700, cumulativeSavings: 22700 },
  { month: 'Jul', savings: 28030, cumulativeSavings: 28030 },
];

// Custom Tooltip component
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

interface ReportChartsProps {
  barData?: MonthlyComparison[];
  pieData?: CategoryPie[];
  lineData?: SavingsGrowth[];
}

export const ReportCharts: React.FC<ReportChartsProps> = ({
  barData = defaultMonthlyData,
  pieData = defaultCategoryData,
  lineData = defaultSavingsGrowth,
}) => {
  const chartBarData = barData;
  const chartPieData = pieData;
  const chartLineData = lineData;
  return (
    <div className="space-y-6">
      
      {/* Top Row: Income vs Expense Bar Chart (Left 2/3) & Category Donut Chart (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Income vs Expense Bar Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text-main)]">Income vs Expense Comparison</h3>
                <p className="text-xs text-[var(--text-muted)]">Bi-monthly breakdown (2026)</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs font-semibold">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded bg-emerald-500" />
                <span className="text-[var(--text-muted)]">Income</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded bg-red-400" />
                <span className="text-[var(--text-muted)]">Expense</span>
              </div>
            </div>
          </div>

          <div className="w-full h-72 pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" name="Income" fill="#10B981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#F87171" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 2. Expense Category Distribution (Pie Chart) */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center space-x-2">
                <PieIcon className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-[var(--text-main)]">Expense Category Allocation</h3>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* ===== SAVINGS GROWTH LINE CHART ===== */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-bold text-[var(--text-main)]">Cumulative Net Savings Growth</h3>
            </div>
            <span className="text-xs font-semibold text-emerald-400 font-mono">+18.2% YTD</span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartLineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="savings"
                name="Net Savings"
                stroke="#14B8A6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#14B8A6' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
