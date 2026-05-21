import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { InternSidebar } from './InternSidebar';
import { InternTopbar } from './InternTopbar';

export const InternShell: React.FC<{ user: any }> = ({ user }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#090b10] text-slate-300 overflow-hidden font-sans selection:bg-violet-500/30">
      <InternSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <InternTopbar user={user} />
        <main className="flex-1 overflow-y-auto bg-[#0d1117] p-6 relative custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
