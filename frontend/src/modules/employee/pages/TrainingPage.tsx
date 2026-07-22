import React, { useState } from 'react';
import { BookOpen, Clock, Award, BarChart3, Filter, Download, ChevronRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
import { GlassPanel } from '../components/ui/GlassPanel';
import { StatusBadge } from '../components/ui/StatusBadge';

const MOCK_COURSES = [
  { id: 'cr-1', title: 'Enterprise React Architecture', provider: 'WorkSphere Academy', duration: '6h 30m', progress: 80, status: 'in_progress', category: 'Frontend', dueDate: '2026-06-15' },
  { id: 'cr-2', title: 'Advanced TypeScript Patterns', provider: 'Frontend Masters', duration: '4h 15m', progress: 45, status: 'in_progress', category: 'Language', dueDate: '2026-06-30' },
  { id: 'cr-3', title: 'AWS Solutions Architect Prep', provider: 'AWS Training', duration: '12h', progress: 100, status: 'completed', category: 'Cloud', dueDate: '2026-05-01' },
  { id: 'cr-4', title: 'Microservices Design Patterns', provider: 'Udemy Business', duration: '8h', progress: 100, status: 'completed', category: 'Backend', dueDate: '2026-04-15' },
  { id: 'cr-5', title: 'Data Privacy & Compliance 2026', provider: 'HR Compliance', duration: '2h', progress: 10, status: 'not_started', category: 'Compliance', dueDate: '2026-07-01' },
  { id: 'cr-6', title: 'Kubernetes for Developers', provider: 'Cloud Native Academy', duration: '5h', progress: 0, status: 'not_started', category: 'DevOps', dueDate: '2026-07-15' },
];

export function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'completed'>('all');

  const filtered = MOCK_COURSES.filter(c => {
    if (activeTab === 'in_progress') return c.status === 'in_progress';
    if (activeTab === 'completed') return c.status === 'completed';
    return true;
  });

  const inProgress = MOCK_COURSES.filter(c => c.status === 'in_progress').length;
  const completed = MOCK_COURSES.filter(c => c.status === 'completed').length;

  return (
    <EmployeePageLayout
      title="Training"
      description="Upskill with curated courses and track your learning progress"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Training' }]}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-4">
        <GlassPanel className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500"><BookOpen className="w-5 h-5" /></div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Courses</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{MOCK_COURSES.length}</p>
          </div>
        </GlassPanel>
        <GlassPanel className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500"><BarChart3 className="w-5 h-5" /></div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">In Progress</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{inProgress}</p>
          </div>
        </GlassPanel>
        <GlassPanel className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Award className="w-5 h-5" /></div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Completed</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{completed}</p>
          </div>
        </GlassPanel>
      </div>

      <div className="flex items-center gap-2">
        {(['all', 'in_progress', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${activeTab === tab ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            {tab === 'all' ? 'All' : tab === 'in_progress' ? 'In Progress' : 'Completed'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(course => (
          <motion.div
            key={course.id}
            layout
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                  {course.status === 'completed' ? <Award className="w-5 h-5" /> : course.status === 'in_progress' ? <BarChart3 className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{course.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{course.provider} • {course.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {course.status === 'in_progress' && (
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400">{course.progress}%</span>
                  </div>
                )}
                <StatusBadge
                  label={course.status === 'in_progress' ? 'In Progress' : course.status === 'completed' ? 'Completed' : 'Not Started'}
                  variant={course.status === 'completed' ? 'done' : course.status === 'in_progress' ? 'working' : 'pending'}
                />
                {course.status !== 'completed' && (
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-[10px] font-semibold transition-colors">
                    <Play className="w-3 h-3" /> Continue
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </EmployeePageLayout>
  );
}

export default TrainingPage;
