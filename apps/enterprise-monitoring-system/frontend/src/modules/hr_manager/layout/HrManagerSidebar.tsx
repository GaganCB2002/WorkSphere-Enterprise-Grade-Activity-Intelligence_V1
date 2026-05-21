import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, UserPlus, Clock, CalendarDays, 
  Wallet, TrendingUp, GraduationCap, FileText, MonitorDot, 
  MessageSquare, BarChart3, ShieldCheck, Settings, 
  ChevronRight, ChevronLeft, Menu, Radio, Mail, Video
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface NavGroupProps {
  title: string;
  items: NavItemProps[];
  isCollapsed: boolean;
}

interface NavItemProps {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_GROUPS: NavGroupProps[] = [
  {
    title: 'Dashboard',
    isCollapsed: false,
    items: [
      { label: 'HR Overview', path: '/hr/overview', icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: 'Workforce Analytics', path: '/hr/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    ]
  },
  {
    title: 'People',
    isCollapsed: false,
    items: [
      { label: 'Employee Directory', path: '/hr/directory', icon: <Users className="w-5 h-5" /> },
      { label: 'Recruitment', path: '/hr/recruitment', icon: <UserPlus className="w-5 h-5" />, badge: 3 },
      { label: 'Performance', path: '/hr/performance', icon: <TrendingUp className="w-5 h-5" /> },
      { label: 'Training', path: '/hr/training', icon: <GraduationCap className="w-5 h-5" /> },
    ]
  },
  {
    title: 'Operations',
    isCollapsed: false,
    items: [
      { label: 'Attendance & Leave', path: '/hr/time-leave', icon: <Clock className="w-5 h-5" />, badge: 12 },
      { label: 'Payroll & Finance', path: '/hr/payroll', icon: <Wallet className="w-5 h-5" /> },
      { label: 'Assets', path: '/hr/assets', icon: <MonitorDot className="w-5 h-5" /> },
    ]
  },
  {
    title: 'Hub & Communications',
    isCollapsed: false,
    items: [
      { label: 'HR Broadcasts', path: '/hr/communications', icon: <Radio className="w-5 h-5" /> },
      { label: 'Internal Chat', path: '/hr/chat', icon: <MessageSquare className="w-5 h-5" />, badge: 15 },
      { label: 'Webmail', path: '/hr/webmail', icon: <Mail className="w-5 h-5" />, badge: 2 },
      { label: 'Meetings', path: '/hr/meetings', icon: <Video className="w-5 h-5" /> },
    ]
  },
  {
    title: 'Administration',
    isCollapsed: false,
    items: [
      { label: 'Documents & Policies', path: '/hr/documents', icon: <FileText className="w-5 h-5" /> },
      { label: 'Compliance', path: '/hr/compliance', icon: <ShieldCheck className="w-5 h-5" /> },
      { label: 'Settings', path: '/hr/settings', icon: <Settings className="w-5 h-5" /> },
    ]
  }
];

export const HrManagerSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-screen bg-[#0E1117] border-r border-[#21262d] flex flex-col relative z-20 shrink-0"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#21262d]">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <Users className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence mode="popLayout">
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-slate-200 tracking-wide text-sm"
              >
                WorkSphere <span className="text-indigo-400">HR</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        
        {/* Toggle Button */}
        <button 
          onClick={onToggle}
          className="p-1.5 rounded-lg text-[#8b949e] hover:text-slate-200 hover:bg-[#161b22] transition-colors"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="mb-6">
            {!isCollapsed && (
              <h4 className="px-6 mb-2 text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">
                {group.title}
              </h4>
            )}
            <ul className="space-y-1 px-3">
              {group.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group overflow-hidden
                      ${isActive 
                        ? 'bg-indigo-500/10 text-indigo-400 font-semibold' 
                        : 'text-[#8b949e] hover:text-slate-200 hover:bg-[#161b22]'}
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active Indicator Bar */}
                        {isActive && (
                          <motion.div 
                            layoutId="hrSidebarActive"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full"
                          />
                        )}
                        
                        <div className={`shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
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
                              <span className="text-sm">{item.label}</span>
                              {item.badge && (
                                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
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
      
      {/* Footer Profile Mini */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 border-t border-[#21262d] bg-[#0E1117]"
          >
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-3 flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">
                 H
               </div>
               <div className="min-w-0 flex-1">
                 <div className="text-sm font-bold text-slate-200 truncate">HR Operations</div>
                 <div className="text-[10px] text-[#8b949e] truncate">Admin Level</div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.aside>
  );
};
