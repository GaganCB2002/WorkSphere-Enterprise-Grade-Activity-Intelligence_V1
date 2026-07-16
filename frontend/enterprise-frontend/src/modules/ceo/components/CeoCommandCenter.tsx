import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import { ShieldCheck } from 'lucide-react';

const mockHealthData = [
  { name: 'Workforce Health', health: 88, fill: '#8b5cf6' },
  { name: 'Financial Health', health: 95, fill: '#10b981' },
  { name: 'Project Health', health: 82, fill: '#f59e0b' },
  { name: 'Client Health', health: 94, fill: '#ec4899' },
  { name: 'Operational Health', health: 91, fill: '#3b82f6' },
];

export const CeoCommandCenter: React.FC = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6 flex flex-col justify-center relative">
      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          Overall Score: 90/100
        </div>
      </div>
      
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white">Company Health Index</h3>
        <p className="text-slate-400 text-xs mt-1">Executive Score Gauge across core business pillars</p>
      </div>

      <div className="h-[300px] w-full flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={15} data={mockHealthData}>
            {/* @ts-expect-error Recharts types are missing minAngle */}
            <RadialBar minAngle={15} background={{ fill: '#1e293b' }} clockWise dataKey="health" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }} />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0, fontSize: '12px', color: '#94a3b8' }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
