const fs = require('fs');
const path = require('path');

const sidebarPath = path.join(__dirname, '..', 'frontend', 'src', 'components', 'layout', 'EnterpriseShell', 'Sidebar.jsx');
let content = fs.readFileSync(sidebarPath, 'utf8');

// Update roleNavMap
content = content.replace(
  "EMPLOYEE: ['Dashboard', 'Profile', 'Attendance', 'Leave', 'Payroll', 'Tasks']",
  "EMPLOYEE: ['Employee Home', 'My Profile', 'Attendance', 'Leave Management', 'Tasks', 'Projects', 'Team', 'Team Chat', 'Documents', 'Payroll', 'Performance', 'Learning', 'Assets', 'Travel', 'Notifications', 'Help Desk', 'Settings']"
);

// We need to add the employee groups to navGroups.
const employeeGroups = `
  {
    label: 'Employee Home',
    icon: navIcons.Dashboard,
    items: [
      { label: 'Home Dashboard', path: '/employee/dashboard' }
    ]
  },
  {
    label: 'My Profile',
    icon: navIcons.Profile,
    items: [
      { label: 'Personal Information', path: '/employee/profile/personal-information' },
      { label: 'Employment Details', path: '/employee/profile/employment-details' },
      { label: 'Contact Information', path: '/employee/profile/contact-information' },
      { label: 'Emergency Contacts', path: '/employee/profile/emergency-contacts' },
      { label: 'Documents', path: '/employee/profile/documents' },
      { label: 'Bank Information', path: '/employee/profile/bank-information' },
      { label: 'Education', path: '/employee/profile/education' },
      { label: 'Certifications', path: '/employee/profile/certifications' },
      { label: 'Skills', path: '/employee/profile/skills' },
      { label: 'Experience', path: '/employee/profile/experience' }
    ]
  },
  {
    label: 'Attendance',
    icon: navIcons.Attendance,
    items: [
      { label: 'Daily Attendance', path: '/employee/attendance/daily-attendance' },
      { label: 'Clock In / Clock Out', path: '/employee/attendance/clock-in-out' },
      { label: 'Attendance Calendar', path: '/employee/attendance/attendance-calendar' },
      { label: 'Attendance History', path: '/employee/attendance/attendance-history' },
      { label: 'Biometric Logs', path: '/employee/attendance/biometric-logs' },
      { label: 'Work Hours', path: '/employee/attendance/work-hours' },
      { label: 'Shift Schedule', path: '/employee/attendance/shift-schedule' },
      { label: 'Overtime', path: '/employee/attendance/overtime' }
    ]
  },
  {
    label: 'Leave Management',
    icon: navIcons.Leave,
    items: [
      { label: 'Apply Leave', path: '/employee/leave/apply-leave' },
      { label: 'Leave Balance', path: '/employee/leave/leave-balance' },
      { label: 'Leave Calendar', path: '/employee/leave/leave-calendar' },
      { label: 'Leave History', path: '/employee/leave/leave-history' },
      { label: 'Approval Status', path: '/employee/leave/approval-status' },
      { label: 'Holiday Calendar', path: '/employee/leave/holiday-calendar' }
    ]
  },
  {
    label: 'Tasks',
    icon: navIcons.Tasks,
    items: [
      { label: 'My Tasks', path: '/employee/tasks/my-tasks' },
      { label: 'Assigned Tasks', path: '/employee/tasks/assigned-tasks' },
      { label: 'Completed Tasks', path: '/employee/tasks/completed-tasks' },
      { label: 'Pending Tasks', path: '/employee/tasks/pending-tasks' },
      { label: 'Deadlines', path: '/employee/tasks/deadlines' },
      { label: 'Kanban Board', path: '/employee/tasks/kanban-board' }
    ]
  },
  {
    label: 'Projects',
    icon: navIcons.Projects,
    items: [
      { label: 'Active Projects', path: '/employee/projects/active-projects' },
      { label: 'Team Projects', path: '/employee/projects/team-projects' },
      { label: 'Sprint Board', path: '/employee/projects/sprint-board' },
      { label: 'Time Tracking', path: '/employee/projects/time-tracking' },
      { label: 'Project Files', path: '/employee/projects/project-files' }
    ]
  },
  {
    label: 'Team',
    icon: navIcons.Team,
    items: [
      { label: 'Team Members', path: '/employee/team/team-members' },
      { label: 'Organization Chart', path: '/employee/team/organization-chart' },
      { label: 'Team Directory', path: '/employee/team/team-directory' },
      { label: 'Team Performance', path: '/employee/team/team-performance' }
    ]
  },
  {
    label: 'Team Chat',
    icon: navIcons['Team Chat'] || navIcons.Team,
    items: [
      { label: 'Direct Messages', path: '/employee/chat/direct-messages' },
      { label: 'Team Channels', path: '/employee/chat/team-channels' },
      { label: 'Announcements', path: '/employee/chat/announcements' },
      { label: 'File Sharing', path: '/employee/chat/file-sharing' },
      { label: 'Voice Notes', path: '/employee/chat/voice-notes' },
      { label: 'Video Meetings', path: '/employee/chat/video-meetings' }
    ]
  },
  {
    label: 'Documents',
    icon: navIcons.Documents || navIcons.Projects,
    items: [
      { label: 'Payslips', path: '/employee/documents/payslips' },
      { label: 'Offer Letter', path: '/employee/documents/offer-letter' },
      { label: 'Appointment Letter', path: '/employee/documents/appointment-letter' },
      { label: 'ID Card', path: '/employee/documents/i-d-card' },
      { label: 'HR Documents', path: '/employee/documents/h-r-documents' },
      { label: 'Company Policies', path: '/employee/documents/company-policies' },
      { label: 'Certificates', path: '/employee/documents/certificates' }
    ]
  },
  {
    label: 'Payroll',
    icon: navIcons.Payroll,
    items: [
      { label: 'Salary', path: '/employee/payroll/salary' },
      { label: 'Payslips', path: '/employee/payroll/payroll-payslips' },
      { label: 'Bonuses', path: '/employee/payroll/bonuses' },
      { label: 'Incentives', path: '/employee/payroll/incentives' },
      { label: 'Reimbursements', path: '/employee/payroll/reimbursements' },
      { label: 'Tax Summary', path: '/employee/payroll/tax-summary' },
      { label: 'PF', path: '/employee/payroll/p-f' },
      { label: 'ESI', path: '/employee/payroll/e-s-i' }
    ]
  },
  {
    label: 'Performance',
    icon: navIcons.Performance,
    items: [
      { label: 'Goals', path: '/employee/performance/goals' },
      { label: 'KPI', path: '/employee/performance/k-p-i' },
      { label: 'Appraisals', path: '/employee/performance/appraisals' },
      { label: 'Feedback', path: '/employee/performance/feedback' },
      { label: 'Achievements', path: '/employee/performance/achievements' }
    ]
  },
  {
    label: 'Learning',
    icon: navIcons.Learning,
    items: [
      { label: 'Courses', path: '/employee/learning/courses' },
      { label: 'Certifications', path: '/employee/learning/learning-certifications' },
      { label: 'Training Calendar', path: '/employee/learning/training-calendar' },
      { label: 'Assessments', path: '/employee/learning/assessments' }
    ]
  },
  {
    label: 'Assets',
    icon: navIcons.Assets,
    items: [
      { label: 'Assigned Assets', path: '/employee/assets/assigned-assets' },
      { label: 'Laptop', path: '/employee/assets/laptop' },
      { label: 'Mobile', path: '/employee/assets/mobile' },
      { label: 'Accessories', path: '/employee/assets/accessories' },
      { label: 'Asset Requests', path: '/employee/assets/asset-requests' }
    ]
  },
  {
    label: 'Travel',
    icon: navIcons.Travel || navIcons.Dashboard,
    items: [
      { label: 'Travel Requests', path: '/employee/travel/travel-requests' },
      { label: 'Expense Claims', path: '/employee/travel/expense-claims' },
      { label: 'Reimbursements', path: '/employee/travel/travel-reimbursements' }
    ]
  },
  {
    label: 'Notifications',
    icon: navIcons.Notifications || navIcons.Dashboard,
    items: [
      { label: 'Inbox', path: '/employee/notifications/inbox' },
      { label: 'Alerts', path: '/employee/notifications/alerts' },
      { label: 'HR Announcements', path: '/employee/notifications/h-r-announcements' }
    ]
  },
  {
    label: 'Help Desk',
    icon: navIcons['Help Desk'] || navIcons.Dashboard,
    items: [
      { label: 'Support Tickets', path: '/employee/helpdesk/support-tickets' },
      { label: 'IT Requests', path: '/employee/helpdesk/i-t-requests' },
      { label: 'HR Requests', path: '/employee/helpdesk/h-r-requests' },
      { label: 'FAQs', path: '/employee/helpdesk/f-a-qs' }
    ]
  },
  {
    label: 'Settings',
    icon: navIcons.Settings,
    items: [
      { label: 'Profile Settings', path: '/employee/settings/profile-settings' },
      { label: 'Password', path: '/employee/settings/password' },
      { label: 'Security', path: '/employee/settings/security' },
      { label: 'Two Factor Authentication', path: '/employee/settings/two-factor-authentication' },
      { label: 'Notification Preferences', path: '/employee/settings/notification-preferences' }
    ]
  },
`;

content = content.replace('const navGroups = [', 'const navGroups = [\n' + employeeGroups);

// Add missing icons to navIcons
const missingIcons = `
  'Team Chat': 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
  Documents: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  Travel: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
  Notifications: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  'Help Desk': 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
`;
content = content.replace('const navIcons = {', 'const navIcons = {' + missingIcons);

fs.writeFileSync(sidebarPath, content);
console.log('Sidebar patched successfully.');
