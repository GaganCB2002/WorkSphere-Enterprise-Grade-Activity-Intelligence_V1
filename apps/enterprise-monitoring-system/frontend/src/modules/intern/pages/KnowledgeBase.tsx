import React, { useState } from 'react';
import { Search, FileText, BookOpen, Code, Shield, ChevronRight, ExternalLink } from 'lucide-react';

interface DocItem {
  title: string;
  category: string;
  updated: string;
  icon: React.ReactNode;
}

const docs: DocItem[] = [
  { title: 'Intern Onboarding Handbook', category: 'Onboarding', updated: 'Jan 10', icon: <BookOpen className="w-4 h-4" /> },
  { title: 'Engineering Code Standards', category: 'Technical', updated: 'Mar 20', icon: <Code className="w-4 h-4" /> },
  { title: 'Git Branching Strategy', category: 'Technical', updated: 'Feb 15', icon: <Code className="w-4 h-4" /> },
  { title: 'REST API Design Guidelines', category: 'Technical', updated: 'Apr 5', icon: <Code className="w-4 h-4" /> },
  { title: 'Company Leave Policy', category: 'Policy', updated: 'Jan 1', icon: <Shield className="w-4 h-4" /> },
  { title: 'Data Security & Privacy SOP', category: 'Policy', updated: 'Feb 1', icon: <Shield className="w-4 h-4" /> },
  { title: 'Sprint Retrospective Template', category: 'Process', updated: 'May 1', icon: <FileText className="w-4 h-4" /> },
  { title: 'Intern Final Report Template', category: 'Process', updated: 'May 5', icon: <FileText className="w-4 h-4" /> },
];

const categoryColors: Record<string, string> = {
  Onboarding: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Technical: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Policy: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  Process: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

export const KnowledgeBase: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = docs.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-[1000px] mx-auto">
      <div>
        <h2 className="text-lg font-bold text-white">Knowledge Base</h2>
        <p className="text-xs text-[#6e7681] mt-0.5">Access onboarding docs, technical guidelines, and company policies</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#484f58]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documentation..."
          className="w-full bg-[#161b22] border border-[#21262d] focus:border-violet-500/50 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-[#484f58] outline-none transition-colors"
        />
      </div>

      {/* Document List */}
      <div className="space-y-2">
        {filtered.map((doc, i) => (
          <div key={i} className="flex items-center gap-3.5 p-4 bg-[#161b22] border border-[#21262d] rounded-xl hover:border-[#30363d] transition-colors cursor-pointer group">
            <div className="w-9 h-9 rounded-lg bg-[#0d1117] border border-[#21262d] flex items-center justify-center text-[#6e7681] group-hover:text-violet-400 transition-colors shrink-0">
              {doc.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-200 group-hover:text-violet-300 transition-colors truncate">{doc.title}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] font-bold px-1.5 py-px rounded border ${categoryColors[doc.category]}`}>{doc.category}</span>
                <span className="text-[10px] text-[#484f58]">Updated {doc.updated}</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[#30363d] group-hover:text-slate-400 transition-colors shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
