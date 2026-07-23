// @ts-nocheck
import React from 'react';
import { 
  Activity, Server, GitMerge, AlertTriangle, ShieldCheck, 
  Terminal, BarChart2, Cloud, Database
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';

const latencyData = [
  { time: '10:00', ms: 45 }, { time: '10:05', ms: 48 }, { time: '10:10', ms: 42 },
  { time: '10:15', ms: 120 }, { time: '10:20', ms: 55 }, { time: '10:25', ms: 43 }
];

export const DevOpsMonitor: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-500" /> DevOps & CI/CD Telemetry
          </h1>
          <p className="text-sm text-[#8b949e] mt-1">Live monitoring of deployment pipelines, server health, and API latency.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] text-slate-300 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors border border-[#30363d]">
            <Server className="w-4 h-4" />
            Infrastructure Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Environment Status */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-200">Production (AWS)</h3>
              </div>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </div>
            <div className="space-y-2 text-xs font-mono text-[#8b949e]">
              <div className="flex justify-between"><span>Uptime:</span> <span className="text-emerald-400 font-bold">99.998%</span></div>
              <div className="flex justify-between"><span>Active Nodes:</span> <span className="text-slate-300 font-bold">24 / 24</span></div>
              <div className="flex justify-between"><span>CPU Load:</span> <span className="text-slate-300 font-bold">42%</span></div>
            </div>
          </div>

          <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-200">Staging (K8s)</h3>
              </div>
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
            </div>
            <div className="space-y-2 text-xs font-mono text-[#8b949e]">
              <div className="flex justify-between"><span>Uptime:</span> <span className="text-emerald-400 font-bold">99.50%</span></div>
              <div className="flex justify-between"><span>Active Nodes:</span> <span className="text-amber-400 font-bold">6 / 8</span></div>
              <div className="flex justify-between"><span>CPU Load:</span> <span className="text-slate-300 font-bold">88%</span></div>
            </div>
          </div>

          <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-200">Primary DB Cluster</h3>
              </div>
              <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
            </div>
            <div className="space-y-2 text-xs font-mono text-[#8b949e]">
              <div className="flex justify-between"><span>Read Replicas:</span> <span className="text-slate-300 font-bold">3 Online</span></div>
              <div className="flex justify-between"><span>Query Latency:</span> <span className="text-emerald-400 font-bold">12ms</span></div>
              <div className="flex justify-between"><span>Storage:</span> <span className="text-slate-300 font-bold">64% Used</span></div>
            </div>
          </div>
        </div>

        {/* CI/CD Pipeline Tracking */}
        <div className="md:col-span-2 bg-[#0E1117] border border-[#21262d] rounded-xl p-6">
          <h2 className="text-sm font-bold text-slate-200 mb-6 flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-indigo-500" /> Active CI/CD Deployments
          </h2>
          
          <div className="space-y-6">
            
            <div className="relative">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Deploy v2.4.1 (Hotfix)</h4>
                  <p className="text-xs text-[#8b949e] font-mono mt-1">branch: hotfix/payment-gateway</p>
                </div>
                <span className="text-xs font-bold text-indigo-400 animate-pulse">In Progress (Deploying)</span>
              </div>
              
              <div className="relative flex items-center justify-between mt-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#21262d] rounded-full z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[75%] h-1 bg-indigo-500 rounded-full z-0"></div>
                
                {[
                  { label: 'Build', status: 'done' },
                  { label: 'Test', status: 'done' },
                  { label: 'Security', status: 'done' },
                  { label: 'Deploy', status: 'active' }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 bg-[#0E1117] ${
                      step.status === 'done' ? 'border-indigo-500 text-indigo-500' : 
                      step.status === 'active' ? 'border-indigo-400 text-indigo-400 ring-4 ring-indigo-500/20' : 'border-[#30363d] text-[#30363d]'
                    }`}>
                      {step.status === 'done' ? <ShieldCheck className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    </div>
                    <span className={`text-[10px] font-bold ${step.status === 'done' || step.status === 'active' ? 'text-slate-300' : 'text-[#8b949e]'}`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative pt-6 border-t border-[#21262d]">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Staging Build (Nightly)</h4>
                  <p className="text-xs text-[#8b949e] font-mono mt-1">branch: develop</p>
                </div>
                <span className="text-xs font-bold text-rose-500">Failed (Tests)</span>
              </div>
              
              <div className="relative flex items-center justify-between mt-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#21262d] rounded-full z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[25%] h-1 bg-rose-500 rounded-full z-0"></div>
                
                {[
                  { label: 'Build', status: 'done' },
                  { label: 'Test', status: 'failed' },
                  { label: 'Security', status: 'pending' },
                  { label: 'Deploy', status: 'pending' }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 bg-[#0E1117] ${
                      step.status === 'done' ? 'border-emerald-500 text-emerald-500' : 
                      step.status === 'failed' ? 'border-rose-500 text-rose-500 ring-4 ring-rose-500/20' : 'border-[#30363d] text-[#30363d]'
                    }`}>
                      {step.status === 'failed' ? <AlertTriangle className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                    </div>
                    <span className={`text-[10px] font-bold ${step.status === 'failed' ? 'text-rose-400' : step.status === 'done' ? 'text-slate-300' : 'text-[#8b949e]'}`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Real-time API Latency */}
        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-6">
          <h2 className="text-sm font-bold text-slate-200 mb-6 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-emerald-500" /> API Gateway Latency (ms)
          </h2>
          <div className="h-48 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
                <XAxis dataKey="time" stroke="#8b949e" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#8b949e" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0E1117', borderColor: '#30363d', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="ms" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#0E1117', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-1"><AlertTriangle className="w-3 h-3" /> Latency Spike Detected</span>
            <span className="text-slate-300 leading-snug block">At 10:15 AM, the `/v1/auth/verify` endpoint experienced a 120ms spike. Auto-scaled 2 new authentication pods.</span>
          </div>
        </div>

      </div>
    </div>
  );
};

