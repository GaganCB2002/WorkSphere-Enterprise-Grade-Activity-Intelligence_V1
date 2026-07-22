import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, FileText, Calendar, User, Building } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const offers = [
  { id: 1, candidate: 'Rohit Sharma', position: 'Senior Frontend Engineer', department: 'Engineering', offerDate: '2026-07-01', joiningDate: '2026-08-01', status: 'Accepted' },
  { id: 2, candidate: 'Meera Iyer', position: 'Product Manager', department: 'Product', offerDate: '2026-07-05', joiningDate: '2026-08-15', status: 'Accepted' },
  { id: 3, candidate: 'Karan Patel', position: 'Data Scientist', department: 'Engineering', offerDate: '2026-07-10', joiningDate: '2026-09-01', status: 'Pending' },
  { id: 4, candidate: 'Sara Khan', position: 'UX Researcher', department: 'Design', offerDate: '2026-07-12', joiningDate: '2026-08-20', status: 'Accepted' },
  { id: 5, candidate: 'Vivek Singh', position: 'DevOps Lead', department: 'Engineering', offerDate: '2026-07-15', joiningDate: '2026-09-01', status: 'Pending' },
  { id: 6, candidate: 'Nisha Gupta', position: 'Marketing Specialist', department: 'Marketing', offerDate: '2026-07-18', joiningDate: '2026-08-25', status: 'Declined' },
  { id: 7, candidate: 'Deepak Joshi', position: 'Backend Developer', department: 'Engineering', offerDate: '2026-07-20', joiningDate: '2026-09-05', status: 'Accepted' },
  { id: 8, candidate: 'Ritu Agarwal', position: 'HR Manager', department: 'HR', offerDate: '2026-07-22', joiningDate: '2026-08-20', status: 'Pending' },
];

export default function OfferLetter() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = offers.filter(o =>
    o.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Offer Letters"
      description="Job offer letters sent to candidates"
      breadcrumbs={['Employee', 'Documents', 'Offer Letter']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl">
        <Search className="w-4 h-4 text-slate-400" />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search offer letters..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <div className="space-y-3">
        {filtered.map(o => (
          <GlassPanel key={o.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{o.candidate}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{o.position} &middot; {o.department}</p>
                </div>
              </div>
              <StatusBadge label={o.status} variant={o.status === 'Accepted' ? 'active' : o.status === 'Pending' ? 'pending' : 'leave'} />
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Offer: {o.offerDate}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Joining: {o.joiningDate}</span>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
