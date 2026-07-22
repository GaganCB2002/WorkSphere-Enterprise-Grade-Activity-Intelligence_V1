import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Mail, Phone, MapPin } from 'lucide-react';

const mockMembers = [
  { name: 'Gagan Chaudhary', role: 'Engineering Lead', department: 'Engineering', email: 'gagan@worksphere.ai', phone: '+1-555-0101', location: 'New York, NY', status: 'Online' },
  { name: 'Ananya Sharma', role: 'CTO', department: 'Engineering', email: 'ananya@worksphere.ai', phone: '+1-555-0102', location: 'San Francisco, CA', status: 'Online' },
  { name: 'Rahul Verma', role: 'Senior Developer', department: 'Engineering', email: 'rahul@worksphere.ai', phone: '+1-555-0103', location: 'Austin, TX', status: 'Offline' },
  { name: 'Priya Patel', role: 'Senior Developer', department: 'Engineering', email: 'priya@worksphere.ai', phone: '+1-555-0104', location: 'Chicago, IL', status: 'Online' },
  { name: 'Vikram Singh', role: 'Data Engineering Lead', department: 'Data', email: 'vikram@worksphere.ai', phone: '+1-555-0105', location: 'Seattle, WA', status: 'Online' },
  { name: 'Sneha Kapoor', role: 'Data Analyst', department: 'Data', email: 'sneha@worksphere.ai', phone: '+1-555-0106', location: 'Denver, CO', status: 'Offline' },
  { name: 'Karan Mehta', role: 'Security Lead', department: 'Security', email: 'karan@worksphere.ai', phone: '+1-555-0107', location: 'Boston, MA', status: 'Online' },
  { name: 'Neha Gupta', role: 'DevOps Lead', department: 'Infrastructure', email: 'neha@worksphere.ai', phone: '+1-555-0108', location: 'Portland, OR', status: 'Offline' },
  { name: 'Arjun Nair', role: 'Developer', department: 'Engineering', email: 'arjun@worksphere.ai', phone: '+1-555-0109', location: 'Atlanta, GA', status: 'Online' },
  { name: 'Rohit Sharma', role: 'DevOps Engineer', department: 'Infrastructure', email: 'rohit@worksphere.ai', phone: '+1-555-0110', location: 'Dallas, TX', status: 'Online' },
];

export default function TeamDirectory() {
  const [search, setSearch] = useState('');
  const filtered = mockMembers.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.department.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Team Directory" description="Find and connect with team members across the organization" breadcrumbs={['Employee', 'Team', 'Team Directory']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or department..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((m, i) => (
            <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">{m.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{m.name}</p>
                    <p className="text-[10px] text-slate-400">{m.role}</p>
                  </div>
                </div>
                <AutoStatusBadge status={m.status} />
              </div>
              <div className="space-y-1.5 text-[10px] text-slate-400">
                <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{m.email}</div>
                <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{m.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3 h-3" />{m.location}</div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200/40 dark:border-white/[0.04] text-[10px] text-slate-400">{m.department}</div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
