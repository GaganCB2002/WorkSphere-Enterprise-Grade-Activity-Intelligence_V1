import React from 'react';
import { Target, ArrowUpRight, Wallet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const adData = [
  { month: 'Jan', spend: 20000, conversions: 400 },
  { month: 'Feb', spend: 25000, conversions: 550 },
  { month: 'Mar', spend: 22000, conversions: 480 },
  { month: 'Apr', spend: 30000, conversions: 700 },
  { month: 'May', spend: 35000, conversions: 900 },
  { month: 'Jun', spend: 40000, conversions: 1100 },
];

const adSets = [
  { name: 'Retargeting - Q3 Enterprise', platform: 'LinkedIn', budget: '₹15,000', spent: '85%', cpa: '₹120' },
  { name: 'Brand Awareness - Global', platform: 'Google Ads', budget: '₹45,000', spent: '42%', cpa: '₹85' },
  { name: 'Webinar Signups', platform: 'Meta', budget: '₹5,000', spent: '90%', cpa: '₹45' },
];

export const AdsManagement: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-headline text-4xl text-[#0f172a] dark:text-slate-100 font-bold tracking-tight mb-2">Ads Management</h1>
          <p className="font-body text-[#475569] dark:text-slate-300 text-[15px]">Paid media spend, conversion tracking, and ROAS analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Total Ad Spend (30d)</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">₹40k</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">Cost Per Click (CPC)</p>
          <p className="text-3xl font-bold text-[#0d47a1] dark:text-blue-400 mb-2">₹4.50</p>
          <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="w-3 h-3 mr-1" /> -12% (Improving)
          </span>
        </div>
        <div className="bg-[#f0f6ff] dark:bg-blue-900/20 border border-[#bfdbfe] dark:border-blue-900/50 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#0d47a1] dark:text-blue-400 mb-4">Cost Per Acquisition (CPA)</p>
          <p className="text-3xl font-bold text-[#0f172a] dark:text-slate-100 mb-2">₹85</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-[#475569] dark:text-slate-300 mb-4">ROAS</p>
          <p className="text-3xl font-bold text-emerald-600 mb-2">4.2x</p>
          <span className="inline-flex items-center text-[11px] font-bold text-[#64748b] dark:text-slate-400">
            Target: 3.5x
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100">Spend vs Conversions</h2>
            </div>
            <div className="h-72 w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v)=>`₹${v/1000}k`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Area yAxisId="right" type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={3} fill="#d1fae5" fillOpacity={0.4} name="Conversions" />
                  <Area yAxisId="left" type="monotone" dataKey="spend" stroke="#0d47a1" strokeWidth={3} fill="none" name="Ad Spend" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-[#e2e8f0] dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full">
            <h2 className="font-headline text-xl font-bold text-[#0f172a] dark:text-slate-100 mb-6">Active Ad Sets</h2>
            <div className="space-y-4">
              {adSets.map((ad, idx) => (
                <div key={idx} className="p-4 border border-[#e2e8f0] dark:border-slate-800 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-slate-800">
                  <h3 className="font-bold text-sm text-[#0f172a] dark:text-slate-100 mb-1">{ad.name}</h3>
                  <p className="text-[10px] font-bold text-[#64748b] dark:text-slate-400 uppercase tracking-wider mb-3">{ad.platform}</p>
                  
                  <div className="flex items-center justify-between text-xs font-semibold text-[#334155] dark:text-slate-200 mb-2">
                    <span>Budget: {ad.budget}</span>
                    <span>CPA: <span className="text-emerald-600">{ad.cpa}</span></span>
                  </div>
                  
                  <div className="h-1.5 w-full bg-[#f1f5f9] dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0d47a1] dark:bg-blue-600" style={{ width: ad.spent }}></div>
                  </div>
                  <p className="text-[10px] font-semibold text-[#64748b] dark:text-slate-400 mt-1 text-right">{ad.spent} Spent</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
