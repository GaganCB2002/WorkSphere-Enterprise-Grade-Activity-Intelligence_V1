import React, { useState, useEffect } from 'react';
import { Search, Command, FileText, Settings, GitPullRequest, LayoutDashboard, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0E1117]/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Palette Box */}
      <div className="relative w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden flex flex-col transform transition-all">
        <div className="flex items-center px-4 py-3 border-b border-[#30363d]">
          <Search className="w-5 h-5 text-[#8b949e] mr-3" />
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-[#e6edf3] placeholder-[#8b949e] text-lg"
            placeholder="Search commands, tasks, or files..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            className="p-1 rounded text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          <div className="px-3 py-2 text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Navigation</div>
          
          <button onClick={() => handleSelect('overview')} className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-[#e6edf3] hover:bg-[#1f6feb]/10 hover:text-[#58a6ff] transition-colors text-left group">
            <LayoutDashboard className="w-4 h-4 mr-3 text-[#8b949e] group-hover:text-[#58a6ff]" />
            <span className="flex-1">Go to Dashboard</span>
          </button>
          
          <button onClick={() => handleSelect('tasks')} className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-[#e6edf3] hover:bg-[#1f6feb]/10 hover:text-[#58a6ff] transition-colors text-left group">
            <FileText className="w-4 h-4 mr-3 text-[#8b949e] group-hover:text-[#58a6ff]" />
            <span className="flex-1">View Task Board</span>
          </button>
          
          <button onClick={() => handleSelect('code')} className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-[#e6edf3] hover:bg-[#1f6feb]/10 hover:text-[#58a6ff] transition-colors text-left group">
            <GitPullRequest className="w-4 h-4 mr-3 text-[#8b949e] group-hover:text-[#58a6ff]" />
            <span className="flex-1">Review Pull Requests</span>
          </button>

          <div className="px-3 pt-4 pb-2 text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Quick Actions</div>
          
          <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-[#e6edf3] hover:bg-[#1f6feb]/10 hover:text-[#58a6ff] transition-colors text-left group">
            <Command className="w-4 h-4 mr-3 text-[#8b949e] group-hover:text-[#58a6ff]" />
            <span className="flex-1">Create New Issue</span>
          </button>
          
          <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-[#e6edf3] hover:bg-[#1f6feb]/10 hover:text-[#58a6ff] transition-colors text-left group">
            <Settings className="w-4 h-4 mr-3 text-[#8b949e] group-hover:text-[#58a6ff]" />
            <span className="flex-1">Settings</span>
          </button>
        </div>
        
        <div className="px-4 py-2 border-t border-[#30363d] bg-[#0d1117] flex items-center justify-between text-xs text-[#8b949e]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 rounded border border-[#30363d] font-mono">↑↓</span> to navigate</span>
            <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 rounded border border-[#30363d] font-mono">Enter</span> to select</span>
          </div>
          <span><span className="px-1.5 py-0.5 rounded border border-[#30363d] font-mono">esc</span> to dismiss</span>
        </div>
      </div>
    </div>
  );
};
