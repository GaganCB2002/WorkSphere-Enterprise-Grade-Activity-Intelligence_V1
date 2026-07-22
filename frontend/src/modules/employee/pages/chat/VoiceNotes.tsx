import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, Mic, Play, CheckCircle, XCircle } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const voiceNotes = [
  { id: 1, title: 'Sprint Planning Notes', speaker: 'Ananya Sharma', duration: '3:24', date: '2026-07-22', listened: true },
  { id: 2, title: 'Design Feedback', speaker: 'Priya Patel', duration: '2:15', date: '2026-07-21', listened: true },
  { id: 3, title: 'Client Call Summary', speaker: 'Rahul Verma', duration: '5:42', date: '2026-07-21', listened: false },
  { id: 4, title: 'Bug Triage Discussion', speaker: 'Amit Singh', duration: '4:08', date: '2026-07-20', listened: true },
  { id: 5, title: 'Standup Notes', speaker: 'Sneha Reddy', duration: '1:30', date: '2026-07-20', listened: false },
  { id: 6, title: 'Code Review Feedback', speaker: 'Vikram Joshi', duration: '3:55', date: '2026-07-19', listened: true },
  { id: 7, title: 'Onboarding Walkthrough', speaker: 'HR Department', duration: '8:12', date: '2026-07-18', listened: false },
  { id: 8, title: 'Brainstorming Session', speaker: 'Arjun Mehta', duration: '6:40', date: '2026-07-17', listened: true },
];

export default function VoiceNotes() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = voiceNotes.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Voice Notes"
      description="Voice messages and audio notes shared in chats"
      breadcrumbs={['Employee', 'Chat', 'Voice Notes']}
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
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search voice notes..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <div className="space-y-2">
        {filtered.map(v => (
          <GlassPanel key={v.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{v.title}</h3>
                  <StatusBadge label={v.listened ? 'Listened' : 'New'} variant={v.listened ? 'done' : 'pending'} />
                </div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                  <span>{v.speaker}</span>
                  <span>&middot;</span>
                  <span>{v.duration}</span>
                  <span>&middot;</span>
                  <span>{v.date}</span>
                </div>
              </div>
              <button className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors flex-shrink-0">
                <Play className="w-4 h-4" />
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
