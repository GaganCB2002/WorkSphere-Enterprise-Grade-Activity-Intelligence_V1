import React from 'react';
import { FileText, Download, FileSpreadsheet, Presentation } from 'lucide-react';

export const CeoReports: React.FC = () => {
  const reports = [
    { title: 'Annual Board Meeting Summary', type: 'Presentation', date: 'Nov 1, 2026', size: '14.2 MB' },
    { title: 'Q3 Financial & Revenue Report', type: 'Excel', date: 'Oct 15, 2026', size: '3.4 MB' },
    { title: 'Enterprise Workforce Overview', type: 'PDF', date: 'Oct 10, 2026', size: '5.1 MB' },
    { title: 'Investor Relations Update', type: 'PDF', date: 'Oct 01, 2026', size: '8.4 MB' },
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Executive Reports Center</h3>
          <p className="text-slate-400 text-xs mt-1">Download and generate board-level documentation</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-blue-900/20">
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                {report.type === 'PDF' ? <FileText className="w-5 h-5 text-rose-400" /> : 
                 report.type === 'Excel' ? <FileSpreadsheet className="w-5 h-5 text-emerald-400" /> : 
                 <Presentation className="w-5 h-5 text-purple-400" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{report.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{report.date} • {report.size}</p>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-white bg-slate-950 rounded-lg hover:bg-slate-700 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
