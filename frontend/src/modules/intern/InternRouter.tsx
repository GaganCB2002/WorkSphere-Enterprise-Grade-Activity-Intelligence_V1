import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EnterpriseShell from '../../components/layout/EnterpriseShell/EnterpriseShell';

// Dashboard
const InternDashboardPage = React.lazy(() => import('./pages/InternDashboardPage'));

// Profile
const PersonalInformation = React.lazy(() => import('./pages/profile/PersonalInformation'));
const InternshipDetails = React.lazy(() => import('./pages/profile/InternshipDetails'));
const ContactInformation = React.lazy(() => import('./pages/profile/ContactInformation'));
const EmergencyContacts = React.lazy(() => import('./pages/profile/EmergencyContacts'));
const ProfileDocuments = React.lazy(() => import('./pages/profile/ProfileDocuments'));
const BankDetails = React.lazy(() => import('./pages/profile/BankDetails'));

// Attendance
const ClockIn = React.lazy(() => import('./pages/attendance/ClockIn'));
const ClockOut = React.lazy(() => import('./pages/attendance/ClockOut'));
const AttendanceCalendar = React.lazy(() => import('./pages/attendance/AttendanceCalendar'));
const AttendanceHistory = React.lazy(() => import('./pages/attendance/AttendanceHistory'));
const WorkHours = React.lazy(() => import('./pages/attendance/WorkHours'));

// Leave
const ApplyLeave = React.lazy(() => import('./pages/leave/ApplyLeave'));
const LeaveBalance = React.lazy(() => import('./pages/leave/LeaveBalance'));
const LeaveHistory = React.lazy(() => import('./pages/leave/LeaveHistory'));
const HolidayCalendar = React.lazy(() => import('./pages/leave/HolidayCalendar'));

// Learning Center
const Courses = React.lazy(() => import('./pages/learning/Courses'));
const LearningPaths = React.lazy(() => import('./pages/learning/LearningPaths'));
const LearningCertifications = React.lazy(() => import('./pages/learning/Certifications'));
const Assessments = React.lazy(() => import('./pages/learning/Assessments'));
const Quizzes = React.lazy(() => import('./pages/learning/Quizzes'));
const ProgressTracking = React.lazy(() => import('./pages/learning/ProgressTracking'));

// Tasks
const AssignedTasks = React.lazy(() => import('./pages/tasks/AssignedTasks'));
const MyTasks = React.lazy(() => import('./pages/tasks/MyTasks'));
const TaskBoard = React.lazy(() => import('./pages/tasks/TaskBoard'));
const CompletedTasks = React.lazy(() => import('./pages/tasks/CompletedTasks'));
const PendingTasks = React.lazy(() => import('./pages/tasks/PendingTasks'));

// Projects
const AssignedProjects = React.lazy(() => import('./pages/projects/AssignedProjects'));
const ProjectTimeline = React.lazy(() => import('./pages/projects/ProjectTimeline'));
const ProjectSprintBoard = React.lazy(() => import('./pages/projects/SprintBoard'));
const ProjectFiles = React.lazy(() => import('./pages/projects/ProjectFiles'));

// Mentorship
const MentorProfile = React.lazy(() => import('./pages/mentor/MentorProfile'));
const MentorMeetings = React.lazy(() => import('./pages/mentor/Meetings'));
const MentorFeedback = React.lazy(() => import('./pages/mentor/Feedback'));
const MentorSessions = React.lazy(() => import('./pages/mentor/Sessions'));

// Knowledge Base
const CompanyPolicies = React.lazy(() => import('./pages/knowledge/Policies'));
const Documentation = React.lazy(() => import('./pages/knowledge/Documentation'));
const CodingStandards = React.lazy(() => import('./pages/knowledge/CodingStandards'));
const SOPs = React.lazy(() => import('./pages/knowledge/SOPs'));

// Documents
const OfferLetter = React.lazy(() => import('./pages/documents/OfferLetter'));
const InternshipLetter = React.lazy(() => import('./pages/documents/InternshipLetter'));
const CompletionCertificate = React.lazy(() => import('./pages/documents/CompletionCertificate'));
const HrDocuments = React.lazy(() => import('./pages/documents/HRDocuments'));
const DocumentsPolicies = React.lazy(() => import('./pages/documents/DocumentsPolicies'));

// Performance
const Goals = React.lazy(() => import('./pages/performance/Goals'));
const WeeklyReviews = React.lazy(() => import('./pages/performance/WeeklyReviews'));
const MonthlyReviews = React.lazy(() => import('./pages/performance/MonthlyReviews'));
const FinalEvaluation = React.lazy(() => import('./pages/performance/FinalEvaluation'));

// Team
const TeamMembers = React.lazy(() => import('./pages/team/TeamMembers'));
const OrganizationChart = React.lazy(() => import('./pages/team/OrganizationChart'));
const Directory = React.lazy(() => import('./pages/team/Directory'));

// Communication
const TeamChat = React.lazy(() => import('./pages/chat/TeamChat'));
const DirectMessages = React.lazy(() => import('./pages/chat/DirectMessages'));
const Announcements = React.lazy(() => import('./pages/chat/Announcements'));
const WebmailPage = React.lazy(() => import('./pages/chat/WebmailPage'));

// Meetings
const MeetingCalendar = React.lazy(() => import('./pages/meetings/Calendar'));
const SchedulePage = React.lazy(() => import('./pages/meetings/SchedulePage'));
const MeetingNotes = React.lazy(() => import('./pages/meetings/MeetingNotes'));

// Help Desk
const ITSupport = React.lazy(() => import('./pages/helpdesk/ITSupport'));
const HRSupport = React.lazy(() => import('./pages/helpdesk/HRSupport'));
const RaiseTicket = React.lazy(() => import('./pages/helpdesk/RaiseTicket'));

// Notifications
const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage'));

// Reports
const AttendanceReport = React.lazy(() => import('./pages/reports/AttendanceReport'));
const LearningReport = React.lazy(() => import('./pages/reports/LearningReport'));
const TaskReport = React.lazy(() => import('./pages/reports/TaskReport'));
const PerformanceReport = React.lazy(() => import('./pages/reports/PerformanceReport'));

// Settings
const ProfileSettings = React.lazy(() => import('./pages/settings/ProfileSettings'));
const Security = React.lazy(() => import('./pages/settings/Security'));
const Password = React.lazy(() => import('./pages/settings/Password'));
const NotificationPreferences = React.lazy(() => import('./pages/settings/NotificationPreferences'));

const FallbackLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-[3px] border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="text-[11px] font-bold text-slate-500 tracking-widest uppercase">Loading...</span>
    </div>
  </div>
);

const InternRouter: React.FC = () => {
  return (
    <EnterpriseShell>
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<InternDashboardPage />} />

          {/* Profile */}
          <Route path="profile/personal" element={<PersonalInformation />} />
          <Route path="profile/internship" element={<InternshipDetails />} />
          <Route path="profile/contact" element={<ContactInformation />} />
          <Route path="profile/emergency" element={<EmergencyContacts />} />
          <Route path="profile/documents" element={<ProfileDocuments />} />
          <Route path="profile/bank" element={<BankDetails />} />

          {/* Attendance */}
          <Route path="attendance/clock-in" element={<ClockIn />} />
          <Route path="attendance/clock-out" element={<ClockOut />} />
          <Route path="attendance/calendar" element={<AttendanceCalendar />} />
          <Route path="attendance/history" element={<AttendanceHistory />} />
          <Route path="attendance/work-hours" element={<WorkHours />} />

          {/* Leave */}
          <Route path="leave/apply" element={<ApplyLeave />} />
          <Route path="leave/balance" element={<LeaveBalance />} />
          <Route path="leave/history" element={<LeaveHistory />} />
          <Route path="leave/holidays" element={<HolidayCalendar />} />

          {/* Learning Center */}
          <Route path="learning/courses" element={<Courses />} />
          <Route path="learning/paths" element={<LearningPaths />} />
          <Route path="learning/certifications" element={<LearningCertifications />} />
          <Route path="learning/assessments" element={<Assessments />} />
          <Route path="learning/quizzes" element={<Quizzes />} />
          <Route path="learning/progress" element={<ProgressTracking />} />

          {/* Tasks */}
          <Route path="tasks/assigned" element={<AssignedTasks />} />
          <Route path="tasks/my" element={<MyTasks />} />
          <Route path="tasks/board" element={<TaskBoard />} />
          <Route path="tasks/completed" element={<CompletedTasks />} />
          <Route path="tasks/pending" element={<PendingTasks />} />

          {/* Projects */}
          <Route path="projects/assigned" element={<AssignedProjects />} />
          <Route path="projects/timeline" element={<ProjectTimeline />} />
          <Route path="projects/sprint-board" element={<ProjectSprintBoard />} />
          <Route path="projects/files" element={<ProjectFiles />} />

          {/* Mentorship */}
          <Route path="mentor/profile" element={<MentorProfile />} />
          <Route path="mentor/meetings" element={<MentorMeetings />} />
          <Route path="mentor/feedback" element={<MentorFeedback />} />
          <Route path="mentor/sessions" element={<MentorSessions />} />

          {/* Knowledge Base */}
          <Route path="knowledge/policies" element={<CompanyPolicies />} />
          <Route path="knowledge/docs" element={<Documentation />} />
          <Route path="knowledge/standards" element={<CodingStandards />} />
          <Route path="knowledge/sops" element={<SOPs />} />

          {/* Documents */}
          <Route path="documents/offer-letter" element={<OfferLetter />} />
          <Route path="documents/internship-letter" element={<InternshipLetter />} />
          <Route path="documents/completion" element={<CompletionCertificate />} />
          <Route path="documents/hr" element={<HrDocuments />} />
          <Route path="documents/policies" element={<DocumentsPolicies />} />

          {/* Performance */}
          <Route path="performance/goals" element={<Goals />} />
          <Route path="performance/weekly" element={<WeeklyReviews />} />
          <Route path="performance/monthly" element={<MonthlyReviews />} />
          <Route path="performance/final" element={<FinalEvaluation />} />

          {/* Team */}
          <Route path="team/members" element={<TeamMembers />} />
          <Route path="team/org-chart" element={<OrganizationChart />} />
          <Route path="team/directory" element={<Directory />} />

          {/* Communication */}
          <Route path="chat/team" element={<TeamChat />} />
          <Route path="chat/direct" element={<DirectMessages />} />
          <Route path="chat/announcements" element={<Announcements />} />
          <Route path="chat/webmail" element={<WebmailPage />} />

          {/* Meetings */}
          <Route path="meetings/calendar" element={<MeetingCalendar />} />
          <Route path="meetings/schedule" element={<SchedulePage />} />
          <Route path="meetings/notes" element={<MeetingNotes />} />

          {/* Help Desk */}
          <Route path="helpdesk/it" element={<ITSupport />} />
          <Route path="helpdesk/hr" element={<HRSupport />} />
          <Route path="helpdesk/ticket" element={<RaiseTicket />} />

          {/* Notifications */}
          <Route path="notifications" element={<NotificationsPage />} />

          {/* Reports */}
          <Route path="reports/attendance" element={<AttendanceReport />} />
          <Route path="reports/learning" element={<LearningReport />} />
          <Route path="reports/tasks" element={<TaskReport />} />
          <Route path="reports/performance" element={<PerformanceReport />} />

          {/* Settings */}
          <Route path="settings/profile" element={<ProfileSettings />} />
          <Route path="settings/security" element={<Security />} />
          <Route path="settings/password" element={<Password />} />
          <Route path="settings/notifications" element={<NotificationPreferences />} />

          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">404 - Not Found</h2>
              <p className="text-sm text-slate-500">The requested intern module page does not exist.</p>
            </div>
          } />
        </Routes>
      </Suspense>
    </EnterpriseShell>
  );
};

export default InternRouter;
