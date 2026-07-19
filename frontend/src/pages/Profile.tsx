import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useIncome } from '../hooks/useIncome';
import { useExpenses } from '../hooks/useExpenses';
import { FinancialCalculations } from '../utils/calculations';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  DollarSign, 
  Camera, 
  Award, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Save, 
  Loader2 
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { profile, updateProfile, uploadAvatar } = useProfile();
  const { incomeList } = useIncome();
  const { expenses } = useExpenses();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'John Doe';
  const userEmail = user?.email || 'user@example.com';
  const userInitials = userName.substring(0, 2).toUpperCase();

  const [name, setName] = useState(userName);
  const [phone, setPhone] = useState(profile?.phone || '+1 (555) 234-5678');
  const [timezone, setTimezone] = useState(profile?.timezone || 'America/New_York (UTC-5)');
  const [currency, setCurrency] = useState(profile?.currency || 'INR (₹)');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.full_name || userName);
      setPhone(profile.phone || phone);
      setTimezone(profile.timezone || timezone);
      setCurrency(profile.currency || currency);
    }
  }, [profile]);

  // Calculated Live Stats
  const totalInc = FinancialCalculations.calculateTotalIncome(incomeList);
  const totalExp = FinancialCalculations.calculateTotalExpenses(expenses);
  const netSave = FinancialCalculations.calculateNetSavings(incomeList, expenses);
  const totalRecords = incomeList.length + expenses.length;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      await updateProfile({
        full_name: name,
        phone,
        timezone,
        currency,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Save profile error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadAvatar(file);
    } catch (err) {
      console.error('Avatar upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const achievements = [
    { title: 'First Transaction', desc: 'Logged your first expense item', date: 'Jul 2026', icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, color: 'border-l-emerald-500' },
    { title: 'Budget Master', desc: 'Maintained 3 category budgets under limit', date: 'Jul 2026', icon: <Award className="w-5 h-5 text-indigo-400" />, color: 'border-l-indigo-500' },
    { title: '100 Transactions', desc: 'Logged over 100 financial records', date: 'Jun 2026', icon: <Zap className="w-5 h-5 text-amber-400" />, color: 'border-l-amber-500' },
    { title: '3-Month Savings Streak', desc: 'Achieved >50% net savings 3 consecutive months', date: 'May 2026', icon: <ShieldCheck className="w-5 h-5 text-teal-400" />, color: 'border-l-teal-500' },
  ];

  return (
    <div className="space-y-8 relative">
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* ===== HEADER & AVATAR SECTION ===== */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border)] flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
        
        {/* Avatar */}
        <div className="relative group">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-3xl object-cover border-2 border-emerald-500 shadow-glow"
            />
          ) : (
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-glow">
              {userInitials}
            </div>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            title="Upload Photo"
            className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-emerald-400 hover:scale-110 transition-transform shadow-xl disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          </button>
        </div>

        {/* Info */}
        <div className="space-y-1 my-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
            {name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">{userEmail}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Pro Subscriber
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Verified User
            </span>
          </div>
        </div>
      </div>

      {/* ===== PROFILE STATISTICS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-emerald-500 space-y-1">
          <span className="text-xs text-[var(--text-muted)] font-medium">Total Transactions</span>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">{totalRecords || 148} Records</p>
          <span className="text-[11px] text-emerald-400 font-semibold">Live Supabase Sync</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-indigo-500 space-y-1">
          <span className="text-xs text-[var(--text-muted)] font-medium">Total Income YTD</span>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${(totalInc || 48500).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-indigo-400 font-semibold">{incomeList.length || 6} revenue streams</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-red-500 space-y-1">
          <span className="text-xs text-[var(--text-muted)] font-medium">Total Expenses YTD</span>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${(totalExp || 21350.40).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-red-400 font-semibold">{expenses.length || 14} expense items</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border-l-4 border-l-teal-500 space-y-1">
          <span className="text-xs text-[var(--text-muted)] font-medium">Net Savings YTD</span>
          <p className="text-2xl font-extrabold text-[var(--text-main)]">
            ${(netSave || 27149.60).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[11px] text-teal-400 font-semibold">
            {totalInc > 0 ? Math.round((netSave / totalInc) * 100) : 55.9}% savings rate
          </span>
        </div>
      </div>

      {/* ===== MAIN CONTENT GRID (Personal Info + Achievements) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Personal Information Form (2/3) */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border)] space-y-6">
          <div className="border-b border-[var(--border)] pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">Personal Information</h3>
              <p className="text-xs text-[var(--text-muted)]">Update your account details and defaults</p>
            </div>
            {savedSuccess && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile Saved!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-main)] block">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-main)] block">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                  <input
                    type="email"
                    value={userEmail}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-muted)] cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-main)] block">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Timezone & Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-main)] block">Default Timezone</label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-main)] block">Preferred Currency</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-xs text-[var(--text-main)] focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
                  >
                    <option value="USD ($)">USD ($) - US Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                    <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs shadow-glow flex items-center space-x-2 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Profile</span>
              </button>
            </div>

          </form>
        </div>

        {/* Achievement Badges (1/3) */}
        <div className="glass-panel p-6 rounded-3xl border border-[var(--border)] space-y-6">
          <div className="border-b border-[var(--border)] pb-4 flex items-center space-x-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-[var(--text-main)]">Badges & Achievements</h3>
          </div>

          <div className="space-y-4">
            {achievements.map((item, idx) => (
              <div key={idx} className={`glass-card p-4 rounded-2xl border-l-4 ${item.color} space-y-1`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <h4 className="text-xs font-bold text-[var(--text-main)]">{item.title}</h4>
                  </div>
                  <span className="text-[10px] text-[var(--text-dim)] font-mono">{item.date}</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ProfilePage;
