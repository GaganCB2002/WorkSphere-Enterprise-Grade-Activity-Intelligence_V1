// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Video, MapPin, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export const TeamCalendar = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/meetings/calendar').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const events = data?.events || [
    { title: 'Daily Standup', time: '9:30 AM', duration: '15m', type: 'recurring', attendees: 6 },
    { title: 'Sprint Planning', time: '10:00 AM', duration: '2h', type: 'meeting', attendees: 8, date: 'May 28' },
    { title: 'Code Review Session', time: '2:00 PM', duration: '1h', type: 'workshop', attendees: 4, date: 'May 28' },
    { title: '1:1 with Sarah', time: '3:30 PM', duration: '30m', type: 'one-on-one', attendees: 2, date: 'May 28' },
    { title: 'Architecture Review', time: '11:00 AM', duration: '1.5h', type: 'meeting', attendees: 5, date: 'May 29' },
    { title: 'Sprint Retrospective', time: '4:00 PM', duration: '1h', type: 'meeting', attendees: 6, date: 'May 29' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Calendar className="w-6 h-6 text-indigo-500" /> Team Calendar</h1><p className="text-xs text-slate-400 mt-0.5">Sprint 42 schedule &bull; May 28 - May 29</p></div>
        <div className="flex items-center gap-3"><button className="p-1.5 bg-[#1E293B] border border-slate-700/60 rounded-lg hover:bg-slate-700"><ChevronLeft className="w-4 h-4" /></button><span className="text-xs font-bold text-slate-300">This Week</span><button className="p-1.5 bg-[#1E293B] border border-slate-700/60 rounded-lg hover:bg-slate-700"><ChevronRight className="w-4 h-4" /></button><button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Plus className="w-4 h-4" /> New Event</button></div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800">{events.map((e, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-[#1E293B]/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={"w-10 h-10 rounded-xl flex items-center justify-center " + (e.type === 'recurring' ? 'bg-emerald-500/10' : e.type === 'meeting' ? 'bg-indigo-500/10' : e.type === 'workshop' ? 'bg-amber-500/10' : 'bg-purple-500/10')}>
                {e.type === 'recurring' ? <Clock className="w-5 h-5 text-emerald-400" /> : e.type === 'meeting' ? <Video className="w-5 h-5 text-indigo-400" /> : e.type === 'workshop' ? <Users className="w-5 h-5 text-amber-400" /> : <Users className="w-5 h-5 text-purple-400" />}
              </div>
              <div><p className="text-sm font-bold text-slate-200">{e.title}</p><div className="flex items-center gap-3 text-xs text-slate-400 mt-1"><span>{e.time}</span><span>{e.duration}</span><span>{e.attendees} attendees</span></div></div>
            </div>
            {e.date && <span className="text-xs text-slate-400">{e.date}</span>}
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

