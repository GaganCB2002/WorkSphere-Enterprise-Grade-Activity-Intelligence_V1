import React from 'react';
import { Server, Cpu, HardDrive, Network } from 'lucide-react';

export const CtoInfrastructure: React.FC = () => {
  const servers = [
    { name: 'prod-db-cluster-01', cpu: 78, mem: 84, disk: 62, net: 450, status: 'warning' },
    { name: 'prod-api-gateway-01', cpu: 42, mem: 55, disk: 20, net: 890, status: 'healthy' },
    { name: 'prod-worker-node-04', cpu: 92, mem: 88, disk: 40, net: 320, status: 'critical' },
    { name: 'prod-redis-cache-02', cpu: 25, mem: 75, disk: 15, net: 150, status: 'healthy' }
  ];

  const getStatusColor = (status: string) => {
    if (status === 'critical') return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
    if (status === 'warning') return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl mb-8">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white">Infrastructure Monitoring</h3>
        <p className="text-slate-400 text-xs mt-1">Real-time resource utilization across critical nodes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {servers.map((server, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border ${getStatusColor(server.status)} transition-all hover:-translate-y-1`}>
            <div className="flex items-center gap-3 mb-4 border-b border-slate-700/50 pb-3">
              <Server className="w-5 h-5" />
              <h4 className="font-bold text-sm truncate">{server.name}</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="flex items-center gap-1 text-slate-300"><Cpu className="w-3 h-3"/> CPU</span>
                  <span>{server.cpu}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full ${server.cpu > 85 ? 'bg-rose-500' : server.cpu > 70 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `₹${server.cpu}%` }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="flex items-center gap-1 text-slate-300"><HardDrive className="w-3 h-3"/> RAM</span>
                  <span>{server.mem}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full ${server.mem > 85 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `₹${server.mem}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
