// @ts-nocheck
import React from 'react';
import { 
  GitPullRequest, GitMerge, Check, X, Code2, 
  Clock, MessageSquare, AlertCircle, Sparkles, User, PlayCircle
} from 'lucide-react';

const PENDING_PRS = [
  { id: 'PR-1042', title: 'feat: migrate to Next.js 15 externalDir architecture', author: 'Sarah Jenkins', branch: 'feat/next15-external', target: 'develop', additions: 420, deletions: 112, status: 'review_required', conflicts: false, ciStatus: 'passed', time: '2 hours ago', comments: 4 },
  { id: 'PR-1043', title: 'fix: resolve WinRT geolocation accuracy dropping', author: 'David Ross', branch: 'fix/winrt-gps-lock', target: 'develop', additions: 64, deletions: 88, status: 'changes_requested', conflicts: false, ciStatus: 'failed', time: '5 hours ago', comments: 12 },
  { id: 'PR-1044', title: 'feat(ai): integrate PyTorch LSTM endpoint', author: 'Alex Developer', branch: 'feat/ai-lstm-scoring', target: 'develop', additions: 850, deletions: 45, status: 'review_required', conflicts: true, ciStatus: 'running', time: '1 day ago', comments: 1 },
];

export const CodeReviews: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <GitPullRequest className="w-6 h-6 text-indigo-500" /> Code Review Queue
          </h1>
          <p className="text-sm text-[#8b949e] mt-1">Review squad code modifications, test coverage, and branch mergeability.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] text-slate-300 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors border border-[#30363d]">
            <Code2 className="w-4 h-4" />
            Code Quality Rules
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PR List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-[#21262d] pb-4">
            <h2 className="text-sm font-bold text-slate-200">Pending Approvals (3)</h2>
          </div>
          
          <div className="space-y-4">
            {PENDING_PRS.map(pr => (
              <div key={pr.id} className="bg-[#0E1117] border border-[#21262d] rounded-xl overflow-hidden hover:border-[#30363d] transition-colors">
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <GitPullRequest className={`w-4 h-4 ${pr.status === 'changes_requested' ? 'text-amber-500' : 'text-emerald-500'}`} />
                        <h3 className="font-bold text-sm text-slate-200 hover:text-indigo-400 cursor-pointer">{pr.title}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#8b949e]">
                        <span className="font-mono text-indigo-400">#{pr.id}</span>
                        <span>opened {pr.time} by</span>
                        <span className="font-bold text-slate-300">{pr.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                        <span className="text-emerald-400">+{pr.additions}</span>
                        <span className="text-slate-500">/</span>
                        <span className="text-rose-400">-{pr.deletions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#8b949e] bg-[#161b22] px-3 py-1.5 rounded-md border border-[#21262d] w-max">
                    <span>{pr.branch}</span>
                    <GitMerge className="w-3 h-3 text-slate-500 mx-1" />
                    <span>{pr.target}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#21262d]">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5 font-bold">
                        {pr.ciStatus === 'passed' && <><Check className="w-4 h-4 text-emerald-500" /> <span className="text-emerald-500">CI Passed</span></>}
                        {pr.ciStatus === 'failed' && <><X className="w-4 h-4 text-rose-500" /> <span className="text-rose-500">CI Failed</span></>}
                        {pr.ciStatus === 'running' && <><Clock className="w-4 h-4 text-indigo-500" /> <span className="text-indigo-500">CI Running...</span></>}
                      </div>
                      {pr.conflicts && (
                        <div className="flex items-center gap-1.5 font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                          <AlertCircle className="w-3.5 h-3.5" /> Merge Conflicts
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 font-bold text-slate-400">
                        <MessageSquare className="w-4 h-4" /> {pr.comments}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="bg-[#21262d] hover:bg-[#30363d] text-slate-300 px-3 py-1.5 rounded-md text-xs font-bold transition-colors">
                        Review Files
                      </button>
                      <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled={pr.conflicts || pr.ciStatus === 'failed'}>
                        Approve & Merge
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Analytics & AI Insights */}
        <div className="space-y-6">
          <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5">
            <h2 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" /> AI Review Insights
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                <p className="text-xs text-rose-400 font-bold mb-1">Security Vulnerability Found</p>
                <p className="text-[11px] text-slate-300 leading-snug">
                  PR-1044 introduces a potential SSRF vulnerability in the `fetchModel` wrapper. Ensure user-supplied URLs are strictly validated.
                </p>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-xs text-amber-400 font-bold mb-1">Test Coverage Drop</p>
                <p className="text-[11px] text-slate-300 leading-snug">
                  PR-1042 drops component coverage by 4%. Missing tests for the new `OAuthCallback` edge cases.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0E1117] border border-[#21262d] rounded-xl p-5">
            <h2 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-emerald-500" /> CI/CD Automation
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-slate-300">
                  <span>SonarQube Analysis</span>
                  <span className="text-emerald-400">Passing</span>
                </div>
                <div className="h-1.5 w-full bg-[#21262d] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500 w-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-slate-300">
                  <span>E2E Jest Tests</span>
                  <span className="text-amber-400">82%</span>
                </div>
                <div className="h-1.5 w-full bg-[#21262d] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-amber-500 w-[82%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

