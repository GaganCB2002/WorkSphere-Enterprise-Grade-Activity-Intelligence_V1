import React from 'react';
import type { OnlineStatus } from '../../types';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: OnlineStatus;
  showStatus?: boolean;
  className?: string;
}

const sizeMap = { xs: 'w-6 h-6 text-[9px]', sm: 'w-8 h-8 text-[10px]', md: 'w-10 h-10 text-xs', lg: 'w-12 h-12 text-sm', xl: 'w-16 h-16 text-lg' };
const statusDotSize = { xs: 'w-1.5 h-1.5', sm: 'w-2 h-2', md: 'w-2.5 h-2.5', lg: 'w-3 h-3', xl: 'w-3.5 h-3.5' };
const statusColors: Record<OnlineStatus, string> = { online: 'bg-emerald-500', away: 'bg-amber-500', busy: 'bg-red-500', offline: 'bg-slate-400' };

const colors = [
  'bg-blue-500', 'bg-purple-500', 'bg-teal-500', 'bg-orange-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-cyan-500', 'bg-emerald-500',
];

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name, src, size = 'md', status, showStatus = true, className = '' }: AvatarProps) {
  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      {src ? (
        <img src={src} alt={name} className={`${sizeMap[size]} rounded-xl object-cover ring-2 ring-white dark:ring-slate-900`} />
      ) : (
        <div className={`${sizeMap[size]} ${getColor(name)} rounded-xl flex items-center justify-center font-bold text-white ring-2 ring-white dark:ring-slate-900 select-none`}>
          {getInitials(name)}
        </div>
      )}
      {showStatus && status && (
        <span className={`absolute -bottom-0.5 -right-0.5 ${statusDotSize[size]} ${statusColors[status]} rounded-full ring-2 ring-white dark:ring-slate-900`} />
      )}
    </div>
  );
}

export function AvatarGroup({ members, max = 4, size = 'sm' }: { members: { name: string; avatar?: string; status?: OnlineStatus }[]; max?: number; size?: AvatarProps['size'] }) {
  const visible = members.slice(0, max);
  const remaining = members.length - max;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((m, i) => (
        <Avatar key={i} name={m.name} src={m.avatar} status={m.status} size={size} showStatus={false} />
      ))}
      {remaining > 0 && (
        <div className={`${sizeMap[size]} rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 ring-2 ring-white dark:ring-slate-900`}>
          +{remaining}
        </div>
      )}
    </div>
  );
}
