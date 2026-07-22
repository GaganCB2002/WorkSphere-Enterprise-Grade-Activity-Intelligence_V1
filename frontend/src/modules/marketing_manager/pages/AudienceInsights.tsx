import React from 'react';
import { Users2, Building2, Globe2, Briefcase } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const industryData = [
  { name: 'SaaS / Tech', value: 45, color: '#0d47a1' },
  { name: 'Financial Services', value: 25, color: '#0369a1' },
  { name: 'Healthcare', value: 15, color: '#38bdf8' },
  { name: 'Retail', value: 10, color: '#94a3b8' },
  { name: 'Other', value: 5, color: '#cbd5e1' },
];

const companySizeData = [
  { name: 'Enterprise (1000+)', value: 60, color: '#10b981' },
  { name: 'Mid-Market (100-999)', value: 30, color: '#34d399' },
  { name: 'SMB (1-99)', value: 10, color: '#a7f3d0' },
];

const targetAccounts = [
  { name: 'Acme Corporation', industry: 'SaaS', size: '10,000+', engagement: 'High', score: 92 },
  { name: 'Global Finance LLC', industry: 'Financial Services', size: '5,000+', engagement: 'Medium', score: 78 },
  { name: 'HealthFirst Group', industry: 'Healthcare', size: '2,500+', engagement: 'High', score: 85 },
];

export const AudienceInsights: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Audience Insights</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Demographics, firmographics, and target account tracking.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Total Addressable Market</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">1.2M</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Active Profiles Tracked</p>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">425k</p>
        </div>
        <div className="bg-[#f0f6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-900/50 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#0d47a1] dark:text-blue-400 mb-4">Demographic Match</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">85%</p>
          <span className="inline-flex items-center text-[11px] font-bold text-[#0d47a1] dark:text-blue-400">
            Ideal Customer Profile
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">B2B Accounts</p>
          <p className="text-3xl font-bold text-[#f59e0b] dark:text-amber-400 mb-2">12,400</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Industry Breakdown</h2>
              <div className="h-48 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={industryData} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                      {industryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {industryData.map(item => (
                  <div key={item.name} className="flex justify-between items-center text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[#475569] dark:text-slate-300">{item.name}</span>
                    </div>
                    <span className="text-[#0f172a] dark:text-slate-100">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Company Size</h2>
              <div className="h-48 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={companySizeData} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                      {companySizeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {companySizeData.map(item => (
                  <div key={item.name} className="flex justify-between items-center text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[#475569] dark:text-slate-300">{item.name}</span>
                    </div>
                    <span className="text-[#0f172a] dark:text-slate-100">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Top Target Accounts</h2>
            <div className="space-y-4">
              {targetAccounts.map((acc, idx) => (
                <div key={idx} className="p-4 border border-[#e2e8f0] dark:border-slate-800 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm text-[#0f172a] dark:text-slate-100">{acc.name}</h3>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider ${acc.engagement === 'High' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {acc.engagement} Engagement
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#475569] dark:text-slate-300 font-semibold">
                      <Briefcase className="w-3.5 h-3.5" /> {acc.industry}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#475569] dark:text-slate-300 font-semibold">
                      <Building2 className="w-3.5 h-3.5" /> {acc.size} Employees
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#e2e8f0] dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#64748b] dark:text-slate-400">AI Match Score</span>
                    <span className="font-bold text-[#0f172a] dark:text-slate-100">{acc.score}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
