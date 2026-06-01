import React, { useState } from 'react';
import { Bot, X, Sparkles } from 'lucide-react';
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
import { AiDevOpsAssistant } from './components/AiDevOpsAssistant';
import { CloudManagementDashboard } from './components/CloudManagementDashboard';
import { ContainerManagement } from './components/ContainerManagement';
import { DevOpsReports } from './components/DevOpsReports';
import { DevOpsSettings } from './components/DevOpsSettings';
import { LiveTelemetryDashboard } from './components/LiveTelemetryDashboard';
import { ChatPage } from '../../pages/ChatPage';
import { WebmailPage } from '../employee/pages/WebmailPage';
import { WorkerProfileDetails } from './components/WorkerProfileDetails';

export const DevOpsEngineerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

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
          <div className="h-[calc(100vh-12rem)]">
            <ChatPage user={{ id: 'devops-1', name: 'System Admin', email: 'admin@worksphere.ent', role: 'DEVOPS_ENGINEER', department: 'Platform Engineering' }} token="mock-token" />
          </div>
        );
      case 'email':
        return (
          <div className="h-[calc(100vh-12rem)]">
            <WebmailPage />
          </div>
        );
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
        
        {/* Floating AI Assistant Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative flex flex-col items-end">
            {isAIAssistantOpen && (
              <div className="mb-4 w-[90vw] max-w-[800px] bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200">
                <div className="flex justify-between items-center p-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-brand font-bold text-sm px-2">
                    <Sparkles className="w-4 h-4" /> AI DevOps Copilot
                  </div>
                  <button onClick={() => setIsAIAssistantOpen(false)} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="max-h-[75vh] overflow-y-auto custom-scrollbar p-2">
                  <AiDevOpsAssistant />
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 ${isAIAssistantOpen ? 'bg-slate-800 text-white border border-slate-700 scale-90' : 'bg-brand hover:bg-brand-600 text-white hover:scale-110 hover:shadow-brand/50'}`}
            >
              {isAIAssistantOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
              {!isAIAssistantOpen && (
                <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </DevOpsLayout>
  );
};
