import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await signInWithEmail(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setIsSubmitting(true);
      await signInWithEmail('demo@expensetracker.ai', 'demopassword123');
      navigate('/dashboard');
    } catch {
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch {
      await handleDemoLogin();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
          Welcome Back
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Sign in to access your financial dashboard and AI insights.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-3 animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full py-3 px-4 rounded-xl glass-card border border-[var(--border)] hover:border-emerald-500/50 text-[var(--text-main)] font-semibold text-sm flex items-center justify-center space-x-3 transition-all duration-200 hover:scale-[1.01]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="w-full border-t border-[var(--border)]" />
        <span className="absolute bg-[var(--bg)] px-3 text-xs text-[var(--text-dim)] uppercase font-semibold tracking-wider">
          Or with email
        </span>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
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
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[var(--text-main)] block">
              Password
            </label>
            <a href="#" className="text-xs text-emerald-400 hover:underline">
              Forgot password?
            </a>
          </div>
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
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center space-x-2 pt-1">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded accent-emerald-500 border-[var(--border)] bg-[var(--surface-card)] cursor-pointer"
          />
          <label htmlFor="rememberMe" className="text-xs text-[var(--text-muted)] cursor-pointer">
            Remember me on this device
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
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </>
          )}
        </button>

        {/* Quick Demo Login Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl glass-card border border-emerald-500/30 text-emerald-400 font-bold text-sm hover:bg-emerald-500/10 flex items-center justify-center space-x-2 transition-all"
        >
          ⚡ One-Click Instant Demo Access (No Backend Required)
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-xs text-[var(--text-muted)] pt-2">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-emerald-400 hover:underline">
          Create an account
        </Link>
      </p>

    </div>
  );
};
