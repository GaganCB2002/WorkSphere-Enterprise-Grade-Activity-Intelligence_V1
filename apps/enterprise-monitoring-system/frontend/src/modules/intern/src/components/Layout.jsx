import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children, currentTab, setCurrentTab, darkMode, setDarkMode, onLogout, sidebarCollapsed, onToggleSidebar }) {
  return (
    <div className="bg-white text-on-background dark:bg-inverse-surface dark:text-on-surface dark:text-surface-bright min-h-screen w-screen flex overflow-hidden transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onLogout={onLogout} 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={onToggleSidebar} 
      />

      {/* Main Content Layout Wrapper */}
      <div className={`${sidebarCollapsed ? 'ml-20' : 'ml-64'} flex-1 flex flex-col h-screen relative overflow-hidden bg-white dark:bg-on-secondary-fixed transition-all duration-300 ease-in-out`}>
        {/* Header Navigation */}
        <Header 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Content Canvas */}
        <div className="flex-1 mt-16 w-full h-[calc(100vh-4rem)] overflow-hidden relative flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
