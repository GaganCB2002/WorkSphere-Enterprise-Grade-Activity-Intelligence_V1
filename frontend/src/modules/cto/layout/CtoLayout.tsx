import React from 'react';
import { Outlet } from 'react-router-dom';
import { CtoSidebar } from './CtoSidebar';
import { CtoTopbar } from './CtoTopbar';

export const CtoLayout: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans text-slate-900 dark:text-white selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Left Navigation Sidebar */}
      <CtoSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Navigation */}
        <CtoTopbar user={user} />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden focus:outline-none">
          <div className="max-w-[1600px] mx-auto p-8 lg:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
