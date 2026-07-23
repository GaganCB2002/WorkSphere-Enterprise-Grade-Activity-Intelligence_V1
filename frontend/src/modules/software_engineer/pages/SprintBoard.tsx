// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Kanban, Plus, MoreHorizontal, MessageSquare, AlertTriangle, CheckCircle2, Clock, PlayCircle, User } from 'lucide-react';

export const SprintBoard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/sprint-board')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl border border-slate-800/80" /><div className="flex gap-4 h-96"><div className="w-80 bg-[#0F172A]/90 rounded-2xl" /><div className="w-80 bg-[#0F172A]/90 rounded-2xl" /><div className="w-80 bg-[#0F172A]/90 rounded-2xl" /><div className="w-80 bg-[#0F172A]/90 rounded-2xl" /></div></div>;

  const columns = data?.columns || [
    { id: 'todo', title: 'To Do', color: 'border-slate-500/30' },
    { id: 'in-progress', title: 'In Progress', color: 'border-blue-500/30' },
    { id: 'review', title: 'In Review', color: 'border-amber-500/30' },
    { id: 'done', title: 'Done', color: 'border-emerald-500/30' },
  ];
  const allTasks = data?.tasks || [
    { id: 'ENG-201', title: 'Implement gRPC streaming for telemetry', columnId: 'in-progress', points: 8, priority: 'High', assignee: 'Alex D.', comments: 4 },
    { id: 'ENG-202', title: 'Refactor API rate limiter', columnId: 'todo', points: 5, priority: 'Medium', assignee: 'Sarah J.', comments: 1 },
    { id: 'ENG-203', title: 'Write unit tests for payment gateway', columnId: 'done', points: 3, priority: 'Medium', assignee: 'Alex D.', comments: 0 },
    { id: 'ENG-204', title: 'Update Kubernetes configs', columnId: 'review', points: 5, priority: 'High', assignee: 'Mike T.', comments: 7 },
    { id: 'ENG-205', title: 'Fix memory leak in websocket handler', columnId: 'in-progress', points: 3, priority: 'Critical', assignee: 'Alex D.', comments: 12 },
    { id: 'ENG-206', title: 'Implement feature flag system', columnId: 'todo', points: 8, priority: 'Low', assignee: 'Emma W.', comments: 0 },
    { id: 'ENG-207', title: 'Add OpenAPI specs for v3 endpoints', columnId: 'in-progress', points: 2, priority: 'Medium', assignee: 'Sarah J.', comments: 3 },
    { id: 'ENG-208', title: 'Database migration for preferences', columnId: 'todo', points: 5, priority: 'High', assignee: 'Mike T.', comments: 2 },
    { id: 'ENG-209', title: 'Set up monitoring dashboards', columnId: 'done', points: 3, priority: 'Low', assignee: 'Emma W.', comments: 1 },
    { id: 'ENG-210', title: 'Redis caching layer', columnId: 'in-progress', points: 8, priority: 'High', assignee: 'Alex D.', comments: 5 },
  ];

  const [tasks, setTasks] = useState(allTasks);

  const moveTask = (taskId, newColumnId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, columnId: newColumnId } : t));
  };

  const getPriorityColor = (p) => {
    switch (p) {
      case 'Critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'High': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Medium': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Kanban className="w-6 h-6 text-indigo-500" /> Sprint Board</h1>
          <p className="text-xs text-slate-400 mt-1">Sprint 43 &bull; {tasks.filter(t => t.columnId === 'done').reduce((s, t) => s + t.points, 0)} / {tasks.reduce((s, t) => s + t.points, 0)} Points Completed</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"><Plus className="w-4 h-4" /> Create Issue</button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 min-h-[500px]">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.columnId === col.id);
          return (
            <div key={col.id} className={`w-80 shrink-0 flex flex-col bg-[#0E1117]/50 rounded-xl border ${col.color} overflow-hidden`}>
              <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-[#0E1117]">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-200">{col.title}</h3>
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1E293B] text-[10px] font-bold text-slate-400">{colTasks.length}</span>
                </div>
                <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {colTasks.map(task => (
                  <motion.div key={task.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#1E293B]/70 border border-slate-800 rounded-xl p-3 hover:border-indigo-500/40 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-indigo-400">{task.id}</span>
                      <div className={"px-2 py-0.5 rounded text-[10px] font-bold border " + getPriorityColor(task.priority)}>{task.priority}</div>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-3 group-hover:text-indigo-300">{task.title}</h4>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[9px] font-bold text-indigo-400">{task.assignee.split(' ').map(w => w[0]).join('')}</div>
                        <span className="text-[10px] font-medium text-slate-400">{task.points} pts</span>
                      </div>
                      {task.comments > 0 && <div className="flex items-center gap-1 text-[10px] text-slate-400"><MessageSquare className="w-3 h-3" />{task.comments}</div>}
                    </div>
                    <div className="hidden group-hover:flex items-center gap-1 mt-3 pt-2 border-t border-slate-800">
                      {columns.filter(c => c.id !== col.id).map(c => (
                        <button key={c.id} onClick={(e) => { e.stopPropagation(); moveTask(task.id, c.id); }}
                          className="text-[9px] px-2 py-0.5 rounded bg-[#0E1117] text-slate-400 hover:text-white hover:bg-[#1E293B] border border-slate-700/50 transition-all">
                          Move to {c.title}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
                {colTasks.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-500">No tasks</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
