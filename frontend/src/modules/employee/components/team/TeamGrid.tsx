import React from 'react';
import { Mail, Phone, MessageSquare, Briefcase } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { Avatar } from '../ui/Avatar';
import { StatusBadge } from '../ui/StatusBadge';
import type { TeamMember } from '../../types';

interface TeamGridProps {
  members: TeamMember[];
  onMessageClick?: (member: TeamMember) => void;
}

export function TeamGrid({ members, onMessageClick }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map(member => (
        <GlassPanel key={member.id} hover className="flex flex-col h-full">
          {/* Top Info */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar name={member.name} status={member.status} size="md" />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{member.name}</h4>
                <p className="text-[11px] text-slate-400 truncate">{member.designation}</p>
              </div>
            </div>
            <StatusBadge label={member.status} variant={
              member.status === 'online' ? 'active' :
              member.status === 'busy' ? 'leave' :
              member.status === 'away' ? 'pending' : 'default'
            } />
          </div>

          {/* Current Activity */}
          <div className="flex-1 space-y-3.5 pb-4">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/[0.03]">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Focus</p>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{member.currentTask || 'No active task'}</p>
            </div>

            {/* Workload Indicator */}
            <div>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-slate-400 font-medium">Workload Balance</span>
                <span className={`font-bold ${member.workload > 85 ? 'text-rose-500' : member.workload > 60 ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {member.workload}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    member.workload > 85 ? 'bg-rose-500' : member.workload > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${member.workload}%` }}
                />
              </div>
            </div>
          </div>

          {/* Shortcuts */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/[0.04] mt-auto">
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              {member.department}
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href={`mailto:${member.email}`}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={() => onMessageClick && onMessageClick(member)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                title="Send Message"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}

export default TeamGrid;
