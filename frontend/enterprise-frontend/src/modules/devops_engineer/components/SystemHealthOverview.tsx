import React from 'react';
import { Server, Container, GitBranch, Shield, IndianRupee, Activity, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export const SystemHealthOverview: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-wide">System Health Overview</h2>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          All Systems Operational
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Infrastructure Health */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white">Infrastructure</h3>
              <p className="text-xs text-slate-400">Physical & Virtual Nodes</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-emerald-500/10">
              <p className="text-2xl font-black text-emerald-400">142</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Healthy</p>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-amber-500/10">
              <p className="text-2xl font-black text-amber-400">3</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Warning</p>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-rose-500/10">
              <p className="text-2xl font-black text-rose-400">0</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Critical</p>
            </div>
          </div>
        </div>

        {/* Kubernetes Health */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
              <Container className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white">Kubernetes</h3>
              <p className="text-xs text-slate-400">Clusters & Workloads</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-slate-800">
              <p className="text-2xl font-black text-white">4</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Clusters</p>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-emerald-500/10">
              <p className="text-2xl font-black text-emerald-400">892</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Pods Run</p>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-rose-500/10">
              <p className="text-2xl font-black text-rose-400">12</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Pods Fail</p>
            </div>
          </div>
        </div>

        {/* CI/CD Status */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white">CI/CD Pipeline</h3>
              <p className="text-xs text-slate-400">Builds & Deployments</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-emerald-500/10">
              <p className="text-2xl font-black text-emerald-400">45</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Success</p>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-rose-500/10">
              <p className="text-2xl font-black text-rose-400">2</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Failed</p>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-blue-500/10">
              <p className="text-2xl font-black text-blue-400">6</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Deploying</p>
            </div>
          </div>
        </div>

        {/* Security Health */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white">Security Health</h3>
              <p className="text-xs text-slate-400">Vulnerabilities & Audits</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-rose-500/20">
              <p className="text-2xl font-black text-rose-400">3</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Critical Issues</p>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-amber-500/20">
              <p className="text-2xl font-black text-amber-400">14</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Open Vulns</p>
            </div>
          </div>
        </div>

        {/* Cloud Cost */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white">Cloud Cost</h3>
              <p className="text-xs text-slate-400">Current & Projected</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-slate-800">
              <p className="text-2xl font-black text-white">₹84.2K</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Month to Date</p>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 text-center border border-slate-800">
              <p className="text-2xl font-black text-slate-300">₹112K</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Forecast</p>
            </div>
          </div>
        </div>

        {/* Application Health */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white">App Services</h3>
              <p className="text-xs text-slate-400">Microservices Status</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-950 rounded-lg p-3 flex flex-col items-center justify-center border border-emerald-500/10">
              <CheckCircle className="w-6 h-6 text-emerald-400 mb-1" />
              <p className="text-xl font-black text-emerald-400">38</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Healthy</p>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 flex flex-col items-center justify-center border border-rose-500/10">
              <XCircle className="w-6 h-6 text-rose-400 mb-1" />
              <p className="text-xl font-black text-rose-400">1</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Failed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
