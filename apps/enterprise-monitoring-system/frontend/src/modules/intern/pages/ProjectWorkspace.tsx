import React from 'react';
import { GitBranch, Target, Users, FileText, Clock, CheckCircle, Circle, ArrowRight } from 'lucide-react';

const milestones = [
  { title: 'Environment Setup & Onboarding', status: 'done', date: 'Jan 15 – Jan 22' },
  { title: 'Core Feature: StatCard Component', status: 'done', date: 'Jan 23 – Feb 10' },
  { title: 'Unit Testing Sprint', status: 'current', date: 'Feb 11 – Mar 5' },
  { title: 'API Integration Module', status: 'upcoming', date: 'Mar 6 – Apr 1' },
  { title: 'Performance Optimization', status: 'upcoming', date: 'Apr 2 – May 1' },
  { title: 'Final Presentation & Handoff', status: 'upcoming', date: 'May 2 – Jul 15' },
];

export const ProjectWorkspace: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h2 className="text-lg font-bold text-white">Project Workspace</h2>
        <p className="text-xs text-[#6e7681] mt-0.5">Track your internship project milestones and deliverables</p>
      </div>

      {/* Project Info Banner */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
            <GitBranch className="w-6 h-6 text-violet-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-white mb-0.5">WorkSphere Dashboard v3</h3>
            <p className="text-xs text-[#6e7681] mb-3">Enterprise-grade monitoring dashboard frontend — responsible for the Intern & Employee modules.</p>
            <div className="flex items-center gap-4 text-xs text-[#6e7681]">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 4 contributors</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Sprint 6 of 12</span>
              <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> 3 docs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Timeline */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-5">Project Timeline</h3>
        <div className="relative">
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[#21262d]"></div>
          <div className="space-y-5">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className="relative z-10 shrink-0">
                  {m.status === 'done' ? (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  ) : m.status === 'current' ? (
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 border-2 border-violet-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                    </div>
                  ) : (
                    <Circle className="w-6 h-6 text-[#30363d]" />
                  )}
                </div>
                <div className={`flex-1 p-3.5 rounded-xl border transition-colors ${
                  m.status === 'current' ? 'bg-violet-500/5 border-violet-500/20' :
                  m.status === 'done' ? 'bg-[#0d1117] border-[#1b1f27]' :
                  'bg-[#0d1117] border-[#1b1f27] opacity-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-semibold ${m.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-200'}`}>{m.title}</h4>
                    {m.status === 'current' && <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">In Progress</span>}
                  </div>
                  <p className="text-[11px] text-[#6e7681] mt-0.5">{m.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
