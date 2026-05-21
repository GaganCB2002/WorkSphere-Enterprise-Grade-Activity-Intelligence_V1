import React from 'react';

type BadgeVariant = 'active' | 'leave' | 'pending' | 'working' | 'admin' | 'offline' | 'done' | 'blocked' | 'default';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  size?: 'sm' | 'md';
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
  leave: 'bg-red-50 text-red-700 border-red-200/60 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
  pending: 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
  working: 'bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
  admin: 'bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
  offline: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
  done: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
  blocked: 'bg-red-50 text-red-700 border-red-200/60 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
  default: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
};

const dotColors: Record<BadgeVariant, string> = {
  active: 'bg-emerald-500', leave: 'bg-red-500', pending: 'bg-amber-500', working: 'bg-blue-500',
  admin: 'bg-purple-500', offline: 'bg-slate-400', done: 'bg-emerald-500', blocked: 'bg-red-500', default: 'bg-slate-400',
};

export function StatusBadge({ label, variant = 'default', dot = true, size = 'sm', pulse = false }: StatusBadgeProps) {
  const sizeStyles = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${variantStyles[variant]} ${sizeStyles}`}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${dotColors[variant]}`} />}
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[variant]}`} />
        </span>
      )}
      {label}
    </span>
  );
}

// Auto-detect variant from common status strings
export function AutoStatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase().replace(/[_-]/g, ' ');
  let variant: BadgeVariant = 'default';
  if (['active', 'online', 'present', 'approved'].some(v => s.includes(v))) variant = 'active';
  else if (['leave', 'absent', 'rejected', 'blocked', 'cancelled'].some(v => s.includes(v))) variant = 'leave';
  else if (['pending', 'review', 'escalated', 'warning'].some(v => s.includes(v))) variant = 'pending';
  else if (['working', 'in progress', 'wfh', 'busy'].some(v => s.includes(v))) variant = 'working';
  else if (['admin', 'lead', 'manager'].some(v => s.includes(v))) variant = 'admin';
  else if (['done', 'completed', 'resolved'].some(v => s.includes(v))) variant = 'done';
  else if (['offline', 'away'].some(v => s.includes(v))) variant = 'offline';

  return <StatusBadge label={status} variant={variant} />;
}
