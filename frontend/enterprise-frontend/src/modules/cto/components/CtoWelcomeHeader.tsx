import React from 'react';
import { Bell, Search } from 'lucide-react';

export const CtoWelcomeHeader: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Technology Health: OPTIMAL
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Good Morning, CTO
        </h2>
        <p className="text-slate-400 mt-2 font-medium">
          {currentDate} • {currentTime} • WorkSphere Enterprise
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search telemetry, engineers, servers..." 
            className="w-64 bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium"
          />
        </div>
        <button className="relative p-2 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </button>
      </div>
    </div>
  );
};
