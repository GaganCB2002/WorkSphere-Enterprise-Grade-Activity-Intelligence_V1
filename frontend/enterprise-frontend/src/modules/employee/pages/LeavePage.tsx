import React from 'react';
import { Calendar, Check, Clock, ShieldAlert } from 'lucide-react';
import { useLeaveStore } from '../store/employeeStore';
import { LeaveBalanceCards } from '../components/leave/LeaveBalanceCards';
import { LeaveApplicationForm } from '../components/leave/LeaveApplicationForm';
import { DelegationPanel } from '../components/leave/DelegationPanel';
import { LeaveCalendar } from '../components/leave/LeaveCalendar';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { GlassPanel } from '../components/ui/GlassPanel';
import * as mock from '../data/mockData';
import type { LeaveRequest } from '../types';

export function LeavePage() {
  const { leaveRequests, leaveBalances, addLeaveRequest, cancelLeaveRequest } = useLeaveStore();

  const handleApplyLeave = (requestData: Omit<LeaveRequest, 'id' | 'employeeId' | 'employeeName' | 'status' | 'appliedDate' | 'delegations'>) => {
    // Generate dummy delegations if teammate selected
    const delegations = requestData.backupEmployeeId ? [
      {
        id: `del-${Date.now()}`,
        taskId: 'task-103',
        taskTitle: 'Unit Test Coverage — Leave Module',
        project: 'WorkSphere Core',
        delegatedTo: requestData.backupEmployeeId,
        delegatedToName: requestData.backupEmployeeName || 'Teammate',
        status: 'pending' as const,
        skillMatch: 82,
        workloadImpact: 10
      }
    ] : [];

    const newRequest: LeaveRequest = {
      ...requestData,
      id: `lv-${Date.now()}`,
      employeeId: 'emp-100',
      employeeName: 'Gagan Chaudhary',
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
      delegations
    };

    addLeaveRequest(newRequest);
  };

  // Compile all delegations across requests
  const allDelegations = leaveRequests.flatMap(r => r.delegations || []);

  // Columns for DataTable
  const leaveColumns = [
    {
      key: 'type',
      label: 'Leave Type',
      sortable: true,
      render: (row: LeaveRequest) => (
        <span className="capitalize font-semibold text-slate-700 dark:text-slate-200">
          {row.type.replace('_', ' ')}
        </span>
      )
    },
    {
      key: 'from',
      label: 'Duration',
      sortable: true,
      render: (row: LeaveRequest) => (
        <span className="text-slate-500 dark:text-slate-400">
          {row.from} to {row.to} ({row.totalDays} {row.totalDays === 1 ? 'day' : 'days'})
        </span>
      )
    },
    {
      key: 'reason',
      label: 'Reason',
      render: (row: LeaveRequest) => (
        <span className="truncate max-w-[200px] block" title={row.reason}>
          {row.reason}
        </span>
      )
    },
    {
      key: 'backupEmployeeName',
      label: 'Backup Teammate',
      render: (row: LeaveRequest) => (
        <span className="text-slate-500 dark:text-slate-400">
          {row.backupEmployeeName || 'None'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row: LeaveRequest) => (
        <StatusBadge label={row.status} variant={
          row.status === 'approved' ? 'active' :
          row.status === 'rejected' || row.status === 'cancelled' ? 'leave' : 'pending'
        } />
      )
    },
    {
      key: 'actions',
      label: 'Action',
      render: (row: LeaveRequest) => (
        row.status === 'pending' ? (
          <button
            onClick={() => cancelLeaveRequest(row.id)}
            className="text-[10px] font-bold text-rose-500 hover:text-rose-600 hover:underline"
          >
            Cancel
          </button>
        ) : (
          <span className="text-[10px] text-slate-400 font-semibold">—</span>
        )
      )
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Leave Balances */}
      <LeaveBalanceCards balances={leaveBalances} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form and Delegations (Left Columns) */}
        <div className="xl:col-span-2 space-y-6">
          <LeaveApplicationForm onSubmit={handleApplyLeave} />
          <DelegationPanel delegations={allDelegations} />
        </div>

        {/* Calendar (Right Column) */}
        <div className="space-y-6">
          <LeaveCalendar leaves={mock.teamLeaveCalendar} />
        </div>
      </div>

      {/* Leave Requests Log */}
      <GlassPanel className="p-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Request History</h3>
        <DataTable
          columns={leaveColumns}
          data={leaveRequests}
          searchPlaceholder="Search leave logs..."
          searchKey="reason"
          itemsPerPage={5}
        />
      </GlassPanel>
    </div>
  );
}

export default LeavePage;
