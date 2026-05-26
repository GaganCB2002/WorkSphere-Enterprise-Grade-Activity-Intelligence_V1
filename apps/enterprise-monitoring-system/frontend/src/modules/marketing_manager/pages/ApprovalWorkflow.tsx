import React from 'react';
import { Check, X, Clock, AlertTriangle, MessageSquare, ArrowUpRight } from 'lucide-react';

const approvalItems = [
  { id: 'APP-1042', title: 'Q4 Enterprise SaaS Campaign Brief', requester: 'Alex Rivera', type: 'Strategy', submitted: '2 hours ago', priority: 'High' },
  { id: 'APP-1043', title: 'Google Ads Search Copy - Nov', requester: 'Mike Ross', type: 'Ad Copy', submitted: '4 hours ago', priority: 'Medium' },
  { id: 'APP-1044', title: 'Holiday Email Template Design', requester: 'Sarah Jenkins', type: 'Creative', submitted: 'Yesterday', priority: 'Low' },
  { id: 'APP-1045', title: 'Webinar Budget Allocation ($5k)', requester: 'Alex Rivera', type: 'Budget', submitted: 'Yesterday', priority: 'High' },
];

export const ApprovalWorkflow: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Approval Workflow</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Review and approve marketing assets, budgets, and campaigns.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#f0f6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-900/50 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#0d47a1] dark:text-blue-400 mb-4">Pending Approvals</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">4</p>
          <span className="inline-flex items-center text-[11px] font-bold text-rose-500">
            <AlertTriangle className="w-3 h-3 mr-1" /> Requires Attention
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Avg. Approval Time</p>
          <p className="text-3xl font-bold text-[#10b981] dark:text-emerald-400 mb-2">4.5 hrs</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> Fast Turnaround
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Approved This Week</p>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">24</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Rejected/Revision Requested</p>
          <p className="text-3xl font-bold text-[#f59e0b] dark:text-amber-400 mb-2">3</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl shadow-sm p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100">Items Awaiting Review</h2>
          <div className="flex gap-2">
            <button className="text-sm font-bold text-[#0d47a1] dark:text-blue-400 hover:underline px-3 py-1 bg-[#e0e7ff] dark:bg-indigo-900/40 rounded-lg">Approve All</button>
          </div>
        </div>
        
        <div className="space-y-4">
          {approvalItems.map((item) => (
            <div key={item.id} className="p-4 border border-[#e2e8f0] dark:border-slate-800 rounded-xl hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider ${
                    item.priority === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                    item.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {item.priority} Priority
                  </span>
                  <span className="text-[10px] font-bold text-[#94a3b8] dark:text-slate-500 uppercase tracking-wider">{item.type}</span>
                </div>
                <h3 className="text-base font-bold text-[#0f172a] dark:text-slate-100 mb-1">{item.title}</h3>
                <div className="flex items-center gap-4 text-xs font-semibold text-[#64748b] dark:text-slate-400">
                  <span>Requested by: <span className="text-[#334155] dark:text-slate-200">{item.requester}</span></span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.submitted}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 hover:bg-[#f8fafc] dark:hover:bg-slate-800 text-[#475569] dark:text-slate-300 rounded-lg text-xs font-bold transition-colors">
                  <MessageSquare className="w-4 h-4" /> Comment
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-white dark:bg-slate-900 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-bold transition-colors">
                  <X className="w-4 h-4" /> Reject
                </button>
                <button className="flex items-center gap-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm transition-colors">
                  <Check className="w-4 h-4" /> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
