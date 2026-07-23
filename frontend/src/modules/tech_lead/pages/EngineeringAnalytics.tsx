// @ts-nocheck
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingDown, TrendingUp, Cpu, Users, Target, ShieldAlert
} from 'lucide-react';

const throughputData = [
  { week: 'W1', pts: 45 }, { week: 'W2', pts: 52 }, 
  { week: 'W3', pts: 48 }, { week: 'W4', pts: 61 }
];

const debtData = [
  { name: 'Frontend', value: 40 },
  { name: 'Backend API', value: 30 },
  { name: 'Database', value: 20 },
  { name: 'Infra', value: 10 }
];

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'];

export const EngineeringAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-indigo-500" /> Engineering Analytics
          </h1>
          <p className="text-sm text-[#8b949e] mt-1">Deep insights into team efficiency, code quality, and technical debt.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-[#8b949e] uppercase">Cycle Time</h3>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-100">2.4 <span className="text-sm text-slate-400 font-medium">days</span></p>
          <p className="text-xs text-emerald-400 font-bold mt-1">-0.3 days vs last sprint</p>
        </div>
        
        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-[#8b949e] uppercase">PR Merge Rate</h3>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-100">92<span className="text-sm text-slate-400 font-medium">%</span></p>
          <p className="text-xs text-indigo-400 font-bold mt-1">Consistent with average</p>
        </div>

        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-[#8b949e] uppercase">Bug Escapement</h3>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-100">4.1<span className="text-sm text-slate-400 font-medium">%</span></p>
          <p className="text-xs text-rose-400 font-bold mt-1">+1.2% this month</p>
        </div>

        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-[#8b949e] uppercase">Burnout Risk</h3>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-100">High</p>
          <p className="text-xs text-amber-400 font-bold mt-1">2 members &gt; 50hrs/wk</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-6">
          <h2 className="text-sm font-bold text-slate-200 mb-6">Historical Throughput (Story Points)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
                <XAxis dataKey="week" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0E1117', borderColor: '#30363d', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="pts" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#0E1117', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-6">
          <h2 className="text-sm font-bold text-slate-200 mb-6">Technical Debt Distribution</h2>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={debtData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {debtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0E1117', borderColor: '#30363d', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {debtData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

