import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Search, Building2, Clock, User, Eye, Download,
  MoreHorizontal, Layers, Hash, ChevronRight
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

interface SOP {
  id: string;
  name: string;
  department: string;
  version: string;
  lastReviewed: string;
  owner: string;
  stepCount: number;
  description: string;
}

const SOPs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const sops: SOP[] = [
    { id: 'SOP001', name: 'Employee Onboarding', department: 'HR', version: 'v4.2', lastReviewed: '2026-06-20', owner: 'HR Team', stepCount: 15, description: 'Complete process for onboarding new employees' },
    { id: 'SOP002', name: 'Incident Response', department: 'IT', version: 'v3.1', lastReviewed: '2026-07-01', owner: 'Security Team', stepCount: 12, description: 'Steps for responding to security incidents' },
    { id: 'SOP003', name: 'Code Deployment', department: 'Engineering', version: 'v5.0', lastReviewed: '2026-07-10', owner: 'DevOps Team', stepCount: 8, description: 'Production deployment checklist and process' },
    { id: 'SOP004', name: 'Expense Approval', department: 'Finance', version: 'v2.3', lastReviewed: '2026-05-15', owner: 'Finance Team', stepCount: 6, description: 'Process for submitting and approving expenses' },
    { id: 'SOP005', name: 'Data Backup & Recovery', department: 'IT', version: 'v3.0', lastReviewed: '2026-06-28', owner: 'Infra Team', stepCount: 10, description: 'Backup schedule and recovery procedures' },
    { id: 'SOP006', name: 'Performance Review', department: 'HR', version: 'v2.1', lastReviewed: '2026-04-30', owner: 'HR Team', stepCount: 9, description: 'Quarterly performance review cycle' },
    { id: 'SOP007', name: 'Vendor Onboarding', department: 'Procurement', version: 'v1.5', lastReviewed: '2026-06-10', owner: 'Procurement Team', stepCount: 11, description: 'Process for onboarding new vendors' },
    { id: 'SOP008', name: 'Database Migration', department: 'Engineering', version: 'v2.0', lastReviewed: '2026-07-05', owner: 'Backend Team', stepCount: 7, description: 'Safe database migration procedure' },
  ];

  const departments = ['All', ...new Set(sops.map(s => s.department))];

  const deptColors: Record<string, string> = {
    HR: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    IT: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
    Engineering: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
    Finance: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    Procurement: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
  };

  const filteredSOPs = sops.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <InternPageShell title="Standard Operating Procedures" description="Step-by-step procedures">
      <div className="flex flex-wrap items-center gap-2">
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedDept === dept
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {['SOP Name', 'Department', 'Version', 'Steps', 'Last Reviewed', 'Owner', 'Actions'].map((header) => (
                  <th key={header} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredSOPs.map((sop, i) => (
                <motion.tr
                  key={sop.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{sop.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{sop.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${deptColors[sop.department] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                      {sop.department}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{sop.version}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                      <Hash className="w-3 h-3" />
                      {sop.stepCount} steps
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{sop.lastReviewed}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {sop.owner}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Download">
                        <Download className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredSOPs.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">No SOPs match your search criteria.</div>
        )}
      </motion.div>
    </InternPageShell>
  );
};

export default SOPs;
