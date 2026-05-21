import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Folder, User, FileText, ChevronRight, CornerDownLeft, Command } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Handle keyboard shortcut to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = [
    { icon: User, title: 'Arjun Mehta', subtitle: 'View Profile • Engineering', type: 'person' },
    { icon: Folder, title: 'WorkSphere Platform v3.0', subtitle: 'Project • Active', type: 'project' },
    { icon: FileText, title: 'Q2 Engineering Roadmap.pdf', subtitle: 'Document • 2.4 MB', type: 'document' },
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a0c14]/80 backdrop-blur-sm z-[100]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#0a0c14] border border-[#1e2231] rounded-2xl shadow-2xl shadow-indigo-500/10 z-[101] overflow-hidden flex flex-col max-h-[70vh]"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-[#1e2231] bg-[#06080d] shrink-0">
              <Search className="w-5 h-5 text-indigo-500 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything or type a command..."
                className="w-full bg-transparent border-none py-5 px-4 text-[15px] text-slate-200 focus:outline-none placeholder:text-[#4a5068]"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="px-2 py-1 bg-[#12151f] border border-[#1e2231] rounded-lg text-[10px] font-mono text-[#6b7280] font-bold">ESC</kbd>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-2 mgr-scrollbar">
              {results.length > 0 ? (
                <div className="py-2">
                  <div className="px-3 py-1 text-[10px] font-bold text-[#4a5068] uppercase tracking-widest mb-1">Recent Searches</div>
                  {results.map((result, idx) => (
                    <button 
                      key={idx}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-500/10 hover:border-indigo-500/20 border border-transparent transition-colors group text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#12151f] border border-[#1e2231] flex items-center justify-center text-[#6b7280] group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                          <result.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-slate-200 group-hover:text-white transition-colors">{result.title}</div>
                          <div className="text-[11px] text-[#6b7280] font-medium">{result.subtitle}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#4a5068] group-hover:text-indigo-400 transition-colors" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#12151f] border border-[#1e2231] flex items-center justify-center mb-4">
                    <Search className="w-5 h-5 text-[#4a5068]" />
                  </div>
                  <div className="text-[14px] font-bold text-slate-300">No results found</div>
                  <div className="text-[12px] text-[#6b7280] mt-1">We couldn't find anything for "{query}"</div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[#1e2231] bg-[#06080d] flex items-center justify-between text-[11px] text-[#4a5068] font-medium shrink-0">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-[#12151f] rounded border border-[#1e2231] font-mono"><CornerDownLeft className="w-3 h-3" /></kbd> to select</span>
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-[#12151f] rounded border border-[#1e2231] font-mono text-[9px] font-bold">↑↓</kbd> to navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Command className="w-3 h-3" />
                WorkSphere AI Search
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
