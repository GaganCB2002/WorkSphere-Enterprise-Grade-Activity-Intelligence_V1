import React, { useMemo } from 'react';
import {
  Users, Briefcase, CheckCircle2, Clock, 
  BarChart3, Calendar, MoreVertical, TrendingUp,
  AlertTriangle, PlayCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { 
  productivityTrend, teamMembers, projects, tasks, leaveRequests 
} from '../data/managerMockData';

export const DashboardOverview: React.FC<{ user: any, platform: any }> = ({ user }) => {
  const stats = useMemo(() => {
    return [
      { id: '1', label: 'Team Size', value: teamMembers.length, trend: '+2', icon: Users, color: 'indigo' },
      { id: '2', label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, trend: 'On Track', icon: Briefcase, color: 'blue' },
      { id: '3', label: 'Tasks Completed', value: tasks.filter(t => t.status === 'completed').length, trend: '+12%', icon: CheckCircle2, color: 'emerald' },
      { id: '4', label: 'Pending Approvals', value: leaveRequests.filter(l => l.status === 'pending').length, trend: 'Action Req', icon: Clock, color: 'amber' },
    ];
  }, []);

  const donutData = [
    { name: 'Present', value: 9, color: '#10b981' },
    { name: 'Remote', value: 2, color: '#6366f1' },
    { name: 'On Leave', value: 1, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ── Page Header ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Command Center</h1>
          <p className="text-sm text-[#8b949e] mt-1">Overview of team operations, workflows, and performance.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#12151f] border border-[#1e2231] rounded-xl text-[13px] font-semibold text-slate-300 hover:bg-[#1a1d27] transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* ── KPI Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.id} className="mgr-glass p-5 hover:border-indigo-500/30 mgr-card-hover group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${
                stat.trend.includes('+') || stat.trend === 'On Track' 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-amber-500/10 text-amber-400'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[12px] font-bold text-[#6b7280] uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-white tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Main Charts Row ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Productivity Trend */}
        <div className="lg:col-span-2 mgr-glass p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[14px] font-bold text-white uppercase tracking-wider">Productivity Trend</h3>
              <p className="text-[11px] text-[#6b7280] font-semibold mt-1">Team velocity vs target over 30 days</p>
            </div>
            <select className="bg-[#12151f] border border-[#1e2231] rounded-lg text-[11px] font-bold uppercase p-2 outline-none text-slate-300">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="flex-1 min-h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e2231" />
                <XAxis dataKey="label" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0c14', border: '1px solid #1e2231', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Availability Donut */}
        <div className="mgr-glass p-6 flex flex-col">
          <h3 className="text-[14px] font-bold text-white uppercase tracking-wider text-center mb-2">Today's Workforce</h3>
          <div className="flex-1 relative min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                  {donutData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0a0c14', border: '1px solid #1e2231', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-3xl font-black text-white">{teamMembers.length}</p>
              <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest mt-1">Total</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {donutData.map(item => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-[#12151f]/50 border border-[#1e2231]/50">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[12px] font-bold text-slate-300">{item.name}</span>
                </div>
                <span className="text-[13px] font-black text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Active Projects Timeline ────────────────────── */}
      <div className="mgr-glass overflow-hidden">
        <div className="p-5 border-b border-[#1e2231] flex items-center justify-between bg-[#12151f]/30">
          <div>
            <h3 className="text-[14px] font-bold text-white uppercase tracking-wider">Active Operations</h3>
            <p className="text-[11px] text-[#6b7280] font-semibold mt-1">Strategic projects currently in flight</p>
          </div>
          <button className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider hover:text-indigo-300">View All</button>
        </div>
        <div className="p-0 overflow-x-auto mgr-scrollbar">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-[#1e2231] bg-[#0a0c14]/50">
                <th className="p-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">Initiative</th>
                <th className="p-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">Priority</th>
                <th className="p-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">Progress</th>
                <th className="p-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">Team</th>
                <th className="p-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider">Deadline</th>
                <th className="p-4 text-[11px] font-bold text-[#6b7280] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2231]">
              {projects.filter(p => p.status === 'active').slice(0, 4).map((project) => (
                <tr key={project.id} className="hover:bg-[#12151f]/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${project.health === 'green' ? 'bg-emerald-500' : project.health === 'yellow' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                      <span className="text-[13px] font-bold text-slate-200">{project.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`mgr-badge ${
                      project.priority === 'critical' ? 'mgr-badge-danger' : 
                      project.priority === 'high' ? 'mgr-badge-warning' : 'mgr-badge-info'
                    }`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="p-4 w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-[#1e2231] rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="text-[11px] font-black text-slate-300 w-8">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((memberId, i) => {
                        const m = teamMembers.find(t => t.id === memberId);
                        return (
                          <div key={i} className="w-7 h-7 rounded-full bg-[#1e2231] border-2 border-[#0a0c14] flex items-center justify-center text-[10px] font-bold text-slate-300" title={m?.name}>
                            {m?.avatar || 'U'}
                          </div>
                        )
                      })}
                      {project.team.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-[#12151f] border-2 border-[#0a0c14] flex items-center justify-center text-[10px] font-bold text-slate-400">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-[12px] font-semibold text-slate-400">{project.deadline}</td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-[#6b7280] hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
