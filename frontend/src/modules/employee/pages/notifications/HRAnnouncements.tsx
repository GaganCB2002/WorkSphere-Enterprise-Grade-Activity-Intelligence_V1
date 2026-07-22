import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Filter, Download, RefreshCw, Search, Megaphone } from 'lucide-react';

const announcements = [
  { id: 1, title: 'New Remote Work Policy', body: 'We are pleased to announce an updated remote work policy effective May 1. Employees can now work remotely up to 3 days per week with manager approval.', author: 'HR Director', department: 'HR', date: '2026-04-14', priority: 'High' },
  { id: 2, title: 'Quarterly Bonus Disbursement', body: 'Q1 performance bonuses will be disbursed on April 25. Check your eligibility and amounts in the payroll portal.', author: 'Finance Team', department: 'Finance', date: '2026-04-13', priority: 'High' },
  { id: 3, title: 'Office Renovation Schedule', body: 'The 3rd floor will undergo renovation from April 20 to May 10. Affected teams will be temporarily relocated to the 2nd floor.', author: 'Admin Team', department: 'Admin', date: '2026-04-12', priority: 'Medium' },
  { id: 4, title: 'Health Insurance Open Enrollment', body: 'Open enrollment for health insurance runs from April 15 to April 30. Review your options and make changes via the Benefits portal.', author: 'Benefits Team', department: 'HR', date: '2026-04-11', priority: 'High' },
  { id: 5, title: 'Company Annual Day Celebration', body: 'Save the date! Our annual day celebration will be held on May 20 at the Grand Convention Center. Details to follow.', author: 'Events Team', department: 'Admin', date: '2026-04-10', priority: 'Medium' },
  { id: 6, title: 'New Learning Platform Launch', body: 'We are migrating to a new LMS platform next month. All current course progress will be transferred automatically.', author: 'L&D Team', department: 'Learning', date: '2026-04-09', priority: 'Low' },
  { id: 7, title: 'Security Awareness Training', body: 'Mandatory security awareness training for all employees. Complete the 30-min module by April 30 in the Learning portal.', author: 'CISO', department: 'IT', date: '2026-04-08', priority: 'High' },
  { id: 8, title: 'Cafeteria Menu Change', body: 'Starting next week, the cafeteria will introduce a new rotating menu with more vegetarian and vegan options.', author: 'Facilities', department: 'Admin', date: '2026-04-07', priority: 'Low' },
  { id: 9, title: 'Team Outing Registration', body: 'Q2 team outing registrations are open. Choose your preferred activity from the list by April 18.', author: 'HR Coordinator', department: 'HR', date: '2026-04-06', priority: 'Medium' },
  { id: 10, title: 'IT Asset Upgrade Cycle', body: 'Eligible employees can request laptop upgrades. Check your eligibility in the IT portal and submit requests by April 30.', author: 'IT Manager', department: 'IT', date: '2026-04-05', priority: 'Medium' },
];

const priorityColors: Record<string, string> = {
  High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Low: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};

export default function HRAnnouncements() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = announcements.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="HR Announcements"
      description="Company-wide announcements and updates"
      breadcrumbs={['Employee', 'Notifications', 'HR Announcements']}
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
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search announcements..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>

      <div className="space-y-3">
        {filtered.map(a => (
          <GlassPanel key={a.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Megaphone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{a.title}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${priorityColors[a.priority]}`}>{a.priority}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">{a.body}</p>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span className="font-medium">{a.author}</span>
                  <span>·</span>
                  <span>{a.department}</span>
                  <span>·</span>
                  <span>{a.date}</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
