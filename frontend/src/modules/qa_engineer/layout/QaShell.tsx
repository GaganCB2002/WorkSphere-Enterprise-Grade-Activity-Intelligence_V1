/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useCallback } from 'react';
import { QaSidebar } from './QaSidebar';
import { QaTopbar } from './QaTopbar';
import { ToastContainer } from '../components/Toast';

interface QaShellProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
  user?: any;
}

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export const QaShellContext = React.createContext<{
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}>({ addToast: () => {} });

export const QaShell: React.FC<QaShellProps> = ({ children, activeView, setActiveView, user }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = String(Date.now());
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <QaShellContext.Provider value={{ addToast }}>
      <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
        <QaSidebar activeView={activeView} setActiveView={setActiveView} isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
        <div className="flex-1 flex flex-col min-w-0">
          <QaTopbar user={user} addToast={addToast} setActiveView={setActiveView} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-6 lg:p-8 xl:p-10 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </QaShellContext.Provider>
  );
};
