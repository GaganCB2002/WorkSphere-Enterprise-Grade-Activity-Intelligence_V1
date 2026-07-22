import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Ticket } from 'lucide-react';

const tickets = [
  { id: 'ST-001', subject: 'Cannot access payroll portal', department: 'Finance', priority: 'Critical', status: 'Open', assignedTo: 'Ravi Kumar', date: '2026-04-13' },
  { id: 'ST-002', subject: 'Timesheet approval delay', department: 'HR', priority: 'High', status: 'In Progress', assignedTo: 'Priya Singh', date: '2026-04-12' },
  { id: 'ST-003', subject: 'Email signature not updating', department: 'IT', priority: 'Low', status: 'Resolved', assignedTo: 'Amit Joshi', date: '2026-04-11' },
  { id: 'ST-004', subject: 'Onboarding portal not loading', department: 'HR', priority: 'High', status: 'Open', assignedTo: 'Neha Gupta', date: '2026-04-13' },
  { id: 'ST-005', subject: 'Expense report rejected incorrectly', department: 'Finance', priority: 'Medium', status: 'In Progress', assignedTo: 'Ravi Kumar', date: '2026-04-10' },
  { id: 'ST-006', subject: 'VPN access for new joiner', department: 'IT', priority: 'Medium', status: 'Resolved', assignedTo: 'Amit Joshi', date: '2026-04-09' },
  { id: 'ST-007', subject: 'Performance review form submission error', department: 'HR', priority: 'High', status: 'Open', assignedTo: 'Priya Singh', date: '2026-04-12' },
  { id: 'ST-008', subject: 'Salary slip discrepancy', department: 'Finance', priority: 'Critical', status: 'In Progress', assignedTo: 'Ravi Kumar', date: '2026-04-11' },
  { id: 'ST-009', subject: 'Software license not received', department: 'IT', priority: 'Low', status: 'Open', assignedTo: 'Amit Joshi', date: '2026-04-13' },
  { id: 'ST-010', subject: 'Benefits enrollment portal error', department: 'HR', priority: 'Medium', status: 'Resolved', assignedTo: 'Neha Gupta', date: '2026-04-08' },
  { id: 'ST-011', subject: 'Tax form not generated', department: 'Finance', priority: 'High', status: 'Open', assignedTo: 'Ravi Kumar', date: '2026-04-13' },
  { id: 'ST-012', subject: 'Employee ID card not printed', department: 'HR', priority: 'Low', status: 'Resolved', assignedTo: 'Neha Gupta', date: '2026-04-07' },
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

export default function SupportTickets() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = tickets.filter(t =>
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Support Tickets"
      description="Employee support tickets across departments"
      breadcrumbs={['Employee', 'Helpdesk', 'Support Tickets']}
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

      <div className="grid gap-3">
        {filtered.map(t => (
          <GlassPanel key={t.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Ticket className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{t.id}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${priorityColors[t.priority]}`}>{t.priority}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${statusColors[t.status]}`}>{t.status}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mb-1">{t.subject}</p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span>{t.department}</span>
                    <span>Assigned: {t.assignedTo}</span>
                    <span>{t.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
