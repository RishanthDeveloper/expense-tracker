import React from 'react';
import { 
  BrainCircuit, 
  ShieldCheck, 
  PieChart, 
  BellRing, 
  Zap, 
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, badge }) => (
  <div className="group relative glass-card p-8 rounded-3xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300">
    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all" />
    
    <div className="flex items-center justify-between mb-6">
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-glow">
        {icon}
      </div>
      {badge && (
        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
          {badge}
        </span>
      )}
    </div>

    <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 flex items-center justify-between group-hover:text-emerald-400 transition-colors">
      <span>{title}</span>
      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
    </h3>

    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
      {description}
    </p>
  </div>
);

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: <BrainCircuit className="w-7 h-7" />,
      title: "Gemini AI Financial Insights",
      description: "Get personalized spending audits, budget suggestions, and smart anomaly alerts powered by Google Gemini AI.",
      badge: "AI Powered"
    },
    {
      icon: <PieChart className="w-7 h-7" />,
      title: "Real-time Expense Analytics",
      description: "Interactive breakdown charts with custom categorizations and spending velocity indicators for effortless tracking.",
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Multi-Tenant RLS Security",
      description: "Strict Supabase PostgreSQL Row Level Security policies ensure your financial records remain strictly private and isolated.",
      badge: "Enterprise Grade"
    },
    {
      icon: <Layers className="w-7 h-7" />,
      title: "Smart Budget Tracking",
      description: "Set monthly or yearly category thresholds with automatic percentage progress indicators and forecast alerts.",
    },
    {
      icon: <BellRing className="w-7 h-7" />,
      title: "Automated Push Alerts",
      description: "Instant warnings when approaching category budget limits or detecting unusual recurring subscription charges.",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Instant Auth & Triggers",
      description: "Seamless user onboarding with automated profile and settings provisioning powered by Supabase Auth database triggers.",
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Engineered for Precision
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-[var(--text-main)] tracking-tight">
            Everything You Need to Master Your Finances
          </p>
          <p className="text-base sm:text-lg text-[var(--text-muted)]">
            A production-ready platform built with modern architecture and extreme attention to performance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>

      </div>
    </section>
  );
};
