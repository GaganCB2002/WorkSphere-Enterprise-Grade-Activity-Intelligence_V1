import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Timer } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpis = [
  { label: 'Scheduled', value: '12', icon: Calendar, color: 'text-blue-500' },
  { label: 'Today', value: '3', icon: Clock, color: 'text-emerald-500' },
  { label: 'This Week', value: '8', icon: Users, color: 'text-purple-500' },
  { label: 'Avg Duration', value: '45min', icon: Timer, color: 'text-amber-500' },
];

const columns = [
  { key: 'name', label: 'Meeting', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'time', label: 'Time' },
  { key: 'duration', label: 'Duration' },
  { key: 'attendees', label: 'Attendees', sortable: true },
  { key: 'room', label: 'Room' },
  { key: 'status', label: 'Status', render: (v: any) => <StatusBadge status={v} /> },
];

const data = [
  { id: 1, name: 'Sprint Planning', date: '2025-07-23', time: '10:00 AM', duration: '60 min', attendees: 12, room: 'Main Boardroom', status: 'Scheduled' },
  { id: 2, name: 'Daily Standup', date: '2025-07-23', time: '9:00 AM', duration: '15 min', attendees: 8, room: 'Team Room A', status: 'Completed' },
  { id: 3, name: 'Architecture Review', date: '2025-07-23', time: '2:00 PM', duration: '90 min', attendees: 6, room: 'Virtual', status: 'Scheduled' },
  { id: 4, name: 'Tech Debt Triage', date: '2025-07-24', time: '11:00 AM', duration: '45 min', attendees: 5, room: 'Meeting Room 3', status: 'Scheduled' },
  { id: 5, name: 'Sprint Retrospective', date: '2025-07-25', time: '3:00 PM', duration: '60 min', attendees: 14, room: 'Main Boardroom', status: 'Scheduled' },
  { id: 6, name: 'One-on-One: Alice', date: '2025-07-22', time: '1:00 PM', duration: '30 min', attendees: 2, room: 'Virtual', status: 'Completed' },
  { id: 7, name: 'Demo Day', date: '2025-07-28', time: '10:00 AM', duration: '120 min', attendees: 24, room: 'Auditorium', status: 'Scheduled' },
  { id: 8, name: 'Incident Review', date: '2025-07-21', time: '4:00 PM', duration: '45 min', attendees: 4, room: 'War Room', status: 'Completed' },
];

const EngineeringMeetings = () => (
  <CtoPageShell title="Engineering Meetings" description="Schedule and track engineering meetings, standups, and ceremonies">
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Engineering Meetings</h3>
        <DataTable columns={columns} data={data} searchable pageSize={8} />
      </div>
    </div>
  </CtoPageShell>
);

export default EngineeringMeetings;


