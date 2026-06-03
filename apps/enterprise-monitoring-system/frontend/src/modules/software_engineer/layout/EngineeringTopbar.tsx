import React from 'react';
import { Search, Bell, MessageSquare, Plus, UserCircle, Command, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const EngineeringTopbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b border-[#21262d] bg-[#0E1117]/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-10 text-sm">
      <div className="flex items-center flex-1 gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] rounded-md border border-[#30363d] w-96 cursor-pointer text-[#8b949e] transition-colors">
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search workspace...</span>
          <div className="flex items-center gap-1 text-xs font-mono bg-[#0E1117] px-1.5 py-0.5 rounded border border-[#30363d]">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>New Issue</span>
        </button>
        
        <div className="h-4 w-[1px] bg-[#30363d] mx-1"></div>
        
        <button className="p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-[#0E1117]"></span>
        </button>
        <button className="p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors relative">
          <MessageSquare className="w-4 h-4" />
        </button>
        <button className="ml-1 p-0.5 rounded-full ring-2 ring-transparent hover:ring-[#30363d] transition-all">
          <UserCircle className="w-7 h-7 text-[#8b949e]" />
        </button>

        <div className="h-4 w-[1px] bg-[#30363d] mx-1"></div>
        
        <button 
          onClick={() => {
            localStorage.removeItem('worksphere-token');
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
            window.location.href = '/login';
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#f85149]/10 hover:bg-[#f85149]/20 border border-[#f85149]/20 text-[#f85149] text-xs font-semibold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
