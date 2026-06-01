import React from 'react';
import { Activity, Cpu, HardDrive, Wifi, ShieldAlert, Bug, Info } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const mockTelemetry = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  cpu: 30 + Math.random() * 40,
  memory: 40 + Math.random() * 30,
  network: 20 + Math.random() * 60,
  errors: Math.floor(Math.random() * 5),
}));

export const MonitoringCenter: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-bold text-white tracking-wide">Monitoring Center</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Cards */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Cpu className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">68%</span>
          </div>
          <p className="text-sm font-bold text-slate-300">Global CPU</p>
          <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><HardDrive className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">82%</span>
          </div>
          <p className="text-sm font-bold text-slate-300">Global Memory</p>
          <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Wifi className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">1.2 GB/s</span>
          </div>
          <p className="text-sm font-bold text-slate-300">Network Traffic</p>
          <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><Activity className="w-4 h-4" /></div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">142 ms</span>
          </div>
          <p className="text-sm font-bold text-slate-300">Avg Latency</p>
          <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Telemetry Charts */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-2xl">
          <h3 className="font-bold text-white mb-4">Live System Telemetry (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTelemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="memory" stroke="#a855f7" fillOpacity={1} fill="url(#colorMem)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Log Analytics Snippet */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col">
          <h3 className="font-bold text-white mb-4">Log Analytics Summary</h3>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-rose-500/10">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span className="text-sm font-bold text-white">Error Logs</span>
              </div>
              <span className="text-lg font-black text-rose-400">14</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-amber-500/10">
              <div className="flex items-center gap-3">
                <Bug className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-white">Warning Logs</span>
              </div>
              <span className="text-lg font-black text-amber-400">89</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-blue-500/10">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold text-white">Info Logs</span>
              </div>
              <span className="text-lg font-black text-blue-400">12.4k</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors">
            View Full Logs (ELK)
          </button>
        </div>
      </div>
    </section>
  );
};
