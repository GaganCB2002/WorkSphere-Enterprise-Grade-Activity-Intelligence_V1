// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Kanban, Plus, MoreHorizontal, MessageSquare, Filter } from 'lucide-react';

export const KanbanBoard = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/tasks/kanban').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const columns = data?.columns || [{ id: 'backlog', title: 'Backlog' }, { id: 'todo', title: 'To Do' }, { id: 'in-progress', title: 'In Progress' }, { id: 'done', title: 'Done' }];
  const tasks = data?.tasks || [
    { id: 'T-101', title: 'User auth refactor', columnId: 'backlog', assignee: 'AD', priority: 'High' },
    { id: 'T-102', title: 'API rate limiting', columnId: 'todo', assignee: 'SJ', priority: 'Medium' },
    { id: 'T-103', title: 'Dashboard widgets', columnId: 'in-progress', assignee: 'EW', priority: 'High' },
    { id: 'T-104', title: 'Unit test coverage', columnId: 'done', assignee: 'MT', priority: 'Low' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Kanban className="w-6 h-6 text-indigo-500" /> Kanban Board</h1><p className="text-xs text-slate-400 mt-1">Task management board</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Plus className="w-4 h-4" /> Add Task</button>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 min-h-[400px]">
        {columns.map(col => { const colTasks = tasks.filter(t => t.columnId === col.id);
          return (
            <div key={col.id} className="w-72 shrink-0 flex flex-col bg-[#0E1117]/50 rounded-xl border border-[#21262d] overflow-hidden">
              <div className="p-3 border-b border-[#21262d] flex items-center justify-between bg-[#0E1117]">
                <div className="flex items-center gap-2"><h3 className="font-bold text-sm text-slate-200">{col.title}</h3><span className="w-5 h-5 rounded-full bg-[#21262d] text-[10px] font-bold text-slate-400 flex items-center justify-center">{colTasks.length}</span></div>
                <button className="p-1 hover:bg-[#21262d] rounded"><Plus className="w-4 h-4 text-[#8b949e]" /></button>
              </div>
              <div className="flex-1 p-3 space-y-3">{colTasks.map(task => (
                <div key={task.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 hover:border-indigo-500/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-mono text-[#8b949e]">{task.id}</span><span className={"text-[10px] font-bold px-1.5 py-0.5 rounded " + (task.priority === 'High' ? 'text-amber-400 bg-amber-400/10' : task.priority === 'Medium' ? 'text-blue-400 bg-blue-400/10' : 'text-slate-400 bg-slate-400/10')}>{task.priority}</span></div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-3">{task.title}</h4>
                  <div className="flex items-center justify-between pt-2 border-t border-[#21262d]">
                    <div className="w-6 h-6 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[9px] font-bold text-indigo-400">{task.assignee}</div>
                  </div>
                </div>
              ))}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

