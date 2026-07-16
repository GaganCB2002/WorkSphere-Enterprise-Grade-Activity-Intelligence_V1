import React from 'react';
import { Users, UserMinus, UserCheck, Activity } from 'lucide-react';

export const CeoWorkforceCenter: React.FC = () => {
  const departments = [
    { name: 'Engineering', count: 142, active: 138, leave: 4, prodScore: 92, attrRisk: 'Low' },
    { name: 'Sales', count: 86, active: 80, leave: 6, prodScore: 88, attrRisk: 'Medium' },
    { name: 'Marketing', count: 45, active: 42, leave: 3, prodScore: 95, attrRisk: 'Low' },
    { name: 'Customer Support', count: 120, active: 110, leave: 10, prodScore: 82, attrRisk: 'High' },
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl mb-8">
      <div className="border-b border-slate-800 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-white">Workforce Intelligence Center</h3>
          <p className="text-slate-400 text-xs mt-1">Enterprise-wide productivity and retention analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl"><Users className="w-5 h-5 text-blue-400" /></div>
          <div><p className="text-xs text-slate-400 font-bold">Total Headcount</p><p className="text-xl font-black text-white">452</p></div>
        </div>
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl"><UserCheck className="w-5 h-5 text-emerald-400" /></div>
          <div><p className="text-xs text-slate-400 font-bold">Active Today</p><p className="text-xl font-black text-white">425</p></div>
        </div>
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl"><UserMinus className="w-5 h-5 text-amber-400" /></div>
          <div><p className="text-xs text-slate-400 font-bold">On Leave</p><p className="text-xl font-black text-white">27</p></div>
        </div>
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl"><Activity className="w-5 h-5 text-purple-400" /></div>
          <div><p className="text-xs text-slate-400 font-bold">Avg Productivity</p><p className="text-xl font-black text-white">89%</p></div>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-800 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              <th className="p-4">Department</th>
              <th className="p-4 text-center">Headcount</th>
              <th className="p-4 text-center">Active / Leave</th>
              <th className="p-4 text-center">Productivity</th>
              <th className="p-4 text-center">Attrition Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
            {departments.map((dept, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-white text-sm">{dept.name}</td>
                <td className="p-4 text-center text-slate-300 text-sm font-medium">{dept.count}</td>
                <td className="p-4 text-center text-xs font-bold text-slate-400">
                  <span className="text-emerald-400">{dept.active}</span> / <span className="text-amber-400">{dept.leave}</span>
                </td>
                <td className="p-4 text-center font-bold text-blue-400 text-sm">{dept.prodScore}%</td>
                <td className="p-4 text-center flex justify-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    dept.attrRisk === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                    dept.attrRisk === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {dept.attrRisk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
