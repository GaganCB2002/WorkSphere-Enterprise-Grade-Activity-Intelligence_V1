import React, { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import type { LeaveType, LeaveDayType, LeaveRequest } from '../../types';
import * as mock from '../../data/mockData';

interface LeaveApplicationFormProps {
  onSubmit: (request: Omit<LeaveRequest, 'id' | 'employeeId' | 'employeeName' | 'status' | 'appliedDate' | 'delegations'>) => void;
}

export function LeaveApplicationForm({ onSubmit }: LeaveApplicationFormProps) {
  const [type, setType] = useState<LeaveType>('annual');
  const [dayType, setDayType] = useState<LeaveDayType>('full');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [reason, setReason] = useState('');
  const [backupEmployeeId, setBackupEmployeeId] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !reason) return;

    // Calculate days diff (rough approximation)
    const startDate = new Date(from);
    const endDate = new Date(to);
    const timeDiff = endDate.getTime() - startDate.getTime();
    let totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    if (dayType !== 'full') totalDays = 0.5;

    const backupName = mock.teamMembers.find(m => m.id === backupEmployeeId)?.name || '';

    onSubmit({
      type,
      dayType,
      from,
      to,
      totalDays,
      reason,
      backupEmployeeId,
      backupEmployeeName: backupName,
      attachments: [],
      isEmergency
    });

    // Reset
    setFrom('');
    setTo('');
    setReason('');
    setBackupEmployeeId('');
    setIsEmergency(false);
  };

  return (
    <GlassPanel className="p-5">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Request Leave</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Leave Type */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Leave Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as LeaveType)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-white/[0.04] rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 text-slate-700 dark:text-slate-200 font-medium"
            >
              <option value="annual">Annual / Privilege Leave</option>
              <option value="sick">Sick / Medical Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="compensatory">Compensatory Off</option>
              <option value="wfh">Work From Home (WFH)</option>
              <option value="optional_holiday">Optional Holiday</option>
              <option value="emergency">Emergency Leave</option>
            </select>
          </div>

          {/* Day Type */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Duration</label>
            <select
              value={dayType}
              onChange={e => setDayType(e.target.value as LeaveDayType)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-white/[0.04] rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 text-slate-700 dark:text-slate-200 font-medium"
            >
              <option value="full">Full Day</option>
              <option value="first_half">First Half (Half Day)</option>
              <option value="second_half">Second Half (Half Day)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Start Date */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Start Date</label>
            <input
              type="date"
              required
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-white/[0.04] rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 text-slate-700 dark:text-slate-200 font-medium"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">End Date</label>
            <input
              type="date"
              required
              value={to}
              onChange={e => setTo(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-white/[0.04] rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 text-slate-700 dark:text-slate-200 font-medium"
            />
          </div>
        </div>

        {/* Backup employee */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Backup / Delegated Employee</label>
          <select
            value={backupEmployeeId}
            onChange={e => setBackupEmployeeId(e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-white/[0.04] rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 text-slate-700 dark:text-slate-200 font-medium"
          >
            <option value="">Select teammate to delegate duties to</option>
            {mock.teamMembers.map(member => (
              <option key={member.id} value={member.id}>{member.name} ({member.designation})</option>
            ))}
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Reason for Leave</label>
          <textarea
            required
            rows={3}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Please specify a reason for applying for leave..."
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-white/[0.04] rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 text-slate-700 dark:text-slate-200 font-medium resize-none placeholder:text-slate-400"
          />
        </div>

        {/* Emergency Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="emergency"
              checked={isEmergency}
              onChange={e => setIsEmergency(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="emergency" className="text-xs font-semibold text-slate-700 dark:text-slate-300 select-none">
              This is an urgent / emergency request
            </label>
          </div>
          {isEmergency && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500">
              <AlertCircle className="w-3.5 h-3.5" /> Flags as High Priority
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-blue-500/10"
        >
          Submit Application
        </button>
      </form>
    </GlassPanel>
  );
}

export default LeaveApplicationForm;
