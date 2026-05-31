import React from 'react';
import { Target, Flag } from 'lucide-react';

export const CtoTechnologyRoadmap: React.FC = () => {
  const milestones = [
    { quarter: 'Q3', title: 'Zero-Trust Network Architecture', status: 'In Progress', progress: 65, color: 'bg-blue-500' },
    { quarter: 'Q3', title: 'Kubernetes Multi-Cluster Mesh', status: 'Planning', progress: 20, color: 'bg-purple-500' },
    { quarter: 'Q4', title: 'AI Copilot Integration', status: 'Upcoming', progress: 0, color: 'bg-slate-600' },
    { quarter: 'Q4', title: 'Legacy DB Migration to Postgres', status: 'Upcoming', progress: 0, color: 'bg-slate-600' }
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-white">Technology Roadmap</h3>
        <p className="text-slate-400 text-xs mt-1">Strategic enterprise architecture milestones</p>
      </div>

      <div className="space-y-6">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
              <span className="text-xs font-black text-slate-300">{m.quarter}</span>
            </div>
            <div className="flex-1 pt-1">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-bold text-white">{m.title}</h4>
                <span className="text-xs font-semibold text-slate-400">{m.status}</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className={`h-full ${m.color}`} style={{ width: `₹${m.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
