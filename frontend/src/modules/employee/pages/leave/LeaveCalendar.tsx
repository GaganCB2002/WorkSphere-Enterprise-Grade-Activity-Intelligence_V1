import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Users } from 'lucide-react';

const teamLeaves = [
  { employee: 'Ananya Sharma', type: 'Annual Leave', from: '15 Jul 2026', to: '18 Jul 2026', status: 'Approved' },
  { employee: 'Rahul Verma', type: 'Sick Leave', from: '20 Jul 2026', to: '21 Jul 2026', status: 'Approved' },
  { employee: 'Priya Patel', type: 'Casual Leave', from: '25 Jul 2026', to: '25 Jul 2026', status: 'Pending' },
  { employee: 'Arun Kumar', type: 'Annual Leave', from: '01 Aug 2026', to: '05 Aug 2026', status: 'Approved' },
  { employee: 'Sneha Reddy', type: 'Maternity Leave', from: '10 Aug 2026', to: '10 Nov 2026', status: 'Approved' },
  { employee: 'Vikram Singh', type: 'Sick Leave', from: '12 Aug 2026', to: '13 Aug 2026', status: 'Pending' },
  { employee: 'Divya Nair', type: 'Annual Leave', from: '20 Aug 2026', to: '22 Aug 2026', status: 'Approved' },
  { employee: 'Karan Joshi', type: 'Casual Leave', from: '01 Sep 2026', to: '01 Sep 2026', status: 'Approved' },
  { employee: 'Meera Iyer', type: 'Paternity Leave', from: '05 Sep 2026', to: '09 Sep 2026', status: 'Pending' },
  { employee: 'Ravi Deshmukh', type: 'Annual Leave', from: '15 Sep 2026', to: '20 Sep 2026', status: 'Approved' },
  { employee: 'Neha Gupta', type: 'Comp Off', from: '22 Sep 2026', to: '22 Sep 2026', status: 'Approved' },
  { employee: 'Amit Choudhury', type: 'Sick Leave', from: '28 Sep 2026', to: '29 Sep 2026', status: 'Pending' },
];

export default function LeaveCalendar() {
  const [search, setSearch] = useState('');
  const filtered = teamLeaves.filter(l =>
    l.employee.toLowerCase().includes(search.toLowerCase()) ||
    l.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Leave Calendar"
      description="Team leave overview"
      breadcrumbs={['Employee', 'Leave', 'Leave Calendar']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee or leave type..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Leave Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">From</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">To</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold">
                        {l.employee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white">{l.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{l.type}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{l.from}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{l.to}</td>
                  <td className="px-4 py-3"><StatusBadge label={l.status} variant={l.status === 'Approved' ? 'active' : 'pending'} dot={false} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
