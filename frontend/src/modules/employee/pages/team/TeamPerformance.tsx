import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, TrendingUp, Star } from 'lucide-react';

const mockPerformance = [
  { name: 'Gagan Chaudhary', tasksCompleted: 47, projects: 5, productivity: 92, rating: 4.8 },
  { name: 'Ananya Sharma', tasksCompleted: 12, projects: 8, productivity: 88, rating: 4.9 },
  { name: 'Rahul Verma', tasksCompleted: 38, projects: 4, productivity: 85, rating: 4.5 },
  { name: 'Priya Patel', tasksCompleted: 42, projects: 6, productivity: 90, rating: 4.7 },
  { name: 'Vikram Singh', tasksCompleted: 31, projects: 3, productivity: 78, rating: 4.3 },
  { name: 'Sneha Kapoor', tasksCompleted: 25, projects: 3, productivity: 82, rating: 4.4 },
  { name: 'Karan Mehta', tasksCompleted: 19, projects: 4, productivity: 76, rating: 4.2 },
  { name: 'Neha Gupta', tasksCompleted: 28, projects: 5, productivity: 87, rating: 4.6 },
  { name: 'Arjun Nair', tasksCompleted: 22, projects: 3, productivity: 74, rating: 4.0 },
  { name: 'Rohit Sharma', tasksCompleted: 18, projects: 4, productivity: 71, rating: 4.1 },
];

export default function TeamPerformance() {
  const [search, setSearch] = useState('');
  const filtered = mockPerformance.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Team Performance" description="Productivity and performance metrics across team members" breadcrumbs={['Employee', 'Team', 'Team Performance']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-3 px-2">Member</th>
                <th className="text-left py-3 px-2">Tasks Completed</th>
                <th className="text-left py-3 px-2">Projects</th>
                <th className="text-left py-3 px-2">Productivity</th>
                <th className="text-left py-3 px-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-900 dark:text-white">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{m.tasksCompleted}</td>
                  <td className="py-3 px-2 text-slate-500">{m.projects}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700/50 overflow-hidden">
                        <div className={`h-full rounded-full ${m.productivity >= 85 ? 'bg-emerald-500' : m.productivity >= 75 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${m.productivity}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">{m.productivity}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-slate-900 dark:text-white">{m.rating}</span>
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
