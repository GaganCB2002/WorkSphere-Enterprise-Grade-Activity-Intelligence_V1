import React from 'react';
import { Sparkles, GitCommit, PlayCircle, GitPullRequest, LayoutDashboard, Clock } from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#21262d]">
        <h1 className="text-2xl font-bold text-[#e6edf3]">Welcome back, Alex</h1>
        <p className="text-sm text-[#8b949e] mt-1">Here's your engineering overview for today, May 21, 2026.</p>
      </div>

      {/* AI Smart Suggestion */}
      <div className="bg-[#1f6feb]/10 border border-[#1f6feb]/20 rounded-xl p-5 flex items-start gap-4 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-lg shrink-0">
          <Sparkles className="w-5 h-5 text-blue-400" />
        </div>
        <div className="relative z-10">
          <h3 className="font-bold text-[#e6edf3] mb-1">AI Assistant Suggestion</h3>
          <p className="text-sm text-[#8b949e]">
            Based on your team's velocity and current blockers, you should review PR <strong className="text-[#58a6ff]">#402</strong> before continuing work on <strong className="text-[#e6edf3]">ENG-101</strong>. This will unblock Sarah's deployment.
          </p>
          <div className="mt-3 flex gap-3">
            <button className="text-xs font-semibold px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors shadow-sm">
              Review PR #402
            </button>
            <button className="text-xs font-semibold px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] rounded border border-[#30363d] transition-colors">
              Dismiss
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Stats & Sprint) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
              <GitCommit className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-2xl font-bold text-[#e6edf3]">14</div>
              <div className="text-xs text-[#8b949e] font-medium">Commits this week</div>
            </div>
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
              <GitPullRequest className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-[#e6edf3]">3</div>
              <div className="text-xs text-[#8b949e] font-medium">Open PRs</div>
            </div>
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
              <PlayCircle className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-[#e6edf3]">8.5h</div>
              <div className="text-xs text-[#8b949e] font-medium">Deep Work Time</div>
            </div>
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4">
              <LayoutDashboard className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-2xl font-bold text-[#e6edf3]">92%</div>
              <div className="text-xs text-[#8b949e] font-medium">Task Velocity</div>
            </div>
          </div>

          <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#e6edf3]">Active Sprint Burndown (Sprint 42)</h3>
              <span className="text-xs font-mono text-[#8b949e]">12 days left</span>
            </div>
            
            <div className="h-40 w-full flex items-end gap-2 pt-4 relative">
              {/* Fake Bar Chart */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_19px,#30363d_20px)] bg-[length:100%_20px] opacity-20 pointer-events-none" />
              {[60, 58, 52, 49, 44, 38, 30, 28, 20, 15].map((val, i) => (
                <div key={i} className="flex-1 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 rounded-t transition-colors relative group" style={{ height: `${val}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#21262d] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none text-white whitespace-nowrap shadow-xl border border-[#30363d]">
                    {val} points left
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-[#8b949e] font-mono">
              <span>May 10</span>
              <span>May 15</span>
              <span>May 21 (Today)</span>
            </div>
          </div>
          
        </div>

        {/* Right Column (Tasks & Schedule) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden flex flex-col h-full max-h-[440px]">
            <div className="bg-[#161b22] px-5 py-3 border-b border-[#30363d] flex items-center justify-between">
              <h3 className="font-semibold text-sm text-[#e6edf3]">Up Next</h3>
              <button className="text-xs text-[#58a6ff] hover:underline">View All</button>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto flex-1">
              
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <PlayCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">In Progress</span>
                </div>
                <p className="text-sm font-medium text-[#e6edf3] mb-3 leading-snug">Implement gRPC streaming for telemetry service</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#8b949e] font-mono">ENG-101</span>
                  <button className="text-[10px] uppercase font-bold text-white bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded transition-colors">Continue</button>
                </div>
              </div>

              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400 border border-slate-500/20 uppercase tracking-wider">To Do</span>
                </div>
                <p className="text-sm font-medium text-[#e6edf3] mb-3 leading-snug">Write unit tests for authentication middleware</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#8b949e] font-mono">ENG-120</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
