import React from 'react';
import { Container, Activity, Box, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const mockPods = [
  { name: 'auth-service-78f9c', namespace: 'production', cpu: '34%', memory: '512Mi', status: 'Running', restarts: 0 },
  { name: 'monitoring-service-42b1', namespace: 'production', cpu: '78%', memory: '1.4Gi', status: 'Running', restarts: 2 },
  { name: 'payment-gateway-99x', namespace: 'production', cpu: '15%', memory: '256Mi', status: 'Pending', restarts: 0 },
  { name: 'ai-inference-lstm-55y', namespace: 'production', cpu: '98%', memory: '4.2Gi', status: 'Failed', restarts: 12 },
  { name: 'redis-cache-main-0', namespace: 'production', cpu: '45%', memory: '2.1Gi', status: 'Running', restarts: 0 },
];

export const KubernetesCommandCenter: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Container className="w-5 h-5 text-indigo-400" />
        <h2 className="text-xl font-bold text-white tracking-wide">Kubernetes Command Center</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Cluster Summary */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <h3 className="font-bold text-white mb-4">Cluster Summary</h3>
          <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 mb-2">
            <span className="text-sm text-slate-400 font-medium">Total Clusters</span>
            <span className="text-lg font-black text-white">4</span>
          </div>
          <div className="flex justify-between items-center bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 mb-2">
            <span className="text-sm text-emerald-400 font-medium">Running</span>
            <span className="text-lg font-black text-emerald-400">4</span>
          </div>
          <div className="flex justify-between items-center bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
            <span className="text-sm text-rose-400 font-medium">Failed</span>
            <span className="text-lg font-black text-rose-400">0</span>
          </div>
        </div>

        {/* Node Metrics */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <h3 className="font-bold text-white mb-4">Aggregate Node Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-slate-400 font-bold uppercase">CPU Usage</span>
                <span className="text-xs text-blue-400 font-bold">68%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Memory Usage</span>
                <span className="text-xs text-purple-400 font-bold">82%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Disk Usage</span>
                <span className="text-xs text-emerald-400 font-bold">45%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Status */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-lg">
          <h3 className="font-bold text-white mb-4">Deployment Status</h3>
          <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)]">
            <div className="bg-emerald-500/5 rounded-xl border border-emerald-500/10 flex flex-col items-center justify-center p-4">
              <CheckCircle className="w-8 h-8 text-emerald-400 mb-2" />
              <span className="text-3xl font-black text-emerald-400">142</span>
              <span className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-wider mt-1">Successful</span>
            </div>
            <div className="bg-rose-500/5 rounded-xl border border-rose-500/10 flex flex-col items-center justify-center p-4">
              <AlertCircle className="w-8 h-8 text-rose-400 mb-2" />
              <span className="text-3xl font-black text-rose-400">3</span>
              <span className="text-[10px] text-rose-500/70 font-bold uppercase tracking-wider mt-1">Failed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Pod Status</h3>
            <p className="text-slate-400 text-xs mt-1">Real-time tracking of individual pod health and resource usage</p>
          </div>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Pod Name</th>
                <th className="p-4">Namespace</th>
                <th className="p-4 text-center">CPU</th>
                <th className="p-4 text-center">Memory</th>
                <th className="p-4 text-center">Restarts</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockPods.map((pod, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-white text-xs">{pod.name}</td>
                  <td className="p-4 text-slate-400 text-xs">{pod.namespace}</td>
                  <td className="p-4 text-center font-bold text-blue-400 text-xs">{pod.cpu}</td>
                  <td className="p-4 text-center font-bold text-purple-400 text-xs">{pod.memory}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded bg-slate-950 border text-xs font-bold ${pod.restarts > 5 ? 'border-rose-500/30 text-rose-400' : 'border-slate-700 text-slate-300'}`}>
                      {pod.restarts}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      pod.status === 'Running' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      pod.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {pod.status === 'Running' ? <CheckCircle className="w-3 h-3" /> : 
                       pod.status === 'Pending' ? <Activity className="w-3 h-3 animate-spin" /> : 
                       <AlertCircle className="w-3 h-3" />}
                      {pod.status}
                    </span>
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
