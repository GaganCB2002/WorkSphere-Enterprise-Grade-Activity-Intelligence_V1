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
const MyWork = React.lazy(() => import('./pages/MyWork').then(m => ({ default: m.MyWork })));
const MyTasks = React.lazy(() => import('./pages/MyTasks').then(m => ({ default: m.MyTasks })));
const SprintBoard = React.lazy(() => import('./pages/SprintBoard').then(m => ({ default: m.SprintBoard })));
const KanbanBoard = React.lazy(() => import('./pages/KanbanBoard').then(m => ({ default: m.KanbanBoard })));
const Backlog = React.lazy(() => import('./pages/Backlog').then(m => ({ default: m.Backlog })));
const AssignedBugs = React.lazy(() => import('./pages/AssignedBugs').then(m => ({ default: m.AssignedBugs })));
const FeatureRequests = React.lazy(() => import('./pages/FeatureRequests').then(m => ({ default: m.FeatureRequests })));
const CodeReviews = React.lazy(() => import('./pages/CodeReviews').then(m => ({ default: m.CodeReviews })));
const PullRequests = React.lazy(() => import('./pages/PullRequests').then(m => ({ default: m.PullRequests })));
const Repositories = React.lazy(() => import('./pages/Repositories').then(m => ({ default: m.Repositories })));
const Branches = React.lazy(() => import('./pages/Branches').then(m => ({ default: m.Branches })));
const Commits = React.lazy(() => import('./pages/Commits').then(m => ({ default: m.Commits })));
const CicdPipelines = React.lazy(() => import('./pages/CicdPipelines').then(m => ({ default: m.CicdPipelines })));
const Deployments = React.lazy(() => import('./pages/Deployments').then(m => ({ default: m.Deployments })));
const BuildHistory = React.lazy(() => import('./pages/BuildHistory').then(m => ({ default: m.BuildHistory })));
const UnitTests = React.lazy(() => import('./pages/UnitTests').then(m => ({ default: m.UnitTests })));
const IntegrationTests = React.lazy(() => import('./pages/IntegrationTests').then(m => ({ default: m.IntegrationTests })));
const E2ETests = React.lazy(() => import('./pages/E2ETests').then(m => ({ default: m.E2ETests })));
const ApiTesting = React.lazy(() => import('./pages/ApiTesting').then(m => ({ default: m.ApiTesting })));
const CodeQuality = React.lazy(() => import('./pages/CodeQuality').then(m => ({ default: m.CodeQuality })));
const SonarQube = React.lazy(() => import('./pages/SonarQube').then(m => ({ default: m.SonarQube })));
const CodeCoverage = React.lazy(() => import('./pages/CodeCoverage').then(m => ({ default: m.CodeCoverage })));
const TechnicalDebt = React.lazy(() => import('./pages/TechnicalDebt').then(m => ({ default: m.TechnicalDebt })));
const Performance = React.lazy(() => import('./pages/Performance').then(m => ({ default: m.Performance })));
const ApiDocumentation = React.lazy(() => import('./pages/ApiDocumentation').then(m => ({ default: m.ApiDocumentation })));
const ArchitectureDocs = React.lazy(() => import('./pages/ArchitectureDocs').then(m => ({ default: m.ArchitectureDocs })));
const KnowledgeBase = React.lazy(() => import('./pages/KnowledgeBase').then(m => ({ default: m.KnowledgeBase })));
const AiAssistant = React.lazy(() => import('./pages/AiAssistant').then(m => ({ default: m.AiAssistant })));
const TeamChat = React.lazy(() => import('./pages/TeamChat').then(m => ({ default: m.TeamChat })));
const DirectMessages = React.lazy(() => import('./pages/DirectMessages').then(m => ({ default: m.DirectMessages })));
const Announcements = React.lazy(() => import('./pages/Announcements').then(m => ({ default: m.Announcements })));
const Meetings = React.lazy(() => import('./pages/Meetings').then(m => ({ default: m.Meetings })));
const Calendar = React.lazy(() => import('./pages/Calendar').then(m => ({ default: m.Calendar })));
const Reports = React.lazy(() => import('./pages/Reports').then(m => ({ default: m.Reports })));
const Settings = React.lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const LiveEngineeringData = React.lazy(() => import('./pages/LiveEngineeringData').then(m => ({ default: m.LiveEngineeringData })));
const ActivityFeed = React.lazy(() => import('./pages/ActivityFeed').then(m => ({ default: m.ActivityFeed })));
const Charts = React.lazy(() => import('./pages/Charts').then(m => ({ default: m.Charts })));
const Search = React.lazy(() => import('./pages/Search').then(m => ({ default: m.Search })));
const Notifications = React.lazy(() => import('./pages/Notifications').then(m => ({ default: m.Notifications })));

export default function SoftwareEngineerRouter() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-work" element={<MyWork />} />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="sprint-board" element={<SprintBoard />} />
          <Route path="kanban" element={<KanbanBoard />} />
          <Route path="backlog" element={<Backlog />} />
          <Route path="bugs" element={<AssignedBugs />} />
          <Route path="features" element={<FeatureRequests />} />
          <Route path="code-reviews" element={<CodeReviews />} />
          <Route path="pull-requests" element={<PullRequests />} />
          <Route path="repositories" element={<Repositories />} />
          <Route path="branches" element={<Branches />} />
          <Route path="commits" element={<Commits />} />
          <Route path="cicd" element={<CicdPipelines />} />
          <Route path="deployments" element={<Deployments />} />
          <Route path="build-history" element={<BuildHistory />} />
          <Route path="tests/unit" element={<UnitTests />} />
          <Route path="tests/integration" element={<IntegrationTests />} />
          <Route path="tests/e2e" element={<E2ETests />} />
          <Route path="tests/api" element={<ApiTesting />} />
          <Route path="code-quality" element={<CodeQuality />} />
          <Route path="sonarqube" element={<SonarQube />} />
          <Route path="code-coverage" element={<CodeCoverage />} />
          <Route path="technical-debt" element={<TechnicalDebt />} />
          <Route path="performance" element={<Performance />} />
          <Route path="docs/api" element={<ApiDocumentation />} />
          <Route path="docs/architecture" element={<ArchitectureDocs />} />
          <Route path="docs/knowledge-base" element={<KnowledgeBase />} />
          <Route path="ai-assistant" element={<AiAssistant />} />
          <Route path="chat/team" element={<TeamChat />} />
          <Route path="chat/direct" element={<DirectMessages />} />
          <Route path="chat/announcements" element={<Announcements />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="live" element={<LiveEngineeringData />} />
          <Route path="activity" element={<ActivityFeed />} />
          <Route path="charts" element={<Charts />} />
          <Route path="search" element={<Search />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </motion.div>
  );
};
