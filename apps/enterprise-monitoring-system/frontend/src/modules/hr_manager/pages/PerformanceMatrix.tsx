import React from 'react';
import { Target, TrendingUp, Award, Star, ListChecks, Plus } from 'lucide-react';

export const PerformanceMatrix: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-200">Performance Matrix</h1>
          <p className="text-sm text-[#8b949e] mt-1">Track OKRs, continuous feedback, and quarterly appraisal cycles.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Launch Review Cycle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: OKRs & Goals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                Company OKRs (Q2 2026)
              </h3>
            </div>
            
            <div className="space-y-4">
              {[
                { obj: 'Launch Enterprise Security Suite', progress: 75, owner: 'Engineering' },
                { obj: 'Reduce Infrastructure Costs by 15%', progress: 40, owner: 'DevOps' },
                { obj: 'Achieve SOC2 Type II Compliance', progress: 90, owner: 'Security & HR' },
              ].map((okr, i) => (
                <div key={i} className="bg-[#0E1117] border border-[#30363d] p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm font-bold text-slate-200">{okr.obj}</div>
                    <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider bg-[#21262d] px-2 py-1 rounded">
                      {okr.owner}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-[#21262d] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${okr.progress >= 75 ? 'bg-emerald-500' : okr.progress >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${okr.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-300 w-8">{okr.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Review Cycles */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Active Review Cycles
            </h3>
            
            <div className="bg-[#0E1117] border border-[#30363d] rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Star className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">Q2 Performance Review</div>
                <div className="text-xs text-[#8b949e] mt-1">Self-evaluations are currently open.</div>
              </div>
              <div className="w-full pt-3 mt-1 border-t border-[#30363d] flex justify-between text-xs font-bold">
                <span className="text-slate-400">Completion</span>
                <span className="text-indigo-400">34% (424/1248)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Top Performers
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah Connor', role: 'Security Analyst', score: '4.9/5.0' },
                { name: 'Marcus Wright', role: 'DevOps Lead', score: '4.8/5.0' },
              ].map((emp, i) => (
                <div key={i} className="flex justify-between items-center bg-[#0E1117] border border-[#30363d] p-3 rounded-xl">
                  <div>
                    <div className="text-xs font-bold text-slate-200">{emp.name}</div>
                    <div className="text-[10px] text-[#8b949e]">{emp.role}</div>
                  </div>
                  <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    {emp.score}
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
