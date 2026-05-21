import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, KanbanSquare, GitPullRequest, 
  Terminal, Timer, Users, CalendarOff, Bug, 
  ChevronLeft, ChevronRight, BookOpen
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: 'overview', label: 'Overview', icon: LayoutDashboard },
  { path: 'tasks', label: 'Task Board', icon: KanbanSquare },
  { path: 'code', label: 'Code & PRs', icon: GitPullRequest },
  { path: 'devops', label: 'DevOps & CI/CD', icon: Terminal },
  { path: 'focus', label: 'Focus Space', icon: Timer },
  { path: 'team', label: 'Team', icon: Users },
  { path: 'leave', label: 'Leave & Attendance', icon: CalendarOff },
  { path: 'bugs', label: 'Bug Tracker', icon: Bug },
  { path: 'docs', label: 'Documentation', icon: BookOpen },
];

export const CollapsibleSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 68 : 240 }}
      className="h-full bg-[#0E1117] border-r border-[#21262d] flex flex-col relative z-20 flex-shrink-0"
    >
      {/* Sidebar Header */}
      <div className="h-14 flex items-center px-4 border-b border-[#21262d]">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">WS</span>
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-semibold text-[#e6edf3] truncate"
            >
              WorkSphere Eng
            </motion.span>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2 rounded-md transition-colors whitespace-nowrap group relative
              ${isActive 
                ? 'bg-[#1f6feb]/10 text-[#4493f8]' 
                : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9]'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#4493f8]' : 'text-[#8b949e] group-hover:text-[#c9d1d9]'}`} />
                {!isCollapsed && (
                  <span className="font-medium text-sm truncate">{item.label}</span>
                )}
                
                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-[#21262d] text-[#e6edf3] text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap border border-[#30363d] shadow-lg">
                    {item.label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Toggle Button */}
      <div className="p-3 border-t border-[#21262d]">
        <button 
          onClick={onToggle}
          className="flex items-center justify-center w-full p-2 text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9] rounded-md transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
};
