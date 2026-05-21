import React from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, Video, Sparkles, Clock, ListTodo, Timer, CalendarPlus, Zap } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { StatusBadge } from '../ui/StatusBadge';
import { ProgressRing } from '../ui/ProgressRing';
import { AvatarGroup } from '../ui/Avatar';
import { ActivityTimeline } from './ActivityTimeline';
import type { Task, Sprint, UpcomingMeeting, AIInsight, WeeklyMetric } from '../../types';

interface WidgetGridProps {
  tasks: Task[];
  sprint: Sprint;
  meetings: UpcomingMeeting[];
  insights: AIInsight[];
  activities: any[];
  weeklyProductivity: WeeklyMetric[];
  onNavigate: (tab: string) => void;
}

export function WidgetGrid({
  tasks,
  sprint,
  meetings,
  insights,
  activities,
  weeklyProductivity,
  onNavigate
}: WidgetGridProps) {
  // Subtasks and status filters for active tasks
  const activeTasks = tasks.filter(t => t.status !== 'done' && t.status !== 'backlog').slice(0, 4);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Left Column — 2/3 */}
      <div className="xl:col-span-2 space-y-6">
        {/* Productivity Chart */}
        <GlassPanel>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Weekly Productivity</h3>
              <p className="text-xs text-slate-400 mt-0.5 font-normal">Your work efficiency across this week</p>
            </div>
            <StatusBadge label="Above Average" variant="active" />
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProductivity}>
                <defs>
                  <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <RTooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                <Area type="monotone" dataKey="target" stroke="#64748b" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} fill="url(#prodGrad)" dot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        {/* Active Tasks */}
        <GlassPanel>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Tasks</h3>
            <button
              onClick={() => onNavigate('tasks')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {activeTasks.map(task => (
              <div
                key={task.id}
                onClick={() => onNavigate('tasks')}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: task.projectColor }} />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{task.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">{task.project} • Due {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge label={task.priority} variant={task.priority === 'critical' ? 'leave' : task.priority === 'high' ? 'pending' : 'default'} dot={false} />
                  <div className="w-16">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span>{task.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${task.progress}%`, backgroundColor: task.projectColor }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Right Column — 1/3 */}
      <div className="space-y-6">
        {/* Sprint Progress */}
        <GlassPanel>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sprint Progress</h3>
            <StatusBadge label={sprint.status} variant="active" />
          </div>
          <p className="text-xs text-slate-400 mb-4">{sprint.name}</p>
          <div className="flex justify-center mb-4">
            <ProgressRing
              value={Math.round((sprint.completedPoints / sprint.totalPoints) * 100)}
              size={100}
              strokeWidth={8}
              color="#3b82f6"
              label="Done"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-lg font-bold text-slate-900 dark:text-white">{sprint.completedPoints}</p>
              <p className="text-[10px] text-slate-400 font-semibold">Completed</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {sprint.totalPoints - sprint.completedPoints}
              </p>
              <p className="text-[10px] text-slate-400 font-semibold">Remaining</p>
            </div>
          </div>
        </GlassPanel>

        {/* Upcoming Meetings */}
        <GlassPanel>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Upcoming Meetings</h3>
          <div className="space-y-2">
            {meetings.map(mtg => (
              <div
                key={mtg.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  mtg.type === 'standup' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                  mtg.type === '1on1' ? 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' :
                  'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                }`}>
                  <Video className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{mtg.title}</p>
                  <p className="text-[9px] text-slate-400 font-semibold">{mtg.time} • {mtg.duration}</p>
                </div>
                <AvatarGroup members={mtg.attendees} max={2} size="xs" />
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* AI Insights */}
        <GlassPanel>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Insights</h3>
          </div>
          <div className="space-y-2">
            {insights.slice(0, 3).map(insight => (
              <div
                key={insight.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/[0.04]"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-lg flex-shrink-0 mt-0.5">{insight.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{insight.title}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed font-normal">{insight.description}</p>
                    {insight.actionable && insight.actionLabel && (
                      <button
                        onClick={() => {
                          if (insight.actionLabel?.includes('Tasks')) onNavigate('tasks');
                        }}
                        className="mt-2 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        {insight.actionLabel} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Activity Timeline */}
        <ActivityTimeline activities={activities} />
      </div>
    </div>
  );
}

export default WidgetGrid;
