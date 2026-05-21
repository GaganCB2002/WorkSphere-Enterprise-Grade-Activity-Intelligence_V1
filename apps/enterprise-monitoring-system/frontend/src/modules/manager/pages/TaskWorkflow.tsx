import React, { useState } from 'react';
import {
  KanbanSquare, List, Calendar, SlidersHorizontal, Plus, Search,
  MoreHorizontal, MessageSquare, Paperclip, Clock, CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { tasks, teamMembers } from '../data/managerMockData';
import type { Task } from '../data/managerMockData';

const KANBAN_COLUMNS = [
  { id: 'pending', title: 'Pending', color: 'slate' },
  { id: 'in-progress', title: 'In Progress', color: 'indigo' },
  { id: 'review', title: 'Under Review', color: 'amber' },
  { id: 'blocked', title: 'Blocked', color: 'rose' },
  { id: 'completed', title: 'Completed', color: 'emerald' }
];

export const TaskWorkflow: React.FC<{ user: any }> = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'high': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'medium': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'low': return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getColumnColor = (color: string) => {
    switch (color) {
      case 'slate': return 'bg-slate-500';
      case 'indigo': return 'bg-indigo-500';
      case 'amber': return 'bg-amber-500';
      case 'rose': return 'bg-rose-500';
      case 'emerald': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      
      {/* ── Page Header ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Task & Workflow</h1>
          <p className="text-sm text-[#8b949e] mt-1">Manage sprints, track progress, and unblock your team.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[13px] font-semibold text-white transition-colors shadow-sm shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>
      </div>

      {/* ── Toolbar ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-[#0a0c14] border border-[#1e2231] rounded-2xl shrink-0">
        
        <div className="flex items-center gap-1 bg-[#12151f] p-1 rounded-xl">
          <button 
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
              viewMode === 'kanban' ? 'bg-[#1e2231] text-white shadow-sm' : 'text-[#6b7280] hover:text-slate-300'
            }`}
          >
            <KanbanSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Kanban</span>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
              viewMode === 'list' ? 'bg-[#1e2231] text-white shadow-sm' : 'text-[#6b7280] hover:text-slate-300'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto px-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12151f] border border-[#1e2231] rounded-lg py-1.5 pl-9 pr-4 text-[12px] text-slate-200 focus:border-indigo-500/50 outline-none transition-colors"
            />
          </div>
          <button className="p-1.5 text-[#6b7280] hover:text-slate-300 bg-[#12151f] border border-[#1e2231] rounded-lg transition-colors shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Kanban Board ──────────────────────────────── */}
      {viewMode === 'kanban' && (
        <div className="flex-1 min-h-0 overflow-x-auto mgr-scrollbar pb-2">
          <div className="flex gap-4 h-full min-w-max">
            {KANBAN_COLUMNS.map(column => {
              const columnTasks = filteredTasks.filter(t => t.status === column.id);
              
              return (
                <div key={column.id} className="w-[320px] flex flex-col shrink-0">
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${getColumnColor(column.color)}`} />
                      <h3 className="text-[13px] font-bold text-slate-200">{column.title}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#12151f] border border-[#1e2231] text-[10px] font-bold text-[#6b7280]">
                        {columnTasks.length}
                      </span>
                    </div>
                    <button className="p-1 text-[#6b7280] hover:text-slate-300 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Column Body */}
                  <div className="flex-1 bg-[#0a0c14] border border-[#161a26] rounded-2xl p-2.5 overflow-y-auto mgr-scrollbar space-y-3">
                    {columnTasks.map(task => (
                      <TaskCard key={task.id} task={task} getPriorityColor={getPriorityColor} />
                    ))}
                    {columnTasks.length === 0 && (
                      <div className="h-24 flex items-center justify-center border-2 border-dashed border-[#1e2231] rounded-xl">
                        <span className="text-[11px] font-semibold text-[#4a5068]">No tasks</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── List View (Placeholder) ───────────────────── */}
      {viewMode === 'list' && (
        <div className="mgr-glass flex-1 flex items-center justify-center">
           <div className="text-center">
             <List className="w-12 h-12 text-[#1e2231] mx-auto mb-3" />
             <p className="text-[#6b7280] text-sm font-semibold">List view is under construction</p>
           </div>
        </div>
      )}
    </div>
  );
};

// ── Subcomponents ──────────────────────────────────────

const TaskCard = ({ task, getPriorityColor }: { task: Task, getPriorityColor: (p: string) => string }) => {
  const isOverdue = new Date(task.dueDate) < new Date('2026-05-22') && task.status !== 'completed';
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;

  return (
    <div className="bg-[#12151f] border border-[#1e2231] rounded-xl p-4 hover:border-indigo-500/30 transition-all mgr-kanban-card group">
      
      {/* Header: ID + Priority */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-[#6b7280]">{task.id}</span>
        <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>
      
      {/* Title */}
      <h4 className="text-[13px] font-semibold text-slate-200 mb-3 leading-tight group-hover:text-indigo-400 transition-colors">
        {task.title}
      </h4>

      {/* Progress Bar (if subtasks exist) */}
      {task.subtasks.length > 0 && (
        <div className="mb-4 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#6b7280]">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {completedSubtasks}/{task.subtasks.length}</span>
            <span>{Math.round((completedSubtasks / task.subtasks.length) * 100)}%</span>
          </div>
          <div className="h-1 bg-[#0a0c14] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
              style={{ width: `${(completedSubtasks / task.subtasks.length) * 100}%` }} 
            />
          </div>
        </div>
      )}

      {/* Footer: Assignee + Meta */}
      <div className="flex items-center justify-between pt-3 border-t border-[#1e2231]/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#1e2231] border border-[#2d3345] flex items-center justify-center text-[9px] font-bold text-slate-300" title={task.assignee}>
            {task.assigneeAvatar}
          </div>
          {isOverdue && <span title="Overdue"><AlertTriangle className="w-3.5 h-3.5 text-rose-500" /></span>}
        </div>
        
        <div className="flex items-center gap-2.5 text-[#6b7280]">
          {task.comments > 0 && (
            <div className="flex items-center gap-1 text-[10px] font-bold">
              <MessageSquare className="w-3 h-3" />
              {task.comments}
            </div>
          )}
          <div className={`flex items-center gap-1 text-[10px] font-bold ${isOverdue ? 'text-rose-400' : ''}`}>
            <Clock className="w-3 h-3" />
            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};
