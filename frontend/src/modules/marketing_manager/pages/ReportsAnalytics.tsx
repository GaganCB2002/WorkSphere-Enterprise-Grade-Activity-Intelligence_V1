import React from 'react';
import { Download, Calendar, FileText, BarChart2, PieChart, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const spendRevenueData = [
  { month: 'Jan', spend: 40000, revenue: 120000 },
  { month: 'Feb', spend: 45000, revenue: 150000 },
  { month: 'Mar', spend: 50000, revenue: 180000 },
  { month: 'Apr', spend: 48000, revenue: 160000 },
  { month: 'May', spend: 55000, revenue: 210000 },
  { month: 'Jun', spend: 60000, revenue: 250000 },
  { month: 'Jul', spend: 62000, revenue: 270000 },
  { month: 'Aug', spend: 58000, revenue: 240000 },
  { month: 'Sep', spend: 65000, revenue: 310000 },
  { month: 'Oct', spend: 70000, revenue: 350000 },
];

const channelData = [
  { name: 'Organic Search', conversion: 4.8 },
  { name: 'LinkedIn Ads', conversion: 3.2 },
  { name: 'Direct Traffic', conversion: 5.5 },
  { name: 'Email Marketing', conversion: 6.1 },
  { name: 'Meta Ads', conversion: 1.8 },
];

const availableReports = [
  { id: 'rep-1', name: 'Q3 Enterprise Performance Matrix', type: 'PDF', size: '2.4 MB', date: 'Oct 01, 2023', status: 'Generated' },
  { id: 'rep-2', name: 'SEO Technical Audit (Global)', type: 'PDF', size: '5.1 MB', date: 'Oct 12, 2023', status: 'Generated' },
  { id: 'rep-3', name: 'Social Media Engagement Export', type: 'CSV', size: '1.2 MB', date: 'Oct 20, 2023', status: 'Generated' },
  { id: 'rep-4', name: 'Paid Ads Weekly Spend', type: 'XLSX', size: '0.8 MB', date: 'Oct 24, 2023', status: 'Processing' },
];

export const ReportsAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Reports & Analytics</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Deep-dive performance metrics and downloadable data exports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-slate-100 rounded-lg text-sm font-semibold hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Calendar className="w-4 h-4" /> YTD (Year to Date)
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0d47a1] dark:bg-blue-600 hover:bg-[#0a3982] text-white rounded-lg text-sm font-bold shadow-md shadow-blue-900/20 transition-all">
            <BarChart2 className="w-4 h-4" /> Generate Custom Report
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Customer Acquisition Cost (CAC)</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">₹850</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> -5.4% (Improving)
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Customer Lifetime Value (LTV)</p>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">₹12,400</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5%
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Marketing ROI (Overall)</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">385%</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> Target: 300%
          </span>
        </div>
        <div className="bg-[#f0f6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-900/50 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#0d47a1] dark:text-blue-400 mb-4">Total Pipeline Generated</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">₹8.5M</p>
          <span className="inline-flex items-center text-[11px] font-bold text-[#0d47a1] dark:text-blue-400">
            <TrendingUp className="w-3 h-3 mr-1" /> Q4 Projections Met
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Main Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Spend vs Revenue Chart */}
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100">Spend vs. Revenue Generated</h2>
            </div>
            
            <div className="h-72 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendRevenueData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                    formatter={(value: number) => `${value.toLocaleString()}`}
                  />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="#d1fae5" fillOpacity={0.4} name="Revenue" />
                  <Area yAxisId="left" type="monotone" dataKey="spend" stroke="#0d47a1" strokeWidth={3} fill="none" name="Spend" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Rates by Channel */}
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100">Conversion Rates by Channel</h2>
              <PieChart className="w-5 h-5 text-[#94a3b8] dark:text-slate-500" />
            </div>
            
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} width={100} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="conversion" fill="#0d47a1" radius={[0, 4, 4, 0]} barSize={24} name="Conv. Rate" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Sidebar Column - Reports */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Available Reports</h2>
            
            <div className="space-y-4">
              {availableReports.map((report) => (
                <div key={report.id} className="p-4 border border-[#e2e8f0] dark:border-slate-800 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className={`w-4 h-4 ${report.type === 'PDF' ? 'text-rose-500' : 'text-emerald-500'}`} />
                      <h3 className="font-bold text-sm text-[#0f172a] dark:text-slate-100 line-clamp-1" title={report.name}>{report.name}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider">
                      <span className="bg-[#f1f5f9] dark:bg-slate-800 px-2 py-0.5 rounded">{report.type}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#e2e8f0] dark:border-slate-800 flex items-center justify-between">
                    <span className={`text-[11px] font-bold ${report.status === 'Processing' ? 'text-amber-500' : 'text-emerald-600'}`}>
                      {report.status}
                    </span>
                    <button 
                      disabled={report.status === 'Processing'}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors
                        ${report.status === 'Processing' 
                          ? 'bg-[#f1f5f9] dark:bg-slate-800 text-[#94a3b8] dark:text-slate-500 cursor-not-allowed' 
                          : 'bg-[#e0e7ff] dark:bg-indigo-900/40 text-[#0d47a1] dark:text-blue-400 hover:bg-[#c7d2fe]'}
                      `}
                    >
                      <Download className="w-3 h-3" /> Download
                    </button>
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
