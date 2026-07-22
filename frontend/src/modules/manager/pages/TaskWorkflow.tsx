import React, { useState } from 'react';
import {
  KanbanSquare, List, Calendar, SlidersHorizontal, Plus, Search,
  MoreHorizontal, MessageSquare, Clock, CheckCircle2,
  AlertCircle
} from 'lucide-react';

const tasksData = [
  { id: 'T-101', title: 'Vendor Contract Renewal', status: 'backlog', priority: 'Critical', department: 'Legal', dueDate: 'Oct 15', progress: 0, avatar: 'E', comments: 3 },
  { id: 'T-102', title: 'Update Security Protocols', status: 'backlog', priority: 'Medium', department: 'IT Sec', dueDate: 'Oct 20', progress: 0, avatar: 'S', comments: 0 },
  { id: 'T-103', title: 'Cloud Migration Phase 2', status: 'in-progress', priority: 'High', department: 'Infrastructure', dueDate: 'Oct 12', progress: 45, avatar: 'S', comments: 8 },
  { id: 'T-104', title: 'Q4 Marketing Campaign Assets', status: 'in-progress', priority: 'Medium', department: 'Design', dueDate: 'Oct 18', progress: 75, avatar: 'M', comments: 12 },
  { id: 'T-105', title: 'New Employee Onboarding Flow', status: 'review', priority: 'High', department: 'HR', dueDate: 'Oct 05', progress: 100, avatar: 'E', comments: 2 },
];

const KANBAN_COLUMNS = [
  { id: 'backlog', title: 'BACKLOG', count: 4 },
  { id: 'in-progress', title: 'IN PROGRESS', count: 6 },
  { id: 'review', title: 'IN REVIEW', count: 3 },
  { id: 'completed', title: 'COMPLETED', count: 24 }
];

export const TaskWorkflow: React.FC<{ user: any }> = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'timeline'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-[#d47070] bg-[#d47070]/10 border-[#d47070]/20';
      case 'High': return 'text-[#c27650] bg-[#c27650]/10 border-[#c27650]/20';
      case 'Medium': return 'text-[#c88d40] bg-[#c88d40]/10 border-[#c88d40]/20';
      default: return 'text-outline bg-surface-variant border-outline-variant';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 h-full flex flex-col">
      
      {/* ── Page Header ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="font-headline text-4xl text-[#3a302a] mb-2 tracking-tight">Task Board: Q4 Logistics</h1>
          <p className="font-body text-[#605850] text-[15px]">Managing delivery timelines and critical path items for end-of-year execution.</p>
        </div>
      </div>

      {/* ── KPI Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 shrink-0">
        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Total Tasks</p>
          <p className="text-3xl font-headline text-[#3a302a] mb-1">142</p>
          <span className="text-[11px] font-bold text-[#5b8c63]">24 New</span>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Critical Path</p>
          <p className="text-3xl font-headline text-[#9b593e] mb-1">12</p>
          <span className="text-[11px] font-bold text-[#c27650]">Attention Needed</span>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Completion Rate</p>
          <p className="text-3xl font-headline text-[#3a302a] mb-3">68%</p>
          <div className="h-1.5 bg-[#eae2da] rounded-full overflow-hidden">
            <div className="h-full bg-[#5b8c63]" style={{ width: '68%' }}></div>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-soft">
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Blocked Items</p>
          <p className="text-3xl font-headline text-[#9b593e] mb-1">4</p>
          <span className="text-[11px] font-bold text-[#c27650]">Requires Review</span>
        </div>
      </div>

      {/* ── Toolbar ───────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-surface p-2 rounded-xl border border-outline-variant shadow-sm shrink-0">
        
        <div className="flex items-center bg-[#FAF6F0] p-1 rounded-lg border border-outline-variant">
          <button 
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-bold transition-all ${
              viewMode === 'kanban' ? 'bg-surface border border-outline-variant text-[#3a302a] shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <KanbanSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Kanban</span>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-bold transition-all ${
              viewMode === 'list' ? 'bg-surface border border-outline-variant text-[#3a302a] shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
          <button 
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-bold transition-all ${
              viewMode === 'timeline' ? 'bg-surface border border-outline-variant text-[#3a302a] shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Timeline</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto px-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-on-surface hover:bg-surface-variant rounded border border-outline-variant transition-colors">
            <SlidersHorizontal className="w-4 h-4 text-outline" /> Filter by Status
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-on-surface hover:bg-surface-variant rounded border border-outline-variant transition-colors">
            Sort by Priority
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-[#9b593e] hover:bg-[#8a4a33] text-white rounded text-sm font-bold shadow-warm transition-colors ml-2">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </div>

      {/* ── Kanban Board ──────────────────────────────── */}
      {viewMode === 'kanban' && (
        <div className="flex-1 min-h-[500px] overflow-x-auto">
          <div className="flex gap-6 h-full min-w-max pb-4">
            {KANBAN_COLUMNS.map(column => {
              const columnTasks = tasksData.filter(t => t.status === column.id);
              
              return (
                <div key={column.id} className="w-[340px] flex flex-col shrink-0 bg-[#FAF6F0] rounded-xl border border-outline-variant p-4">
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-6 px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[12px] font-bold text-[#3a302a] tracking-widest">{column.title}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-[#8a4a33] bg-[#e6dcd2]">
                        {column.count}
                      </span>
                    </div>
                    <button className="p-1 text-outline hover:text-on-surface transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Column Body */}
                  <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                    {columnTasks.map(task => (
                      <div key={task.id} className="bg-surface border border-outline-variant rounded-xl p-5 shadow-soft hover:shadow-md transition-shadow cursor-grab group">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-outline">{task.department}</span>
                        </div>
                        
                        <h4 className="text-[15px] font-bold text-[#3a302a] mb-4 leading-snug group-hover:text-[#9b593e] transition-colors">
                          {task.title}
                        </h4>

                        {task.progress > 0 ? (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-[10px] font-bold text-on-surface-variant mb-1.5">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-[#eae2da] rounded-full overflow-hidden">
                              <div className="h-full bg-[#5b8c63]" style={{ width: `${task.progress}%` }}></div>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-on-surface-variant">
                             <Clock className="w-3.5 h-3.5" /> Due {task.dueDate}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                          <div className="w-7 h-7 rounded-full bg-[#e6dcd2] border border-surface flex items-center justify-center text-[10px] font-bold text-[#8a4a33]">
                            {task.avatar}
                          </div>
                          
                          <div className="flex items-center gap-3 text-outline">
                            {task.comments > 0 && (
                              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                                <MessageSquare className="w-3.5 h-3.5" /> {task.comments}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
