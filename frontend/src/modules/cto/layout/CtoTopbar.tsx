import React, { useState } from 'react';
import { Search, Bell, Inbox, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export const CtoTopbar: React.FC<{ user: any }> = ({ user }) => {
  const [env, setEnv] = useState('production');

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
      
      {/* Left section: Organization & Environment */}
      <div className="flex items-center gap-6">
        {/* Organization Selector */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 px-2 py-1 rounded-md transition-colors">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
            W
          </div>
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">WorkSphere Inc.</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800"></div>

        {/* Environment Selector */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md border border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setEnv('production')}
              className={`px-3 py-1 text-xs font-bold rounded-sm transition-colors flex items-center gap-1.5 ${
                env === 'production' 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-600' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${env === 'production' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
              Production
            </button>
            <button 
              onClick={() => setEnv('staging')}
              className={`px-3 py-1 text-xs font-bold rounded-sm transition-colors flex items-center gap-1.5 ${
                env === 'staging' 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-600' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${env === 'staging' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
              Staging
            </button>
          </div>
        </div>
      </div>

      {/* Center: Global Search */}
      <div className="flex-1 max-w-lg mx-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-16 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all shadow-inner"
            placeholder="Search repositories, APIs, deployments..."
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <kbd className="inline-flex items-center px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-sans font-medium text-slate-400 bg-white dark:bg-slate-900 shadow-sm">
              Ctrl K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right section: Icons & Profile */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
          <Inbox className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-900 dark:text-white leading-none">{user?.name || 'Chief Tech'}</div>
            <div className="text-[11px] font-semibold text-slate-500 mt-1">CTO & Founder</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:ring-2 ring-slate-200 transition-all">
            {user?.name ? user.name.charAt(0) : 'C'}
          </div>
        </div>
      </div>

    </header>
  );
};
