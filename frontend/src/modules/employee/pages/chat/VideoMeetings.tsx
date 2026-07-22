import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, Video, Clock, Calendar } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const meetings = [
  { id: 1, title: 'Sprint Planning', date: '2026-07-22', time: '10:00 AM', duration: '1 hr', host: 'Ananya Sharma', status: 'Scheduled' },
  { id: 2, title: 'Design Review', date: '2026-07-22', time: '2:00 PM', duration: '45 min', host: 'Priya Patel', status: 'Scheduled' },
  { id: 3, title: 'Daily Standup', date: '2026-07-22', time: '9:30 AM', duration: '15 min', host: 'Rahul Verma', status: 'Ongoing' },
  { id: 4, title: 'Client Presentation', date: '2026-07-21', time: '3:00 PM', duration: '1 hr', host: 'Ananya Sharma', status: 'Completed' },
  { id: 5, title: 'Architecture Review', date: '2026-07-21', time: '11:00 AM', duration: '1.5 hr', host: 'Amit Singh', status: 'Completed' },
  { id: 6, title: 'One-on-One with Manager', date: '2026-07-23', time: '4:00 PM', duration: '30 min', host: 'Vikram Joshi', status: 'Scheduled' },
  { id: 7, title: 'Sprint Retrospective', date: '2026-07-23', time: '3:00 PM', duration: '1 hr', host: 'Sneha Reddy', status: 'Scheduled' },
  { id: 8, title: 'Cross-team Sync', date: '2026-07-22', time: '1:00 PM', duration: '45 min', host: 'Arjun Mehta', status: 'Ongoing' },
];

export default function VideoMeetings() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = meetings.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.host.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Video Meetings"
      description="Scheduled and ongoing video conferences"
      breadcrumbs={['Employee', 'Chat', 'Video Meetings']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl">
        <Search className="w-4 h-4 text-slate-400" />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search meetings..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(m => (
          <GlassPanel key={m.id} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Hosted by {m.host}</p>
                </div>
              </div>
              <StatusBadge label={m.status} variant={m.status === 'Ongoing' ? 'working' : m.status === 'Scheduled' ? 'pending' : 'done'} />
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{m.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{m.time}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{m.duration}</span>
            </div>
            {m.status === 'Ongoing' && (
              <button className="w-full px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all">
                Join Now
              </button>
            )}
            {m.status === 'Scheduled' && (
              <button className="w-full px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all">
                Join Meeting
              </button>
            )}
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
