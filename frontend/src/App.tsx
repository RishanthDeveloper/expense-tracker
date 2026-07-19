import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Loader } from './components/common/Loader';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PublicRoute } from './router/PublicRoute';
import { ProtectedRoute } from './router/ProtectedRoute';

// Lazy loaded page components with named export resolution for optimal chunking
const LandingPage = lazy(() => import('./pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then((m) => ({ default: m.Register })));
const DashboardPage = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.DashboardPage })));
const IncomePage = lazy(() => import('./pages/Income').then((m) => ({ default: m.IncomePage })));
const ExpensePage = lazy(() => import('./pages/Expenses').then((m) => ({ default: m.ExpensePage })));
const BudgetsPage = lazy(() => import('./pages/Budgets').then((m) => ({ default: m.BudgetsPage })));
const ReportsPage = lazy(() => import('./pages/Reports').then((m) => ({ default: m.ReportsPage })));
const AIInsightsPage = lazy(() => import('./pages/AIInsights').then((m) => ({ default: m.AIInsightsPage })));
const ProfilePage = lazy(() => import('./pages/Profile').then((m) => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('./pages/Settings').then((m) => ({ default: m.SettingsPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<Loader fullScreen label="Loading Expense Tracker AI..." />}>
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Public Auth Routes */}
              <Route element={<PublicRoute />}>
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
              </Route>

              {/* Protected Dashboard Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/dashboard/income" element={<IncomePage />} />
                  <Route path="/dashboard/expenses" element={<ExpensePage />} />
                  <Route path="/dashboard/budgets" element={<BudgetsPage />} />
                  <Route path="/dashboard/reports" element={<ReportsPage />} />
                  <Route path="/dashboard/analytics" element={<ReportsPage />} />
                  <Route path="/dashboard/ai-insights" element={<AIInsightsPage />} />
                  <Route path="/dashboard/profile" element={<ProfilePage />} />
                  <Route path="/dashboard/settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
