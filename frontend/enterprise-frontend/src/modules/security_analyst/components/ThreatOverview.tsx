import React from 'react';
import { Skull, Shield, Lock, Eye } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ThreatOverview: React.FC = () => {
  const mockThreatData = [
    { category: 'Brute Force', count: 45 },
    { category: 'IP Geo Anomaly', count: 28 },
    { category: 'Data Exfiltration', count: 15 },
    { category: 'USB Mount', count: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Active Threats', value: '14', icon: Skull, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'Blocked IPs', value: '2,401', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Failed Logins', value: '89', icon: Lock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Audited Sessions', value: '450', icon: Eye, color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
        ].map(stat => (
          <div key={stat.label} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center gap-4 hover:border-slate-600 transition-colors cursor-pointer group">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} border border-white/5 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-[400px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <div className="flex items-center gap-2 text-xs font-bold text-red-500 animate-pulse">
               <div className="w-2 h-2 rounded-full bg-red-500"></div> LIVE
             </div>
          </div>
          <h3 className="font-bold text-white mb-4">Anomaly Frequency</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockThreatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                <Bar dataKey="count" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col overflow-hidden">
          <h3 className="font-bold text-white mb-4">Quarantine Queue</h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between group hover:border-slate-700 transition-colors">
                <div>
                  <div className="font-mono text-xs font-bold text-red-400">IP: 192.168.1.{100 + i}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Multiple Failed MFA / Lateral Movement</div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 hover:bg-emerald-500/30 hover:scale-105 transition-all">
                  Resolve
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
