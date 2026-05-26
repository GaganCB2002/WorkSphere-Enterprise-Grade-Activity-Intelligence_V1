import React, { useState } from 'react';
import { QaShell } from './layout/QaShell';
import { DashboardOverview } from './pages/DashboardOverview';
import { DefectManagement } from './pages/DefectManagement';
import { TeamManagement } from './pages/TeamManagement';
import { ProjectManagement } from './pages/ProjectManagement';
import { SprintPlanning } from './pages/SprintPlanning';
import { Attendance } from './pages/Attendance';
import { LeaveManagement } from './pages/LeaveManagement';
import { Meetings } from './pages/Meetings';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { Approvals } from './pages/Approvals';
import { PerformanceReviews } from './pages/PerformanceReviews';
import { TeamChat } from './pages/TeamChat';
import { Notifications } from './pages/Notifications';
import { AIAssistant } from './pages/AIAssistant';
import { Settings } from './pages/Settings';

interface QaEngineerModuleProps {
  user?: any;
}

export const QaEngineerModule: React.FC<QaEngineerModuleProps> = ({ user }) => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardOverview />;
      case 'team-management': return <TeamManagement />;
      case 'project-management': return <ProjectManagement />;
      case 'task-board': return <DefectManagement />;
      case 'sprint-planning': return <SprintPlanning />;
      case 'attendance': return <Attendance />;
      case 'leave-management': return <LeaveManagement />;
      case 'meetings': return <Meetings />;
      case 'reports': return <ReportsAnalytics />;
      case 'approvals': return <Approvals />;
      case 'performance': return <PerformanceReviews />;
      case 'chat': return <TeamChat />;
      case 'notifications': return <Notifications />;
      case 'ai-assistant': return <AIAssistant />;
      case 'settings': return <Settings />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <QaShell activeView={activeView} setActiveView={setActiveView} user={user}>
      {renderActiveView()}
    </QaShell>
  );
};

export default QaEngineerModule;
