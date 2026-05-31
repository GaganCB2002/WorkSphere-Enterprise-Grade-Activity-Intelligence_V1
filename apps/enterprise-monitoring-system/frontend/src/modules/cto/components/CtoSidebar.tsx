import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Activity, Server, ShieldCheck, Cpu, 
  GitBranch, Cloud, FileText, Settings, Sparkles 
} from 'lucide-react';

interface CtoSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CtoSidebar: React.FC<CtoSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'engineering', label: 'Engineering Analytics', icon: Cpu },
    { id: 'delivery', label: 'Software Delivery', icon: GitBranch },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
    { id: 'cloud', label: 'Cloud Operations', icon: Cloud },
    { id: 'security', label: 'Security Center', icon: ShieldCheck },
    { id: 'ai', label: 'AI Assistant', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl flex flex-col fixed h-screen z-10">
      <div className="p-6 border-b border-slate-800/80">
        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">
          CTO Command Center
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Enterprise Architecture</p>
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
                  layoutId="activeCtoTab" 
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
            CTO
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Alex Mercer</p>
            <p className="text-xs text-slate-400">Chief Tech Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
