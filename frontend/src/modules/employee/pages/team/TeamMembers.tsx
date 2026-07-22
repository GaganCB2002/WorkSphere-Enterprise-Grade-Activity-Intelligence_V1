import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, User } from 'lucide-react';

const mockMembers = [
  { name: 'Gagan Chaudhary', designation: 'Engineering Lead', department: 'Engineering', email: 'gagan@worksphere.ai', joinDate: '2023-03-15', skills: ['React', 'Node.js', 'TypeScript', 'AWS'] },
  { name: 'Ananya Sharma', designation: 'CTO', department: 'Leadership', email: 'ananya@worksphere.ai', joinDate: '2022-01-10', skills: ['Leadership', 'Strategy', 'Cloud', 'AI'] },
  { name: 'Rahul Verma', designation: 'Senior Developer', department: 'Engineering', email: 'rahul@worksphere.ai', joinDate: '2023-06-01', skills: ['React', 'Python', 'GraphQL'] },
  { name: 'Priya Patel', designation: 'Senior Developer', department: 'Engineering', email: 'priya@worksphere.ai', joinDate: '2023-04-20', skills: ['Java', 'Spring', 'Kubernetes'] },
  { name: 'Vikram Singh', designation: 'Data Engineering Lead', department: 'Data', email: 'vikram@worksphere.ai', joinDate: '2023-02-14', skills: ['Python', 'Spark', 'SQL', 'Airflow'] },
  { name: 'Sneha Kapoor', designation: 'Data Analyst', department: 'Data', email: 'sneha@worksphere.ai', joinDate: '2024-01-08', skills: ['SQL', 'Tableau', 'Excel'] },
  { name: 'Karan Mehta', designation: 'Security Lead', department: 'Security', email: 'karan@worksphere.ai', joinDate: '2023-08-22', skills: ['Penetration Testing', 'IAM', 'Compliance'] },
  { name: 'Neha Gupta', designation: 'DevOps Lead', department: 'Infrastructure', email: 'neha@worksphere.ai', joinDate: '2023-05-30', skills: ['Docker', 'K8s', 'Terraform', 'CI/CD'] },
  { name: 'Arjun Nair', designation: 'Developer', department: 'Engineering', email: 'arjun@worksphere.ai', joinDate: '2024-03-11', skills: ['React', 'JavaScript', 'CSS'] },
  { name: 'Rohit Sharma', designation: 'DevOps Engineer', department: 'Infrastructure', email: 'rohit@worksphere.ai', joinDate: '2024-02-19', skills: ['Linux', 'Ansible', 'Jenkins'] },
];

export default function TeamMembers() {
  const [search, setSearch] = useState('');
  const filtered = mockMembers.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.department.toLowerCase().includes(search.toLowerCase()) || m.skills.some(s => s.toLowerCase().includes(search.toLowerCase())));
  return (
    <EmployeePageLayout title="Team Members" description={`${filtered.length} members across the organization`} breadcrumbs={['Employee', 'Team', 'Team Members']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, department, or skills..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-3 px-2">Name</th>
                <th className="text-left py-3 px-2">Designation</th>
                <th className="text-left py-3 px-2">Department</th>
                <th className="text-left py-3 px-2">Email</th>
                <th className="text-left py-3 px-2">Joined</th>
                <th className="text-left py-3 px-2">Skills</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold">{m.name.split(' ').map(n => n[0]).join('')}</div>
                      <span className="font-medium text-slate-900 dark:text-white">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{m.designation}</td>
                  <td className="py-3 px-2 text-slate-500">{m.department}</td>
                  <td className="py-3 px-2 text-slate-500">{m.email}</td>
                  <td className="py-3 px-2 text-slate-500">{m.joinDate}</td>
                  <td className="py-3 px-2">
                    <div className="flex flex-wrap gap-1">
                      {m.skills.map((s, j) => <span key={j} className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500">{s}</span>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
