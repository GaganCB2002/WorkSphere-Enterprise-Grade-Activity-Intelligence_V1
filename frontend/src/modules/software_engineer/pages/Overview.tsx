import React from 'react';
import { Sparkles, GitCommit, PlayCircle, GitPullRequest, LayoutDashboard, Clock, ArrowRight } from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      {/* Zoho Workspace Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Engineering Workspace Overview</h1>
          <p className="text-xs text-slate-400 mt-0.5">Sprint #42 • Active Development Phase</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            On Track for Release
          </span>
        </div>
      </div>

      {/* AI Smart Suggestion */}
      <div className="bg-gradient-to-r from-indigo-900/30 via-[#0F172A] to-[#0F172A] border border-indigo-500/30 rounded-2xl p-5 flex items-start gap-4 shadow-xl backdrop-blur-md relative overflow-hidden group">
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl shrink-0">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            AI Engineering Assistant Suggestion
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Based on your team's velocity and active dependencies, reviewing pull request <strong className="text-indigo-400 font-mono">#402</strong> before starting <strong className="text-white">ENG-101</strong> will unblock Sarah's deployment to staging.
          </p>
          <div className="pt-1 flex items-center gap-3">
            <button className="text-xs font-bold px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-md shadow-indigo-600/30">
              Review PR #402
            </button>
            <button className="text-xs font-semibold px-3.5 py-1.5 bg-[#1E293B] hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all">
              Dismiss
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Stats & Sprint) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md shadow-xl">
              <GitCommit className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-2xl font-extrabold text-white tracking-tight">14</div>
              <div className="text-xs text-slate-400 font-medium">Commits this week</div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md shadow-xl">
              <GitPullRequest className="w-5 h-5 text-indigo-400 mb-2" />
              <div className="text-2xl font-extrabold text-white tracking-tight">3</div>
              <div className="text-xs text-slate-400 font-medium">Open PRs</div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md shadow-xl">
              <PlayCircle className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-2xl font-extrabold text-white tracking-tight">32.5h</div>
              <div className="text-xs text-slate-400 font-medium">Deep Work Time</div>
            </div>
            <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md shadow-xl">
              <LayoutDashboard className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-2xl font-extrabold text-white tracking-tight">92%</div>
              <div className="text-xs text-slate-400 font-medium">Task Velocity</div>
            </div>
          </div>

          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Sprint #42 Burndown & Velocity</h3>
              <span className="text-xs font-mono text-slate-400">12 days remaining</span>
            </div>
            
            <div className="h-40 w-full flex items-end gap-2 pt-4 relative">
              {[60, 58, 52, 49, 44, 38, 30, 28, 20, 15].map((val, i) => (
                <div key={i} className="flex-1 bg-indigo-600/30 hover:bg-indigo-600/60 border border-indigo-500/40 rounded-t-lg transition-all relative group" style={{ height: `${val}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0F172A] text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none text-white whitespace-nowrap shadow-xl border border-slate-700">
                    {val} pts left
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800">
              <span>Sprint Start</span>
              <span>Mid-Sprint</span>
              <span className="text-indigo-400 font-bold">Today</span>
            </div>
          </div>
        </div>

        {/* Right Column (Up Next Tasks) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">Up Next Assignments</h3>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">View All</button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-[#1E293B]/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-indigo-400" />
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                    In Progress
                  </span>
                </div>
                <p className="text-xs font-semibold text-white leading-snug">Implement gRPC streaming for telemetry service</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400 font-mono">ENG-101</span>
                  <button className="text-[10px] uppercase font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1 rounded-lg transition-colors">
                    Continue
                  </button>
                </div>
              </div>

              <div className="bg-[#1E293B]/70 border border-slate-800 rounded-xl p-3.5 space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-wider">
                    To Do
                  </span>
                </div>
                <p className="text-xs font-semibold text-white leading-snug">Write unit tests for authentication middleware</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400 font-mono">ENG-120</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
