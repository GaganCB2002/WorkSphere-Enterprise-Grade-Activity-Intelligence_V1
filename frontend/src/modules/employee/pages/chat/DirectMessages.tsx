import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, MessageCircle, ChevronRight } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const conversations = [
  { id: 1, name: 'Ananya Sharma', lastMessage: 'Sure, I will review the PR by EOD.', time: '2 min ago', unread: 3, online: true },
  { id: 2, name: 'Rahul Verma', lastMessage: 'The deployment pipeline is fixed now.', time: '15 min ago', unread: 0, online: true },
  { id: 3, name: 'Priya Patel', lastMessage: 'Can you share the latest mockups?', time: '1 hr ago', unread: 1, online: false },
  { id: 4, name: 'Amit Singh', lastMessage: 'Meeting notes attached for review.', time: '2 hr ago', unread: 0, online: true },
  { id: 5, name: 'Sneha Reddy', lastMessage: 'Thanks for the quick turnaround!', time: '3 hr ago', unread: 2, online: false },
  { id: 6, name: 'Vikram Joshi', lastMessage: 'The API integration is complete.', time: '5 hr ago', unread: 0, online: false },
  { id: 7, name: 'Neha Kapoor', lastMessage: 'Can we reschedule the standup?', time: '1 day ago', unread: 1, online: true },
  { id: 8, name: 'Arjun Mehta', lastMessage: 'Please find the attached report.', time: '1 day ago', unread: 0, online: false },
  { id: 9, name: 'Divya Nair', lastMessage: 'Great work on the presentation!', time: '2 days ago', unread: 0, online: false },
  { id: 10, name: 'Karan Bajaj', lastMessage: 'Let me check the logs and get back.', time: '2 days ago', unread: 0, online: true },
];

export default function DirectMessages() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Direct Messages"
      description="Your private conversations with team members"
      breadcrumbs={['Employee', 'Chat', 'Direct Messages']}
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
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search conversations..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <div className="space-y-2">
        {filtered.map(c => (
          <GlassPanel key={c.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</h3>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">{c.time}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{c.unread}</span>
              )}
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
