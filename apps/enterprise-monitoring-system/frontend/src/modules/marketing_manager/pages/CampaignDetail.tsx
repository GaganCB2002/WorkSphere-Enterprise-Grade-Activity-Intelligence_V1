import React from 'react';
import { 
  Download, Pause, Edit3, ArrowLeft,
  Eye, Target, TrendingUp, Wallet, Image as ImageIcon
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { name: 'W1', impressions: 4000, conversions: 2400 },
  { name: 'W2', impressions: 3000, conversions: 1398 },
  { name: 'W3', impressions: 2000, conversions: 9800 },
  { name: 'W4', impressions: 2780, conversions: 3908 },
  { name: 'W5', impressions: 1890, conversions: 4800 },
  { name: 'W6', impressions: 2390, conversions: 3800 },
  { name: 'W7', impressions: 3490, conversions: 4300 },
];

export const CampaignDetail: React.FC<{ setView: (v: string) => void }> = ({ setView }) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <button 
              onClick={() => setView('campaigns')}
              className="p-1 hover:bg-[#e2e8f0] rounded text-[#64748b] dark:text-slate-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div> ACTIVE
            </span>
            <span className="text-xs font-bold text-[#64748b] dark:text-slate-400">ID: CMP-2023-Q4-88</span>
          </div>
          
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Q4 Global Growth</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Enterprise multi-channel awareness and acquisition push.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-slate-100 rounded-lg text-sm font-semibold hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Pause className="w-4 h-4" /> Pause
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-slate-100 rounded-lg text-sm font-semibold hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0d47a1] dark:bg-blue-600 hover:bg-[#0a3982] text-white rounded-lg text-sm font-bold shadow-md shadow-blue-900/20 transition-all">
            <Edit3 className="w-4 h-4" /> Edit Campaign
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Budget Spent</p>
            <Wallet className="w-4 h-4 text-[#94a3b8] dark:text-slate-500" />
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100">$500k</p>
            <p className="text-xs font-semibold text-[#64748b] dark:text-slate-400">/ $850k</p>
          </div>
          <div className="h-1.5 w-full bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#f59e0b]" style={{ width: '60%' }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Total Reach</p>
            <Eye className="w-4 h-4 text-[#94a3b8] dark:text-slate-500" />
          </div>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">2.5M</p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +12% vs last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Conversions</p>
            <Target className="w-4 h-4 text-[#94a3b8] dark:text-slate-500" />
          </div>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">12,450</p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +5.2% vs last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Est. ROI</p>
            <TrendingUp className="w-4 h-4 text-[#94a3b8] dark:text-slate-500" />
          </div>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">3.2x</p>
          <p className="text-[11px] font-semibold text-[#64748b] dark:text-slate-400">Target: 3.0x</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Performance Over Time Chart */}
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100">Performance Over Time</h2>
              <select className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#334155] dark:text-slate-200 text-xs font-semibold rounded-lg px-2 py-1 outline-none">
                <option>Last 30 Days</option>
              </select>
            </div>
            
            <div className="h-64 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                  />
                  <Area type="monotone" dataKey="impressions" stroke="#0d47a1" strokeWidth={3} fill="none" />
                  <Area type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="absolute top-0 right-4 bg-white/90 p-2 rounded-lg border border-[#e2e8f0] dark:border-slate-800 shadow-sm flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#475569] dark:text-slate-300">
                  <div className="w-3 h-1 bg-[#0d47a1] dark:bg-blue-600 rounded"></div> Impressions
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#475569] dark:text-slate-300">
                  <div className="w-3 h-1 bg-[#10b981] rounded border border-dashed border-[#10b981]"></div> Conversions
                </div>
              </div>
            </div>
          </div>

          {/* Channel Breakdown Table */}
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm overflow-x-auto">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Channel Breakdown</h2>
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b border-[#e2e8f0] dark:border-slate-800">
                  <th className="pb-3 text-[10px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Channel</th>
                  <th className="pb-3 text-[10px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Spend</th>
                  <th className="pb-3 text-[10px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Impressions</th>
                  <th className="pb-3 text-[10px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">CPC</th>
                  <th className="pb-3 text-[10px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Conversions</th>
                  <th className="pb-3 text-[10px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                <tr className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#0d47a1] dark:bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">IN</div>
                      <span className="text-sm font-semibold text-[#334155] dark:text-slate-200">LinkedIn Ads</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">$250,000</td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">850k</td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">$12.50</td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">4,200</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Scaling
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#3b82f6] text-white flex items-center justify-center text-[10px] font-bold">G</div>
                      <span className="text-sm font-semibold text-[#334155] dark:text-slate-200">Google Search</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">$180,000</td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">1.2M</td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">$4.20</td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">6,100</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Stable
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#2563eb] text-white flex items-center justify-center text-[10px] font-bold">M</div>
                      <span className="text-sm font-semibold text-[#334155] dark:text-slate-200">Meta (FB/IG)</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">$70,000</td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">450k</td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">$2.15</td>
                  <td className="py-4 text-sm font-semibold text-[#0f172a] dark:text-slate-100">2,150</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f59e0b] dark:text-amber-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></div> Reviewing
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Top Performing Creatives */}
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100">Top Performing Creatives</h2>
              <button className="text-sm font-bold text-[#0d47a1] dark:text-blue-400 hover:underline">View All Gallery</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="border border-[#e2e8f0] dark:border-slate-800 rounded-xl overflow-hidden shadow-sm group">
                <div className="h-32 bg-[#f1f5f9] dark:bg-slate-800 relative flex items-center justify-center">
                  {/* Mock image placeholder */}
                  <ImageIcon className="w-8 h-8 text-[#cbd5e1] absolute z-0" />
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop" alt="Data Growth" className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a] dark:text-slate-100">Data Growth_V1</h4>
                    <p className="text-[10px] font-semibold text-[#64748b] dark:text-slate-400 mt-1">CTR: 4.2%</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold border border-emerald-100">Top</span>
                </div>
              </div>

              <div className="border border-[#e2e8f0] dark:border-slate-800 rounded-xl overflow-hidden shadow-sm group">
                <div className="h-32 bg-[#f1f5f9] dark:bg-slate-800 relative flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-[#cbd5e1] absolute z-0" />
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" alt="Team Collab" className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a] dark:text-slate-100">Team Collab_Life</h4>
                    <p className="text-[10px] font-semibold text-[#64748b] dark:text-slate-400 mt-1">CTR: 3.8%</p>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">Avg</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          
          {/* Target Audience */}
          <div className="bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline text-lg font-bold text-[#0f172a] dark:text-slate-100">Target Audience</h2>
              <Edit3 className="w-4 h-4 text-[#64748b] dark:text-slate-400" />
            </div>
            
            <div className="mb-4">
              <p className="text-[10px] font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider mb-2">Demographics</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#334155] dark:text-slate-200 rounded-full text-xs font-semibold">B2B SaaS</span>
                <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#334155] dark:text-slate-200 rounded-full text-xs font-semibold">Enterprise</span>
                <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#334155] dark:text-slate-200 rounded-full text-xs font-semibold">North America</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-[10px] font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider mb-2">Key Interests</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#e0e7ff] dark:bg-indigo-900/40 text-[#0d47a1] dark:text-blue-400 rounded-full text-xs font-semibold">Cloud Architecture</span>
                <span className="px-3 py-1 bg-[#e0e7ff] dark:bg-indigo-900/40 text-[#0d47a1] dark:text-blue-400 rounded-full text-xs font-semibold">DevOps</span>
                <span className="px-3 py-1 bg-[#e0e7ff] dark:bg-indigo-900/40 text-[#0d47a1] dark:text-blue-400 rounded-full text-xs font-semibold">AI Integration</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e2e8f0] dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Audience Match Quality</span>
                <span className="text-[11px] font-bold text-emerald-600">High (92%)</span>
              </div>
              <div className="h-1.5 w-full bg-[#e2e8f0] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>

          {/* Assigned Team */}
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="font-headline text-lg font-bold text-[#0f172a] dark:text-slate-100 mb-4">Assigned Team</h2>
            
            <div className="flex -space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Sarah" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="Mike" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" alt="Alex" />
              </div>
              <div className="w-8 h-8 rounded-full bg-[#f1f5f9] dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-[#475569] dark:text-slate-300">
                +
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#e2e8f0] mt-1.5"></div>
                <div>
                  <p className="text-xs text-[#334155] dark:text-slate-200 leading-snug">
                    <span className="font-bold text-[#0f172a] dark:text-slate-100">Sarah J.</span> adjusted Google Search bids.
                  </p>
                  <p className="text-[9px] font-bold text-[#94a3b8] dark:text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#e2e8f0] mt-1.5"></div>
                <div>
                  <p className="text-xs text-[#334155] dark:text-slate-200 leading-snug">
                    <span className="font-bold text-[#0f172a] dark:text-slate-100">Mike T.</span> uploaded 2 new Meta creatives.
                  </p>
                  <p className="text-[9px] font-bold text-[#94a3b8] dark:text-slate-500 mt-1">Yesterday, 4:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="font-headline text-lg font-bold text-[#0f172a] dark:text-slate-100 mb-4">Milestones</h2>
            
            <div className="relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-[#e2e8f0] space-y-6">
              
              <div className="relative flex gap-4">
                <div className="w-4 h-4 bg-[#0d47a1] dark:bg-blue-600 rounded-full border-2 border-[#f8fafc] shrink-0 z-10 mt-0.5"></div>
                <div>
                  <p className="text-xs font-bold text-[#0f172a] dark:text-slate-100">Mid-Campaign Review</p>
                  <p className="text-[10px] font-bold text-[#64748b] dark:text-slate-400 mt-1">Oct 15, 2023</p>
                </div>
              </div>

              <div className="relative flex gap-4">
                <div className="w-4 h-4 bg-[#e2e8f0] rounded-full border-2 border-[#f8fafc] shrink-0 z-10 mt-0.5"></div>
                <div>
                  <p className="text-xs font-bold text-[#64748b] dark:text-slate-400">Budget Reallocation</p>
                  <p className="text-[10px] font-bold text-[#94a3b8] dark:text-slate-500 mt-1">Nov 01, 2023</p>
                </div>
              </div>

              <div className="relative flex gap-4">
                <div className="w-4 h-4 bg-[#e2e8f0] rounded-full border-2 border-[#f8fafc] shrink-0 z-10 mt-0.5"></div>
                <div>
                  <p className="text-xs font-bold text-[#64748b] dark:text-slate-400">Campaign End</p>
                  <p className="text-[10px] font-bold text-[#94a3b8] dark:text-slate-500 mt-1">Dec 31, 2023</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
