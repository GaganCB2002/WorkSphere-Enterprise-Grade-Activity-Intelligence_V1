const fs = require('fs');
const path = require('path');

const appRoutesPath = path.join(__dirname, '..', 'frontend', 'src', 'routes', 'AppRoutes.jsx');
let content = fs.readFileSync(appRoutesPath, 'utf8');

const structure = {
  home: ['HomeDashboard'],
  profile: ['PersonalInformation', 'EmploymentDetails', 'ContactInformation', 'EmergencyContacts', 'Documents', 'BankInformation', 'Education', 'Certifications', 'Skills', 'Experience'],
  attendance: ['DailyAttendance', 'ClockInOut', 'AttendanceCalendar', 'AttendanceHistory', 'BiometricLogs', 'WorkHours', 'ShiftSchedule', 'Overtime'],
  leave: ['ApplyLeave', 'LeaveBalance', 'LeaveCalendar', 'LeaveHistory', 'ApprovalStatus', 'HolidayCalendar'],
  tasks: ['MyTasks', 'AssignedTasks', 'CompletedTasks', 'PendingTasks', 'Deadlines', 'KanbanBoard'],
  projects: ['ActiveProjects', 'TeamProjects', 'SprintBoard', 'TimeTracking', 'ProjectFiles'],
  team: ['TeamMembers', 'OrganizationChart', 'TeamDirectory', 'TeamPerformance'],
  chat: ['DirectMessages', 'TeamChannels', 'Announcements', 'FileSharing', 'VoiceNotes', 'VideoMeetings'],
  documents: ['Payslips', 'OfferLetter', 'AppointmentLetter', 'IDCard', 'HRDocuments', 'CompanyPolicies', 'Certificates'],
  payroll: ['Salary', 'PayrollPayslips', 'Bonuses', 'Incentives', 'Reimbursements', 'TaxSummary', 'PF', 'ESI'],
  performance: ['Goals', 'KPI', 'Appraisals', 'Feedback', 'Achievements'],
  learning: ['Courses', 'LearningCertifications', 'TrainingCalendar', 'Assessments'],
  assets: ['AssignedAssets', 'Laptop', 'Mobile', 'Accessories', 'AssetRequests'],
  travel: ['TravelRequests', 'ExpenseClaims', 'TravelReimbursements'],
  notifications: ['Inbox', 'Alerts', 'HRAnnouncements'],
  helpdesk: ['SupportTickets', 'ITRequests', 'HRRequests', 'FAQs'],
  settings: ['ProfileSettings', 'Password', 'Security', 'TwoFactorAuthentication', 'NotificationPreferences']
};

let imports = '';
let routesBlock = '<Route path="/employee" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>\n';

for (const [module, pages] of Object.entries(structure)) {
  for (const page of pages) {
    const importName = 'Emp' + page;
    imports += 'const ' + importName + ' = React.lazy(() => import(\'../modules/employee/pages/' + module + '/' + page + '\').then(m => ({ default: m.default })));\n';
    
    // Format path: kebab-case
    const routePath = page.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    routesBlock += '  <Route path="' + (module === 'home' ? 'dashboard' : module + '/' + routePath) + '" element={<' + importName + ' />} />\n';
  }
}
routesBlock += '</Route>\n';

// Insert imports right before const DashboardRouter
content = content.replace('const DashboardRouter = () => {', imports + '\nconst DashboardRouter = () => {');

// In DashboardRouter, change the EMPLOYEE route
content = content.replace(
  "case 'EMPLOYEE': return <EmployeeDashboard user={user} platform={{ id: 'platform-1', name: 'Core Platform' }} token={token} />;",
  "case 'EMPLOYEE': return <Navigate to=\"/employee/dashboard\" replace />;"
);

// Insert routesBlock right before {/* Full Screen Command Center */}
content = content.replace('{/* Full Screen Command Center */}', routesBlock + '\n        {/* Full Screen Command Center */}');

fs.writeFileSync(appRoutesPath, content);
console.log('Employee routes patched successfully.');
