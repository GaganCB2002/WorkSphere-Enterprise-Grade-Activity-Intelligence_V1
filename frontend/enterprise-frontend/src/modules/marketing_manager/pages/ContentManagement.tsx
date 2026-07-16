import React from 'react';
import { FileText, Eye, MousePointerClick, Clock, ArrowUpRight } from 'lucide-react';

const pipeline = [
  { stage: 'Ideation', items: ['Q4 Cloud Report', 'Cybersecurity Infographic'] },
  { stage: 'Drafting', items: ['AI Integration Blog Post', 'DevOps Webinar Deck'] },
  { stage: 'Review', items: ['Enterprise Sales Deck', 'CEO Welcome Video Script'] },
  { stage: 'Published', items: ['Q3 Performance Case Study'] },
];

export const ContentManagement: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Content Management</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Tracking production pipelines and content engagement metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Published Assets (YTD)</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">142</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Total Pageviews</p>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">854k</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +24% vs last quarter
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Avg. Time on Page</p>
          <p className="text-3xl font-bold text-[#f59e0b] dark:text-amber-400 mb-2">2m 45s</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Bounce Rate</p>
          <p className="text-3xl font-bold text-emerald-600 mb-2">42%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl shadow-sm p-6 mt-6">
        <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Content Pipeline</h2>
        <div className="flex gap-4 overflow-x-auto min-w-[800px]">
          {pipeline.map(stage => (
            <div key={stage.stage} className="flex-1 bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-xl p-4">
              <h3 className="font-bold text-sm text-[#0f172a] dark:text-slate-100 mb-4 border-b border-[#e2e8f0] dark:border-slate-800 pb-2">{stage.stage}</h3>
              <div className="space-y-3">
                {stage.items.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-lg p-3 shadow-sm hover:border-[#0d47a1] transition-all cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-[#94a3b8] dark:text-slate-500" />
                      <span className="text-[10px] font-bold bg-[#f1f5f9] dark:bg-slate-800 px-2 py-0.5 rounded text-[#64748b] dark:text-slate-400">Blog/Article</span>
                    </div>
                    <p className="text-sm font-semibold text-[#0f172a] dark:text-slate-100">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
