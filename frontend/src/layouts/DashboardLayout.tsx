import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Target, 
  Sparkles, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  Menu, 
  X, 
  User as UserIcon,
  ChevronDown,
  TrendingUp
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

export const DashboardLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Income', path: '/dashboard/income', icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
    { label: 'Expenses', path: '/dashboard/expenses', icon: <Receipt className="w-5 h-5 text-red-400" /> },
    { label: 'Reports', path: '/dashboard/reports', icon: <PieChart className="w-5 h-5" /> },
    { label: 'Budgets', path: '/dashboard/budgets', icon: <Target className="w-5 h-5" /> },
    { label: 'AI Insights', path: '/dashboard/ai-insights', icon: <Sparkles className="w-5 h-5 text-indigo-400" /> },
    { label: 'Profile', path: '/dashboard/profile', icon: <UserIcon className="w-5 h-5" /> },
    { label: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const userName = user?.fullName || user?.email?.split('@')[0] || 'User Account';
  const userEmail = user?.email || 'user@example.com';
  const userInitials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text-main)] transition-colors duration-300">
      
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[var(--border)] bg-[var(--surface)] p-6 justify-between sticky top-0 h-screen z-30">
        
        <div className="space-y-8">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-glow">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--text-main)]">
              Expense<span className="text-emerald-500">AI</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-glow font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card at bottom of sidebar */}
        <div className="pt-4 border-t border-[var(--border)]">
          <div className="flex items-center justify-between p-2.5 rounded-2xl glass-card border border-[var(--border)]">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs flex-shrink-0">
                {userInitials}
              </div>
              <div className="truncate text-xs">
                <p className="font-semibold text-[var(--text-main)] truncate">{userName}</p>
                <p className="text-[var(--text-dim)] truncate">{userEmail}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-1.5 rounded-lg text-[var(--text-dim)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-[var(--surface)] border-b border-[var(--border)] px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          
          {/* Mobile Drawer Button & Logo */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <span className="font-bold text-base tracking-tight text-[var(--text-main)]">
              Expense<span className="text-emerald-500">AI</span>
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions, categories, budgets..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3 ml-auto">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)] hover:border-emerald-500/50 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Notifications Icon */}
            <button
              className="p-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)] hover:border-emerald-500/50 transition-all relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            {/* Profile Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)] hover:border-emerald-500/50 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  {userInitials}
                </div>
                <span className="hidden md:inline text-xs font-semibold max-w-[100px] truncate">
                  {userName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--text-dim)]" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-panel border border-[var(--border)] shadow-xl py-2 z-50 text-xs space-y-1 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-[var(--border)]">
                    <p className="font-semibold text-[var(--text-main)] truncate">{userName}</p>
                    <p className="text-[10px] text-[var(--text-dim)] truncate">{userEmail}</p>
                  </div>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-[var(--text-muted)] hover:text-emerald-400 hover:bg-[var(--surface-hover)]"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-[var(--text-muted)] hover:text-emerald-400 hover:bg-[var(--surface-hover)]"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-red-500/10 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* PAGE OUTLET */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* ===== MOBILE SLIDE-OUT DRAWER ===== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-full bg-[var(--surface)] border-r border-[var(--border)] p-6 flex flex-col justify-between z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-base text-[var(--text-main)]">ExpenseAI</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === item.path
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-[var(--border)] space-y-3">
              <div className="flex items-center space-x-3 px-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  {userInitials}
                </div>
                <div className="truncate text-xs">
                  <p className="font-semibold text-[var(--text-main)] truncate">{userName}</p>
                  <p className="text-[var(--text-dim)] truncate">{userEmail}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full py-2.5 rounded-xl bg-red-500/10 text-red-400 text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MOBILE BOTTOM NAVIGATION BAR ===== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 backdrop-blur-xl bg-[var(--surface)] border-t border-[var(--border)] px-4 py-2 flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
                isActive ? 'text-emerald-400 font-bold' : 'text-[var(--text-dim)] hover:text-[var(--text-muted)]'
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
};
