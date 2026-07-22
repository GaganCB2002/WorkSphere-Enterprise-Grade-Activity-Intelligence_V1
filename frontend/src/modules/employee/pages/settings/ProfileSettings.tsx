import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, User, Save } from 'lucide-react';

export default function ProfileSettings() {
  const [form, setForm] = useState({ name: 'Gagan Chaudhary', email: 'gagan@worksphere.ai', phone: '+1 (555) 123-4567', timezone: 'America/New_York', language: 'English' });
  const [saved, setSaved] = useState(false);
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const handleSave = (e: React.FormEvent) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <EmployeePageLayout title="Profile Settings" description="Edit your personal profile information and preferences" breadcrumbs={['Employee', 'Settings', 'Profile Settings']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-6 max-w-lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
            <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email</label>
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone</label>
            <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Timezone</label>
            <select value={form.timezone} onChange={e => update('timezone', e.target.value)} className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-200 outline-none">
              <option>America/New_York</option>
              <option>America/Chicago</option>
              <option>America/Denver</option>
              <option>America/Los_Angeles</option>
              <option>Europe/London</option>
              <option>Asia/Kolkata</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Language</label>
            <select value={form.language} onChange={e => update('language', e.target.value)} className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-200 outline-none">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Hindi</option>
            </select>
          </div>
          <button type="submit" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all">
            <Save className="w-4 h-4" />{saved ? 'Saved!' : 'Save Changes'}
          </button>
        </form>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
