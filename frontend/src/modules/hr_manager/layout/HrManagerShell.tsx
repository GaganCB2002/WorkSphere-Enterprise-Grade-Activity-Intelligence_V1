import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HrManagerSidebar } from './HrManagerSidebar';
import { HrManagerTopbar } from './HrManagerTopbar';

export const HrManagerShell: React.FC<{ user: any }> = ({ user }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 overflow-hidden font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      <HrManagerSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <HrManagerTopbar user={user} />
        <main className="flex-1 overflow-y-auto bg-slate-100 dark:bg-[#0E1117] p-6 relative custom-scrollbar transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
