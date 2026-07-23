// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Kanban, Plus, MoreHorizontal, MessageSquare, Calendar, Flag, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SprintBoard = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/sprints/board').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const columns = data?.columns || [{ id: 'todo', title: 'To Do' }, { id: 'in-progress', title: 'In Progress' }, { id: 'review', title: 'Code Review' }, { id: 'done', title: 'Done' }];
  const tasks = data?.tasks || [
    { id: 'ENG-401', title: 'Migrate core auth to OAuth2.0', columnId: 'todo', points: 8, priority: 'High', assignee: 'Alex D.', comments: 4 },
    { id: 'ENG-402', title: 'Resolve Redis connection leaks', columnId: 'in-progress', points: 5, priority: 'Critical', assignee: 'Sarah J.', comments: 12 },
    { id: 'ENG-403', title: 'Implement Framer Motion transitions', columnId: 'in-progress', points: 3, priority: 'Medium', assignee: 'You', comments: 2 },
    { id: 'ENG-404', title: 'Setup GitHub Actions CI pipeline', columnId: 'review', points: 5, priority: 'High', assignee: 'Mike T.', comments: 8 },
    { id: 'ENG-405', title: 'Update API v2 docs', columnId: 'done', points: 2, priority: 'Low', assignee: 'Emma W.', comments: 0 },
  ];
  const getPriorityColor = (p) => { switch(p) { case 'Critical': return 'text-rose-400 bg-rose-400/10 border-rose-400/20'; case 'High': return 'text-amber-400 bg-amber-400/10 border-amber-400/20'; case 'Medium': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'; default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20'; } };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Kanban className="w-6 h-6 text-indigo-500" /> Sprint Board</h1><p className="text-xs text-slate-400 mt-1">Sprint 42 &bull; 18 / 44 Points Completed</p></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold"><Plus className="w-4 h-4" /> Create Issue</button>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 min-h-[500px]">
        {columns.map(col => { const colTasks = tasks.filter(t => t.columnId === col.id);
          return (
            <div key={col.id} className="w-80 shrink-0 flex flex-col bg-[#0E1117]/50 rounded-xl border border-[#21262d] overflow-hidden">
              <div className="p-3 border-b border-[#21262d] flex items-center justify-between bg-[#0E1117]">
                <div className="flex items-center gap-2"><h3 className="font-bold text-sm text-slate-200">{col.title}</h3><span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#21262d] text-[10px] font-bold text-slate-400">{colTasks.length}</span></div>
              </div>
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {colTasks.map(task => (
                  <div key={task.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-[#8b949e]">{task.id}</span>
                      <div className={"px-2 py-0.5 rounded text-[10px] font-bold border " + getPriorityColor(task.priority)}>{task.priority}</div>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-3 group-hover:text-indigo-400">{task.title}</h4>
                    <div className="flex items-center justify-between pt-2 border-t border-[#21262d]">
                      <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[9px] font-bold text-indigo-400">{task.assignee.split(' ')[0][0]}</div><span className="text-[10px] font-medium text-slate-400">{task.points} pts</span></div>
                      {task.comments > 0 && <div className="flex items-center gap-1 text-[10px] text-[#8b949e]"><MessageSquare className="w-3 h-3" />{task.comments}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

