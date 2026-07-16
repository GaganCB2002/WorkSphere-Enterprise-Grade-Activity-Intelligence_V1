import React from 'react';
import { Download, Filter, Search, UserPlus, ArrowRight, Zap, Target, ArrowUpRight } from 'lucide-react';

const leadStages = [
  { id: 'new', label: 'New Leads', count: 124 },
  { id: 'nurturing', label: 'Nurturing', count: 342 },
  { id: 'mql', label: 'MQL', count: 185 },
  { id: 'sql', label: 'SQL', count: 64 },
];

const mockLeads = [
  { id: 'LD-8042', name: 'Sarah Jenkins', company: 'TechFlow Inc.', source: 'LinkedIn Ads', score: 92, stage: 'SQL', date: 'Oct 24, 2023', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 'LD-8043', name: 'Michael Chen', company: 'Global Logistics', source: 'Organic Search', score: 85, stage: 'MQL', date: 'Oct 24, 2023', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
  { id: 'LD-8044', name: 'Emily Rodriguez', company: 'SaaS Innovators', source: 'Webinar Series', score: 78, stage: 'Nurturing', date: 'Oct 23, 2023', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: 'LD-8045', name: 'David Smith', company: 'Enterprise Fin', source: 'Direct Traffic', score: 45, stage: 'New Leads', date: 'Oct 22, 2023', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { id: 'LD-8046', name: 'Amanda Cooper', company: 'CloudWorks', source: 'LinkedIn Ads', score: 95, stage: 'SQL', date: 'Oct 21, 2023', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
];

export const LeadManagement: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Lead Management</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Tracking and qualifying marketing prospects through the funnel.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 text-[#0f172a] dark:text-slate-100 rounded-lg text-sm font-semibold hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export Leads
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0d47a1] dark:bg-blue-600 hover:bg-[#0a3982] text-white rounded-lg text-sm font-bold shadow-md shadow-blue-900/20 transition-all">
            <UserPlus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Total Leads (30d)</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">4,280</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +15.2%
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">MQLs (Marketing Qualified)</p>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">1,240</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +8.4%
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">SQLs (Sales Qualified)</p>
          <p className="text-3xl font-bold text-[#f59e0b] dark:text-amber-400 mb-2">385</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +12.1%
          </span>
        </div>
        <div className="bg-[#f0f6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-900/50 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#0d47a1] dark:text-blue-400 mb-4">Lead Velocity Rate</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">14.5%</p>
          <span className="inline-flex items-center text-[11px] font-bold text-[#0d47a1] dark:text-blue-400">
            <Target className="w-3 h-3 mr-1" /> Exceeding Target
          </span>
        </div>
      </div>

      {/* Lead Pipeline Board */}
      <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl shadow-sm p-6 overflow-x-auto">
        <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Active Pipeline</h2>
        
        <div className="flex gap-4 min-w-[800px]">
          {leadStages.map(stage => (
            <div key={stage.id} className="flex-1 bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4 border-b border-[#e2e8f0] dark:border-slate-800 pb-2">
                <h3 className="font-bold text-sm text-[#0f172a] dark:text-slate-100">{stage.label}</h3>
                <span className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 px-2 py-0.5 rounded-full text-xs font-bold text-[#64748b] dark:text-slate-400 shadow-sm">
                  {stage.count}
                </span>
              </div>
              
              {/* Sample Card for visualization */}
              <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-lg p-3 shadow-sm cursor-pointer hover:border-[#0d47a1] hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-[#64748b] dark:text-slate-400 bg-[#f1f5f9] dark:bg-slate-800 px-2 py-0.5 rounded uppercase tracking-wider">Enterprise</span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                    <Zap className="w-3 h-3" fill="currentColor" /> {70 + (stage.count % 25)}
                  </div>
                </div>
                <h4 className="text-sm font-bold text-[#0f172a] dark:text-slate-100 mb-1">Acme Corp Interest</h4>
                <p className="text-xs text-[#475569] dark:text-slate-300 mb-3">John Doe • Director of IT</p>
                <div className="flex items-center justify-between text-[10px] text-[#94a3b8] dark:text-slate-500 font-semibold">
                  <span>2 days in stage</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-[#e2e8f0] dark:border-slate-800 flex flex-wrap items-center gap-3 justify-between">
          <h2 className="font-headline text-lg font-bold text-[#0f172a] dark:text-slate-100">Recent Lead Activity</h2>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Search leads..." 
                className="bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-lg py-1.5 pl-9 pr-4 text-sm focus:border-[#0d47a1] outline-none"
              />
            </div>
            <button className="p-1.5 border border-[#e2e8f0] dark:border-slate-800 rounded-lg text-[#64748b] dark:text-slate-400 hover:bg-[#f8fafc] dark:hover:bg-slate-800">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc] dark:bg-slate-800 border-b border-[#e2e8f0] dark:border-slate-800">
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Lead Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">AI Score</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#475569] dark:text-slate-300 uppercase tracking-wider text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={lead.avatar} alt={lead.name} className="w-8 h-8 rounded-full object-cover border border-[#e2e8f0] dark:border-slate-800" />
                      <div>
                        <p className="text-sm font-bold text-[#0f172a] dark:text-slate-100 group-hover:text-[#0d47a1]">{lead.name}</p>
                        <p className="text-[10px] text-[#64748b] dark:text-slate-400 font-semibold">{lead.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#334155] dark:text-slate-200">{lead.company}</td>
                  <td className="px-6 py-4 text-sm text-[#475569] dark:text-slate-300">{lead.source}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Zap className={`w-4 h-4 ${lead.score > 80 ? 'text-emerald-500' : lead.score > 60 ? 'text-amber-500' : 'text-slate-400'}`} fill="currentColor" />
                      <span className="text-sm font-bold text-[#0f172a] dark:text-slate-100">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border tracking-wider
                      ${lead.stage === 'SQL' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                        lead.stage === 'MQL' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                        lead.stage === 'Nurturing' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                        'bg-slate-50 text-slate-700 border-slate-200'}
                    `}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#64748b] dark:text-slate-400 text-right">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
