import React from 'react';
import { GitPullRequest, GitCommit, MessageSquare, Check, X, Clock, GitMerge, ChevronRight } from 'lucide-react';

const mockPRs = [
  { id: 402, title: 'feat(core): implement gRPC bi-directional streaming', repo: 'worksphere/backend', author: 'alex-dev', status: 'REVIEW_REQUIRED', comments: 4, updated: '2h ago', build: 'passing' },
  { id: 401, title: 'fix(auth): resolve JWT token expiration race condition', repo: 'worksphere/backend', author: 'sarah-eng', status: 'APPROVED', comments: 12, updated: '5h ago', build: 'passing' },
  { id: 398, title: 'chore: update kubernetes helm charts for v2 cluster', repo: 'worksphere/infra', author: 'david-ops', status: 'CHANGES_REQUESTED', comments: 8, updated: '1d ago', build: 'failed' },
  { id: 395, title: 'feat(ui): redesign generic data table with virtual scrolling', repo: 'worksphere/frontend', author: 'alex-dev', status: 'DRAFT', comments: 0, updated: '2d ago', build: 'pending' },
];

export const CodeWorkspace: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#21262d]">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">Code & Pull Requests</h1>
          <p className="text-sm text-[#8b949e] mt-1">Manage active reviews, draft PRs, and branch status across the organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-sm text-[#8b949e] font-medium flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-emerald-400" />
            <span>4 Commits today</span>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-medium rounded-md transition-colors shadow-sm border border-[rgba(240,246,252,0.1)]">
            <GitPullRequest className="w-4 h-4" />
            <span>New Pull Request</span>
          </button>
        </div>
      </div>

      {/* PR Filter Tabs */}
      <div className="flex items-center gap-4 text-sm font-medium border-b border-[#21262d]">
        <button className="text-[#e6edf3] border-b-2 border-[#f78166] pb-3 px-1">Requires Review (1)</button>
        <button className="text-[#8b949e] hover:text-[#c9d1d9] pb-3 px-1 transition-colors">Created by me (2)</button>
        <button className="text-[#8b949e] hover:text-[#c9d1d9] pb-3 px-1 transition-colors">All Active (4)</button>
      </div>

      {/* PR List Container */}
      <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
        {/* List Header */}
        <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-[#30363d] text-sm">
          <div className="flex items-center gap-2 text-[#8b949e] font-medium">
            <GitPullRequest className="w-4 h-4" />
            <span>4 Open Pull Requests</span>
          </div>
          <div className="text-[#8b949e] text-xs flex gap-4">
            <button className="hover:text-white transition-colors">Author ▾</button>
            <button className="hover:text-white transition-colors">Repository ▾</button>
            <button className="hover:text-white transition-colors">Sort ▾</button>
          </div>
        </div>

        {/* PR Items */}
        <div className="divide-y divide-[#21262d]">
          {mockPRs.map((pr) => (
            <div key={pr.id} className="p-4 hover:bg-[#161b22] transition-colors flex items-start gap-3 group cursor-pointer">
              <div className="mt-1">
                {pr.status === 'DRAFT' ? <GitPullRequest className="w-5 h-5 text-[#8b949e]" /> :
                 pr.status === 'APPROVED' ? <Check className="w-5 h-5 text-[#238636]" /> :
                 pr.status === 'CHANGES_REQUESTED' ? <X className="w-5 h-5 text-[#f85149]" /> :
                 <GitPullRequest className="w-5 h-5 text-[#238636]" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <a href="#" className="text-[#e6edf3] font-semibold text-[15px] hover:text-[#58a6ff] hover:underline truncate">
                    {pr.title}
                  </a>
                  {pr.status === 'DRAFT' && (
                    <span className="px-2 py-0.5 rounded-full border border-[#30363d] text-[#8b949e] text-xs font-medium">Draft</span>
                  )}
                  {pr.status === 'REVIEW_REQUIRED' && (
                    <span className="px-2 py-0.5 rounded-full border border-[#d29922]/40 bg-[#d29922]/10 text-[#d29922] text-xs font-medium">Review Required</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3 text-xs text-[#8b949e]">
                  <span>#{pr.id} opened {pr.updated} by <span className="text-[#e6edf3] hover:text-[#58a6ff] cursor-pointer">{pr.author}</span></span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#30363d] inline-flex items-center justify-center text-[8px] font-bold text-white">
                      {pr.repo[0].toUpperCase()}
                    </span>
                    {pr.repo}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-4 text-[#8b949e] text-xs">
                  {pr.comments > 0 && (
                    <div className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="font-bold">{pr.comments}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    {pr.build === 'passing' ? <div className="flex items-center gap-1 text-[#2ea043]"><Check className="w-3 h-3" /> <span className="font-semibold">Pass</span></div> :
                     pr.build === 'failed' ? <div className="flex items-center gap-1 text-[#f85149]"><X className="w-3 h-3" /> <span className="font-semibold">Fail</span></div> :
                     <div className="flex items-center gap-1 text-[#d29922]"><Clock className="w-3 h-3" /> <span className="font-semibold">Pending</span></div>}
                  </div>
                </div>
                
                {pr.status === 'REVIEW_REQUIRED' && (
                  <button className="text-xs font-medium text-[#e6edf3] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded px-2.5 py-1 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100">
                    <GitMerge className="w-3 h-3" /> Review Changes
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
