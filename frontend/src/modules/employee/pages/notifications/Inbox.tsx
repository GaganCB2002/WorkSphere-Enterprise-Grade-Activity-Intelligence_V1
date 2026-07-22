import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Filter, Download, RefreshCw, Search, Mail, MailOpen } from 'lucide-react';

const notifications = [
  { id: 1, title: 'Task Assigned: API Integration', message: 'You have been assigned a new task "API Integration for Payroll Module" by Ananya Sharma.', sender: 'Ananya Sharma', timestamp: '2026-04-14 10:30', read: false },
  { id: 2, title: 'Leave Request Approved', message: 'Your leave request for Apr 20-22 has been approved by your manager.', sender: 'HR System', timestamp: '2026-04-14 09:15', read: false },
  { id: 3, title: 'New Comment on Your Task', message: 'Ravi Kumar commented on your task "Database Migration Script": "Please review the latest changes."', sender: 'Ravi Kumar', timestamp: '2026-04-13 16:45', read: true },
  { id: 4, title: 'Training Enrollment Confirmed', message: 'You are enrolled in "Advanced Python" starting April 20. Access the course materials in the Learning portal.', sender: 'LMS System', timestamp: '2026-04-13 14:00', read: false },
  { id: 5, title: 'Expense Report Rejected', message: 'Your expense report #EXP-042 for $250 was rejected. Reason: Missing receipt. Please resubmit with proper documentation.', sender: 'Finance System', timestamp: '2026-04-12 11:20', read: true },
  { id: 6, title: 'Performance Review Reminder', message: 'Your Q2 self-assessment is due by April 30. Please complete it in the Performance portal.', sender: 'HR System', timestamp: '2026-04-12 09:00', read: true },
  { id: 7, title: 'Mention in Project Thread', message: 'Priya Singh mentioned you in the "WorkSphere Core" project thread: "@you can you review the PR #42?"', sender: 'Priya Singh', timestamp: '2026-04-11 15:30', read: false },
  { id: 8, title: 'Document Signed Successfully', message: 'The NDA document you submitted has been digitally signed by the legal team.', sender: 'DocuSign', timestamp: '2026-04-11 13:00', read: true },
  { id: 9, title: 'IT Ticket Update', message: 'Your IT ticket IT-003 status has been changed to "In Progress". Assigned to Amit Joshi.', sender: 'IT Helpdesk', timestamp: '2026-04-10 10:45', read: true },
  { id: 10, title: 'Meeting Reminder: Sprint Planning', message: 'Sprint Planning for WorkSphere Core is scheduled tomorrow at 10:00 AM in Conference Room A.', sender: 'Calendar Bot', timestamp: '2026-04-10 08:00', read: true },
  { id: 11, title: 'New Benefits Document Available', message: 'The updated health insurance brochure for 2026-27 is now available in the Benefits portal.', sender: 'Benefits Team', timestamp: '2026-04-09 16:30', read: false },
  { id: 12, title: 'Password Changed Successfully', message: 'Your account password was changed successfully. If you did not make this change, contact IT immediately.', sender: 'Security System', timestamp: '2026-04-09 14:15', read: true },
];

export default function Inbox() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = notifications.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Inbox"
      description="Your notifications and messages"
      breadcrumbs={['Employee', 'Notifications', 'Inbox']}
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
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search inbox..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <span className="text-xs text-slate-400">{filtered.filter(n => !n.read).length} unread</span>
      </GlassPanel>

      <div className="space-y-2">
        {filtered.map(n => (
          <GlassPanel key={n.id} className={`p-4 ${!n.read ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-2 border-l-blue-500' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${!n.read ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                {!n.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-bold ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{n.title}</span>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </div>
                <p className={`text-xs mb-1 ${!n.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>{n.message}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="font-medium">{n.sender}</span>
                  <span>·</span>
                  <span>{n.timestamp}</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
