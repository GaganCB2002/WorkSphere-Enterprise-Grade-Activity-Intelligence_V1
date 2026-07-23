// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Video, MapPin, Circle } from 'lucide-react';

export const Calendar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/calendar')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-7 gap-2"><div className="h-32" /><div className="h-32" /><div className="h-32" /><div className="h-32" /><div className="h-32" /><div className="h-32" /><div className="h-32" /></div></div>;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = 23;
  const events = data?.events || [
    { id: 1, title: 'Daily Standup', date: 23, time: '9:00 AM', type: 'meeting', color: 'bg-indigo-500' },
    { id: 2, title: 'Sprint Planning', date: 23, time: '2:00 PM', type: 'meeting', color: 'bg-amber-500' },
    { id: 3, title: 'PR #423 Review Due', date: 24, type: 'deadline', color: 'bg-rose-500' },
    { id: 4, title: 'Frontend Architecture Review', date: 24, time: '10:00 AM', type: 'meeting', color: 'bg-emerald-500' },
    { id: 5, title: 'Sprint 43 Ends', date: 28, type: 'milestone', color: 'bg-purple-500' },
    { id: 6, title: 'Sprint Retrospective', date: 28, time: '3:00 PM', type: 'meeting', color: 'bg-cyan-500' },
  ];

  const generateDays = () => {
    const result = [];
    const firstDay = 1;
    const daysInMonth = 31;
    let startPadding = 3;
    for (let i = 0; i < startPadding; i++) result.push(null);
    for (let i = 1; i <= daysInMonth; i++) result.push(i);
    return result;
  };

  const calendarDays = generateDays();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><CalendarIcon className="w-6 h-6 text-indigo-400" /> Calendar</h1>
          <p className="text-xs text-slate-400 mt-0.5">July 2026 &bull; {events.length} events</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm font-bold text-white">July 2026</span>
          <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50"><ChevronRight className="w-4 h-4" /></button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold ml-2"><Plus className="w-4 h-4" /> Add Event</button>
        </div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-7 border-b border-slate-800">
          {days.map(d => <div key={d} className="p-3 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider border-r border-slate-800 last:border-r-0">{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {calendarDays.map((day, idx) => (
            <div key={idx} className={`min-h-[100px] p-2 border-r border-b border-slate-800/50 ${day === null ? 'bg-[#0E1117]/30' : day === today ? 'bg-indigo-500/5' : ''}`}>
              {day && <div className={`text-xs font-bold mb-1 ${day === today ? 'w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white' : 'text-slate-400'}`}>{day}</div>}
              {events.filter(e => e.date === day).map(e => (
                <div key={e.id} className={`${e.color} bg-opacity-20 rounded px-1.5 py-0.5 mb-1 cursor-pointer hover:bg-opacity-30`}>
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${e.color}`} />
                    <span className="text-[9px] font-semibold text-slate-200 truncate">{e.title}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h2 className="text-sm font-bold text-white mb-4">Today's Events</h2>
        <div className="space-y-3">
          {events.filter(e => e.date === today).map(e => (
            <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/80 bg-[#1E293B]/50">
              <div className={`w-1 h-10 rounded-full ${e.color}`} />
              <div className="flex-1"><h3 className="text-xs font-semibold text-white">{e.title}</h3><p className="text-[10px] text-slate-400">{e.type} {e.time ? `at ${e.time}` : ''}</p></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
