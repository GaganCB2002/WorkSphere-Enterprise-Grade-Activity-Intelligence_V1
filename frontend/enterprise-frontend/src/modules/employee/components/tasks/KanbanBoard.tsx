import React from 'react';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '../../types';

interface KanbanBoardProps {
  tasks: Task[];
  onCardClick: (task: Task) => void;
}

interface ColumnConfig {
  id: TaskStatus;
  label: string;
  color: string;
  bgColor: string;
}

const columns: ColumnConfig[] = [
  { id: 'backlog', label: 'Backlog', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800/60', bgColor: 'bg-slate-50 dark:bg-slate-900/40' },
  { id: 'todo', label: 'To Do', color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10', bgColor: 'bg-slate-50/70 dark:bg-slate-900/30' },
  { id: 'in_progress', label: 'In Progress', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10', bgColor: 'bg-slate-50/70 dark:bg-slate-900/30' },
  { id: 'review', label: 'In Review', color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10', bgColor: 'bg-slate-50/70 dark:bg-slate-900/30' },
  { id: 'done', label: 'Completed', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10', bgColor: 'bg-slate-50/70 dark:bg-slate-900/30' },
  { id: 'blocked', label: 'Blocked', color: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10', bgColor: 'bg-slate-50/70 dark:bg-slate-900/30' },
];

export function KanbanBoard({ tasks, onCardClick }: KanbanBoardProps) {
  // Group tasks by status
  const groupedTasks = React.useMemo(() => {
    const groups = columns.reduce((acc, col) => {
      acc[col.id] = [];
      return acc;
    }, {} as Record<TaskStatus, Task[]>);

    tasks.forEach(task => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });

    return groups;
  }, [tasks]);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 emp-scrollbar select-none min-h-[500px] items-start">
      {columns.map(col => {
        const columnTasks = groupedTasks[col.id] || [];
        const totalPoints = columnTasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);

        return (
          <div
            key={col.id}
            className={`flex-shrink-0 w-80 rounded-2xl p-4 flex flex-col border border-slate-200/50 dark:border-white/[0.03] ${col.bgColor} max-h-[70vh]`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${col.color}`}>
                  {col.label}
                </span>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  {columnTasks.length}
                </span>
              </div>
              {totalPoints > 0 && (
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md" title="Story Points">
                  {totalPoints} SP
                </span>
              )}
            </div>

            {/* Tasks Stack */}
            <div className="flex-1 overflow-y-auto space-y-3 emp-scrollbar pr-1">
              {columnTasks.length === 0 ? (
                <div className="h-28 border border-dashed border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
                  No tasks
                </div>
              ) : (
                columnTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onCardClick(task)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanbanBoard;
