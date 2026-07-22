import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface AssignedAsset {
  id: string;
  name: string;
  serialNo: string;
  category: string;
  assignedDate: string;
  returnDate: string;
  condition: string;
}

const assets: AssignedAsset[] = [
  { id: 'AST-001', name: 'MacBook Pro 16" M3 Max', serialNo: 'MBP-M3X-2847', category: 'Laptop', assignedDate: '2026-01-10', returnDate: '-', condition: 'Excellent' },
  { id: 'AST-002', name: 'iPhone 15 Pro Max', serialNo: 'IP15PM-8392', category: 'Mobile', assignedDate: '2026-01-10', returnDate: '-', condition: 'Good' },
  { id: 'AST-003', name: 'Dell UltraSharp 27"', serialNo: 'DUS27-5619', category: 'Monitor', assignedDate: '2026-02-01', returnDate: '-', condition: 'Good' },
  { id: 'AST-004', name: 'Logitech MX Keys', serialNo: 'LMK-3381', category: 'Keyboard', assignedDate: '2026-01-10', returnDate: '-', condition: 'Good' },
  { id: 'AST-005', name: 'Logitech MX Master 3S', serialNo: 'LMM-7724', category: 'Mouse', assignedDate: '2026-01-10', returnDate: '-', condition: 'Good' },
  { id: 'AST-006', name: 'Sony WH-1000XM5', serialNo: 'SW5-4490', category: 'Headset', assignedDate: '2026-02-15', returnDate: '-', condition: 'Excellent' },
  { id: 'AST-007', name: 'CalDigit TS4 Dock', serialNo: 'CTS4-1123', category: 'Dock', assignedDate: '2026-02-20', returnDate: '-', condition: 'Excellent' },
  { id: 'AST-008', name: 'Logitech Brio 4K', serialNo: 'LB4K-6651', category: 'Webcam', assignedDate: '2026-01-10', returnDate: '-', condition: 'Good' },
  { id: 'AST-009', name: 'iPad Air M2', serialNo: 'IPAM2-9903', category: 'Tablet', assignedDate: '2026-01-10', returnDate: '2026-06-30', condition: 'Good' },
  { id: 'AST-010', name: 'Ergotron Monitor Arm', serialNo: 'EMA-2287', category: 'Stand', assignedDate: '2026-03-01', returnDate: '-', condition: 'Fair' },
];

export default function AssignedAssets() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return assets.filter(a => a.name.toLowerCase().includes(q) || a.serialNo.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Assigned Assets"
      description="View all assets currently assigned to you"
      breadcrumbs={['Employee', 'Assets', 'Assigned Assets']}
      actions={
        <div className="flex items-center gap-2">
          {[{ icon: Filter }, { icon: Download }, { icon: RefreshCw }].map(({ icon: Icon }) => (
            <button key={Icon.name} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name, serial, category..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <GlassPanel padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                {['Asset Name', 'Serial No.', 'Category', 'Assigned Date', 'Return Date', 'Condition'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-semibold text-slate-900 dark:text-white">{a.name}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-500 dark:text-slate-400">{a.serialNo}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{a.category}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{a.assignedDate}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{a.returnDate}</td>
                  <td className="px-5 py-3.5"><StatusBadge label={a.condition} variant={a.condition === 'Excellent' ? 'active' : a.condition === 'Good' ? 'working' : 'pending'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
