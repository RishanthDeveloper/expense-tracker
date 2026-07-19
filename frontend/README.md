# Expense Tracker AI 🚀

A production-ready, full-stack financial intelligence application built with **React 18**, **TypeScript**, **Tailwind CSS**, **Recharts**, **Supabase**, and **Google Gemini 1.5 Pro**.

---

## 🌟 Key Features

- **📊 Comprehensive Financial Analytics**: Interactive Recharts Area, Donut, Bar, and Line charts mapping monthly income vs expense velocity and net savings growth.
- **🤖 Gemini AI Insights Hub**: Automated transaction audits, overspending threshold warnings, personalized saving tips, and interactive AI financial chat.
- **💼 Multi-Tenant Security & Isolation**: Supabase Row Level Security (RLS) policies enforcing complete data isolation across 8 PostgreSQL tables (`profiles`, `categories`, `income`, `expenses`, `budgets`, `notifications`, `settings`, `ai_history`).
- **🎯 Category Budget Management**: Real-time progress bars tracking budget limits, spent amounts, remaining pools, and Good/Warning/Exceeded risk status tags.
- **📄 Statements & Export Utilities**: Downloadable CSV data exports and printable PDF financial statements.
- **🎨 Glassmorphic Design**: Modern dark/light mode toggle with Tailwind CSS ambient glows, rounded corners, and micro-animations.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + CSS Custom Properties (Dark & Light Glassmorphism)
- **Data & State Management**: React Query (`@tanstack/react-query`) + Zustand
- **Backend & Database**: Supabase PostgreSQL + Row Level Security (RLS)
- **Edge AI**: Supabase Deno Edge Functions + Google Gemini 1.5 Pro API
- **Charts & Icons**: Recharts + Lucide Icons

---

## 🏗️ Architecture & Database Schema

```
auth.users (Supabase Auth)
  └── profiles (id, full_name, avatar_url, currency, timezone)
      ├── income (id, amount, description, transaction_date)
      ├── expenses (id, amount, description, payment_method, transaction_date)
      ├── budgets (id, category_id, month, year, amount)
      ├── categories (id, name, type, icon, color)
      ├── ai_history (id, prompt, response, tokens_used)
      └── settings (user_id, theme, email_notifications, push_notifications, budget_alerts, ai_enabled)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>=20.11.0`
- **npm**: `>=10.2.0`

### Installation

1. **Clone repository & install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Run local development server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📜 License

MIT © Expense Tracker AI Team
