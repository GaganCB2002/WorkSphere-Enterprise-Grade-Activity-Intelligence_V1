import React, { useState } from 'react';
import { FileText, File, Image, Archive, Download, Filter, RefreshCw, Search, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
import { StatusBadge } from '../components/ui/StatusBadge';

const MOCK_DOCUMENTS = [
  { id: 'doc-1', name: 'Q3_OKRs_Draft.pdf', type: 'PDF', size: '2.4 MB', category: 'Work', updated: '2026-05-20', icon: FileText, color: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
  { id: 'doc-2', name: 'Employment_Contract.pdf', type: 'PDF', size: '1.1 MB', category: 'HR', updated: '2026-05-15', icon: FileText, color: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
  { id: 'doc-3', name: 'Profile_Photo_2026.png', type: 'Image', size: '3.2 MB', category: 'Personal', updated: '2026-05-10', icon: Image, color: 'text-green-500 bg-green-50 dark:bg-green-500/10' },
  { id: 'doc-4', name: 'Sprint_8_Report.xlsx', type: 'Spreadsheet', size: '856 KB', category: 'Work', updated: '2026-05-08', icon: File, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  { id: 'doc-5', name: 'Architecture_Diagram_v2.drawio', type: 'Diagram', size: '412 KB', category: 'Work', updated: '2026-05-05', icon: File, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
  { id: 'doc-6', name: 'Training_Certificate_2026.pdf', type: 'PDF', size: '624 KB', category: 'Training', updated: '2026-05-01', icon: FileText, color: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
  { id: 'doc-7', name: 'Backup_Logs_April.zip', type: 'Archive', size: '15.8 MB', category: 'System', updated: '2026-04-30', icon: Archive, color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
  { id: 'doc-8', name: 'Design_System_v3.fig', type: 'Design', size: '8.3 MB', category: 'Design', updated: '2026-04-28', icon: File, color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10' },
];

const categories = ['All', 'Work', 'HR', 'Personal', 'Training', 'Design', 'System'];

export function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const filtered = MOCK_DOCUMENTS.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <EmployeePageLayout
      title="Documents"
      description="Browse, manage, and share your files"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Documents' }]}
      searchPlaceholder="Search documents..."
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeCategory === cat ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(doc => (
          <motion.div
            key={doc.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -2 }}
            onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${selectedDoc === doc.id ? 'border-brand-500 ring-1 ring-brand-500 bg-brand-50/50 dark:bg-brand-500/5' : 'border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-slate-900/60 backdrop-blur-md hover:border-slate-300 dark:hover:border-white/[0.12]'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${doc.color}`}>
              <doc.icon className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate mb-1">{doc.name}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400">{doc.size}</span>
              <StatusBadge label={doc.category} variant={doc.category === 'HR' ? 'admin' : doc.category === 'System' ? 'offline' : 'working'} size="sm" dot={false} />
            </div>
            {selectedDoc === doc.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 pt-3 border-t border-slate-200 dark:border-white/[0.06]"
              >
                <p className="text-[10px] text-slate-400 mb-2">Updated: {doc.updated}</p>
                <button className="flex items-center gap-1 text-[10px] font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  <Download className="w-3 h-3" /> Download
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </EmployeePageLayout>
  );
}

export default DocumentsPage;
