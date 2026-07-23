// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, BarChart3, PieChart, TrendingUp, Download as DownloadIcon, FileSpreadsheet, FileCog } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line, AreaChart, Area } from 'recharts';

export const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/reports')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-2 gap-4"><div className="h-48" /><div className="h-48" /></div></div>;

  const reports = data?.reports || [
    { id: 1, name: 'Sprint Velocity Report', description: 'Track committed vs completed story points across sprints', icon: TrendingUp, formats: ['CSV', 'Excel', 'PDF'] },
    { id: 2, name: 'Code Quality Report', description: 'SonarQube metrics, code coverage, and quality gate status', icon: BarChart3, formats: ['CSV', 'Excel', 'PDF'] },
    { id: 3, name: 'Team Productivity Report', description: 'Individual and team productivity metrics over time', icon: TrendingUp, formats: ['CSV', 'Excel'] },
    { id: 4, name: 'Bug Resolution Report', description: 'Bug tracking metrics, resolution time, and severity distribution', icon: PieChart, formats: ['CSV', 'Excel', 'PDF'] },
    { id: 5, name: 'Deployment Frequency Report', description: 'Deployment cadence, success rate, and rollback analysis', icon: FileText, formats: ['CSV', 'Excel'] },
    { id: 6, name: 'Test Coverage Report', description: 'Unit, integration, and E2E test coverage across modules', icon: BarChart3, formats: ['CSV', 'Excel', 'PDF'] },
    { id: 7, name: 'Technical Debt Report', description: 'Debt ratio, hotspots, and estimated remediation effort', icon: FileText, formats: ['CSV', 'Excel'] },
    { id: 8, name: 'PR Cycle Time Report', description: 'Pull request lifecycle metrics from open to merge', icon: TrendingUp, formats: ['CSV', 'Excel', 'PDF'] },
  ];

  const [selectedReport, setSelectedReport] = useState(reports[0]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><FileText className="w-6 h-6 text-indigo-400" /> Reports</h1>
          <p className="text-xs text-slate-400 mt-0.5">{reports.length} available reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          {reports.map((r, idx) => (
            <motion.button key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}
              onClick={() => setSelectedReport(r)}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${selectedReport.id === r.id ? 'bg-indigo-600/10 border-indigo-500/40' : 'bg-[#0F172A]/90 border-slate-800/80 hover:border-indigo-500/30'}`}>
              <div className={`p-2 rounded-lg ${selectedReport.id === r.id ? 'bg-indigo-500/20' : 'bg-slate-800/50'}`}><r.icon className={`w-4 h-4 ${selectedReport.id === r.id ? 'text-indigo-400' : 'text-slate-400'}`} /></div>
              <div className="flex-1">
                <h3 className={`text-xs font-bold ${selectedReport.id === r.id ? 'text-white' : 'text-slate-300'}`}>{r.name}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{r.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedReport.name}</h2>
                <p className="text-xs text-slate-400">{selectedReport.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedReport.formats.map(f => (
                  <button key={f} className="flex items-center gap-1 px-3 py-1.5 bg-[#1E293B] hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-700"><Download className="w-3 h-3" />{f}</button>
                ))}
              </div>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ month: 'Feb', value: 85 }, { month: 'Mar', value: 92 }, { month: 'Apr', value: 88 }, { month: 'May', value: 95 }, { month: 'Jun', value: 90 }, { month: 'Jul', value: 94 }]} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="value" name="Score" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
