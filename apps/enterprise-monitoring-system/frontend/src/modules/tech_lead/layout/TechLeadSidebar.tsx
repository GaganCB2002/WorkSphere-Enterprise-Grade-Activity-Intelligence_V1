import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, GitPullRequest, Activity, 
  LineChart, ChevronLeft, ChevronRight, Kanban, 
  TerminalSquare, MessageSquare, Mail, Video
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: 'overview', label: 'Tech Overview', icon: LayoutDashboard },
  { path: 'sprints', label: 'Sprint Planner', icon: Kanban },
  { path: 'team', label: 'Team & Workload', icon: Users },
  { path: 'reviews', label: 'Code Reviews', icon: GitPullRequest },
  { path: 'devops', label: 'DevOps & CI/CD', icon: Activity },
  { path: 'analytics', label: 'Analytics', icon: LineChart },
];

const commItems = [
  { path: 'chat', label: 'Team Chat', icon: MessageSquare },
  { path: 'webmail', label: 'Webmail', icon: Mail },
  { path: 'meetings', label: 'Meetings', icon: Video },
];

export const TechLeadSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  return (
    <motion.aside
      animate={{ width: isCollapsed ? 68 : 260 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col bg-[#0E1117] border-r border-[#21262d] relative z-20 flex-shrink-0 shadow-[4px_0_24px_-10px_rgba(0,0,0,0.5)]"
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center px-4 border-b border-[#21262d] overflow-hidden">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
          <TerminalSquare className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-3 whitespace-nowrap"
            >
              <h1 className="font-bold text-slate-200 text-sm tracking-tight leading-none">Engineering Ops</h1>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">Tech Lead</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center h-10 rounded-md transition-all group relative ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 font-semibold' 
                  : 'text-[#8b949e] hover:bg-[#21262d] hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute left-0 top-1 bottom-1 w-1 bg-indigo-500 rounded-r-md" />
                )}
                <div className={`flex items-center justify-center w-10 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-[#8b949e] group-hover:text-slate-300'}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-2 text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}

        {!isCollapsed && (
          <div className="pt-4 pb-2 px-3">
            <p className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">Communication</p>
          </div>
        )}
        
        {commItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center h-10 rounded-md transition-all group relative ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 font-semibold' 
                  : 'text-[#8b949e] hover:bg-[#21262d] hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute left-0 top-1 bottom-1 w-1 bg-indigo-500 rounded-r-md" />
                )}
                <div className={`flex items-center justify-center w-10 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-[#8b949e] group-hover:text-slate-300'}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-2 text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-[#21262d]">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center h-10 rounded-md text-[#8b949e] hover:bg-[#21262d] hover:text-slate-200 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
};
