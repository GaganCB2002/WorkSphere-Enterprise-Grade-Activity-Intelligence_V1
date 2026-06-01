import React from 'react';
import { Server, Power, RefreshCw, Terminal, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

const mockServers = [
  { id: 'srv-prod-eu-1', env: 'Production', cpu: 42, memory: 64, disk: 38, status: 'Healthy' },
  { id: 'srv-prod-eu-2', env: 'Production', cpu: 78, memory: 82, disk: 55, status: 'Healthy' },
  { id: 'srv-stage-us-1', env: 'Staging', cpu: 92, memory: 95, disk: 89, status: 'Warning' },
  { id: 'srv-test-ap-1', env: 'Testing', cpu: 12, memory: 24, disk: 15, status: 'Healthy' },
  { id: 'db-prod-main', env: 'Production', cpu: 65, memory: 45, disk: 92, status: 'Critical' },
];

export const InfrastructureOverview: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Server className="w-5 h-5 text-slate-400" />
        <h2 className="text-xl font-bold text-white tracking-wide">Infrastructure Overview</h2>
      </div>
      
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Server Inventory</h3>
            <p className="text-slate-400 text-xs mt-1">Real-time resource utilization and remote management</p>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors">
            Provision New Server
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Server Name</th>
                <th className="p-4">Environment</th>
                <th className="p-4">CPU Usage</th>
                <th className="p-4">Memory</th>
                <th className="p-4">Disk Usage</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockServers.map((server) => (
                <tr key={server.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-white text-sm">{server.id}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                      {server.env}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden w-24">
                        <div 
                          className={`h-full rounded-full ${server.cpu > 85 ? 'bg-rose-500' : server.cpu > 70 ? 'bg-amber-500' : 'bg-blue-500'}`}
                          style={{ width: `${server.cpu}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-300 w-8">{server.cpu}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden w-24">
                        <div 
                          className={`h-full rounded-full ${server.memory > 85 ? 'bg-rose-500' : server.memory > 70 ? 'bg-amber-500' : 'bg-purple-500'}`}
                          style={{ width: `${server.memory}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-300 w-8">{server.memory}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden w-24">
                        <div 
                          className={`h-full rounded-full ${server.disk > 90 ? 'bg-rose-500' : server.disk > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${server.disk}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-300 w-8">{server.disk}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      server.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      server.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {server.status === 'Healthy' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {server.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded transition-colors" title="Restart">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded transition-colors" title="Shutdown">
                        <Power className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors" title="SSH Access">
                        <Terminal className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-purple-400/10 rounded transition-colors" title="View Logs">
                        <FileText className="w-4 h-4" />
                      </button>
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
