import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import MFA from '../auth/MFA';
import SessionTimeout from '../auth/SessionTimeout';
import ProtectedRoute from './ProtectedRoute';
import EnterpriseShell from '../components/layout/EnterpriseShell/EnterpriseShell';
import DashboardOverview from '../pages/Dashboard/DashboardOverview';

const SystemCommandCenter = React.lazy(() => import('../modules/command_center/SystemCommandCenter').then(m => ({ default: m.SystemCommandCenter })));

const SuperAdminDashboard = React.lazy(() => import('../modules/super_admin/SuperAdminDashboard').then(m => ({ default: m.SuperAdminDashboard })));
const AdminDashboard = React.lazy(() => import('../modules/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const CeoDashboard = React.lazy(() => import('../modules/ceo/CeoDashboard').then(m => ({ default: m.CeoDashboard })));
const CtoModule = React.lazy(() => import('../modules/cto/CtoModule').then(m => ({ default: m.CtoModule })));
const HrManagerModule = React.lazy(() => import('../modules/hr_manager/HrManagerModule').then(m => ({ default: m.HrManagerModule })));
const HrExecutiveDashboard = React.lazy(() => import('../modules/hr_executive/HrExecutiveDashboard').then(m => ({ default: m.HrExecutiveDashboard })));
const FinanceManagerDashboard = React.lazy(() => import('../modules/finance_manager/FinanceManagerDashboard').then(m => ({ default: m.FinanceManagerDashboard })));
const MarketingManagerModule = React.lazy(() => import('../modules/marketing_manager/MarketingManagerModule').then(m => ({ default: m.MarketingManagerModule })));
const SalesManagerDashboard = React.lazy(() => import('../modules/sales_manager/SalesManagerDashboard').then(m => ({ default: m.SalesManagerDashboard })));
const ProjectManagerDashboard = React.lazy(() => import('../modules/project_manager/ProjectManagerDashboard').then(m => ({ default: m.ProjectManagerDashboard })));
const TechLeadModule = React.lazy(() => import('../modules/tech_lead/TechLeadModule').then(m => ({ default: m.TechLeadModule })));
const DevOpsEngineerDashboard = React.lazy(() => import('../modules/devops_engineer/DevOpsEngineerDashboard').then(m => ({ default: m.DevOpsEngineerDashboard })));
const QaEngineerModule = React.lazy(() => import('../modules/qa_engineer/QaEngineerModule').then(m => ({ default: m.QaEngineerModule })));
const SoftwareEngineerDashboard = React.lazy(() => import('../modules/software_engineer/SoftwareEngineerDashboard').then(m => ({ default: m.SoftwareEngineerDashboard })));
const SecurityAnalystDashboard = React.lazy(() => import('../modules/security_analyst/SecurityAnalystDashboard').then(m => ({ default: m.SecurityAnalystDashboard })));
const SupportAgentDashboard = React.lazy(() => import('../modules/support_agent/SupportAgentDashboard').then(m => ({ default: m.SupportAgentDashboard })));
const EmployeeDashboard = React.lazy(() => import('../modules/employee/EmployeeModule').then(m => ({ default: m.EmployeeModule })));
const InternModule = React.lazy(() => import('../modules/intern/InternModule').then(m => ({ default: m.InternModule })));

const DashboardRouter = () => {
  const location = useLocation();
  const user = useSelector(state => state.auth.user) || { id: 'usr-1', name: 'User', role: 'SUPER_ADMIN', department: 'Global Security' };
  const token = useSelector(state => state.auth.token) || 'mock-token';

  if (location.pathname === '/' || location.pathname === '/dashboard') {
    return <DashboardOverview />;
  }

  switch (user.role) {
    case 'SUPERADMIN':
    case 'SUPER_ADMIN': return <SuperAdminDashboard />;
    case 'ADMIN': return <AdminDashboard />;
    case 'CEO': return <CeoDashboard />;
    case 'CTO': return <CtoModule user={user} />;
    case 'HR_MANAGER': return <HrManagerModule user={user} />;
    case 'HR_EXECUTIVE': return <HrExecutiveDashboard />;
    case 'FINANCE_MANAGER': return <FinanceManagerDashboard />;
    case 'MARKETING_MANAGER': return <MarketingManagerModule user={user} />;
    case 'SALES_MANAGER': return <SalesManagerDashboard />;
    case 'PROJECT_MANAGER': return <ProjectManagerDashboard />;
    case 'TECH_LEAD': return <TechLeadModule user={user} />;
    case 'DEVOPS_ENGINEER': return <DevOpsEngineerDashboard />;
    case 'QA_ENGINEER': return <QaEngineerModule user={user} />;
    case 'SOFTWARE_ENGINEER': return <SoftwareEngineerDashboard />;
    case 'SECURITY_ANALYST': return <SecurityAnalystDashboard />;
    case 'SUPPORT_AGENT': return <SupportAgentDashboard />;
    case 'EMPLOYEE': return <EmployeeDashboard user={user} platform={{ id: 'platform-1', name: 'Core Platform' }} token={token} />;
    case 'INTERN': return <InternModule user={user} />;
    default: return <SuperAdminDashboard />;
  }
};

import { GlobalEnterpriseCopilot } from '../components/ai/GlobalEnterpriseCopilot';
import { LandingPage } from '../pages/LandingPage';
import { ProductPage } from '../pages/Product/ProductPage';
import { FeaturesPage } from '../pages/Features/FeaturesPage';
import { SolutionsPage } from '../pages/Solutions/SolutionsPage';
import { ResourcesPage } from '../pages/Resources/ResourcesPage';
import { PrivacyPage } from '../pages/Legal/PrivacyPage';
import { TermsPage } from '../pages/Legal/TermsPage';
import { SecurityPage } from '../pages/Legal/SecurityPage';

function PageLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-24 skeleton rounded-lg" />)}
      </div>
      <div className="h-64 skeleton rounded-lg" />
    </div>
  )
}

function PageLoadingFull() {
  return (
    <div className="flex items-center justify-center h-screen bg-surface">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[var(--color-brand-500)] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-secondary">Loading...</span>
      </div>
    </div>
  )
}

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/features/*" element={<FeaturesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/*" element={<SolutionsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/mfa" element={<MFA />} />
        <Route path="/session-timeout" element={<SessionTimeout />} />
        
        {/* Full Screen Command Center */}
        <Route path="/command-center" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoadingFull />}>
              <SystemCommandCenter />
            </Suspense>
          </ProtectedRoute>
        } />
        
        {/* Protected Main Layout Route */}
        <Route path="/*" element={
          <ProtectedRoute>
            <EnterpriseShell>
              <Suspense fallback={<PageLoading />}>
                <DashboardRouter />
              </Suspense>
            </EnterpriseShell>
          </ProtectedRoute>
        } />
      </Routes>
      <GlobalEnterpriseCopilot />
    </>
  );
};

export default AppRoutes;
