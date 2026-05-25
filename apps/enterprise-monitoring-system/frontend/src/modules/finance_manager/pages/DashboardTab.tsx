import React from 'react';
import { 
  CheckCircle2, AlertTriangle, FileText, Trash2, ArrowUpRight, ArrowDownRight, 
  Calendar, Search, Bell, Moon, Sun, IndianRupee, Activity, Wallet, ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';

const mockCashFlowData = [
  { month: 'Jan', inflow: 8.5, outflow: 3.2 },
  { month: 'Feb', inflow: 9.8, outflow: 3.4 },
  { month: 'Mar', inflow: 11.2, outflow: 3.9 },
  { month: 'Apr', inflow: 12.8, outflow: 4.1 },
  { month: 'May', inflow: 14.2, outflow: 4.5 },
];

export const DashboardTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Treasury Overview</h1>
          <p className="text-[#8693BA] text-sm mt-1">Real-time liquidity, capital allocations, and pending board approvals.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#0F1326] border border-[#1D2644] text-[#8693BA] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all">
            <Calendar className="w-4 h-4 text-[#00e5ff]" />
            <span>Q3 FY26 Operations</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">TOTAL LIQUIDITY</p>
              <h3 className="text-2xl font-black text-white mt-1.5">₹1.42B</h3>
              <p className="text-[11px] font-bold text-[#00e5ff] flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +2.4% vs last month
              </p>
            </div>
            <div className="p-3 bg-[#00e5ff]/10 border border-[#00e5ff]/20 rounded-xl text-[#00e5ff]">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">MONTHLY NET SPEND</p>
              <h3 className="text-2xl font-black text-white mt-1.5">₹2.4M</h3>
              <p className="text-[11px] font-bold text-red-400 flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% vs last month
              </p>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">ACTIVE BUDGET ALLOCATION</p>
              <h3 className="text-2xl font-black text-white mt-1.5">₹24.5M</h3>
              <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 66% consumed YTD
              </p>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">FLAGGED ANOMALIES</p>
              <h3 className="text-2xl font-black text-white mt-1.5">14</h3>
              <p className="text-[11px] font-bold text-amber-400 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3.5 h-3.5" /> High anomaly confidence
              </p>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Graph + Side Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Cash Flow & Proposals */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chart Card */}
          <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#1D2644] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Cash Flow Dynamics (₹ Millions)</h3>
                <p className="text-[#8693BA] text-xs">Comparing monthly cash inflows against operational outflows</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                  <span className="text-[#8693BA]">Cash Inflow</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7a78e9]" />
                  <span className="text-[#8693BA]">Cash Outflow</span>
                </div>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockCashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7a78e9" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#7a78e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1D2644" opacity={0.4} />
                  <XAxis dataKey="month" stroke="#5B678E" fontSize={11} />
                  <YAxis stroke="#5B678E" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0C101F', borderColor: '#1D2644', borderRadius: '1rem', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="inflow" stroke="#00e5ff" strokeWidth={2.5} fillOpacity={1} fill="url(#inflowGrad)" />
                  <Area type="monotone" dataKey="outflow" stroke="#7a78e9" strokeWidth={2.5} fillOpacity={1} fill="url(#outflowGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Proposals List Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Approvals Column */}
            <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl">
              <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3 mb-4">Pending Approvals</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-[#0C101F]/80 border border-[#1C2542] rounded-2xl hover:border-[#00e5ff]/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#7a78e9]/10 rounded-xl text-[#7a78e9]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Q3 Exec Travel Budget</h4>
                      <p className="text-[10px] text-[#8693BA] mt-0.5">Requested by HR</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00e5ff]">₹18,200</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#0C101F]/80 border border-[#1C2542] rounded-2xl hover:border-[#00e5ff]/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#00e5ff]/10 rounded-xl text-[#00e5ff]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Ad Campaign: APAC Region</h4>
                      <p className="text-[10px] text-[#8693BA] mt-0.5">Requested by Marketing</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00e5ff]">₹125,000</span>
                </div>

                <button className="w-full py-2.5 border border-dashed border-[#1C2542] hover:border-[#00e5ff] text-center text-xs font-bold text-[#8693BA] hover:text-white rounded-xl transition-all">
                  View All Approvals
                </button>
              </div>
            </div>

            {/* Quick Proposal Review Card */}
            <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3 mb-4">Strategic Proposal</h3>
                <div className="p-4 bg-[#00e5ff]/5 border border-[#00e5ff]/15 rounded-2xl text-xs text-[#8693BA] leading-relaxed">
                  Negotiating vendor payment cycle with top 3 hardware suppliers from Net-30 to Net-45 could free up approximately <span className="text-white font-bold">₹1.2M</span> in working capital for Q4.
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-3 bg-[#0C1226]/80 hover:bg-[#121B35] border border-[#1E294B] hover:border-[#00e5ff] text-white text-xs font-extrabold uppercase rounded-xl transition-all">
                  Review Proposal
                </button>
                <button className="p-3 bg-[#0C1226]/80 hover:bg-red-500/10 border border-[#1E294B] hover:border-red-500/30 text-[#8693BA] hover:text-red-400 rounded-xl transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Alerts & Audits */}
        <div className="lg:col-span-4 space-y-6">
          {/* Notifications Card */}
          <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl flex flex-col h-full justify-between">
            <div>
              <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3 mb-4 flex items-center gap-2">
                <Bell className="w-4.5 h-4.5 text-[#00e5ff]" />
                <span>Security & Audit Alerts</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3.5 p-3.5 bg-[#0C101F]/80 border border-[#1C2542] rounded-2xl border-l-4 border-l-red-500">
                  <div className="p-2 bg-red-500/10 text-red-400 rounded-xl flex-shrink-0 h-fit">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">Compliance alert: Missing W-9 form</h4>
                    <p className="text-[10px] text-[#8693BA] mt-1.5 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-[#5B678E]" /> Oct 24, 11:05 AM
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-3.5 bg-[#0C101F]/80 border border-[#1C2542] rounded-2xl border-l-4 border-l-emerald-500">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl flex-shrink-0 h-fit">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">Audit approved (TechCorp)</h4>
                    <p className="text-[10px] text-[#8693BA] mt-1.5 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-[#5B678E]" /> Yesterday, 14:22 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1C2542] flex justify-between text-xs text-[#8693BA]">
              <span>System: Operational</span>
              <span className="font-mono text-[10px] text-[#00e5ff]">v2.4.0-stable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
