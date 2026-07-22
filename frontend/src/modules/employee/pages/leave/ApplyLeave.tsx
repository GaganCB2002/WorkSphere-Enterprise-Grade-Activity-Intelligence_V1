import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Send, Calendar } from 'lucide-react';

const leaveBalances = [
  { type: 'Annual Leave', total: 18, used: 7, remaining: 11 },
  { type: 'Sick Leave', total: 12, used: 3, remaining: 9 },
  { type: 'Casual Leave', total: 10, used: 5, remaining: 5 },
  { type: 'Maternity Leave', total: 90, used: 0, remaining: 90 },
  { type: 'Paternity Leave', total: 5, used: 0, remaining: 5 },
];

export default function ApplyLeave() {
  const [leaveType, setLeaveType] = useState('annual');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [backupContact, setBackupContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <EmployeePageLayout
      title="Apply Leave"
      description="Submit a new leave request"
      breadcrumbs={['Employee', 'Leave', 'Apply Leave']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassPanel className="p-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Leave Application Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Leave Type</label>
                <select value={leaveType} onChange={e => setLeaveType(e.target.value)} className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-200 outline-none">
                  <option value="annual">Annual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                  <option value="maternity">Maternity Leave</option>
                  <option value="paternity">Paternity Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">From Date</label>
                  <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">To Date</label>
                  <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Reason</label>
                <textarea rows={3} value={reason} onChange={e => setReason(e.target.value)} placeholder="Enter reason for leave..." className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Backup Contact</label>
                <input type="text" value={backupContact} onChange={e => setBackupContact(e.target.value)} placeholder="Colleague name / email" className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition-all">
                  <Send className="w-3.5 h-3.5" />
                  Submit Request
                </button>
              </div>
            </form>
          </GlassPanel>
        </div>
        <div>
          <GlassPanel className="p-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Leave Balance</h3>
            <div className="space-y-4">
              {leaveBalances.map(lb => (
                <div key={lb.type} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{lb.type}</span>
                    <span className="text-[10px] text-slate-400">{lb.remaining} / {lb.total}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${(lb.used / lb.total) * 100}%` }} />
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                    <span>{lb.used} used</span>
                    <span>{lb.remaining} remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </EmployeePageLayout>
  );
}
