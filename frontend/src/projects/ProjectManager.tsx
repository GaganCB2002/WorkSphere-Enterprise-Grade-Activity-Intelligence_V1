import React from 'react';
import { Project, Task } from '../models/types';

interface ProjectManagerProps {
  initialProjects: Project[];
  initialTasks: Task[];
  onTaskCreate: (task: Task) => void;
  onTaskStatusChange: (taskId: string, newStatus: string) => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  initialProjects,
  initialTasks,
  onTaskCreate,
  onTaskStatusChange
}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Projects</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {initialProjects.map(p => (
          <div key={p.id} className="border p-4 rounded border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-800 dark:text-gray-100">{p.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
          </div>
        ))}
      </div>
      <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-900 dark:text-white">Tasks</h3>
      <ul className="space-y-2">
        {initialTasks.map(t => (
          <li key={t.id} className="p-3 border rounded border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800 dark:text-gray-100">{t.title}</span>
              <span className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 rounded">
                {t.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
