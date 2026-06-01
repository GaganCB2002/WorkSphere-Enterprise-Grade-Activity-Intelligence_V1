import React from 'react';
import { Activity, Radio, Cpu, Network, Database, ShieldAlert, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';

const liveData = Array.from({ length: 20 }, (_, i) => ({
  time: `${10 + Math.floor(i / 6)}:${(i * 10) % 60 < 10 ? '0' : ''}${(i * 10) % 60}`,
  cpu: 40 + Math.random() * 40,
  memory: 60 + Math.random() * 20,
  network: 20 + Math.random() * 60,
  requests: 1000 + Math.random() * 500
}));

export const LiveTelemetryDashboard: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-xl relative">
            <Radio className="w-6 h-6 text-red-500 relative z-10" />
            <div className="absolute inset-0 bg-red-500/20 rounded-xl animate-ping opacity-50" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-wide">Live Telemetry Grid</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-time cluster synchronization active
            </p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/50">
          <Zap className="w-4 h-4 text-emerald-400" />
          Predictive AI Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Global Traffic', value: '45.2k req/s', icon: Network, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Cluster CPU', value: '62%', icon: Cpu, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'DB Latency', value: '12ms', icon: Database, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Active Threats', value: '0', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
             <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                   <stat.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-400">{stat.label}</h3>
             </div>
             <p className="text-2xl font-black text-white ml-11">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <Activity className="w-5 h-5 text-emerald-400" /> Infrastructure Load (Real-time)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={liveData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="memory" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMem)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <Network className="w-5 h-5 text-blue-400" /> Network Throughput & Requests
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={liveData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="network" stroke="#f59e0b" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
