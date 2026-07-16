import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export const CtoEngineeringAnalytics: React.FC<{ squads: any[], velocityData: any[] }> = ({ squads, velocityData }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      {/* Velocity Line Chart */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Cross-Squad Sprint Velocity</h3>
            <p className="text-slate-400 text-xs mt-1">Completed story points tracking</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={velocityData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="sprint" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="frontend" name="Frontend" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="backend" name="Backend" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engineering Squads Status Table */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-2xl flex flex-col">
        <div className="border-b border-slate-800 pb-4 mb-4">
          <h3 className="text-xl font-bold text-white">Team Performance</h3>
          <p className="text-slate-400 text-xs mt-1">Real-time capacity and velocity tracking</p>
        </div>

        <div className="overflow-x-auto flex-1 border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                <th className="p-3">Team Name</th>
                <th className="p-3">Lead</th>
                <th className="p-3 text-center">Velocity</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
              {squads.map((squad, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-bold text-white text-sm">{squad.name}</td>
                  <td className="p-3 text-slate-300 text-xs">{squad.lead}</td>
                  <td className="p-3 text-center font-bold text-blue-400 text-xs">{squad.velocity} pts</td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      squad.status === 'HEALTHY' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {squad.status === 'HEALTHY' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      <span>{squad.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
