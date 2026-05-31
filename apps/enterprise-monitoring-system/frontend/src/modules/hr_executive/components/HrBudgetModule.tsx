import React from 'react';
import { motion } from 'framer-motion';
import { 
  IndianRupee, TrendingUp, Zap, Target, Activity, CheckCircle2, AlertTriangle 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface HrBudgetModuleProps {
  isDark: boolean;
}

export const HrBudgetModule: React.FC<HrBudgetModuleProps> = ({ isDark }) => {
  const budgetData = [
    { department: 'Engineering', allocated: 45000000, spent: 28000000, hiring: 5000000, training: 1200000, roi: 4.8 },
    { department: 'Sales', allocated: 32000000, spent: 18000000, hiring: 3000000, training: 2500000, roi: 3.2 },
    { department: 'Marketing', allocated: 24000000, spent: 16000000, hiring: 2000000, training: 800000, roi: 2.9 },
    { department: 'Support', allocated: 18000000, spent: 12000000, hiring: 4000000, training: 1500000, roi: 3.8 },
    { department: 'HR & Admin', allocated: 12000000, spent: 8000000, hiring: 1000000, training: 500000, roi: 2.1 }
  ];

  const formatINR = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    return `₹${(value / 1000).toFixed(0)}k`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 skeuo-panel p-6 rounded-[32px]">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            Budget Intelligence Command
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Telemetry Active
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
            Enterprise budget forecasting, utilization tracking, and AI-driven resource allocation.
          </p>
        </div>

        <button
          onClick={() => {
            alert('Synchronizing financial ledgers with ERP systems...');
          }}
          className="flex items-center gap-2 px-6 py-3.5 skeuo-btn hover:scale-105 transition-all duration-300 w-fit"
        >
          <IndianRupee className="w-4 h-4" />
          <span>Sync Ledgers</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Allocated', value: '₹13.1 Cr', change: 'Enterprise FY26 Budget', icon: Target, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
          { label: 'Real-time Spend', value: '₹8.2 Cr', change: '62.5% Utilized', icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
          { label: 'Avg Hiring Cost', value: '₹45k', change: '-12% vs last quarter', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
          { label: 'Workforce ROI', value: '4.2x', change: 'Top quartile industry avg', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className={`p-6 rounded-[32px] skeuo-panel transition-all duration-300 hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{m.label}</span>
                <div className={`p-3 rounded-2xl skeuo-btn ${m.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-4xl font-extrabold font-display text-slate-900 dark:text-white mb-2">{m.value}</div>
              <div className={`text-xs font-bold ${m.color} flex items-center gap-1`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>{m.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Chart */}
        <div className={`lg:col-span-8 rounded-[32px] skeuo-panel p-6 transition-all duration-500`}>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <Activity className="w-5 h-5 text-blue-400" />
            <span>Departmental Budget Utilization</span>
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} opacity={0.5} />
                <XAxis dataKey="department" stroke={isDark ? "#94a3b8" : "#64748b"} />
                <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} tickFormatter={(value) => `₹${value/10000000}Cr`} />
                <Tooltip 
                  formatter={(value: number) => formatINR(value)}
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#fff', borderColor: isDark ? '#334155' : '#e2e8f0', borderRadius: '1rem', color: isDark ? '#fff' : '#0f172a' }}
                />
                <Legend />
                <Bar dataKey="allocated" name="Allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" name="Spent" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: AI Insights */}
        <div className={`lg:col-span-4 rounded-[32px] skeuo-panel p-6 transition-all duration-500`}>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <Zap className="w-5 h-5 text-purple-400 animate-pulse" />
            <span>AI Prescriptive Budgets</span>
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Reallocate Training Budget', desc: 'Sales department training ROI is dropping. Recommend shifting 15% (₹3.75L) to Engineering upskilling.', type: 'warning', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
              { title: 'Hiring Cost Optimization', desc: 'Support tier 1 hiring costs are 12% above industry median. AI suggests implementing automated ATS screening.', type: 'alert', icon: TrendingUp, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
              { title: 'Exceptional ROI Detected', desc: 'Engineering department yielding 4.8x ROI on Q1 hires. Flagged for budget expansion in Q3.', type: 'positive', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            ].map((insight, idx) => {
              const InsightIcon = insight.icon;
              return (
                <div key={idx} className={`p-4 rounded-2xl skeuo-btn flex items-start gap-3`}>
                  <div className="p-2 rounded-xl skeuo-inset shrink-0">
                    <InsightIcon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{insight.title}</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{insight.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className={`rounded-[32px] skeuo-panel p-6`}>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-emerald-400" />
          Enterprise Telemetry Matrix
        </h3>
        <div className="overflow-x-auto rounded-2xl skeuo-inset">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`₹${isDark ? 'bg-black/40' : 'bg-slate-50'} border-b ${isDark ? 'border-white/10' : 'border-slate-200'} text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider`}>
                <th className="p-4">Department</th>
                <th className="p-4">Allocated</th>
                <th className="p-4">Spent</th>
                <th className="p-4">Hiring Cost</th>
                <th className="p-4">Training Cost</th>
                <th className="p-4">Forecast Risk</th>
                <th className="p-4">Est. ROI</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'} text-xs font-medium`}>
              {budgetData.map(row => (
                <tr key={row.department} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{row.department}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{formatINR(row.allocated)}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{formatINR(row.spent)}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{formatINR(row.hiring)}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{formatINR(row.training)}</td>
                  <td className="p-4">
                    {row.spent / row.allocated > 0.6 ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide skeuo-panel text-amber-500">Elevated</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide skeuo-panel text-emerald-500">Optimal</span>
                    )}
                  </td>
                  <td className="p-4 text-blue-500 font-bold">{row.roi}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
