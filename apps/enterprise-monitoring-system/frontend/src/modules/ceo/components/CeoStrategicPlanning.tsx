import React from 'react';
import { Target, ArrowRight, TrendingUp } from 'lucide-react';

export const CeoStrategicPlanning: React.FC = () => {
  const okrs = [
    { obj: 'Achieve ₹10M ARR', progress: 85, color: 'bg-emerald-500' },
    { obj: 'Expand to EMEA Market', progress: 40, color: 'bg-blue-500' },
    { obj: 'Launch Enterprise AI Suite', progress: 65, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl mb-8">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white">Strategic Planning Center</h3>
        <p className="text-slate-400 text-xs mt-1">Quarterly Objectives and Key Results (OKRs)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {okrs.map((okr, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${okr.color}`} />
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-sm font-bold text-white pr-4">{okr.obj}</h4>
              <Target className="w-5 h-5 text-slate-500 shrink-0" />
            </div>
            
            <div className="mb-2 flex justify-between items-end">
              <span className="text-3xl font-extrabold text-white">{okr.progress}%</span>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                View Details <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
              <div className={`h-full ${okr.color}`} style={{ width: `₹${okr.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
