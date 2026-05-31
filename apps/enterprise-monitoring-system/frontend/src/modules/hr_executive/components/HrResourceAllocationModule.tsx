import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserCheck, UserX, AlertTriangle, Cpu, TrendingUp, Layers, 
  BarChart3, RefreshCw, Zap, Briefcase, Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar 
} from 'recharts';

interface HrResourceAllocationModuleProps {
  isDark: boolean;
}

const workloadData = [
  { name: 'Engineering', capacity: 150, allocated: 142, optimal: 130 },
  { name: 'Sales', capacity: 85, allocated: 80, optimal: 75 },
  { name: 'Marketing', capacity: 45, allocated: 38, optimal: 40 },
  { name: 'Product', capacity: 60, allocated: 65, optimal: 50 },
  { name: 'Support', capacity: 120, allocated: 110, optimal: 110 },
  { name: 'Finance', capacity: 25, allocated: 22, optimal: 25 },
];

const teamMatrix = [
  { id: 'T-101', name: 'Cloud Infra', head: 'Marcus Chen', size: 14, projects: 3, utilization: 112, status: 'Overloaded', trend: 'up' },
  { id: 'T-102', name: 'Frontend Core', head: 'Sarah Jenkins', size: 22, projects: 5, utilization: 88, status: 'Optimal', trend: 'stable' },
  { id: 'T-103', name: 'Data Science', head: 'Dr. Arun Patel', size: 18, projects: 2, utilization: 65, status: 'Underutilized', trend: 'down' },
  { id: 'T-104', name: 'Enterprise Sales', head: 'Elena Rostova', size: 45, projects: 12, utilization: 94, status: 'Optimal', trend: 'up' },
  { id: 'T-105', name: 'Security Ops', head: 'David Kim', size: 12, projects: 4, utilization: 125, status: 'Critical', trend: 'up' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Optimal': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    case 'Overloaded': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'Critical': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
    case 'Underutilized': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  }
};

export const HrResourceAllocationModule: React.FC<HrResourceAllocationModuleProps> = ({ isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* HEADER SECTION */}
      <div className={`p-6 md:p-8 rounded-[32px] skeuo-panel relative overflow-hidden transition-all duration-500`}>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                <Layers className="w-5 h-5" />
              </div>
              <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Resource Allocation Command
              </h2>
            </div>
            <p className={`text-sm font-semibold max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Enterprise workforce capacity, utilization telemetry, and AI-driven load balancing.
            </p>
          </div>
          
          <button className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all skeuo-btn`}>
            <RefreshCw className="w-4 h-4" />
            Sync Telemetry
          </button>
        </div>
      </div>

      {/* KPI METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Capacity', value: '485', trend: '+12', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500' },
          { title: 'Active Deployment', value: '88%', trend: '+2.4%', icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-500' },
          { title: 'Bench Strength', value: '42', trend: '-5', icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-500' },
          { title: 'Over-Utilization Risk', value: '18%', trend: '+4%', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500' }
        ].map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`p-6 rounded-3xl skeuo-panel transition-all duration-300 relative overflow-hidden group`}
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-2xl skeuo-btn ${kpi.color}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                kpi.trend.startsWith('+') 
                  ? (kpi.title.includes('Risk') ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20')
                  : (kpi.title.includes('Bench') ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20')
              }`}>
                {kpi.trend}
              </span>
            </div>
            <div className="relative z-10">
              <h4 className={`text-3xl font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpi.value}</h4>
              <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{kpi.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART SECTION */}
        <div className={`lg:col-span-2 p-6 md:p-8 rounded-[32px] skeuo-panel transition-all duration-500`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Departmental Utilization</h3>
              <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Capacity vs. Actual Load</p>
            </div>
            <div className={`p-2 rounded-xl skeuo-btn`}>
              <BarChart3 className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    borderRadius: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
                <Bar dataKey="capacity" name="Total Capacity" fill={isDark ? '#334155' : '#cbd5e1'} radius={[4, 4, 0, 0]} />
                <Bar dataKey="optimal" name="Optimal Load" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="allocated" name="Actual Allocated" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI PANEL */}
        <div className={`p-6 md:p-8 rounded-[32px] skeuo-panel relative overflow-hidden transition-all duration-500 flex flex-col`}>
          
          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl skeuo-btn flex items-center justify-center text-purple-500">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>AuraHR Engine</h3>
              <p className={`text-xs font-semibold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>AI Load Balancer</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 relative z-10">
            <div className={`p-4 rounded-2xl skeuo-btn text-left`}>
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Critical Burnout Risk</h4>
                  <p className={`text-xs font-medium mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Security Ops (T-105) is operating at 125% utilization. Recommend shifting 2 engineers from Data Science bench immediately.
                  </p>
                  <button className="mt-3 text-xs font-bold text-rose-500 hover:text-rose-400 flex items-center gap-1">
                    Execute Transfer <TrendingUp className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl skeuo-btn text-left`}>
              <div className="flex gap-3">
                <Zap className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Optimal Shift Available</h4>
                  <p className={`text-xs font-medium mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Data Science team has 65% utilization. 4 resources are ready for cross-functional deployment to Product Engineering.
                  </p>
                  <button className="mt-3 text-xs font-bold text-emerald-500 hover:text-emerald-600 flex items-center gap-1">
                    Review Resources <TrendingUp className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MATRIX SECTION */}
      <div className={`p-6 md:p-8 rounded-[32px] skeuo-panel transition-all duration-500 overflow-x-auto`}>
        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Team Workload Matrix</h3>
        <table className="w-full min-w-[800px] text-left">
          <thead>
            <tr className={`border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Team ID</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Department</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Lead</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Size</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Active Projects</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Utilization</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-200'}`}>
            {teamMatrix.map((team, idx) => (
              <tr key={idx} className={`group transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                <td className="py-4 px-4">
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{team.id}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{team.name}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{team.head}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{team.size}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{team.projects}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{team.utilization}%</span>
                    <div className={`h-1.5 w-24 rounded-full overflow-hidden skeuo-inset`}>
                      <div 
                        className={`h-full ${team.utilization > 100 ? 'bg-rose-500' : team.utilization < 70 ? 'bg-blue-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.min(team.utilization, 100)}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 skeuo-panel ${team.status === 'Optimal' ? 'text-emerald-500' : team.status === 'Overloaded' ? 'text-amber-500' : team.status === 'Critical' ? 'text-rose-500' : 'text-blue-500'}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    {team.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
