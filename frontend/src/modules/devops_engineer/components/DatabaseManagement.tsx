import React from 'react';
import { Database, Server, Clock, HardDrive, RefreshCcw } from 'lucide-react';

const mockDatabases = [
  { name: 'Primary PostgreSQL', type: 'PostgreSQL', connections: 245, queryTime: '12ms', storage: '450GB / 1TB', replStatus: 'Synced', health: 'Healthy' },
  { name: 'Analytics MySQL', type: 'MySQL', connections: 89, queryTime: '45ms', storage: '2.1TB / 5TB', replStatus: 'Lagging (12s)', health: 'Warning' },
  { name: 'Session Redis', type: 'Redis', connections: 1250, queryTime: '1ms', storage: '12GB / 32GB', replStatus: 'Synced', health: 'Healthy' },
  { name: 'Document MongoDB', type: 'MongoDB', connections: 412, queryTime: '28ms', storage: '1.8TB / 2TB', replStatus: 'Synced', health: 'Warning' },
];

export const DatabaseManagement: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Database className="w-5 h-5 text-indigo-400" />
        <h2 className="text-xl font-bold text-white tracking-wide">Database Management</h2>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white">Database Health & Metrics</h3>
          <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors">
            Configure Backups
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="p-3">Database Instance</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-center">Connections</th>
                <th className="p-3 text-center">Avg Query Time</th>
                <th className="p-3 text-center">Storage Usage</th>
                <th className="p-3 text-center">Replication</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockDatabases.map((db, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-bold text-white text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${db.health === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      {db.name}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded font-mono text-xs">{db.type}</span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-400">
                      <Server className="w-3.5 h-3.5" /> {db.connections}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className={`flex items-center justify-center gap-1.5 text-xs font-bold ${db.health === 'Healthy' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      <Clock className="w-3.5 h-3.5" /> {db.queryTime}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-xs font-bold text-slate-300">{db.storage}</span>
                      <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${db.health === 'Healthy' ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      db.replStatus === 'Synced' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      <RefreshCcw className={`w-3 h-3 ${db.replStatus === 'Synced' ? '' : 'animate-spin'}`} /> {db.replStatus}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
