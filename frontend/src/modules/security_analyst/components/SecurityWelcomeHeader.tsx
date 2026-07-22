import React from 'react';
import { Bell, Search, ShieldAlert, Terminal } from 'lucide-react';

export const SecurityWelcomeHeader: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 border-b border-slate-800/50 pb-6">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-500 flex items-center justify-center font-black text-white shadow-lg">
            SA
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Security Command Center
            </h2>
            <p className="text-slate-400 mt-1 font-medium">
              {currentDate} • {currentTime} • Defcon Status: <span className="text-red-400 font-bold">DEFCON 3</span>
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          System Status: All systems operational • Active Threats: 2
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search IPs, Logs, Threats..." 
            className="w-72 bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all placeholder:text-slate-600 font-medium"
          />
        </div>
        <button className="relative p-2 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <Terminal className="w-5 h-5" />
        </button>
        <button className="relative p-2 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-colors shadow-lg shadow-red-900/20 text-sm">
          <ShieldAlert className="w-4 h-4" />
          Emergency Lockdown
        </button>
      </div>
    </div>
  );
};
