import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Server, GitBranch, Rocket, 
  HardDrive, Cloud, Layers, PlaySquare, 
  AlertTriangle, Activity, ShieldCheck, Zap, 
  Cpu, FileText, ClipboardList, Settings
} from 'lucide-react';

export const CtoSidebar: React.FC = () => {
  const navItems = [
    { name: 'Engineering Overview', path: 'overview', icon: LayoutDashboard },
    { name: 'Architecture', path: 'architecture', icon: Layers },
    { name: 'Repositories', path: 'repositories', icon: GitBranch },
    { name: 'Deployments', path: 'deployments', icon: Rocket },
    { name: 'Infrastructure', path: 'infrastructure', icon: HardDrive },
    { name: 'Cloud Resources', path: 'cloud', icon: Cloud },
    { name: 'Microservices', path: 'microservices', icon: Server },
    { name: 'CI/CD', path: 'cicd', icon: PlaySquare },
    { name: 'Incidents', path: 'incidents', icon: AlertTriangle },
    { name: 'Monitoring', path: 'monitoring', icon: Activity },
    { name: 'Security Center', path: 'security', icon: ShieldCheck },
    { name: 'Performance', path: 'performance', icon: Zap },
    { name: 'AI Assistant', path: 'ai', icon: Cpu },
    { name: 'Engineering Reports', path: 'reports', icon: FileText },
    { name: 'Audit Logs', path: 'audit', icon: ClipboardList },
    { name: 'Settings', path: 'settings', icon: Settings },
  ];

  return (
    <aside className="w-[280px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen flex flex-col shadow-sm shrink-0 transition-colors duration-300">
      {/* Brand & Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-900 transition-colors duration-300">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center shadow-sm">
          <Server className="w-4 h-4 text-white" />
        </div>
        <span className="ml-3 font-bold text-[15px] tracking-tight text-slate-900 dark:text-white transition-colors duration-300">WorkSphere</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
        <div className="mb-4 mt-2 px-3">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Engineering Command Center</h3>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-4 h-4 mr-3 ${isActive ? 'text-slate-300' : 'text-slate-400'}`} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Version Info */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-900 transition-colors duration-300">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
          <span>Enterprise Edition</span>
          <span>v2.10.4</span>
        </div>
      </div>
    </aside>
  );
};
