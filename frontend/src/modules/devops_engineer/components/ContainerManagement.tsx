import React from 'react';
import { Container, PackageSearch, Boxes, Play, Square, RotateCw, Trash2, Cpu, HardDrive } from 'lucide-react';

const mockContainers = [
  { id: '1a2b3c4d', name: 'auth-service', image: 'nexus.corp/auth:v2.1', status: 'Running', cpu: '12%', mem: '128MB', uptime: '14d 5h' },
  { id: '5e6f7g8h', name: 'payment-gateway', image: 'nexus.corp/pay:v4.0', status: 'Running', cpu: '45%', mem: '512MB', uptime: '2d 12h' },
  { id: '9i0j1k2l', name: 'worker-node-1', image: 'nexus.corp/worker:latest', status: 'Stopped', cpu: '0%', mem: '0MB', uptime: '-' },
  { id: '3m4n5o6p', name: 'redis-cache', image: 'redis:alpine', status: 'Running', cpu: '5%', mem: '1.2GB', uptime: '45d 2h' },
  { id: '7q8r9s0t', name: 'frontend-nginx', image: 'nginx:latest', status: 'Running', cpu: '2%', mem: '64MB', uptime: '14d 5h' },
];

export const ContainerManagement: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Boxes className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-wide">Container Workloads</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">Standalone container orchestration and registry management</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 flex items-center gap-2">
            <PackageSearch className="w-4 h-4 text-slate-400" />
            Registry
          </button>
          <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2">
            <Container className="w-4 h-4" />
            Launch Container
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Containers', value: '1,248', change: '+12 this week', icon: Boxes, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Running', value: '1,102', change: '88% of total', icon: Play, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Avg CPU Load', value: '42%', change: 'Normal range', icon: Cpu, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Total Memory Allocation', value: '2.4 TB', change: '80% utilization', icon: HardDrive, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-2xl font-black text-white">{stat.value}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Container List Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-lg font-bold text-white">Active Containers</h3>
          <input 
            type="text" 
            placeholder="Search by name, image, or ID..." 
            className="w-64 bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Container ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Image</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4">CPU / Memory</th>
                <th className="p-4">Uptime</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockContainers.map((container, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6 font-mono font-bold text-slate-300 text-xs">{container.id}</td>
                  <td className="p-4 font-bold text-white text-sm">{container.name}</td>
                  <td className="p-4">
                    <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
                      {container.image}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      container.status === 'Running' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      'bg-slate-800/50 text-slate-400 border border-slate-700'
                    }`}>
                      {container.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="w-8 text-[10px] text-slate-500 font-bold">CPU</span>
                        <div className="flex-1 h-1 rounded-full bg-slate-800 overflow-hidden w-16">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: container.cpu === '0%' ? '0%' : container.cpu }} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 w-6">{container.cpu}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-8 text-[10px] text-slate-500 font-bold">MEM</span>
                        <div className="flex-1 h-1 rounded-full bg-slate-800 overflow-hidden w-16">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: container.mem === '0MB' ? '0%' : '30%' }} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 w-8">{container.mem}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-400">{container.uptime}</td>
                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-end gap-1">
                      {container.status === 'Running' ? (
                        <button className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors" title="Stop">
                          <Square className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors" title="Start">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title="Restart">
                        <RotateCw className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
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
