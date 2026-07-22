import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const icons = {
  success: CheckCircle, error: XCircle, warning: AlertTriangle, info: Info,
};
const colors = {
  success: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200',
  error: 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200',
  warning: 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200',
  info: 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-800 dark:text-violet-200',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl border-l-4 shadow-xl backdrop-blur-lg animate-in slide-in-from-right-2 fade-in duration-300 max-w-sm ${colors[t.type]}`}
            style={{ animation: 'slideInRight 0.3s ease-out' }}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <p className="text-sm font-semibold flex-1">{t.message}</p>
            <button onClick={() => onRemove(t.id)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
