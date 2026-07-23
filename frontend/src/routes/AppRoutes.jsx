import React, { Suspense } from 'react';
import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { motion } from 'framer-motion';

import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import MFA from '../auth/MFA';
import SessionTimeout from '../auth/SessionTimeout';
import ProtectedRoute from './ProtectedRoute';
import EnterpriseShell from '../components/layout/EnterpriseShell/EnterpriseShell';
import { LandingPage } from '../pages/LandingPage';
import { ProductPage } from '../pages/Product/ProductPage';
import { FeaturesPage } from '../pages/Features/FeaturesPage';
import { SolutionsPage } from '../pages/Solutions/SolutionsPage';
import { ResourcesPage } from '../pages/Resources/ResourcesPage';
import { PrivacyPage } from '../pages/Legal/PrivacyPage';
import { TermsPage } from '../pages/Legal/TermsPage';
import { SecurityPage } from '../pages/Legal/SecurityPage';

import {
  AdminDashboard, CeoDashboard, CtoDashboard, HrManagerDashboard,
  HrExecutiveDashboard, FinanceManagerDashboard, MarketingManagerDashboard,
  SalesManagerDashboard, ProjectManagerDashboard, TechLeadDashboard,
  DevOpsDashboard, QaDashboard, SoftwareEngineerDashboard,
  SecurityAnalystDashboard, SupportDashboard, EmployeeDashboard,
  InternDashboard, ManagerDashboard
} from '../roles';

const SystemCommandCenter = React.lazy(() => import('../modules/command_center/SystemCommandCenter').then(m => ({ default: m.SystemCommandCenter })));
const SuperAdminDashboard = React.lazy(() => import('../modules/super_admin/SuperAdminDashboard').then(m => ({ default: m.SuperAdminDashboard })));
const CtoRouter = React.lazy(() => import('../modules/cto/CtoRouter'));
const InternRouter = React.lazy(() => import('../modules/intern/InternRouter'));
const TechLeadRouter = React.lazy(() => import('../modules/tech_lead/TechLeadRouter'));

const EmployeeDirectoryPage = React.lazy(() => import('../pages/Employees/EmployeeDirectoryPage').then(m => ({ default: m.default })));
const RbacPage = React.lazy(() => import('../pages/Employees/RbacPage').then(m => ({ default: m.default })));
const UserManagementPage = React.lazy(() => import('../pages/Employees/UserManagementPage').then(m => ({ default: m.default })));
const AiConfigPage = React.lazy(() => import('../pages/Employees/AiConfigPage').then(m => ({ default: m.default })));
const AuditLogsPage = React.lazy(() => import('../pages/Employees/AuditLogsPage').then(m => ({ default: m.default })));
const GlobalTrackingPage = React.lazy(() => import('../pages/Employees/GlobalTrackingPage').then(m => ({ default: m.default })));
const ActivityReportsPage = React.lazy(() => import('../pages/Employees/ActivityReportsPage').then(m => ({ default: m.default })));
const EmployeeProfilePage = React.lazy(() => import('../pages/Employees/EmployeeProfile').then(m => ({ default: m.default })));
const ModuleStub = React.lazy(() => import('../pages/ModuleStub').then(m => ({ default: m.default })));

const Dashboard = React.lazy(() => import('../modules/finance/pages/Dashboard').then(m => ({ default: m.default })));
const ChartOfAccounts = React.lazy(() => import('../modules/finance/pages/accounts/ChartOfAccounts').then(m => ({ default: m.default })));
const AccountGroups = React.lazy(() => import('../modules/finance/pages/accounts/AccountGroups').then(m => ({ default: m.default })));
const Ledgers = React.lazy(() => import('../modules/finance/pages/accounts/Ledgers').then(m => ({ default: m.default })));
const JournalEntries = React.lazy(() => import('../modules/finance/pages/accounts/JournalEntries').then(m => ({ default: m.default })));
const TrialBalance = React.lazy(() => import('../modules/finance/pages/accounts/TrialBalance').then(m => ({ default: m.default })));
const BudgetPlanning = React.lazy(() => import('../modules/finance/pages/budgeting/BudgetPlanning').then(m => ({ default: m.default })));
const DepartmentBudgets = React.lazy(() => import('../modules/finance/pages/budgeting/DepartmentBudgets').then(m => ({ default: m.default })));
const Forecasts = React.lazy(() => import('../modules/finance/pages/budgeting/Forecasts').then(m => ({ default: m.default })));
const VarianceAnalysis = React.lazy(() => import('../modules/finance/pages/budgeting/VarianceAnalysis').then(m => ({ default: m.default })));
const SalesRevenue = React.lazy(() => import('../modules/finance/pages/revenue/SalesRevenue').then(m => ({ default: m.default })));
const CustomerInvoices = React.lazy(() => import('../modules/finance/pages/revenue/CustomerInvoices').then(m => ({ default: m.default })));
const CreditNotes = React.lazy(() => import('../modules/finance/pages/revenue/CreditNotes').then(m => ({ default: m.default })));
const RevenueRecognition = React.lazy(() => import('../modules/finance/pages/revenue/RevenueRecognition').then(m => ({ default: m.default })));
const ExpenseClaims = React.lazy(() => import('../modules/finance/pages/expenses/ExpenseClaims').then(m => ({ default: m.default })));
const ExpenseCategories = React.lazy(() => import('../modules/finance/pages/expenses/ExpenseCategories').then(m => ({ default: m.default })));
const VendorBills = React.lazy(() => import('../modules/finance/pages/expenses/VendorBills').then(m => ({ default: m.default })));
const PurchaseOrders = React.lazy(() => import('../modules/finance/pages/expenses/PurchaseOrders').then(m => ({ default: m.default })));
const Reimbursements = React.lazy(() => import('../modules/finance/pages/expenses/Reimbursements').then(m => ({ default: m.default })));
const SalaryProcessing = React.lazy(() => import('../modules/finance/pages/payroll/SalaryProcessing').then(m => ({ default: m.default })));
const PayrollCostAnalysis = React.lazy(() => import('../modules/finance/pages/payroll/PayrollCostAnalysis').then(m => ({ default: m.default })));
const TaxDeductions = React.lazy(() => import('../modules/finance/pages/payroll/TaxDeductions').then(m => ({ default: m.default })));
const BonusManagement = React.lazy(() => import('../modules/finance/pages/payroll/BonusManagement').then(m => ({ default: m.default })));
const BankAccounts = React.lazy(() => import('../modules/finance/pages/banking/BankAccounts').then(m => ({ default: m.default })));
const BankReconciliation = React.lazy(() => import('../modules/finance/pages/banking/BankReconciliation').then(m => ({ default: m.default })));
const CashManagement = React.lazy(() => import('../modules/finance/pages/banking/CashManagement').then(m => ({ default: m.default })));
const PaymentProcessing = React.lazy(() => import('../modules/finance/pages/banking/PaymentProcessing').then(m => ({ default: m.default })));
const Vendors = React.lazy(() => import('../modules/finance/pages/procurement/Vendors').then(m => ({ default: m.default })));
const ProcurementPurchaseOrders = React.lazy(() => import('../modules/finance/pages/procurement/ProcurementPurchaseOrders').then(m => ({ default: m.default })));
const GoodsReceipts = React.lazy(() => import('../modules/finance/pages/procurement/GoodsReceipts').then(m => ({ default: m.default })));
const VendorPayments = React.lazy(() => import('../modules/finance/pages/procurement/VendorPayments').then(m => ({ default: m.default })));
const FixedAssets = React.lazy(() => import('../modules/finance/pages/assets/FixedAssets').then(m => ({ default: m.default })));
const AssetDepreciation = React.lazy(() => import('../modules/finance/pages/assets/AssetDepreciation').then(m => ({ default: m.default })));
const AssetRegister = React.lazy(() => import('../modules/finance/pages/assets/AssetRegister').then(m => ({ default: m.default })));
const GST = React.lazy(() => import('../modules/finance/pages/taxation/GST').then(m => ({ default: m.default })));
const TDS = React.lazy(() => import('../modules/finance/pages/taxation/TDS').then(m => ({ default: m.default })));
const VAT = React.lazy(() => import('../modules/finance/pages/taxation/VAT').then(m => ({ default: m.default })));
const TaxReports = React.lazy(() => import('../modules/finance/pages/taxation/TaxReports').then(m => ({ default: m.default })));
const TaxFiling = React.lazy(() => import('../modules/finance/pages/taxation/TaxFiling').then(m => ({ default: m.default })));
const ProfitAndLoss = React.lazy(() => import('../modules/finance/pages/reports/ProfitAndLoss').then(m => ({ default: m.default })));
const BalanceSheet = React.lazy(() => import('../modules/finance/pages/reports/BalanceSheet').then(m => ({ default: m.default })));
const CashFlow = React.lazy(() => import('../modules/finance/pages/reports/CashFlow').then(m => ({ default: m.default })));
const GeneralLedger = React.lazy(() => import('../modules/finance/pages/reports/GeneralLedger').then(m => ({ default: m.default })));
const ReportsTrialBalance = React.lazy(() => import('../modules/finance/pages/reports/ReportsTrialBalance').then(m => ({ default: m.default })));
const CostCenterReports = React.lazy(() => import('../modules/finance/pages/reports/CostCenterReports').then(m => ({ default: m.default })));
const BudgetReports = React.lazy(() => import('../modules/finance/pages/reports/BudgetReports').then(m => ({ default: m.default })));
const RevenueAnalytics = React.lazy(() => import('../modules/finance/pages/analytics/RevenueAnalytics').then(m => ({ default: m.default })));
const ExpenseAnalytics = React.lazy(() => import('../modules/finance/pages/analytics/ExpenseAnalytics').then(m => ({ default: m.default })));
const Profitability = React.lazy(() => import('../modules/finance/pages/analytics/Profitability').then(m => ({ default: m.default })));
const DepartmentAnalysis = React.lazy(() => import('../modules/finance/pages/analytics/DepartmentAnalysis').then(m => ({ default: m.default })));
const FinancialKPIs = React.lazy(() => import('../modules/finance/pages/analytics/FinancialKPIs').then(m => ({ default: m.default })));

const EmpHomeDashboard = React.lazy(() => import('../modules/employee/pages/home/HomeDashboard').then(m => ({ default: m.default })));
const EmployeeLeavePage = React.lazy(() => import('../modules/employee/pages/LeavePage').then(m => ({ default: m.LeavePage })));
const EmployeeAttendancePage = React.lazy(() => import('../modules/employee/pages/AttendancePage').then(m => ({ default: m.AttendancePage })));
const EmployeeTasksPage = React.lazy(() => import('../modules/employee/pages/TasksPage').then(m => ({ default: m.TasksPage })));
const EmployeeCalendarPage = React.lazy(() => import('../modules/employee/pages/CalendarPage').then(m => ({ default: m.CalendarPage })));
const EmployeeChatPage = React.lazy(() => import('../modules/employee/pages/ChatPage').then(m => ({ default: m.ChatPage })));
const EmployeeEmailPage = React.lazy(() => import('../modules/employee/pages/EmailPage').then(m => ({ default: m.EmailPage })));
const EmployeeDocumentsPage = React.lazy(() => import('../modules/employee/pages/DocumentsPage').then(m => ({ default: m.DocumentsPage })));
const EmployeeTrainingPage = React.lazy(() => import('../modules/employee/pages/TrainingPage').then(m => ({ default: m.TrainingPage })));
const EmployeePerformancePage = React.lazy(() => import('../modules/employee/pages/PerformancePage').then(m => ({ default: m.PerformancePage })));
const EmployeeNotificationsPage = React.lazy(() => import('../modules/employee/pages/NotificationsPage').then(m => ({ default: m.NotificationsPage })));
const EmpProfileOverview = React.lazy(() => import('../modules/employee/pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const EmployeeSettingsPage = React.lazy(() => import('../modules/employee/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const EmpPersonalInformation = React.lazy(() => import('../modules/employee/pages/profile/PersonalInformation').then(m => ({ default: m.default })));
const EmpEmploymentDetails = React.lazy(() => import('../modules/employee/pages/profile/EmploymentDetails').then(m => ({ default: m.default })));
const EmpContactInformation = React.lazy(() => import('../modules/employee/pages/profile/ContactInformation').then(m => ({ default: m.default })));
const EmpEmergencyContacts = React.lazy(() => import('../modules/employee/pages/profile/EmergencyContacts').then(m => ({ default: m.default })));
const EmpDocuments = React.lazy(() => import('../modules/employee/pages/profile/Documents').then(m => ({ default: m.default })));
const EmpBankInformation = React.lazy(() => import('../modules/employee/pages/profile/BankInformation').then(m => ({ default: m.default })));
const EmpEducation = React.lazy(() => import('../modules/employee/pages/profile/Education').then(m => ({ default: m.default })));
const EmpCertifications = React.lazy(() => import('../modules/employee/pages/profile/Certifications').then(m => ({ default: m.default })));
const EmpSkills = React.lazy(() => import('../modules/employee/pages/profile/Skills').then(m => ({ default: m.default })));
const EmpExperience = React.lazy(() => import('../modules/employee/pages/profile/Experience').then(m => ({ default: m.default })));
const EmpDailyAttendance = React.lazy(() => import('../modules/employee/pages/attendance/DailyAttendance').then(m => ({ default: m.default })));
const EmpClockInOut = React.lazy(() => import('../modules/employee/pages/attendance/ClockInOut').then(m => ({ default: m.default })));
const EmpAttendanceCalendar = React.lazy(() => import('../modules/employee/pages/attendance/AttendanceCalendar').then(m => ({ default: m.default })));
const EmpAttendanceHistory = React.lazy(() => import('../modules/employee/pages/attendance/AttendanceHistory').then(m => ({ default: m.default })));
const EmpBiometricLogs = React.lazy(() => import('../modules/employee/pages/attendance/BiometricLogs').then(m => ({ default: m.default })));
const EmpWorkHours = React.lazy(() => import('../modules/employee/pages/attendance/WorkHours').then(m => ({ default: m.default })));
const EmpShiftSchedule = React.lazy(() => import('../modules/employee/pages/attendance/ShiftSchedule').then(m => ({ default: m.default })));
const EmpOvertime = React.lazy(() => import('../modules/employee/pages/attendance/Overtime').then(m => ({ default: m.default })));
const EmpApplyLeave = React.lazy(() => import('../modules/employee/pages/leave/ApplyLeave').then(m => ({ default: m.default })));
const EmpLeaveBalance = React.lazy(() => import('../modules/employee/pages/leave/LeaveBalance').then(m => ({ default: m.default })));
const EmpLeaveCalendar = React.lazy(() => import('../modules/employee/pages/leave/LeaveCalendar').then(m => ({ default: m.default })));
const EmpLeaveHistory = React.lazy(() => import('../modules/employee/pages/leave/LeaveHistory').then(m => ({ default: m.default })));
const EmpApprovalStatus = React.lazy(() => import('../modules/employee/pages/leave/ApprovalStatus').then(m => ({ default: m.default })));
const EmpHolidayCalendar = React.lazy(() => import('../modules/employee/pages/leave/HolidayCalendar').then(m => ({ default: m.default })));
const EmpMyTasks = React.lazy(() => import('../modules/employee/pages/tasks/MyTasks').then(m => ({ default: m.default })));
const EmpAssignedTasks = React.lazy(() => import('../modules/employee/pages/tasks/AssignedTasks').then(m => ({ default: m.default })));
const EmpCompletedTasks = React.lazy(() => import('../modules/employee/pages/tasks/CompletedTasks').then(m => ({ default: m.default })));
const EmpPendingTasks = React.lazy(() => import('../modules/employee/pages/tasks/PendingTasks').then(m => ({ default: m.default })));
const EmpDeadlines = React.lazy(() => import('../modules/employee/pages/tasks/Deadlines').then(m => ({ default: m.default })));
const EmpKanbanBoard = React.lazy(() => import('../modules/employee/pages/tasks/KanbanBoard').then(m => ({ default: m.default })));
const EmpActiveProjects = React.lazy(() => import('../modules/employee/pages/projects/ActiveProjects').then(m => ({ default: m.default })));
const EmpTeamProjects = React.lazy(() => import('../modules/employee/pages/projects/TeamProjects').then(m => ({ default: m.default })));
const EmpSprintBoard = React.lazy(() => import('../modules/employee/pages/projects/SprintBoard').then(m => ({ default: m.default })));
const EmpTimeTracking = React.lazy(() => import('../modules/employee/pages/projects/TimeTracking').then(m => ({ default: m.default })));
const EmpProjectFiles = React.lazy(() => import('../modules/employee/pages/projects/ProjectFiles').then(m => ({ default: m.default })));
const EmpTeamMembers = React.lazy(() => import('../modules/employee/pages/team/TeamMembers').then(m => ({ default: m.default })));
const EmpOrganizationChart = React.lazy(() => import('../modules/employee/pages/team/OrganizationChart').then(m => ({ default: m.default })));
const EmpTeamDirectory = React.lazy(() => import('../modules/employee/pages/team/TeamDirectory').then(m => ({ default: m.default })));
const EmpTeamPerformance = React.lazy(() => import('../modules/employee/pages/team/TeamPerformance').then(m => ({ default: m.default })));
const EmpDirectMessages = React.lazy(() => import('../modules/employee/pages/chat/DirectMessages').then(m => ({ default: m.default })));
const EmpTeamChannels = React.lazy(() => import('../modules/employee/pages/chat/TeamChannels').then(m => ({ default: m.default })));
const EmpAnnouncements = React.lazy(() => import('../modules/employee/pages/chat/Announcements').then(m => ({ default: m.default })));
const EmpFileSharing = React.lazy(() => import('../modules/employee/pages/chat/FileSharing').then(m => ({ default: m.default })));
const EmpVoiceNotes = React.lazy(() => import('../modules/employee/pages/chat/VoiceNotes').then(m => ({ default: m.default })));
const EmpVideoMeetings = React.lazy(() => import('../modules/employee/pages/chat/VideoMeetings').then(m => ({ default: m.default })));
const EmpPayslips = React.lazy(() => import('../modules/employee/pages/documents/Payslips').then(m => ({ default: m.default })));
const EmpOfferLetter = React.lazy(() => import('../modules/employee/pages/documents/OfferLetter').then(m => ({ default: m.default })));
const EmpAppointmentLetter = React.lazy(() => import('../modules/employee/pages/documents/AppointmentLetter').then(m => ({ default: m.default })));
const EmpIDCard = React.lazy(() => import('../modules/employee/pages/documents/IDCard').then(m => ({ default: m.default })));
const EmpHRDocuments = React.lazy(() => import('../modules/employee/pages/documents/HRDocuments').then(m => ({ default: m.default })));
const EmpCompanyPolicies = React.lazy(() => import('../modules/employee/pages/documents/CompanyPolicies').then(m => ({ default: m.default })));
const EmpCertificates = React.lazy(() => import('../modules/employee/pages/documents/Certificates').then(m => ({ default: m.default })));
const EmpSalary = React.lazy(() => import('../modules/employee/pages/payroll/Salary').then(m => ({ default: m.default })));
const EmpPayrollPayslips = React.lazy(() => import('../modules/employee/pages/payroll/PayrollPayslips').then(m => ({ default: m.default })));
const EmpBonuses = React.lazy(() => import('../modules/employee/pages/payroll/Bonuses').then(m => ({ default: m.default })));
const EmpIncentives = React.lazy(() => import('../modules/employee/pages/payroll/Incentives').then(m => ({ default: m.default })));
const EmpReimbursements = React.lazy(() => import('../modules/employee/pages/payroll/Reimbursements').then(m => ({ default: m.default })));
const EmpTaxSummary = React.lazy(() => import('../modules/employee/pages/payroll/TaxSummary').then(m => ({ default: m.default })));
const EmpPF = React.lazy(() => import('../modules/employee/pages/payroll/PF').then(m => ({ default: m.default })));
const EmpESI = React.lazy(() => import('../modules/employee/pages/payroll/ESI').then(m => ({ default: m.default })));
const EmpGoals = React.lazy(() => import('../modules/employee/pages/performance/Goals').then(m => ({ default: m.default })));
const EmpKPI = React.lazy(() => import('../modules/employee/pages/performance/KPI').then(m => ({ default: m.default })));
const EmpAppraisals = React.lazy(() => import('../modules/employee/pages/performance/Appraisals').then(m => ({ default: m.default })));
const EmpFeedback = React.lazy(() => import('../modules/employee/pages/performance/Feedback').then(m => ({ default: m.default })));
const EmpAchievements = React.lazy(() => import('../modules/employee/pages/performance/Achievements').then(m => ({ default: m.default })));
const EmpCourses = React.lazy(() => import('../modules/employee/pages/learning/Courses').then(m => ({ default: m.default })));
const EmpLearningCertifications = React.lazy(() => import('../modules/employee/pages/learning/LearningCertifications').then(m => ({ default: m.default })));
const EmpTrainingCalendar = React.lazy(() => import('../modules/employee/pages/learning/TrainingCalendar').then(m => ({ default: m.default })));
const EmpAssessments = React.lazy(() => import('../modules/employee/pages/learning/Assessments').then(m => ({ default: m.default })));
const EmpAssignedAssets = React.lazy(() => import('../modules/employee/pages/assets/AssignedAssets').then(m => ({ default: m.default })));
const EmpLaptop = React.lazy(() => import('../modules/employee/pages/assets/Laptop').then(m => ({ default: m.default })));
const EmpMobile = React.lazy(() => import('../modules/employee/pages/assets/Mobile').then(m => ({ default: m.default })));
const EmpAccessories = React.lazy(() => import('../modules/employee/pages/assets/Accessories').then(m => ({ default: m.default })));
const EmpAssetRequests = React.lazy(() => import('../modules/employee/pages/assets/AssetRequests').then(m => ({ default: m.default })));
const EmpTravelRequests = React.lazy(() => import('../modules/employee/pages/travel/TravelRequests').then(m => ({ default: m.default })));
const EmpExpenseClaims = React.lazy(() => import('../modules/employee/pages/travel/ExpenseClaims').then(m => ({ default: m.default })));
const EmpTravelReimbursements = React.lazy(() => import('../modules/employee/pages/travel/TravelReimbursements').then(m => ({ default: m.default })));
const EmpInbox = React.lazy(() => import('../modules/employee/pages/notifications/Inbox').then(m => ({ default: m.default })));
const EmpAlerts = React.lazy(() => import('../modules/employee/pages/notifications/Alerts').then(m => ({ default: m.default })));
const EmpHRAnnouncements = React.lazy(() => import('../modules/employee/pages/notifications/HRAnnouncements').then(m => ({ default: m.default })));
const EmpSupportTickets = React.lazy(() => import('../modules/employee/pages/helpdesk/SupportTickets').then(m => ({ default: m.default })));
const EmpITRequests = React.lazy(() => import('../modules/employee/pages/helpdesk/ITRequests').then(m => ({ default: m.default })));
const EmpHRRequests = React.lazy(() => import('../modules/employee/pages/helpdesk/HRRequests').then(m => ({ default: m.default })));
const EmpFAQs = React.lazy(() => import('../modules/employee/pages/helpdesk/FAQs').then(m => ({ default: m.default })));
const EmpProfileSettings = React.lazy(() => import('../modules/employee/pages/settings/ProfileSettings').then(m => ({ default: m.default })));
const EmpPassword = React.lazy(() => import('../modules/employee/pages/settings/Password').then(m => ({ default: m.default })));
const EmpSecurity = React.lazy(() => import('../modules/employee/pages/settings/Security').then(m => ({ default: m.default })));
const EmpTwoFactorAuthentication = React.lazy(() => import('../modules/employee/pages/settings/TwoFactorAuthentication').then(m => ({ default: m.default })));
const EmpNotificationPreferences = React.lazy(() => import('../modules/employee/pages/settings/NotificationPreferences').then(m => ({ default: m.default })));

const DashboardRouter = () => {
  const user = useSelector(state => state.auth.user) || { id: 'usr-1', name: 'User', role: 'SUPER_ADMIN', department: 'Global Security' };

  switch (user.role) {
    case 'SUPERADMIN':
    case 'SUPER_ADMIN': return <SuperAdminDashboard />;
    case 'ADMIN': return <AdminDashboard />;
    case 'CEO': return <CeoDashboard />;
    case 'CTO': return <Navigate to="/cto/executive-overview" replace />;
    case 'HR_MANAGER': return <HrManagerDashboard />;
    case 'HR_EXECUTIVE': return <HrExecutiveDashboard />;
    case 'FINANCE_MANAGER': return <FinanceManagerDashboard />;
    case 'MARKETING_MANAGER': return <MarketingManagerDashboard />;
    case 'SALES_MANAGER': return <SalesManagerDashboard />;
    case 'PROJECT_MANAGER': return <ProjectManagerDashboard />;
    case 'TECH_LEAD': return <TechLeadDashboard />;
    case 'DEVOPS_ENGINEER': return <DevOpsDashboard />;
    case 'QA_ENGINEER': return <QaDashboard />;
    case 'SOFTWARE_ENGINEER': return <SoftwareEngineerDashboard />;
    case 'SECURITY_ANALYST': return <SecurityAnalystDashboard />;
    case 'SUPPORT_AGENT': return <SupportDashboard />;
    case 'EMPLOYEE': return <EmployeeDashboard />;
    case 'INTERN': return <Navigate to="/intern/dashboard" replace />;
    case 'MANAGER':
    case 'Manager': return <ManagerDashboard />;
    default: return <SuperAdminDashboard />;
  }
};

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

        <Route path="/finance" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="accounts/chart" element={<ChartOfAccounts />} />
          <Route path="accounts/groups" element={<AccountGroups />} />
          <Route path="accounts/ledgers" element={<Ledgers />} />
          <Route path="accounts/journals" element={<JournalEntries />} />
          <Route path="accounts/trial-balance" element={<TrialBalance />} />
          <Route path="budgeting/planning" element={<BudgetPlanning />} />
          <Route path="budgeting/departments" element={<DepartmentBudgets />} />
          <Route path="budgeting/forecasts" element={<Forecasts />} />
          <Route path="budgeting/variance" element={<VarianceAnalysis />} />
          <Route path="revenue/sales" element={<SalesRevenue />} />
          <Route path="revenue/invoices" element={<CustomerInvoices />} />
          <Route path="revenue/credit-notes" element={<CreditNotes />} />
          <Route path="revenue/recognition" element={<RevenueRecognition />} />
          <Route path="expenses/claims" element={<ExpenseClaims />} />
          <Route path="expenses/categories" element={<ExpenseCategories />} />
          <Route path="expenses/vendor-bills" element={<VendorBills />} />
          <Route path="expenses/purchase-orders" element={<PurchaseOrders />} />
          <Route path="expenses/reimbursements" element={<Reimbursements />} />
          <Route path="payroll/salary" element={<SalaryProcessing />} />
          <Route path="payroll/cost-analysis" element={<PayrollCostAnalysis />} />
          <Route path="payroll/tax" element={<TaxDeductions />} />
          <Route path="payroll/bonus" element={<BonusManagement />} />
          <Route path="banking/accounts" element={<BankAccounts />} />
          <Route path="banking/reconciliation" element={<BankReconciliation />} />
          <Route path="banking/cash" element={<CashManagement />} />
          <Route path="banking/payments" element={<PaymentProcessing />} />
          <Route path="procurement/vendors" element={<Vendors />} />
          <Route path="procurement/orders" element={<ProcurementPurchaseOrders />} />
          <Route path="procurement/receipts" element={<GoodsReceipts />} />
          <Route path="procurement/payments" element={<VendorPayments />} />
          <Route path="assets/fixed" element={<FixedAssets />} />
          <Route path="assets/depreciation" element={<AssetDepreciation />} />
          <Route path="assets/register" element={<AssetRegister />} />
          <Route path="taxation/gst" element={<GST />} />
          <Route path="taxation/tds" element={<TDS />} />
          <Route path="taxation/vat" element={<VAT />} />
          <Route path="taxation/reports" element={<TaxReports />} />
          <Route path="taxation/filing" element={<TaxFiling />} />
          <Route path="reports/pnl" element={<ProfitAndLoss />} />
          <Route path="reports/balance-sheet" element={<BalanceSheet />} />
          <Route path="reports/cash-flow" element={<CashFlow />} />
          <Route path="reports/ledger" element={<GeneralLedger />} />
          <Route path="reports/trial-balance" element={<ReportsTrialBalance />} />
          <Route path="reports/cost-centers" element={<CostCenterReports />} />
          <Route path="reports/budgets" element={<BudgetReports />} />
          <Route path="analytics/revenue" element={<RevenueAnalytics />} />
          <Route path="analytics/expense" element={<ExpenseAnalytics />} />
          <Route path="analytics/profitability" element={<Profitability />} />
          <Route path="analytics/department" element={<DepartmentAnalysis />} />
          <Route path="analytics/kpis" element={<FinancialKPIs />} />
        </Route>

        <Route path="/employee" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>
  <Route path="dashboard" element={<EmpHomeDashboard />} />
  <Route path="leave" element={<EmployeeLeavePage />} />
  <Route path="attendance" element={<EmployeeAttendancePage />} />
  <Route path="tasks" element={<EmployeeTasksPage />} />
  <Route path="calendar" element={<EmployeeCalendarPage />} />
  <Route path="chat" element={<EmployeeChatPage />} />
  <Route path="email" element={<EmployeeEmailPage />} />
  <Route path="documents" element={<EmployeeDocumentsPage />} />
  <Route path="training" element={<EmployeeTrainingPage />} />
  <Route path="performance" element={<EmployeePerformancePage />} />
  <Route path="notifications" element={<EmployeeNotificationsPage />} />
  <Route path="profile" element={<EmpProfileOverview />} />
  <Route path="settings" element={<EmployeeSettingsPage />} />
  <Route path="profile/personal-information" element={<EmpPersonalInformation />} />
  <Route path="profile/employment-details" element={<EmpEmploymentDetails />} />
  <Route path="profile/contact-information" element={<EmpContactInformation />} />
  <Route path="profile/emergency-contacts" element={<EmpEmergencyContacts />} />
  <Route path="profile/documents" element={<EmpDocuments />} />
  <Route path="profile/bank-information" element={<EmpBankInformation />} />
  <Route path="profile/education" element={<EmpEducation />} />
  <Route path="profile/certifications" element={<EmpCertifications />} />
  <Route path="profile/skills" element={<EmpSkills />} />
  <Route path="profile/experience" element={<EmpExperience />} />
  <Route path="attendance/daily-attendance" element={<EmpDailyAttendance />} />
  <Route path="attendance/clock-in-out" element={<EmpClockInOut />} />
  <Route path="attendance/attendance-calendar" element={<EmpAttendanceCalendar />} />
  <Route path="attendance/attendance-history" element={<EmpAttendanceHistory />} />
  <Route path="attendance/biometric-logs" element={<EmpBiometricLogs />} />
  <Route path="attendance/work-hours" element={<EmpWorkHours />} />
  <Route path="attendance/shift-schedule" element={<EmpShiftSchedule />} />
  <Route path="attendance/overtime" element={<EmpOvertime />} />
  <Route path="leave/apply-leave" element={<EmpApplyLeave />} />
  <Route path="leave/leave-balance" element={<EmpLeaveBalance />} />
  <Route path="leave/leave-calendar" element={<EmpLeaveCalendar />} />
  <Route path="leave/leave-history" element={<EmpLeaveHistory />} />
  <Route path="leave/approval-status" element={<EmpApprovalStatus />} />
  <Route path="leave/holiday-calendar" element={<EmpHolidayCalendar />} />
  <Route path="tasks/my-tasks" element={<EmpMyTasks />} />
  <Route path="tasks/assigned-tasks" element={<EmpAssignedTasks />} />
  <Route path="tasks/completed-tasks" element={<EmpCompletedTasks />} />
  <Route path="tasks/pending-tasks" element={<EmpPendingTasks />} />
  <Route path="tasks/deadlines" element={<EmpDeadlines />} />
  <Route path="tasks/kanban-board" element={<EmpKanbanBoard />} />
  <Route path="projects/active-projects" element={<EmpActiveProjects />} />
  <Route path="projects/team-projects" element={<EmpTeamProjects />} />
  <Route path="projects/sprint-board" element={<EmpSprintBoard />} />
  <Route path="projects/time-tracking" element={<EmpTimeTracking />} />
  <Route path="projects/project-files" element={<EmpProjectFiles />} />
  <Route path="team/team-members" element={<EmpTeamMembers />} />
  <Route path="team/organization-chart" element={<EmpOrganizationChart />} />
  <Route path="team/team-directory" element={<EmpTeamDirectory />} />
  <Route path="team/team-performance" element={<EmpTeamPerformance />} />
  <Route path="chat/direct-messages" element={<EmpDirectMessages />} />
  <Route path="chat/team-channels" element={<EmpTeamChannels />} />
  <Route path="chat/announcements" element={<EmpAnnouncements />} />
  <Route path="chat/file-sharing" element={<EmpFileSharing />} />
  <Route path="chat/voice-notes" element={<EmpVoiceNotes />} />
  <Route path="chat/video-meetings" element={<EmpVideoMeetings />} />
  <Route path="documents/payslips" element={<EmpPayslips />} />
  <Route path="documents/offer-letter" element={<EmpOfferLetter />} />
  <Route path="documents/appointment-letter" element={<EmpAppointmentLetter />} />
  <Route path="documents/idcard" element={<EmpIDCard />} />
  <Route path="documents/hrdocuments" element={<EmpHRDocuments />} />
  <Route path="documents/company-policies" element={<EmpCompanyPolicies />} />
  <Route path="documents/certificates" element={<EmpCertificates />} />
  <Route path="payroll/salary" element={<EmpSalary />} />
  <Route path="payroll/payroll-payslips" element={<EmpPayrollPayslips />} />
  <Route path="payroll/bonuses" element={<EmpBonuses />} />
  <Route path="payroll/incentives" element={<EmpIncentives />} />
  <Route path="payroll/reimbursements" element={<EmpReimbursements />} />
  <Route path="payroll/tax-summary" element={<EmpTaxSummary />} />
  <Route path="payroll/pf" element={<EmpPF />} />
  <Route path="payroll/esi" element={<EmpESI />} />
  <Route path="performance/goals" element={<EmpGoals />} />
  <Route path="performance/kpi" element={<EmpKPI />} />
  <Route path="performance/appraisals" element={<EmpAppraisals />} />
  <Route path="performance/feedback" element={<EmpFeedback />} />
  <Route path="performance/achievements" element={<EmpAchievements />} />
  <Route path="learning/courses" element={<EmpCourses />} />
  <Route path="learning/learning-certifications" element={<EmpLearningCertifications />} />
  <Route path="learning/training-calendar" element={<EmpTrainingCalendar />} />
  <Route path="learning/assessments" element={<EmpAssessments />} />
  <Route path="assets/assigned-assets" element={<EmpAssignedAssets />} />
  <Route path="assets/laptop" element={<EmpLaptop />} />
  <Route path="assets/mobile" element={<EmpMobile />} />
  <Route path="assets/accessories" element={<EmpAccessories />} />
  <Route path="assets/asset-requests" element={<EmpAssetRequests />} />
  <Route path="travel/travel-requests" element={<EmpTravelRequests />} />
  <Route path="travel/expense-claims" element={<EmpExpenseClaims />} />
  <Route path="travel/travel-reimbursements" element={<EmpTravelReimbursements />} />
  <Route path="notifications/inbox" element={<EmpInbox />} />
  <Route path="notifications/alerts" element={<EmpAlerts />} />
  <Route path="notifications/hrannouncements" element={<EmpHRAnnouncements />} />
  <Route path="helpdesk/support-tickets" element={<EmpSupportTickets />} />
  <Route path="helpdesk/itrequests" element={<EmpITRequests />} />
  <Route path="helpdesk/hrrequests" element={<EmpHRRequests />} />
  <Route path="helpdesk/faqs" element={<EmpFAQs />} />
  <Route path="settings/profile-settings" element={<EmpProfileSettings />} />
  <Route path="settings/password" element={<EmpPassword />} />
  <Route path="settings/security" element={<EmpSecurity />} />
  <Route path="settings/two-factor-authentication" element={<EmpTwoFactorAuthentication />} />
  <Route path="settings/notification-preferences" element={<EmpNotificationPreferences />} />
</Route>

        {/* Tech Lead Module Routes */}
        <Route path="/tech-lead/*" element={
          <ProtectedRoute>
            <EnterpriseShell>
              <Suspense fallback={<PageLoading />}>
                <PageTransition>
                  <TechLeadRouter />
                </PageTransition>
              </Suspense>
            </EnterpriseShell>
          </ProtectedRoute>
        } />

        {/* CTO Module Routes */}
        <Route path="/cto/*" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoadingFull />}>
              <PageTransition>
                <CtoRouter />
              </PageTransition>
            </Suspense>
          </ProtectedRoute>
        } />

        {/* Intern Module Routes */}
        <Route path="/intern/*" element={
          <ProtectedRoute>
            <Suspense fallback={<PageLoadingFull />}>
              <PageTransition>
                <InternRouter />
              </PageTransition>
            </Suspense>
          </ProtectedRoute>
        } />

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
