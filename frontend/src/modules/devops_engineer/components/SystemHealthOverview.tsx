import React from 'react';
import { Server, Container, GitBranch, Shield, DollarSign, Activity, CheckCircle, XCircle } from 'lucide-react';

export const SystemHealthOverview: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">System & Infrastructure Telemetry</h2>
          <p className="text-xs text-slate-400">Real-time status across multi-cloud regions and Kubernetes nodes</p>
        </div>
        <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/10">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          All Systems Operational
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Infrastructure Health */}
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Infrastructure Nodes</h3>
              <p className="text-xs text-slate-400">AWS EC2 & GCP Compute Instances</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-emerald-500/20">
              <p className="text-2xl font-black text-emerald-400">142</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Healthy</p>
            </div>
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-amber-500/20">
              <p className="text-2xl font-black text-amber-400">3</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Warning</p>
            </div>
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-rose-500/20">
              <p className="text-2xl font-black text-rose-400">0</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Critical</p>
            </div>
          </div>
        </div>

        {/* Kubernetes Health */}
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
              <Container className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Kubernetes Fleet</h3>
              <p className="text-xs text-slate-400">Pods, Deployments & Services</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-slate-700">
              <p className="text-2xl font-black text-white">4</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Clusters</p>
            </div>
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-emerald-500/20">
              <p className="text-2xl font-black text-emerald-400">892</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Pods Active</p>
            </div>
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-rose-500/20">
              <p className="text-2xl font-black text-rose-400">4</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Degraded</p>
            </div>
          </div>
        </div>

        {/* CI/CD Status */}
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">CI/CD Pipeline Telemetry</h3>
              <p className="text-xs text-slate-400">Builds & Automated Releases</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-emerald-500/20">
              <p className="text-2xl font-black text-emerald-400">45</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Success</p>
            </div>
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-rose-500/20">
              <p className="text-2xl font-black text-rose-400">2</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Failed</p>
            </div>
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-indigo-500/20">
              <p className="text-2xl font-black text-indigo-400">6</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Deploying</p>
            </div>
          </div>
        </div>

        {/* Security Health */}
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-400 border border-rose-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Security & Governance</h3>
              <p className="text-xs text-slate-400">Vulnerabilities & Policy Scans</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-rose-500/20">
              <p className="text-2xl font-black text-rose-400">0</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Critical High CVEs</p>
            </div>
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-amber-500/20">
              <p className="text-2xl font-black text-amber-400">4</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Low Severity</p>
            </div>
          </div>
        </div>

        {/* Cloud Cost */}
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Cloud Cost Optimization</h3>
              <p className="text-xs text-slate-400">Monthly AWS/GCP Expenditure</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-slate-700">
              <p className="text-2xl font-black text-white">$124.8K</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Month to Date</p>
            </div>
            <div className="bg-[#1E293B]/70 rounded-xl p-3 text-center border border-slate-700">
              <p className="text-2xl font-black text-slate-300">$140.0K</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Budget Limit</p>
            </div>
          </div>
        </div>

        {/* Application Health */}
        <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition-all backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Microservices Health</h3>
              <p className="text-xs text-slate-400">API Gateway & Data Services</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#1E293B]/70 rounded-xl p-3 flex flex-col items-center justify-center border border-emerald-500/20">
              <CheckCircle className="w-5 h-5 text-emerald-400 mb-1" />
              <p className="text-xl font-black text-emerald-400">38 Services</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Healthy</p>
            </div>
            <div className="bg-[#1E293B]/70 rounded-xl p-3 flex flex-col items-center justify-center border border-rose-500/20">
              <XCircle className="w-5 h-5 text-rose-400 mb-1" />
              <p className="text-xl font-black text-rose-400">0 Services</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Down</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
