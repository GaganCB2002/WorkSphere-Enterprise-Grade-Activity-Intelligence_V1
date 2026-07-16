import React from 'react';
import { Shield, Users, Database, Globe, Key, ArrowRight, Lock } from 'lucide-react';

export const ZeroTrustPolicyEngine: React.FC = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2"><Lock className="w-5 h-5 text-cyan-400" /> Zero Trust Architecture</h3>
          <p className="text-slate-400 text-sm mt-1">Identity-Aware Proxy and Lateral Movement Prevention Engine.</p>
        </div>
        <button className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-sm rounded-lg transition-colors shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          Deploy New Policy
        </button>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <h3 className="font-bold text-white mb-6">Live Access Graph</h3>
          
          <div className="flex-1 flex items-center justify-center relative">
            {/* Visual Graph Representation */}
            <div className="flex items-center gap-8 w-full px-12 justify-between relative z-10">
              
              {/* Identity Node */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center relative shadow-lg shadow-slate-900/50">
                  <Users className="w-8 h-8 text-slate-300" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm text-white">DevOps Team</div>
                  <div className="text-xs text-slate-500">MFA Verified</div>
                </div>
              </div>

              {/* Edge */}
              <div className="flex-1 h-0.5 bg-slate-700 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-slate-950 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <Key className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400">ALLOW</span>
                </div>
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-slate-600" />
              </div>

              {/* Resource Node */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-lg shadow-slate-900/50">
                  <Database className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm text-white">Prod Cluster</div>
                  <div className="text-xs text-slate-500">k8s-main-eu</div>
                </div>
              </div>

              {/* Edge Blocked */}
              <div className="flex-1 h-0.5 bg-slate-700 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-slate-950 border border-red-500/30 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  <Shield className="w-3 h-3 text-red-400" />
                  <span className="text-[10px] font-bold text-red-400">DENY</span>
                </div>
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-red-500" />
                <div className="absolute inset-0 bg-red-500/20 animate-pulse"></div>
              </div>

              {/* Forbidden Resource */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/50 flex items-center justify-center relative shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  <Globe className="w-8 h-8 text-red-400" />
                  <div className="absolute -inset-2 border border-red-500/30 rounded-full animate-ping"></div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm text-white">Public Internet</div>
                  <div className="text-xs text-red-400">Data Exfil Blocked</div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-white mb-4">Active Rule Constraints</h3>
          <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
            {[
              { rule: 'Block Prod DB to Public', status: 'Enforcing', count: '142 blocked today' },
              { rule: 'Require YubiKey for Prod SSH', status: 'Enforcing', count: '89 authentications' },
              { rule: 'Isolate Infected Workstations', status: 'Dynamic', count: '2 currently isolated' },
              { rule: 'Geo-Fence Admin Logins (US/EU)', status: 'Enforcing', count: '12 blocked today' },
            ].map((r, i) => (
              <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
                <div className="font-bold text-sm text-white mb-1">{r.rule}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400">{r.status}</span>
                  <span className="text-slate-500">{r.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
