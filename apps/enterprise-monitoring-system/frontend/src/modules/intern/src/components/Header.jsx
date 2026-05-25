import React, { useState, useEffect } from 'react';

export default function Header({ currentTab, setCurrentTab, darkMode, setDarkMode, sidebarCollapsed }) {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const getTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Intern Management';
      case 'profile': return 'Intern Profile';
      case 'tasks': return 'Task Board';
      case 'projects': return 'Projects Hub';
      case 'learning': return 'Learning Hub';
      case 'evaluations': return 'Assessments & Reviews';
      case 'team': return 'Mentor & Team';
      case 'chat': return 'Chat & Forums';
      case 'ai': return 'AI Assistant';
      case 'attendance': return 'Attendance & Time Tracking';
      case 'notifications': return 'Notifications Center';
      case 'settings': return 'System Settings';
      case 'admin': return 'HR Admin Portal';
      default: return 'Sahara Portal';
    }
  };

  return (
    <header className={`fixed top-0 right-0 ${sidebarCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-16rem)]'} h-16 z-40 bg-white/90 dark:bg-[#1B1613]/90 backdrop-blur-md border-b border-outline-variant/30 flex justify-between items-center px-8 transition-all duration-300 ease-in-out select-none`}>
      <div className="flex items-center gap-4">
        {/* Title removed to avoid clashing with the page-level headers */}
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative group focus-within:ring-2 focus-within:ring-primary/20 rounded-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-outline text-sm" data-icon="search">search</span>
          <input 
            className="bg-surface-container-low dark:bg-on-secondary-fixed border border-outline-variant/50 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-surface-bright font-body w-48 focus:w-64 transition-all placeholder-on-surface-variant/60" 
            placeholder="Search..." 
            type="text"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 text-on-surface-variant dark:text-outline">
          {/* Theme Toggle Pill Switch */}
          <button 
            onClick={toggleTheme}
            className="w-[44px] h-[22px] rounded-full bg-outline-variant/35 dark:bg-[#C2652A]/20 border border-outline-variant/50 dark:border-[#C2652A]/30 relative transition-all duration-300 flex items-center p-0.5"
            title="Toggle theme"
          >
            <div className={`w-[18px] h-[18px] rounded-full bg-[#C2652A] shadow-md transform transition-transform duration-300 ${
              darkMode ? 'translate-x-[20px]' : 'translate-x-0'
            }`} />
          </button>
          
          <button 
            onClick={() => setCurrentTab('notifications')}
            className="hover:text-primary dark:hover:text-primary dark:text-primary-fixed transition-colors relative flex items-center" 
            title="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <button 
            className="hover:text-primary dark:hover:text-primary dark:text-primary-fixed transition-colors flex items-center" 
            title="Help"
          >
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>

        <div className="h-6 w-px bg-outline-variant/30"></div>

        {/* AI Assistant CTA */}
        {currentTab !== 'ai' && (
          <button 
            onClick={() => setCurrentTab('ai')}
            className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-soft flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">smart_toy</span>
            <span>AI Assistant</span>
          </button>
        )}

        {/* User avatar */}
        <img 
          alt="User Profile" 
          onClick={() => setCurrentTab('profile')}
          className="w-8 h-8 rounded-full border border-outline-variant/50 object-cover cursor-pointer hover:border-primary transition-all" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQmWKinkaFgkzwU1pX0t51URNAb58_gJGLU46mCyAx6iK1Jax55qmVp64pg7yZo3zjWerOXy6TuhqtNG1_27nG39wmVyxWSCylSkVY52X6CZVLnqxt64CFahAOnqG854eD0JVzyhMPI0WZ94NWrtiIAjMs9kuyk2dNurAQM23z_SQPv6jxAr1y3Z7XbdE6GFSMA2iMtZn7Qe3evycir6oecQb-37yDf0QzCzth3HU-C5xBM9quPrZbLprli2OwgY-H0uzckLIOMjo"
        />
      </div>
    </header>
  );
}
