import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Calendar } from 'lucide-react';

const events = [
  { id: 1, name: 'Angular Workshop', instructor: 'Amit Sharma', date: '2026-04-15', time: '10:00 AM', duration: '3h', location: 'Room 201', status: 'Upcoming' },
  { id: 2, name: 'AWS Cloud Practitioner Prep', instructor: 'Priya Patel', date: '2026-04-16', time: '2:00 PM', duration: '2h', location: 'Virtual - Zoom', status: 'Upcoming' },
  { id: 3, name: 'Docker & Kubernetes Deep Dive', instructor: 'Vikram Singh', date: '2026-04-18', time: '9:00 AM', duration: '4h', location: 'Lab A', status: 'Upcoming' },
  { id: 4, name: 'Data Science with Python', instructor: 'Neha Gupta', date: '2026-04-14', time: '11:00 AM', duration: '2h', location: 'Room 305', status: 'Ongoing' },
  { id: 5, name: 'Agile Leadership Training', instructor: 'Sneha Iyer', date: '2026-04-14', time: '3:00 PM', duration: '1.5h', location: 'Board Room', status: 'Ongoing' },
  { id: 6, name: 'Cybersecurity Awareness', instructor: 'Arun Nair', date: '2026-04-12', time: '10:00 AM', duration: '2h', location: 'Auditorium', status: 'Completed' },
  { id: 7, name: 'GraphQL API Design', instructor: 'Rahul Verma', date: '2026-04-11', time: '1:00 PM', duration: '3h', location: 'Lab B', status: 'Completed' },
  { id: 8, name: 'Effective Communication Skills', instructor: 'Kavita Das', date: '2026-04-20', time: '10:30 AM', duration: '2h', location: 'Room 101', status: 'Upcoming' },
  { id: 9, name: 'Terraform Infrastructure as Code', instructor: 'Ankit Joshi', date: '2026-04-22', time: '9:00 AM', duration: '4h', location: 'Virtual - Teams', status: 'Upcoming' },
  { id: 10, name: 'Introduction to Go Programming', instructor: 'Prof. Meena Reddy', date: '2026-04-13', time: '2:00 PM', duration: '2.5h', location: 'Lab C', status: 'Completed' },
];

const statusColors: Record<string, string> = {
  Upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Ongoing: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Completed: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};

export default function TrainingCalendar() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Training Calendar"
      description="Upcoming and past training events"
      breadcrumbs={['Employee', 'Learning', 'Training Calendar']}
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
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search events..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>

      <div className="space-y-3">
        {filtered.map(e => (
          <GlassPanel key={e.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                <span className="text-[9px] font-bold leading-none">{e.date.split('-')[2]}</span>
                <span className="text-[8px] uppercase leading-none mt-0.5">{new Date(e.date).toLocaleString('default', { month: 'short' })}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{e.name}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${statusColors[e.status]}`}>{e.status}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-400">
                  <span>Instructor: {e.instructor}</span>
                  <span>{e.time}</span>
                  <span>{e.duration}</span>
                  <span>{e.location}</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
