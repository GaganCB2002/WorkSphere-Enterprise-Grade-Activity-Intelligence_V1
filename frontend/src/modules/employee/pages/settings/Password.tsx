import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, Lock, Eye, EyeOff, Shield } from 'lucide-react';

export default function Password() {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (newPass === confirm && newPass.length >= 8) setSaved(true); };
  return (
    <EmployeePageLayout title="Password" description="Update your account password and security credentials" breadcrumbs={['Employee', 'Settings', 'Password']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-6 max-w-lg">
        {saved ? (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Password Updated</h3>
            <p className="text-xs text-slate-400">Your password has been changed successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Current Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={current} onChange={e => setCurrent(e.target.value)} required className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50 pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><EyeOff className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">New Password</label>
              <input type={showPass ? 'text' : 'password'} value={newPass} onChange={e => setNewPass(e.target.value)} required minLength={8} className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Confirm New Password</label>
              <input type={showPass ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={8} className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50" />
              {confirm && newPass !== confirm && <p className="text-[10px] text-rose-500 mt-1">Passwords do not match</p>}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1"><Lock className="w-3 h-3" /> Min 8 characters required</div>
            <button type="submit" className="w-full px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all">Update Password</button>
          </form>
        )}
      </GlassPanel>
    </EmployeePageLayout>
  );
}
