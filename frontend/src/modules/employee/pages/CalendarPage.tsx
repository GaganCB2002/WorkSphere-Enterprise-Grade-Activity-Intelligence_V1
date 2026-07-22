import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
import { GlassPanel } from '../components/ui/GlassPanel';
import { StatusBadge } from '../components/ui/StatusBadge';
import * as mock from '../data/mockData';

const MOCK_EVENTS = [
  { id: 'e1', title: 'Daily Standup', date: '2026-05-21', time: '10:00 AM', duration: '15 min', type: 'standup', attendees: 4 },
  { id: 'e2', title: 'Sprint Review', date: '2026-05-21', time: '02:00 PM', duration: '1 hr', type: 'review', attendees: 6 },
  { id: 'e3', title: '1:1 with Manager', date: '2026-05-22', time: '04:30 PM', duration: '30 min', type: 'one-on-one', attendees: 2 },
  { id: 'e4', title: 'Team Lunch', date: '2026-05-23', time: '12:30 PM', duration: '1 hr', type: 'social', attendees: 8 },
  { id: 'e5', title: 'Architecture Review', date: '2026-05-24', time: '11:00 AM', duration: '1.5 hr', type: 'meeting', attendees: 5 },
  { id: 'e6', title: 'HR Compliance Training', date: '2026-05-25', time: '09:00 AM', duration: '2 hr', type: 'training', attendees: 20 },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState('2026-05-21');
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
    const dayEvents = MOCK_EVENTS.filter(e => e.date === date);
    return { date, day: i + 1, events: dayEvents };
  });

  const selectedEvents = MOCK_EVENTS.filter(e => e.date === selectedDate);

  return (
    <EmployeePageLayout
      title="Calendar"
      description="View your schedule, meetings, and events"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Calendar' }]}
      actions={
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button onClick={() => setViewMode('month')} className={`px-3 py-1.5 text-xs font-semibold transition-colors ${viewMode === 'month' ? 'bg-brand-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Month</button>
            <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 text-xs font-semibold transition-colors ${viewMode === 'list' ? 'bg-brand-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>List</button>
          </div>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <GlassPanel className="p-5">
            {viewMode === 'month' ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setCurrentMonth(m => m === 1 ? 12 : m - 1)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={() => setCurrentMonth(m => m === 12 ? 1 : m + 1)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {DAYS.map(d => (
                    <div key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2">{d}</div>
                  ))}
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {days.map(d => {
                    const isSelected = d.date === selectedDate;
                    const hasEvents = d.events.length > 0;
                    return (
                      <motion.button
                        key={d.date}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDate(d.date)}
                        className={`relative p-2 rounded-lg text-xs font-semibold transition-all ${isSelected ? 'bg-brand-600 text-white shadow-sm' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                      >
                        {d.day}
                        {hasEvents && (
                          <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-brand-500'}`} />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {MOCK_EVENTS.sort((a, b) => a.date.localeCompare(b.date)).map(ev => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/[0.04]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
                      <CalendarIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{ev.title}</p>
                      <p className="text-[10px] text-slate-400">{ev.date} • {ev.time} • {ev.duration}</p>
                    </div>
                    <StatusBadge label={ev.type} variant="working" size="sm" />
                  </motion.div>
                ))}
              </div>
            )}
          </GlassPanel>
        </div>

        <div className="space-y-6">
          <GlassPanel className="p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Events on {selectedDate}
            </h3>
            {selectedEvents.length === 0 ? (
              <p className="text-xs text-slate-400">No events scheduled.</p>
            ) : (
              <div className="space-y-3">
                {selectedEvents.map(ev => (
                  <div key={ev.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-[10px] text-slate-500">{ev.time} ({ev.duration})</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{ev.title}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{ev.attendees}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassPanel>

          <GlassPanel className="p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Upcoming Meetings</h3>
            <div className="space-y-2">
              {mock.upcomingMeetings.slice(0, 3).map(mtg => (
                <div key={mtg.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{mtg.title}</p>
                    <p className="text-[10px] text-slate-400">{mtg.time} • {mtg.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </EmployeePageLayout>
  );
}

export default CalendarPage;
