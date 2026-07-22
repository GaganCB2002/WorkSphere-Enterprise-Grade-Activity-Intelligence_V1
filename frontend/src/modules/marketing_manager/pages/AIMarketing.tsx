import React from 'react';
import { Bot, Sparkles, MessageSquare, Zap, Target, TrendingUp } from 'lucide-react';

export const AIMarketing: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2 flex items-center gap-3">
            AI Marketing Assistant <Sparkles className="w-6 h-6 text-[#0d47a1] dark:text-blue-400" />
          </h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Your intelligent copilot for generating copy, analyzing trends, and optimizing campaigns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl shadow-sm flex flex-col h-[600px]">
          <div className="p-4 border-b border-[#e2e8f0] dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-800 rounded-t-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0d47a1] dark:bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-[#0f172a] dark:text-slate-100">Marketing Copilot</h2>
              <p className="text-xs text-emerald-600 font-bold">Online • Ready to assist</p>
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#f8fafc]/50">
            {/* AI Message */}
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#0d47a1] dark:bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%]">
                <p className="text-sm text-[#334155] dark:text-slate-200 leading-relaxed">
                  Hi there! I've been analyzing your recent Google Ads performance. I noticed that your **Cost Per Click (CPC)** for the "Enterprise Solutions" ad set has increased by 15% over the last 3 days, while conversions have remained flat.
                  <br/><br/>
                  I recommend pausing this ad set and shifting budget to the "Webinar Signups" campaign on LinkedIn, which is currently yielding a much lower CPA. Would you like me to draft an optimization plan?
                </p>
              </div>
            </div>
            
            {/* User Message */}
            <div className="flex gap-4 flex-row-reverse">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-slate-600">ME</span>
              </div>
              <div className="bg-[#0d47a1] dark:bg-blue-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm max-w-[80%]">
                <p className="text-sm leading-relaxed">Yes, please draft the optimization plan. Also, can you generate 3 new variations of the LinkedIn ad copy focusing on "productivity"?</p>
              </div>
            </div>

            {/* AI Message - Generating */}
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#0d47a1] dark:bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0d47a1] dark:text-blue-400 animate-pulse">
                  <Sparkles className="w-4 h-4" /> Generating insights and copy...
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-[#e2e8f0] dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-2xl">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask the AI assistant to analyze data or generate content..." 
                className="w-full bg-[#f8fafc] dark:bg-slate-800 border border-[#e2e8f0] dark:border-slate-800 rounded-xl py-3 pl-4 pr-12 text-sm focus:border-[#0d47a1] outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#0d47a1] dark:bg-blue-600 hover:bg-[#0a3982] text-white rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="font-headline text-lg font-bold text-[#0f172a] dark:text-slate-100 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 border border-[#e2e8f0] dark:border-slate-800 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors text-left group">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a] dark:text-slate-100">Generate Ad Copy</h3>
                  <p className="text-[10px] text-[#64748b] dark:text-slate-400">For Google, LinkedIn, or Meta</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 border border-[#e2e8f0] dark:border-slate-800 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors text-left group">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <Target className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a] dark:text-slate-100">Analyze Audience</h3>
                  <p className="text-[10px] text-[#64748b] dark:text-slate-400">Find new target segments</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 border border-[#e2e8f0] dark:border-slate-800 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors text-left group">
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a] dark:text-slate-100">Forecast Budget</h3>
                  <p className="text-[10px] text-[#64748b] dark:text-slate-400">Predict spend and ROI</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0d47a1] to-[#1e3a8a] rounded-2xl p-6 shadow-md text-white">
            <div className="flex items-center gap-2 mb-4 opacity-80">
              <Zap className="w-4 h-4" />
              <h2 className="text-xs font-bold uppercase tracking-wider">AI Impact (This Month)</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold mb-1">24 hrs</p>
                <p className="text-sm opacity-80">Estimated Time Saved</p>
              </div>
              <div className="h-px bg-white/20 w-full"></div>
              <div>
                <p className="text-3xl font-bold mb-1">15</p>
                <p className="text-sm opacity-80">Assets Generated</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
