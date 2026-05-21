import React, { useState } from 'react';
import {
  Search, Bell, Calendar, MessageCircle, Sparkles,
  Sun, Moon, ChevronDown, Command, LogOut
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  user: any;
}

export const InternTopbar: React.FC<TopbarProps> = ({ user }) => {
  const [isDark, setIsDark] = useState(true);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('aurahr-token');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/login';
  };

  return (
    <header className="h-14 shrink-0 bg-[#0d1117] border-b border-[#1b1f27] flex items-center justify-between px-5 z-10">

      {/* Breadcrumb & Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#484f58] group-focus-within:text-violet-400 transition-colors" />
          <input
            type="text"
            placeholder="Search tasks, courses, docs..."
            className="w-full bg-[#161b22] border border-[#21262d] focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 rounded-lg py-2 pl-9 pr-20 text-sm text-slate-200 placeholder:text-[#484f58] outline-none transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-[#21262d] bg-[#0d1117] text-[10px] font-mono text-[#484f58] font-bold">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-[#21262d] bg-[#0d1117] text-[10px] font-mono text-[#484f58] font-bold">K</kbd>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">

        {/* AI Helper */}
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-violet-400 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/20 text-xs font-medium transition-all">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">AI Help</span>
        </button>

        <div className="h-5 w-px bg-[#21262d]"></div>

        {/* Action Icons */}
        <div className="flex items-center gap-0.5">
          <button className="p-2 text-[#6e7681] hover:text-slate-200 hover:bg-[#161b22] rounded-lg transition-colors" title="Calendar">
            <Calendar className="w-[18px] h-[18px]" />
          </button>
          <button className="relative p-2 text-[#6e7681] hover:text-slate-200 hover:bg-[#161b22] rounded-lg transition-colors" title="Chat">
            <MessageCircle className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full border-2 border-[#0d1117]"></span>
          </button>
          <button className="relative p-2 text-[#6e7681] hover:text-slate-200 hover:bg-[#161b22] rounded-lg transition-colors group" title="Notifications">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1 right-1 bg-rose-500 text-white text-[8px] font-bold px-1 py-px rounded-full border border-[#0d1117] min-w-[16px] text-center">4</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-[#6e7681] hover:text-amber-400 hover:bg-[#161b22] rounded-lg transition-colors"
          title="Toggle theme"
        >
          {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        <div className="h-5 w-px bg-[#21262d]"></div>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
          <div className="text-right hidden md:block">
            <div className="text-[13px] font-semibold text-slate-200 leading-tight group-hover:text-violet-400 transition-colors">{user?.name || 'Intern'}</div>
            <div className="text-[10px] font-bold text-violet-500/80 uppercase tracking-wider flex items-center gap-1 justify-end">
              <GraduationCapIcon />
              Intern
            </div>
          </div>
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-sm shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'I'}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0d1117] rounded-full"></div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#484f58] group-hover:text-slate-200 transition-colors" />
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          title="Logout"
          className="p-2 ml-1 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="w-[18px] h-[18px]" />
        </button>
      </div>
    </header>
  );
};

const GraduationCapIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
