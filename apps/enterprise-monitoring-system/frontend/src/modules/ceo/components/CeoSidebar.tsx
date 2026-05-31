import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, Activity, Landmark, 
  Briefcase, Search, FileText, Compass, Settings 
} from 'lucide-react';

interface CeoSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CeoSidebar: React.FC<CeoSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'workforce', label: 'Workforce', icon: Users },
    { id: 'operations', label: 'Operations', icon: Activity },
    { id: 'finance', label: 'Finance', icon: Landmark },
    { id: 'clients', label: 'Clients', icon: Briefcase },
    { id: 'recruitment', label: 'Recruitment', icon: Search },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'strategy', label: 'Strategy', icon: Compass },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl flex flex-col fixed h-screen z-10">
      <div className="p-6 border-b border-slate-800/80">
        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">
          Boardroom Central
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Enterprise Command Center</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative group overflow-hidden ${
                isActive ? 'text-white bg-blue-500/10 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeCeoTab" 
                  className="absolute left-0 w-1 h-full bg-blue-500 top-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg">
            CEO
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Sarah Jenkins</p>
            <p className="text-xs text-slate-400">Chief Executive</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
