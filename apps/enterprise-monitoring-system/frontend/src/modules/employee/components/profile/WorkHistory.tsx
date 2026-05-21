import React from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { StatusBadge } from '../ui/StatusBadge';
import type { WorkHistoryEntry } from '../../types';

interface WorkHistoryProps {
  workHistory: WorkHistoryEntry[];
}

export function WorkHistory({ workHistory }: WorkHistoryProps) {
  return (
    <GlassPanel animate>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Work History</h3>
      <div className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-3 pl-6 space-y-6">
        {workHistory.map(entry => (
          <div key={entry.id} className="relative">
            <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900" />
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{entry.role}</h4>
              {!entry.to && <StatusBadge label="Current" variant="active" dot={false} />}
            </div>
            <p className="text-xs text-slate-500">{entry.department} • {entry.project}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {new Date(entry.from).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} —{' '}
              {entry.to
                ? new Date(entry.to).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : 'Present'}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {entry.description}
            </p>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export default WorkHistory;
