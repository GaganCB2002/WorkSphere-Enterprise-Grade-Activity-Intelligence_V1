import React from 'react';
import { Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const teamMembers = [
  { name: 'Sarah Jenkins', role: 'Campaign Manager', tasks: 12, utilization: 85, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Mike Ross', role: 'Performance Marketer', tasks: 8, utilization: 65, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
  { name: 'Alex Rivera', role: 'Content Strategist', tasks: 15, utilization: 95, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
];

const activeTasks = [
  { title: 'Draft Q4 Messaging Brief', assignee: 'Alex Rivera', deadline: 'Today', status: 'In Progress' },
  { title: 'Optimize Google Ads Bidding', assignee: 'Mike Ross', deadline: 'Tomorrow', status: 'Pending' },
  { title: 'Launch Holiday Promo Email', assignee: 'Sarah Jenkins', deadline: 'Oct 28', status: 'Review' },
];

export const TeamCollaboration: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Team Collaboration</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Manage marketing resources, workloads, and active tasks.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Active Members</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">12</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Tasks Completed (30d)</p>
          <p className="text-3xl font-bold text-[#10b981] dark:text-emerald-400 mb-2">145</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Overdue Tasks</p>
          <p className="text-3xl font-bold text-rose-500 mb-2">3</p>
        </div>
        <div className="bg-[#f0f6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-900/50 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#0d47a1] dark:text-blue-400 mb-4">Avg. Team Utilization</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">82%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Team Workload</h2>
          <div className="space-y-6">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border border-[#e2e8f0] dark:border-slate-800 object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-[#0f172a] dark:text-slate-100">{member.name}</h3>
                    <span className="text-xs font-bold text-[#475569] dark:text-slate-300">{member.utilization}%</span>
                  </div>
                  <p className="text-[10px] font-semibold text-[#64748b] dark:text-slate-400 uppercase tracking-wider mb-2">{member.role}</p>
                  <div className="h-1.5 w-full bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${member.utilization > 90 ? 'bg-rose-500' : member.utilization > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `₹${member.utilization}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Active Marketing Tasks</h2>
          <div className="space-y-3">
            {activeTasks.map((task, idx) => (
              <div key={idx} className="p-4 border border-[#e2e8f0] dark:border-slate-800 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a] dark:text-slate-100 mb-1">{task.title}</h4>
                  <p className="text-xs text-[#64748b] dark:text-slate-400 font-semibold">Assignee: {task.assignee}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                    task.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 
                    task.status === 'Review' ? 'bg-purple-50 text-purple-600' : 
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {task.status}
                  </span>
                  <p className="text-xs font-bold text-rose-500 mt-2">{task.deadline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
