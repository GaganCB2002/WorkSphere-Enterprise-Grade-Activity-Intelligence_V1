import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, AlertCircle, MessageCircle, Paperclip, ChevronDown, Filter, Plus } from 'lucide-react';

type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: 'High' | 'Medium' | 'Low';
  mentor: string;
  deadline: string;
  comments: number;
  attachments: number;
}

const initialTasks: Task[] = [
  { id: 'T-101', title: 'Fix responsive layout for DepartmentView on mobile', status: 'DONE', priority: 'Medium', mentor: 'Sarah Jenkins', deadline: 'May 15', comments: 3, attachments: 1 },
  { id: 'T-102', title: 'Write Jest unit tests for StatCard trend calculations', status: 'IN_PROGRESS', priority: 'High', mentor: 'Sarah Jenkins', deadline: 'May 22', comments: 5, attachments: 2 },
  { id: 'T-103', title: 'Pair program with Tech Lead on Redis JWT rotation', status: 'TODO', priority: 'High', mentor: 'Michael Chang', deadline: 'May 25', comments: 0, attachments: 0 },
  { id: 'T-104', title: 'Build intern onboarding form component with Zod validation', status: 'TODO', priority: 'Medium', mentor: 'Sarah Jenkins', deadline: 'May 28', comments: 1, attachments: 0 },
  { id: 'T-105', title: 'Document API endpoints for HR microservice in Swagger', status: 'REVIEW', priority: 'Low', mentor: 'Michael Chang', deadline: 'May 20', comments: 2, attachments: 3 },
  { id: 'T-106', title: 'Optimize Docker build step — reduce image size by 30%', status: 'TODO', priority: 'Low', mentor: 'Michael Chang', deadline: 'Jun 1', comments: 0, attachments: 0 },
];

const columns: { status: TaskStatus; label: string; color: string; icon: React.ReactNode }[] = [
  { status: 'TODO', label: 'To Do', color: 'text-slate-400', icon: <Circle className="w-4 h-4" /> },
  { status: 'IN_PROGRESS', label: 'In Progress', color: 'text-blue-400', icon: <Clock className="w-4 h-4" /> },
  { status: 'REVIEW', label: 'In Review', color: 'text-amber-400', icon: <AlertCircle className="w-4 h-4" /> },
  { status: 'DONE', label: 'Completed', color: 'text-emerald-400', icon: <CheckCircle className="w-4 h-4" /> },
];

const priorityStyles: Record<string, string> = {
  High: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

export const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Task Board</h2>
          <p className="text-xs text-[#6e7681] mt-0.5">Manage and track your assigned sprint tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-[#161b22] border border-[#21262d] rounded-lg hover:border-[#30363d] transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.status);
          return (
            <div key={col.status} className="flex flex-col">
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className={col.color}>{col.icon}</span>
                <span className="text-sm font-semibold text-slate-300">{col.label}</span>
                <span className="bg-[#21262d] text-[#6e7681] text-[10px] font-bold px-1.5 py-0.5 rounded-full">{colTasks.length}</span>
              </div>

              {/* Task Cards */}
              <div className="space-y-2.5 flex-1">
                {colTasks.map(task => (
                  <div key={task.id} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 hover:border-[#30363d] transition-all cursor-pointer group">
                    {/* Priority & ID */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${priorityStyles[task.priority]}`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-[#484f58] font-mono">{task.id}</span>
                    </div>
                    {/* Title */}
                    <h4 className="text-sm font-medium text-slate-200 mb-2 leading-snug group-hover:text-violet-300 transition-colors">{task.title}</h4>
                    {/* Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-[#484f58] text-[11px]">
                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{task.comments}</span>
                        <span className="flex items-center gap-1"><Paperclip className="w-3 h-3" />{task.attachments}</span>
                      </div>
                      <span className="text-[11px] text-[#6e7681]">{task.deadline}</span>
                    </div>
                    {/* Mentor */}
                    <div className="mt-2.5 pt-2.5 border-t border-[#1b1f27] flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-[9px] text-violet-400 font-bold">
                        {task.mentor.charAt(0)}
                      </div>
                      <span className="text-[11px] text-[#6e7681]">{task.mentor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
