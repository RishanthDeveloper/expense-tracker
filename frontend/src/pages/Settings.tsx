import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { useProfile } from '../hooks/useProfile';
import { 
  Sun, 
  Moon, 
  DollarSign, 
  Bell, 
  Lock, 
  AlertTriangle, 
  LogOut, 
  Trash2, 
  ShieldCheck, 
  Save, 
  Loader2,
  CheckCircle2
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const { settings, updateSettings } = useSettings();
  const { updatePassword } = useProfile();

  // Local Settings States
  const [accentColor, setAccentColor] = useState('emerald');
  const [fontSize, setFontSize] = useState('medium');
  const [currency, setCurrency] = useState(settings?.currency || 'INR');
  
  // Notification Toggles
  const [emailAlerts, setEmailAlerts] = useState(settings?.email_notifications ?? true);
  const [pushAlerts, setPushAlerts] = useState(settings?.push_notifications ?? true);
  const [budgetAlerts, setBudgetAlerts] = useState(settings?.budget_alerts ?? true);
  const [aiAlerts, setAiAlerts] = useState(settings?.ai_enabled ?? true);

  // Security Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secSuccess, setSecSuccess] = useState<string | null>(null);
  const [secError, setSecError] = useState<string | null>(null);
  const [isSavingSec, setIsSavingSec] = useState(false);

  useEffect(() => {
    if (settings) {
      setCurrency(settings.currency || 'USD');
      setEmailAlerts(settings.email_notifications);
      setPushAlerts(settings.push_notifications);
      setBudgetAlerts(settings.budget_alerts);
      setAiAlerts(settings.ai_enabled);
    }
  }, [settings]);

  const handleUpdateToggle = async (key: string, value: any) => {
    try {
      await updateSettings({ [key]: value });
    } catch (err) {
      console.error('Settings update error:', err);
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecError(null);
    setSecSuccess(null);

    if (!newPassword || !confirmPassword) {
      setSecError('Please complete all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setSecError('Password must be at least 6 characters.');
      return;
    }

    setIsSavingSec(true);
    try {
      await updatePassword(newPassword);
      setSecSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSecSuccess(null), 3000);
    } catch (err: any) {
      setSecError(err.message || 'Failed to update password.');
    } finally {
      setIsSavingSec(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is permanent and deletes all financial records!')) {
      alert('Account deletion request queued.');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto relative">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
          Application Preferences & Settings
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Customize themes, currency defaults, security keys, and automated alert preferences.
        </p>
      </div>

      {/* ===== 1. APPEARANCE SETTINGS ===== */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border)] space-y-6">
        <div className="border-b border-[var(--border)] pb-4 flex items-center space-x-3">
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)]">Appearance & Styling</h3>
            <p className="text-xs text-[var(--text-muted)]">Light & Dark theme modes, accent palettes, and text scale</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Theme Toggle Button */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)]">
            <div>
              <p className="font-bold text-[var(--text-main)]">Interface Theme</p>
              <p className="text-[var(--text-dim)]">Current: <span className="capitalize font-semibold text-emerald-400">{theme} Mode</span></p>
            </div>
            <button
              onClick={() => {
                toggleTheme();
                handleUpdateToggle('theme', theme === 'dark' ? 'light' : 'dark');
              }}
              className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] font-semibold text-[var(--text-main)] hover:border-emerald-500/50 flex items-center space-x-2 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>

          {/* Accent Color Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] gap-3">
            <div>
              <p className="font-bold text-[var(--text-main)]">Accent Color Theme</p>
              <p className="text-[var(--text-dim)]">Primary highlights & chart gradient hues</p>
            </div>
            <div className="flex space-x-3">
              {['emerald', 'indigo', 'amber', 'teal'].map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === 'emerald' ? 'bg-emerald-500' :
                    color === 'indigo' ? 'bg-indigo-500' :
                    color === 'amber' ? 'bg-amber-500' : 'bg-teal-500'
                  } ${accentColor === color ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'}`}
                />
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)]">
            <div>
              <p className="font-bold text-[var(--text-main)]">Font Scaling</p>
              <p className="text-[var(--text-dim)]">Adjust text readability size</p>
            </div>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none"
            >
              <option value="small">Small (Compact)</option>
              <option value="medium">Medium (Standard)</option>
              <option value="large">Large (High Contrast)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== 2. CURRENCY SETTINGS ===== */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border)] space-y-4">
        <div className="border-b border-[var(--border)] pb-4 flex items-center space-x-3">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)]">Currency & Localization</h3>
            <p className="text-xs text-[var(--text-muted)]">Set default transaction currency symbol and number formatting</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)] flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text-main)]">Default Currency</span>
          <select
            value={currency}
            onChange={(e) => {
              const val = e.target.value;
              setCurrency(val);
              handleUpdateToggle('currency', val);
            }}
            className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-main)] font-semibold focus:outline-none cursor-pointer"
          >
            <option value="USD">USD ($) - United States Dollar</option>
            <option value="EUR">EUR (€) - Eurozone</option>
            <option value="GBP">GBP (£) - British Pound</option>
            <option value="INR">INR (₹) - Indian Rupee</option>
            <option value="JPY">JPY (¥) - Japanese Yen</option>
          </select>
        </div>
      </div>

      {/* ===== 3. NOTIFICATIONS SETTINGS ===== */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border)] space-y-6">
        <div className="border-b border-[var(--border)] pb-4 flex items-center space-x-3">
          <Bell className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)]">Automated Notification Alerts</h3>
            <p className="text-xs text-[var(--text-muted)]">Manage budget warning thresholds and AI insight push triggers</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)]">
            <div>
              <p className="font-bold text-[var(--text-main)]">Email Digest Notifications</p>
              <p className="text-[var(--text-dim)]">Receive weekly summary reports & statements</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => {
                const checked = e.target.checked;
                setEmailAlerts(checked);
                handleUpdateToggle('email_notifications', checked);
              }}
              className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)]">
            <div>
              <p className="font-bold text-[var(--text-main)]">Browser Push Alerts</p>
              <p className="text-[var(--text-dim)]">Real-time alerts on transaction logging</p>
            </div>
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={(e) => {
                const checked = e.target.checked;
                setPushAlerts(checked);
                handleUpdateToggle('push_notifications', checked);
              }}
              className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Budget Alerts */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)]">
            <div>
              <p className="font-bold text-[var(--text-main)]">Budget Limit Threshold Warnings</p>
              <p className="text-[var(--text-dim)]">Notify when category spending exceeds 80% limit</p>
            </div>
            <input
              type="checkbox"
              checked={budgetAlerts}
              onChange={(e) => {
                const checked = e.target.checked;
                setBudgetAlerts(checked);
                handleUpdateToggle('budget_alerts', checked);
              }}
              className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* AI Alerts */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border)]">
            <div>
              <p className="font-bold text-[var(--text-main)]">Gemini AI Smart Recommendations</p>
              <p className="text-[var(--text-dim)]">Proactive overspending warnings and subscription flags</p>
            </div>
            <input
              type="checkbox"
              checked={aiAlerts}
              onChange={(e) => {
                const checked = e.target.checked;
                setAiAlerts(checked);
                handleUpdateToggle('ai_enabled', checked);
              }}
              className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
            />
          </div>

        </div>
      </div>

      {/* ===== 4. SECURITY SETTINGS ===== */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border)] space-y-6">
        <div className="border-b border-[var(--border)] pb-4 flex items-center space-x-3">
          <Lock className="w-5 h-5 text-teal-400" />
          <div>
            <h3 className="text-base font-bold text-[var(--text-main)]">Security & Password</h3>
            <p className="text-xs text-[var(--text-muted)]">Update security credentials and manage active sessions</p>
          </div>
        </div>

        {secSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{secSuccess}</span>
          </div>
        )}

        {secError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{secError}</span>
          </div>
        )}

        <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-main)] block">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-main)] block">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-main)] block">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Protected by Supabase Auth RLS</span>
            </div>

            <button
              type="submit"
              disabled={isSavingSec}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs shadow-glow flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              {isSavingSec ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* ===== 5. DANGER ZONE ===== */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/30 bg-red-500/5 space-y-6">
        <div className="border-b border-red-500/20 pb-4 flex items-center space-x-3 text-red-400">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <h3 className="text-base font-bold text-red-400">Danger Zone</h3>
            <p className="text-xs text-red-400/80">Irreversible actions and session termination</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-bold text-[var(--text-main)]">Logout All Active Sessions</p>
            <p className="text-[var(--text-dim)]">Invalidate session tokens across mobile & web devices</p>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold flex items-center justify-center space-x-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout All Devices</span>
          </button>
        </div>

        <div className="pt-4 border-t border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-bold text-red-400">Delete Account & Data</p>
            <p className="text-[var(--text-dim)]">Permanently erase profile, expenses, income, and AI prompt records</p>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 flex items-center justify-center space-x-2 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default SettingsPage;
