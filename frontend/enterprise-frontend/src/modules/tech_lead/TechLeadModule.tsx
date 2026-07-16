import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TechLeadShell } from './layout/TechLeadShell';
import { LMSView } from '../hr/components/LMSView';


// Lazy load pages for performance
const TechOverview = React.lazy(() => import('./pages/TechOverview').then(m => ({ default: m.TechOverview })));
const SprintPlanner = React.lazy(() => import('./pages/SprintPlanner').then(m => ({ default: m.SprintPlanner })));
const TeamManagement = React.lazy(() => import('./pages/TeamManagement').then(m => ({ default: m.TeamManagement })));
const CodeReviews = React.lazy(() => import('./pages/CodeReviews').then(m => ({ default: m.CodeReviews })));
const DevOpsMonitor = React.lazy(() => import('./pages/DevOpsMonitor').then(m => ({ default: m.DevOpsMonitor })));
const EngineeringAnalytics = React.lazy(() => import('./pages/EngineeringAnalytics').then(m => ({ default: m.EngineeringAnalytics })));
const ChatPage = React.lazy(() => import('./pages/ChatPage').then(m => ({ default: m.ChatPage })));
const WebmailPage = React.lazy(() => import('./pages/WebmailPage').then(m => ({ default: m.WebmailPage })));
const MeetingsPage = React.lazy(() => import('./pages/MeetingsPage').then(m => ({ default: m.MeetingsPage })));

interface TechLeadModuleProps {
  user: any;
}

const LoadingSpinner = () => (
  <div className="flex h-full items-center justify-center">
    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const TechLeadModule: React.FC<TechLeadModuleProps> = ({ user }) => {
  return (
    <Routes>
      <Route element={<TechLeadShell user={user} />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<React.Suspense fallback={<LoadingSpinner />}><TechOverview /></React.Suspense>} />
        <Route path="sprints" element={<React.Suspense fallback={<LoadingSpinner />}><SprintPlanner /></React.Suspense>} />
        <Route path="team" element={<React.Suspense fallback={<LoadingSpinner />}><TeamManagement /></React.Suspense>} />
        <Route path="reviews" element={<React.Suspense fallback={<LoadingSpinner />}><CodeReviews /></React.Suspense>} />
        <Route path="devops" element={<React.Suspense fallback={<LoadingSpinner />}><DevOpsMonitor /></React.Suspense>} />
        <Route path="analytics" element={<React.Suspense fallback={<LoadingSpinner />}><EngineeringAnalytics /></React.Suspense>} />
        <Route path="chat" element={<React.Suspense fallback={<LoadingSpinner />}><ChatPage /></React.Suspense>} />
        <Route path="webmail" element={<React.Suspense fallback={<LoadingSpinner />}><WebmailPage /></React.Suspense>} />
        <Route path="meetings" element={<React.Suspense fallback={<LoadingSpinner />}><MeetingsPage /></React.Suspense>} />
      </Route>
    </Routes>
  );
};
