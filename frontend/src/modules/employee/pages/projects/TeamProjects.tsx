import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Users } from 'lucide-react';

const mockTeamProjects = [
  { name: 'WorkSphere Core', lead: 'Ananya Sharma', department: 'Engineering', deadline: '2026-08-15', status: 'Active' },
  { name: 'AI Chatbot Platform', lead: 'Gagan Chaudhary', department: 'AI/ML', deadline: '2026-09-01', status: 'Active' },
  { name: 'Data Pipeline v2', lead: 'Vikram Singh', department: 'Data Engineering', deadline: '2026-07-20', status: 'Active' },
  { name: 'Mobile App Redesign', lead: 'Rahul Verma', department: 'Mobile', deadline: '2026-08-30', status: 'At Risk' },
  { name: 'Cloud Migration', lead: 'Neha Gupta', department: 'Infrastructure', deadline: '2026-10-01', status: 'Active' },
  { name: 'Legacy System Audit', lead: 'Karan Mehta', department: 'Security', deadline: '2026-06-30', status: 'Completed' },
  { name: 'E-commerce Analytics', lead: 'Sneha Kapoor', department: 'Analytics', deadline: '2026-09-15', status: 'Active' },
  { name: 'Customer Portal', lead: 'Arjun Nair', department: 'Frontend', deadline: '2026-07-25', status: 'At Risk' },
  { name: 'DevOps Automation', lead: 'Rohit Sharma', department: 'DevOps', deadline: '2026-08-01', status: 'Active' },
  { name: 'Payroll Integration', lead: 'Priya Patel', department: 'Finance', deadline: '2026-08-20', status: 'Active' },
];

export default function TeamProjects() {
  const [search, setSearch] = useState('');
  const filtered = mockTeamProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.lead.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Team Projects" description="View all projects across teams and departments" breadcrumbs={['Employee', 'Projects', 'Team Projects']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects or leads..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-3 px-2">Project Name</th>
                <th className="text-left py-3 px-2">Lead</th>
                <th className="text-left py-3 px-2">Department</th>
                <th className="text-left py-3 px-2">Deadline</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-900 dark:text-white">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{p.lead}</td>
                  <td className="py-3 px-2 text-slate-500">{p.department}</td>
                  <td className="py-3 px-2 text-slate-500">{p.deadline}</td>
                  <td className="py-3 px-2"><AutoStatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
