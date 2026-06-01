import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Plus, Moon, Sun, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react';

interface QaTopbarProps {
  user?: any;
  addToast?: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  setActiveView?: (view: string) => void;
}

function getInitialDarkMode(): boolean {
  try {
    if (localStorage.getItem('theme') === 'dark') return true;
    if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
  } catch { /* noop */ }
  return false;
}

export const QaTopbar: React.FC<QaTopbarProps> = ({ user, addToast, setActiveView }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const applyTheme = useCallback((dark: boolean) => {
    setIsDarkMode(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (getInitialDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme') {
        applyTheme(e.newValue === 'dark');
      }
    };
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('themechange', handleThemeChange);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, [applyTheme]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfileMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleDarkMode = () => {
    const newState = !isDarkMode;
    try { localStorage.setItem('theme', newState ? 'dark' : 'light'); } catch (e) { console.error(e); }
    applyTheme(newState);
    try { window.dispatchEvent(new CustomEvent('themechange')); } catch (e) { console.error(e); }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (addToast && searchQuery.trim()) {
      addToast(`Search results for: ${searchQuery.trim()}`, 'info');
      setSearchQuery('');
    }
  };

  return (
    <header className="h-16 lg:h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-4 lg:gap-6 flex-1">
        <form onSubmit={handleSearch} className="relative w-full max-w-md lg:max-w-lg">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search defects, test runs, modules..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 transition-all placeholder-slate-400 dark:placeholder-slate-500"
          />
        </form>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <button
          onClick={() => setActiveView?.('task-board')}
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> New Defect
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          title="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button 
          onClick={() => setActiveView?.('notifications')}
          className="relative p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
        </button>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 lg:mx-2" />

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
            />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">Alex Mercer</p>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 leading-tight">QA Director</p>
            </div>
            <ChevronDown className="hidden lg:block w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/30 py-2 animate-in slide-in-from-top-2 fade-in duration-150 z-50">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Alex Mercer</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">a.mercer@sahara.com</p>
              </div>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <User className="w-4 h-4" /> My Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-1 mt-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
