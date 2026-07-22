import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, Fingerprint } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface BiometricLog {
  id: string;
  date: string;
  time: string;
  type: string;
  method: string;
  verified: string;
}

const logs: BiometricLog[] = [
  { id: 'BIO-001', date: '2026-07-21', time: '08:55:12', type: 'In', method: 'Fingerprint', verified: 'Yes' },
  { id: 'BIO-002', date: '2026-07-21', time: '12:30:05', type: 'Out', method: 'Face', verified: 'Yes' },
  { id: 'BIO-003', date: '2026-07-21', time: '13:15:44', type: 'In', method: 'Face', verified: 'Yes' },
  { id: 'BIO-004', date: '2026-07-21', time: '17:30:22', type: 'Out', method: 'Fingerprint', verified: 'Yes' },
  { id: 'BIO-005', date: '2026-07-20', time: '08:58:33', type: 'In', method: 'Fingerprint', verified: 'Yes' },
  { id: 'BIO-006', date: '2026-07-20', time: '12:28:18', type: 'Out', method: 'Card', verified: 'No' },
  { id: 'BIO-007', date: '2026-07-20', time: '13:10:55', type: 'In', method: 'Card', verified: 'Yes' },
  { id: 'BIO-008', date: '2026-07-20', time: '17:05:40', type: 'Out', method: 'Fingerprint', verified: 'Yes' },
  { id: 'BIO-009', date: '2026-07-19', time: '09:02:10', type: 'In', method: 'Face', verified: 'Yes' },
  { id: 'BIO-010', date: '2026-07-19', time: '18:00:05', type: 'Out', method: 'Fingerprint', verified: 'Yes' },
  { id: 'BIO-011', date: '2026-07-18', time: '09:15:48', type: 'In', method: 'Card', verified: 'Yes' },
  { id: 'BIO-012', date: '2026-07-18', time: '17:30:22', type: 'Out', method: 'Face', verified: 'Yes' },
];

export default function BiometricLogs() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return logs.filter(l => l.date.includes(q) || l.method.toLowerCase().includes(q) || l.type.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Biometric Logs"
      description="View your fingerprint, face recognition, and card-based attendance logs"
      breadcrumbs={['Employee', 'Attendance', 'Biometric Logs']}
      actions={
        <div className="flex items-center gap-2">
          {[{ icon: Filter }, { icon: Download }, { icon: RefreshCw }].map(({ icon: Icon }) => (
            <button key={Icon.name} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search logs..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <Fingerprint className="w-5 h-5 text-slate-400" />
      </GlassPanel>
      <GlassPanel padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                {['Log ID', 'Date', 'Time', 'Type', 'Method', 'Verified'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-500 dark:text-slate-400">{l.id}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{l.date}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-900 dark:text-white">{l.time}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${l.type === 'In' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'}`}>
                      {l.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{l.method}</td>
                  <td className="px-5 py-3.5"><StatusBadge label={l.verified} variant={l.verified === 'Yes' ? 'active' : 'leave'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
