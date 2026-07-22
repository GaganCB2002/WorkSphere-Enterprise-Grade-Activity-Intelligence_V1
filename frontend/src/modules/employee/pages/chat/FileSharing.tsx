import React, { useState } from 'react';
import { Filter, Download, RefreshCw, Search, FileText, Image, File, DownloadCloud } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

const files = [
  { id: 1, name: 'Q3_Report_Final.pdf', type: 'PDF', size: '2.4 MB', sharedBy: 'Ananya Sharma', sharedDate: '2026-07-20' },
  { id: 2, name: 'Team_Photo_2026.jpg', type: 'Image', size: '4.1 MB', sharedBy: 'Rahul Verma', sharedDate: '2026-07-19' },
  { id: 3, name: 'Sprint_Planning_Doc.docx', type: 'Doc', size: '856 KB', sharedBy: 'Priya Patel', sharedDate: '2026-07-18' },
  { id: 4, name: 'Architecture_Diagram.png', type: 'Image', size: '2.3 MB', sharedBy: 'Amit Singh', sharedDate: '2026-07-17' },
  { id: 5, name: 'Release_Notes_v3.2.pdf', type: 'PDF', size: '1.1 MB', sharedBy: 'Sneha Reddy', sharedDate: '2026-07-16' },
  { id: 6, name: 'Budget_Proposal_2026.xlsx', type: 'Doc', size: '3.5 MB', sharedBy: 'Vikram Joshi', sharedDate: '2026-07-15' },
  { id: 7, name: 'UI_Mockups_v2.fig', type: 'Doc', size: '6.2 MB', sharedBy: 'Neha Kapoor', sharedDate: '2026-07-14' },
  { id: 8, name: 'Security_Audit_Report.pdf', type: 'PDF', size: '1.8 MB', sharedBy: 'IT Security', sharedDate: '2026-07-13' },
  { id: 9, name: 'Onboarding_Checklist.xlsx', type: 'Doc', size: '512 KB', sharedBy: 'HR Department', sharedDate: '2026-07-12' },
  { id: 10, name: 'Product_Roadmap_2026.pdf', type: 'PDF', size: '3.2 MB', sharedBy: 'Product Team', sharedDate: '2026-07-11' },
];

const typeIcons: Record<string, React.ReactNode> = {
  PDF: <FileText className="w-4 h-4 text-red-500" />,
  Image: <Image className="w-4 h-4 text-blue-500" />,
  Doc: <FileText className="w-4 h-4 text-amber-500" />,
};

export default function FileSharing() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.sharedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EmployeePageLayout
      title="File Sharing"
      description="Shared files and documents from team conversations"
      breadcrumbs={['Employee', 'Chat', 'File Sharing']}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Filter className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl">
        <Search className="w-4 h-4 text-slate-400" />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search files..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
      </GlassPanel>

      <GlassPanel padding="none" className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/[0.06]">
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">File Name</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Type</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Size</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Shared By</th>
              <th className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Date</th>
              <th className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {typeIcons[f.type] || <FileText className="w-4 h-4 text-slate-400" />}
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{f.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{f.type}</td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{f.size}</td>
                <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-300">{f.sharedBy}</td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{f.sharedDate}</td>
                <td className="px-5 py-3.5 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors">
                    <DownloadCloud className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
