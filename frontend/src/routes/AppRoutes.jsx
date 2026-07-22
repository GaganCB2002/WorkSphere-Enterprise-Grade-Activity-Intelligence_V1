import React, { Suspense } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';

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

const EmployeeDirectoryPage = React.lazy(() => import('../pages/Employees/EmployeeDirectoryPage').then(m => ({ default: m.default })));
const RbacPage = React.lazy(() => import('../pages/Employees/RbacPage').then(m => ({ default: m.default })));
const UserManagementPage = React.lazy(() => import('../pages/Employees/UserManagementPage').then(m => ({ default: m.default })));
const AiConfigPage = React.lazy(() => import('../pages/Employees/AiConfigPage').then(m => ({ default: m.default })));
const AuditLogsPage = React.lazy(() => import('../pages/Employees/AuditLogsPage').then(m => ({ default: m.default })));
const GlobalTrackingPage = React.lazy(() => import('../pages/Employees/GlobalTrackingPage').then(m => ({ default: m.default })));
const ActivityReportsPage = React.lazy(() => import('../pages/Employees/ActivityReportsPage').then(m => ({ default: m.default })));
const EmployeeProfilePage = React.lazy(() => import('../pages/Employees/EmployeeProfile').then(m => ({ default: m.default })));
const ModuleStub = React.lazy(() => import('../pages/ModuleStub').then(m => ({ default: m.default })));
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

import { LandingPage } from '../pages/LandingPage';
import { ProductPage } from '../pages/Product/ProductPage';
import { FeaturesPage } from '../pages/Features/FeaturesPage';
import { SolutionsPage } from '../pages/Solutions/SolutionsPage';
import { ResourcesPage } from '../pages/Resources/ResourcesPage';
import { PrivacyPage } from '../pages/Legal/PrivacyPage';
import { TermsPage } from '../pages/Legal/TermsPage';
import { SecurityPage } from '../pages/Legal/SecurityPage';

import { motion } from 'framer-motion';

function PageLoading() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate" className="space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <motion.div key={i} variants={itemVariants} className="h-28 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl overflow-hidden relative">
             <motion.div 
               animate={{ x: ['-100%', '200%'] }} 
               transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent w-1/2"
             />
          </motion.div>
        ))}
      </div>
      <motion.div variants={itemVariants} className="h-80 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl overflow-hidden relative">
         <motion.div 
           animate={{ x: ['-100%', '200%'] }} 
           transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent w-1/2"
         />
      </motion.div>
    </motion.div>
  )
}

function PageLoadingFull() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-950"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" 
        />
        <motion.span 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-sm font-medium text-slate-500"
        >
          Loading workspace...
        </motion.span>
      </div>
    </motion.div>
  )
}

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/product" element={<PageTransition><ProductPage /></PageTransition>} />
        <Route path="/features" element={<PageTransition><FeaturesPage /></PageTransition>} />
        <Route path="/features/*" element={<PageTransition><FeaturesPage /></PageTransition>} />
        <Route path="/solutions" element={<PageTransition><SolutionsPage /></PageTransition>} />
        <Route path="/solutions/*" element={<PageTransition><SolutionsPage /></PageTransition>} />
        <Route path="/resources" element={<PageTransition><ResourcesPage /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
        <Route path="/security" element={<PageTransition><SecurityPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
        <Route path="/mfa" element={<PageTransition><MFA /></PageTransition>} />
        <Route path="/session-timeout" element={<PageTransition><SessionTimeout /></PageTransition>} />
        
        {/* Global Sidebar Routes */}
        <Route path="/employees" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="directory" element={<EmployeeDirectoryPage />} />
          <Route path="profile" element={<EmployeeProfilePage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="rbac" element={<RbacPage />} />
          <Route path="tracking" element={<GlobalTrackingPage />} />
          <Route path="reports" element={<ActivityReportsPage />} />
          <Route path="audit" element={<AuditLogsPage />} />
          <Route path="ai-config" element={<AiConfigPage />} />
        </Route>

        <Route path="/attendance" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="live" element={<ModuleStub title="Live Attendance" description="Real-time check-in and check-out tracking." />} />
          <Route path="shifts" element={<ModuleStub title="Shifts" description="Shift scheduling and rotations." />} />
          <Route path="leave" element={<ModuleStub title="Leave Management" description="Time-off requests and balances." />} />
        </Route>

        <Route path="/recruitment" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="candidates" element={<ModuleStub title="Candidates" description="ATS applicant tracking." />} />
          <Route path="interviews" element={<ModuleStub title="Interviews" description="Scheduling and feedback." />} />
          <Route path="jobs" element={<ModuleStub title="Job Openings" description="Active job requisitions." />} />
        </Route>

        <Route path="/payroll" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="salary" element={<ModuleStub title="Salary" description="Compensation structure and processing." />} />
          <Route path="payslips" element={<ModuleStub title="Payslips" description="Historical payslips and tax forms." />} />
          <Route path="tax" element={<ModuleStub title="Tax" description="Statutory compliance and tax deductions." />} />
        </Route>

        <Route path="/projects" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="list" element={<ModuleStub title="Projects" description="Active initiatives and portfolios." />} />
          <Route path="tasks" element={<ModuleStub title="Tasks" description="Individual assignment tracking." />} />
          <Route path="sprint-board" element={<ModuleStub title="Sprint Board" description="Agile task visualization." />} />
        </Route>

        <Route path="/assets" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="inventory" element={<ModuleStub title="Inventory" description="Physical asset tracking." />} />
          <Route path="devices" element={<ModuleStub title="Devices" description="Laptop and mobile allocations." />} />
          <Route path="licenses" element={<ModuleStub title="Licenses" description="Software and SaaS subscriptions." />} />
        </Route>

        <Route path="/compliance" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="policies" element={<ModuleStub title="Policies" description="Corporate governance documents." />} />
          <Route path="documents" element={<ModuleStub title="Documents" description="Secure vault for employee records." />} />
          <Route path="audit" element={<ModuleStub title="Audit Center" description="Compliance checking and validation." />} />
        </Route>

        <Route path="/performance" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="reviews" element={<ModuleStub title="Reviews" description="Performance evaluation cycles." />} />
          <Route path="kpis" element={<ModuleStub title="KPIs" description="Key performance indicators." />} />
          <Route path="analytics" element={<ModuleStub title="Analytics" description="Workforce productivity metrics." />} />
        </Route>

        <Route path="/admin" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="settings" element={<ModuleStub title="Company Settings" description="Global organization preferences." />} />
          <Route path="roles" element={<ModuleStub title="Roles" description="Role definitions." />} />
          <Route path="permissions" element={<ModuleStub title="Permissions" description="Fine-grained access control." />} />
          <Route path="security" element={<ModuleStub title="Security" description="Security policies and enforcement." />} />
          <Route path="ai-config" element={<ModuleStub title="AI Configuration" description="AI copilot settings." />} />
          <Route path="system-logs" element={<ModuleStub title="System Logs" description="Infrastructure and application logs." />} />
        </Route>

        {/* Full Screen Command Center */}
        <Route path="/command-center" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoadingFull />}>
              <PageTransition>
                <SystemCommandCenter />
              </PageTransition>
            </Suspense>
          </ProtectedRoute>
        } />
        
        {/* Protected Main Layout Route */}
        <Route path="/*" element={
          <ProtectedRoute>
            <EnterpriseShell>
              <Suspense fallback={<PageLoading />}>
                <PageTransition>
                  <DashboardRouter />
                </PageTransition>
              </Suspense>
            </EnterpriseShell>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
