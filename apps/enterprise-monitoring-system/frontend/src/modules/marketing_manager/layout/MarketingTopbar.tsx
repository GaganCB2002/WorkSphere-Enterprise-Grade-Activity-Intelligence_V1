import React, { useState, useEffect } from 'react';
import { Search, Bell, Calendar, Bot, Plus, Moon, Sun } from 'lucide-react';

const getInitialTheme = () => {
  try {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return true;
    }
  } catch (e) {
    console.error(e);
  }
  return false;
};

export const MarketingTopbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newState = !isDarkMode;
    setIsDarkMode(newState);
    
    if (newState) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch (e) { console.error(e); }
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch (e) { console.error(e); }
    }
  };

  return (
    <header className="h-20 bg-[#f8fafc] dark:bg-slate-900 border-b border-[#e2e8f0] dark:border-slate-800 px-8 flex items-center justify-between shrink-0 transition-colors">
      
      <div className="flex items-center gap-6">
        <div className="relative w-[480px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search campaigns, leads, reports..." 
            className="w-full bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-[#0f172a] dark:text-slate-100 focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1] outline-none transition-all shadow-sm"
          />
        </div>
        
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-xl shadow-sm">
          <Calendar className="w-4 h-4 text-[#0d47a1] dark:text-blue-400" />
          <span className="text-sm font-bold text-[#334155] dark:text-slate-200">
            {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date())}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-[#64748b] dark:text-slate-400 hover:text-[#0f172a] dark:hover:text-white hover:bg-[#f1f5f9] dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="p-2 text-[#64748b] dark:text-slate-400 hover:text-[#0f172a] dark:hover:text-white hover:bg-[#f1f5f9] dark:hover:bg-slate-800 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border border-white dark:border-slate-900 rounded-full"></span>
        </button>

        <button className="p-2 text-[#64748b] dark:text-slate-400 hover:text-[#0f172a] dark:hover:text-white hover:bg-[#f1f5f9] dark:hover:bg-slate-800 rounded-lg transition-colors">
          <Bot className="w-5 h-5" />
        </button>
        
        <div className="w-px h-6 bg-[#e2e8f0] mx-2"></div>

        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0d47a1] dark:bg-blue-600 hover:bg-[#0a3982] text-white rounded-xl text-sm font-bold shadow-md shadow-blue-900/20 transition-all">
          <Plus className="w-4 h-4" /> Quick Create
        </button>
      </div>

    </header>
  );
};
