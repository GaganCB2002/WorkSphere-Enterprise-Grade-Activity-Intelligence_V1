import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, CalendarDays } from 'lucide-react';

const holidays = [
  { date: '26 Jan 2026', day: 'Monday', name: 'Republic Day', type: 'National', region: 'All India' },
  { date: '01 Mar 2026', day: 'Sunday', name: 'Maha Shivaratri', type: 'Optional', region: 'North' },
  { date: '14 Mar 2026', day: 'Saturday', name: 'Holi', type: 'National', region: 'All India' },
  { date: '02 Apr 2026', day: 'Thursday', name: 'Good Friday', type: 'Optional', region: 'South' },
  { date: '14 Apr 2026', day: 'Tuesday', name: 'Ambedkar Jayanti', type: 'Optional', region: 'All India' },
  { date: '01 May 2026', day: 'Friday', name: 'Labour Day', type: 'Company', region: 'All India' },
  { date: '15 Aug 2026', day: 'Saturday', name: 'Independence Day', type: 'National', region: 'All India' },
  { date: '30 Aug 2026', day: 'Sunday', name: 'Janmashtami', type: 'Optional', region: 'North' },
  { date: '02 Oct 2026', day: 'Friday', name: 'Gandhi Jayanti', type: 'National', region: 'All India' },
  { date: '22 Oct 2026', day: 'Thursday', name: 'Dussehra', type: 'National', region: 'All India' },
  { date: '12 Nov 2026', day: 'Thursday', name: 'Diwali', type: 'National', region: 'All India' },
  { date: '25 Dec 2026', day: 'Friday', name: 'Christmas', type: 'Optional', region: 'All India' },
];

export default function HolidayCalendar() {
  const [search, setSearch] = useState('');
  const filtered = holidays.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.type.toLowerCase().includes(search.toLowerCase()) ||
    h.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="Holiday Calendar"
      description="View all holidays for FY 2026"
      breadcrumbs={['Employee', 'Leave', 'Holiday Calendar']}
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search holidays..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Day</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Holiday Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Region</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-slate-900 dark:text-white">{h.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{h.day}</td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{h.name}</td>
                  <td className="px-4 py-3"><StatusBadge label={h.type} variant={h.type === 'National' ? 'active' : h.type === 'Optional' ? 'pending' : 'working'} dot={false} /></td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{h.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
