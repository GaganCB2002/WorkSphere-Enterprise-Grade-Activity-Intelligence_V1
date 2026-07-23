import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  Video, MapPin, Clock, Users, ArrowUpRight, MoreHorizontal
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const sampleEvents = [
  { date: 12, title: 'Daily Standup', time: '09:00 AM - 09:30 AM', location: 'Zoom Room A', organizer: 'Sarah Chen' },
  { date: 12, title: 'Code Review - PR #142', time: '11:00 AM - 12:00 PM', location: 'GitHub', organizer: 'Mike Johnson' },
  { date: 14, title: 'Mentor One-on-One', time: '02:00 PM - 03:00 PM', location: 'Conference Room 3', organizer: 'Emily Davis' },
  { date: 16, title: 'Sprint Planning', time: '10:00 AM - 11:30 AM', location: 'Teams - General Channel', organizer: 'Alex Turner' },
  { date: 18, title: 'UI/UX Workshop', time: '01:00 PM - 03:00 PM', location: 'Training Room B', organizer: 'Lisa Wong' },
];

const allDayEvents = [
  { date: 15, title: 'Intern Cohort Meeting', type: 'All Day' },
  { date: 20, title: 'Quarterly Review Prep', type: 'All Day' },
];

const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const dayEvents = [
  { time: '09:00 AM', title: 'Daily Standup', duration: '30 min' },
  { time: '11:00 AM', title: 'Code Review - PR #142', duration: '1 hr' },
  { time: '02:00 PM', title: 'Mentor One-on-One', duration: '1 hr' },
];

const kpis = [
  { label: "Today's Meetings", value: '3', icon: CalendarIcon, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
  { label: 'This Week', value: '8', icon: Clock, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { label: 'Total This Month', value: '14', icon: CalendarIcon, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
];

function KpiCard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
  const Icon = kpi.icon;
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${kpi.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
          <ArrowUpRight className="w-3 h-3" />+{index === 0 ? '2' : index === 1 ? '1' : '5'} from last
        </span>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
    </motion.div>
  );
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [view, setView] = useState<'month' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const eventsForDate = (date: number) => sampleEvents.filter(e => e.date === date);
  const allDayForDate = (date: number) => allDayEvents.filter(e => e.date === date);

  return (
    <InternPageShell title="Calendar" description="Your meeting and event calendar">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} index={i} />)}
        </div>

        {/* View Toggle & Navigation */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white min-w-[180px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${view === 'month' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Month
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${view === 'day' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Day
            </button>
          </div>
        </motion.div>

        {view === 'month' ? (
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-700/60">
              {weekDays.map(d => (
                <div key={d} className="px-3 py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {d}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[100px] border-r border-b border-slate-50 dark:border-slate-700/30 bg-slate-50/30 dark:bg-slate-800/30" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const date = i + 1;
                const dayEvents = eventsForDate(date);
                const dayAllDay = allDayForDate(date);
                const isToday = date === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
                return (
                  <div
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`min-h-[100px] p-2 border-r border-b border-slate-50 dark:border-slate-700/30 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors ${isToday ? 'bg-blue-50/60 dark:bg-blue-500/5' : ''}`}
                  >
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold ${isToday ? 'bg-blue-600 text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                      {date}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayAllDay.map((e, j) => (
                        <div key={j} className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-semibold truncate">
                          {e.title}
                        </div>
                      ))}
                      {dayEvents.slice(0, 2).map((e, j) => (
                        <div key={j} className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[10px] font-semibold truncate">
                          {e.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[10px] text-slate-400 font-semibold px-1">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Time slots */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">
                {monthNames[currentMonth]} {selectedDate || new Date().getDate()}, {currentYear}
              </h3>
              <div className="space-y-1">
                {timeSlots.map((time, i) => {
                  const event = dayEvents.find(e => e.time === time);
                  return (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 dark:border-slate-700/30 last:border-0">
                      <span className="text-xs font-semibold text-slate-400 w-20 text-right pt-1">{time}</span>
                      <div className="flex-1">
                        {event ? (
                          <div className="bg-blue-50 dark:bg-blue-500/10 border-l-4 border-blue-500 rounded-r-lg px-3 py-2">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{event.title}</p>
                            <p className="text-xs text-slate-400">{event.duration}</p>
                          </div>
                        ) : (
                          <div className="h-6" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Events list */}
            <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Events</h3>
              <div className="space-y-3">
                {sampleEvents.map((event, i) => {
                  const Icon = event.location.includes('Zoom') || event.location.includes('Teams') ? Video : MapPin;
                  return (
                    <div key={i} className="p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">{event.title}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <Icon className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Users className="w-3 h-3" />
                        <span>{event.organizer}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

      </motion.div>
    </InternPageShell>
  );
}
