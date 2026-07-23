import React, { useState, useEffect } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, AlertCircle, History } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const recentEntries = [
  { date: '22 Jul 2026', clockIn: '09:02 AM', clockOut: '06:05 PM', status: 'On Time' },
  { date: '21 Jul 2026', clockIn: '08:58 AM', clockOut: '05:55 PM', status: 'On Time' },
  { date: '20 Jul 2026', clockIn: '09:15 AM', clockOut: '06:10 PM', status: 'Late' },
  { date: '19 Jul 2026', clockIn: '09:01 AM', clockOut: '05:50 PM', status: 'On Time' },
  { date: '18 Jul 2026', clockIn: '08:55 AM', clockOut: '06:00 PM', status: 'On Time' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'On Time': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Late: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Absent: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'}`}>
      {status}
    </span>
  );
}

export default function ClockInPage() {
  const [time, setTime] = useState(new Date());
  const [clockedIn, setClockedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    setClockedIn(true);
  };

  return (
    <InternPageShell title="Clock In" description="Mark your attendance for today">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="lg:col-span-2 flex flex-col items-center justify-center bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-10 shadow-sm">
            <div className="text-6xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-2">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </div>
            <p className="text-sm text-slate-500 mb-8">{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleClockIn}
              disabled={clockedIn}
              className={`flex items-center gap-4 px-12 py-6 rounded-2xl text-xl font-bold shadow-lg transition-all ${
                clockedIn
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-2 border-emerald-300 dark:border-emerald-600 cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600 cursor-pointer'
              }`}
            >
              <Clock className="w-8 h-8" />
              {clockedIn ? 'Clocked In ✓' : 'Clock In'}
            </motion.button>
            {clockedIn && <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 font-semibold">You clocked in at {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>}
          </motion.div>

          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Today's Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700/40">
                <span className="text-xs font-semibold text-slate-500">Date</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{time.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700/40">
                <span className="text-xs font-semibold text-slate-500">Scheduled In</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">09:00 AM</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700/40">
                <span className="text-xs font-semibold text-slate-500">Actual In</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{clockedIn ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '--:--'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500">Status</span>
                {clockedIn ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Present
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400 px-2 py-0.5 rounded-full">
                    <AlertCircle className="w-3 h-3" /> Not Clocked In
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Recent Clock-In History</h3>
            <span className="text-xs text-slate-400 ml-auto">Last 5 entries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Clock In</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Clock Out</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {recentEntries.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{row.date}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.clockIn}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.clockOut}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
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
