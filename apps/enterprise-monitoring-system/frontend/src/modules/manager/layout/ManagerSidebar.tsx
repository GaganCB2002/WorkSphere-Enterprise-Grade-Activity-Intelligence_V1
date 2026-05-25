import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, ListTodo, CalendarCheck, Clock, TrendingUp,
  FolderKanban, BarChart3, Sparkles, Bell, FileText, Boxes,
  MessageCircle, Settings, User, ChevronLeft, Menu, Zap, LogOut,
  Shield
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
    title: 'Command Center',
    items: [
      { label: 'Dashboard', path: '/manager/overview', icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
    ]
  },
  {
    title: 'Team Operations',
    items: [
      { label: 'Team Management', path: '/manager/team', icon: <Users className="w-[18px] h-[18px]" />, badge: 2 },
      { label: 'Task & Workflow', path: '/manager/tasks', icon: <ListTodo className="w-[18px] h-[18px]" />, badge: 5 },
      { label: 'Leave Management', path: '/manager/leave', icon: <CalendarCheck className="w-[18px] h-[18px]" />, badge: 6 },
      { label: 'Attendance', path: '/manager/attendance', icon: <Clock className="w-[18px] h-[18px]" /> },
    ]
  },
  {
    title: 'Performance',
    items: [
      { label: 'Performance', path: '/manager/performance', icon: <TrendingUp className="w-[18px] h-[18px]" /> },
    ]
  }
];

export const ManagerSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 272 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="h-screen bg-[#0a0c14] border-r border-[#161a26] flex flex-col relative z-20 shrink-0 select-none"
    >
      {/* ── Brand Header ───────────────────────────────── */}
      <div className="h-[60px] flex items-center justify-between px-4 border-b border-[#161a26] shrink-0">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <Shield className="w-[18px] h-[18px] text-white" />
          </div>
          <AnimatePresence mode="popLayout">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col"
              >
                <span className="font-bold text-slate-200 text-[14px] leading-tight tracking-tight">
                  WorkSphere <span className="text-indigo-400">Manager</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Operations Hub</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-[#4a5068] hover:text-slate-200 hover:bg-[#161a26] transition-colors"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <Menu className="w-[18px] h-[18px]" /> : <ChevronLeft className="w-[18px] h-[18px]" />}
        </button>
      </div>

      {/* ── AI Assistant Quick Access ──────────────────── */}
      <AnimatePresence mode="popLayout">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-3 pt-3"
          >
            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/15 text-indigo-300 text-[12px] font-semibold hover:border-indigo-500/30 transition-all group">
              <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
              <span>AI Command</span>
              <kbd className="ml-auto px-1.5 py-0.5 text-[9px] font-mono bg-[#0a0c14] border border-indigo-500/15 rounded text-indigo-500">⌘K</kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation Groups ─────────────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 mgr-scrollbar-hidden">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="mb-4">
            {!isCollapsed && (
              <h4 className="px-5 mb-1.5 text-[10px] font-bold text-[#3a3f52] uppercase tracking-wider">
                {group.title}
              </h4>
            )}
            {isCollapsed && idx > 0 && (
              <div className="mx-4 mb-2 h-px bg-[#161a26]" />
            )}
            <ul className="space-y-0.5 px-2">
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      relative flex items-center gap-3 px-3 py-2 rounded-xl transition-all group overflow-hidden
                      ${isCollapsed ? 'justify-center' : ''}
                      ${isActive
                        ? 'bg-indigo-500/10 text-indigo-400 font-semibold'
                        : 'text-[#6b7280] hover:text-slate-200 hover:bg-[#12151f]'}
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="mgrSidebarActive"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-500 rounded-r-full"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
                              className="flex-1 whitespace-nowrap flex items-center justify-between min-w-0"
                            >
                              <span className="text-[13px] truncate">{item.label}</span>
                              {item.badge && item.badge > 0 && (
                                <span className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ml-2">
                                  {item.badge}
                                </span>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {isCollapsed && item.badge && item.badge > 0 && (
                          <span className="absolute top-1 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Footer ─────────────────────────────────────── */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-3 border-t border-[#161a26]"
          >
            <div
              onClick={() => { window.location.href = '/' }}
              className="bg-[#12151f] border border-[#1e2231] rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-rose-500/40 hover:bg-rose-500/5 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-900/40 flex items-center justify-center text-indigo-400 font-bold text-sm border border-indigo-500/20 group-hover:bg-rose-500/20 group-hover:text-rose-400 group-hover:border-rose-500/20 transition-colors relative">
                <LogOut className="w-4 h-4 opacity-0 group-hover:opacity-100 absolute transition-opacity" />
                <span className="group-hover:opacity-0 transition-opacity">M</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-slate-200 truncate group-hover:text-rose-400 transition-colors">Manager Portal</div>
                <div className="text-[10px] text-[#4a5068] truncate group-hover:text-rose-400/70 transition-colors">Click to sign out</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed: show small logout icon */}
      {isCollapsed && (
        <div className="p-2 border-t border-[#161a26] flex justify-center">
          <button
            onClick={() => { window.location.href = '/' }}
            className="p-2.5 rounded-xl text-[#4a5068] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </button>
        </div>
      )}
    </motion.aside>
  );
};
