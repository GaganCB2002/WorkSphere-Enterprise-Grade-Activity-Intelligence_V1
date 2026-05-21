import React from 'react';
import {
  TrendingUp, Clock, BookOpen, CheckCircle, Award, CalendarCheck,
  ArrowUpRight, ArrowRight, Sparkles, Target, Zap, Users
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  RadialBarChart, RadialBar, BarChart, Bar
} from 'recharts';

const weeklyProductivity = [
  { day: 'Mon', hours: 6.5, tasks: 3 },
  { day: 'Tue', hours: 7.2, tasks: 4 },
  { day: 'Wed', hours: 5.8, tasks: 2 },
  { day: 'Thu', hours: 8.1, tasks: 5 },
  { day: 'Fri', hours: 7.0, tasks: 4 },
];

const internshipProgress = [{ name: 'Progress', value: 52, fill: '#8b5cf6' }];

const learningData = [
  { module: 'Git', score: 95 },
  { module: 'React', score: 88 },
  { module: 'TypeScript', score: 72 },
  { module: 'APIs', score: 60 },
  { module: 'Docker', score: 30 },
];

export const InternOverview: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600/20 via-fuchsia-600/10 to-transparent border border-violet-500/20 p-6">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Week 6 of 12</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Intern!</h1>
          <p className="text-sm text-slate-400 max-w-lg">You're at the midpoint of your internship. Keep up the momentum — your mentor review is coming up this Friday.</p>
          <div className="flex items-center gap-3 mt-4">
            <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              <Target className="w-4 h-4" />
              View Today's Tasks
            </button>
            <button className="flex items-center gap-2 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <BookOpen className="w-4 h-4" />
              Continue Learning
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-full opacity-10 bg-gradient-to-l from-violet-500 to-transparent"></div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tasks Completed', value: '12 / 18', trend: '+3 this week', icon: CheckCircle, color: 'emerald' },
          { label: 'Learning Progress', value: '68%', trend: '4 modules left', icon: BookOpen, color: 'violet' },
          { label: 'Attendance Rate', value: '96.4%', trend: 'On track', icon: CalendarCheck, color: 'blue' },
          { label: 'Mentor Score', value: '4.8 / 5', trend: 'Exceeding expectations', icon: Award, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 hover:border-[#30363d] transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                stat.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                stat.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                stat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                'bg-amber-500/10 text-amber-400'
              }`}>
                <stat.icon className="w-4.5 h-4.5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#484f58] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-[#6e7681] mt-0.5">{stat.label}</div>
            <div className={`text-[11px] font-medium mt-1 ${
              stat.color === 'emerald' ? 'text-emerald-400' :
              stat.color === 'violet' ? 'text-violet-400' :
              stat.color === 'blue' ? 'text-blue-400' :
              'text-amber-400'
            }`}>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Weekly Productivity */}
        <div className="lg:col-span-2 bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Weekly Productivity</h3>
              <p className="text-xs text-[#6e7681] mt-0.5">Hours worked & tasks completed</p>
            </div>
            <select className="bg-[#0d1117] border border-[#21262d] text-xs text-slate-400 rounded-lg px-2.5 py-1.5 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProductivity}>
                <defs>
                  <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
                <XAxis dataKey="day" stroke="#484f58" tick={{ fontSize: 11 }} />
                <YAxis stroke="#484f58" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', borderRadius: '0.75rem', fontSize: 12, color: '#e2e8f0' }} />
                <Area type="monotone" dataKey="hours" stroke="#8b5cf6" fill="url(#prodGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Internship Completion */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-white mb-1">Internship Progress</h3>
          <p className="text-xs text-[#6e7681] mb-4">Week 6 of 12 — Midpoint</p>
          <div className="h-[160px] w-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={internshipProgress} startAngle={90} endAngle={-270}>
                <RadialBar background={{ fill: '#21262d' }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-2">
            <div className="text-3xl font-bold text-violet-400">52%</div>
            <div className="text-xs text-[#6e7681]">completed</div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Learning Progress */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Learning Modules</h3>
            <button className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={learningData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
                <XAxis type="number" domain={[0, 100]} stroke="#484f58" tick={{ fontSize: 11 }} />
                <YAxis dataKey="module" type="category" stroke="#484f58" tick={{ fontSize: 11 }} width={70} />
                <Tooltip contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', borderRadius: '0.75rem', fontSize: 12, color: '#e2e8f0' }} />
                <Bar dataKey="score" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming & Quick Actions */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Upcoming</h3>
          <div className="space-y-3">
            {[
              { title: 'Mentor 1-on-1 Review', time: 'Friday, 2:00 PM', type: 'meeting', color: 'violet' },
              { title: 'Submit Sprint Task #3', time: 'Tomorrow, 6:00 PM', type: 'deadline', color: 'rose' },
              { title: 'Complete Docker Module', time: 'This week', type: 'learning', color: 'blue' },
              { title: 'Midpoint Self-Assessment', time: 'May 28', type: 'evaluation', color: 'amber' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#0d1117] border border-[#1b1f27] hover:border-[#30363d] transition-colors cursor-pointer group">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  item.color === 'violet' ? 'bg-violet-500' :
                  item.color === 'rose' ? 'bg-rose-500' :
                  item.color === 'blue' ? 'bg-blue-500' :
                  'bg-amber-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">{item.title}</div>
                  <div className="text-[11px] text-[#6e7681]">{item.time}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#30363d] group-hover:text-slate-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
