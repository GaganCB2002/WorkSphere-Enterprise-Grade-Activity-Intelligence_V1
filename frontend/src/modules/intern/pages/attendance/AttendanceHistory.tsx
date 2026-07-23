import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Download, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const attendanceData = [
  { date: '22 Jul 2026', day: 'Wed', clockIn: '09:02 AM', clockOut: '06:05 PM', totalHours: '8h 03m', status: 'On Time' },
  { date: '21 Jul 2026', day: 'Tue', clockIn: '08:58 AM', clockOut: '05:55 PM', totalHours: '7h 57m', status: 'On Time' },
  { date: '20 Jul 2026', day: 'Mon', clockIn: '09:15 AM', clockOut: '06:10 PM', totalHours: '7h 55m', status: 'Late' },
  { date: '19 Jul 2026', day: 'Sun', clockIn: '–', clockOut: '–', totalHours: '–', status: 'Holiday' },
  { date: '18 Jul 2026', day: 'Sat', clockIn: '–', clockOut: '–', totalHours: '–', status: 'Holiday' },
  { date: '17 Jul 2026', day: 'Fri', clockIn: '08:55 AM', clockOut: '06:00 PM', totalHours: '8h 05m', status: 'On Time' },
  { date: '16 Jul 2026', day: 'Thu', clockIn: '09:01 AM', clockOut: '05:50 PM', totalHours: '7h 49m', status: 'On Time' },
  { date: '15 Jul 2026', day: 'Wed', clockIn: '09:03 AM', clockOut: '06:00 PM', totalHours: '7h 57m', status: 'On Time' },
  { date: '14 Jul 2026', day: 'Tue', clockIn: '–', clockOut: '–', totalHours: '–', status: 'Absent' },
  { date: '13 Jul 2026', day: 'Mon', clockIn: '09:00 AM', clockOut: '06:02 PM', totalHours: '8h 02m', status: 'On Time' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'On Time': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Late: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Absent: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    Holiday: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'}`}>
      {status}
    </span>
  );
}

const weeklyHours = [
  { week: 'Week 1', hours: 40 }, { week: 'Week 2', hours: 38 }, { week: 'Week 3', hours: 42 }, { week: 'Week 4', hours: 36 },
];

export default function AttendanceHistoryPage() {
  const [search, setSearch] = useState('');

  const filtered = attendanceData.filter(r =>
    r.date.toLowerCase().includes(search.toLowerCase()) ||
    r.day.toLowerCase().includes(search.toLowerCase()) ||
    r.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <InternPageShell title="Attendance History" description="Detailed attendance records">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Weekly Hours Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyHours} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} labelStyle={{ fontWeight: 600, fontSize: 13 }} />
              <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Records</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search records..."
                  className="pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-48"
                />
              </div>
              <select className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-transparent text-slate-600 dark:text-slate-300">
                <option>All Status</option>
                <option>On Time</option>
                <option>Late</option>
                <option>Absent</option>
                <option>Holiday</option>
              </select>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Day</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Clock In</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Clock Out</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Hours</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {filtered.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{row.date}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.day}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.clockIn}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.clockOut}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.totalHours}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors">
                        <EyeOff className="w-4 h-4" />
                      </button>
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
