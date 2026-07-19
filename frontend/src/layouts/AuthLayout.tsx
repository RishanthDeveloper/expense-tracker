import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Sun, Moon, ArrowLeft, TrendingUp } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const AuthLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg)] text-[var(--text-main)] transition-colors duration-300 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Left Column: Branding & Illustration (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[var(--surface)] border-r border-[var(--border)] p-12 flex-col justify-between overflow-hidden">
        
        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(--text-main)]">
              ExpenseTracker<span className="text-emerald-500">.AI</span>
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center space-x-2 text-xs font-medium text-[var(--text-muted)] hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Center Visual Mockup & Copy */}
        <div className="relative z-10 my-auto space-y-8 max-w-lg">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Multi-Tenant Enterprise Security</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-[var(--text-main)] leading-tight">
              Master Your Money with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">
                AI Financial Intelligence
              </span>
            </h2>
            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              Log expenses, automate budget alerts, and unlock real-time Gemini AI insights isolated safely with PostgreSQL Row Level Security.
            </p>
          </div>

          {/* Interactive Feature Card */}
          <div className="glass-card p-6 rounded-2xl border border-[var(--border)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-main)]">Monthly Spending Velocity</h4>
                  <p className="text-xs text-[var(--text-dim)]">AI Optimization Active</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                -15.4% Expenses
              </span>
            </div>
            
            <div className="w-full bg-[var(--surface)] h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-full w-[42%]" />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-[var(--text-dim)] flex items-center justify-between">
          <span>© {new Date().getFullYear()} Expense Tracker AI</span>
          <span>Protected by Supabase Auth</span>
        </div>

        {/* Subtle Decorative Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
      </div>

      {/* Right Column: Form Container (Mobile full-width, Desktop split) */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 z-10">
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-[var(--text-main)]">
              ExpenseTracker<span className="text-emerald-500">.AI</span>
            </span>
          </Link>

          <div className="ml-auto">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)] hover:border-emerald-500/50 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          </div>
        </div>

        {/* Form Card Content */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <Outlet />
        </div>

        {/* Mobile Footer Link */}
        <div className="lg:hidden text-center text-xs text-[var(--text-dim)]">
          <Link to="/" className="hover:text-emerald-400 inline-flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing Page</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
