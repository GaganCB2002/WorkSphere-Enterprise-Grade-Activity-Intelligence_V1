import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { AutoStatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Shield, LogIn, Monitor, History, Smartphone, Laptop } from 'lucide-react';

const sessions = [
  { device: 'Chrome on Windows', ip: '192.168.1.42', lastActive: '2 minutes ago', current: true },
  { device: 'Safari on iPhone', ip: '10.0.0.5', lastActive: '1 hour ago', current: false },
  { device: 'Firefox on MacOS', ip: '172.16.0.10', lastActive: '3 days ago', current: false },
];

const loginHistory = [
  { date: '2026-07-15 09:23', ip: '192.168.1.42', device: 'Chrome / Windows', success: true },
  { date: '2026-07-14 18:45', ip: '10.0.0.5', device: 'Safari / iOS', success: true },
  { date: '2026-07-13 22:10', ip: '203.0.113.5', device: 'Chrome / Android', success: false },
  { date: '2026-07-12 08:00', ip: '192.168.1.42', device: 'Chrome / Windows', success: true },
];

export default function Security() {
  const [twoFA, setTwoFA] = useState(true);
  return (
    <EmployeePageLayout title="Security" description="Monitor your account security and active sessions" breadcrumbs={['Employee', 'Settings', 'Security']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <GlassPanel className="p-4">
          <div className="flex items-center gap-2 mb-3"><Shield className="w-4 h-4 text-blue-500" /><h3 className="text-xs font-bold text-slate-900 dark:text-white">Two-Factor Authentication</h3></div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">{twoFA ? 'Enabled' : 'Disabled'}</span>
            <button onClick={() => setTwoFA(!twoFA)} className={`relative w-10 h-5 rounded-full transition-colors ${twoFA ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${twoFA ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="mt-3 text-[10px] text-slate-400">Last login: 2026-07-15 09:23 AM</div>
        </GlassPanel>
        <GlassPanel className="p-4">
          <div className="flex items-center gap-2 mb-3"><LogIn className="w-4 h-4 text-emerald-500" /><h3 className="text-xs font-bold text-slate-900 dark:text-white">Active Sessions</h3></div>
          <div className="space-y-2">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  {s.device.includes('iPhone') ? <Smartphone className="w-3 h-3 text-slate-400" /> : <Laptop className="w-3 h-3 text-slate-400" />}
                  <span className="text-slate-700 dark:text-slate-300">{s.device}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{s.lastActive}</span>
                  {s.current && <AutoStatusBadge status="Active" />}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 mb-3"><History className="w-4 h-4 text-slate-400" /><h3 className="text-xs font-bold text-slate-900 dark:text-white">Login History</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-2 px-2">Date & Time</th>
                <th className="text-left py-2 px-2">IP Address</th>
                <th className="text-left py-2 px-2">Device</th>
                <th className="text-left py-2 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((l, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02]">
                  <td className="py-2 px-2 text-slate-700 dark:text-slate-300">{l.date}</td>
                  <td className="py-2 px-2 text-slate-500 font-mono">{l.ip}</td>
                  <td className="py-2 px-2 text-slate-500">{l.device}</td>
                  <td className="py-2 px-2"><AutoStatusBadge status={l.success ? 'Active' : 'Pending'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
