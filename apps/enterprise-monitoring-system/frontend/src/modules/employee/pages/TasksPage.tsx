import React, { useState, useMemo } from 'react';
import { getLiveDate, getLiveTime } from '../../../utils/liveDataHelpers';

import { Plus, Search, Filter, Kanban, ListTodo, Calendar, TrendingUp } from 'lucide-react';
import { useTaskStore } from '../store/employeeStore';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { TaskDetailModal } from '../components/tasks/TaskDetailModal';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Modal } from '../components/ui/Modal';
import type { Task, TaskStatus, TaskPriority } from '../types';
import * as mock from '../data/mockData';

export function TasksPage() {
  const { taskList, updateTaskStatus, updateTaskProgress, addTask, addComment } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProject, setNewProject] = useState('AuraHR Core');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newPoints, setNewPoints] = useState(3);
  const [newDeadline, setNewDeadline] = useState(getLiveDate(-23));

  // Projects list for filtering
  const projects = useMemo(() => {
    const projs = new Set<string>();
    taskList.forEach(t => projs.add(t.project));
    return Array.from(projs);
  }, [taskList]);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return taskList.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            task.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesProject = projectFilter === 'all' || task.project === projectFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesSearch && matchesProject && matchesPriority;
    });
  }, [taskList, searchQuery, projectFilter, priorityFilter]);

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    updateTaskStatus(taskId, status);
    // Sync the selected task state if currently open in modal
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleProgressChange = (taskId: string, progress: number) => {
    updateTaskProgress(taskId, progress);
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => prev ? { ...prev, progress } : null);
    }
  };

  const handleAddComment = (taskId: string, text: string) => {
    const comment = {
      id: `comment-${Date.now()}`,
      author: 'emp-100',
      authorName: 'Gagan Chaudhary',
      content: text,
      timestamp: new Date().toISOString(),
      mentions: []
    };
    addComment(taskId, comment);
    // Sync selected task comments
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => prev ? { ...prev, comments: [...prev.comments, comment] } : null);
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const projectColors: Record<string, string> = {
      'AuraHR Core': '#3b82f6',
      'Workforce Intelligence': '#10b981',
      'Finance & Payroll': '#f59e0b',
      'Talent Management': '#8b5cf6'
    };

    const task: Task = {
      id: `TSK-${100 + taskList.length + 1}`,
      title: newTitle.trim(),
      description: newDesc.trim(),
      project: newProject,
      projectColor: projectColors[newProject] || '#64748b',
      status: 'todo',
      priority: newPriority,
      assignee: 'emp-100',
      assigneeName: 'Gagan Chaudhary',
      reporter: 'emp-011',
      reporterName: 'Ananya Sharma',
      labels: ['feature'],
      deadline: newDeadline,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      progress: 0,
      comments: [],
      attachments: [],
      storyPoints: newPoints,
      subtasks: []
    };

    addTask(task);
    setIsCreateOpen(false);
    
    // Reset form
    setNewTitle('');
    setNewDesc('');
    setNewProject('AuraHR Core');
    setNewPriority('medium');
    setNewPoints(3);
    setNewDeadline(getLiveDate(-16));
  };

  // Sprint metadata calculations
  const sprintStats = useMemo(() => {
    const activeSprintTasks = taskList.filter(t => t.project === 'AuraHR Core');
    const totalPoints = activeSprintTasks.reduce((sum, t) => sum + t.storyPoints, 0);
    const completedPoints = activeSprintTasks.filter(t => t.status === 'done').reduce((sum, t) => sum + t.storyPoints, 0);
    const inProgressCount = activeSprintTasks.filter(t => t.status === 'in_progress').length;
    const remainingCount = activeSprintTasks.filter(t => t.status !== 'done').length;

    return { totalPoints, completedPoints, inProgressCount, remainingCount };
  }, [taskList]);

  return (
    <div className="space-y-6 pb-8">
      {/* Sprint Header */}
      <GlassPanel className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Kanban className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{mock.currentSprint.name}</h1>
              <p className="text-xs text-slate-400 mt-0.5">Sprint window: {mock.currentSprint.startDate} to {mock.currentSprint.endDate}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] text-center min-w-[90px]">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Completed</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{sprintStats.completedPoints} / {sprintStats.totalPoints} SP</p>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] text-center min-w-[90px]">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">In Progress</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{sprintStats.inProgressCount} Tasks</p>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] text-center min-w-[90px]">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Remaining</p>
              <p className="text-sm font-bold text-rose-500 mt-0.5">{sprintStats.remainingCount} Tasks</p>
            </div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </div>
      </GlassPanel>

      {/* Filters Toolbar */}
      <GlassPanel className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by task ID, title, keyword..."
            className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Option Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase text-[10px] tracking-wider">Filters:</span>
          </div>

          <select
            value={projectFilter}
            onChange={e => setProjectFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-white/[0.04] text-slate-700 dark:text-slate-250 outline-none"
          >
            <option value="all">All Epics</option>
            {projects.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-white/[0.04] text-slate-700 dark:text-slate-250 outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </GlassPanel>

      {/* Kanban Board columns */}
      <div className="overflow-hidden">
        <KanbanBoard
          tasks={filteredTasks}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Details Dialog */}
      <TaskDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        task={selectedTask}
        onStatusChange={handleStatusChange}
        onProgressChange={handleProgressChange}
        onAddComment={handleAddComment}
      />

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Sprint Task"
        subtitle="File a ticket directly in the active team cycle."
        size="md"
      >
        <form onSubmit={handleCreateTask} className="p-6 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Task Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="e.g. Implement WebSockets for real-time notification syncing"
              className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              placeholder="Describe user requirements and completion criteria..."
              className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50 font-normal leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Epic/Project</label>
              <select
                value={newProject}
                onChange={e => setNewProject(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-200 outline-none"
              >
                <option value="AuraHR Core">AuraHR Core</option>
                <option value="Workforce Intelligence">Workforce Intelligence</option>
                <option value="Finance & Payroll">Finance & Payroll</option>
                <option value="Talent Management">Talent Management</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={e => setNewPriority(e.target.value as TaskPriority)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-200 outline-none"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Story Points (SP)</label>
              <input
                type="number"
                min="1"
                max="21"
                value={newPoints}
                onChange={e => setNewPoints(Number(e.target.value))}
                className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Due Date</label>
              <input
                type="date"
                required
                value={newDeadline}
                onChange={e => setNewDeadline(e.target.value)}
                className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-805 border border-slate-200/80 dark:border-white/[0.04] text-slate-900 dark:text-white outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-850">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
            >
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default TasksPage;
