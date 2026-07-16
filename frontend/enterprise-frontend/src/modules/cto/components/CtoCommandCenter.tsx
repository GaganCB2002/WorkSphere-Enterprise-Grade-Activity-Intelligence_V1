import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

const mockRadarData = [
  { subject: 'Infrastructure', A: 95, fullMark: 100 },
  { subject: 'Security', A: 98, fullMark: 100 },
  { subject: 'Engineering', A: 86, fullMark: 100 },
  { subject: 'Cloud Cost', A: 92, fullMark: 100 },
  { subject: 'Product', A: 89, fullMark: 100 },
  { subject: 'DevOps', A: 94, fullMark: 100 },
];

export const CtoCommandCenter: React.FC = () => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white">Technology Health Index</h3>
        <p className="text-slate-400 text-xs mt-1">Multi-dimensional analysis of enterprise technology readiness</p>
      </div>

      <div className="h-[350px] w-full flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockRadarData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
            />
            <Radar name="Health Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
