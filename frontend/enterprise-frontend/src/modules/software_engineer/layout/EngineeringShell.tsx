import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { EngineeringTopbar } from './EngineeringTopbar';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import { CommandPalette } from '../components/CommandPalette';

export const EngineeringShell: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#0E1117] text-slate-300 overflow-hidden font-sans">
      <CommandPalette />
      <CollapsibleSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <EngineeringTopbar />
        <main className="flex-1 overflow-y-auto bg-[#0E1117] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
