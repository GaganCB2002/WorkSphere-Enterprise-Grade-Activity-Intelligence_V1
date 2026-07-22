import React, { useState } from 'react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Filter, Download, RefreshCw, Search, FileText, Image, FileSpreadsheet, FileCode, File } from 'lucide-react';

const typeIcons: Record<string, any> = { pdf: FileText, doc: FileText, png: Image, jpg: Image, xlsx: FileSpreadsheet, tsx: FileCode, js: FileCode, css: FileCode, default: File };

const mockFiles = [
  { name: 'Q3_Report.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: 'Ananya Sharma', date: '2026-07-15', project: 'WorkSphere Core' },
  { name: 'Wireframes_v2.png', type: 'png', size: '4.1 MB', uploadedBy: 'Rahul Verma', date: '2026-07-14', project: 'Mobile App Redesign' },
  { name: 'API_Specs.docx', type: 'doc', size: '1.8 MB', uploadedBy: 'Priya Patel', date: '2026-07-13', project: 'WorkSphere Core' },
  { name: 'Budget_2026.xlsx', type: 'xlsx', size: '856 KB', uploadedBy: 'Vikram Singh', date: '2026-07-12', project: 'Data Pipeline v2' },
  { name: 'Dashboard.tsx', type: 'tsx', size: '12 KB', uploadedBy: 'Gagan Chaudhary', date: '2026-07-11', project: 'AI Chatbot Platform' },
  { name: 'Analytics.js', type: 'js', size: '24 KB', uploadedBy: 'Sneha Kapoor', date: '2026-07-10', project: 'E-commerce Analytics' },
  { name: 'Styles.css', type: 'css', size: '45 KB', uploadedBy: 'Arjun Nair', date: '2026-07-09', project: 'Customer Portal' },
  { name: 'Deployment_Guide.pdf', type: 'pdf', size: '1.2 MB', uploadedBy: 'Neha Gupta', date: '2026-07-08', project: 'DevOps Automation' },
  { name: 'UML_Diagrams.png', type: 'jpg', size: '3.5 MB', uploadedBy: 'Karan Mehta', date: '2026-07-07', project: 'Legacy System Audit' },
  { name: 'Contract_v3.docx', type: 'doc', size: '980 KB', uploadedBy: 'Rohit Sharma', date: '2026-07-06', project: 'Cloud Migration' },
  { name: 'Config.yaml', type: 'default', size: '4 KB', uploadedBy: 'Gagan Chaudhary', date: '2026-07-05', project: 'DevOps Automation' },
];

export default function ProjectFiles() {
  const [search, setSearch] = useState('');
  const filtered = mockFiles.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.project.toLowerCase().includes(search.toLowerCase()));
  return (
    <EmployeePageLayout title="Project Files" description="Browse and manage project-related documents and assets" breadcrumbs={['Employee', 'Projects', 'Project Files']} actions={
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Filter className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><Download className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><RefreshCw className="w-4 h-4" /></button>
      </div>
    }>
      <GlassPanel className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl max-w-md mb-4">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200/60 dark:border-white/[0.04]">
                <th className="text-left py-3 px-2">File Name</th>
                <th className="text-left py-3 px-2">Type</th>
                <th className="text-left py-3 px-2">Size</th>
                <th className="text-left py-3 px-2">Uploaded By</th>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Project</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, i) => {
                const Icon = typeIcons[f.type] || typeIcons.default;
                return (
                  <tr key={i} className="border-b border-slate-100 dark:border-white/[0.02] hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-900 dark:text-white">{f.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-slate-500 uppercase">{f.type}</td>
                    <td className="py-3 px-2 text-slate-500">{f.size}</td>
                    <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{f.uploadedBy}</td>
                    <td className="py-3 px-2 text-slate-500">{f.date}</td>
                    <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{f.project}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
