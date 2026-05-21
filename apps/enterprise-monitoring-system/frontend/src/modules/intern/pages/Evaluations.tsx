import React from 'react';
import { Star, TrendingUp, MessageCircle, CheckCircle, Award, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const radarData = [
  { skill: 'Technical', score: 85 },
  { skill: 'Communication', score: 78 },
  { skill: 'Teamwork', score: 90 },
  { skill: 'Problem Solving', score: 82 },
  { skill: 'Learning', score: 95 },
  { skill: 'Punctuality', score: 88 },
];

const feedbackItems = [
  { from: 'Sarah Jenkins', role: 'Mentor', date: 'May 15', text: 'Excellent progress on the React components. Your code quality has improved significantly since Week 3. Keep focusing on test coverage.', rating: 4.8 },
  { from: 'Michael Chang', role: 'Tech Lead', date: 'May 10', text: 'Good initiative on the Docker optimization task. Consider exploring multi-stage builds for further improvements.', rating: 4.5 },
  { from: 'Priya Sharma', role: 'PM', date: 'May 5', text: 'Great communication during standups. Documentation of the API endpoints was thorough and well-structured.', rating: 4.7 },
];

export const Evaluations: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h2 className="text-lg font-bold text-white">Evaluations</h2>
        <p className="text-xs text-[#6e7681] mt-0.5">Performance scores, mentor feedback, and final assessment tracking</p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { label: 'Overall Score', value: '4.6 / 5.0', icon: Star, color: 'amber' },
          { label: 'Task Completion', value: '87%', icon: CheckCircle, color: 'emerald' },
          { label: 'Assessment Status', value: 'Midpoint Review', icon: Award, color: 'violet' },
        ].map((s, i) => (
          <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${
                s.color === 'amber' ? 'text-amber-400' :
                s.color === 'emerald' ? 'text-emerald-400' : 'text-violet-400'
              }`} />
              <span className="text-[11px] text-[#6e7681]">{s.label}</span>
            </div>
            <div className="text-lg font-bold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Radar Chart */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Skill Evaluation Radar</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#21262d" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#6e7681', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#484f58', fontSize: 10 }} />
                <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mentor Feedback */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Recent Feedback</h3>
          <div className="space-y-3">
            {feedbackItems.map((fb, i) => (
              <div key={i} className="p-3.5 bg-[#0d1117] border border-[#1b1f27] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-[9px] text-violet-400 font-bold">{fb.from.charAt(0)}</div>
                    <div>
                      <span className="text-xs font-semibold text-slate-200">{fb.from}</span>
                      <span className="text-[10px] text-[#484f58] ml-1.5">{fb.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />{fb.rating}
                  </div>
                </div>
                <p className="text-xs text-[#8b949e] leading-relaxed">{fb.text}</p>
                <span className="text-[10px] text-[#484f58] mt-2 block">{fb.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
