import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'profile', label: 'Profile', icon: 'person' },
  { id: 'tasks', label: 'Tasks', icon: 'assignment' },
  { id: 'projects', label: 'Projects', icon: 'account_tree' },
  { id: 'learning', label: 'Learning', icon: 'school' },
  { id: 'evaluations', label: 'Evaluations', icon: 'assessment' },
  { id: 'team', label: 'Team', icon: 'groups' },
  { id: 'chat', label: 'Chat', icon: 'forum' },
  { id: 'ai', label: 'AI Helper', icon: 'smart_toy' },
  { id: 'attendance', label: 'Attendance', icon: 'event_available' },
];

const bottomNavItems = [
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar({ currentTab, setCurrentTab, onLogout, collapsed, onToggleCollapse }) {
  return (
    <nav className={`h-screen ${collapsed ? 'w-20' : 'w-64'} fixed left-0 top-0 bg-[#211B17] border-r border-[#3A302A]/30 shadow-sm z-50 flex flex-col py-6 select-none transition-all duration-300 ease-in-out`}>
      {/* Brand Logo & Header */}
      <div className={`px-4 mb-8 flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-6'}`}>
        <div className="w-10 h-10 rounded-xl bg-[#C2652A]/20 flex items-center justify-center text-[#C2652A]">
          <span className="material-symbols-outlined icon-fill text-2xl">local_fire_department</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-headline text-xl font-bold text-[#FAF6F0] leading-tight whitespace-nowrap">Sahara Intern</h1>
            <p className="font-label text-xs text-[#A89890] whitespace-nowrap">Enterprise Portal</p>
          </div>
        )}
      </div>

      {/* Hamburger Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute top-6 right-3 w-8 h-8 flex items-center justify-center rounded-lg text-[#A89890] hover:text-[#FAF6F0] hover:bg-white/10 transition-all duration-200"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <span className="material-symbols-outlined text-xl">{collapsed ? 'menu_open' : 'menu'}</span>
      </button>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl mx-0 transition-all duration-200 ease-in-out font-medium text-left ${
                isActive
                  ? 'bg-[#C2652A]/15 text-[#E08850] font-semibold'
                  : 'text-[#A89890] hover:text-[#FAF6F0] hover:bg-white/5'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className={`material-symbols-outlined text-xl ${isActive ? 'icon-fill' : ''}`}>
                {item.icon}
              </span>
              {!collapsed && <span className="font-body text-sm whitespace-nowrap">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Bottom Navigation Links */}
      <div className="mt-auto px-2 space-y-1 pt-4 border-t border-[#3A302A]/30">
        {bottomNavItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl mx-0 transition-all duration-200 ease-in-out font-medium text-left ${
                isActive
                  ? 'bg-[#C2652A]/15 text-[#E08850] font-semibold'
                  : 'text-[#A89890] hover:text-[#FAF6F0] hover:bg-white/5'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className={`material-symbols-outlined text-xl ${isActive ? 'icon-fill' : ''}`}>
                {item.icon}
              </span>
              {!collapsed && <span className="font-body text-sm whitespace-nowrap">{item.label}</span>}
            </button>
          );
        })}
        {/* Logout Item */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl mx-0 transition-all duration-200 ease-in-out font-medium text-left text-[#E8A0A0] hover:bg-rose-500/10 mt-1`}
          title={collapsed ? 'Logout' : undefined}
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          {!collapsed && <span className="font-body text-sm whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </nav>
  );
}

