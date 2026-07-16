import React from 'react';
import { Shield, Key, FileCheck, ShieldAlert, CheckCircle, RefreshCcw } from 'lucide-react';

const mockVulnerabilities = [
  { id: 'CVE-2023-4528', severity: 'Critical', package: 'openssl', version: '1.1.1t-r0', status: 'Open' },
  { id: 'CVE-2024-1142', severity: 'High', package: 'express', version: '4.18.2', status: 'Patching' },
  { id: 'CVE-2024-0012', severity: 'Medium', package: 'lodash', version: '4.17.20', status: 'Open' },
];

const mockSecrets = [
  { name: 'aws-production-keys', type: 'API Key', lastRotated: '2 days ago', status: 'Valid' },
  { name: 'stripe-webhook-secret', type: 'Token', lastRotated: '89 days ago', status: 'Needs Rotation' },
  { name: 'internal-tls-cert', type: 'Certificate', lastRotated: '14 months ago', status: 'Expiring Soon' },
];

export const SecurityOperationsCenter: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-rose-400" />
        <h2 className="text-xl font-bold text-white tracking-wide">Security Operations Center</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Compliance Status */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Compliance Status</h3>
            <FileCheck className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
              <span className="text-sm font-bold text-white">SOC 2 Type II</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
              <span className="text-sm font-bold text-white">ISO 27001</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
              <span className="text-sm font-bold text-white">GDPR</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Vulnerabilities Summary */}
        <div className="md:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Active Vulnerabilities</h3>
            <ShieldAlert className="w-4 h-4 text-slate-400" />
          </div>
          
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="bg-slate-950 rounded-xl p-3 text-center border border-rose-500/20">
              <span className="block text-2xl font-black text-rose-400">1</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Critical</span>
            </div>
            <div className="bg-slate-950 rounded-xl p-3 text-center border border-amber-500/20">
              <span className="block text-2xl font-black text-amber-400">4</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">High</span>
            </div>
            <div className="bg-slate-950 rounded-xl p-3 text-center border border-blue-500/20">
              <span className="block text-2xl font-black text-blue-400">12</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Medium</span>
            </div>
            <div className="bg-slate-950 rounded-xl p-3 text-center border border-slate-700">
              <span className="block text-2xl font-black text-slate-300">28</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Low</span>
            </div>
          </div>

          <button className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold rounded-xl transition-colors">
            Run Security Scan (Trivy)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Vulnerability List */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 overflow-hidden">
          <h3 className="font-bold text-white mb-4">Highest Priority Issues</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="p-3">CVE ID</th>
                  <th className="p-3">Severity</th>
                  <th className="p-3">Package / Version</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {mockVulnerabilities.map((vuln) => (
                  <tr key={vuln.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-white text-xs">{vuln.id}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                        vuln.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400' :
                        vuln.severity === 'High' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {vuln.severity}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-slate-400">{vuln.package} <span className="text-slate-500">v{vuln.version}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Secrets Management */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Secrets Management (Vault)</h3>
            <Key className="w-4 h-4 text-slate-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="p-3">Secret Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {mockSecrets.map((secret, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-white text-xs">{secret.name}</td>
                    <td className="p-3 text-xs text-slate-400">{secret.type}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                        secret.status === 'Valid' ? 'bg-emerald-500/20 text-emerald-400' :
                        secret.status === 'Needs Rotation' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-rose-500/20 text-rose-400'
                      }`}>
                        {secret.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded transition-colors" title="Rotate Secret">
                        <RefreshCcw className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
