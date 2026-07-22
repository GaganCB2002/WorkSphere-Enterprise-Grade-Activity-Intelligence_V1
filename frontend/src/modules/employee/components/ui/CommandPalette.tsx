import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, CalendarPlus, PlusCircle, MessageSquare, LayoutDashboard, User, Users, Calendar, Clock, ListTodo, BarChart3, Bell } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'leave', label: 'Leave', icon: Calendar },
  { id: 'attendance', label: 'Attendance', icon: Clock },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredNav = useMemo(() => {
    if (!searchQuery) return navItems;
    return navItems.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const quickActions = [
    { label: 'Apply for Leave', icon: CalendarPlus, shortcut: 'Alt+L', tab: 'leave' },
    { label: 'New Task', icon: PlusCircle, shortcut: 'Alt+T', tab: 'tasks' },
    { label: 'Open Chat', icon: MessageSquare, shortcut: 'Alt+C', tab: 'chat' },
  ];

  const filteredActions = useMemo(() => {
    if (!searchQuery) return quickActions;
    return quickActions.filter(action =>
      action.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Palette Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-[101] w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[450px]"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-white/[0.04]">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search pages, commands, or quick actions..."
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto p-2 emp-scrollbar">
            {filteredNav.length > 0 && (
              <div className="mb-2">
                <p className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Pages
                </p>
                {filteredNav.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-left"
                    >
                      <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {filteredActions.length > 0 && (
              <div>
                <p className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Quick Actions
                </p>
                {filteredActions.map(action => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      onClick={() => {
                        onNavigate(action.tab);
                        onClose();
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <span className="font-semibold">{action.label}</span>
                      </span>
                      <kbd className="px-1.5 py-0.5 text-[9px] bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono text-slate-400">
                        {action.shortcut}
                      </kbd>
                    </button>
                  );
                })}
              </div>
            )}

            {filteredNav.length === 0 && filteredActions.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-xs text-slate-400">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CommandPalette;
