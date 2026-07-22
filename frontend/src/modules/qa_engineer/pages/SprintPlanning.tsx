import React, { useState, useContext } from 'react';
import { CalendarDays, Flag, Clock, AlertCircle, Plus, X, CheckCircle, ArrowRight, Target } from 'lucide-react';
import { useSprints } from '../data/hooks';
import { Modal } from '../components/Modal';
import { QaShellContext } from '../layout/QaShell';
import type { SprintTask } from '../data/types';

const statusColors: Record<string, string> = {
  'Done': 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  'In Progress': 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
  'Blocked': 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  'Not Started': 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
};

const priorityColors: Record<string, string> = {
  'P0': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  'P1': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  'P2': 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  'P3': 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
};

export const SprintPlanning: React.FC = () => {
  const { sprints, updateTaskStatus, addTask } = useSprints();
  const { addToast } = useContext(QaShellContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const activeSprint = sprints.find(s => s.isActive);
  const [formData, setFormData] = useState({ title: '', priority: 'P1' as SprintTask['priority'], assignee: 'Unassigned', description: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { addToast('Please enter a task title', 'error'); return; }
    if (activeSprint) {
      addTask(activeSprint.id, { title: formData.title, priority: formData.priority, assignee: formData.assignee, description: formData.description, status: 'Not Started' });
      addToast('Task added to sprint', 'success');
    }
    setShowAddModal(false);
    setFormData({ title: '', priority: 'P1', assignee: 'Unassigned', description: '' });
  };

  const cycleStatus = (task: SprintTask) => {
    const order: SprintTask['status'][] = ['Not Started', 'In Progress', 'Done', 'Blocked'];
    const idx = order.indexOf(task.status);
    const next = order[(idx + 1) % order.length];
    if (activeSprint) {
      updateTaskStatus(activeSprint.id, task.id, next);
      addToast(`"${task.title}" → ${next}`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Sprint Planning</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Align QA testing cycles with engineering sprints</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {sprints.filter(s => s.isActive).map(sprint => (
        <div key={sprint.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
                <Target className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{sprint.name}</h2>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> {sprint.startDate} → {sprint.endDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-slate-400">Progress</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {Math.round((sprint.tasks.filter(t => t.status === 'Done').length / sprint.tasks.length) * 100)}%
                </p>
              </div>
              <div className="px-3 py-1.5 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded-lg text-sm font-bold border border-violet-100 dark:border-violet-900/30">
                Active Sprint
              </div>
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(sprint.tasks.filter(t => t.status === 'Done').length / sprint.tasks.length) * 100}%` }} />
          </div>

          <div className="space-y-3">
            {sprint.tasks.map(task => (
              <div key={task.id}
                onClick={() => cycleStatus(task)}
                className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group"
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  task.status === 'Done' ? 'bg-emerald-50 dark:bg-emerald-900/20' :
                  task.status === 'In Progress' ? 'bg-violet-50 dark:bg-violet-900/20' :
                  task.status === 'Blocked' ? 'bg-red-50 dark:bg-red-900/20' :
                  'bg-slate-50 dark:bg-slate-800'
                }`}>
                  {task.status === 'Done' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> :
                   task.status === 'In Progress' ? <Clock className="w-5 h-5 text-violet-500" /> :
                   task.status === 'Blocked' ? <AlertCircle className="w-5 h-5 text-red-500" /> :
                   <Flag className="w-5 h-5 text-slate-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-bold ${task.status === 'Done' ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-900 dark:text-slate-100'}`}>
                    {task.title}
                  </h4>
                  {task.description && <p className="text-xs text-slate-400 mt-0.5">{task.description}</p>}
                  <p className="text-[10px] text-slate-400 mt-1">{task.assignee}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${priorityColors[task.priority]}`}>{task.priority}</span>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {sprints.filter(s => !s.isActive).map(sprint => (
        <div key={sprint.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm opacity-70">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <CalendarDays className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{sprint.name}</h2>
              <p className="text-xs text-slate-400">{sprint.startDate} → {sprint.endDate} · Completed</p>
            </div>
          </div>
          <div className="text-xs text-slate-400">{sprint.tasks.length} tasks · {sprint.tasks.filter(t => t.status === 'Done').length} completed</div>
        </div>
      ))}

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Sprint Task">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Task Title *</label>
            <input type="text" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100"
              placeholder="What needs to be done?" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Priority</label>
              <select value={formData.priority} onChange={e => setFormData(p => ({ ...p, priority: e.target.value as SprintTask['priority'] }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
                <option value="P0">P0 - Critical</option>
                <option value="P1">P1 - High</option>
                <option value="P2">P2 - Medium</option>
                <option value="P3">P3 - Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Assignee</label>
              <input type="text" value={formData.assignee} onChange={e => setFormData(p => ({ ...p, assignee: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100"
                placeholder="Team member name" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Description</label>
            <textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} rows={3}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 resize-none"
              placeholder="Task details..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddModal(false)}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
            <button type="submit"
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
              <Plus className="w-4 h-4 inline mr-1.5" /> Add Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
