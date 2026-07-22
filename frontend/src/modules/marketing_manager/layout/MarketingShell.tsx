import React from 'react';
import { MarketingSidebar } from './MarketingSidebar';
import { MarketingTopbar } from './MarketingTopbar';

interface MarketingShellProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const MarketingShell: React.FC<MarketingShellProps> = ({ children, activeView, setActiveView }) => {
  return (
    <div className="flex h-screen w-full bg-[#f4f7fb] dark:bg-slate-950 overflow-hidden font-body text-[#0f172a] dark:text-slate-100 transition-colors">
      {/* 
        Optional: To achieve the exact dotted background look across the main content area, 
        we use a subtle background pattern.
      */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0" 
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      <MarketingSidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <MarketingTopbar />
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
