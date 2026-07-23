import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoadingFallback = () => (
  <div className="space-y-4 animate-pulse p-6">
    <div className="h-8 skeleton w-48" />
    <div className="h-4 skeleton w-96" />
    <div className="grid grid-cols-4 gap-4 mt-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 skeleton rounded-lg" />
      ))}
    </div>
    <div className="h-64 skeleton rounded-lg mt-4" />
  </div>
);

const Dashboard = React.lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const LiveDashboard = React.lazy(() => import('./pages/LiveDashboard').then(m => ({ default: m.LiveDashboard })));
const EngineeringOverview = React.lazy(() => import('./pages/EngineeringOverview').then(m => ({ default: m.EngineeringOverview })));
const TeamMembers = React.lazy(() => import('./pages/TeamMembers').then(m => ({ default: m.TeamMembers })));
const TeamAvailability = React.lazy(() => import('./pages/TeamAvailability').then(m => ({ default: m.TeamAvailability })));
const Workload = React.lazy(() => import('./pages/Workload').then(m => ({ default: m.Workload })));
const TeamPerformance = React.lazy(() => import('./pages/TeamPerformance').then(m => ({ default: m.TeamPerformance })));
const SprintBoard = React.lazy(() => import('./pages/SprintBoard').then(m => ({ default: m.SprintBoard })));
const Backlog = React.lazy(() => import('./pages/Backlog').then(m => ({ default: m.Backlog })));
const ActiveSprint = React.lazy(() => import('./pages/ActiveSprint').then(m => ({ default: m.ActiveSprint })));
const SprintReports = React.lazy(() => import('./pages/SprintReports').then(m => ({ default: m.SprintReports })));
const KanbanBoard = React.lazy(() => import('./pages/KanbanBoard').then(m => ({ default: m.KanbanBoard })));
const AssignedTasks = React.lazy(() => import('./pages/AssignedTasks').then(m => ({ default: m.AssignedTasks })));
const BugTracking = React.lazy(() => import('./pages/BugTracking').then(m => ({ default: m.BugTracking })));
const FeatureRequests = React.lazy(() => import('./pages/FeatureRequests').then(m => ({ default: m.FeatureRequests })));
const ActiveProjects = React.lazy(() => import('./pages/ActiveProjects').then(m => ({ default: m.ActiveProjects })));
const Roadmap = React.lazy(() => import('./pages/Roadmap').then(m => ({ default: m.Roadmap })));
const Milestones = React.lazy(() => import('./pages/Milestones').then(m => ({ default: m.Milestones })));
const Releases = React.lazy(() => import('./pages/Releases').then(m => ({ default: m.Releases })));
const GitRepositories = React.lazy(() => import('./pages/GitRepositories').then(m => ({ default: m.GitRepositories })));
const PullRequests = React.lazy(() => import('./pages/PullRequests').then(m => ({ default: m.PullRequests })));
const MergeRequests = React.lazy(() => import('./pages/MergeRequests').then(m => ({ default: m.MergeRequests })));
const CodeReviews = React.lazy(() => import('./pages/CodeReviewsNew').then(m => ({ default: m.CodeReviewsNew })));
const BranchManagement = React.lazy(() => import('./pages/BranchManagement').then(m => ({ default: m.BranchManagement })));
const BuildPipeline = React.lazy(() => import('./pages/BuildPipeline').then(m => ({ default: m.BuildPipeline })));
const Deployments = React.lazy(() => import('./pages/Deployments').then(m => ({ default: m.Deployments })));
const ReleaseHistory = React.lazy(() => import('./pages/ReleaseHistory').then(m => ({ default: m.ReleaseHistory })));
const BuildLogs = React.lazy(() => import('./pages/BuildLogs').then(m => ({ default: m.BuildLogs })));
const Servers = React.lazy(() => import('./pages/Servers').then(m => ({ default: m.Servers })));
const Kubernetes = React.lazy(() => import('./pages/Kubernetes').then(m => ({ default: m.Kubernetes })));
const Docker = React.lazy(() => import('./pages/Docker').then(m => ({ default: m.Docker })));
const CloudResources = React.lazy(() => import('./pages/CloudResources').then(m => ({ default: m.CloudResources })));
const Velocity = React.lazy(() => import('./pages/Velocity').then(m => ({ default: m.Velocity })));
const Burndown = React.lazy(() => import('./pages/Burndown').then(m => ({ default: m.Burndown })));
const Productivity = React.lazy(() => import('./pages/Productivity').then(m => ({ default: m.Productivity })));
const CodeQuality = React.lazy(() => import('./pages/CodeQuality').then(m => ({ default: m.CodeQuality })));
const EngineeringAI = React.lazy(() => import('./pages/EngineeringAI').then(m => ({ default: m.EngineeringAI })));
const CodeGenerator = React.lazy(() => import('./pages/CodeGenerator').then(m => ({ default: m.CodeGenerator })));
const SQLGenerator = React.lazy(() => import('./pages/SQLGenerator').then(m => ({ default: m.SQLGenerator })));
const DocumentationAI = React.lazy(() => import('./pages/DocumentationAI').then(m => ({ default: m.DocumentationAI })));
const APIDocs = React.lazy(() => import('./pages/APIDocs').then(m => ({ default: m.APIDocs })));
const TechnicalDocs = React.lazy(() => import('./pages/TechnicalDocs').then(m => ({ default: m.TechnicalDocs })));
const Architecture = React.lazy(() => import('./pages/Architecture').then(m => ({ default: m.Architecture })));
const DailyStandup = React.lazy(() => import('./pages/DailyStandup').then(m => ({ default: m.DailyStandup })));
const SprintPlanning = React.lazy(() => import('./pages/SprintPlanning').then(m => ({ default: m.SprintPlanning })));
const Retrospective = React.lazy(() => import('./pages/Retrospective').then(m => ({ default: m.Retrospective })));
const TeamCalendar = React.lazy(() => import('./pages/TeamCalendar').then(m => ({ default: m.TeamCalendar })));
const ChatDirect = React.lazy(() => import('./pages/ChatDirect').then(m => ({ default: m.ChatDirect })));
const ChatTeam = React.lazy(() => import('./pages/ChatTeam').then(m => ({ default: m.ChatTeam })));
const ChatProjects = React.lazy(() => import('./pages/ChatProjects').then(m => ({ default: m.ChatProjects })));
const ChatVoice = React.lazy(() => import('./pages/ChatVoice').then(m => ({ default: m.ChatVoice })));
const ChatVideo = React.lazy(() => import('./pages/ChatVideo').then(m => ({ default: m.ChatVideo })));
const ServerHealth = React.lazy(() => import('./pages/ServerHealth').then(m => ({ default: m.ServerHealth })));
const APIHealth = React.lazy(() => import('./pages/APIHealth').then(m => ({ default: m.APIHealth })));
const DatabaseMonitoring = React.lazy(() => import('./pages/DatabaseMonitoring').then(m => ({ default: m.DatabaseMonitoring })));
const Logs = React.lazy(() => import('./pages/Logs').then(m => ({ default: m.Logs })));
const AlertsPage = React.lazy(() => import('./pages/AlertsPage').then(m => ({ default: m.AlertsPage })));
const ReportSprints = React.lazy(() => import('./pages/ReportSprints').then(m => ({ default: m.ReportSprints })));
const ReportTeam = React.lazy(() => import('./pages/ReportTeam').then(m => ({ default: m.ReportTeam })));
const ReportProjects = React.lazy(() => import('./pages/ReportProjects').then(m => ({ default: m.ReportProjects })));
const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage').then(m => ({ default: m.NotificationsPage })));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })));

export const TechLeadRouter = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="live" element={<LiveDashboard />} />
          <Route path="engineering" element={<EngineeringOverview />} />
          <Route path="team/members" element={<TeamMembers />} />
          <Route path="team/availability" element={<TeamAvailability />} />
          <Route path="team/workload" element={<Workload />} />
          <Route path="team/performance" element={<TeamPerformance />} />
          <Route path="sprints/board" element={<SprintBoard />} />
          <Route path="sprints/backlog" element={<Backlog />} />
          <Route path="sprints/active" element={<ActiveSprint />} />
          <Route path="sprints/reports" element={<SprintReports />} />
          <Route path="tasks/kanban" element={<KanbanBoard />} />
          <Route path="tasks/assigned" element={<AssignedTasks />} />
          <Route path="tasks/bugs" element={<BugTracking />} />
          <Route path="tasks/features" element={<FeatureRequests />} />
          <Route path="projects" element={<ActiveProjects />} />
          <Route path="projects/roadmap" element={<Roadmap />} />
          <Route path="projects/milestones" element={<Milestones />} />
          <Route path="projects/releases" element={<Releases />} />
          <Route path="code/repositories" element={<GitRepositories />} />
          <Route path="code/pull-requests" element={<PullRequests />} />
          <Route path="code/merge-requests" element={<MergeRequests />} />
          <Route path="code/reviews" element={<CodeReviews />} />
          <Route path="code/branches" element={<BranchManagement />} />
          <Route path="cicd/pipeline" element={<BuildPipeline />} />
          <Route path="cicd/deployments" element={<Deployments />} />
          <Route path="cicd/releases" element={<ReleaseHistory />} />
          <Route path="cicd/build-logs" element={<BuildLogs />} />
          <Route path="infra/servers" element={<Servers />} />
          <Route path="infra/kubernetes" element={<Kubernetes />} />
          <Route path="infra/docker" element={<Docker />} />
          <Route path="infra/cloud" element={<CloudResources />} />
          <Route path="analytics/velocity" element={<Velocity />} />
          <Route path="analytics/burndown" element={<Burndown />} />
          <Route path="analytics/productivity" element={<Productivity />} />
          <Route path="analytics/code-quality" element={<CodeQuality />} />
          <Route path="ai/engineering" element={<EngineeringAI />} />
          <Route path="ai/code-generator" element={<CodeGenerator />} />
          <Route path="ai/sql-generator" element={<SQLGenerator />} />
          <Route path="ai/documentation" element={<DocumentationAI />} />
          <Route path="docs/api" element={<APIDocs />} />
          <Route path="docs/technical" element={<TechnicalDocs />} />
          <Route path="docs/architecture" element={<Architecture />} />
          <Route path="meetings/standup" element={<DailyStandup />} />
          <Route path="meetings/planning" element={<SprintPlanning />} />
          <Route path="meetings/retro" element={<Retrospective />} />
          <Route path="meetings/calendar" element={<TeamCalendar />} />
          <Route path="chat/direct" element={<ChatDirect />} />
          <Route path="chat/team" element={<ChatTeam />} />
          <Route path="chat/projects" element={<ChatProjects />} />
          <Route path="chat/voice" element={<ChatVoice />} />
          <Route path="chat/video" element={<ChatVideo />} />
          <Route path="monitoring/servers" element={<ServerHealth />} />
          <Route path="monitoring/api" element={<APIHealth />} />
          <Route path="monitoring/database" element={<DatabaseMonitoring />} />
          <Route path="monitoring/logs" element={<Logs />} />
          <Route path="monitoring/alerts" element={<AlertsPage />} />
          <Route path="reports/sprints" element={<ReportSprints />} />
          <Route path="reports/team" element={<ReportTeam />} />
          <Route path="reports/projects" element={<ReportProjects />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </Suspense>
    </motion.div>
  );
};
