import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HrManagerShell } from './layout/HrManagerShell';
import { LMSView } from '../hr/components/LMSView';


// Phase 2, 3, 4 Pages (Lazy Loaded)
const HrOverview = React.lazy(() => import('./pages/HrOverview').then(m => ({ default: m.HrOverview })));
const EmployeeDirectory = React.lazy(() => import('./pages/EmployeeDirectory').then(m => ({ default: m.EmployeeDirectory })));
const RecruitmentPipeline = React.lazy(() => import('./pages/RecruitmentPipeline').then(m => ({ default: m.RecruitmentPipeline })));
const TimeAndLeave = React.lazy(() => import('./pages/TimeAndLeave').then(m => ({ default: m.TimeAndLeave })));
const PayrollManager = React.lazy(() => import('./pages/PayrollManager').then(m => ({ default: m.PayrollManager })));
const PerformanceMatrix = React.lazy(() => import('./pages/PerformanceMatrix').then(m => ({ default: m.PerformanceMatrix })));
const HrCommunications = React.lazy(() => import('./pages/HrCommunications').then(m => ({ default: m.HrCommunications })));
const DocumentVault = React.lazy(() => import('./pages/DocumentVault').then(m => ({ default: m.DocumentVault })));
const HrChatPage = React.lazy(() => import('./pages/HrChatPage').then(m => ({ default: m.HrChatPage })));
const HrWebmailPage = React.lazy(() => import('./pages/HrWebmailPage').then(m => ({ default: m.HrWebmailPage })));
const HrMeetingsPage = React.lazy(() => import('./pages/HrMeetingsPage').then(m => ({ default: m.HrMeetingsPage })));

const FallbackLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const HrManagerModule: React.FC<{ user: any }> = ({ user }) => {
  return (
    <Routes>
      <Route path="/hr" element={<HrManagerShell user={user} />}>
        <Route index element={<Navigate to="/hr/overview" replace />} />
        
        <Route path="overview" element={
          <Suspense fallback={<FallbackLoader />}><HrOverview /></Suspense>
        } />
        
        <Route path="directory" element={
          <Suspense fallback={<FallbackLoader />}><EmployeeDirectory /></Suspense>
        } />
        
        <Route path="recruitment" element={
          <Suspense fallback={<FallbackLoader />}><RecruitmentPipeline /></Suspense>
        } />

        <Route path="time-leave" element={
          <Suspense fallback={<FallbackLoader />}><TimeAndLeave /></Suspense>
        } />

        <Route path="payroll" element={
          <Suspense fallback={<FallbackLoader />}><PayrollManager /></Suspense>
        } />

        <Route path="performance" element={
          <Suspense fallback={<FallbackLoader />}><PerformanceMatrix /></Suspense>
        } />

        <Route path="communications" element={
          <Suspense fallback={<FallbackLoader />}><HrCommunications /></Suspense>
        } />

        <Route path="chat" element={
          <Suspense fallback={<FallbackLoader />}><HrChatPage /></Suspense>
        } />

        <Route path="webmail" element={
          <Suspense fallback={<FallbackLoader />}><HrWebmailPage /></Suspense>
        } />

        <Route path="meetings" element={
          <Suspense fallback={<FallbackLoader />}><HrMeetingsPage /></Suspense>
        } />

        <Route path="documents" element={
          <Suspense fallback={<FallbackLoader />}><DocumentVault /></Suspense>
        } />

        {/* Catch-all for undefined routes in the sidebar */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-full text-[#8b949e]">
            <div className="w-16 h-16 border-2 border-dashed border-[#30363d] rounded-2xl flex items-center justify-center mb-4 text-slate-200 font-mono text-xs">WIP</div>
            <h2 className="text-xl font-bold text-slate-200 mb-1">Module Under Construction</h2>
            <p className="text-sm">This HR operation is currently being mapped to the architecture.</p>
          </div>
        } />
      </Route>
      {/* Redirect / to /hr/overview */}
      <Route path="*" element={<Navigate to="/hr/overview" replace />} />
    </Routes>
  );
};
