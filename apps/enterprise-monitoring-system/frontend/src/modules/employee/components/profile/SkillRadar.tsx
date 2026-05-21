import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { GlassPanel } from '../ui/GlassPanel';
import type { Skill } from '../../types';

interface SkillRadarProps {
  skills: Skill[];
}

export function SkillRadar({ skills }: SkillRadarProps) {
  const radarData = skills.map(s => ({
    subject: s.name.split('/')[0],
    score: s.level,
    benchmark: s.benchmark,
  }));

  return (
    <GlassPanel animate>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Skill Matrix</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} outerRadius="75%">
            <PolarGrid stroke="rgba(148,163,184,0.15)" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Radar name="You" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
            <Radar name="Benchmark" dataKey="benchmark" stroke="#64748b" fill="none" strokeWidth={1} strokeDasharray="4 4" />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {skills.map(skill => (
          <div key={skill.name} className="flex items-center justify-between p-2 rounded-lg">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{skill.name}</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
              <span className="text-[10px] font-bold text-slate-500 w-7 text-right">{skill.level}</span>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export default SkillRadar;
