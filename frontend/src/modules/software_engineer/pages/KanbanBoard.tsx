// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Kanban, Plus, MoreHorizontal, MessageSquare, AlertTriangle, CheckCircle2, Clock, PlayCircle, User, Users, Filter, Layout } from 'lucide-react';

export const KanbanBoard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/kanban-board')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="flex gap-4 h-96"><div className="w-72 bg-[#0F172A]/90 rounded-2xl" /><div className="w-72 bg-[#0F172A]/90 rounded-2xl" /><div className="w-72 bg-[#0F172A]/90 rounded-2xl" /></div></div>;

  const swimlanes = data?.swimlanes || [
    { id: 'backend', title: 'Backend', color: 'border-l-blue-500' },
    { id: 'frontend', title: 'Frontend', color: 'border-l-amber-500' },
    { id: 'devops', title: 'DevOps', color: 'border-l-emerald-500' },
  ];
  const columns = data?.columns || [
    { id: 'todo', title: 'To Do', wipLimit: 8 },
    { id: 'in-progress', title: 'In Progress', wipLimit: 4 },
    { id: 'review', title: 'Review', wipLimit: 3 },
    { id: 'done', title: 'Done', wipLimit: 99 },
  ];
  const allTasks = data?.tasks || [
    { id: 'ENG-301', title: 'Implement GraphQL schema', swimlaneId: 'backend', columnId: 'in-progress', assignee: 'Alex D.', points: 8 },
    { id: 'ENG-302', title: 'Build React component library', swimlaneId: 'frontend', columnId: 'todo', assignee: 'Sarah J.', points: 13 },
    { id: 'ENG-303', title: 'Set up Terraform modules', swimlaneId: 'devops', columnId: 'review', assignee: 'Mike T.', points: 5 },
    { id: 'ENG-304', title: 'Write API integration tests', swimlaneId: 'backend', columnId: 'todo', assignee: 'Emma W.', points: 5 },
    { id: 'ENG-305', title: 'Implement dark mode theme', swimlaneId: 'frontend', columnId: 'in-progress', assignee: 'Sarah J.', points: 3 },
    { id: 'ENG-306', title: 'Configure CI/CD pipeline', swimlaneId: 'devops', columnId: 'done', assignee: 'Mike T.', points: 8 },
    { id: 'ENG-307', title: 'Database query optimization', swimlaneId: 'backend', columnId: 'review', assignee: 'Alex D.', points: 5 },
    { id: 'ENG-308', title: 'Add error boundary components', swimlaneId: 'frontend', columnId: 'todo', assignee: 'Emma W.', points: 2 },
    { id: 'ENG-309', title: 'Docker image optimization', swimlaneId: 'devops', columnId: 'in-progress', assignee: 'Mike T.', points: 3 },
  ];

  const [tasks, setTasks] = useState(allTasks);

  const moveTask = (taskId, newColumnId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, columnId: newColumnId } : t));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Layout className="w-6 h-6 text-indigo-500" /> Kanban Board</h1>
          <p className="text-xs text-slate-400 mt-1">Swimlanes: Backend, Frontend, DevOps</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"><Plus className="w-4 h-4" /> Add Task</button>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-32 p-3 bg-[#1E293B]/50 border-b border-r border-slate-800 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">Swimlane</th>
                {columns.map(col => {
                  const count = tasks.filter(t => t.columnId === col.id).length;
                  const overWip = count > col.wipLimit;
                  return (
                    <th key={col.id} className="p-3 bg-[#1E293B]/50 border-b border-slate-800 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        {col.title}
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${overWip ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800 text-slate-400'}`}>
                          {count}/{col.wipLimit}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {swimlanes.map(sl => (
                <tr key={sl.id} className={`border-b border-slate-800/50 ${sl.color} border-l-4`}>
                  <td className="p-3 border-r border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${sl.id === 'backend' ? 'bg-blue-500/10' : sl.id === 'frontend' ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                        <Users className={`w-4 h-4 ${sl.id === 'backend' ? 'text-blue-400' : sl.id === 'frontend' ? 'text-amber-400' : 'text-emerald-400'}`} />
                      </div>
                      <span className="text-xs font-bold text-white">{sl.title}</span>
                    </div>
                  </td>
                  {columns.map(col => {
                    const cellTasks = tasks.filter(t => t.swimlaneId === sl.id && t.columnId === col.id);
                    return (
                      <td key={col.id} className="p-2 border-r border-slate-800/30 align-top">
                        <div className="space-y-2 min-h-[80px]">
                          {cellTasks.map(task => (
                            <div key={task.id} className="bg-[#1E293B]/70 border border-slate-800 rounded-lg p-2.5 hover:border-indigo-500/40 transition-all cursor-pointer group">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[9px] font-mono font-bold text-indigo-400">{task.id}</span>
                                <span className="text-[10px] font-bold text-slate-400">{task.points} pts</span>
                              </div>
                              <p className="text-[11px] font-semibold text-slate-200 group-hover:text-indigo-300">{task.title}</p>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="w-5 h-5 rounded-full bg-indigo-900 border border-indigo-500/30 flex items-center justify-center text-[8px] font-bold text-indigo-400">{task.assignee.split(' ').map(w => w[0]).join('')}</div>
                                <button onClick={(e) => { e.stopPropagation(); const cols = columns.map(c => c.id); const idx = cols.indexOf(col.id); if (idx < cols.length - 1) moveTask(task.id, cols[idx + 1]); }}
                                  className="text-[9px] text-slate-400 hover:text-white">Move &rarr;</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
