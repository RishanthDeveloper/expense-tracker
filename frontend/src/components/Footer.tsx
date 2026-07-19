import React from 'react';
import { Sparkles, Globe, Share2, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-[var(--text-main)]">
                ExpenseTracker<span className="text-emerald-500">.AI</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Production-ready financial intelligence platform powered by React, Supabase PostgreSQL, and Gemini AI.
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-main)] mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li><a href="#features" className="hover:text-emerald-400">Expense Logger</a></li>
              <li><a href="#features" className="hover:text-emerald-400">AI Financial Insights</a></li>
              <li><a href="#features" className="hover:text-emerald-400">Budget Planner</a></li>
              <li><a href="#features" className="hover:text-emerald-400">Multi-tenant RLS</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-main)] mb-4">Stack</h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li><span>React 18 + TypeScript</span></li>
              <li><span>Vite + Tailwind CSS</span></li>
              <li><span>Supabase Auth & Storage</span></li>
              <li><span>PostgreSQL 3NF Schema</span></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-main)] mb-4">Connect</h4>
            <div className="flex space-x-4 text-[var(--text-muted)]">
              <a href="#" className="p-2 rounded-xl bg-[var(--surface-card)] hover:text-emerald-400 border border-[var(--border)]" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[var(--surface-card)] hover:text-emerald-400 border border-[var(--border)]" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[var(--surface-card)] hover:text-emerald-400 border border-[var(--border)]" aria-label="Community">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--text-dim)]">
          <p>© {new Date().getFullYear()} Expense Tracker AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-emerald-400">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
