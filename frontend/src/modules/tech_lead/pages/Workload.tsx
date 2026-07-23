// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, AlertTriangle, TrendingUp, TrendingDown, Filter, Settings2 } from 'lucide-react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export const Workload = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/team/workload').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);

  const workloadData = data?.workloadData || [
    { name: 'Sarah J.', capacity: 100, current: 85, projected: 90 },
    { name: 'Alex D.', capacity: 100, current: 110, projected: 115 },
    { name: 'Mike T.', capacity: 100, current: 45, projected: 60 },
    { name: 'Emma W.', capacity: 100, current: 70, projected: 85 },
    { name: 'David O.', capacity: 100, current: 65, projected: 75 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-500" /> Team Workload</h1>
        <p className="text-xs text-slate-400 mt-0.5">Capacity planning and workload distribution</p>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-base font-bold text-white mb-4">Current Workload vs Capacity</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadData} layout="vertical" margin={{ left: 80, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
              <XAxis type="number" stroke="#64748B" fontSize={12} domain={[0, 120]} />
              <YAxis type="category" dataKey="name" stroke="#64748B" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="capacity" name="Capacity" fill="#334155" radius={[0, 4, 4, 0]} barSize={12} />
              <Bar dataKey="current" name="Current" fill="#6366F1" radius={[0, 4, 4, 0]} barSize={12} />
              <Bar dataKey="projected" name="Projected" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-4 text-xs text-slate-400 justify-end">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#334155]"></span>Capacity</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#6366F1]"></span>Current</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#f59e0b]"></span>Projected</span>
        </div>
      </div>
      <div className="bg-[#0F172A]/90 border border-amber-500/20 rounded-xl p-4 backdrop-blur-md">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold"><AlertTriangle className="w-4 h-4" /> Alex D. is projected to exceed capacity by 15%. Consider redistributing tasks.</div>
      </div>
    </motion.div>
  );
};

