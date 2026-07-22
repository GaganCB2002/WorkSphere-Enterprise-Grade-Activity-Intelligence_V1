import React from 'react';
import { TrendingUp, Target, Award, BarChart3, Star, Filter, Download, RefreshCw, ChevronRight } from 'lucide-react';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
import { GlassPanel } from '../components/ui/GlassPanel';
import { StatCard } from '../components/ui/StatCard';
import { ProgressRing } from '../components/ui/ProgressRing';
import { StatusBadge } from '../components/ui/StatusBadge';

const MOCK_PERFORMANCE = {
  score: 94,
  departmentAvg: 82,
  goalsCompleted: 8,
  totalGoals: 12,
  streakDays: 15,
  monthlyTrend: [
    { month: 'Jan', score: 78 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 88 },
    { month: 'May', score: 91 },
    { month: 'Jun', score: 94 },
  ],
  goals: [
    { id: 'g1', title: 'Complete React micro-frontend migration', progress: 90, status: 'on_track', category: 'Engineering' },
    { id: 'g2', title: 'Achieve 90%+ test coverage on new modules', progress: 75, status: 'on_track', category: 'Quality' },
    { id: 'g3', title: 'Lead 3 team knowledge-sharing sessions', progress: 100, status: 'completed', category: 'Leadership' },
    { id: 'g4', title: 'Reduce production incident response time by 30%', progress: 40, status: 'at_risk', category: 'Reliability' },
    { id: 'g5', title: 'Complete AWS Solutions Architect certification', progress: 100, status: 'completed', category: 'Learning' },
    { id: 'g6', title: 'Mentor 2 junior developers through onboarding', progress: 60, status: 'on_track', category: 'Mentorship' },
  ],
  feedback: [
    { id: 'f1', author: 'Sarah Chen', role: 'Engineering Manager', text: 'Excellent work on the dashboard refactor — clean architecture and well-documented code.', date: '2026-06-18', rating: 5 },
    { id: 'f2', author: 'Marcus Johnson', role: 'Senior Developer', text: 'Gagan showed great initiative in the performance optimization sprint. Highly collaborative.', date: '2026-06-12', rating: 4 },
    { id: 'f3', author: 'Priya Patel', role: 'Product Manager', text: 'Delivered the reporting module ahead of schedule with zero critical bugs.', date: '2026-06-05', rating: 5 },
    { id: 'f4', author: 'Alex Rodriguez', role: 'Tech Lead', text: 'Consistently brings innovative solutions to technical discussions.', date: '2026-05-28', rating: 4 },
  ],
};

function getGoalVariant(status: string) {
  if (status === 'completed') return 'done' as const;
  if (status === 'on_track') return 'active' as const;
  if (status === 'at_risk') return 'blocked' as const;
  return 'pending' as const;
}

function getGoalLabel(status: string) {
  if (status === 'completed') return 'Completed';
  if (status === 'on_track') return 'On Track';
  if (status === 'at_risk') return 'At Risk';
  return 'Not Started';
}

export function PerformancePage() {
  return (
    <EmployeePageLayout
      title="Performance"
      description="Track your performance metrics, goals, and feedback"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Performance' }]}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Overall Score" value="94" change={6} trend="up" changeLabel="vs last quarter" icon="trending" color="#10b981" bgColor="rgba(16,185,129,0.1)" delay={0} />
        <StatCard label="Dept Average" value="82%" change={2} trend="up" changeLabel="company wide" icon="chart" color="#3b82f6" bgColor="rgba(59,130,246,0.1)" delay={0.05} />
        <StatCard label="Goals Completed" value="8/12" trend="neutral" changeLabel="this quarter" icon="target" color="#f59e0b" bgColor="rgba(245,158,11,0.1)" delay={0.1} />
        <StatCard label="Streak Days" value={15} change={5} trend="up" changeLabel="best this year" icon="zap" color="#8b5cf6" bgColor="rgba(139,92,246,0.1)" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Performance Score Trend</h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">Last 6 months</span>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <ProgressRing value={MOCK_PERFORMANCE.score} size={100} strokeWidth={8} color={MOCK_PERFORMANCE.score >= 80 ? '#10b981' : MOCK_PERFORMANCE.score >= 60 ? '#f59e0b' : '#ef4444'} label="Current" sublabel="Score" />
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Department Avg</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{MOCK_PERFORMANCE.departmentAvg}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Monthly Growth</p>
                  <p className="text-sm font-bold text-emerald-500">+2.1% avg</p>
                </div>
              </div>
            </div>
            <div className="flex items-end gap-2 h-24">
              {MOCK_PERFORMANCE.monthlyTrend.map((m, i) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-bold text-slate-900 dark:text-white">{m.score}%</span>
                  <div
                    className="w-full rounded-md transition-all"
                    style={{
                      height: `${m.score}%`,
                      backgroundColor: m.score >= 80 ? '#10b981' : m.score >= 60 ? '#f59e0b' : '#ef4444',
                      opacity: 0.75,
                    }}
                  />
                  <span className="text-[9px] font-semibold text-slate-400">{m.month}</span>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Target className="w-4 h-4 text-brand-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Goals</h3>
            </div>
            <div className="space-y-4">
              {MOCK_PERFORMANCE.goals.map(goal => (
                <div key={goal.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{goal.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{goal.category}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2 w-28">
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${goal.progress}%`,
                            backgroundColor: goal.status === 'completed' ? '#10b981' : goal.status === 'at_risk' ? '#ef4444' : '#3b82f6',
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 w-7 text-right">{goal.progress}%</span>
                    </div>
                    <StatusBadge label={getGoalLabel(goal.status)} variant={getGoalVariant(goal.status)} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <div className="space-y-6">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Feedback</h3>
            </div>
            <div className="space-y-4">
              {MOCK_PERFORMANCE.feedback.map(fb => (
                <div key={fb.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{fb.author}</p>
                      <p className="text-[9px] text-slate-400 font-medium">{fb.role}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: fb.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed italic">"{fb.text}"</p>
                  <p className="text-[9px] text-slate-400 font-medium mt-2">{fb.date}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Achievements</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200/40 dark:border-amber-500/10">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Top Performer Q2</p>
                  <p className="text-[9px] text-slate-400 font-medium">Awarded Jun 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-200/40 dark:border-blue-500/10">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">5-Star Feedback Streak</p>
                  <p className="text-[9px] text-slate-400 font-medium">4 consecutive reviews</p>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </EmployeePageLayout>
  );
}

export default PerformancePage;
