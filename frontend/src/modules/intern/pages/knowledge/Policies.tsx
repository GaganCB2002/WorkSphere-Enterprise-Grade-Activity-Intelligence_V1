import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Eye, BookOpen, Shield,
  Users, Clock, Building2, MoreHorizontal
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

interface Policy {
  id: string;
  name: string;
  category: string;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  description: string;
}

const Policies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const policies: Policy[] = [
    { id: 'P001', name: 'Code of Conduct', category: 'HR', version: 'v3.2', effectiveDate: '2026-01-01', lastUpdated: '2026-06-15', description: 'Standards of professional behavior and ethics' },
    { id: 'P002', name: 'Anti-Harassment Policy', category: 'HR', version: 'v2.1', effectiveDate: '2026-01-01', lastUpdated: '2026-05-20', description: 'Workplace harassment prevention and reporting' },
    { id: 'P003', name: 'Remote Work Policy', category: 'HR', version: 'v1.5', effectiveDate: '2026-03-01', lastUpdated: '2026-06-01', description: 'Guidelines for remote and hybrid work' },
    { id: 'P004', name: 'Data Privacy Policy', category: 'Legal', version: 'v4.0', effectiveDate: '2026-01-01', lastUpdated: '2026-07-01', description: 'Handling of personal and company data' },
    { id: 'P005', name: 'Information Security Policy', category: 'IT', version: 'v3.3', effectiveDate: '2026-02-01', lastUpdated: '2026-06-28', description: 'Security protocols and data protection' },
    { id: 'P006', name: 'Leave Policy', category: 'HR', version: 'v2.0', effectiveDate: '2026-01-01', lastUpdated: '2026-04-15', description: 'Annual, sick, and personal leave guidelines' },
    { id: 'P007', name: 'Expense Reimbursement', category: 'Finance', version: 'v1.8', effectiveDate: '2026-01-01', lastUpdated: '2026-05-30', description: 'Travel and business expense claims' },
    { id: 'P008', name: 'IT Acceptable Use', category: 'IT', version: 'v2.2', effectiveDate: '2026-01-01', lastUpdated: '2026-06-10', description: 'Appropriate use of company technology resources' },
  ];

  const categories = ['All', ...new Set(policies.map(p => p.category))];
  const categoryIcons: Record<string, React.ReactNode> = {
    HR: <Users className="w-4 h-4" />,
    Legal: <Shield className="w-4 h-4" />,
    IT: <Building2 className="w-4 h-4" />,
    Finance: <BookOpen className="w-4 h-4" />,
  };

  const filteredPolicies = policies.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <InternPageShell title="Company Policies" description="HR and company policies">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Policies', value: policies.length, icon: FileText, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10' },
          { label: 'HR Policies', value: policies.filter(p => p.category === 'HR').length, icon: Users, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10' },
          { label: 'IT Policies', value: policies.filter(p => p.category === 'IT').length, icon: Building2, color: 'text-purple-600 bg-purple-100 dark:bg-purple-500/10' },
          { label: 'Updated This Month', value: policies.filter(p => p.lastUpdated >= '2026-07-01').length, icon: Clock, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">{kpi.label}</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{kpi.value}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${kpi.color}`}>
                <kpi.icon className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat !== 'All' && categoryIcons[cat]} {cat}
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
                {['Policy Name', 'Category', 'Version', 'Effective Date', 'Last Updated', 'Actions'].map((header) => (
                  <th key={header} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredPolicies.map((policy, i) => (
                <motion.tr
                  key={policy.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{policy.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{policy.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      policy.category === 'HR' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' :
                      policy.category === 'IT' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300' :
                      policy.category === 'Legal' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                    }`}>
                      {categoryIcons[policy.category]} {policy.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{policy.version}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{policy.effectiveDate}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{policy.lastUpdated}</td>
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
        {filteredPolicies.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">No policies match your search criteria.</div>
        )}
      </motion.div>
    </InternPageShell>
  );
};

export default Policies;
