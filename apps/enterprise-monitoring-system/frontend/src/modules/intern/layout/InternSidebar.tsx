import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ListTodo, BookOpen, Users, CalendarCheck,
  FolderKanban, Star, FileText, MessageCircle, Settings,
  ChevronLeft, Menu, Sparkles, LogOut, GraduationCap, User
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface NavItemDef {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavGroupDef {
  title: string;
  items: NavItemDef[];
}

const NAV_GROUPS: NavGroupDef[] = [
  {
    title: 'Dashboard',
    items: [
      { label: 'Overview', path: '/intern/overview', icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: 'My Profile', path: '/intern/profile', icon: <User className="w-5 h-5" /> },
    ]
  },
  {
    title: 'Work',
    items: [
      { label: 'Task Board', path: '/intern/tasks', icon: <ListTodo className="w-5 h-5" />, badge: 3 },
      { label: 'Project', path: '/intern/project', icon: <FolderKanban className="w-5 h-5" /> },
    ]
  },
  {
    title: 'Learning',
    items: [
      { label: 'Learning Hub', path: '/intern/learning', icon: <BookOpen className="w-5 h-5" />, badge: 2 },
      { label: 'Evaluations', path: '/intern/evaluations', icon: <Star className="w-5 h-5" /> },
    ]
  },
  {
    title: 'People',
    items: [
      { label: 'Mentor & Team', path: '/intern/mentor', icon: <Users className="w-5 h-5" /> },
      { label: 'Chat', path: '/intern/chat', icon: <MessageCircle className="w-5 h-5" />, badge: 5 },
    ]
  },
  {
    title: 'Operations',
    items: [
      { label: 'Attendance & Leave', path: '/intern/attendance', icon: <CalendarCheck className="w-5 h-5" /> },
      { label: 'Knowledge Base', path: '/intern/knowledge', icon: <FileText className="w-5 h-5" /> },
      { label: 'Settings', path: '/intern/settings', icon: <Settings className="w-5 h-5" /> },
    ]
  }
];

export const InternSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 264 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-screen bg-[#0d1117] border-r border-[#1b1f27] flex flex-col relative z-20 shrink-0"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#1b1f27]">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
            <GraduationCap className="w-4.5 h-4.5 text-white" />
          </div>
          <AnimatePresence mode="popLayout">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="font-bold text-slate-200 text-sm leading-tight">
                  WorkSphere <span className="text-violet-400">Intern</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Internship Portal</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-[#6e7681] hover:text-slate-200 hover:bg-[#161b22] transition-colors"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* AI Assistant Quick Access */}
      <AnimatePresence mode="popLayout">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pt-4"
          >
            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium hover:border-violet-500/40 transition-all group">
              <Sparkles className="w-4 h-4 text-violet-400 group-hover:rotate-12 transition-transform" />
              <span>Ask AI Assistant</span>
              <kbd className="ml-auto px-1.5 py-0.5 text-[9px] font-mono bg-[#0d1117] border border-violet-500/20 rounded text-violet-500">⌘J</kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="mb-5">
            {!isCollapsed && (
              <h4 className="px-5 mb-2 text-[10px] font-bold text-[#484f58] uppercase tracking-wider">
                {group.title}
              </h4>
            )}
            <ul className="space-y-0.5 px-2.5">
              {group.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group overflow-hidden
                      ${isActive
                        ? 'bg-violet-500/10 text-violet-400 font-semibold'
                        : 'text-[#8b949e] hover:text-slate-200 hover:bg-[#161b22]'}
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="internSidebarActive"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-violet-500 rounded-r-full"
                          />
                        )}

                        <div className={`shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                          {item.icon}
                        </div>

                        <AnimatePresence mode="popLayout">
                          {!isCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              className="flex-1 whitespace-nowrap flex items-center justify-between"
                            >
                              <span className="text-[13px]">{item.label}</span>
                              {item.badge && (
                                <span className="bg-violet-500/15 text-violet-400 border border-violet-500/20 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                                  {item.badge}
                                </span>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Profile */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-3 border-t border-[#1b1f27]"
          >
            <div
              onClick={() => { window.location.href = '/' }}
              className="bg-[#161b22] border border-[#21262d] rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-rose-500/50 hover:bg-rose-500/5 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-900/50 flex items-center justify-center text-violet-400 font-bold text-sm border border-violet-500/30 group-hover:bg-rose-500/20 group-hover:text-rose-400 group-hover:border-rose-500/30 transition-colors relative">
                <LogOut className="w-4 h-4 opacity-0 group-hover:opacity-100 absolute transition-opacity" />
                <span className="group-hover:opacity-0 transition-opacity">I</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-slate-200 truncate group-hover:text-rose-400 transition-colors">Intern Portal</div>
                <div className="text-[10px] text-[#6e7681] truncate group-hover:text-rose-400/70 transition-colors">Click to sign out</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};
