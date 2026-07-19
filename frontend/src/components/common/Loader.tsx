import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoaderProps {
  label?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  label = 'Loading Expense Tracker AI...',
  fullScreen = true,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-glow">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <Loader2 className="w-14 h-14 text-emerald-400 animate-spin absolute -top-1 -left-1" />
      </div>
      <p className="text-xs font-semibold text-[var(--text-muted)] tracking-wide">{label}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-6">
        {content}
      </div>
    );
  }

  return <div className="py-12 flex items-center justify-center">{content}</div>;
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-[var(--border)] animate-pulse space-y-4">
      <div className="h-4 bg-[var(--surface-hover)] rounded-full w-1/3" />
      <div className="h-8 bg-[var(--surface-hover)] rounded-full w-2/3" />
      <div className="h-3 bg-[var(--surface-hover)] rounded-full w-1/2" />
    </div>
  );
};
