import React from 'react';
import {
  LayoutDashboard, Users, FolderKanban, ClipboardList, CalendarDays,
  Clock, CalendarX, UsersRound, LineChart, CheckSquare,
  TrendingUp, MessageSquare, Bell, Bot, Settings, ChevronLeft, ChevronRight,
  Bug
} from 'lucide-react';

interface QaSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  group: string;
}

export const QaSidebar: React.FC<QaSidebarProps> = ({ activeView, setActiveView, isCollapsed = false, onToggleCollapse }) => {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, group: 'Overview' },
    { id: 'task-board', label: 'Defect Management', icon: <Bug className="w-5 h-5" />, badge: 18, group: 'Quality' },
    { id: 'team-management', label: 'Team Management', icon: <Users className="w-5 h-5" />, group: 'Quality' },
    { id: 'project-management', label: 'Projects', icon: <FolderKanban className="w-5 h-5" />, group: 'Quality' },
    { id: 'sprint-planning', label: 'Sprint Planning', icon: <CalendarDays className="w-5 h-5" />, group: 'Planning' },
    { id: 'attendance', label: 'Attendance', icon: <Clock className="w-5 h-5" />, group: 'Planning' },
    { id: 'leave-management', label: 'Leave Management', icon: <CalendarX className="w-5 h-5" />, group: 'Planning' },
    { id: 'meetings', label: 'Meetings', icon: <UsersRound className="w-5 h-5" />, group: 'Planning' },
    { id: 'reports', label: 'Reports & Analytics', icon: <LineChart className="w-5 h-5" />, group: 'Analytics' },
    { id: 'approvals', label: 'Approvals', icon: <CheckSquare className="w-5 h-5" />, group: 'Workflow' },
    { id: 'performance', label: 'Performance', icon: <TrendingUp className="w-5 h-5" />, group: 'Workflow' },
    { id: 'chat', label: 'Team Chat', icon: <MessageSquare className="w-5 h-5" />, group: 'Collaboration' },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, group: 'Collaboration' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: <Bot className="w-5 h-5" />, group: 'Collaboration' },
  ];

  const groups = [...new Set(menuItems.map(m => m.group))];

  return (
    <aside className={`${isCollapsed ? 'w-[72px]' : 'w-[280px]'} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0 transition-all duration-300 relative z-20`}>
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-b border-slate-200 dark:border-slate-800`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20 shrink-0">
            <Bug className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate">QA Command</h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Quality Engineering</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-hide">
        {!isCollapsed && groups.map(group => (
          <div key={group} className="mb-1">
            <p className="px-6 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">{group}</p>
            {menuItems.filter(m => m.group === group).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm font-semibold transition-all duration-150 relative ${
                  activeView === item.id
                    ? 'text-violet-600 dark:text-violet-400 bg-violet-50/80 dark:bg-violet-600/10 border-r-3 border-violet-600 dark:border-violet-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left truncate">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-bold leading-none">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
        {isCollapsed && menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center justify-center py-3 text-sm transition-all duration-150 relative ${
              activeView === item.id
                ? 'text-violet-600 dark:text-violet-400 bg-violet-50/80 dark:bg-violet-600/10'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
            title={item.label}
          >
            {item.icon}
            {item.badge && (
              <span className="absolute top-1.5 right-2.5 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className={`${isCollapsed ? 'p-3' : 'p-4'} border-t border-slate-200 dark:border-slate-800`}>
        {!isCollapsed ? (
          <div className="flex items-center gap-3 px-2 py-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Alex Mercer"
              className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">Alex Mercer</h3>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                QA Director
              </p>
            </div>
            <button
              onClick={() => setActiveView('settings')}
              className={`p-1.5 rounded-lg transition-colors ${activeView === 'settings' ? 'text-violet-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Alex Mercer"
              className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-700 shadow-sm shrink-0"
            />
          </div>
        )}
      </div>

      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-30"
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>
    </aside>
  );
};
