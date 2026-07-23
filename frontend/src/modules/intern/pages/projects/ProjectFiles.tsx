import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  FileText, FileImage, FileSpreadsheet, File, Upload, Download, Eye,
  Search, HardDrive, ArrowUpRight, Filter
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const files = [
  { name: 'Project_Requirements_v2.pdf', type: 'PDF', project: 'Portal Redesign', uploadedBy: 'Alice Chen', size: '2.4 MB', uploadedDate: '2026-07-15' },
  { name: 'UI_Mockups_Final.fig', type: 'IMG', project: 'Portal Redesign', uploadedBy: 'Carol Davis', size: '8.1 MB', uploadedDate: '2026-07-14' },
  { name: 'API_Specification.docx', type: 'DOC', project: 'API Gateway', uploadedBy: 'Bob Smith', size: '1.2 MB', uploadedDate: '2026-07-12' },
  { name: 'Sprint_7_Planning.xlsx', type: 'XLS', project: 'Analytics Dashboard', uploadedBy: 'You', size: '856 KB', uploadedDate: '2026-07-10' },
  { name: 'Architecture_Diagram.png', type: 'IMG', project: 'API Gateway', uploadedBy: 'Alice Chen', size: '3.5 MB', uploadedDate: '2026-07-08' },
  { name: 'Deployment_Guide.pdf', type: 'PDF', project: 'DevOps Pipeline', uploadedBy: 'Bob Smith', size: '1.8 MB', uploadedDate: '2026-07-05' },
  { name: 'Code_Review_Checklist.docx', type: 'DOC', project: 'Portal Redesign', uploadedBy: 'You', size: '420 KB', uploadedDate: '2026-07-03' },
  { name: 'User_Research_Report.pdf', type: 'PDF', project: 'Analytics Dashboard', uploadedBy: 'Carol Davis', size: '5.2 MB', uploadedDate: '2026-07-01' },
  { name: 'Test_Cases.xlsx', type: 'XLS', project: 'API Gateway', uploadedBy: 'You', size: '1.1 MB', uploadedDate: '2026-06-28' },
  { name: 'Logo_Assets.zip', type: 'IMG', project: 'Portal Redesign', uploadedBy: 'Carol Davis', size: '4.6 MB', uploadedDate: '2026-06-25' },
];

function FileTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'PDF': return <FileText className="w-5 h-5 text-red-500" />;
    case 'DOC': return <FileText className="w-5 h-5 text-blue-500" />;
    case 'XLS': return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
    case 'IMG': return <FileImage className="w-5 h-5 text-violet-500" />;
    default: return <File className="w-5 h-5 text-slate-400" />;
  }
}

function FileTypeBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    PDF: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    DOC: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    XLS: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    IMG: 'bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${map[type] || ''}`}>{type}</span>;
}

function formatSize(size: string): number {
  if (size.includes('MB')) return parseFloat(size) * 1024;
  if (size.includes('KB')) return parseFloat(size);
  return 0;
}

export default function ProjectFiles() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const totalSizeMB = (files.reduce((sum, f) => sum + formatSize(f.size), 0) / 1024).toFixed(1);

  const kpis = [
    { label: 'Total Files', value: files.length, icon: FileText, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
    { label: 'Total Size', value: `${totalSizeMB} MB`, icon: HardDrive, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
  ];

  const filtered = files.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.project.toLowerCase().includes(search.toLowerCase()) || f.uploadedBy.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All' || f.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <InternPageShell
      title="Project Files"
      description="Files and resources shared in your projects"
      actions={
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
          <Upload className="w-4 h-4" /> Upload File
        </button>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div key={kpi.label} variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${kpi.color}`}><Icon className="w-5 h-5" /></div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <ArrowUpRight className="w-3 h-3" /> Current
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" />
            </div>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-500">
              <option value="All">All Types</option>
              <option value="PDF">PDF</option>
              <option value="DOC">DOC</option>
              <option value="XLS">XLS</option>
              <option value="IMG">IMG</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">File Name</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Uploaded By</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Size</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Uploaded Date</th>
                  <th className="text-right px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {filtered.map((file, i) => (
                  <motion.tr key={file.name} variants={item} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <FileTypeIcon type={file.type} />
                        <span className="font-medium text-slate-800 dark:text-slate-200">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><FileTypeBadge type={file.type} /></td>
                    <td className="px-5 py-3.5 text-slate-500">{file.project}</td>
                    <td className="px-5 py-3.5 text-slate-500">{file.uploadedBy}</td>
                    <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">{file.size}</td>
                    <td className="px-5 py-3.5 text-slate-500">{file.uploadedDate}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-400">No files found matching your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
