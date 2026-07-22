import React from 'react';
import { Calendar, MessageSquare, CheckSquare, Paperclip, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { Avatar } from '../ui/Avatar';
import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  // Subtasks completion ratio
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const totalSubtasks = task.subtasks.length;

  const isOverdue = React.useMemo(() => {
    if (task.status === 'done') return false;
    const deadlineDate = new Date(task.deadline);
    const today = new Date(2026, 4, 21); // today in mock data
    return deadlineDate < today;
  }, [task.deadline, task.status]);

  const priorityColor = React.useMemo(() => {
    switch (task.priority) {
      case 'critical': return 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-200/50';
      case 'high': return 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-200/50';
      case 'medium': return 'text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-200/50';
      case 'low': return 'text-slate-500 bg-slate-50 dark:bg-slate-500/10 border-slate-200/50';
      default: return 'text-slate-500 bg-slate-50 border-slate-200/50';
    }
  }, [task.priority]);

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/[0.04] hover:border-blue-500/50 dark:hover:border-blue-500/50 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all group duration-200"
    >
      {/* Epic/Project Tag */}
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md"
          style={{ backgroundColor: `${task.projectColor}15`, color: task.projectColor }}
        >
          {task.project}
        </span>
        <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded border capitalize ${priorityColor}`}>
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2 mb-2">
        {task.title}
      </h4>

      {/* Description preview */}
      <p className="text-[11px] text-slate-400 line-clamp-2 mb-4 leading-relaxed font-normal">
        {task.description}
      </p>

      {/* Progress Bar (if task is in progress) */}
      {task.status === 'in_progress' && (
        <div className="mb-4">
          <div className="flex justify-between items-center text-[9px] font-semibold text-slate-400 mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-slate-100 dark:border-white/[0.04] pt-3 flex items-center justify-between gap-2">
        {/* Indicators */}
        <div className="flex items-center gap-3 text-slate-400">
          {totalSubtasks > 0 && (
            <div className="flex items-center gap-1" title="Subtasks">
              <CheckSquare className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">{completedSubtasks}/{totalSubtasks}</span>
            </div>
          )}
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1" title="Comments">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">{task.comments.length}</span>
            </div>
          )}
          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1" title="Attachments">
              <Paperclip className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">{task.attachments.length}</span>
            </div>
          )}
          {task.storyPoints > 0 && (
            <div className="px-1.5 py-0.5 rounded bg-slate-150 dark:bg-slate-800 text-[10px] font-bold text-slate-500" title="Story Points">
              {task.storyPoints}
            </div>
          )}
        </div>

        {/* Due Date & Assignee */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className={`flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${
              isOverdue
                ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-500 border border-rose-200/50'
                : 'text-slate-400'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            {isOverdue && <AlertTriangle className="w-2.5 h-2.5 ml-0.5" />}
          </div>

          <Avatar
            name={task.assigneeName}
            size="xs"
            className="ring-2 ring-white dark:ring-slate-900 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
