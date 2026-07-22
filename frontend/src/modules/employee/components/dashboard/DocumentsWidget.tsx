import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  updatedAt: string;
  sharedBy: string;
}

interface DocumentsWidgetProps {
  documents: Document[];
}

export function DocumentsWidget({ documents }: DocumentsWidgetProps) {
  const navigate = useNavigate();

  return (
    <GlassPanel padding="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Documents</h3>
        </div>
      </div>
      <div className="space-y-2">
        {documents.slice(0, 5).map(doc => (
          <div
            key={doc.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.name}</p>
              <p className="text-[10px] text-slate-400 font-semibold">{doc.type} • {doc.size}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[9px] text-slate-400 font-semibold">{doc.updatedAt}</p>
              <p className="text-[9px] text-slate-500 font-normal">{doc.sharedBy}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/employee/documents')}
        className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>View All</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </GlassPanel>
  );
}
