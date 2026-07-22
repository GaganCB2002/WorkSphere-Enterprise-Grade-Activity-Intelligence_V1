import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Shield, Smartphone, Mail, Key, Copy, Check } from 'lucide-react';

const recoveryCodes = ['A1B2-C3D4-E5F6', 'G7H8-I9J0-K1L2', 'M3N4-O5P6-Q7R8', 'S9T0-U1V2-W3X4', 'Y5Z6-AB7C-DE8F'];

export default function TwoFactorAuthentication() {
  const [enabled, setEnabled] = useState(true);
  const [method, setMethod] = useState('authenticator');
  const [copied, setCopied] = useState(false);
  const copyCodes = () => { navigator.clipboard?.writeText(recoveryCodes.join('\n')); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <EmployeePageLayout title="Two Factor Authentication" description="Manage your two-factor authentication settings and recovery codes" breadcrumbs={['Employee', 'Settings', 'Two Factor Authentication']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">2FA Status</h3>
              <p className="text-[10px] text-slate-400">Protect your account with an extra layer of security</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Enabled</span>
            <button onClick={() => setEnabled(!enabled)} className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Verification Method</label>
            <div className="space-y-2">
              {[
                { id: 'authenticator', label: 'Authenticator App', icon: Smartphone },
                { id: 'sms', label: 'SMS', icon: Mail },
                { id: 'email', label: 'Email', icon: Mail },
              ].map(m => (
                <button key={m.id} onClick={() => setMethod(m.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-xs transition-all ${method === m.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' : 'border-slate-200/60 dark:border-white/[0.04] text-slate-500'}`}>
                  <m.icon className="w-4 h-4" />
                  <span className="font-semibold">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </GlassPanel>
        <GlassPanel className="p-6">
          <div className="flex items-center gap-2 mb-4"><Key className="w-4 h-4 text-slate-400" /><h3 className="text-xs font-bold text-slate-900 dark:text-white">Recovery Codes</h3></div>
          <p className="text-[10px] text-slate-400 mb-3">Store these one-time use codes in a safe place.</p>
          <div className="space-y-1.5 mb-4">
            {recoveryCodes.map((code, i) => (
              <div key={i} className="font-mono text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-200/40 dark:border-white/[0.03]">{code}</div>
            ))}
          </div>
          <button onClick={copyCodes} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {copied ? <><Check className="w-3.5 h-3.5 text-emerald-500" />Copied</> : <><Copy className="w-3.5 h-3.5" />Copy Codes</>}
          </button>
        </GlassPanel>
      </div>
    </EmployeePageLayout>
  );
}
