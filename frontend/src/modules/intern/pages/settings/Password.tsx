import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Password() {
  const [form, setForm] = useState<FormData>({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const toggleShow = (field: string) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (pwd: string): { label: string; color: string; width: string } => {
    if (!pwd) return { label: '', color: '', width: '0%' };
    const checks = [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z\d]/];
    const score = checks.filter(r => r.test(pwd)).length;
    if (pwd.length < 6) return { label: 'Weak', color: 'bg-rose-500', width: '25%' };
    if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', width: '25%' };
    if (score === 2) return { label: 'Fair', color: 'bg-amber-500', width: '50%' };
    if (score === 3) return { label: 'Good', color: 'bg-blue-500', width: '75%' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  };

  const strength = getPasswordStrength(form.newPassword);

  const passwordsMatch = form.newPassword === form.confirmPassword;
  const showMatchError = form.confirmPassword.length > 0 && !passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    console.log('Password updated');
  };

  return (
    <InternPageShell title="Change Password" description="Update your password">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg mx-auto">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={form.currentPassword}
                  onChange={e => setForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleShow('current')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={form.newPassword}
                  onChange={e => setForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleShow('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.newPassword.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: strength.width }} />
                    </div>
                    <span className={`text-xs font-semibold ${strength.color.replace('bg-', 'text-').replace('500', '600')}`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Shield className="w-3 h-3" />
                    Use at least 6 characters with uppercase, lowercase, number & special char
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={e => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                  className={`w-full pl-9 pr-10 py-2.5 border rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                    showMatchError ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleShow('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {showMatchError && (
                <p className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                  <AlertTriangle className="w-3 h-3" /> Passwords do not match
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={showMatchError || !form.currentPassword || !form.newPassword || !form.confirmPassword}
              className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock className="w-4 h-4" /> Update Password
            </button>

          </form>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
