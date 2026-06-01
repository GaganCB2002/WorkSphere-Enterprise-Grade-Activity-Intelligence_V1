import React from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Clock, CheckCircle2, AlertOctagon, BrainCircuit, 
  TrendingDown, TrendingUp, Users, UserMinus, ShieldAlert, BookOpen } from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { LMSView } from '../../hr/components/LMSView';


interface HrLeaveApprovalsModuleProps {
  isDark: boolean;
}

const leaveTrendsData = [
  { name: 'Mon', sick: 4, vacation: 12, unpaid: 2, threshold: 25 },
  { name: 'Tue', sick: 5, vacation: 14, unpaid: 1, threshold: 25 },
  { name: 'Wed', sick: 8, vacation: 15, unpaid: 3, threshold: 25 },
  { name: 'Thu', sick: 12, vacation: 18, unpaid: 2, threshold: 25 },
  { name: 'Fri', sick: 15, vacation: 25, unpaid: 4, threshold: 25 },
  { name: 'Sat', sick: 3, vacation: 5, unpaid: 0, threshold: 10 },
  { name: 'Sun', sick: 2, vacation: 4, unpaid: 0, threshold: 10 },
];

const leaveRequestsMatrix = [
  { id: 'LR-8092', employee: 'Sarah Jenkins', dept: 'Frontend Core', type: 'Annual Leave', duration: '5 Days', dates: 'Oct 12 - Oct 16', status: 'Pending', aiRisk: 'Low', score: 92 },
  { id: 'LR-8093', employee: 'Marcus Chen', dept: 'Cloud Infra', type: 'Sick Leave', duration: '2 Days', dates: 'Oct 10 - Oct 11', status: 'Auto-Approved', aiRisk: 'Low', score: 98 },
  { id: 'LR-8094', employee: 'David Kim', dept: 'Security Ops', type: 'Sabbatical', duration: '30 Days', dates: 'Nov 1 - Nov 30', status: 'High Risk', aiRisk: 'Critical', score: 42 },
  { id: 'LR-8095', employee: 'Elena Rostova', dept: 'Enterprise Sales', type: 'Maternity', duration: '90 Days', dates: 'Dec 1 - Mar 1', status: 'Pending', aiRisk: 'Medium', score: 75 },
  { id: 'LR-8096', employee: 'Dr. Arun Patel', dept: 'Data Science', type: 'Conference', duration: '4 Days', dates: 'Oct 20 - Oct 23', status: 'Auto-Approved', aiRisk: 'Low', score: 95 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Auto-Approved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    case 'Pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'High Risk': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
    case 'Rejected': return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    case 'training': return <LMSView />;
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'Low': return 'text-emerald-500';
    case 'Medium': return 'text-amber-500';
    case 'Critical': return 'text-rose-500';
    case 'training': return <LMSView />;
      default: return 'text-slate-500';
  }
};

export const HrLeaveApprovalsModule: React.FC<HrLeaveApprovalsModuleProps> = ({ isDark }) => {
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
                <CalendarClock className="w-5 h-5" />
              </div>
              <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Leave Approvals Command
              </h2>
            </div>
            <p className={`text-sm font-semibold max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Enterprise absence telemetry, AI overlap detection, and capacity planning.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all skeuo-btn`}>
              Policy Settings
            </button>
            <button className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all skeuo-btn`}>
              <CheckCircle2 className="w-4 h-4" />
              Batch Approve Safe
            </button>
          </div>
        </div>
      </div>

      {/* KPI METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Pending Approvals', value: '124', trend: '+15', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500' },
          { title: 'High-Risk Leaves', value: '12', trend: '+3', icon: AlertOctagon, color: 'text-rose-500', bg: 'bg-rose-500' },
          { title: 'Approved Rate', value: '94%', trend: '+1.2%', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500' },
          { title: 'Available Coverage', value: '88%', trend: '-2.4%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500' }
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
                  ? (kpi.title.includes('Risk') || kpi.title.includes('Pending') ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20')
                  : (kpi.title.includes('Coverage') ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20')
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
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Weekly Leave Trajectory</h3>
              <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Approved leaves vs Organizational Thresholds</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <div className="w-2 h-2 rounded-full bg-rose-500" /> Threshold
              </span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leaveTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSick" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVacation" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUnpaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area type="monotone" dataKey="threshold" name="Capacity Threshold" stroke="#f43f5e" strokeDasharray="5 5" fill="none" />
                <Area type="monotone" dataKey="vacation" name="Vacation" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVacation)" stackId="1" />
                <Area type="monotone" dataKey="sick" name="Sick Leave" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorSick)" stackId="1" />
                <Area type="monotone" dataKey="unpaid" name="Unpaid/Other" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorUnpaid)" stackId="1" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI PANEL */}
        <div className={`p-6 md:p-8 rounded-[32px] skeuo-panel relative overflow-hidden transition-all duration-500 flex flex-col`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BrainCircuit className="w-32 h-32" />
          </div>
          
          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl skeuo-btn flex items-center justify-center text-rose-500">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>AuraHR Predictor</h3>
              <p className={`text-xs font-semibold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>Coverage Risk Assessment</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 relative z-10">
            <div className={`p-4 rounded-2xl skeuo-btn text-left`}>
              <div className="flex gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Critical Overlap Detected</h4>
                  <p className={`text-xs font-medium mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Security Ops: David Kim (Sabbatical) overlaps with 2 other senior analysts in Nov. Approving LR-8094 leaves Security Ops below minimum SLA coverage.
                  </p>
                  <button className="mt-3 text-xs font-bold text-rose-500 hover:text-rose-400 flex items-center gap-1">
                    Review Constraints <TrendingDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl skeuo-btn text-left`}>
              <div className="flex gap-3">
                <UserMinus className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Safe to Approve</h4>
                  <p className={`text-xs font-medium mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Frontend Core: Sarah Jenkins (LR-8092) requested 5 days. Team has 88% active capacity. Auto-approval recommended.
                  </p>
                  <button className="mt-3 text-xs font-bold text-emerald-500 hover:text-emerald-600 flex items-center gap-1">
                    Auto-Approve Batch <TrendingUp className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MATRIX SECTION */}
      <div className={`p-6 md:p-8 rounded-[32px] skeuo-panel transition-all duration-500 overflow-x-auto`}>
        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Leave Requests Matrix</h3>
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className={`border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Request ID</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Employee</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Department</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Leave Type</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Duration</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>AI Risk Score</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Status</th>
              <th className={`pb-4 px-4 text-xs font-black uppercase tracking-wider text-right ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Action</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-200'}`}>
            {leaveRequestsMatrix.map((request, idx) => (
              <tr key={idx} className={`group transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                <td className="py-4 px-4">
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{request.id}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{request.employee}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{request.dept}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{request.type}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{request.duration}</span>
                    <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{request.dates}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-bold ${getRiskColor(request.aiRisk)}`}>{request.aiRisk}</span>
                    <div className={`h-1.5 w-24 rounded-full overflow-hidden skeuo-inset`}>
                      <div 
                        className={`h-full ${request.score < 50 ? 'bg-rose-500' : request.score < 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${request.score}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 skeuo-panel ${request.status === 'Auto-Approved' ? 'text-emerald-500' : request.status === 'High Risk' ? 'text-rose-500' : request.status === 'Pending' ? 'text-amber-500' : 'text-slate-500'}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    {request.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className={`px-4 py-2 rounded-xl text-xs font-bold transition-all skeuo-btn text-indigo-500`}>
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
