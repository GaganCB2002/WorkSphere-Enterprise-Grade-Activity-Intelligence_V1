import React from 'react';
import { 
  Search, Bell, Plus, MessageSquare, 
  Settings, LogOut, ChevronDown, User, Award, CheckCircle2, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  user: any;
}

export const HrManagerTopbar: React.FC<TopbarProps> = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('worksphere-token');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/login';
  };

  return (
    <header className="h-16 shrink-0 bg-[#0E1117] border-b border-[#21262d] flex items-center justify-between px-6 z-10">
      
      {/* Global Search */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e] group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search employees, policies, payroll records... (Press ⌘K)" 
            className="w-full bg-[#161b22] border border-[#30363d] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 rounded-lg py-2 pl-10 pr-12 text-sm text-slate-200 placeholder:text-[#8b949e] outline-none transition-all shadow-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-[#30363d] bg-[#090b10] text-[10px] font-mono text-[#8b949e] font-bold">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-[#30363d] bg-[#090b10] text-[10px] font-mono text-[#8b949e] font-bold">K</kbd>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        
        {/* Quick Actions */}
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-sm border border-indigo-500/30">
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>

        <div className="h-6 w-[1px] bg-[#30363d] mx-2"></div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button className="relative p-2 text-[#8b949e] hover:text-slate-200 hover:bg-[#161b22] rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0E1117]"></span>
          </button>
          
          <button className="relative p-2 text-[#8b949e] hover:text-slate-200 hover:bg-[#161b22] rounded-lg transition-colors group">
            <Bell className="w-5 h-5 group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
            <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-[#0E1117]">
              12
            </span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden md:block">
            <div className="text-sm font-bold text-slate-200 leading-tight group-hover:text-indigo-400 transition-colors">{user?.name || 'HR Manager'}</div>
            <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider flex items-center gap-1 justify-end mt-0.5">
               <ShieldCheck className="w-3 h-3" /> Global HR
            </div>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shadow-sm">
              {user?.name ? user.name.charAt(0) : 'H'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0E1117] rounded-full"></div>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          title="Logout"
          className="p-2 ml-2 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
