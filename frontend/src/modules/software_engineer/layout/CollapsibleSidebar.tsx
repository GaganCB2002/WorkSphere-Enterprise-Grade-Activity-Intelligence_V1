import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, KanbanSquare, GitPullRequest, 
  Terminal, Timer, Users, CalendarOff, Bug, 
  ChevronLeft, ChevronRight, BookOpen, LogOut,
  Zap, Plus, FileText, Calendar, FolderPlus, CheckSquare
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

const quickActions = [
  { label: 'Create employee', icon: Plus, path: '/employees/directory' },
  { label: 'Generate report', icon: FileText, path: '/employees/reports' },
  { label: 'Submit leave request', icon: Calendar, path: '/employee/leave' },
  { label: 'Create project', icon: FolderPlus, path: '/projects/list' },
];

export const CollapsibleSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const [quickActionsExpanded, setQuickActionsExpanded] = useState(true);

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
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 custom-scrollbar">
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
                  <span className="font-medium text-sm truncate flex-1 flex items-center justify-between">
                    {item.label}
                    {item.path === 'overview' && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Page
                      </span>
                    )}
                  </span>
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

        {/* Quick Actions Section */}
        <div className="pt-3 pb-1 border-t border-[#21262d] mt-2">
          {!isCollapsed ? (
            <button
              onClick={() => setQuickActionsExpanded(!quickActionsExpanded)}
              className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider hover:text-indigo-300"
            >
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                Quick Actions
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${quickActionsExpanded ? 'rotate-90' : ''}`} />
            </button>
          ) : (
            <div className="flex justify-center py-1">
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
          )}

          <AnimatePresence>
            {(quickActionsExpanded || isCollapsed) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-1 space-y-0.5"
              >
                {quickActions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(act.path)}
                    className="w-full flex items-center h-9 px-2.5 rounded-md text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#1f6feb]/10 transition-all text-left"
                    title={act.label}
                  >
                    <div className="flex items-center justify-center w-6 flex-shrink-0 text-indigo-400">
                      <act.icon className="w-4 h-4" />
                    </div>
                    {!isCollapsed && (
                      <span className="ml-2 text-xs whitespace-nowrap overflow-hidden flex-1 flex items-center justify-between">
                        {act.label}
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          Action
                        </span>
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Footer Controls */}
      <div className="p-3 border-t border-[#21262d] flex flex-col gap-2">
        <button 
          onClick={() => { window.location.href = '/' }}
          className="flex items-center justify-center w-full p-2 text-[#8b949e] hover:bg-rose-500/10 hover:text-rose-400 rounded-md transition-colors group"
          title="Logout"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span className="ml-3 text-sm font-semibold">Logout</span>}
        </button>
        <button 
          onClick={onToggle}
          className="flex items-center justify-center w-full p-2 text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9] rounded-md transition-colors"
          title="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
};
