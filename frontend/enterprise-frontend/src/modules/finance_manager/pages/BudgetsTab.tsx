import React from 'react';
import { 
  ArrowUpRight, AlertTriangle, Sparkles, RefreshCw, BarChart3, TrendingUp, CheckCircle, 
  HelpCircle, MoreHorizontal, ArrowRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  AreaChart, Area
} from 'recharts';

const budgetComparisonData = [
  { name: 'ENG', Planned: 4.0, Actual: 3.8 },
  { name: 'MKT', Planned: 3.0, Actual: 3.25 },
  { name: 'SLS', Planned: 2.5, Actual: 2.0 },
  { name: 'HR', Planned: 1.5, Actual: 1.4 },
];

const runRateData = [
  { month: 'Q1', spend: 5.2 },
  { month: 'Q2', spend: 11.0 },
  { month: 'Q3', spend: 16.2 },
  { month: 'Q4 (Est)', spend: 25.1 },
];

export const BudgetsTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Advanced Budget Planning</h1>
          <p className="text-[#8693BA] text-sm mt-1">Q3 2024 Corporate Allocation & Variance Tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-[#0F1326] border border-[#1D2644] text-[#8693BA] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all">
            <RefreshCw className="w-4 h-4 text-[#00e5ff]" />
            <span>Revise Forecast</span>
          </button>
          <button className="flex items-center gap-2 bg-[#00e5ff] text-[#080B13] hover:bg-[#00ccf0] px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all">
            <Sparkles className="w-4 h-4" />
            <span>Create New Budget</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">ALLOCATED BUDGET</p>
          <h3 className="text-2xl font-black text-white mt-1.5">₹24.5M</h3>
          <p className="text-[10px] text-[#8693BA] uppercase tracking-wider mt-1.5">Annual FY24</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">ACTUAL SPEND</p>
          <h3 className="text-2xl font-black text-white mt-1.5">₹16.2M</h3>
          <p className="text-[10px] text-emerald-400 font-bold tracking-wider mt-1.5">YTD 66% consumed</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">VARIANCE %</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-black text-emerald-400">-4.2%</h3>
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
              Under Budget
            </span>
          </div>
          <p className="text-[10px] text-[#8693BA] uppercase tracking-wider mt-1">vs. YTD Plan</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">FORECASTED OVERRUN</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-black text-red-400">₹850K</h3>
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-mono">
              Risk Alert
            </span>
          </div>
          <p className="text-[10px] text-[#8693BA] uppercase tracking-wider mt-1">Projected Q4</p>
        </div>
      </div>

      {/* Main Charts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Dual Bar Chart */}
        <div className="lg:col-span-8 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#1D2644] pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Department Budget Comparison</h3>
              <p className="text-[#8693BA] text-xs">Comparing allocated budgets against year-to-date spending</p>
            </div>
            <button className="text-[#8693BA] hover:text-[#00e5ff] transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetComparisonData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1D2644" opacity={0.4} />
                <XAxis dataKey="name" stroke="#5B678E" fontSize={11} />
                <YAxis stroke="#5B678E" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0C101F', borderColor: '#1D2644', borderRadius: '1rem', color: '#fff', fontSize: '12px' }}
                />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="Planned" name="Planned Budget" fill="#0C101F" stroke="#1D2644" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" name="Actual Spend" fill="#00e5ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 4 Cols: AI Forecast Panel */}
        <div className="lg:col-span-4 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-md font-bold text-white border-b border-[#1D2644] pb-3">
              <Sparkles className="w-4.5 h-4.5 text-[#00e5ff]" />
              <span>AI Forecast</span>
            </div>

            <div>
              <p className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider">PROJECTED YEAR-END RUN RATE</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h4 className="text-3xl font-black text-white">₹25.1M</h4>
                <span className="text-xs font-bold text-red-400 flex items-center font-mono">
                  +₹600K vs Plan
                </span>
              </div>
            </div>

            {/* Mini Run-Rate Chart */}
            <div className="h-[100px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={runRateData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="runRateGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ display: 'none' }} />
                  <Area type="monotone" dataKey="spend" stroke="#00e5ff" strokeWidth={2.5} fillOpacity={1} fill="url(#runRateGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Model Insight Box */}
            <div className="p-4 bg-red-500/5 border border-red-500/15 rounded-2xl text-[11px] text-[#8693BA] leading-relaxed flex gap-2">
              <AlertTriangle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
              <p>
                Model predicts a likely overrun in Q4 driven by historical Marketing Q4 spend spikes. Consider revising Q4 allocations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Utilization Table */}
      <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white">Department Utilization</h3>
          <p className="text-[#8693BA] text-xs">High-density summary of Q3 budget spend cycles</p>
        </div>

        <div className="overflow-x-auto border border-[#1D2644] rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0C101F] border-b border-[#1D2644] text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider font-mono">
                <th className="p-4">Department</th>
                <th className="p-4 text-right">Allocated</th>
                <th className="p-4 text-right">Consumed</th>
                <th className="p-4">Utilization</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2644]/45 bg-[#0F1326]/10 text-xs">
              <tr className="hover:bg-[#1D2644]/20 transition-all duration-150">
                <td className="p-4 font-bold text-white">Engineering</td>
                <td className="p-4 text-right font-mono text-[#F0EEF8]">₹4,000,000</td>
                <td className="p-4 text-right font-mono text-[#F0EEF8]">₹3,790,000</td>
                <td className="p-4 w-1/3">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold text-white w-8">94%</span>
                    <div className="flex-1 h-1.5 bg-[#1C2542] rounded-full overflow-hidden">
                      <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mx-auto shadow-[0_0_8px_#10b981]" />
                </td>
              </tr>

              <tr className="hover:bg-[#1D2644]/20 transition-all duration-150">
                <td className="p-4 font-bold text-white">Marketing</td>
                <td className="p-4 text-right font-mono text-[#F0EEF8]">₹3,000,000</td>
                <td className="p-4 text-right font-mono text-red-400">₹3,250,000</td>
                <td className="p-4 w-1/3">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold text-red-400 w-8">108%</span>
                    <div className="flex-1 h-1.5 bg-[#1C2542] rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full mx-auto shadow-[0_0_8px_#ef4444]" />
                </td>
              </tr>

              <tr className="hover:bg-[#1D2644]/20 transition-all duration-150">
                <td className="p-4 font-bold text-white">Sales</td>
                <td className="p-4 text-right font-mono text-[#F0EEF8]">₹2,500,000</td>
                <td className="p-4 text-right font-mono text-[#F0EEF8]">₹2,000,000</td>
                <td className="p-4 w-1/3">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold text-white w-8">80%</span>
                    <div className="flex-1 h-1.5 bg-[#1C2542] rounded-full overflow-hidden">
                      <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mx-auto shadow-[0_0_8px_#10b981]" />
                </td>
              </tr>

              <tr className="hover:bg-[#1D2644]/20 transition-all duration-150">
                <td className="p-4 font-bold text-white">Human Resources</td>
                <td className="p-4 text-right font-mono text-[#F0EEF8]">₹1,500,000</td>
                <td className="p-4 text-right font-mono text-[#F0EEF8]">₹1,400,000</td>
                <td className="p-4 w-1/3">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold text-white w-8">93%</span>
                    <div className="flex-1 h-1.5 bg-[#1C2542] rounded-full overflow-hidden">
                      <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: '93%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mx-auto shadow-[0_0_8px_#10b981]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
