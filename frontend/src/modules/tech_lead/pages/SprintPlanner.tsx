// @ts-nocheck
import React, { useState } from 'react';
import { 
  Kanban, Plus, MoreHorizontal, MessageSquare, 
  Paperclip, Calendar, Flag, User, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_BOARD = {
  columns: [
    { id: 'todo', title: 'To Do', limit: 10 },
    { id: 'in-progress', title: 'In Progress', limit: 6 },
    { id: 'in-review', title: 'Code Review', limit: 4 },
    { id: 'done', title: 'Done', limit: null }
  ],
  tasks: [
    { id: 'ENG-401', title: 'Migrate core authentication to OAuth2.0', columnId: 'todo', points: 8, priority: 'High', tags: ['Backend', 'Security'], assignee: 'Alex D.', comments: 4 },
    { id: 'ENG-402', title: 'Resolve Redis connection pooling leaks', columnId: 'in-progress', points: 5, priority: 'Critical', tags: ['Database', 'Bug'], assignee: 'Sarah J.', comments: 12 },
    { id: 'ENG-403', title: 'Implement Framer Motion transitions in Shell', columnId: 'in-progress', points: 3, priority: 'Medium', tags: ['Frontend'], assignee: 'You', comments: 2 },
    { id: 'ENG-404', title: 'Setup GitHub Actions CI pipeline', columnId: 'in-review', points: 5, priority: 'High', tags: ['DevOps'], assignee: 'Mike T.', comments: 8 },
    { id: 'ENG-405', title: 'Update documentation for API v2', columnId: 'done', points: 2, priority: 'Low', tags: ['Docs'], assignee: 'Alex D.', comments: 0 },
  ]
};

export const SprintPlanner: React.FC = () => {
  const [tasks, setTasks] = useState(MOCK_BOARD.tasks);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Critical': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      case 'High': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Medium': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Kanban className="w-6 h-6 text-indigo-500" /> Sprint Planner
          </h1>
          <p className="text-sm text-[#8b949e] mt-1">Sprint 42 (May 14 - May 28) • 18 / 44 Points Completed</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2 mr-4">
            {['S', 'M', 'A', 'Y'].map((initial, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#090b10] bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm z-10 relative">
                {initial}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-[#090b10] bg-[#21262d] flex items-center justify-center text-xs font-bold text-slate-400 shadow-sm z-0 relative">
              +2
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] text-slate-300 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors border border-[#30363d]">
            <Calendar className="w-4 h-4" />
            Timeline
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Create Issue
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar min-h-[500px]">
        {MOCK_BOARD.columns.map(column => {
          const columnTasks = tasks.filter(t => t.columnId === column.id);
          
          return (
            <div key={column.id} className="w-80 shrink-0 flex flex-col bg-[#0E1117]/50 rounded-xl border border-[#21262d] overflow-hidden">
              <div className="p-3 border-b border-[#21262d] flex items-center justify-between bg-[#0E1117]">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-200">{column.title}</h3>
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#21262d] text-[10px] font-bold text-slate-400">
                    {columnTasks.length}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#8b949e]">
                  <button className="p-1 hover:bg-[#21262d] rounded transition-colors"><Plus className="w-4 h-4" /></button>
                  <button className="p-1 hover:bg-[#21262d] rounded transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
              </div>
              
              <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar">
                {columnTasks.map(task => (
                  <motion.div 
                    layoutId={task.id}
                    key={task.id}
                    className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 hover:border-indigo-500/50 transition-colors cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-[#8b949e]">{task.id}</span>
                      <div className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-semibold text-slate-200 leading-snug mb-3 group-hover:text-indigo-400 transition-colors">
                      {task.title}
                    </h4>
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {task.tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 bg-[#21262d] text-slate-400 text-[9px] font-semibold rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#21262d]">
                      <div className="flex items-center gap-3 text-[#8b949e]">
                        <div className="w-6 h-6 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[9px] font-bold text-indigo-400" title={`Assigned to ${task.assignee}`}>
                          {task.assignee.split(' ')[0][0]}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-medium" title="Story Points">
                          <div className="w-4 h-4 rounded-sm bg-[#30363d] flex items-center justify-center text-slate-300">
                            {task.points}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[#8b949e]">
                        {task.comments > 0 && (
                          <div className="flex items-center gap-1 text-[10px] font-medium">
                            <MessageSquare className="w-3 h-3" /> {task.comments}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Drop Zone Placeholder */}
                <div className="h-10 border-2 border-dashed border-[#21262d] rounded-lg flex items-center justify-center text-xs font-semibold text-[#8b949e] opacity-0 hover:opacity-100 transition-opacity cursor-pointer bg-[#0E1117]/50">
                  + Drop task here
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

