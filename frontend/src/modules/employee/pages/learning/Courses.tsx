import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, BookOpen } from 'lucide-react';

const courses = [
  { id: 1, title: 'Web Development 101', category: 'Frontend', instructor: 'Amit Sharma', duration: '6 weeks', progress: 100, status: 'Completed' },
  { id: 2, title: 'Advanced Python', category: 'Backend', instructor: 'Priya Patel', duration: '8 weeks', progress: 65, status: 'In Progress' },
  { id: 3, title: 'React Mastery', category: 'Frontend', instructor: 'Rahul Verma', duration: '4 weeks', progress: 30, status: 'In Progress' },
  { id: 4, title: 'Data Engineering', category: 'Data', instructor: 'Neha Gupta', duration: '10 weeks', progress: 0, status: 'Not Started' },
  { id: 5, title: 'ML Foundations', category: 'AI/ML', instructor: 'Dr. Karthik Rajan', duration: '12 weeks', progress: 0, status: 'Not Started' },
  { id: 6, title: 'DevOps Essentials', category: 'DevOps', instructor: 'Vikram Singh', duration: '5 weeks', progress: 100, status: 'Completed' },
  { id: 7, title: 'Project Management', category: 'Management', instructor: 'Sneha Iyer', duration: '4 weeks', progress: 80, status: 'In Progress' },
  { id: 8, title: 'AWS Certification Prep', category: 'Cloud', instructor: 'Ankit Joshi', duration: '8 weeks', progress: 0, status: 'Not Started' },
  { id: 9, title: 'CS Fundamentals', category: 'Computer Science', instructor: 'Prof. Meena Reddy', duration: '16 weeks', progress: 45, status: 'In Progress' },
  { id: 10, title: 'Version Control with Git', category: 'Tools', instructor: 'Rohit Kapoor', duration: '2 weeks', progress: 100, status: 'Completed' },
  { id: 11, title: 'Cybersecurity Basics', category: 'Security', instructor: 'Arun Nair', duration: '6 weeks', progress: 10, status: 'In Progress' },
  { id: 12, title: 'UI/UX Design Principles', category: 'Design', instructor: 'Kavita Das', duration: '4 weeks', progress: 0, status: 'Not Started' },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Not Started': 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Courses"
      description="Browse and track your learning courses"
      breadcrumbs={['Employee', 'Learning', 'Courses']}
      actions={
        <div className="flex items-center gap-2">
          {[Filter, Download, RefreshCw].map((Icon, i) => (
            <button key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search courses..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(c => (
          <GlassPanel key={c.id} className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{c.title}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span>{c.category}</span>
                  <span>·</span>
                  <span>{c.instructor}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-400">{c.duration}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${statusColors[c.status]}`}>{c.status}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all" style={{ width: `${c.progress}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 text-right">{c.progress}%</p>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
