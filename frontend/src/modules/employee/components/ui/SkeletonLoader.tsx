import React from 'react';

export function SkeletonLoader({ type = 'card' }: { type?: 'card' | 'table' | 'profile' | 'chart' | 'text' }) {
  const shimmer = 'animate-pulse bg-slate-200/60 dark:bg-slate-800/60 rounded-lg';

  if (type === 'text') return <div className="space-y-2"><div className={`${shimmer} h-4 w-3/4`} /><div className={`${shimmer} h-4 w-1/2`} /><div className={`${shimmer} h-4 w-2/3`} /></div>;

  if (type === 'profile') return (
    <div className="flex items-center gap-4 p-6">
      <div className={`${shimmer} w-16 h-16 rounded-xl`} />
      <div className="flex-1 space-y-2"><div className={`${shimmer} h-5 w-40`} /><div className={`${shimmer} h-3 w-24`} /><div className={`${shimmer} h-3 w-32`} /></div>
    </div>
  );

  if (type === 'table') return (
    <div className="space-y-3 p-6">
      <div className={`${shimmer} h-8 w-full`} />
      {[...Array(5)].map((_, i) => <div key={i} className={`${shimmer} h-12 w-full`} />)}
    </div>
  );

  if (type === 'chart') return <div className={`${shimmer} h-64 w-full rounded-2xl`} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between"><div className={`${shimmer} h-4 w-24`} /><div className={`${shimmer} w-10 h-10 rounded-xl`} /></div>
          <div className={`${shimmer} h-7 w-16`} /><div className={`${shimmer} h-3 w-32`} />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon: React.ReactNode; title: string; description: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">{description}</p>
      {action && (
        <button onClick={action.onClick} className="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          {action.label}
        </button>
      )}
    </div>
  );
}
