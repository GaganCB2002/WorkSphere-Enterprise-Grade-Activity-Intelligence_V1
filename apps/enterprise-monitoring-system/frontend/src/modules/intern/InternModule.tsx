import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { InternShell } from './layout/InternShell';

// Lazy-loaded page components
const InternOverview = React.lazy(() => import('./pages/InternOverview').then(m => ({ default: m.InternOverview })));
const InternProfile = React.lazy(() => import('./pages/InternProfile').then(m => ({ default: m.InternProfile })));
const TaskBoard = React.lazy(() => import('./pages/TaskBoard').then(m => ({ default: m.TaskBoard })));
const LearningHub = React.lazy(() => import('./pages/LearningHub').then(m => ({ default: m.LearningHub })));
const MentorTeam = React.lazy(() => import('./pages/MentorTeam').then(m => ({ default: m.MentorTeam })));
const AttendanceLeave = React.lazy(() => import('./pages/AttendanceLeave').then(m => ({ default: m.AttendanceLeave })));
const ProjectWorkspace = React.lazy(() => import('./pages/ProjectWorkspace').then(m => ({ default: m.ProjectWorkspace })));
const Evaluations = React.lazy(() => import('./pages/Evaluations').then(m => ({ default: m.Evaluations })));
const KnowledgeBase = React.lazy(() => import('./pages/KnowledgeBase').then(m => ({ default: m.KnowledgeBase })));
const InternChat = React.lazy(() => import('./pages/InternChat').then(m => ({ default: m.InternChat })));
const InternSettings = React.lazy(() => import('./pages/InternSettings').then(m => ({ default: m.InternSettings })));

const FallbackLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-[3px] border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs font-medium text-slate-500 tracking-wide">Loading module...</span>
    </div>
  </div>
);

export const InternModule: React.FC<{ user: any }> = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<InternShell user={user} />}>
        <Route index element={<Navigate to="overview" replace />} />
        
        <Route path="overview" element={
          <Suspense fallback={<FallbackLoader />}><InternOverview /></Suspense>
        } />
        <Route path="profile" element={
          <Suspense fallback={<FallbackLoader />}><InternProfile /></Suspense>
        } />
        <Route path="tasks" element={
          <Suspense fallback={<FallbackLoader />}><TaskBoard /></Suspense>
        } />
        <Route path="learning" element={
          <Suspense fallback={<FallbackLoader />}><LearningHub /></Suspense>
        } />
        <Route path="mentor" element={
          <Suspense fallback={<FallbackLoader />}><MentorTeam /></Suspense>
        } />
        <Route path="attendance" element={
          <Suspense fallback={<FallbackLoader />}><AttendanceLeave /></Suspense>
        } />
        <Route path="project" element={
          <Suspense fallback={<FallbackLoader />}><ProjectWorkspace /></Suspense>
        } />
        <Route path="evaluations" element={
          <Suspense fallback={<FallbackLoader />}><Evaluations /></Suspense>
        } />
        <Route path="knowledge" element={
          <Suspense fallback={<FallbackLoader />}><KnowledgeBase /></Suspense>
        } />
        <Route path="chat" element={
          <Suspense fallback={<FallbackLoader />}><InternChat /></Suspense>
        } />
        <Route path="settings" element={
          <Suspense fallback={<FallbackLoader />}><InternSettings /></Suspense>
        } />

        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-full text-[#8b949e]">
            <div className="w-16 h-16 border-2 border-dashed border-[#30363d] rounded-2xl flex items-center justify-center mb-4 text-slate-200 font-mono text-xs">WIP</div>
            <h2 className="text-xl font-bold text-slate-200 mb-1">Module Under Construction</h2>
            <p className="text-sm">This feature is being built for the intern workspace.</p>
          </div>
        } />
      </Route>
    </Routes>
  );
};
