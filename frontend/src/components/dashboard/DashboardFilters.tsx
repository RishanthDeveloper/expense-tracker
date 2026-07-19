import React, { useState } from 'react';
import { Calendar, Tag, Filter, RefreshCw } from 'lucide-react';

export interface FilterState {
  dateRange: string;
  category: string;
  transactionType: string;
}

interface DashboardFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'this_month',
    category: 'all',
    transactionType: 'all',
  });

  const handleSelectChange = (key: keyof FilterState, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    if (onFilterChange) {
      onFilterChange(updated);
    }
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      dateRange: 'this_month',
      category: 'all',
      transactionType: 'all',
    };
    setFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  const isFiltered = filters.dateRange !== 'this_month' || filters.category !== 'all' || filters.transactionType !== 'all';

  return (
    <div className="glass-card p-4 rounded-2xl border border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
      
      {/* Title / Label */}
      <div className="flex items-center space-x-2 text-xs font-bold text-[var(--text-main)]">
        <Filter className="w-4 h-4 text-emerald-400" />
        <span>Filter Data:</span>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 flex-1">
        
        {/* 1. Date Range Dropdown */}
        <div className="relative flex-1 min-w-[150px] max-w-[200px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <select
            value={filters.dateRange}
            onChange={(e) => handleSelectChange('dateRange', e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
          >
            <option value="this_month">This Month (July)</option>
            <option value="last_30">Last 30 Days</option>
            <option value="last_90">Last 90 Days</option>
            <option value="ytd">Year to Date (2026)</option>
            <option value="all_time">All Time</option>
          </select>
        </div>

        {/* 2. Category Dropdown */}
        <div className="relative flex-1 min-w-[150px] max-w-[200px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none">
            <Tag className="w-3.5 h-3.5" />
          </div>
          <select
            value={filters.category}
            onChange={(e) => handleSelectChange('category', e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="housing">Housing & Rent</option>
            <option value="food">Food & Groceries</option>
            <option value="shopping">Shopping & Leisure</option>
            <option value="utilities">Utilities & Bills</option>
            <option value="income">Salary & Freelance</option>
          </select>
        </div>

        {/* 3. Transaction Type Dropdown */}
        <div className="relative flex-1 min-w-[140px] max-w-[180px]">
          <select
            value={filters.transactionType}
            onChange={(e) => handleSelectChange('transactionType', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>
        </div>

        {/* Reset Button */}
        {isFiltered && (
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center space-x-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}

      </div>

    </div>
  );
};
