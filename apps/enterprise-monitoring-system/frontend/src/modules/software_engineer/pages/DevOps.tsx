import React from 'react';
import { Activity, Server, ArrowRight, CheckCircle2, XCircle, Clock, Database, Globe } from 'lucide-react';

const mockPipelines = [
  { id: 'PIPE-891', repo: 'backend-core', branch: 'main', status: 'RUNNING', stage: 'Integration Tests', duration: '4m 12s', trigger: 'Merge #401' },
  { id: 'PIPE-890', repo: 'frontend-app', branch: 'feat/kanban', status: 'SUCCESS', stage: 'Deploy Staging', duration: '8m 45s', trigger: 'Commit a1b2c3d' },
  { id: 'PIPE-889', repo: 'auth-service', branch: 'main', status: 'FAILED', stage: 'Docker Build', duration: '1m 20s', trigger: 'Merge #398' },
];

export const DevOps: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#e6edf3]">DevOps & CI/CD</h1>
        <p className="text-sm text-[#8b949e] mt-1">Monitor deployment pipelines, server health, and production environments.</p>
      </div>

      {/* Environment Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-[#e6edf3]">Production (US-East)</h3>
            </div>
            <span className="px-2 py-1 rounded-md text-xs font-bold bg-[#238636]/10 text-[#2ea043] border border-[#238636]/20">Healthy</span>
          </div>
          <div className="space-y-3 text-sm text-[#8b949e]">
            <div className="flex justify-between"><span>Uptime</span><span className="text-[#e6edf3]">99.99%</span></div>
            <div className="flex justify-between"><span>Active Nodes</span><span className="text-[#e6edf3]">12 / 12</span></div>
            <div className="flex justify-between"><span>Last Deploy</span><span className="text-[#e6edf3]">v2.4.1 (3h ago)</span></div>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-[#e6edf3]">Staging (EU-West)</h3>
            </div>
            <span className="px-2 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Scaling</span>
          </div>
          <div className="space-y-3 text-sm text-[#8b949e]">
            <div className="flex justify-between"><span>Uptime</span><span className="text-[#e6edf3]">99.95%</span></div>
            <div className="flex justify-between"><span>Active Nodes</span><span className="text-amber-400 font-medium">3 / 6</span></div>
            <div className="flex justify-between"><span>Last Deploy</span><span className="text-[#e6edf3]">v2.4.2-rc1 (10m ago)</span></div>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-[#e6edf3]">Core Database (Primary)</h3>
            </div>
            <span className="px-2 py-1 rounded-md text-xs font-bold bg-[#238636]/10 text-[#2ea043] border border-[#238636]/20">Healthy</span>
          </div>
          <div className="space-y-3 text-sm text-[#8b949e]">
            <div className="flex justify-between"><span>CPU Load</span><span className="text-[#e6edf3]">14%</span></div>
            <div className="flex justify-between"><span>Active Conns</span><span className="text-[#e6edf3]">4,210</span></div>
            <div className="flex justify-between"><span>Replication Lag</span><span className="text-[#e6edf3]">12ms</span></div>
          </div>
        </div>
      </div>

      {/* Active Pipelines */}
      <div className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]">
          <div className="flex items-center gap-2 font-semibold text-[#e6edf3]">
            <Activity className="w-5 h-5 text-blue-400" />
            Active CI/CD Pipelines
          </div>
          <button className="text-sm text-[#58a6ff] hover:underline font-medium">View All History</button>
        </div>
        
        <div className="divide-y divide-[#21262d]">
          {mockPipelines.map(pipe => (
            <div key={pipe.id} className="p-5 flex items-center justify-between hover:bg-[#161b22]/50 transition-colors">
              <div className="flex items-center gap-4 w-1/3">
                {pipe.status === 'SUCCESS' ? <CheckCircle2 className="w-6 h-6 text-[#2ea043]" /> :
                 pipe.status === 'FAILED' ? <XCircle className="w-6 h-6 text-[#f85149]" /> :
                 <Clock className="w-6 h-6 text-[#d29922] animate-pulse" />}
                <div>
                  <div className="font-bold text-[#e6edf3] text-sm flex items-center gap-2">
                    {pipe.repo} <ArrowRight className="w-3 h-3 text-[#8b949e]" /> <span className="text-[#58a6ff] font-mono text-xs">{pipe.branch}</span>
                  </div>
                  <div className="text-xs text-[#8b949e] mt-1 flex items-center gap-2">
                    <span className="font-mono">{pipe.id}</span>
                    <span>•</span>
                    <span>{pipe.trigger}</span>
                  </div>
                </div>
              </div>

              {/* Pipeline Stages Visualizer */}
              <div className="flex-1 flex items-center justify-center gap-2 px-4">
                {['Build', 'Test', 'Deploy'].map((s, i) => {
                  const isCurrent = s === pipe.stage.split(' ')[0] || (s === 'Deploy' && pipe.stage.includes('Deploy'));
                  const isDone = pipe.status === 'SUCCESS' || (pipe.status === 'RUNNING' && i === 0); 
                  const isFailed = pipe.status === 'FAILED' && isCurrent;
                  
                  return (
                    <React.Fragment key={s}>
                      <div className={`px-3 py-1 text-xs font-bold rounded-full border ${
                        isFailed ? 'bg-[#f85149]/10 text-[#f85149] border-[#f85149]/20' :
                        isDone ? 'bg-[#238636]/10 text-[#2ea043] border-[#238636]/20' :
                        isCurrent ? 'bg-[#d29922]/10 text-[#d29922] border-[#d29922]/20' :
                        'bg-[#21262d] text-[#8b949e] border-[#30363d]'
                      }`}>
                        {s}
                      </div>
                      {i < 2 && <div className={`h-[2px] w-8 rounded-full ${isDone && !isFailed ? 'bg-[#2ea043]' : 'bg-[#30363d]'}`} />}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="w-1/4 flex justify-end items-center gap-4">
                <span className="text-sm font-mono text-[#8b949e]">{pipe.duration}</span>
                <button className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs font-medium text-[#c9d1d9] rounded-md transition-colors">
                  View Logs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
