import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Eye, Calendar, Search, Filter,
  Shield, BookOpen, FileSignature, MoreHorizontal, Tag,
  CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

interface HRDoc {
  id: string;
  name: string;
  category: string;
  issueDate: string;
  status: 'Signed' | 'Pending' | 'Not Signed';
  description: string;
}

const HRDocuments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const docs: HRDoc[] = [
    { id: 'HR001', name: 'Non-Disclosure Agreement (NDA)', category: 'NDA', issueDate: '2026-05-28', status: 'Signed', description: 'Standard confidentiality and non-disclosure agreement' },
    { id: 'HR002', name: 'Code of Conduct Acknowledgment', category: 'Code of Conduct', issueDate: '2026-05-28', status: 'Signed', description: 'Acknowledgment of company code of conduct' },
    { id: 'HR003', name: 'Data Protection Addendum', category: 'NDA', issueDate: '2026-06-01', status: 'Signed', description: 'GDPR and data privacy addendum' },
    { id: 'HR004', name: 'Internship Terms & Conditions', category: 'Signed Documents', issueDate: '2026-05-28', status: 'Signed', description: 'Terms and conditions of internship' },
    { id: 'HR005', name: 'Emergency Contact Form', category: 'Signed Documents', issueDate: '2026-06-01', status: 'Pending', description: 'Emergency contact information form' },
    { id: 'HR006', name: 'IT Policy Acknowledgment', category: 'Code of Conduct', issueDate: '2026-06-01', status: 'Signed', description: 'Acknowledgment of IT acceptable use policy' },
    { id: 'HR007', name: 'Client NDA', category: 'NDA', issueDate: '2026-06-15', status: 'Not Signed', description: 'Non-disclosure for client-facing projects' },
    { id: 'HR008', name: 'Direct Deposit Authorization', category: 'Signed Documents', issueDate: '2026-05-28', status: 'Signed', description: 'Payroll direct deposit setup form' },
  ];

  const categories = ['All', ...new Set(docs.map(d => d.category))];
  const categoryIcons: Record<string, React.ReactNode> = {
    NDA: <Shield className="w-4 h-4" />,
    'Code of Conduct': <BookOpen className="w-4 h-4" />,
    'Signed Documents': <FileSignature className="w-4 h-4" />,
  };
  const categoryColors: Record<string, string> = {
    NDA: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200 dark:border-purple-500/20',
    'Code of Conduct': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/20',
    'Signed Documents': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20',
  };

  const statusConfig = {
    Signed: { icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' },
    Pending: { icon: Clock, color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' },
    'Not Signed': { icon: AlertCircle, color: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300' },
  };

  const filteredDocs = docs.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <InternPageShell title="HR Documents" description="HR-related documents">
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
                {['Document Name', 'Category', 'Issue Date', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredDocs.map((doc, i) => (
                <motion.tr
                  key={doc.id}
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
                        <p className="font-medium text-slate-900 dark:text-white">{doc.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{doc.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[doc.category] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}>
                      {categoryIcons[doc.category]} {doc.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {doc.issueDate}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[doc.status].color}`}>
                      {React.createElement(statusConfig[doc.status].icon, { className: 'w-3 h-3' })}
                      {doc.status}
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
        {filteredDocs.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">No documents match your search criteria.</div>
        )}
      </motion.div>
    </InternPageShell>
  );
};

export default HRDocuments;
