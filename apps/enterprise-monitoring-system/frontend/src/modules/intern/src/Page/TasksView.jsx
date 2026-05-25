import React, { useState } from 'react';

const COLUMNS = [
  { id: 'backlog', label: 'Backlog', borderClass: 'border-t-outline-variant', headerBg: 'bg-surface-container-highest' },
  { id: 'todo', label: 'To Do', borderClass: 'border-t-outline-variant', headerBg: 'bg-surface-container-highest' },
  { id: 'progress', label: 'In Progress', borderClass: 'border-t-primary', headerBg: 'bg-primary/20' },
  { id: 'review', label: 'Review', borderClass: 'border-t-tertiary', headerBg: 'bg-surface-container-highest' },
  { id: 'completed', label: 'Completed', borderClass: 'border-t-secondary', headerBg: 'bg-surface-container-highest' }
];

export default function TasksView({ tasks, setTasks }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('Medium Priority');
  const [newAssignee, setNewAssignee] = useState('Elena Rostova');

  const moveTask = (id, direction) => {
    const colIds = COLUMNS.map(c => c.id);
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const currIdx = colIds.indexOf(t.column);
        const nextIdx = currIdx + direction;
        if (nextIdx >= 0 && nextIdx < colIds.length) {
          const nextCol = colIds[nextIdx];
          let progress = t.progress;
          if (nextCol === 'completed') progress = 100;
          else if (nextCol === 'backlog') progress = 0;
          else if (nextCol === 'todo') progress = 10;
          return { ...t, column: nextCol, progress };
        }
      }
      return t;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTitle,
      desc: newDesc,
      priority: newPriority,
      date: 'Oct ' + (new Date().getDate()),
      assignee: newAssignee,
      column: 'backlog',
      progress: 0
    };

    setTasks(prev => [...prev, newTask]);
    setNewTitle('');
    setNewDesc('');
    setNewPriority('Medium Priority');
    setShowAddModal(false);
  };

  const getPriorityClass = (priority) => {
    if (priority === 'High Priority') return 'bg-tertiary-container text-on-tertiary-container';
    if (priority === 'Low Priority') return 'bg-secondary-container text-on-secondary-container';
    return 'bg-primary-container/30 text-primary';
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-8 bg-background dark:bg-on-secondary-fixed flex flex-col">
      {/* Page Header & Board Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 select-none">
        <div>
          <h2 className="font-headline text-3xl text-on-background dark:text-surface-bright mb-2">Development Sprint 4</h2>
          <p className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Manage intern tasks, track progress, and review deliverables.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-surface-container-low dark:bg-inverse-surface rounded-full p-1 border border-outline-variant/50">
            <select className="bg-transparent border-none text-sm font-label text-on-surface dark:text-surface-bright py-1.5 pl-3 pr-8 focus:ring-0 cursor-pointer appearance-none">
              <option>Department: All</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
            <div className="w-px h-4 bg-outline-variant"></div>
            <select className="bg-transparent border-none text-sm font-label text-on-surface dark:text-surface-bright py-1.5 pl-3 pr-8 focus:ring-0 cursor-pointer appearance-none">
              <option>Sprint: Active</option>
              <option>Sprint 3</option>
              <option>Backlog</option>
            </select>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary/95 text-on-primary px-5 py-2.5 rounded-lg font-body font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="kanban-board pb-4 flex-1 flex gap-6 overflow-x-auto min-h-[500px]">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter(t => t.column === col.id);
          return (
            <div key={col.id} className={`kanban-column flex flex-col w-80 bg-surface-container-low dark:bg-inverse-surface/40 rounded-xl p-4 border border-outline-variant/30 ${col.borderClass} border-t-4 shrink-0`}>
              <div className="kanban-column-header flex justify-between items-center mb-4 pb-2 border-b border-outline-variant/30">
                <h3 className="font-headline text-lg font-semibold text-on-background dark:text-surface-bright flex items-center gap-2">
                  {col.label}
                  <span className={`text-xs py-0.5 px-2 rounded-full font-body font-medium ${
                    col.id === 'progress' ? 'bg-primary/20 text-primary font-bold' : 'bg-surface-container-highest dark:bg-on-secondary-fixed text-on-surface-variant dark:text-secondary-fixed-dim'
                  }`}>
                    {colTasks.length}
                  </span>
                </h3>
                <button className="text-outline hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">more_horiz</span>
                </button>
              </div>

              {/* Cards List */}
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {colTasks.map((task) => (
                  <div key={task.id} className="kanban-card bg-surface-bright dark:bg-inverse-surface rounded-lg p-5 border border-outline-variant/50 shadow-soft hover:shadow-md hover:border-primary/50 transition-all duration-200">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-outline text-xs flex items-center gap-1 dark:text-secondary-fixed-dim">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span> {task.date}
                      </span>
                    </div>

                    <h4 className="font-body font-semibold text-on-background dark:text-surface-bright text-base mb-2 leading-tight">
                      {task.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant dark:text-secondary-fixed-dim mb-4 line-clamp-2">
                      {task.desc}
                    </p>

                    {/* Progress Slider (Only if has progress or In Progress column) */}
                    {(task.progress > 0 || task.column === 'progress') && (
                      <div className="w-full flex items-center gap-2 mb-4">
                        <span className="text-xs font-semibold text-primary">{task.progress}%</span>
                        <div className="flex-1 bg-surface-container dark:bg-on-secondary-fixed rounded-full h-1.5 overflow-hidden flex">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${task.progress}%` }}></div>
                        </div>
                      </div>
                    )}

                    {/* Card Footer: Assignee & Column Actions */}
                    <div className="flex justify-between items-center mt-2 border-t border-outline-variant/20 pt-3">
                      <div className="flex items-center gap-2 select-none" title={`Assignee: ${task.assignee}`}>
                        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold font-body">
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim truncate max-w-[100px]">{task.assignee}</span>
                      </div>

                      {/* Directional Action Buttons */}
                      <div className="flex items-center gap-1">
                        <button 
                          disabled={task.column === 'backlog'}
                          onClick={() => moveTask(task.id, -1)}
                          className="p-1 rounded hover:bg-surface-container dark:hover:bg-on-secondary-fixed text-outline hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-outline disabled:hover:bg-transparent"
                          title="Move Left"
                        >
                          <span className="material-symbols-outlined text-base">arrow_back</span>
                        </button>
                        <button 
                          disabled={task.column === 'completed'}
                          onClick={() => moveTask(task.id, 1)}
                          className="p-1 rounded hover:bg-surface-container dark:hover:bg-on-secondary-fixed text-outline hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-outline disabled:hover:bg-transparent"
                          title="Move Right"
                        >
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-outline-variant/30 rounded-lg flex items-center justify-center text-sm text-outline dark:text-secondary-fixed-dim select-none">
                    No Tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface dark:bg-inverse-surface border border-outline-variant/50 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="font-headline text-2xl text-on-surface dark:text-surface-bright mb-4 font-semibold">Add New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant dark:text-secondary-fixed-dim uppercase mb-1">Task Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  required
                  placeholder="e.g. Code Review feedback integration"
                  className="w-full bg-surface-container-low dark:bg-on-secondary-fixed border border-outline-variant/50 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-surface-bright focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant dark:text-secondary-fixed-dim uppercase mb-1">Description</label>
                <textarea 
                  value={newDesc} 
                  onChange={(e) => setNewDesc(e.target.value)} 
                  placeholder="Provide brief details about the task..."
                  rows="3"
                  className="w-full bg-surface-container-low dark:bg-on-secondary-fixed border border-outline-variant/50 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-surface-bright focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant dark:text-secondary-fixed-dim uppercase mb-1">Priority</label>
                  <select 
                    value={newPriority} 
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-surface-container-low dark:bg-on-secondary-fixed border border-outline-variant/50 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-surface-bright focus:ring-1 focus:ring-primary"
                  >
                    <option>Low Priority</option>
                    <option>Medium Priority</option>
                    <option>High Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant dark:text-secondary-fixed-dim uppercase mb-1">Assignee</label>
                  <select 
                    value={newAssignee} 
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full bg-surface-container-low dark:bg-on-secondary-fixed border border-outline-variant/50 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary text-on-surface dark:text-surface-bright focus:ring-1 focus:ring-primary"
                  >
                    <option>Elena Rostova</option>
                    <option>Marcus Chen</option>
                    <option>Sarah Anderson</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant/20">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-outline-variant/60 rounded-lg text-sm font-semibold hover:bg-surface-container-high dark:hover:bg-on-secondary-fixed text-on-surface dark:text-surface-bright transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-on-primary rounded-lg text-sm font-semibold transition-colors"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
