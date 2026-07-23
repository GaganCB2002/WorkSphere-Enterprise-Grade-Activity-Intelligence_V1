import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, ArrowRight, CheckCircle2, XCircle, Video,
  Plus, CalendarCheck, CalendarX, ListChecks, ExternalLink, MoreHorizontal
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

interface Meeting {
  id: string;
  date: string;
  time: string;
  duration: string;
  title: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  meetingLink?: string;
}

const Meetings: React.FC = () => {
  const [meetings] = useState<Meeting[]>([
    { id: 'M001', date: '2026-07-25', time: '10:00 AM', duration: '45 min', title: 'Weekly Sync - Sprint Planning', status: 'Scheduled', meetingLink: 'https://meet.google.com/abc-defg-hij' },
    { id: 'M002', date: '2026-07-18', time: '10:00 AM', duration: '45 min', title: 'Code Review Best Practices', status: 'Completed', meetingLink: 'https://meet.google.com/abc-defg-hij' },
    { id: 'M003', date: '2026-07-11', time: '11:30 AM', duration: '30 min', title: 'Career Path Discussion', status: 'Completed' },
    { id: 'M004', date: '2026-07-04', time: '10:00 AM', duration: '45 min', title: 'Weekly Sync', status: 'Completed' },
    { id: 'M005', date: '2026-06-27', time: '10:00 AM', duration: '45 min', title: 'Project Retrospective', status: 'Cancelled' },
    { id: 'M006', date: '2026-06-20', time: '10:00 AM', duration: '45 min', title: 'Weekly Sync', status: 'Completed' },
    { id: 'M007', date: '2026-08-01', time: '10:00 AM', duration: '45 min', title: 'Mid-Internship Review', status: 'Scheduled', meetingLink: 'https://meet.google.com/abc-defg-hij' },
  ]);

  const total = meetings.length;
  const completed = meetings.filter(m => m.status === 'Completed').length;
  const upcoming = meetings.filter(m => m.status === 'Scheduled').length;

  const statusColors: Record<string, string> = {
    Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
    Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
  };
  const statusIcons: Record<string, React.ReactNode> = {
    Scheduled: <Calendar className="w-3.5 h-3.5" />,
    Completed: <CheckCircle2 className="w-3.5 h-3.5" />,
    Cancelled: <XCircle className="w-3.5 h-3.5" />,
  };

  return (
    <InternPageShell
      title="Mentor Meetings"
      description="Schedule and view mentor meetings"
      actions={
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Schedule Meeting
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Meetings', value: total, icon: ListChecks, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10' },
          { label: 'Completed', value: completed, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10' },
          { label: 'Upcoming', value: upcoming, icon: CalendarCheck, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{kpi.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {['Date', 'Time', 'Duration', 'Title', 'Status', 'Meeting Link', 'Actions'].map((header) => (
                  <th key={header} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {meetings.map((meeting, i) => (
                <motion.tr
                  key={meeting.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{meeting.date}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {meeting.time}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{meeting.duration}</td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{meeting.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[meeting.status]}`}>
                      {statusIcons[meeting.status]}
                      {meeting.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {meeting.status === 'Scheduled' && meeting.meetingLink ? (
                      <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 text-xs font-medium">
                        <Video className="w-3.5 h-3.5" /> Join
                      </a>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </InternPageShell>
  );
};

export default Meetings;
