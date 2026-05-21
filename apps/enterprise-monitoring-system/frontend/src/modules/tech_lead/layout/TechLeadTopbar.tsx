import React from 'react';
import { Search, Bell, Plus, UserCircle, Command, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const TechLeadTopbar: React.FC<{ user: any }> = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-[#21262d] bg-[#0E1117]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Search Bar */}
      <div className="flex items-center flex-1">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#21262d] hover:bg-[#30363d] rounded-md border border-[#30363d] w-[400px] cursor-text text-[#8b949e] transition-colors group">
          <Search className="w-4 h-4 group-hover:text-slate-300 transition-colors" />
          <span className="flex-1 text-sm text-left">Search repository, issues, developers...</span>
          <div className="flex items-center gap-1 text-xs font-mono bg-[#0E1117] px-1.5 py-0.5 rounded border border-[#30363d]">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>
      
      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-md transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>New Sprint Issue</span>
        </button>
        
        <div className="h-5 w-[1px] bg-[#30363d] mx-2"></div>
        
        <button className="relative p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-[#0E1117]"></span>
        </button>
        
        <div className="flex items-center gap-2 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-200 leading-tight">{user?.name || 'Tech Lead'}</p>
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Engineering Lead</p>
          </div>
          <button className="p-0.5 rounded-full ring-2 ring-transparent hover:ring-[#30363d] transition-all">
            <UserCircle className="w-8 h-8 text-[#8b949e]" />
          </button>
        </div>

        <div className="h-5 w-[1px] bg-[#30363d] mx-2"></div>
        
        <button 
          onClick={() => {
            localStorage.removeItem('aurahr-token');
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
            window.location.href = '/login';
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#f85149]/10 hover:bg-[#f85149]/20 border border-[#f85149]/20 text-[#f85149] text-xs font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
