import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { EngineeringShell } from './layout/EngineeringShell';
import { 
  Overview, TaskBoard, CodeWorkspace, DevOps, 
  FocusSpace, Team, LeaveManagement, BugTracker, Documentation 
} from './pages';
import { LMSView } from '../hr/components/LMSView';


export const SoftwareEngineerDashboard: React.FC = () => {
  return (
    <Routes>
      <Route element={<EngineeringShell />}>
        {/* Default route redirects to overview */}
        <Route index element={<Navigate to="overview" replace />} />
        
        {/* Sub-modules */}
        <Route path="overview" element={<Overview />} />
        <Route path="tasks" element={<TaskBoard />} />
        <Route path="code" element={<CodeWorkspace />} />
        <Route path="devops" element={<DevOps />} />
        <Route path="focus" element={<FocusSpace />} />
        <Route path="team" element={<Team />} />
        <Route path="leave" element={<LeaveManagement />} />
        <Route path="bugs" element={<BugTracker />} />
        <Route path="docs" element={<Documentation />} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
};
