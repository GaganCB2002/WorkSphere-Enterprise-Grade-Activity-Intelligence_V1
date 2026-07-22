import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

interface Course {
  id: string;
  title: string;
  progress: number;
  category: string;
  dueDate: string;
}

interface TrainingWidgetProps {
  courses: Course[];
}

export function TrainingWidget({ courses }: TrainingWidgetProps) {
  const navigate = useNavigate();

  const progressColor = (p: number) => p >= 80 ? '#10b981' : p >= 40 ? '#3b82f6' : '#f59e0b';

  return (
    <GlassPanel padding="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-purple-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Training</h3>
        </div>
      </div>
      <div className="space-y-3">
        {courses.slice(0, 4).map(c => (
          <div key={c.id} className="p-3 rounded-xl border border-slate-100 dark:border-white/[0.04]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate flex-1">{c.title}</p>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex-shrink-0 ml-2">{c.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${c.progress}%`, backgroundColor: progressColor(c.progress) }} />
              </div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{c.progress}%</span>
            </div>
            <p className="text-[9px] text-slate-400 mt-1.5 font-semibold">Due {c.dueDate}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/employee/training')}
        className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
      >
        <span>Browse Training</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </GlassPanel>
  );
}
