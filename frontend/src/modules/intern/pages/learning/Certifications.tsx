import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock, AlertTriangle, Download, Eye, XCircle } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const certifications = [
  { id: 1, name: 'AWS Solutions Architect', organization: 'Amazon Web Services', issueDate: '2025-06-15', expiryDate: '2028-06-15', status: 'Active', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
  { id: 2, name: 'Google Cloud Professional', organization: 'Google Cloud', issueDate: '2025-03-10', expiryDate: '2027-03-10', status: 'Active', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' },
  { id: 3, name: 'Certified Scrum Master', organization: 'Scrum Alliance', issueDate: '2024-01-20', expiryDate: '2026-01-20', status: 'Active', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { id: 4, name: 'Microsoft Azure Administrator', organization: 'Microsoft', issueDate: '2023-08-05', expiryDate: '2025-08-05', status: 'Expired', badge: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' },
  { id: 5, name: 'CompTIA Security+', organization: 'CompTIA', issueDate: '2024-11-01', expiryDate: '2027-11-01', status: 'Active', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400' },
  { id: 6, name: 'Oracle Certified Professional', organization: 'Oracle', issueDate: '2022-05-15', expiryDate: '2025-05-15', status: 'Expired', badge: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' },
  { id: 7, name: 'Project Management Professional', organization: 'PMI', issueDate: '2026-01-10', expiryDate: '2029-01-10', status: 'Active', badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    Expired: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || ''}`}>
      {status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {status}
    </span>
  );
}

function KpiCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </motion.div>
  );
}

export default function Certifications() {
  const total = certifications.length;
  const active = certifications.filter(c => c.status === 'Active').length;
  const expired = certifications.filter(c => c.status === 'Expired').length;

  return (
    <InternPageShell title="Certifications" description="Professional certifications and badges">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Certifications', value: String(total), icon: Award, color: 'text-violet-600 bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400' },
            { label: 'Active', value: String(active), icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
            { label: 'Expired', value: String(expired), icon: AlertTriangle, color: 'text-red-600 bg-red-100 dark:bg-red-500/10 dark:text-red-400' },
          ].map((kpi, i) => <KpiCard key={kpi.label} {...kpi} />)}
        </div>

        {/* Certification Grid */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {certifications.map(cert => (
            <div key={cert.id} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${cert.badge}`}>
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{cert.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{cert.organization}</p>
              <StatusBadge status={cert.status} />
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                Expires {cert.expiryDate}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1">
                  <Eye className="w-3 h-3" /> View
                </button>
                <button className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-1">
                  <Download className="w-3 h-3" /> PDF
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Certifications Table */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">All Certifications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Certification</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Organization</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Issue Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Expiry Date</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {certifications.map(cert => (
                  <tr key={cert.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{cert.name}</td>
                    <td className="px-5 py-3.5 text-slate-500">{cert.organization}</td>
                    <td className="px-5 py-3.5 text-slate-500">{cert.issueDate}</td>
                    <td className="px-5 py-3.5 text-slate-500">{cert.expiryDate}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={cert.status} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/40 text-blue-600 transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/40 text-slate-500 transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </motion.div>
    </InternPageShell>
  );
}
