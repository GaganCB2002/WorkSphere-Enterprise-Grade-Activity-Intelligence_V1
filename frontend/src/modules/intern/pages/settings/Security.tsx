import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  Shield, ShieldOff, Laptop, MapPin, Globe,
  Smartphone, XCircle, CheckCircle, AlertTriangle
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const loginHistory = [
  { date: '2026-07-22 09:15 AM', device: 'Windows 11 - Chrome 128', location: 'New York, US', ip: '192.168.1.45', status: 'Current' },
  { date: '2026-07-21 06:30 PM', device: 'Windows 11 - Chrome 128', location: 'New York, US', ip: '192.168.1.45', status: 'Successful' },
  { date: '2026-07-20 08:00 AM', device: 'iPhone 16 - Safari', location: 'New York, US', ip: '10.0.0.32', status: 'Successful' },
  { date: '2026-07-19 11:20 PM', device: 'Unknown - Firefox', location: 'Los Angeles, US', ip: '203.0.113.50', status: 'Failed' },
  { date: '2026-07-18 07:45 AM', device: 'MacBook Pro - Chrome', location: 'New York, US', ip: '192.168.1.100', status: 'Successful' },
];

const activeSessions = [
  { device: 'Windows Desktop - Chrome', lastActive: 'Active now', ip: '192.168.1.45' },
  { device: 'iPhone 16 - Safari', lastActive: '2 hours ago', ip: '10.0.0.32' },
  { device: 'iPad - Safari', lastActive: '1 day ago', ip: '172.16.0.12' },
];

const statusStyles: Record<string, string> = {
  Current: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  Successful: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Failed: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
};

export default function Security() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <InternPageShell title="Security Settings" description="Manage account security">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">

        {/* Two-Factor Auth */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-lg ${twoFactor ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 dark:bg-slate-700/60 text-slate-500'}`}>
                {twoFactor ? <Shield className="w-5 h-5" /> : <ShieldOff className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Two-Factor Authentication</p>
                <p className="text-xs text-slate-400 mt-0.5">Add an extra layer of security to your account</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`relative w-11 h-6 rounded-full transition-colors ${twoFactor ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${twoFactor ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Recent Login Activity */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Recent Login Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Device</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">IP Address</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {loginHistory.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{row.date}</td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Laptop className="w-3.5 h-3.5 text-slate-400" /> {row.device}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" /> {row.location}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400 font-mono">{row.ip}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyles[row.status]}`}>
                        {row.status === 'Current' && <Shield className="w-3 h-3" />}
                        {row.status === 'Successful' && <CheckCircle className="w-3 h-3" />}
                        {row.status === 'Failed' && <XCircle className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Active Sessions */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Active Sessions</h3>
          <div className="space-y-3">
            {activeSessions.map((session, i) => (
              <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-500">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{session.device}</p>
                    <p className="text-xs text-slate-400">IP: {session.ip} · {session.lastActive}</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Revoke
                </button>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </InternPageShell>
  );
}
