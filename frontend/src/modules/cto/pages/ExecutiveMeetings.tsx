import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock, Timer } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Scheduled', value: '4', icon: Calendar, color: 'text-blue-500' },
  { label: 'Completed', value: '12', icon: CheckCircle2, color: 'text-emerald-500' },
  { label: 'Upcoming', value: '2', icon: Clock, color: 'text-purple-500' },
  { label: 'Avg Duration', value: '60min', icon: Timer, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Meeting', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'time', label: 'Time' },
  { key: 'attendees', label: 'Attendees', sortable: true },
  { key: 'location', label: 'Location' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'CTO Staff Meeting', date: '2025-07-23', time: '10:00 AM', attendees: 8, location: 'Executive Boardroom', status: 'Scheduled' },
  { id: 2, name: 'Quarterly Engineering Review', date: '2025-07-28', time: '1:00 PM', attendees: 24, location: 'Auditorium', status: 'Scheduled' },
  { id: 3, name: 'VP Engineering Sync', date: '2025-07-22', time: '2:00 PM', attendees: 4, location: 'Virtual', status: 'Completed' },
  { id: 4, name: 'Architecture Board Meeting', date: '2025-07-21', time: '9:00 AM', attendees: 6, location: 'Meeting Room 1', status: 'Completed' },
  { id: 5, name: 'Budget Planning Session', date: '2025-08-05', time: '10:00 AM', attendees: 10, location: 'Executive Boardroom', status: 'Scheduled' },
  { id: 6, name: 'Vendor Review Board', date: '2025-07-18', time: '3:00 PM', attendees: 5, location: 'Virtual', status: 'Completed' },
  { id: 7, name: 'Strategy Offsite', date: '2025-07-14', time: '9:00 AM', attendees: 12, location: 'Offsite - Conference Center', status: 'Completed' },
  { id: 8, name: 'Board Prep Meeting', date: '2025-07-10', time: '11:00 AM', attendees: 3, location: 'CTO Office', status: 'Completed' },
];

const ExecutiveMeetings = () => (
  <CtoPageShell title="Executive Meetings" description="Schedule and track executive-level meetings and leadership syncs">
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Executive Meetings</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default ExecutiveMeetings;


