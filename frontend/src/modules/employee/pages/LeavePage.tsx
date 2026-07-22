import React, { useState } from 'react';
import { Filter, Download, RefreshCw } from 'lucide-react';
import { useLeaveStore } from '../store/employeeStore';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = leaveRequests.filter(r =>
    r.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApplyLeave = (requestData: Omit<LeaveRequest, 'id' | 'employeeId' | 'employeeName' | 'status' | 'appliedDate' | 'delegations'>) => {
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

  const allDelegations = leaveRequests.flatMap(r => r.delegations || []);

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
    <EmployeePageLayout
      title="Leave Management"
      description="Manage your leave requests, balances, and approvals"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Leave Management' }]}
      searchPlaceholder="Search leave requests..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <LeaveBalanceCards balances={leaveBalances} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <LeaveApplicationForm onSubmit={handleApplyLeave} />
          <DelegationPanel delegations={allDelegations} />
        </div>

        <div className="space-y-6">
          <LeaveCalendar leaves={mock.teamLeaveCalendar} />
        </div>
      </div>

      <GlassPanel className="p-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Request History</h3>
        <DataTable
          columns={leaveColumns}
          data={filteredRequests}
          searchPlaceholder="Search leave logs..."
          searchKey="reason"
          itemsPerPage={5}
        />
      </GlassPanel>
    </EmployeePageLayout>
  );
}

export default LeavePage;
