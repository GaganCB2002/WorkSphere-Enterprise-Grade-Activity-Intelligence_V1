import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TechLeadTopbar } from './TechLeadTopbar';
import { TechLeadSidebar } from './TechLeadSidebar';

export const TechLeadShell: React.FC<{ user: any }> = ({ user }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#090b10] text-slate-300 overflow-hidden font-sans selection:bg-indigo-500/30">
      <TechLeadSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TechLeadTopbar user={user} />
        <main className="flex-1 overflow-y-auto bg-[#090b10] p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
