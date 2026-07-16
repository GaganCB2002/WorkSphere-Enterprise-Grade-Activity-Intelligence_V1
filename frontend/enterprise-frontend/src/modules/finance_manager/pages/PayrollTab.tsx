import React, { useState } from 'react';
import { 
  Coins, ArrowUpRight, CheckCircle2, Clock, 
  AlertTriangle, RefreshCw, Send, ShieldCheck
} from 'lucide-react';

interface PayrollEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
  bonus: number;
  status: 'APPROVED' | 'PENDING' | 'HOLD';
}

export const PayrollTab: React.FC = () => {
  const [employees, setEmployees] = useState<PayrollEmployee[]>([
    { id: 'EMP-0102', name: 'Amit Sharma', role: 'Staff Software Engineer', department: 'Engineering', salary: 185000, bonus: 15000, status: 'PENDING' },
    { id: 'EMP-0242', name: 'Marcus Chen', role: 'Engineering Lead', department: 'Engineering', salary: 245000, bonus: 35000, status: 'APPROVED' },
    { id: 'EMP-0310', name: 'Sarah Jenkins', role: 'Enterprise Account Manager', department: 'Sales', salary: 160000, bonus: 85000, status: 'PENDING' },
    { id: 'EMP-0422', name: 'Elena Rodriguez', role: 'HR Director', department: 'Human Resources', salary: 140000, bonus: 10000, status: 'APPROVED' },
    { id: 'EMP-0504', name: 'David Kim', role: 'Partnerships Lead', department: 'Marketing', salary: 125000, bonus: 20000, status: 'HOLD' },
  ]);

  const [processing, setProcessing] = useState(false);

  const handleApprovePayroll = (id: string) => {
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, status: 'APPROVED' } : emp));
    alert(`Approved salary payout protocols for employee ${id}.`);
  };

  const handleHoldPayroll = (id: string) => {
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, status: 'HOLD' } : emp));
    alert(`Salary payout protocols for employee ${id} placed on Hold.`);
  };

  const handleProcessAllPayroll = () => {
    setProcessing(true);
    setTimeout(() => {
      setEmployees(prev => prev.map(emp => emp.status === 'PENDING' ? { ...emp, status: 'APPROVED' } : emp));
      setProcessing(false);
      alert('Global Treasury salary batch processing executed successfully. All approved funds transferred.');
    }, 1500);
  };

  const totalCompensation = employees.reduce((sum, emp) => {
    if (emp.status === 'APPROVED') return sum + emp.salary + emp.bonus;
    return sum;
  }, 0);

  const pendingCompensation = employees.reduce((sum, emp) => {
    if (emp.status === 'PENDING') return sum + emp.salary + emp.bonus;
    return sum;
  }, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Payroll Management</h1>
          <p className="text-[#8693BA] text-sm mt-1">Review compensation packages, approve discretionary bonuses, and execute monthly payroll runs.</p>
        </div>
        <button 
          onClick={handleProcessAllPayroll}
          disabled={processing || employees.filter(e => e.status === 'PENDING').length === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all shadow-lg ${
            processing ? 'bg-slate-700 text-slate-500 cursor-not-allowed' :
            employees.filter(e => e.status === 'PENDING').length === 0 ? 'bg-[#1D2644] text-[#8693BA] cursor-not-allowed' :
            'bg-[#00e5ff] text-[#080B13] hover:bg-[#00ccf0] shadow-[#00e5ff]/10'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>{processing ? 'Processing...' : 'Process Salary Batch'}</span>
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">SALARY POOL CLEARED</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1.5">₹{totalCompensation.toLocaleString()}</h3>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Cleared for {employees.filter(e => e.status === 'APPROVED').length} Employees</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">PENDING APPROVALS</p>
          <h3 className="text-2xl font-black text-white mt-1.5">₹{pendingCompensation.toLocaleString()}</h3>
          <p className="text-[10px] text-amber-400 font-bold mt-1 uppercase tracking-wider">{employees.filter(e => e.status === 'PENDING').length} runs requiring authorization</p>
        </div>

        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-2xl p-5 shadow-lg">
          <p className="text-xs font-extrabold text-[#5B678E] uppercase tracking-wider">TAXES WITHELD (YTD)</p>
          <h3 className="text-2xl font-black text-white mt-1.5">₹450,000</h3>
          <p className="text-[10px] text-[#00e5ff] font-bold mt-1 uppercase tracking-wider">EPF & Compliance Audited</p>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-[#1D2644] pb-3">Monthly Compensation Roll</h3>
        
        <div className="overflow-x-auto border border-[#1D2644] rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0C101F] border-b border-[#1D2644] text-[10px] font-extrabold text-[#5B678E] uppercase tracking-wider font-mono">
                <th className="p-4">Employee ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Role / Dept</th>
                <th className="p-4 text-right">Base Salary</th>
                <th className="p-4 text-right">Bonus Target</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2644]/45 bg-[#0F1326]/10 text-xs">
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-[#1D2644]/20 transition-all duration-150">
                  <td className="p-4 font-bold text-white font-mono">{emp.id}</td>
                  <td className="p-4 text-[#F0EEF8] font-bold">{emp.name}</td>
                  <td className="p-4">
                    <div className="font-bold text-[#F0EEF8]">{emp.role}</div>
                    <div className="text-[10px] text-[#8693BA] font-mono mt-0.5">{emp.department}</div>
                  </td>
                  <td className="p-4 text-right font-mono text-white font-bold">₹{emp.salary.toLocaleString()}</td>
                  <td className="p-4 text-right font-mono text-emerald-400 font-bold">₹{emp.bonus.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                      emp.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      emp.status === 'PENDING' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      {emp.status === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => handleApprovePayroll(emp.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-2 py-1 rounded-lg text-[9px] uppercase tracking-wider transition-all"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleHoldPayroll(emp.id)}
                            className="bg-[#0C1226]/80 hover:bg-red-500/10 border border-[#1E294B] hover:border-red-500/30 text-[#8693BA] hover:text-red-400 font-extrabold px-2 py-1 rounded-lg text-[9px] uppercase tracking-wider transition-all"
                          >
                            Hold
                          </button>
                        </>
                      )}
                      {emp.status === 'HOLD' && (
                        <button 
                          onClick={() => handleApprovePayroll(emp.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-extrabold px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-wider transition-all"
                        >
                          Release Hold
                        </button>
                      )}
                      {emp.status === 'APPROVED' && (
                        <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-wider">Ready for payout</span>
                      )}
                    </div>
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
