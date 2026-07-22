import React from 'react';
import { Target, Flag, Clock } from 'lucide-react';

export const CeoProjectPortfolio: React.FC = () => {
  const projects = [
    { name: 'Enterprise Cloud Migration', client: 'Acme Corp', status: 'Active', progress: 65, color: 'bg-blue-500', rev: '₹1.2M' },
    { name: 'Mobile App Redesign', client: 'Nexus Tech', status: 'Delayed', progress: 40, color: 'bg-rose-500', rev: '₹450k' },
    { name: 'AI Analytics Dashboard', client: 'Internal', status: 'Active', progress: 85, color: 'bg-emerald-500', rev: 'N/A' },
    { name: 'Payment Gateway Integration', client: 'GlobalPay', status: 'Completed', progress: 100, color: 'bg-purple-500', rev: '₹850k' }
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white">Project Portfolio Dashboard</h3>
        <p className="text-slate-400 text-xs mt-1">Executive view of active deployments, delays, and revenue impact</p>
      </div>

      <div className="space-y-6">
        {projects.map((p, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
              {p.status === 'Completed' ? <Flag className="w-5 h-5 text-purple-400" /> :
               p.status === 'Delayed' ? <Clock className="w-5 h-5 text-rose-400" /> :
               <Target className="w-5 h-5 text-blue-400" />}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  <p className="text-xs text-slate-400">{p.client}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-300 block">{p.status}</span>
                  <span className="text-xs font-bold text-emerald-400 block">{p.rev}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className={`h-full ${p.color}`} style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
