import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Landmark, Briefcase, Users, LayoutDashboard, HeartHandshake, ShieldCheck } from 'lucide-react';

const mockSparkline = [
  { value: 40 }, { value: 60 }, { value: 45 }, { value: 70 }, { value: 65 }, { value: 85 }, { value: 90 }
];

export const CeoKpiCards: React.FC<{ stats: any[] }> = ({ stats }) => {
  // Use mock data aligned with the CEO specs if stats are not passed or map them appropriately.
  // The specs specify: Total Revenue, Net Profit, Total Employees, Projects, Client Satisfaction, Business Health Score.
  const cards = [
    { title: 'Total Revenue', value: '₹4.2M', trend: '+12.4%', sub: 'Monthly Trend', icon: Landmark, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Net Profit', value: '₹1.1M', trend: '26% Margin', sub: 'Forecast: ₹1.3M', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Total Employees', value: '452', trend: '+12 Hires', sub: '4.2% Attrition', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { title: 'Projects', value: '34', trend: '28 Active', sub: '2 Delayed', icon: LayoutDashboard, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { title: 'Client Satisfaction', value: '4.8/5', trend: 'NPS: 72', sub: 'Trending Up', icon: HeartHandshake, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { title: 'Business Health Score', value: '92/100', trend: 'Excellent', sub: 'Low Risk', icon: ShieldCheck, color: 'text-indigo-400', bg: 'bg-indigo-500/10' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:bg-slate-800/60 transition-colors">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl group-hover:bg-white/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm font-semibold mb-1">{card.title}</p>
                <h3 className="text-3xl font-extrabold text-white tracking-tight">{card.value}</h3>
              </div>
              <div className={`p-3 rounded-2xl ${card.bg} border border-white/5`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            
            <div className="flex items-end justify-between mt-6">
              <div>
                <span className="text-xs font-bold text-slate-300 bg-slate-950/50 px-2.5 py-1 rounded-lg border border-slate-800 inline-block mb-1">
                  {card.trend}
                </span>
                <p className="text-xs font-medium text-slate-500">{card.sub}</p>
              </div>
              
              <div className="w-24 h-10 opacity-60 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockSparkline}>
                    <defs>
                      <linearGradient id={`color-ceo-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="currentColor" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="currentColor" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="currentColor" 
                      fill={`url(#color-ceo-${idx})`} 
                      className={card.color} 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
