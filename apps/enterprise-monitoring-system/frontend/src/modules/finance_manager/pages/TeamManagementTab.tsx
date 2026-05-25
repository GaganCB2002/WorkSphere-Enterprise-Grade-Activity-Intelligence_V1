import React, { useState } from 'react';
import { 
  Users, UserPlus, ShieldAlert, Key, CheckCircle, 
  Settings, RefreshCw, Trash2, ShieldCheck
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  payoutLimit: number;
  status: 'ONLINE' | 'OFFLINE';
  accessLevel: 'FULL_CONTROL' | 'OPERATOR' | 'READ_ONLY';
}

export const TeamManagementTab: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([
    { id: 'FM-01', name: 'Rohan Sharma', role: 'Treasury Controller', payoutLimit: 5000000, status: 'ONLINE', accessLevel: 'FULL_CONTROL' },
    { id: 'FM-02', name: 'Priya Iyer', role: 'Senior Accountant', payoutLimit: 1000000, status: 'ONLINE', accessLevel: 'OPERATOR' },
    { id: 'FM-03', name: 'Kabir Mehta', role: 'Accounts Analyst', payoutLimit: 250000, status: 'OFFLINE', accessLevel: 'OPERATOR' },
    { id: 'FM-04', name: 'Ananya Goel', role: 'Compliance Officer', payoutLimit: 0, status: 'ONLINE', accessLevel: 'READ_ONLY' },
  ]);

  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Accounts Analyst');
  const [newLimit, setNewLimit] = useState(100000);

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newMember: TeamMember = {
      id: `FM-0${team.length + 1}`,
      name: newName,
      role: newRole,
      payoutLimit: newLimit,
      status: 'ONLINE',
      accessLevel: 'OPERATOR'
    };
    setTeam(prev => [...prev, newMember]);
    setNewName('');
    alert(`Invite code successfully dispatched to ${newName}. Operator added.`);
  };

  const handleUpdateLimit = (id: string, amount: number) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, payoutLimit: m.payoutLimit + amount } : m));
  };

  const handleRevokeAccess = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    alert(`Access credentials revoked for operator ${id}. Session terminated.`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Treasury Team Directory</h1>
          <p className="text-[#8693BA] text-sm mt-1">Audit active operator permissions, change wire dispatch thresholds, and revoke access keys.</p>
        </div>
      </div>

      {/* Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Team Members List (Left 8 Columns) */}
        <div className="lg:col-span-8 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-[#1D2644] pb-3">Treasury Operators</h3>
          
          <div className="overflow-x-auto border border-[#1D2644] rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0C101F] border-b border-[#1D2644] text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider font-mono">
                  <th className="p-4">Identity</th>
                  <th className="p-4">Access Level</th>
                  <th className="p-4 text-right">Wire Limit</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D2644]/45 bg-[#0F1326]/10 text-xs">
                {team.map(member => (
                  <tr key={member.id} className="hover:bg-[#1D2644]/20 transition-all duration-150">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#7a78e9]/10 rounded-xl flex items-center justify-center font-bold text-[#7a78e9]">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{member.name}</div>
                          <div className="text-[10px] text-[#8693BA] font-mono mt-0.5">{member.role} ({member.id})</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-[#8693BA]">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] ${
                        member.accessLevel === 'FULL_CONTROL' ? 'bg-red-500/10 text-red-400' :
                        member.accessLevel === 'OPERATOR' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-slate-500/10 text-slate-400'
                      }`}>
                        {member.accessLevel}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono text-[#00e5ff] font-black">
                      {member.payoutLimit > 0 ? `₹${member.payoutLimit.toLocaleString()}` : 'None'}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        member.status === 'ONLINE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button 
                          onClick={() => handleUpdateLimit(member.id, 50000)}
                          className="bg-[#0C1226]/80 hover:bg-[#121B35] border border-[#1E294B] hover:border-[#00e5ff] text-white font-extrabold px-2 py-1 rounded-lg text-[9px] uppercase tracking-wider transition-all"
                        >
                          +50k Limit
                        </button>
                        {member.accessLevel !== 'FULL_CONTROL' && (
                          <button 
                            onClick={() => handleRevokeAccess(member.id)}
                            className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-[#1D2644]/30 transition-colors"
                            title="Revoke Credentials"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Operator (Right 4 Columns) */}
        <div className="lg:col-span-4 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3 mb-4 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-[#00e5ff]" />
              <span>Invite Operator</span>
            </h3>

            <form onSubmit={handleInviteMember} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">Operator Name</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Vikram Sen..."
                  className="w-full px-3 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">Operational Role</label>
                <select 
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs focus:border-[#00e5ff] focus:outline-none cursor-pointer"
                >
                  <option value="Accounts Analyst">Accounts Analyst</option>
                  <option value="Senior Accountant">Senior Accountant</option>
                  <option value="Compliance Manager">Compliance Manager</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-[#5B678E] uppercase tracking-widest block">Initial Daily Limit (INR)</label>
                <input 
                  type="number" 
                  value={newLimit || ''}
                  onChange={(e) => setNewLimit(Number(e.target.value))}
                  placeholder="e.g. 500000"
                  className="w-full px-3 py-2 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-[#00e5ff] hover:bg-[#00ccf0] text-[#080B13] font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Issue Keycard Invite</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
