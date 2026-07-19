import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, AlertCircle, CheckCircle2, Loader2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { signUpWithEmail } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password Strength Calculator (0 to 4)
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-amber-500', 'bg-teal-500', 'bg-emerald-500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the Terms of Service to create an account.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await signUpWithEmail(email, password, fullName);
      if (res?.user && !res.session) {
        setSuccessMsg('Registration successful! Please check your email to verify your account.');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
          Create Your Account
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Start tracking expenses and automating budget goals with AI.
        </p>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-main)] block">
            Full Name
          </label>
          <div className="relative">
            <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)] placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-main)] block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)] placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-main)] block">
            Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)] placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required
            />
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="pt-2 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-muted)]">Password strength:</span>
                <span className="font-semibold text-[var(--text-main)]">
                  {strengthLabels[strength - 1] || 'Very Weak'}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full rounded-full transition-all ${
                      step <= strength ? strengthColors[strength - 1] : 'bg-[var(--border)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-main)] block">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border)] text-[var(--text-main)] placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required
            />
          </div>

          {/* Real-time Match Warning */}
          {confirmPassword && password !== confirmPassword && (
            <p className="text-[11px] text-red-400 flex items-center space-x-1 pt-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Passwords do not match</span>
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2 pt-1">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded accent-emerald-500 border-[var(--border)] bg-[var(--surface-card)] cursor-pointer"
          />
          <label htmlFor="agreeTerms" className="text-xs text-[var(--text-muted)] leading-tight cursor-pointer">
            I agree to the <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-sm shadow-glow flex items-center justify-center space-x-2 transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Register Account</span>
            </>
          )}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-xs text-[var(--text-muted)] pt-2">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-emerald-400 hover:underline">
          Sign in
        </Link>
      </p>

    </div>
  );
};
