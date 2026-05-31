import React, { useState } from 'react';
import { 
  Target, Sparkles, Plus, CheckCircle2, Circle, ArrowUpRight, 
  TrendingUp, Award, Clock 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';

interface Goal {
  id: string;
  title: string;
  target: string;
  current: string;
  progress: number;
  category: 'LIQUIDITY' | 'SAVINGS' | 'REVENUE' | 'COMPLIANCE';
  deadline: string;
  owner: string;
  completed: boolean;
}

export const GoalsTab: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 'G-01', title: 'Increase Liquid Reserve Ratio', target: '₹1.50B', current: '₹1.42B', progress: 94, category: 'LIQUIDITY', deadline: '2026-06-30', owner: 'R. Sharma', completed: false },
    { id: 'G-02', title: 'Reduce Tech Infrastructure OPEX', target: '₹12.0M', current: '₹9.8M', progress: 81, category: 'SAVINGS', deadline: '2026-09-30', owner: 'A. Chen', completed: false },
    { id: 'G-03', title: 'Q3 Enterprise Expansion Revenue', target: '₹35.0M', current: '₹31.2M', progress: 89, category: 'REVENUE', deadline: '2026-06-30', owner: 'S. Jenkins', completed: false },
    { id: 'G-04', title: 'SOC2 Type II Audit Compliance', target: '100% Ok', current: '98% Ok', progress: 98, category: 'COMPLIANCE', deadline: '2026-05-31', owner: 'D. Ross', completed: false },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'LIQUIDITY' | 'SAVINGS' | 'REVENUE' | 'COMPLIANCE'>('REVENUE');
  const [newTarget, setNewTarget] = useState('');

  const handleToggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed, progress: !g.completed ? 100 : 50 } : g));
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newG: Goal = {
      id: `G-0${goals.length + 1}`,
      title: newTitle,
      target: newTarget || '₹1.0M',
      current: '₹0.0M',
      progress: 0,
      category: newCategory,
      deadline: '2026-12-31',
      owner: 'Treasury Officer',
      completed: false
    };
    setGoals(prev => [...prev, newG]);
    setNewTitle('');
    setNewTarget('');
  };

  const chartData = goals.map(g => ({
    name: g.id,
    Progress: g.progress,
    Target: 100
  }));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Treasury Strategic Goals</h1>
          <p className="text-[#8693BA] text-sm mt-1">Track financial growth targets, compliance milestones, and operational OKRs.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-3 bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl flex items-center gap-3">
            <Award className="w-5 h-5 text-[#00e5ff]" />
            <div>
              <span className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider block">Completed OKRs</span>
              <span className="text-sm font-black text-white">{goals.filter(g => g.completed).length} / {goals.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Goals List (Left 8 Columns) */}
        <div className="lg:col-span-8 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-[#1D2644] pb-3">Active Objectives</h3>
          
          <div className="space-y-4">
            {goals.map(goal => (
              <div 
                key={goal.id} 
                className={`p-4 bg-[#0C101F]/80 border rounded-2xl transition-all ${
                  goal.completed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-[#1C2542] hover:border-[#00e5ff]/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => handleToggleGoal(goal.id)}
                      className={`mt-1 transition-colors ${goal.completed ? 'text-emerald-400' : 'text-[#5B678E] hover:text-white'}`}
                    >
                      {goal.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md font-mono ${
                          goal.category === 'LIQUIDITY' ? 'bg-[#00e5ff]/10 text-[#00e5ff]' :
                          goal.category === 'SAVINGS' ? 'bg-amber-500/10 text-amber-400' :
                          goal.category === 'REVENUE' ? 'bg-emerald-500/10 text-emerald-400' :
                          'bg-purple-500/10 text-purple-400'
                        }`}>
                          {goal.category}
                        </span>
                        <span className="text-[10px] text-[#8693BA] font-mono">{goal.id}</span>
                      </div>
                      <h4 className={`text-sm font-bold mt-1 ${goal.completed ? 'text-[#8693BA] line-through' : 'text-white'}`}>
                        {goal.title}
                      </h4>
                      <p className="text-[11px] text-[#5B678E] mt-1">
                        Owner: <strong className="text-[#8693BA]">{goal.owner}</strong> • Deadline: <span className="font-mono">{goal.deadline}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-[#8693BA] block">Target: {goal.target}</span>
                    <span className="text-sm font-mono font-black text-[#00e5ff] mt-0.5 block">{goal.current}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-[#8693BA]">Completion Protocol</span>
                    <span className="text-[#00e5ff] font-mono">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1C2542] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        goal.completed ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#7a78e9] to-[#00e5ff]'
                      }`}
                      style={{ width: `₹${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Goal & Charts (Right 4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Creator */}
          <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl">
            <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00e5ff]" />
              <span>Define New Target</span>
            </h3>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">Objective Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Optimize Corporate tax ratio..."
                  className="w-full px-3 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">Goal Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs focus:border-[#00e5ff] focus:outline-none cursor-pointer"
                >
                  <option value="LIQUIDITY">Liquidity Ratio</option>
                  <option value="SAVINGS">OPEX Savings</option>
                  <option value="REVENUE">Revenue Target</option>
                  <option value="COMPLIANCE">Tax / Compliance</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">Target Value</label>
                <input 
                  type="text" 
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="e.g. ₹5.0M"
                  className="w-full px-3 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-[#00e5ff] hover:bg-[#00ccf0] text-[#080B13] font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Establish Goal</span>
              </button>
            </form>
          </div>

          {/* Goal Chart */}
          <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3">Objective Completion Graph</h3>
            
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1D2644" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#5B678E" fontSize={10} />
                  <YAxis stroke="#5B678E" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#0C101F', borderColor: '#1D2644', borderRadius: '1rem', color: '#fff', fontSize: '11px' }} />
                  <Bar dataKey="Progress" fill="#00e5ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
