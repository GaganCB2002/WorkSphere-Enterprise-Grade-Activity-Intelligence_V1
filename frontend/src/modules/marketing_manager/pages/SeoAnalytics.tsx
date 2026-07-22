import React from 'react';
import { Search, Globe, Link as LinkIcon, Activity, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trafficData = [
  { month: 'Jan', organic: 12000, direct: 8000 },
  { month: 'Feb', organic: 14000, direct: 8500 },
  { month: 'Mar', organic: 16500, direct: 9000 },
  { month: 'Apr', organic: 18000, direct: 9200 },
  { month: 'May', organic: 21000, direct: 9500 },
  { month: 'Jun', organic: 24500, direct: 10000 },
];

const topKeywords = [
  { keyword: 'enterprise monitoring system', volume: '12.4k', position: 2, difficulty: 65, trend: '+1' },
  { keyword: 'devops activity tracker', volume: '8.2k', position: 1, difficulty: 45, trend: '-' },
  { keyword: 'employee productivity software', volume: '22.1k', position: 4, difficulty: 82, trend: '+2' },
  { keyword: 'secure enterprise chat', volume: '15.5k', position: 5, difficulty: 75, trend: '-1' },
  { keyword: 'remote work analytics', volume: '9.8k', position: 3, difficulty: 55, trend: '+3' },
];

export const SeoAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">SEO Analytics</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Organic search performance, rankings, and domain health.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Organic Traffic (30d)</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">24.5k</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +16% MoM
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Keywords in Top 3</p>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">142</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +12 this week
          </span>
        </div>
        <div className="bg-[#f0f6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-900/50 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#0d47a1] dark:text-blue-400 mb-4">Domain Authority</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">68</p>
          <span className="inline-flex items-center text-[11px] font-bold text-[#0d47a1] dark:text-blue-400">
            Target: 75
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Avg. Page Load</p>
          <p className="text-3xl font-bold text-[#f59e0b] dark:text-amber-400 mb-2">1.2s</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            Good Performance
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100">Traffic Trend</h2>
            </div>
            <div className="h-72 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="organic" stroke="#10b981" strokeWidth={3} fill="#d1fae5" fillOpacity={0.4} name="Organic Traffic" />
                  <Area type="monotone" dataKey="direct" stroke="#94a3b8" strokeWidth={3} fill="none" name="Direct Traffic" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Top Performing Keywords</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#e2e8f0] dark:border-slate-800">
                    <th className="pb-3 text-[10px] font-bold text-[#475569] dark:text-slate-300 uppercase">Keyword</th>
                    <th className="pb-3 text-[10px] font-bold text-[#475569] dark:text-slate-300 uppercase">Pos</th>
                    <th className="pb-3 text-[10px] font-bold text-[#475569] dark:text-slate-300 uppercase">Vol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {topKeywords.map((kw, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fafc] dark:hover:bg-slate-800">
                      <td className="py-4 text-sm font-semibold text-[#334155] dark:text-slate-200">{kw.keyword}</td>
                      <td className="py-4 text-sm font-bold text-[#0d47a1] dark:text-blue-400">{kw.position}</td>
                      <td className="py-4 text-xs font-semibold text-[#64748b] dark:text-slate-400">{kw.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
