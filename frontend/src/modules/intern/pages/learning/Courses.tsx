import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, PlayCircle, Calendar, BarChart3 } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const courses = [
  { id: 1, name: 'Enterprise Strategic Planning', provider: 'Coursera', duration: '8 weeks', progress: 50, dueDate: '2026-08-15', status: 'In Progress' },
  { id: 2, name: 'Design Systems & Tokenization', provider: 'Udemy', duration: '5 weeks', progress: 10, dueDate: '2026-09-01', status: 'Not Started' },
  { id: 3, name: 'Advanced React Patterns', provider: 'Pluralsight', duration: '6 weeks', progress: 100, dueDate: '2026-06-30', status: 'Completed' },
  { id: 4, name: 'Data Science Fundamentals', provider: 'Coursera', duration: '8 weeks', progress: 65, dueDate: '2026-08-20', status: 'In Progress' },
  { id: 5, name: 'Cloud Architecture on AWS', provider: 'AWS Training', duration: '10 weeks', progress: 30, dueDate: '2026-09-15', status: 'In Progress' },
  { id: 6, name: 'Agile Project Management', provider: 'LinkedIn Learning', duration: '4 weeks', progress: 100, dueDate: '2026-05-30', status: 'Completed' },
  { id: 7, name: 'Cybersecurity Essentials', provider: 'Coursera', duration: '6 weeks', progress: 0, dueDate: '2026-10-01', status: 'Not Started' },
  { id: 8, name: 'Machine Learning with Python', provider: 'Udemy', duration: '12 weeks', progress: 0, dueDate: '2026-11-15', status: 'Not Started' },
];

const statusFilters = ['All', 'In Progress', 'Completed', 'Not Started'];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    'Completed': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    'Not Started': 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'}`}>
      {status}
    </span>
  );
}

function KpiCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </motion.div>
  );
}

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = courses.filter(c => {
    const matchStatus = activeFilter === 'All' || c.status === activeFilter;
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalCourses = courses.length;
  const inProgress = courses.filter(c => c.status === 'In Progress').length;
  const completed = courses.filter(c => c.status === 'Completed').length;
  const pending = courses.filter(c => c.status === 'Not Started').length;

  return (
    <InternPageShell title="Assigned Courses" description="Training courses assigned to you">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Courses', value: String(totalCourses), icon: BookOpen, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
            { label: 'In Progress', value: String(inProgress), icon: BarChart3, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
            { label: 'Completed', value: String(completed), icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
            { label: 'Pending', value: String(pending), icon: Clock, color: 'text-slate-600 bg-slate-100 dark:bg-slate-500/10 dark:text-slate-400' },
          ].map((kpi, i) => <KpiCard key={kpi.label} {...kpi} />)}
        </div>

        {/* Filters */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-2">
          {statusFilters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Course Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(course => {
            const statusColor = course.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
              course.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
              'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400';
            return (
              <motion.div key={course.id} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-violet-500" />
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{course.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{course.provider}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Due {course.dueDate}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-blue-600 dark:text-blue-400">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-700"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400">Due {course.dueDate}</span>
                    <button className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                      course.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    }`}>
                      {course.status === 'Completed' ? <CheckCircle className="w-3.5 h-3.5" /> : course.status === 'In Progress' ? <PlayCircle className="w-3.5 h-3.5" /> : <PlayCircle className="w-3.5 h-3.5" />}
                      {course.status === 'Completed' ? 'Completed' : course.status === 'In Progress' ? 'Continue' : 'Start'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div variants={item} className="text-center py-16 text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">No courses match your filters</p>
          </motion.div>
        )}
      </motion.div>
    </InternPageShell>
  );
}
