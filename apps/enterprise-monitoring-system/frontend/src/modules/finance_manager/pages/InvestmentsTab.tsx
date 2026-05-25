import React, { useState } from 'react';
import { 
  BarChart3, ArrowUpRight, TrendingUp, Sparkles, RefreshCw, 
  HelpCircle, MoreHorizontal, ArrowRight, ShieldCheck, Wallet
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend 
} from 'recharts';

interface AssetAllocation {
  name: string;
  value: number;
  color: string;
  yieldRate: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const InvestmentsTab: React.FC = () => {
  const [allocations, setAllocations] = useState<AssetAllocation[]>([
    { name: 'Fixed Deposits (SBI/HDFC)', value: 45000000, color: '#00e5ff', yieldRate: '7.8% p.a.', risk: 'LOW' },
    { name: 'Government G-Sec Bonds', value: 35000000, color: '#7a78e9', yieldRate: '7.15% p.a.', risk: 'LOW' },
    { name: 'Corporate Commercial Papers', value: 25000000, color: '#3b82f6', yieldRate: '9.2% p.a.', risk: 'MEDIUM' },
    { name: 'Liquid Treasury Reserves', value: 15000000, color: '#10b981', yieldRate: '4.5% p.a.', risk: 'LOW' },
    { name: 'Mutual Fund Debt Schemes', value: 18000000, color: '#f59e0b', yieldRate: '8.4% p.a.', risk: 'MEDIUM' },
  ]);

  const [simulatedFD, setSimulatedFD] = useState(0);

  const totalPortfolioValue = allocations.reduce((sum, item) => sum + item.value, 0);

  const handleSimulateAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (simulatedFD <= 0) return;
    setAllocations(prev => prev.map(item => {
      if (item.name.startsWith('Fixed Deposits')) {
        return { ...item, value: item.value + simulatedFD };
      }
      return item;
    }));
    alert(`Simulated capital deployment: Allocated ₹${simulatedFD.toLocaleString()} to Fixed Deposits.`);
    setSimulatedFD(0);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Investment Portfolios</h1>
          <p className="text-[#8693BA] text-sm mt-1">Manage idle capital reserve accounts, sovereign bonds, and high-yield commercial deposits.</p>
        </div>
        <button 
          onClick={() => alert('Refreshing portfolio ledger NAV details...')}
          className="flex items-center gap-2 bg-[#0F1326] border border-[#1D2644] text-[#8693BA] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
        >
          <RefreshCw className="w-4 h-4 text-[#00e5ff]" />
          <span>Sync NAV</span>
        </button>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">TOTAL RESERVE VALUE</p>
          <h3 className="text-2xl font-black text-white mt-1.5">₹{(totalPortfolioValue / 10000000).toFixed(2)}Cr</h3>
          <p className="text-[10px] text-[#8693BA] uppercase tracking-wider mt-1.5">Active Capital Reserves</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">WEIGHTED AVERAGE YIELD</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1.5">7.92%</h3>
          <p className="text-[10px] text-emerald-400 font-bold tracking-wider mt-1.5">Outperforming inflation by 2.42%</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">ESTIMATED ANNUAL RETURN</p>
          <h3 className="text-2xl font-black text-white mt-1.5">₹1.09Cr</h3>
          <p className="text-[10px] text-[#8693BA] uppercase tracking-wider mt-1.5">Compound growth interest</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">RISK PROFILE ASSESSMENT</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-black text-emerald-400">LOW</h3>
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
              Govt-backed
            </span>
          </div>
          <p className="text-[10px] text-[#8693BA] uppercase tracking-wider mt-1">94% Core Principal Shielded</p>
        </div>
      </div>

      {/* Portfolio Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Asset Listings Table */}
        <div className="lg:col-span-8 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-[#1D2644] pb-3">Capital Asset Allocation</h3>
          
          <div className="overflow-x-auto border border-[#1D2644] rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0C101F] border-b border-[#1D2644] text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider font-mono">
                  <th className="p-4">Asset Class</th>
                  <th className="p-4 text-right">Deallocated Value</th>
                  <th className="p-4 text-center">Annual Yield</th>
                  <th className="p-4 text-center">Risk Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D2644]/45 bg-[#0F1326]/10 text-xs">
                {allocations.map(item => (
                  <tr key={item.name} className="hover:bg-[#1D2644]/20 transition-all duration-150">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </td>
                    <td className="p-4 text-right font-black text-[#00e5ff] font-mono">₹{item.value.toLocaleString()}</td>
                    <td className="p-4 text-center text-[#F0EEF8] font-bold font-mono">{item.yieldRate}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.risk === 'LOW' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {item.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 Cols: Pie Chart + Simulator */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pie Chart Card */}
          <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl">
            <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3 mb-4">Allocation Chart</h3>
            
            <div className="h-44 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocations} innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {allocations.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Simulator Card */}
          <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl">
            <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00e5ff]" />
              <span>Capital Deploy Simulator</span>
            </h3>

            <form onSubmit={handleSimulateAllocation} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">Deploy Amount (INR)</label>
                <input 
                  type="number" 
                  value={simulatedFD || ''}
                  onChange={(e) => setSimulatedFD(Number(e.target.value))}
                  placeholder="e.g. 5000000"
                  className="w-full px-3 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-[#00e5ff] hover:bg-[#00ccf0] text-[#080B13] font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Wallet className="w-4 h-4" />
                <span>Simulate Allocation</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
