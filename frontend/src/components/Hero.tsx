import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play, TrendingUp, ShieldCheck, Zap, PieChart } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide shadow-glow">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Next-Gen Financial Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.15]">
            Manage Your Money <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
              Smarter with AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
            Take full control of your finances with automated expense logging, AI-driven budget recommendations, and real-time multi-tenant data sync.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-base shadow-glow flex items-center justify-center space-x-3 transition-all duration-200 hover:scale-[1.02]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card text-[var(--text-main)] font-semibold text-base flex items-center justify-center space-x-3 hover:border-emerald-500/50 transition-all duration-200"
            >
              <Play className="w-4 h-4 fill-current text-emerald-400" />
              <span>Watch Live Demo</span>
            </Link>
          </div>

          {/* Social Proof highlights */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-[var(--text-dim)] text-xs sm:text-sm font-medium">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Row Level Security (RLS)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant AI Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>3NF PostgreSQL Schema</span>
            </div>
          </div>
        </div>

        {/* Hero Preview Card / Dashboard Visual */}
        <div className="mt-16 lg:mt-24 relative max-w-5xl mx-auto">
          <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-[var(--border)] shadow-2xl overflow-hidden">
            {/* Dashboard Mock Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-[var(--text-dim)] pl-2 font-mono">dashboard.expensetracker.ai</span>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Insights Active</span>
              </div>
            </div>

            {/* Mock Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              
              {/* Card 1: Total Balance */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between text-[var(--text-muted)] text-sm mb-2">
                  <span>Net Savings</span>
                  <span className="text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded">+14.2%</span>
                </div>
                <div className="text-3xl font-extrabold text-[var(--text-main)] mb-2">₹3,24,850.00</div>
                <p className="text-xs text-[var(--text-dim)]">Target: ₹4,00,000 / month</p>
              </div>

              {/* Card 2: AI Financial Coach Advice */}
              <div className="glass-card p-6 rounded-2xl border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-500/10 to-transparent">
                <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Gemini Insight</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-main)] font-medium leading-snug">
                  "You spent 18% less on dining out this month! Reallocating ₹12,500 to your Investment SIP budget is recommended."
                </p>
              </div>

              {/* Card 3: Quick Category Breakdown */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between text-[var(--text-muted)] text-sm mb-3">
                  <span>Top Categories</span>
                  <PieChart className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-main)]">Housing & Utilities</span>
                    <span className="font-semibold text-emerald-400">₹45,000.00</span>
                  </div>
                  <div className="w-full bg-[var(--surface)] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[65%]" />
                  </div>
                  
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[var(--text-main)]">Food & Groceries</span>
                    <span className="font-semibold text-indigo-400">₹18,450.00</span>
                  </div>
                  <div className="w-full bg-[var(--surface)] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[35%]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
