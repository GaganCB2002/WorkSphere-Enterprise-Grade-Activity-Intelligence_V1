import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Lock, Trophy, Star, ArrowRight, Clock, Flame } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  score: number | null;
  status: 'completed' | 'in_progress' | 'locked';
  duration: string;
}

const courses: Course[] = [
  { id: 'c1', title: 'Git & GitHub Workflows', category: 'DevOps', progress: 100, totalLessons: 8, completedLessons: 8, score: 95, status: 'completed', duration: '2h 30m' },
  { id: 'c2', title: 'React 18 & Component Patterns', category: 'Frontend', progress: 100, totalLessons: 12, completedLessons: 12, score: 92, status: 'completed', duration: '4h 15m' },
  { id: 'c3', title: 'TypeScript Advanced Types', category: 'Frontend', progress: 85, totalLessons: 10, completedLessons: 8, score: 88, status: 'in_progress', duration: '3h 45m' },
  { id: 'c4', title: 'REST API Design with Spring Boot', category: 'Backend', progress: 60, totalLessons: 14, completedLessons: 8, score: 80, status: 'in_progress', duration: '5h 20m' },
  { id: 'c5', title: 'Docker & Containerization', category: 'DevOps', progress: 30, totalLessons: 8, completedLessons: 2, score: null, status: 'in_progress', duration: '3h 10m' },
  { id: 'c6', title: 'Kubernetes Fundamentals', category: 'DevOps', progress: 0, totalLessons: 10, completedLessons: 0, score: null, status: 'locked', duration: '4h 00m' },
  { id: 'c7', title: 'PostgreSQL Performance Tuning', category: 'Database', progress: 0, totalLessons: 6, completedLessons: 0, score: null, status: 'locked', duration: '2h 45m' },
];

const categoryColors: Record<string, string> = {
  Frontend: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Backend: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  DevOps: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Database: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const LearningHub: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const completedCount = courses.filter(c => c.status === 'completed').length;
  const totalScore = courses.filter(c => c.score !== null).reduce((sum, c) => sum + (c.score || 0), 0);
  const avgScore = Math.round(totalScore / courses.filter(c => c.score !== null).length);

  const filtered = filter === 'all' ? courses : courses.filter(c => c.status === filter);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Learning Hub</h2>
          <p className="text-xs text-[#6e7681] mt-0.5">Your roadmap to becoming a full-stack engineer</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Courses Completed', value: `${completedCount} / ${courses.length}`, icon: Trophy, color: 'emerald' },
          { label: 'Average Score', value: `${avgScore}%`, icon: Star, color: 'amber' },
          { label: 'Learning Streak', value: '12 days', icon: Flame, color: 'rose' },
          { label: 'Total Time', value: '18h 30m', icon: Clock, color: 'violet' },
        ].map((s, i) => (
          <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${
                s.color === 'emerald' ? 'text-emerald-400' :
                s.color === 'amber' ? 'text-amber-400' :
                s.color === 'rose' ? 'text-rose-400' :
                'text-violet-400'
              }`} />
              <span className="text-[11px] text-[#6e7681] font-medium">{s.label}</span>
            </div>
            <div className="text-lg font-bold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-[#0d1117] border border-[#21262d] rounded-lg p-1 w-fit">
        {[
          { key: 'all', label: 'All Courses' },
          { key: 'in_progress', label: 'In Progress' },
          { key: 'completed', label: 'Completed' },
          { key: 'locked', label: 'Locked' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filter === tab.key
                ? 'bg-violet-500/15 text-violet-400'
                : 'text-[#6e7681] hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(course => (
          <div
            key={course.id}
            className={`bg-[#161b22] border border-[#21262d] rounded-xl p-5 transition-all group ${
              course.status === 'locked' ? 'opacity-50' : 'hover:border-[#30363d] cursor-pointer'
            }`}
          >
            {/* Top Row */}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryColors[course.category] || ''}`}>
                {course.category}
              </span>
              {course.status === 'completed' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              {course.status === 'locked' && <Lock className="w-4 h-4 text-[#484f58]" />}
              {course.status === 'in_progress' && <Play className="w-4 h-4 text-violet-400" />}
            </div>

            {/* Title */}
            <h4 className="text-sm font-semibold text-slate-200 mb-1 group-hover:text-violet-300 transition-colors">{course.title}</h4>
            <p className="text-[11px] text-[#6e7681] mb-4">{course.completedLessons} of {course.totalLessons} lessons · {course.duration}</p>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-[#21262d] rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all ${
                  course.progress === 100 ? 'bg-emerald-500' : 'bg-violet-500'
                }`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#6e7681]">{course.progress}% complete</span>
              {course.score !== null && (
                <span className="text-xs font-bold text-amber-400">Score: {course.score}%</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
