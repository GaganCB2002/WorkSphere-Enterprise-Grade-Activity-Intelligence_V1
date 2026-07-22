const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'frontend', 'src', 'modules', 'employee', 'pages');

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

for (const [module, pages] of Object.entries(structure)) {
  const moduleDir = path.join(baseDir, module);
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }

  for (const page of pages) {
    const fullPath = path.join(moduleDir, `${page}.tsx`);
    const title = page.replace(/([A-Z])/g, ' $1').trim();
    const groupName = module.charAt(0).toUpperCase() + module.slice(1);
    
    const content = `import React from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';

export default function ${page}() {
  return (
    <EmployeePageLayout
      title="${title}"
      description="Manage your ${title.toLowerCase()} and related records."
      breadcrumbs={['Employee', '${groupName}', '${title}']}
      status="Active"
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">${title} Module</h2>
          <p className="text-slate-500 dark:text-slate-400">Content for ${title} will be rendered here.</p>
        </div>
      </div>
    </EmployeePageLayout>
  );
}
`;
    fs.writeFileSync(fullPath, content);
  }
}

console.log('Employee pages scaffolded successfully.');
