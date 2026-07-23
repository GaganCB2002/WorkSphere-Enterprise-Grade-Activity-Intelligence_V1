import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Upload, Eye, Download, FileText, FileSpreadsheet, FileImage, FileArchive } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

interface Document {
  name: string;
  type: string;
  uploadDate: string;
  status: string;
  icon: React.ElementType;
  iconColor: string;
}

const documents: Document[] = [
  { name: 'Resume_Elena_Rostova.pdf', type: 'PDF', uploadDate: '01 Jun 2025', status: 'Verified', icon: FileText, iconColor: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
  { name: 'Offer_Letter_Sahara.pdf', type: 'PDF', uploadDate: '25 May 2025', status: 'Verified', icon: FileText, iconColor: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
  { name: 'College_ID_Card.png', type: 'Image', uploadDate: '28 May 2025', status: 'Verified', icon: FileImage, iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
  { name: 'Internship_Agreement.pdf', type: 'PDF', uploadDate: '30 May 2025', status: 'Pending', icon: FileText, iconColor: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
  { name: 'Bank_Details_Form.xlsx', type: 'Spreadsheet', uploadDate: '02 Jun 2025', status: 'Pending', icon: FileSpreadsheet, iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  { name: 'NDA_Agreement.pdf', type: 'PDF', uploadDate: '01 Jun 2025', status: 'Verified', icon: FileText, iconColor: 'text-red-500 bg-red-50 dark:bg-red-500/10' },
  { name: 'Portfolio_WorkSample.zip', type: 'Archive', uploadDate: '25 May 2025', status: 'Verified', icon: FileArchive, iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
];

export default function ProfileDocuments() {
  return (
    <InternPageShell
      title="Profile Documents"
      description="Uploaded documents and files"
      breadcrumbs={[
        { label: 'Intern Dashboard', path: '/intern/dashboard' },
        { label: 'Profile' },
        { label: 'Documents' },
      ]}
      actions={
        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          <Upload className="w-4 h-4" /> Upload
        </button>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-700/60">
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Document Name</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Date</th>
                  <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {documents.map((doc, i) => {
                  const Icon = doc.icon;
                  return (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${doc.iconColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-slate-800 dark:text-slate-200">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-700/40 px-2 py-1 rounded-md">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{doc.uploadDate}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          doc.status === 'Verified'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/40 text-slate-400 hover:text-blue-600 transition-colors"
                            title="View document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/40 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Download document"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
