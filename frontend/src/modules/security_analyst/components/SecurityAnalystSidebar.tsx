import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Map, Video, Terminal, ShieldCheck, 
  Shield, Zap, BookOpen 
} from 'lucide-react';

interface SecurityAnalystSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const SecurityAnalystSidebar: React.FC<SecurityAnalystSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Threat Overview', icon: Activity },
    { id: 'threat-map', label: 'Live Threat Map', icon: Map },
    { id: 'forensics', label: 'Desktop Forensics', icon: Video },
    { id: 'sniffer', label: 'Network Packet Sniffer', icon: Terminal },
    { id: 'vulnerabilities', label: 'Vulnerability Scanner', icon: ShieldCheck },
    { id: 'zero-trust', label: 'Zero Trust Policies', icon: Shield },
    { id: 'playbooks', label: 'Incident Response', icon: Zap },
    { id: 'training', label: 'Training Center', icon: BookOpen }
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl flex flex-col fixed h-screen z-10">
      <div className="p-6 border-b border-slate-800/80">
        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 tracking-tight flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-500" />
          Cyber Security
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest">SIEM Command Center</p>
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
                isActive ? 'text-white bg-red-500/10 border border-red-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeSecurityTab" 
                  className="absolute left-0 w-1 h-full bg-red-500 top-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-red-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-rose-500 flex items-center justify-center font-bold text-white shadow-lg">
            SA
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Security Analyst</p>
            <p className="text-xs text-slate-400">Security Dept</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
