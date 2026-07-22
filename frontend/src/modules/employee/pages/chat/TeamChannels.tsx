import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, Hash, Users } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const channels = [
  { id: 1, name: 'general', description: 'Company-wide announcements and discussions', members: 156, lastMessage: 'Welcome to the new joiners!', unread: 5 },
  { id: 2, name: 'engineering', description: 'Engineering team discussions, code reviews, and technical debates', members: 48, lastMessage: 'PR for auth module is ready for review', unread: 12 },
  { id: 3, name: 'design', description: 'Design critiques, feedback, and inspiration', members: 22, lastMessage: 'New brand guidelines uploaded', unread: 3 },
  { id: 4, name: 'product', description: 'Product strategy, roadmaps, and feature discussions', members: 18, lastMessage: 'Q3 roadmap review tomorrow', unread: 7 },
  { id: 5, name: 'random', description: 'Non-work banter and fun conversations', members: 89, lastMessage: 'Anyone up for lunch at the new place?', unread: 0 },
  { id: 6, name: 'announcements', description: 'Official company announcements and updates', members: 200, lastMessage: 'Office closed on July 26th', unread: 1 },
  { id: 7, name: 'devops', description: 'CI/CD pipelines, infrastructure, and deployment', members: 15, lastMessage: 'Production deployment completed', unread: 4 },
  { id: 8, name: 'design-review', description: 'Weekly design review discussions', members: 12, lastMessage: 'New component library preview', unread: 2 },
];

const memberColors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500', 'bg-cyan-500'];

export default function TeamChannels() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = channels.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Team Channels"
      description="Collaborate with your team in organized channels"
      breadcrumbs={['Employee', 'Chat', 'Team Channels']}
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
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search channels..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => (
          <GlassPanel key={c.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">#{c.name}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{c.members} members</p>
                </div>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">{c.unread}</span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{c.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {Array.from({ length: Math.min(c.members, 4) }).map((_, i) => (
                  <div key={i} className={`w-6 h-6 rounded-full ${memberColors[i % memberColors.length]} text-white text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                {c.members > 4 && (
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
                    +{c.members - 4}
                  </div>
                )}
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[180px]">{c.lastMessage}</p>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
