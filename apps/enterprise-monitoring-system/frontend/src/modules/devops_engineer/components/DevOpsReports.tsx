import React from 'react';
import { FileText, Download, Calendar, Filter, FileJson, FileSearch, CheckCircle2, AlertTriangle, FilePieChart, TrendingUp } from 'lucide-react';

const mockReports = [
  { id: 'RPT-26-05', name: 'Monthly SLA Compliance', type: 'PDF', date: 'May 31, 2026', size: '2.4 MB', status: 'Generated' },
  { id: 'RPT-26-04', name: 'Security Audit (Q2)', type: 'PDF', date: 'May 15, 2026', size: '8.1 MB', status: 'Generated' },
  { id: 'RPT-26-03', name: 'Cloud Spend Analysis', type: 'CSV', date: 'May 01, 2026', size: '1.2 MB', status: 'Generated' },
  { id: 'RPT-26-02', name: 'Incident RCA Log', type: 'JSON', date: 'Apr 28, 2026', size: '4.5 KB', status: 'Generated' },
  { id: 'RPT-26-01', name: 'Performance Benchmarks', type: 'PDF', date: 'Apr 10, 2026', size: '5.6 MB', status: 'Failed' },
];

export const DevOpsReports: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <FilePieChart className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-wide">Reporting & Analytics</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">System performance, compliance, and cost reports</p>
          </div>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Gen Cards */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">SLA / SLO Compliance</h3>
          <p className="text-sm text-slate-400 font-medium">Generate uptime and reliability metrics for executive review.</p>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-4 text-rose-400 group-hover:scale-110 transition-transform">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Incident Audit Trail</h3>
          <p className="text-sm text-slate-400 font-medium">Compile all critical incident timelines and post-mortems.</p>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4 text-amber-400 group-hover:scale-110 transition-transform">
            <FileSearch className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Cost Optimization</h3>
          <p className="text-sm text-slate-400 font-medium">Identify idle resources and multi-cloud spending trends.</p>
        </div>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/50">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-400" />
            Report Archive
          </h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-all flex items-center gap-2 text-sm border border-slate-700">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full sm:w-64 bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Report ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Format</th>
                <th className="p-4">Date Generated</th>
                <th className="p-4">Size</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6 font-mono font-bold text-slate-400 text-xs">{report.id}</td>
                  <td className="p-4 font-bold text-white text-sm flex items-center gap-2">
                    {report.type === 'PDF' ? <FileText className="w-4 h-4 text-rose-400" /> : <FileJson className="w-4 h-4 text-amber-400" />}
                    {report.name}
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded">
                      {report.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-400">{report.date}</td>
                  <td className="p-4 text-sm font-medium text-slate-400">{report.size}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      report.status === 'Generated' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {report.status === 'Generated' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button 
                      disabled={report.status !== 'Generated'}
                      className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400" 
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
