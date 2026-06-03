import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Shield, LogOut, User, Building, Award } from 'lucide-react';

import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import MFA from '../auth/MFA';
import SessionTimeout from '../auth/SessionTimeout';
import ProtectedRoute from './ProtectedRoute';

const SystemCommandCenter = React.lazy(() => import('../modules/command_center/SystemCommandCenter'));

// 18 Role Dashboard Lazy Imports
const SuperAdminDashboard = React.lazy(() => import('../modules/super_admin/SuperAdminDashboard').then(m => ({ default: m.SuperAdminDashboard })));
const AdminDashboard = React.lazy(() => import('../modules/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const CeoDashboard = React.lazy(() => import('../modules/ceo/CeoDashboard').then(m => ({ default: m.CeoDashboard })));
const CtoDashboard = React.lazy(() => import('../modules/cto/CtoDashboard').then(m => ({ default: m.CtoDashboard })));
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

const MainLayout = () => {
  const user = useSelector(state => state.auth.user) || { id: 'usr-1', name: 'Gagan CB', role: 'SUPER_ADMIN', department: 'Global Security' };
  const token = useSelector(state => state.auth.token) || 'mock-token';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const renderRoleDashboard = () => {
    switch (user.role) {
      case 'SUPER_ADMIN': return <SuperAdminDashboard />;
      case 'ADMIN': return <AdminDashboard />;
      case 'CEO': return <CeoDashboard />;
      case 'CTO': return <CtoDashboard />;
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

  const isFullScreenRole = ['EMPLOYEE', 'SOFTWARE_ENGINEER', 'TECH_LEAD', 'HR_MANAGER', 'INTERN', 'FINANCE_MANAGER', 'MARKETING_MANAGER', 'QA_ENGINEER', 'DEVOPS_ENGINEER', 'SECURITY_ANALYST', 'ADMIN', 'SUPER_ADMIN'].includes(user.role);

  if (isFullScreenRole) {
    return (
      <React.Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-slate-950">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        {renderRoleDashboard()}
        
        {/* Floating Logout Button to prevent trapped state in Full Screen roles */}
        <button 
          onClick={handleLogout}
          className="fixed bottom-6 left-6 z-[9999] p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full border border-red-500/20 backdrop-blur-md transition-all shadow-lg flex items-center justify-center group"
          title="Logout / Switch Role"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:ml-2 font-semibold">
            Logout
          </span>
        </button>
      </React.Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4 shadow-lg flex items-center justify-between transition-all">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25 text-white flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                WorkSphere Enterprise
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                Command Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <Building className="w-3.5 h-3.5 text-slate-500" /> Dept: <span className="text-slate-300 font-semibold">{user.department || 'Enterprise Hub'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Active User Badge */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-950/60 border border-slate-800/80 rounded-2xl shadow-inner">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-blue-400 shadow">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                {user.name} <Award className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">{user.role.replace('_', ' ')}</div>
            </div>
          </div>

          {/* Switch Role / Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs tracking-wide shadow-lg hover:shadow-slate-900/50 transition-all duration-300 active:scale-95"
          >
            <LogOut className="w-4 h-4 text-rose-400" /> Switch Role / Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
        <React.Suspense fallback={
          <div className="flex items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          {renderRoleDashboard()}
        </React.Suspense>
      </main>
    </div>
  );
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
            <React.Suspense fallback={<div className="flex items-center justify-center h-screen bg-slate-950"><div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
              <SystemCommandCenter />
            </React.Suspense>
          </ProtectedRoute>
        } />
        
        {/* Protected Main Layout Route */}
        <Route path="/*" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } />
      </Routes>
      <GlobalEnterpriseCopilot />
    </>
  );
};

export default AppRoutes;
