import React from 'react';
import { Cloud, Server, Database, Globe, ArrowUpRight, ArrowDownRight, ShieldCheck, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const cloudCostData = [
  { name: 'AWS', cost: 4200, resources: 145 },
  { name: 'Azure', cost: 2800, resources: 84 },
  { name: 'GCP', cost: 1500, resources: 42 },
];

export const CloudManagementDashboard: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Cloud className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-wide">Multi-Cloud Operations</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">Cross-provider resource inventory and status</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Deploy Resource
        </button>
      </div>

      {/* Cloud Provider Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { provider: 'Amazon Web Services', providerShort: 'AWS', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-500/20', instances: 84, db: 12, storage: '124 TB', status: 'Optimal' },
          { provider: 'Microsoft Azure', providerShort: 'Azure', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-500/20', instances: 56, db: 8, storage: '86 TB', status: 'Optimal' },
          { provider: 'Google Cloud Platform', providerShort: 'GCP', color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-500/20', instances: 24, db: 4, storage: '32 TB', status: 'Warning' },
        ].map((cloud) => (
          <div key={cloud.provider} className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${cloud.color.split('-')[1]}-500/10 to-transparent rounded-bl-full`} />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{cloud.provider}</h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cloud.bg} ${cloud.color} ${cloud.border} border`}>
                  <ShieldCheck className="w-3 h-3" /> {cloud.status}
                </span>
              </div>
              <div className={`p-3 rounded-2xl ${cloud.bg} ${cloud.color}`}>
                <Cloud className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800/50 text-center">
                <Server className="w-4 h-4 text-slate-400 mx-auto mb-2" />
                <div className="text-xl font-black text-white">{cloud.instances}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">Compute</div>
              </div>
              <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800/50 text-center">
                <Database className="w-4 h-4 text-slate-400 mx-auto mb-2" />
                <div className="text-xl font-black text-white">{cloud.db}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">Databases</div>
              </div>
              <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800/50 text-center">
                <Globe className="w-4 h-4 text-slate-400 mx-auto mb-2" />
                <div className="text-xl font-black text-white">{cloud.storage}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">Storage</div>
              </div>
            </div>
            
            <button className="w-full py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-xl font-bold text-sm transition-colors border border-slate-700/50">
              Manage {cloud.providerShort} Environment
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Allocation Chart */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Cloud Spend Allocation (MTD)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cloudCostData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 'bold' }} width={60} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  formatter={(value: number) => [`$${value}`, 'Monthly Cost']}
                />
                <Bar dataKey="cost" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Network Map Placeholder */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Global Routing Topology</h3>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">All Regions Online</span>
          </div>
          <div className="flex-1 bg-slate-950/50 rounded-2xl border border-slate-800/50 relative overflow-hidden flex items-center justify-center">
            {/* Abstract World Map Graphic representation */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/30 via-slate-900 to-transparent pointer-events-none"></div>
            <div className="text-center z-10">
              <Globe className="w-16 h-16 text-slate-700 mx-auto mb-4 animate-pulse duration-3000" />
              <p className="text-slate-500 font-mono text-sm">Waiting for real-time telemetry rendering...</p>
              <div className="mt-6 flex justify-center gap-4">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-xs text-slate-400">US-East</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-xs text-slate-400">EU-West</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div><span className="text-xs text-slate-400">AP-South</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
