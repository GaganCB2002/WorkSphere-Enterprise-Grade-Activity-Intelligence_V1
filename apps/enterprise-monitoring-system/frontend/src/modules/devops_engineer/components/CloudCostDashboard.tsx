import React from 'react';
import { IndianRupee, Cloud, TrendingDown, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockCostData = [
  { provider: 'AWS', compute: 45000, storage: 12000, network: 8000, db: 25000 },
  { provider: 'Azure', compute: 28000, storage: 9000, network: 5000, db: 18000 },
  { provider: 'GCP', compute: 15000, storage: 6000, network: 3000, db: 12000 },
];

export const CloudCostDashboard: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <IndianRupee className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xl font-bold text-white tracking-wide">Multi-Cloud Cost Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-slate-300">AWS (Current Month)</h3>
            <Cloud className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-black text-white">₹90.0K</p>
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-400">
            <TrendingDown className="w-3 h-3" /> 2.4% vs last month
          </div>
        </div>
        
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-slate-300">Azure (Current Month)</h3>
            <Cloud className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white">₹60.0K</p>
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-rose-400">
            <TrendingUp className="w-3 h-3" /> 4.1% vs last month
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-slate-300">GCP (Current Month)</h3>
            <Cloud className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-2xl font-black text-white">₹36.0K</p>
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-400">
            <TrendingDown className="w-3 h-3" /> 1.2% vs last month
          </div>
        </div>

        <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-5 shadow-lg flex flex-col justify-center text-center">
          <h3 className="font-bold text-emerald-400 mb-1">Total Forecast</h3>
          <p className="text-3xl font-black text-emerald-400">₹186.0K</p>
          <p className="text-xs font-bold text-emerald-500/70 mt-1 uppercase tracking-widest">End of Month</p>
        </div>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-2xl">
        <h3 className="font-bold text-white mb-4">Cost Breakdown by Resource (₹)</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockCostData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="provider" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 14, fontWeight: 'bold' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#1e293b', opacity: 0.4 }}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
              <Bar dataKey="compute" stackId="a" name="Compute (EC2/VM)" fill="#3b82f6" radius={[0, 0, 4, 4]} />
              <Bar dataKey="db" stackId="a" name="Database (RDS/SQL)" fill="#a855f7" />
              <Bar dataKey="storage" stackId="a" name="Storage (S3/Blob)" fill="#f59e0b" />
              <Bar dataKey="network" stackId="a" name="Networking" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
