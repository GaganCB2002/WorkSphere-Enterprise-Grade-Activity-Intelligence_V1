import React, { useState } from 'react';
import { MoreHorizontal, Plus, AlertCircle, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'BLOCKED' | 'DONE';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  assignee: string;
  points: number;
  tag: string;
}

const mockTasks: Task[] = [
  { id: 'ENG-101', title: 'Implement gRPC streaming for telemetry service', status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'Alex', points: 8, tag: 'Backend' },
  { id: 'ENG-105', title: 'Refactor Redux store to use Zustand', status: 'REVIEW', priority: 'MEDIUM', assignee: 'Sarah', points: 5, tag: 'Frontend' },
  { id: 'ENG-112', title: 'Fix memory leak in websocket event listeners', status: 'BLOCKED', priority: 'CRITICAL', assignee: 'Alex', points: 3, tag: 'Core' },
  { id: 'ENG-120', title: 'Write unit tests for authentication middleware', status: 'TODO', priority: 'MEDIUM', assignee: 'David', points: 2, tag: 'Testing' },
  { id: 'ENG-125', title: 'Update Kubernetes deployment manifests for production', status: 'DONE', priority: 'HIGH', assignee: 'Sarah', points: 5, tag: 'DevOps' },
];

const COLUMNS: { id: TaskStatus; title: string; icon: React.ReactNode; color: string }[] = [
  { id: 'TODO', title: 'To Do', icon: <Clock className="w-4 h-4 text-slate-400" />, color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
  { id: 'IN_PROGRESS', title: 'In Progress', icon: <PlayCircle className="w-4 h-4 text-blue-400" />, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { id: 'REVIEW', title: 'In Review', icon: <AlertCircle className="w-4 h-4 text-amber-400" />, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { id: 'BLOCKED', title: 'Blocked', icon: <AlertCircle className="w-4 h-4 text-rose-400" />, color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  { id: 'DONE', title: 'Done', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
];

export const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#21262d]">
        <div>
          <h1 className="text-2xl font-bold text-[#e6edf3]">Active Sprint (Sprint 42)</h1>
          <p className="text-sm text-[#8b949e] mt-1">12 days remaining • 23 story points assigned</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {['Alex', 'Sarah', 'David'].map(name => (
              <div key={name} className="w-8 h-8 rounded-full bg-[#21262d] border-2 border-[#0E1117] flex items-center justify-center text-xs font-bold text-[#e6edf3]">
                {name[0]}
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-md transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Create Issue</span>
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-max pb-4">
          {COLUMNS.map(column => {
            const columnTasks = tasks.filter(t => t.status === column.id);
            return (
              <div key={column.id} className="w-[320px] flex flex-col max-h-full">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    {column.icon}
                    <h3 className="font-semibold text-sm text-[#e6edf3]">{column.title}</h3>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#21262d] text-[#8b949e]">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button className="text-[#8b949e] hover:text-[#e6edf3] p-1 rounded-md hover:bg-[#21262d]">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Column Tasks */}
                <div className="flex-1 overflow-y-auto space-y-3 p-1">
                  {columnTasks.map(task => (
                    <div 
                      key={task.id} 
                      className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 hover:border-[#8b949e] transition-colors cursor-pointer shadow-sm group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-mono text-[#8b949e]">{task.id}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          task.priority === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                          task.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-[#21262d] text-[#8b949e] border-[#30363d]'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <p className="text-sm font-medium text-[#e6edf3] leading-snug mb-3">
                        {task.title}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs mt-auto">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full border ${column.color}`}>
                            {task.tag}
                          </span>
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#30363d] text-[10px] font-bold text-[#e6edf3]">
                            {task.points}
                          </span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center font-bold text-blue-200">
                          {task.assignee[0]}
                        </div>
                      </div>

                      {/* Hover Actions (Simulated drag drop via buttons for simplicity) */}
                      <div className="hidden group-hover:flex items-center gap-1 mt-3 pt-3 border-t border-[#30363d]">
                        {COLUMNS.map(c => c.id !== task.status && (
                          <button 
                            key={c.id}
                            onClick={(e) => { e.stopPropagation(); moveTask(task.id, c.id); }}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
                          >
                            Move to {c.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {columnTasks.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-[#30363d] rounded-lg flex items-center justify-center text-sm text-[#8b949e]">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
