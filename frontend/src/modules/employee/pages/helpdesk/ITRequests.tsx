import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Monitor } from 'lucide-react';

const itRequests = [
  { id: 'IT-001', category: 'Hardware', description: 'Laptop keyboard replacement needed', priority: 'High', status: 'Open', date: '2026-04-12' },
  { id: 'IT-002', category: 'Software', description: 'License activation for Adobe Suite', priority: 'Medium', status: 'In Progress', date: '2026-04-11' },
  { id: 'IT-003', category: 'Network', description: 'VPN connectivity issues from remote', priority: 'Critical', status: 'Open', date: '2026-04-13' },
  { id: 'IT-004', category: 'Access', description: 'Grant database read access to team', priority: 'Low', status: 'Resolved', date: '2026-04-09' },
  { id: 'IT-005', category: 'Hardware', description: 'Docking station not charging laptop', priority: 'High', status: 'In Progress', date: '2026-04-10' },
  { id: 'IT-006', category: 'Software', description: 'Slack crashing on startup', priority: 'Medium', status: 'Open', date: '2026-04-12' },
  { id: 'IT-007', category: 'Network', description: 'WiFi access point setup in conference room', priority: 'Low', status: 'Resolved', date: '2026-04-08' },
  { id: 'IT-008', category: 'Access', description: 'Revoke access for former employee', priority: 'Critical', status: 'Resolved', date: '2026-04-07' },
  { id: 'IT-009', category: 'Hardware', description: 'Request for additional monitor', priority: 'Medium', status: 'Open', date: '2026-04-13' },
  { id: 'IT-010', category: 'Software', description: 'VS Code extension policy update', priority: 'Low', status: 'In Progress', date: '2026-04-11' },
];

const priorityColors: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  High: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Low: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

const statusColors: Record<string, string> = {
  Open: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export default function ITRequests() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = itRequests.filter(r =>
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="IT Requests"
      description="IT support tickets and requests"
      breadcrumbs={['Employee', 'Helpdesk', 'IT Requests']}
      actions={
        <div className="flex items-center gap-2">
          {[Filter, Download, RefreshCw].map((Icon, i) => (
            <button key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search tickets..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>

      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-white/[0.04]">
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ticket ID</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-slate-100 dark:border-white/[0.03] last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{r.id}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{r.category}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-[300px] truncate">{r.description}</td>
                  <td className="py-3 px-4"><span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${priorityColors[r.priority]}`}>{r.priority}</span></td>
                  <td className="py-3 px-4"><span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${statusColors[r.status]}`}>{r.status}</span></td>
                  <td className="py-3 px-4 text-slate-500">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
