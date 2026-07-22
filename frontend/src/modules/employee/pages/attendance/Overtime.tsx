import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, Clock } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface OvertimeEntry {
  id: string;
  date: string;
  overtimeHours: string;
  reason: string;
  approved: string;
}

const overtimeData: OvertimeEntry[] = [
  { id: 'OT-001', date: '2026-07-02', overtimeHours: '1h 15m', reason: 'Production deployment', approved: 'Yes' },
  { id: 'OT-002', date: '2026-07-04', overtimeHours: '1h 30m', reason: 'Sprint retrospective + planning', approved: 'Yes' },
  { id: 'OT-003', date: '2026-07-10', overtimeHours: '2h 00m', reason: 'Client presentation prep', approved: 'Yes' },
  { id: 'OT-004', date: '2026-07-14', overtimeHours: '0h 45m', reason: 'Bug fix for production hotfix', approved: 'Pending' },
  { id: 'OT-005', date: '2026-07-16', overtimeHours: '1h 00m', reason: 'Team mentoring session', approved: 'Yes' },
  { id: 'OT-006', date: '2026-07-18', overtimeHours: '3h 00m', reason: 'Quarterly release weekend', approved: 'Yes' },
  { id: 'OT-007', date: '2026-07-19', overtimeHours: '1h 30m', reason: 'On-call support', approved: 'Pending' },
  { id: 'OT-008', date: '2026-07-21', overtimeHours: '0h 30m', reason: 'Emergency patch', approved: 'Yes' },
  { id: 'OT-009', date: '2026-07-22', overtimeHours: '1h 15m', reason: 'Code review for team', approved: 'No' },
  { id: 'OT-010', date: '2026-07-23', overtimeHours: '2h 00m', reason: 'Database migration', approved: 'Pending' },
];

export default function Overtime() {
  const [searchQuery, setSearchQuery] = useState('');

  const totalOT = overtimeData.reduce((acc, entry) => {
    const parts = entry.overtimeHours.match(/(\d+)h\s*(\d+)?m?/);
    if (parts) return acc + parseInt(parts[1]) * 60 + (parseInt(parts[2] || '0'));
    return acc;
  }, 0);

  const approvedOT = overtimeData.filter(e => e.approved === 'Yes').reduce((acc, entry) => {
    const parts = entry.overtimeHours.match(/(\d+)h\s*(\d+)?m?/);
    if (parts) return acc + parseInt(parts[1]) * 60 + (parseInt(parts[2] || '0'));
    return acc;
  }, 0);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return overtimeData.filter(e => e.id.toLowerCase().includes(q) || e.date.includes(q) || e.reason.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Overtime"
      description="Track your overtime hours and approval status"
      breadcrumbs={['Employee', 'Attendance', 'Overtime']}
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
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Overtime (This Month)', value: `${Math.floor(totalOT / 60)}h ${totalOT % 60}m`, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
          { label: 'Approved', value: `${Math.floor(approvedOT / 60)}h ${approvedOT % 60}m`, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
          { label: 'Pending', value: `${overtimeData.filter(e => e.approved === 'Pending').length} requests`, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
        ].map(s => (
          <GlassPanel key={s.label} className={`${s.bg} p-4`}>
            <div className="flex items-center gap-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <div>
                <p className="text-xs text-slate-400">{s.label}</p>
                <p className={`text-lg font-bold ${s.color} mt-0.5`}>{s.value}</p>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel className="p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search overtime records..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                {['ID', 'Date', 'Overtime Hours', 'Reason', 'Approved'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-500 dark:text-slate-400">{e.id}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{e.date}</td>
                  <td className="px-5 py-3.5 text-xs font-bold text-slate-900 dark:text-white">{e.overtimeHours}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400 max-w-[250px] truncate">{e.reason}</td>
                  <td className="px-5 py-3.5"><StatusBadge label={e.approved} variant={e.approved === 'Yes' ? 'active' : e.approved === 'Pending' ? 'pending' : 'leave'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
