import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ManagerSidebar } from './ManagerSidebar';
import { ManagerTopbar } from './ManagerTopbar';
import { CommandPalette } from '../components/CommandPalette';
import { FloatingChat } from '../components/FloatingChat';

export const ManagerShell: React.FC<{ user: any }> = ({ user }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#0a0c14] text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* ── Sidebar ────────────────────────────────────── */}
      <ManagerSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      {/* ── Main Content Area ──────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#06080d]">
        <ManagerTopbar user={user} onOpenCommand={() => setIsCommandOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 relative mgr-scrollbar">
          <Outlet />
        </main>
      </div>

      {/* ── Overlays ───────────────────────────────────── */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      <FloatingChat />
    </div>
  );
};
