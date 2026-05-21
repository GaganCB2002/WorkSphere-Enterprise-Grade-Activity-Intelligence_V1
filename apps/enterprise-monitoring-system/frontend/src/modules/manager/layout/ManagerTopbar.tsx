import React, { useState } from 'react';
import {
  Search, Bell, Calendar, MessageCircle, Sparkles,
  Sun, Moon, ChevronDown, Plus, Mail
} from 'lucide-react';

interface TopbarProps {
  user: any;
  onOpenCommand: () => void;
}

export const ManagerTopbar: React.FC<TopbarProps> = ({ user, onOpenCommand }) => {
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="h-[60px] shrink-0 bg-[#0a0c14] border-b border-[#161a26] flex items-center justify-between px-5 z-10 select-none">

      {/* ── Global Search ──────────────────────────────── */}
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full group cursor-pointer" onClick={onOpenCommand}>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5068] group-hover:text-indigo-400 transition-colors" />
          <div className="w-full bg-[#12151f] border border-[#1e2231] group-hover:border-indigo-500/30 rounded-xl py-2 pl-10 pr-20 text-[13px] text-[#4a5068] transition-all flex items-center">
            Search team, projects, tasks...
          </div>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded-md border border-[#1e2231] bg-[#0a0c14] text-[10px] font-mono text-[#6b7280] font-bold shadow-sm">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded-md border border-[#1e2231] bg-[#0a0c14] text-[10px] font-mono text-[#6b7280] font-bold shadow-sm">K</kbd>
          </div>
        </div>
      </div>

      {/* ── Right Controls ─────────────────────────────── */}
      <div className="flex items-center gap-1.5 ml-4">
        
        {/* Quick Create Action */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-semibold transition-all mr-2 shadow-sm shadow-indigo-500/20 active:scale-95">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Action</span>
        </button>

        <div className="h-6 w-px bg-[#1e2231] mx-1"></div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-[#6b7280] hover:text-slate-200 hover:bg-[#12151f] rounded-lg transition-colors" title="Calendar">
            <Calendar className="w-[18px] h-[18px]" />
          </button>
          <button className="p-2 text-[#6b7280] hover:text-slate-200 hover:bg-[#12151f] rounded-lg transition-colors" title="Mail">
            <Mail className="w-[18px] h-[18px]" />
          </button>
          <button className="relative p-2 text-[#6b7280] hover:text-slate-200 hover:bg-[#12151f] rounded-lg transition-colors" title="Chat">
            <MessageCircle className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0a0c14]"></span>
          </button>
          <button className="relative p-2 text-[#6b7280] hover:text-slate-200 hover:bg-[#12151f] rounded-lg transition-colors group" title="Notifications">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-[#0a0c14] min-w-[18px] text-center leading-none flex items-center justify-center">
              4
            </span>
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-[#6b7280] hover:text-amber-400 hover:bg-[#12151f] rounded-lg transition-colors ml-1"
          title="Toggle theme"
        >
          {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        <div className="h-6 w-px bg-[#1e2231] mx-2"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-1 cursor-pointer group hover:bg-[#12151f] p-1.5 rounded-xl transition-colors">
          <div className="text-right hidden md:block">
            <div className="text-[13px] font-bold text-slate-200 leading-tight group-hover:text-indigo-400 transition-colors">{user?.name || 'Manager'}</div>
            <div className="text-[10px] font-semibold text-slate-500">{user?.department || 'Operations'}</div>
          </div>
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-[13px] shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-[2.5px] border-[#0a0c14] rounded-full"></div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#4a5068] group-hover:text-slate-300 transition-colors hidden sm:block" />
        </div>

      </div>
    </header>
  );
};
