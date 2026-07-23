import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  Eye, Edit3, Download, FileText, Clock, Users,
  ArrowUpRight, MoreHorizontal
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const kpis = [
  { label: 'Total Meetings', value: '24', icon: Users, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
  { label: 'Total Notes', value: '18', icon: FileText, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
];

const meetingNotes = [
  { title: 'Sprint Planning - Week 12', date: '2026-07-14', duration: '1h 30m', attendees: 8, notes: 'Discussed sprint backlog, assigned tasks for UI revamp...', id: 'MTG-001' },
  { title: 'Mentor One-on-One', date: '2026-07-12', duration: '45m', attendees: 2, notes: 'Reviewed progress on React module, discussed career goals...', id: 'MTG-002' },
  { title: 'Daily Standup', date: '2026-07-11', duration: '15m', attendees: 12, notes: 'Each member shared progress, blockers identified for API integration...', id: 'MTG-003' },
  { title: 'Code Review Session', date: '2026-07-10', duration: '1h', attendees: 5, notes: 'Reviewed PR #142, identified optimization opportunities in data layer...', id: 'MTG-004' },
  { title: 'UI/UX Workshop', date: '2026-07-08', duration: '2h', attendees: 15, notes: 'Walked through design system, practiced with Tailwind components...', id: 'MTG-005' },
  { title: 'Quarterly Review Prep', date: '2026-07-05', duration: '1h', attendees: 4, notes: 'Prepared presentation slides, gathered performance metrics...', id: 'MTG-006' },
];

function ActionBtn({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/40 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" title={label}>
      <Icon className="w-4 h-4" />
    </button>
  );
}

export default function MeetingNotes() {
  return (
    <InternPageShell title="Meeting Notes" description="Notes from past meetings">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div key={kpi.label} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${kpi.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <ArrowUpRight className="w-3 h-3" />+{i === 0 ? '2' : '3'} this month
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* DataTable */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Meeting Title</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Attendees</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Notes Preview</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {meetingNotes.map((row, i) => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{row.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{row.date}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5" /> {row.duration}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <Users className="w-3.5 h-3.5" /> {row.attendees}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 max-w-[200px] truncate">{row.notes}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <ActionBtn icon={Eye} label="View" />
                        <ActionBtn icon={Edit3} label="Edit" />
                        <ActionBtn icon={Download} label="Download" />
                        <ActionBtn icon={MoreHorizontal} label="More" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </motion.div>
    </InternPageShell>
  );
}
