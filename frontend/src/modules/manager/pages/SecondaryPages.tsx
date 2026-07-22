import React from 'react';
import { Construction, Sparkles, Box, FileText, Bell, MessageSquare, Settings, User } from 'lucide-react';

const PagePlaceholder = ({ title, description, icon: Icon }: { title: string, description: string, icon: any }) => (
  <div className="h-full flex flex-col items-center justify-center p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/10">
      <Icon className="w-10 h-10 text-indigo-400" />
    </div>
    <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
    <p className="text-[#8b949e] text-center max-w-md text-sm mb-8 leading-relaxed">
      {description}
    </p>
    <div className="flex items-center gap-2 px-4 py-2 bg-[#12151f] border border-[#1e2231] rounded-xl text-xs font-bold text-slate-400 uppercase tracking-widest">
      <Construction className="w-4 h-4 text-amber-500" />
      Under Development
    </div>
  </div>
);

export const ProjectManagement = () => (
  <PagePlaceholder 
    title="Project Management" 
    description="Track project milestones, allocate budgets, and monitor multi-team strategic initiatives across the enterprise."
    icon={Box}
  />
);

export const AnalyticsReporting = () => (
  <PagePlaceholder 
    title="Advanced Analytics" 
    description="Generate custom reports, visualize cross-departmental KPIs, and export strategic data for executive review."
    icon={Sparkles}
  />
);

export const AIInsights = () => (
  <PagePlaceholder 
    title="AI Workload Insights" 
    description="Leverage artificial intelligence to predict burnout risks, optimize task delegation, and forecast team velocity."
    icon={Sparkles}
  />
);

export const ResourceAllocation = () => (
  <PagePlaceholder 
    title="Resource Allocation" 
    description="Balance workloads, assign hardware/software resources, and manage department budgets efficiently."
    icon={Box}
  />
);

export const TeamCommunication = () => (
  <PagePlaceholder 
    title="Team Communication" 
    description="Enterprise secure messaging, team announcements, and cross-functional channel management."
    icon={MessageSquare}
  />
);

export const NotificationCenter = () => (
  <PagePlaceholder 
    title="Notification Center" 
    description="Manage system alerts, approval requests, and automated compliance warnings."
    icon={Bell}
  />
);

export const DocumentManagement = () => (
  <PagePlaceholder 
    title="Document Management" 
    description="Secure enterprise file sharing, policy documents, and architecture decision records."
    icon={FileText}
  />
);

export const ManagerSettings = () => (
  <PagePlaceholder 
    title="Module Settings" 
    description="Configure dashboard layouts, notification preferences, and team automation rules."
    icon={Settings}
  />
);

export const ManagerProfile = ({ user }: { user: any }) => (
  <PagePlaceholder 
    title="Manager Profile" 
    description={`Manage your executive profile, access controls, and security credentials for ${user?.name || 'your account'}.`}
    icon={User}
  />
);
