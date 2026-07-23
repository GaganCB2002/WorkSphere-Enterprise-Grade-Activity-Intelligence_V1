import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Eye, XCircle, Search, Download } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const leaveRecords = [
  { dateRange: '15-16 Jul 2026', type: 'Sick Leave', duration: '2 days', reason: 'Viral fever', status: 'Approved', appliedOn: '14 Jul 2026' },
  { dateRange: '10 Jul 2026', type: 'Casual Leave', duration: '1 day', reason: 'Personal work', status: 'Approved', appliedOn: '08 Jul 2026' },
  { dateRange: '01-05 Jul 2026', type: 'Earned Leave', duration: '5 days', reason: 'Family trip', status: 'Approved', appliedOn: '20 Jun 2026' },
  { dateRange: '22-23 Jul 2026', type: 'Casual Leave', duration: '2 days', reason: 'Medical appointment', status: 'Pending', appliedOn: '20 Jul 2026' },
  { dateRange: '28 Jul 2026', type: 'Sick Leave', duration: '1 day', reason: 'Not feeling well', status: 'Pending', appliedOn: '27 Jul 2026' },
  { dateRange: '05 Aug 2026', type: 'Casual Leave', duration: '1 day', reason: 'Personal errand', status: 'Rejected', appliedOn: '02 Aug 2026' },
  { dateRange: '12-13 Aug 2026', type: 'Earned Leave', duration: '2 days', reason: 'Exam preparation', status: 'Cancelled', appliedOn: '10 Aug 2026' },
];

const tabs = ['All', 'Approved', 'Pending', 'Rejected', 'Cancelled'];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    Rejected: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    Cancelled: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400'}`}>
      {status}
    </span>
  );
}

export default function LeaveHistoryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = leaveRecords.filter(r => {
    const matchesTab = activeTab === 'All' || r.status === activeTab;
    const matchesSearch = r.dateRange.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.reason.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <InternPageShell title="Leave History" description="Past leave records">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex gap-1">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search leave..."
                    className="pl-8 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-44"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Date Range</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="text-center px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Reason</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Applied On</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {filtered.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{row.dateRange}</td>
                    <td className="px-5 py-3.5 text-slate-500">{row.type}</td>
                    <td className="px-5 py-3.5 text-center text-slate-500">{row.duration}</td>
                    <td className="px-5 py-3.5 text-slate-500 max-w-[160px] truncate">{row.reason}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">{row.appliedOn}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors" title="View details">
                        <Eye className="w-4 h-4" />
                      </button>
                      {row.status === 'Pending' && (
                        <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors" title="Cancel request">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-slate-400">No leave records found.</div>
          )}
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
