import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, ListTodo, CalendarCheck, Clock, TrendingUp,
  FolderKanban, BarChart3, Sparkles, Bell, FileText, Boxes,
  MessageCircle, Settings, User, ChevronLeft, Menu, Zap, LogOut,
  Shield, CheckSquare, Calendar
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
    title: '',
    items: [
      { label: 'Dashboard', path: '/manager/overview', icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: 'Team Management', path: '/manager/team', icon: <Users className="w-5 h-5" /> },
      { label: 'Project Management', path: '/manager/projects', icon: <FolderKanban className="w-5 h-5" /> },
      { label: 'Task Board', path: '/manager/tasks', icon: <CheckSquare className="w-5 h-5" /> },
      { label: 'Sprint Planning', path: '/manager/sprints', icon: <Calendar className="w-5 h-5" /> },
      { label: 'Reports & Analytics', path: '/manager/analytics', icon: <BarChart3 className="w-5 h-5" /> },
      { label: 'AI Assistant', path: '/manager/ai', icon: <Sparkles className="w-5 h-5" /> },
      { label: 'Settings', path: '/manager/settings', icon: <Settings className="w-5 h-5" /> },
    ]
  }
];

export const ManagerSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="h-screen bg-background border-r border-surface-variant flex flex-col relative z-20 shrink-0 select-none shadow-[2px_0_10px_rgba(0,0,0,0.02)]"
    >
      {/* ── Brand Header ───────────────────────────────── */}
      <div className="h-[80px] flex items-center justify-between px-6 shrink-0 relative">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <AnimatePresence mode="popLayout">
            {!isCollapsed ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col mt-2"
              >
                <span className="font-headline font-bold text-[#8a4a33] text-[22px] leading-none tracking-tight italic">
                  Sahara Enterprise
                </span>
                <span className="text-[9px] text-outline font-bold uppercase tracking-widest mt-1.5 ml-0.5">Management Suite</span>
              </motion.div>
            ) : (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-headline font-bold text-[#8a4a33] text-3xl leading-none italic mx-auto"
              >
                S
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Navigation Groups ─────────────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 mgr-scrollbar-hidden">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="mb-4">
            <ul className="space-y-1.5 px-3">
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      relative flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all group overflow-hidden
                      ${isCollapsed ? 'justify-center' : ''}
                      ${isActive
                        ? 'bg-surface text-[#9b593e] font-bold shadow-sm'
                        : 'text-on-surface-variant font-medium hover:text-[#9b593e] hover:bg-surface-variant'}
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="mgrSidebarActive"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[60%] bg-[#9b593e] rounded-r-full"
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
                              <span className="text-[14px]">{item.label}</span>
                              {item.badge && item.badge > 0 && (
                                <span className="bg-[#9b593e]/10 text-[#9b593e] text-[10px] font-bold px-2 py-0.5 rounded-full text-center ml-2">
                                  {item.badge}
                                </span>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {isCollapsed && item.badge && item.badge > 0 && (
                          <span className="absolute top-2 right-2 w-2 h-2 bg-[#9b593e] rounded-full" />
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

      {/* ── Footer / Collapse Toggle ─────────────────────────────────────── */}
      <div className="p-4 flex items-center justify-end border-t border-surface-variant">
          <button
          onClick={onToggle}
          className="p-2 rounded-full text-outline hover:text-primary hover:bg-surface transition-colors shadow-sm border border-surface-variant bg-background z-10 relative"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

    </motion.aside>
  );
};
