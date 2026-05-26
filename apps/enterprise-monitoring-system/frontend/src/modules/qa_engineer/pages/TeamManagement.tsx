import React, { useState, useContext } from 'react';
import { Users, UserPlus, MoreVertical, Search, Mail, Trash2, X, Star, Shield } from 'lucide-react';
import { useTeam } from '../data/hooks';
import { Modal } from '../components/Modal';
import { QaShellContext } from '../layout/QaShell';

export const TeamManagement: React.FC = () => {
  const { team, allTeam, search, updateSearch, addMember, removeMember } = useTeam();
  const { addToast } = useContext(QaShellContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: 'QA Engineer', module: 'General', email: '' });
  const [showConfirmRemove, setShowConfirmRemove] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { addToast('Please enter a team member name', 'error'); return; }
    addMember({
      name: formData.name, role: formData.role, module: formData.module,
      velocity: '0 pts', status: 'Online', scriptsWritten: 0, bugsFound: 0, reviewScore: 0, email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@sahara.com`,
    });
    addToast(`${formData.name} added to the team`, 'success');
    setShowAddModal(false);
    setFormData({ name: '', role: 'QA Engineer', module: 'General', email: '' });
  };

  const handleRemove = (id: string) => {
    const member = allTeam.find(m => m.id === id);
    removeMember(id);
    addToast(`${member?.name} removed from team`, 'info');
    setShowConfirmRemove(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
              {allTeam.filter(m => m.status === 'Online').length} Online
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Team Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{allTeam.length} QA engineers · {allTeam.filter(m => m.status === 'Online').length} active now</p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
          <UserPlus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: allTeam.length, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20' },
          { label: 'Online Now', value: allTeam.filter(m => m.status === 'Online').length, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Avg Velocity', value: `${Math.round(allTeam.reduce((a, m) => a + parseInt(m.velocity), 0) / allTeam.length)} pts`, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'In Meeting', value: allTeam.filter(m => m.status === 'In Meeting').length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm`}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{s.label}</h3>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input type="text" value={search} onChange={e => updateSearch(e.target.value)}
              placeholder="Search team members..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 placeholder-slate-400" />
          </div>
          <span className="text-xs font-semibold text-slate-400">{team.length} of {allTeam.length} shown</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="p-4 pl-6">Engineer</th>
                <th className="p-4">Role</th>
                <th className="p-4">Module</th>
                <th className="p-4">Velocity</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{member.name}</p>
                        <p className="text-[10px] text-slate-400">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">{member.role}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold">{member.module}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{member.velocity}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' : member.status === 'In Meeting' ? 'bg-amber-500' : member.status === 'On Leave' ? 'bg-red-400' : 'bg-slate-400'}`} />
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{member.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors" title="Send email">
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setShowConfirmRemove(member.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors" title="Remove">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {team.length === 0 && (
                <tr><td colSpan={6} className="p-12 text-center text-sm text-slate-400">No team members match your search</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Team Member">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Full Name *</label>
            <input type="text" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 placeholder-slate-400"
              placeholder="e.g. Jane Smith" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Role</label>
              <select value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
                <option value="QA Engineer">QA Engineer</option>
                <option value="Senior SDET">Senior SDET</option>
                <option value="Automation Engineer">Automation Engineer</option>
                <option value="Manual Tester">Manual Tester</option>
                <option value="Security QA">Security QA</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Module</label>
              <select value={formData.module} onChange={e => setFormData(p => ({ ...p, module: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 cursor-pointer">
                <option value="Payment Core">Payment Core</option>
                <option value="Analytics UI">Analytics UI</option>
                <option value="Auth UI">Auth UI</option>
                <option value="Reporting">Reporting</option>
                <option value="Core Auth">Core Auth</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-900 dark:text-slate-100 placeholder-slate-400"
              placeholder="email@sahara.com" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowAddModal(false)}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
            <button type="submit"
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95">
              <UserPlus className="w-4 h-4 inline mr-1.5" /> Add Member
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!showConfirmRemove} onClose={() => setShowConfirmRemove(null)} title="Remove Team Member" maxWidth="max-w-sm">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Are you sure you want to remove this team member? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowConfirmRemove(null)}
            className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
          <button onClick={() => handleRemove(showConfirmRemove!)}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md shadow-red-600/20 transition-all">
            <Trash2 className="w-4 h-4 inline mr-1.5" /> Remove
          </button>
        </div>
      </Modal>
    </div>
  );
};
