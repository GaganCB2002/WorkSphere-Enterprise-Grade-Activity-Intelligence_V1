import React from 'react';
import { getLiveDate, getLiveTime } from '../../../utils/liveDataHelpers';

import { Share2, TrendingUp, Users, MessageCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const growthData = [
  { month: 'Jan', twitter: 4000, linkedin: 2400, instagram: 1800 },
  { month: 'Feb', twitter: 3000, linkedin: 1398, instagram: 2200 },
  { month: 'Mar', twitter: 2000, linkedin: 9800, instagram: 2800 },
  { month: 'Apr', twitter: 2780, linkedin: 3908, instagram: 3500 },
  { month: 'May', twitter: 1890, linkedin: 4800, instagram: 4200 },
  { month: 'Jun', twitter: 2390, linkedin: 3800, instagram: 5100 },
  { month: 'Jul', twitter: 3490, linkedin: 4300, instagram: 5900 },
];

const mockMentions = [
  { id: 1, user: '@TechInsider', platform: 'Twitter', text: 'Just tried the new @EnterpriseApp features. Game changer for DevOps teams. #SaaS', sentiment: 'Positive', date: getLiveTime(120) },
  { id: 2, user: 'Sarah Jenkins', platform: 'LinkedIn', text: 'Our team successfully migrated to the new cloud infrastructure using EnterpriseApp. Smooth transition!', sentiment: 'Positive', date: getLiveTime(300) },
  { id: 3, user: '@CloudDev', platform: 'Twitter', text: 'Having some latency issues with the API today. Anyone else?', sentiment: 'Negative', date: getLiveTime(1440) },
  { id: 4, user: 'Mike Ross', platform: 'LinkedIn', text: 'Looking forward to the upcoming webinar on AI integration.', sentiment: 'Neutral', date: getLiveTime(1440) },
];

export const SocialMedia: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Social Media</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Brand presence, engagement, and social listening metrics.</p>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Total Followers</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">124.5k</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +2.4% this month
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Engagement Rate</p>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">4.8%</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +1.1%
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Total Reach</p>
          <p className="text-3xl font-bold text-[#f59e0b] dark:text-amber-400 mb-2">2.1M</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +15%
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Mention Sentiment</p>
          <p className="text-3xl font-bold text-emerald-600 mb-2">78%</p>
          <span className="inline-flex items-center text-[11px] font-bold text-slate-500">
            Positive sentiment score
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Main Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100">Cross-Platform Growth</h2>
            </div>
            
            <div className="h-72 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="linkedin" stroke="#0077b5" strokeWidth={3} dot={false} name="LinkedIn" />
                  <Line type="monotone" dataKey="twitter" stroke="#1da1f2" strokeWidth={3} dot={false} name="Twitter" />
                  <Line type="monotone" dataKey="instagram" stroke="#e1306c" strokeWidth={3} dot={false} name="Instagram" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Recent Mentions</h2>
            
            <div className="space-y-4">
              {mockMentions.map((mention) => (
                <div key={mention.id} className="p-4 border border-[#e2e8f0] dark:border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#0f172a] dark:text-slate-100">{mention.user}</span>
                    <span className="text-[10px] font-bold text-[#64748b] dark:text-slate-400">{mention.date}</span>
                  </div>
                  <p className="text-xs text-[#334155] dark:text-slate-200 leading-relaxed mb-3">{mention.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#94a3b8] dark:text-slate-500 uppercase">{mention.platform}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      mention.sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      mention.sentiment === 'Negative' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {mention.sentiment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
