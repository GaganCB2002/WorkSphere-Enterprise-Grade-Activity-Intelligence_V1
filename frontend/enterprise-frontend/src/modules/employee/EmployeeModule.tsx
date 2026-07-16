import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, User, Users, Calendar, Clock, ListTodo, MessageSquare,
  BarChart3, Bell, ChevronLeft, ChevronRight, Search, Sun, Moon, Command,
  CalendarPlus, LogOut, PlusCircle, Timer, Video, Settings, Sparkles,
  Mail, Zap, X, BookOpen } from 'lucide-react';
import '../../modules/employee/styles/employee.css';

import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { TeamPage } from './pages/TeamPage';
import { LeavePage } from './pages/LeavePage';
import { AttendancePage } from './pages/AttendancePage';
import { TasksPage } from './pages/TasksPage';
import { ChatPage } from './pages/ChatPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { WebmailPage } from './pages/WebmailPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { CommandPalette } from './components/ui/CommandPalette';
import { FloatingChatWidget } from './components/chat/FloatingChatWidget';
import { useNotificationStore } from './store/employeeStore';
import type { PlatformData, User as UserType } from '../../types';
import { LMSView } from '../hr/components/LMSView';


interface EmployeeModuleProps {
  user: UserType;
  platform: PlatformData;
  token: string;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'leave', label: 'Leave', icon: Calendar },
  { id: 'attendance', label: 'Attendance', icon: Clock },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'webmail', label: 'Webmail', icon: Mail },
  { id: 'meetings', label: 'Meetings', icon: Video },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'training', label: 'Training Center', icon: BookOpen },
];

export function EmployeeModule({ user, platform, token }: EmployeeModuleProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { unreadCount } = useNotificationStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCommandOpen(true); }
      if (e.altKey && e.key === 'l') { e.preventDefault(); setActiveTab('leave'); }
      if (e.altKey && e.key === 't') { e.preventDefault(); setActiveTab('tasks'); }
      if (e.altKey && e.key === 'c') { e.preventDefault(); setActiveTab('chat'); }
      if (e.key === 'Escape') setCommandOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filteredNav = useMemo(() => {
    if (!searchQuery) return navItems;
    return navItems.filter(n => n.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage user={user} onNavigate={setActiveTab} />;
      case 'profile': return <ProfilePage />;
      case 'team': return <TeamPage />;
      case 'leave': return <LeavePage />;
      case 'attendance': return <AttendancePage />;
      case 'tasks': return <TasksPage />;
      case 'chat': return <ChatPage />;
      case 'webmail': return <WebmailPage />;
      case 'meetings': return <MeetingsPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'notifications': return <NotificationsPage />;
      case 'training': return <LMSView />;
      default: return <DashboardPage user={user} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-full gap-0">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-shrink-0 flex flex-col bg-white dark:bg-slate-900/80 border-r border-slate-200/60 dark:border-white/[0.06] rounded-2xl overflow-hidden mr-4"
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 p-4 border-b border-slate-100 dark:border-white/[0.04] ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">WorkSphere</p>
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Employee Hub</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User card */}
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mx-3 mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/[0.04]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.role}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 emp-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                data-tooltip={sidebarCollapsed ? item.label : undefined}
                className={`₹${sidebarCollapsed ? 'emp-tooltip' : ''} w-full flex items-center gap-3 rounded-xl transition-all duration-200 ${
                  sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'
                } ${isActive
                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="text-[13px] whitespace-nowrap overflow-hidden">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.id === 'notifications' && unreadCount > 0 && (
                  <span className={`flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[9px] font-bold rounded-full bg-red-500 text-white ${sidebarCollapsed ? 'absolute top-0 right-0' : 'ml-auto'}`}>
                    {unreadCount}
                  </span>
                )}
                {isActive && !sidebarCollapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </button>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-slate-100 dark:border-white/[0.04]">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span className="text-[11px] font-medium">Collapse</span></>}
          </button>
        </div>
      </motion.aside>

      {/* ── Main Content ────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Contextual action bar */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white capitalize">{activeTab === 'dashboard' ? `Welcome back, ${user.name.split(' ')[0]}` : navItems.find(n => n.id === activeTab)?.label}</h2>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Command palette trigger */}
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 text-[9px] bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 font-mono">⌘K</kbd>
            </button>
            {/* Logout Button */}
            <button
              onClick={() => {
                dispatch({ type: 'LOGOUT' });
                navigate('/login');
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 text-xs font-medium hover:bg-rose-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 min-h-0 overflow-y-auto emp-scrollbar pr-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Chat Widget launcher */}
      {activeTab !== 'chat' && (
        <FloatingChatWidget onOpenFullChat={() => setActiveTab('chat')} />
      )}

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onNavigate={setActiveTab}
      />
    </div>
  );
}

export default EmployeeModule;
