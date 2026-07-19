import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--surface)] border-b border-[var(--border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(--text-main)]">
              ExpenseTracker<span className="text-emerald-500">.AI</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-[var(--text-muted)] hover:text-emerald-500 transition-colors">
              Features
            </a>
            <a href="#insights" className="text-sm font-medium text-[var(--text-muted)] hover:text-emerald-500 transition-colors">
              AI Insights
            </a>
            <a href="#analytics" className="text-sm font-medium text-[var(--text-muted)] hover:text-emerald-500 transition-colors">
              Analytics
            </a>
            <a href="#pricing" className="text-sm font-medium text-[var(--text-muted)] hover:text-emerald-500 transition-colors">
              Pricing
            </a>
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)] hover:border-emerald-500/50 transition-all duration-200"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>

            {/* Auth CTAs */}
            <button className="px-4 py-2 text-sm font-medium text-[var(--text-main)] hover:text-emerald-500 transition-colors">
              Sign In
            </button>
            <button className="group px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium text-sm shadow-glow flex items-center space-x-2 transition-all duration-200">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-4 bg-[var(--surface)] border-b border-[var(--border)] animate-fadeIn">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[var(--text-muted)] hover:text-emerald-500"
          >
            Features
          </a>
          <a
            href="#insights"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[var(--text-muted)] hover:text-emerald-500"
          >
            AI Insights
          </a>
          <a
            href="#analytics"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[var(--text-muted)] hover:text-emerald-500"
          >
            Analytics
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[var(--text-muted)] hover:text-emerald-500"
          >
            Pricing
          </a>
          <div className="pt-4 border-t border-[var(--border)] flex flex-col space-y-3">
            <button className="w-full py-2.5 text-center text-sm font-medium text-[var(--text-main)] bg-[var(--surface-card)] rounded-xl border border-[var(--border)]">
              Sign In
            </button>
            <button className="w-full py-2.5 text-center text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl shadow-glow">
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
