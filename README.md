# 🚀 Expense Tracker AI - Intelligent Financial Management App

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Pro-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

A full-stack, enterprise-grade financial management web application built with **React 18**, **TypeScript**, **Tailwind CSS**, **Recharts**, **Supabase Cloud Database**, and **Google Gemini 1.5 Pro AI**.

---

## 🌐 Live Application Demo

👉 **[https://expense-tracker-wh4b.vercel.app/](https://expense-tracker-wh4b.vercel.app/)**

- **Direct Login**: [https://expense-tracker-wh4b.vercel.app/#/login](https://expense-tracker-wh4b.vercel.app/#/login)
- **Direct Register**: [https://expense-tracker-wh4b.vercel.app/#/register](https://expense-tracker-wh4b.vercel.app/#/register)
- **GitHub Repository**: [https://github.com/RishanthDeveloper/expense-tracker](https://github.com/RishanthDeveloper/expense-tracker)

---

## ✨ Key Features

- **🇮🇳 Indian Rupee (₹ INR) Formatting**: All figures across KPI cards, graphs, tables, CSV exports, and printable PDF statements are natively formatted in Indian Rupees using the `en-IN` numbering system.
- **📊 Real-time Dashboard Analytics**: Interactive Recharts Area, Donut, Bar, and Line charts mapping monthly income velocity vs expense trends and net savings.
- **🤖 Gemini 1.5 Pro AI Financial Advisor**: Server-side proxy via Supabase Deno Edge Functions generating personalized spending analyses, budget warnings, and interactive AI chat.
- **🔒 Enterprise Security & Isolation**: Multi-tenant database protected by PostgreSQL Row Level Security (RLS) policies enforcing complete isolation across 8 core tables (`profiles`, `categories`, `income`, `expenses`, `budgets`, `notifications`, `settings`, `ai_history`).
- **🎯 Category Budget Tracking**: Real-time progress bars with conditional status indicators (`Good`, `Warning`, `Exceeded`).
- **📄 Export Utilities**: Downloadable CSV data exports and printable PDF financial statements.
- **🎨 Glassmorphic UI**: Dynamic dark and light theme toggle with modern glassmorphic panels and micro-animations.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, React Router DOM (`HashRouter`), Tailwind CSS
- **State & Data Fetching**: React Query (`@tanstack/react-query`), Zustand
- **Backend & Database**: Supabase PostgreSQL + Row Level Security (RLS)
- **Serverless AI**: Supabase Deno Edge Functions + Google Gemini 1.5 Pro API
- **Charts & Icons**: Recharts + Lucide Icons
- **Deployment**: Vercel + GitHub Actions

---

## 🏗️ Database Schema

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

## 🚀 Local Setup & Installation

### Prerequisites

- **Node.js**: `>=20.11.0`
- **npm**: `>=10.2.0`

### Step-by-Step Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RishanthDeveloper/expense-tracker.git
   cd expense-tracker/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside `frontend/`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:5173](http://localhost:5173)** in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📜 License

MIT © [RishanthDeveloper](https://github.com/RishanthDeveloper) & Expense Tracker AI Team
