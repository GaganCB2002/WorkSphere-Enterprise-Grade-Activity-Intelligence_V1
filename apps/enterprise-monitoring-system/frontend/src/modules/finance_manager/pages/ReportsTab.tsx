import React, { useState } from 'react';
import { 
  FileText, Download, Play, Calendar, CheckCircle2, 
  Clock, AlertTriangle, RefreshCw, RefreshCwIcon, Filter 
} from 'lucide-react';

interface ReportArchiveItem {
  id: string;
  name: string;
  type: 'PL_STATEMENT' | 'BALANCE_SHEET' | 'CASH_FLOW' | 'AUDIT_TRAIL';
  period: string;
  generatedAt: string;
  size: string;
}

export const ReportsTab: React.FC = () => {
  const [archive, setArchive] = useState<ReportArchiveItem[]>([
    { id: 'REP-001', name: 'Q2 Profitability & Loss Statement.pdf', type: 'PL_STATEMENT', period: 'Q2 FY26', generatedAt: '2026-04-30 14:22', size: '1.8 MB' },
    { id: 'REP-002', name: 'FY25 Audited Balance Sheet.xlsx', type: 'BALANCE_SHEET', period: 'FY 24-25', generatedAt: '2025-12-15 10:05', size: '4.2 MB' },
    { id: 'REP-003', name: 'May 2026 Liquidity Cash Flow Analysis.pdf', type: 'CASH_FLOW', period: 'May 2026', generatedAt: '2026-05-01 09:12', size: '920 KB' },
    { id: 'REP-004', name: 'Q3 Board Approval Audit Trail.csv', type: 'AUDIT_TRAIL', period: 'Q3 FY26 (YTD)', generatedAt: '2026-05-24 16:30', size: '3.1 MB' },
  ]);

  const [reportType, setReportType] = useState<'PL_STATEMENT' | 'BALANCE_SHEET' | 'CASH_FLOW' | 'AUDIT_TRAIL'>('PL_STATEMENT');
  const [reportPeriod, setReportPeriod] = useState('Q3 FY26');
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (generating) return;

    setGenerating(true);
    setGenProgress(0);

    const interval = setInterval(() => {
      setGenProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const typeLabel = 
              reportType === 'PL_STATEMENT' ? 'P&L Statement' :
              reportType === 'BALANCE_SHEET' ? 'Balance Sheet' :
              reportType === 'CASH_FLOW' ? 'Cash Flow' : 'Audit Trail';
            
            const fileExt = reportType === 'BALANCE_SHEET' ? 'xlsx' : reportType === 'AUDIT_TRAIL' ? 'csv' : 'pdf';
            const newReport: ReportArchiveItem = {
              id: `REP-00${archive.length + 1}`,
              name: `${reportPeriod} Generated ${typeLabel}.${fileExt}`,
              type: reportType,
              period: reportPeriod,
              generatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
              size: '1.2 MB'
            };
            setArchive(prevArchive => [newReport, ...prevArchive]);
            setGenerating(false);
            alert(`Report "${newReport.name}" has been compiled and added to your archives.`);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleDownload = (name: string) => {
    // Simulated direct file download
    const element = document.createElement("a");
    const file = new Blob(["Treasury Report Mock Output. compiled successfully."], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Financial Reports & Exports</h1>
          <p className="text-[#8693BA] text-sm mt-1">Compile ledger records, generate P&L sheets, and archive compliance reports.</p>
        </div>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Report Compiler (Left 5 Columns) */}
        <div className="lg:col-span-5 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white border-b border-[#1D2644] pb-3 mb-4">Report Compiler</h3>
            
            <form onSubmit={handleGenerateReport} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">Statement Type</label>
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs focus:border-[#00e5ff] focus:outline-none cursor-pointer"
                >
                  <option value="PL_STATEMENT">Profit & Loss (P&L) Statement</option>
                  <option value="BALANCE_SHEET">Balance Sheet Summary</option>
                  <option value="CASH_FLOW">Cash Flow Statement</option>
                  <option value="AUDIT_TRAIL">Audit Log Trail Export</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">Reporting Period</label>
                <select 
                  value={reportPeriod}
                  onChange={(e) => setReportPeriod(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs focus:border-[#00e5ff] focus:outline-none cursor-pointer"
                >
                  <option value="Q3 FY26">Q3 FY26 (Current Quarter)</option>
                  <option value="Q2 FY26">Q2 FY26</option>
                  <option value="Q1 FY26">Q1 FY26</option>
                  <option value="FY 25-26">Full Fiscal Year 2025-2026</option>
                </select>
              </div>

              {generating ? (
                <div className="space-y-2 py-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-[#00e5ff] uppercase animate-pulse">Compiling Ledger Data...</span>
                    <span className="text-white font-mono">{genProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#1C2542] rounded-full overflow-hidden border border-[#1D2644]">
                    <div 
                      className="h-full bg-gradient-to-r from-[#7a78e9] to-[#00e5ff] rounded-full transition-all duration-300"
                      style={{ width: `${genProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button 
                  type="submit"
                  className="w-full py-3 bg-[#00e5ff] hover:bg-[#00ccf0] text-[#080B13] font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-[#080B13]" />
                  <span>Execute Compile</span>
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Report Archive Ledger (Right 7 Columns) */}
        <div className="lg:col-span-7 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-[#1D2644] pb-3">Compiled Report Archives</h3>
          
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
            {archive.map(item => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3.5 bg-[#0C101F]/80 border border-[#1C2542] rounded-2xl hover:border-[#00e5ff]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#7a78e9]/10 rounded-xl text-[#7a78e9]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <p className="text-[10px] text-[#8693BA] mt-1 font-mono">
                      {item.period} • Generated: {item.generatedAt} • Size: {item.size}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => handleDownload(item.name)}
                  className="p-2 bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] rounded-xl transition-colors border border-[#00e5ff]/20"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
