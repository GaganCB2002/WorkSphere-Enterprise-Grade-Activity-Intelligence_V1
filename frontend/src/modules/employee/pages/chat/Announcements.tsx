import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, Megaphone, ChevronRight } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const announcements = [
  { id: 1, title: 'Q3 Company Town Hall', body: 'Join us for the quarterly town hall meeting where leadership will share updates on company performance, upcoming initiatives, and team achievements.', author: 'CEO Office', date: '2026-07-20', priority: 'High' },
  { id: 2, title: 'New Leave Policy Update', body: 'Effective August 1st, the flexible leave policy has been updated to include 2 additional wellness days per quarter.', author: 'HR Department', date: '2026-07-18', priority: 'High' },
  { id: 3, title: 'Office Renovation Notice', body: 'The 3rd floor will undergo renovation from July 25 to August 10. Please use the alternate entrance during this period.', author: 'Admin Team', date: '2026-07-16', priority: 'Normal' },
  { id: 4, title: 'Annual Team Outing', body: 'Save the date! The annual company outing is scheduled for August 20th at Riverside Park. Details to follow.', author: 'Events Team', date: '2026-07-14', priority: 'Normal' },
  { id: 5, title: 'IT Security Reminder', body: 'Please ensure all company devices have the latest security patches installed. Contact IT for assistance.', author: 'IT Security', date: '2026-07-12', priority: 'High' },
  { id: 6, title: 'Cafeteria Menu Update', body: 'Starting next week, the cafeteria will introduce a new rotating menu with healthier options and international cuisine.', author: 'Facilities', date: '2026-07-10', priority: 'Low' },
  { id: 7, title: 'Hackathon Registration Open', body: 'Register your teams for the annual internal hackathon. Prizes worth $10,000 to be won!', author: 'Innovation Team', date: '2026-07-08', priority: 'Normal' },
  { id: 8, title: 'New Hire Onboarding Session', body: 'A mandatory onboarding session for all new joiners will be held on July 25th in Conference Room A.', author: 'HR Department', date: '2026-07-06', priority: 'High' },
];

export default function Announcements() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = announcements.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Announcements"
      description="Company-wide announcements and important updates"
      breadcrumbs={['Employee', 'Chat', 'Announcements']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl">
        <Search className="w-4 h-4 text-slate-400" />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search announcements..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <div className="space-y-4">
        {filtered.map(a => (
          <GlassPanel key={a.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{a.title}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{a.author} &middot; {a.date}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{a.body}</p>
              </div>
              <StatusBadge label={a.priority} variant={a.priority === 'High' ? 'active' : a.priority === 'Normal' ? 'pending' : 'default'} />
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
