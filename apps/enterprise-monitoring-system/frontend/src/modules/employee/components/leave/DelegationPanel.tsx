import React from 'react';
import { ShieldCheck, UserMinus, Flame, Star } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { Avatar } from '../ui/Avatar';
import { StatusBadge } from '../ui/StatusBadge';
import type { DelegationItem } from '../../types';

interface DelegationPanelProps {
  delegations: DelegationItem[];
  onAction?: (id: string, action: 'accept' | 'reject') => void;
}

export function DelegationPanel({ delegations, onAction }: DelegationPanelProps) {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Duty Delegations</h3>
          <p className="text-xs text-slate-400 mt-0.5">Tasks delegated to backups during leave periods</p>
        </div>
      </div>

      {delegations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {delegations.map(del => (
            <div
              key={del.id}
              className="p-4 rounded-xl border border-slate-200/60 dark:border-white/[0.04] bg-slate-50/50 dark:bg-slate-800/10 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all flex flex-col justify-between"
            >
              {/* Task Title & Project */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{del.taskTitle}</h4>
                  <StatusBadge
                    label={del.status}
                    variant={del.status === 'accepted' ? 'active' : del.status === 'rejected' ? 'leave' : 'pending'}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{del.project}</p>
              </div>

              {/* Delegate Details */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/[0.04] pt-3 mt-auto">
                <div className="flex items-center gap-2">
                  <Avatar name={del.delegatedToName} size="xs" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200">{del.delegatedToName}</p>
                    <p className="text-[9px] text-slate-400">Delegate Backup</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <p className="text-[9px] text-slate-400">Skill Fit</p>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center justify-end gap-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {del.skillMatch}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400">Workload</p>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center justify-end gap-0.5">
                      <Flame className="w-3 h-3 text-rose-500" /> +{del.workloadImpact}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Pending */}
              {del.status === 'pending' && onAction && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                  <button
                    onClick={() => onAction(del.id, 'reject')}
                    className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => onAction(del.id, 'accept')}
                    className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-colors"
                  >
                    Accept
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-xs text-slate-400">
          No delegated tasks currently active.
        </div>
      )}
    </GlassPanel>
  );
}

export default DelegationPanel;
