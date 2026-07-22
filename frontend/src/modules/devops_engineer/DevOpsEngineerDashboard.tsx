import React, { useState } from 'react';
import { Bot, X, Sparkles, BookOpen } from 'lucide-react';
import { DevOpsLayout } from './layout/DevOpsLayout';
import { SystemHealthOverview } from './components/SystemHealthOverview';
import { InfrastructureOverview } from './components/InfrastructureOverview';
import { KubernetesCommandCenter } from './components/KubernetesCommandCenter';
import { CicdDashboard } from './components/CicdDashboard';
import { MonitoringCenter } from './components/MonitoringCenter';
import { SecurityOperationsCenter } from './components/SecurityOperationsCenter';
import { IncidentManagement } from './components/IncidentManagement';
import { CloudCostDashboard } from './components/CloudCostDashboard';
import { DatabaseManagement } from './components/DatabaseManagement';

import { CloudManagementDashboard } from './components/CloudManagementDashboard';
import { ContainerManagement } from './components/ContainerManagement';
import { DevOpsReports } from './components/DevOpsReports';
import { DevOpsSettings } from './components/DevOpsSettings';
import { LiveTelemetryDashboard } from './components/LiveTelemetryDashboard';
import { ChatPage } from '../../pages/ChatPage';
import { WebmailPage } from '../employee/pages/WebmailPage';
import { WorkerProfileDetails } from './components/WorkerProfileDetails';

import { useSelector } from 'react-redux';
import { LMSView } from '../hr/components/LMSView';


export const DevOpsEngineerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const { user, token } = useSelector((state: any) => state.auth);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SystemHealthOverview />;
      case 'infrastructure':
        return <InfrastructureOverview />;
      case 'cloud':
        return <CloudManagementDashboard />;
      case 'kubernetes':
        return <KubernetesCommandCenter />;
      case 'containers':
        return <ContainerManagement />;
      case 'cicd':
        return <CicdDashboard />;
      case 'monitoring':
        return <MonitoringCenter />;
      case 'security':
        return <SecurityOperationsCenter />;
      case 'incidents':
        return <IncidentManagement />;
      case 'database':
        return <DatabaseManagement />;
      case 'cost':
        return <CloudCostDashboard />;
      case 'employee':
        return <WorkerProfileDetails />;
      case 'reports':
        return <DevOpsReports />;
      case 'telemetry':
        return <LiveTelemetryDashboard />;
      case 'chat':
        return (
          <div className="h-[calc(100vh-12rem)] dark">
            {user ? (
              <ChatPage user={user} token={token} />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">Authenticating Chat...</div>
            )}
          </div>
        );
      case 'email':
        return (
          <div className="h-[calc(100vh-12rem)]">
            <WebmailPage />
          </div>
        );
      case 'training': return <LMSView />;
      case 'settings':
        return <DevOpsSettings />;
      default:
        return <SystemHealthOverview />;
    }
  };

  return (
    <DevOpsLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-12 pb-24 relative">
        {renderContent()}
      </div>
    </DevOpsLayout>
  );
};
