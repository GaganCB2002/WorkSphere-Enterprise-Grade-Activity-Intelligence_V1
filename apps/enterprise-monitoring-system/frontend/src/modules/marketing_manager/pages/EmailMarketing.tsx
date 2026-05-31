import React from 'react';
import { Mail, ArrowUpRight, ArrowDownRight, Send } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const emailData = [
  { month: 'Jan', openRate: 24, clickRate: 3.2 },
  { month: 'Feb', openRate: 25, clickRate: 3.5 },
  { month: 'Mar', openRate: 28, clickRate: 4.1 },
  { month: 'Apr', openRate: 26, clickRate: 3.8 },
  { month: 'May', openRate: 30, clickRate: 4.5 },
  { month: 'Jun', openRate: 32, clickRate: 4.8 },
];

const campaigns = [
  { name: 'Newsletter - Q3 Update', sent: '124,500', open: '34.2%', click: '5.1%', status: 'Completed' },
  { name: 'Product Launch Announcement', sent: '85,000', open: '42.8%', click: '8.4%', status: 'Completed' },
  { name: 'Weekly Digest', sent: '45,200', open: '28.5%', click: '3.2%', status: 'Sending' },
];

export const EmailMarketing: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Email Marketing</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Subscriber growth, engagement metrics, and campaign tracking.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Total Subscribers</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">245k</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +5k this month
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Avg. Open Rate</p>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">32.4%</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +2.1% YoY
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Avg. Click Rate</p>
          <p className="text-3xl font-bold text-[#f59e0b] dark:text-amber-400 mb-2">4.8%</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Unsubscribe Rate</p>
          <p className="text-3xl font-bold text-[#10b981] dark:text-emerald-400 mb-2">0.2%</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            Healthy
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Engagement Over Time</h2>
            <div className="h-72 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emailData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v)=>`₹${v}%`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v)=>`₹${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="openRate" stroke="#0d47a1" strokeWidth={3} dot={false} name="Open Rate" />
                  <Line yAxisId="right" type="monotone" dataKey="clickRate" stroke="#10b981" strokeWidth={3} dot={false} name="Click Rate" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Active Campaigns</h2>
            <div className="space-y-4">
              {campaigns.map((camp, idx) => (
                <div key={idx} className="p-4 border border-[#e2e8f0] dark:border-slate-800 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-sm text-[#0f172a] dark:text-slate-100 line-clamp-1">{camp.name}</h3>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider ${camp.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{camp.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#64748b] dark:text-slate-400">
                    <span>Sent: {camp.sent}</span>
                    <span>Open: <span className="text-[#0d47a1] dark:text-blue-400">{camp.open}</span></span>
                    <span>Click: <span className="text-emerald-600">{camp.click}</span></span>
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
