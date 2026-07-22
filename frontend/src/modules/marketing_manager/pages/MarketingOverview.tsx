import React from 'react';
import { Download, Calendar, Star, CheckCircle2, Search } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const leadSourceData = [
  { name: 'LinkedIn', value: 40, color: '#0d47a1' },
  { name: 'Google', value: 30, color: '#0369a1' },
  { name: 'Facebook', value: 20, color: '#38bdf8' },
  { name: 'Other', value: 10, color: '#cbd5e1' },
];

export const MarketingOverview: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Marketing Overview</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Enterprise Performance Dashboard • Last 30 Days</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-slate-100 rounded-lg text-sm font-semibold hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-slate-100 rounded-lg text-sm font-semibold hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4 leading-tight">Total<br/>Campaigns</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-3">124</p>
          <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[11px] font-bold">
            <TrendingIcon className="w-3 h-3 mr-1" /> +12% YoY
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4 leading-tight">Active<br/>Campaigns</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-3">42</p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#475569] dark:text-slate-300">
            <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div> Running
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4 leading-tight">Leads<br/>Generated</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-3">12,450</p>
          <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[11px] font-bold">
            <TrendingIcon className="w-3 h-3 mr-1" /> +8% mo
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4 leading-tight">Conversion<br/>Rate</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-3">4.2%</p>
          <p className="text-[11px] font-semibold text-[#64748b] dark:text-slate-400 leading-tight">Avg. across<br/>channels</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4 leading-tight">Ad Spend</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-4">₹1.2M</p>
          <div className="h-1.5 w-full bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#0d47a1] dark:bg-blue-600" style={{ width: '65%' }}></div>
          </div>
        </div>

        <div className="bg-[#f0f6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-900/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="flex items-start justify-between mb-4">
            <p className="text-[11px] font-bold text-[#0d47a1] dark:text-blue-400">ROI</p>
            <Star className="w-4 h-4 text-[#0d47a1] dark:text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">320%</p>
          <p className="text-[11px] font-bold text-emerald-600 leading-tight mt-3">Exceptional<br/>performance</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Left/Middle Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Campaign Performance Chart placeholder */}
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100">Campaign Performance</h2>
              <button className="p-1 text-[#64748b] dark:text-slate-400 hover:text-[#0f172a] dark:hover:text-white">
                <div className="flex flex-col gap-1"><div className="w-1 h-1 bg-current rounded-full"></div><div className="w-1 h-1 bg-current rounded-full"></div><div className="w-1 h-1 bg-current rounded-full"></div></div>
              </button>
            </div>
            <div className="bg-[#f8fafc] dark:bg-slate-800 rounded-xl h-64 border border-[#e2e8f0] dark:border-slate-800 flex flex-col items-center justify-center text-[#94a3b8] dark:text-slate-500">
               {/* Decorative placeholder icon resembling a chart */}
               <TrendingIcon className="w-8 h-8 mb-2 opacity-50" />
               <p className="text-xs font-semibold">Impressions vs Conversions (30 Days)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Traffic Analytics placeholder */}
            <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Traffic Analytics</h2>
              <div className="bg-[#f8fafc] dark:bg-slate-800 rounded-xl h-48 border border-[#e2e8f0] dark:border-slate-800 flex items-center justify-center text-[#94a3b8] dark:text-slate-500">
                <div className="w-8 h-8 border-2 border-current rounded-sm flex items-center justify-center opacity-50">
                  <div className="w-3 h-3 bg-current rounded-sm rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Conversion Funnel</h2>
              <div className="space-y-3 pt-2 flex flex-col items-center">
                <div className="w-full max-w-[240px] bg-[#e0e7ff] dark:bg-indigo-900/40 text-[#0f172a] dark:text-slate-100 rounded flex items-center justify-between px-4 py-2 font-bold text-sm">
                  <span>Leads</span>
                  <span>12,450</span>
                </div>
                <div className="w-[85%] max-w-[210px] bg-[#c7d2fe] text-[#0f172a] dark:text-slate-100 rounded flex items-center justify-between px-4 py-2 font-bold text-sm">
                  <span>MQL</span>
                  <span>4,120</span>
                </div>
                <div className="w-[70%] max-w-[180px] bg-[#a5b4fc] text-[#0f172a] dark:text-slate-100 rounded flex items-center justify-between px-4 py-2 font-bold text-sm">
                  <span>SQL</span>
                  <span>1,850</span>
                </div>
                <div className="w-[50%] max-w-[140px] bg-[#6366f1] text-white rounded flex items-center justify-between px-4 py-2 font-bold text-sm shadow-sm">
                  <span>Closed</span>
                  <span>523</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Recent Activity</h2>
            
            <div className="relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-px before:bg-[#e2e8f0] space-y-6">
              
              <div className="relative flex gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shrink-0 z-10 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-[#334155] dark:text-slate-200 leading-snug font-medium">
                    <span className="font-bold text-[#0f172a] dark:text-slate-100">"Global Summer Launch"</span> campaign approved by Brand Director.
                  </p>
                  <p className="text-[10px] font-bold text-[#64748b] dark:text-slate-400 mt-1.5 uppercase tracking-wider">2 hours ago</p>
                </div>
              </div>

              <div className="relative flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shrink-0 z-10 text-blue-600">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-[#334155] dark:text-slate-200 leading-snug font-medium">
                    SEO Update: <span className="font-bold text-[#0f172a] dark:text-slate-100">"Enterprise SaaS"</span> keyword moved to position #2.
                  </p>
                  <p className="text-[10px] font-bold text-[#64748b] dark:text-slate-400 mt-1.5 uppercase tracking-wider">4 hours ago</p>
                </div>
              </div>

            </div>
          </div>

          {/* Lead Source Breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Lead Source<br/>Breakdown</h2>
            
            <div className="flex items-center justify-between gap-2">
              <div className="relative w-32 h-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={leadSourceData} innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value" stroke="none">
                      {leadSourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm font-bold text-[#0f172a] dark:text-slate-100">100%</span>
                </div>
              </div>

              <div className="space-y-3 flex-1 pl-2">
                {leadSourceData.map(item => (
                  <div key={item.name} className="flex items-center justify-between text-[11px] font-bold">
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

      </div>

    </div>
  );
};

// Extracted SVG to match screenshot's trending icon visually
const TrendingIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
    <polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);
