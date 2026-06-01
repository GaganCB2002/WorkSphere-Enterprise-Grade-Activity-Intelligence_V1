import React from 'react';
import { GitBranch, Play, RotateCcw, CheckCircle, XCircle, Clock, FastForward, BookOpen } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LMSView } from '../../hr/components/LMSView';


const mockBuildData = [
  { day: 'Mon', success: 42, failed: 2, duration: 4.2 },
  { day: 'Tue', success: 48, failed: 1, duration: 3.8 },
  { day: 'Wed', success: 51, failed: 4, duration: 4.5 },
  { day: 'Thu', success: 39, failed: 0, duration: 3.2 },
  { day: 'Fri', success: 62, failed: 3, duration: 5.1 },
  { day: 'Sat', success: 12, failed: 0, duration: 2.8 },
  { day: 'Sun', success: 8, failed: 1, duration: 2.9 },
];

const mockPipelines = [
  { id: 'auth-service-deploy', branch: 'main', commit: '7f8a9b2', status: 'Success', time: '10 mins ago', duration: '3m 42s' },
  { id: 'payment-api-release', branch: 'release-1.2', commit: '3c4d5e6', status: 'Running', time: 'Just now', duration: '1m 12s' },
  { id: 'frontend-dashboard', branch: 'feat/devops-ui', commit: '1a2b3c4', status: 'Failed', time: '1 hour ago', duration: '4m 05s' },
  { id: 'notification-worker', branch: 'main', commit: '9f8e7d6', status: 'Success', time: '3 hours ago', duration: '2m 15s' },
];

export const CicdDashboard: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-bold text-white tracking-wide">CI/CD Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Pipeline Overview */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white mb-1">Pipeline Overview</h3>
            <p className="text-xs text-slate-400 mb-4">Total active deployment jobs</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-center">
              <span className="block text-3xl font-black text-white mb-1">128</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total</span>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-center">
              <span className="block text-3xl font-black text-blue-400 mb-1">3</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Running</span>
            </div>
          </div>
          
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-center mb-4">
            <span className="block text-3xl font-black text-rose-400 mb-1">4</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Failed</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto">
            <button className="flex items-center justify-center gap-2 p-3 bg-brand/10 hover:bg-brand/20 text-brand rounded-xl text-xs font-bold transition-colors">
              <Play className="w-4 h-4" /> Trigger Build
            </button>
            <button className="flex items-center justify-center gap-2 p-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold transition-colors">
              <RotateCcw className="w-4 h-4" /> Rollback
            </button>
          </div>
        </div>

        {/* Build Analytics */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-white mb-1">Build & Deployment Analytics</h3>
              <p className="text-xs text-slate-400">Weekly success rate vs build duration</p>
            </div>
            <div className="text-right">
              <span className="block text-lg font-black text-emerald-400">96.8%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Success Rate</span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockBuildData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar yAxisId="left" dataKey="success" name="Successful Builds" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar yAxisId="left" dataKey="failed" name="Failed Builds" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar yAxisId="right" dataKey="duration" name="Avg Duration (m)" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Active Pipelines */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-5 overflow-hidden">
        <h3 className="font-bold text-white mb-4">Recent Pipelines</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="p-3">Pipeline</th>
                <th className="p-3">Branch / Commit</th>
                <th className="p-3">Status</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Time</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockPipelines.map((pipeline) => (
                <tr key={pipeline.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-bold text-white text-sm">{pipeline.id}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded font-mono">{pipeline.branch}</span>
                      <span className="text-slate-500 font-mono">{pipeline.commit}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      pipeline.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      pipeline.status === 'Running' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {pipeline.status === 'Success' ? <CheckCircle className="w-3 h-3" /> : 
                       pipeline.status === 'Running' ? <FastForward className="w-3 h-3 animate-pulse" /> : 
                       <XCircle className="w-3 h-3" />}
                      {pipeline.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Clock className="w-3 h-3" /> {pipeline.duration}
                    </div>
                  </td>
                  <td className="p-3 text-xs text-slate-400">{pipeline.time}</td>
                  <td className="p-3 text-right">
                    <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded transition-colors">
                      Logs
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
