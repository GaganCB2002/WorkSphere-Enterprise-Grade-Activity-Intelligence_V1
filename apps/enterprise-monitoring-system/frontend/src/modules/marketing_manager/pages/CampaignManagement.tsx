import React from 'react';
import { Download, ArrowRight, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const dummyTrendUp = [ {val: 1}, {val: 3}, {val: 2}, {val: 5}, {val: 4}, {val: 6} ];
const dummyTrendStable = [ {val: 4}, {val: 5}, {val: 4}, {val: 4.5}, {val: 4}, {val: 4} ];

export const CampaignManagement: React.FC<{ setView: (v: string) => void }> = ({ setView }) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Campaign Management</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Overview and active operations across all global marketing initiatives.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-slate-100 rounded-lg text-sm font-semibold hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Performer Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          {/* Subtle background gradient to match screenshot styling */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#f0f6ff] to-transparent rounded-bl-full pointer-events-none opacity-50"></div>
          
          <div className="flex items-start justify-between mb-4 relative z-10">
            <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[11px] font-bold tracking-wider">
              Top Performer
            </span>
            <button 
              onClick={() => setView('campaign_detail')}
              className="flex items-center gap-2 text-sm font-bold text-[#0d47a1] dark:text-blue-400 hover:underline"
            >
              View Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <h2 className="font-headline text-2xl font-bold text-[#0f172a] dark:text-slate-100 mb-2 relative z-10">Q4 Global Growth</h2>
          <p className="text-sm text-[#475569] dark:text-slate-300 max-w-lg mb-8 relative z-10">
            Multi-channel acquisition campaign targeting enterprise SaaS.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className="border border-[#e2e8f0] dark:border-slate-800 rounded-xl p-4 bg-white/80 backdrop-blur">
              <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-3 leading-tight">Budget Spent</p>
              <p className="text-2xl font-bold text-[#0f172a] dark:text-slate-100 mb-3">₹500k</p>
              <div className="h-1.5 w-full bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#f59e0b]" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="border border-[#e2e8f0] dark:border-slate-800 rounded-xl p-4 bg-white/80 backdrop-blur">
              <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-3 leading-tight">Total Reach</p>
              <p className="text-2xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">2.5M</p>
              <p className="text-[11px] font-bold text-emerald-600 flex items-center">
                <TrendingIcon className="w-3 h-3 mr-1" /> +12% vs last week
              </p>
            </div>

            <div className="border border-[#e2e8f0] dark:border-slate-800 rounded-xl p-4 bg-white/80 backdrop-blur">
              <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-3 leading-tight">Avg. CTR</p>
              <p className="text-2xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">1.8%</p>
              <p className="text-[11px] font-bold text-emerald-600 flex items-center">
                <TrendingIcon className="w-3 h-3 mr-1" /> +0.4% vs benchmark
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Launches */}
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-4 h-4 text-[#0d47a1] dark:text-blue-400" />
            <h2 className="font-bold text-[#0f172a] dark:text-slate-100 text-sm">Upcoming Launches</h2>
          </div>

          <div className="space-y-6">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f0f6ff] dark:bg-blue-900/20 flex flex-col items-center justify-center shrink-0 border border-[#e0e7ff]">
                <span className="text-[9px] font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider">Oct</span>
                <span className="text-sm font-bold text-[#0d47a1] dark:text-blue-400">12</span>
              </div>
              <div>
                <h4 className="font-bold text-[#0f172a] dark:text-slate-100 text-sm mb-1">Product X Launch</h4>
                <p className="text-xs font-semibold text-[#64748b] dark:text-slate-400">Meta, Google Ads</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] dark:bg-slate-800 flex flex-col items-center justify-center shrink-0 border border-[#e2e8f0] dark:border-slate-800">
                <span className="text-[9px] font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider">Oct</span>
                <span className="text-sm font-bold text-[#334155] dark:text-slate-200">18</span>
              </div>
              <div>
                <h4 className="font-bold text-[#0f172a] dark:text-slate-100 text-sm mb-1">Webinar Series</h4>
                <p className="text-xs font-semibold text-[#64748b] dark:text-slate-400">LinkedIn</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] dark:bg-slate-800 flex flex-col items-center justify-center shrink-0 border border-[#e2e8f0] dark:border-slate-800">
                <span className="text-[9px] font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider">Nov</span>
                <span className="text-sm font-bold text-[#334155] dark:text-slate-200">01</span>
              </div>
              <div>
                <h4 className="font-bold text-[#0f172a] dark:text-slate-100 text-sm mb-1">Holiday Promo</h4>
                <p className="text-xs font-semibold text-[#64748b] dark:text-slate-400">Multi-channel</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Filters & Table */}
      <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mt-6">
        
        {/* Filter Bar */}
        <div className="p-4 border-b border-[#e2e8f0] dark:border-slate-800 flex flex-wrap items-center gap-3">
          <div className="p-2 border border-[#e2e8f0] dark:border-slate-800 rounded-lg">
            <Filter className="w-4 h-4 text-[#64748b] dark:text-slate-400" />
          </div>
          
          <select className="bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 text-[#334155] dark:text-slate-200 text-sm font-semibold rounded-lg px-3 py-2 outline-none focus:border-[#0d47a1]">
            <option>Date Range: Last 30 Days</option>
          </select>

          <select className="bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 text-[#334155] dark:text-slate-200 text-sm font-semibold rounded-lg px-3 py-2 outline-none focus:border-[#0d47a1]">
            <option>All Departments</option>
          </select>

          <select className="bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 text-[#334155] dark:text-slate-200 text-sm font-semibold rounded-lg px-3 py-2 outline-none focus:border-[#0d47a1]">
            <option>Objective: All</option>
          </select>

          <select className="bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 text-[#334155] dark:text-slate-200 text-sm font-semibold rounded-lg px-3 py-2 outline-none focus:border-[#0d47a1]">
            <option>Platform: All</option>
          </select>

          <button className="ml-auto text-sm font-bold text-[#0d47a1] dark:text-blue-400 hover:underline px-2">
            Clear Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-[#f8fafc] dark:bg-slate-800 border-b border-[#e2e8f0] dark:border-slate-800">
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Campaign Title</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider w-48">Budget Utilization</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider w-32">ROI Trend</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider text-right">Impressions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              
              {/* Row 1 */}
              <tr className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors group cursor-pointer" onClick={() => setView('campaign_detail')}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-bold text-[#0f172a] dark:text-slate-100 group-hover:text-[#0d47a1]">Q4 Global Growth</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 tracking-wider">Active</span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-[#334155] dark:text-slate-200">Meta, Google</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#f59e0b]" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-[#475569] dark:text-slate-300 w-8 text-right">85%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dummyTrendUp}>
                        <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-[#0f172a] dark:text-slate-100 text-right">2.5M</td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-bold text-[#0f172a] dark:text-slate-100">B2B Lead Gen Series</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 tracking-wider">Scheduled</span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-[#334155] dark:text-slate-200">LinkedIn</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#cbd5e1]" style={{ width: '0%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-[#475569] dark:text-slate-300 w-8 text-right">0%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[11px] font-bold text-[#94a3b8] dark:text-slate-500 italic">Pending</td>
                <td className="px-6 py-4 text-sm font-bold text-[#0f172a] dark:text-slate-100 text-right">-</td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-bold text-[#0f172a] dark:text-slate-100">Q3 Brand Refresh</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100 tracking-wider">Completed</span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-[#334155] dark:text-slate-200">All Platforms</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-[#475569] dark:text-slate-300 w-8 text-right">100%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-16 opacity-50">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dummyTrendStable}>
                        <Line type="monotone" dataKey="val" stroke="#64748b" strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-[#0f172a] dark:text-slate-100 text-right">12.1M</td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    <span className="text-sm font-bold text-[#0f172a] dark:text-slate-100">Holiday Retention</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 tracking-wider">Draft</span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-[#334155] dark:text-slate-200">Email</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400" style={{ width: '10%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-[#475569] dark:text-slate-300 w-8 text-right">10%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[11px] font-bold text-[#94a3b8] dark:text-slate-500 italic">Drafting</td>
                <td className="px-6 py-4 text-sm font-bold text-[#0f172a] dark:text-slate-100 text-right">-</td>
              </tr>

            </tbody>
          </table>
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
