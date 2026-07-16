import React from 'react';
import {
  Users, Briefcase, CheckCircle2, Clock, 
  BarChart3, Calendar, MoreVertical, TrendingUp,
  AlertCircle, Activity, Search, ChevronDown, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

const trendData = [
  { name: 'WK 14', value: 65 },
  { name: 'WK 15', value: 72 },
  { name: 'WK 16', value: 68 },
  { name: 'WK 17', value: 85 },
  { name: 'WK 18', value: 78 },
  { name: 'WK 19', value: 92 },
];

const allocationData = [
  { name: 'Engineering', value: 40, color: '#9b593e' },
  { name: 'Design', value: 30, color: '#c27650' },
  { name: 'Marketing', value: 20, color: '#e6dcd2' },
  { name: 'Other', value: 10, color: '#faf5ee' },
];

export const DashboardOverview: React.FC<{ user: any, platform: any }> = ({ user }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* ── Page Header ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="font-headline text-4xl text-[#3a302a] tracking-tight">Sahara Command</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input 
              type="text" 
              placeholder="Search Command Center..." 
              className="w-full bg-surface border border-outline-variant rounded-lg py-2 pl-9 pr-4 text-sm text-on-surface focus:border-[#9b593e] outline-none transition-colors shadow-soft"
            />
          </div>
          <button className="px-4 py-2 bg-[#9b593e] hover:bg-[#8a4a33] text-white rounded-lg text-sm font-bold transition-colors shadow-warm shrink-0">
            Quick Actions
          </button>
        </div>
      </div>

      {/* ── KPI Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Total Employees</p>
          <p className="text-2xl font-headline text-[#3a302a] mb-1">4,250</p>
          <span className="text-[11px] font-bold text-[#5b8c63]">+12%</span>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Active Projects</p>
          <p className="text-2xl font-headline text-[#3a302a] mb-1">84</p>
          <span className="text-[11px] font-bold text-outline">Stable</span>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Pending Tasks</p>
          <p className="text-2xl font-headline text-[#9b593e] mb-1">1.2k</p>
          <span className="text-[11px] font-bold text-[#d47070]">Critical</span>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Productivity</p>
          <p className="text-2xl font-headline text-[#3a302a] mb-2">92%</p>
          <div className="h-1.5 bg-[#eae2da] rounded-full overflow-hidden">
            <div className="h-full bg-[#5b8c63]" style={{ width: '92%' }}></div>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Attendance</p>
          <p className="text-2xl font-headline text-[#3a302a] mb-1">98.5%</p>
          <span className="text-[11px] font-bold text-[#5b8c63]">Optimal</span>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Utilization</p>
          <p className="text-2xl font-headline text-[#3a302a] mb-1">88%</p>
          <span className="text-[11px] font-bold text-[#c88d40]">Active</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── Left Main Area ───────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Team Productivity Trend */}
          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl text-[#3a302a] font-bold">Team Productivity Trend</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded text-xs font-bold text-on-surface hover:bg-surface-variant transition-colors">
                Last 6 Weeks <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eae2da" />
                  <XAxis dataKey="name" stroke="#8a7d70" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8a7d70" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#faf5ee' }}
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e6dcd2', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                  />
                  <Bar dataKey="value" fill="#9b593e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Efficiency Heatmap */}
            <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline text-lg text-[#3a302a] font-bold">Efficiency Heatmap (24h)</h3>
              </div>
              <div className="grid grid-cols-12 gap-1 h-32">
                 {/* Generate some dummy heatmap blocks */}
                 {Array.from({ length: 96 }).map((_, i) => {
                   const val = ((i * 13) % 100) / 100;
                   let bg = 'bg-[#eae2da]';
                   if (val > 0.8) bg = 'bg-[#9b593e]';
                   else if (val > 0.5) bg = 'bg-[#c27650]';
                   else if (val > 0.2) bg = 'bg-[#e6dcd2]';
                   return <div key={i} className={`rounded-sm ${bg}`}></div>
                 })}
              </div>
              <div className="flex items-center justify-between mt-4 text-[10px] font-bold uppercase tracking-widest text-outline">
                <span>00:00</span>
                <span>12:00</span>
                <span>23:59</span>
              </div>
            </div>

            {/* Sprint Progress */}
            <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline text-lg text-[#3a302a] font-bold">Sprint Progress</h3>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-on-surface">Horizon Cloud Migration</span>
                    <span className="text-xs font-bold text-[#3a302a]">72%</span>
                  </div>
                  <div className="h-2 bg-[#eae2da] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9b593e]" style={{ width: '72%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-on-surface">AI Integration Framework</span>
                    <span className="text-xs font-bold text-[#3a302a]">45%</span>
                  </div>
                  <div className="h-2 bg-[#eae2da] rounded-full overflow-hidden">
                    <div className="h-full bg-[#c27650]" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-on-surface">Customer Success Portal</span>
                    <span className="text-xs font-bold text-[#3a302a]">89%</span>
                  </div>
                  <div className="h-2 bg-[#eae2da] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5b8c63]" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Right Sidebar Area ────────────────────────── */}
        <div className="space-y-8">
          
          {/* Resource Allocation */}
          <div className="bg-[#FAF6F0] border border-outline-variant rounded-xl p-6 shadow-soft relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-[#9b593e]"></div>
             <h2 className="font-headline text-xl text-[#3a302a] font-bold mb-6">Resource Allocation</h2>
             
             <div className="relative h-48 mb-6">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={allocationData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                     {allocationData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                   </Pie>
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-3xl font-headline text-[#3a302a]">88%</p>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-outline">Total Cap</p>
               </div>
             </div>

             <div className="space-y-3">
               {allocationData.map(item => (
                 <div key={item.name} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                     <span className="font-semibold text-on-surface-variant">{item.name}</span>
                   </div>
                   <span className="font-bold text-[#3a302a]">{item.value}%</span>
                 </div>
               ))}
             </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
            <h2 className="font-headline text-xl text-[#3a302a] font-bold mb-6">Recent Activity</h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#e6dcd2] before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#FAF6F0] text-[#c27650] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-outline-variant p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[#3a302a]">New Approval Required</h4>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-2">Marketing budget Q4 reallocation.</p>
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider">10 min ago</span>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#FAF6F0] text-[#5b8c63] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-outline-variant p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[#3a302a]">Leave Request Approved</h4>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-2">Sarah Chen (DevOps) - 3 days.</p>
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider">2 hrs ago</span>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#FAF6F0] text-[#9b593e] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-outline-variant p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[#3a302a]">Project Milestone Reached</h4>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-2">Horizon Cloud Phase 1 completed.</p>
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Yesterday</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
