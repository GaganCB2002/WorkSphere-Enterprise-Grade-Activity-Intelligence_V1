import React, { useState } from 'react';
import {
  Search, Bell, Calendar, MessageCircle, Sparkles,
  Sun, Moon, ChevronDown, Plus, Mail, LogOut, Zap
} from 'lucide-react';

interface TopbarProps {
  user: any;
  onOpenCommand: () => void;
}

export const ManagerTopbar: React.FC<TopbarProps> = ({ user, onOpenCommand }) => {
  const [isDark, setIsDark] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (e) { console.error(e); }
    window.location.href = '/login';
  };

  return (
    <header className="h-[80px] shrink-0 bg-background border-b border-surface-variant flex items-center justify-between px-8 z-10 select-none">

      {/* ── Global Search ──────────────────────────────── */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group cursor-pointer" onClick={onOpenCommand}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-hover:text-primary transition-colors" />
          <div className="w-full bg-[#f6efe9] border border-transparent hover:border-primary/30 rounded-lg py-3 pl-11 pr-20 text-[13px] text-on-surface-variant transition-all flex items-center">
            Search team members, sprints, or tasks...
          </div>
        </div>
      </div>

      {/* ── Right Controls ─────────────────────────────── */}
      <div className="flex items-center gap-3 ml-4">
        
        {/* Quick Create Action */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant hover:border-primary text-on-surface text-[13px] font-bold transition-all mr-2 shadow-soft active:scale-95 group">
          <Zap className="w-4 h-4 text-on-surface group-hover:text-primary transition-colors" />
          <span className="hidden sm:inline">Quick Actions</span>
        </button>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-outline hover:text-primary hover:bg-surface-variant rounded-full transition-colors group" title="Notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-[1.5px] border-background"></span>
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-outline hover:text-primary hover:bg-surface-variant rounded-full transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="h-6 w-px bg-outline-variant mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-1 cursor-pointer group hover:bg-surface-variant p-1.5 rounded-xl transition-colors">
          <div className="text-right hidden md:block">
            <div className="text-[13px] font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">{user?.name || 'Elena Sands'}</div>
            <div className="text-[10px] font-semibold text-outline">{user?.department || 'Operations Director'}</div>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[13px] border border-primary/20 overflow-hidden shadow-soft">
               {user?.avatar ? <img src={user.avatar} alt="User" className="w-full h-full object-cover" /> : (user?.name ? user.name.charAt(0).toUpperCase() : 'E')}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-[2px] border-background rounded-full"></div>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          title="Logout"
          className="p-2 ml-1 text-outline hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
