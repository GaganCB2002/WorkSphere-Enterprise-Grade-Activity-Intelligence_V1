import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Sun, Globe, Music, Heart } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const holidaysByYear: Record<number, Array<{ date: string; day: string; name: string; type: string }>> = {
  2026: [
    { date: '26 Jan 2026', day: 'Monday', name: 'Republic Day', type: 'National' },
    { date: '14 Mar 2026', day: 'Saturday', name: 'Holi', type: 'Festival' },
    { date: '31 Mar 2026', day: 'Tuesday', name: 'Eid ul-Fitr', type: 'Festival' },
    { date: '14 Apr 2026', day: 'Tuesday', name: 'Vaisakhi', type: 'Festival' },
    { date: '01 May 2026', day: 'Friday', name: 'Labour Day', type: 'National' },
    { date: '15 Aug 2026', day: 'Saturday', name: 'Independence Day', type: 'National' },
    { date: '19 Aug 2026', day: 'Wednesday', name: 'Raksha Bandhan', type: 'Festival' },
    { date: '02 Oct 2026', day: 'Friday', name: 'Gandhi Jayanti', type: 'National' },
    { date: '22 Oct 2026', day: 'Thursday', name: 'Dussehra', type: 'Festival' },
    { date: '10 Nov 2026', day: 'Tuesday', name: 'Diwali', type: 'Festival' },
    { date: '15 Nov 2026', day: 'Sunday', name: 'Guru Nanak Jayanti', type: 'Festival' },
    { date: '25 Dec 2026', day: 'Friday', name: 'Christmas Day', type: 'National' },
    { date: '31 Dec 2026', day: 'Thursday', name: 'New Year\'s Eve (Optional)', type: 'Optional' },
  ],
  2027: [
    { date: '26 Jan 2027', day: 'Tuesday', name: 'Republic Day', type: 'National' },
    { date: '03 Mar 2027', day: 'Wednesday', name: 'Holi', type: 'Festival' },
    { date: '15 Aug 2027', day: 'Sunday', name: 'Independence Day', type: 'National' },
    { date: '02 Oct 2027', day: 'Saturday', name: 'Gandhi Jayanti', type: 'National' },
    { date: '11 Nov 2027', day: 'Thursday', name: 'Diwali', type: 'Festival' },
    { date: '25 Dec 2027', day: 'Saturday', name: 'Christmas Day', type: 'National' },
  ],
};

function TypeBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    National: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    Festival: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
    Optional: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[type] || 'bg-slate-100 text-slate-700'}`}>
      {type}
    </span>
  );
}

function TypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'National': return <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    case 'Festival': return <Music className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
    case 'Optional': return <Heart className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    default: return <Sun className="w-4 h-4" />;
  }
}

export default function HolidayCalendarPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear >= 2026 && currentYear <= 2027 ? currentYear : 2026);
  const years = [2026, 2027];
  const holidays = holidaysByYear[year] || [];
  const totalHolidays = holidays.length;
  const national = holidays.filter(h => h.type === 'National').length;
  const festival = holidays.filter(h => h.type === 'Festival').length;
  const optional = holidays.filter(h => h.type === 'Optional').length;

  return (
    <InternPageShell title="Holiday Calendar" description="Company holidays">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Holidays</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalHolidays}</p>
          </motion.div>
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-blue-500" />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">National</p>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{national}</p>
          </motion.div>
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Music className="w-4 h-4 text-violet-500" />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Festival</p>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{festival}</p>
          </motion.div>
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-amber-500" />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Optional</p>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{optional}</p>
          </motion.div>
        </div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Holidays for {year}</h3>
            <div className="flex gap-1">
              {years.map(y => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    year === y
                      ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/40'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Day</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Holiday Name</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {holidays.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{h.date}</td>
                    <td className="px-5 py-3.5 text-slate-500">{h.day}</td>
                    <td className="px-5 py-3.5 flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <TypeIcon type={h.type} />
                      <span>{h.name}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right"><TypeBadge type={h.type} /></td>
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
