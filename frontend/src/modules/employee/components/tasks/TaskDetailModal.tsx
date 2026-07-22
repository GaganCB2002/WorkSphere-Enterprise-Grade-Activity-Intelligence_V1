import React, { useState } from 'react';
import { Clock, Send, Paperclip, CheckSquare, Plus, ChevronRight, CornerDownRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { StatusBadge } from '../ui/StatusBadge';
import { Avatar } from '../ui/Avatar';
import type { Task, TaskComment, TaskStatus } from '../../types';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onProgressChange: (taskId: string, progress: number) => void;
  onAddComment: (taskId: string, commentText: string) => void;
}

export function TaskDetailModal({
  isOpen,
  onClose,
  task,
  onStatusChange,
  onProgressChange,
  onAddComment
}: TaskDetailModalProps) {
  const [commentText, setCommentText] = useState('');
  const [localSubtasks, setLocalSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);

  // Sync subtasks locally when task opens
  React.useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalSubtasks(task.subtasks || []);
    }
  }, [task]);

  if (!task) return null;

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(task.id, commentText.trim());
    setCommentText('');
  };

  const handleToggleSubtask = (subtaskId: string) => {
    const updated = localSubtasks.map(s =>
      s.id === subtaskId ? { ...s, completed: !s.completed } : s
    );
    setLocalSubtasks(updated);
    
    // Auto-calculate parent task progress based on subtasks
    const completedCount = updated.filter(s => s.completed).length;
    const progressPercent = Math.round((completedCount / updated.length) * 100);
    onProgressChange(task.id, progressPercent);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task.title}
      subtitle={`${task.project} • Task #${task.id}`}
      size="lg"
    >
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) - Description, Subtasks, Comments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-normal bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-white/[0.03]">
              {task.description}
            </p>
          </div>

          {/* Subtasks checklist */}
          {localSubtasks.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subtasks Checklist</h4>
              <div className="space-y-2">
                {localSubtasks.map(sub => (
                  <label
                    key={sub.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-white/[0.03] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={sub.completed}
                      onChange={() => handleToggleSubtask(sub.id)}
                      className="w-4.5 h-4.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span className={`text-xs font-medium ${sub.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {sub.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Comments</h4>
            <div className="space-y-3 mb-4 max-h-[220px] overflow-y-auto emp-scrollbar pr-1">
              {task.comments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No comments yet. Start the conversation!</p>
              ) : (
                task.comments.map(c => (
                  <div key={c.id} className="flex gap-2.5 items-start p-3 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-white/[0.02] rounded-xl">
                    <Avatar name={c.authorName} size="xs" className="mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{c.authorName}</span>
                        <span className="text-[9px] text-slate-400">{new Date(c.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal font-normal">{c.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/85 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (1/3) - Sidebar Meta Controls */}
        <div className="space-y-5 lg:border-l lg:border-slate-100 lg:dark:border-white/[0.04] lg:pl-6">
          {/* Status Select */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Status</label>
            <select
              value={task.status}
              onChange={e => onStatusChange(task.id, e.target.value as TaskStatus)}
              className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-200 outline-none"
            >
              <option value="backlog">Backlog</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="review">In Review</option>
              <option value="done">Completed</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {/* Progress Slider */}
          <div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              <span>Task Progress</span>
              <span className="text-blue-500 font-extrabold">{task.progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={task.progress}
              onChange={e => onProgressChange(task.id, Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Priority</label>
            <div className="flex">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded border capitalize ${
                task.priority === 'critical' ? 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-200/50' :
                task.priority === 'high' ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-200/50' :
                task.priority === 'medium' ? 'text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-200/50' :
                'text-slate-500 bg-slate-50 dark:bg-slate-500/10 border-slate-200/50'
              }`}>
                {task.priority} Priority
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/[0.04]">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
              <span>Created</span>
              <span className="text-slate-700 dark:text-slate-300 font-bold">
                {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
              <span>Deadline</span>
              <span className="text-rose-500 font-bold">
                {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Assignees */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/[0.04] space-y-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Assignee</span>
              <div className="flex items-center gap-2">
                <Avatar name={task.assigneeName} size="xs" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{task.assigneeName}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Reporter</span>
              <div className="flex items-center gap-2">
                <Avatar name={task.reporterName} size="xs" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{task.reporterName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TaskDetailModal;
