import React, { useState, useMemo } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { MessageSquare, Star, Filter, Download, RefreshCw, Search } from 'lucide-react';

const feedbackList = [
  { from: 'Ananya Sharma', type: 'Manager', rating: 5, comment: 'Excellent work on the Q4 deliverables. Very proactive.', date: '2026-01-10', status: 'Completed' },
  { from: 'Rahul Verma', type: 'Peer', rating: 4, comment: 'Great collaboration on the cross-team project.', date: '2026-01-05', status: 'Completed' },
  { from: 'Priya Gupta', type: 'Subordinate', rating: 5, comment: 'Very supportive mentor. Helps the team grow.', date: '2025-12-20', status: 'Completed' },
  { from: 'Vikram Singh', type: 'Peer', rating: 3, comment: 'Good technical skills but communication can improve.', date: '2025-12-15', status: 'Completed' },
  { from: 'Neha Kapoor', type: 'Manager', rating: 4, comment: 'Consistent performer with strong ownership.', date: '2025-11-30', status: 'Completed' },
  { from: 'Arun Kumar', type: 'Peer', rating: 5, comment: 'Always available to help. True team player.', date: '2025-11-10', status: 'Completed' },
  { from: 'Sneha Reddy', type: 'Subordinate', rating: 4, comment: 'Clear guidance and constructive feedback.', date: '2025-10-25', status: 'Completed' },
  { from: 'Deepak Joshi', type: 'Peer', rating: 3, comment: 'Code reviews could be more detailed.', date: '2025-10-05', status: 'Pending' },
];

export default function Feedback() {
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = useMemo(() => feedbackList.filter(f =>
    f.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.comment.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  const stars = (n: number) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-3 h-3 ${i < n ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
  ));

  return (
    <EmployeePageLayout
      title="Feedback"
      description="Peer, manager and subordinate reviews"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Performance' }, { label: 'Feedback' }]}
      searchPlaceholder="Search feedback..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">{f.from[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{f.from}</p>
                    <StatusBadge label={f.type} variant={f.type === 'Manager' ? 'admin' : f.type === 'Peer' ? 'working' : 'active'} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">{stars(f.rating)}</div>
                  <StatusBadge label={f.status} variant={f.status === 'Completed' ? 'done' : 'pending'} dot={false} />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">"{f.comment}"</p>
              <p className="text-[10px] text-slate-400 mt-2">{f.date}</p>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No feedback matches your search</p>
          </div>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
