// @ts-nocheck
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CtoLayout } from './layout/CtoLayout';

// Lazy loading pages
const CtoOverview = React.lazy(() => import('./pages/CtoOverview').then(m => ({ default: m.CtoOverview })));
const CtoArchitecture = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoRepositories = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoDeployments = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoInfrastructure = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoCloudResources = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoMicroservices = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoCiCd = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoIncidents = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoMonitoring = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoSecurityCenter = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoPerformance = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoAiAssistant = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoReports = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoAuditLogs = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));
const CtoSettings = React.lazy(() => import('./pages/CtoPlaceholder').then(m => ({ default: m.CtoPlaceholder })));

const FallbackLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-[3px] border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="text-[11px] font-bold text-slate-500 tracking-widest uppercase">Loading Application...</span>
    </div>
  </div>
);

export const CtoModule: React.FC<{ user: any }> = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<CtoLayout user={user} />}>
        <Route index element={<Navigate to="overview" replace />} />
        
        <Route path="overview" element={<Suspense fallback={<FallbackLoader />}><CtoOverview /></Suspense>} />
        <Route path="architecture" element={<Suspense fallback={<FallbackLoader />}><CtoArchitecture title="Architecture" /></Suspense>} />
        <Route path="repositories" element={<Suspense fallback={<FallbackLoader />}><CtoRepositories title="Repositories" /></Suspense>} />
        <Route path="deployments" element={<Suspense fallback={<FallbackLoader />}><CtoDeployments title="Deployments" /></Suspense>} />
        <Route path="infrastructure" element={<Suspense fallback={<FallbackLoader />}><CtoInfrastructure title="Infrastructure" /></Suspense>} />
        <Route path="cloud" element={<Suspense fallback={<FallbackLoader />}><CtoCloudResources title="Cloud Resources" /></Suspense>} />
        <Route path="microservices" element={<Suspense fallback={<FallbackLoader />}><CtoMicroservices title="Microservices" /></Suspense>} />
        <Route path="cicd" element={<Suspense fallback={<FallbackLoader />}><CtoCiCd title="CI/CD" /></Suspense>} />
        <Route path="incidents" element={<Suspense fallback={<FallbackLoader />}><CtoIncidents title="Incidents" /></Suspense>} />
        <Route path="monitoring" element={<Suspense fallback={<FallbackLoader />}><CtoMonitoring title="Monitoring" /></Suspense>} />
        <Route path="security" element={<Suspense fallback={<FallbackLoader />}><CtoSecurityCenter title="Security Center" /></Suspense>} />
        <Route path="performance" element={<Suspense fallback={<FallbackLoader />}><CtoPerformance title="Performance" /></Suspense>} />
        <Route path="ai" element={<Suspense fallback={<FallbackLoader />}><CtoAiAssistant title="AI Assistant" /></Suspense>} />
        <Route path="reports" element={<Suspense fallback={<FallbackLoader />}><CtoReports title="Reports" /></Suspense>} />
        <Route path="audit" element={<Suspense fallback={<FallbackLoader />}><CtoAuditLogs title="Audit Logs" /></Suspense>} />
        <Route path="settings" element={<Suspense fallback={<FallbackLoader />}><CtoSettings title="Settings" /></Suspense>} />

        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <h2 className="text-xl font-bold text-slate-800 mb-2">404 - Not Found</h2>
            <p className="text-sm text-slate-500">The requested engineering module does not exist.</p>
          </div>
        } />
      </Route>
    </Routes>
  );
};
