import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, Mouse, Headphones, Monitor } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface Accessory {
  id: string;
  name: string;
  category: string;
  assignedDate: string;
  condition: string;
  status: string;
}

const accessories: Accessory[] = [
  { id: 'ACC-001', name: 'Logitech MX Keys', category: 'Keyboard', assignedDate: '2026-01-10', condition: 'Good', status: 'Assigned' },
  { id: 'ACC-002', name: 'Logitech MX Master 3S', category: 'Mouse', assignedDate: '2026-01-10', condition: 'Good', status: 'Assigned' },
  { id: 'ACC-003', name: 'Sony WH-1000XM5', category: 'Headset', assignedDate: '2026-02-15', condition: 'Excellent', status: 'Assigned' },
  { id: 'ACC-004', name: 'Ergotron LX Monitor Arm', category: 'Monitor Stand', assignedDate: '2026-03-01', condition: 'Fair', status: 'Assigned' },
  { id: 'ACC-005', name: 'Logitech Brio 4K', category: 'Webcam', assignedDate: '2026-01-10', condition: 'Good', status: 'Assigned' },
  { id: 'ACC-006', name: 'CalDigit TS4', category: 'Docking Station', assignedDate: '2026-02-20', condition: 'Excellent', status: 'Assigned' },
  { id: 'ACC-007', name: 'BenQ ScreenBar', category: 'Lighting', assignedDate: '2026-03-15', condition: 'New', status: 'Available' },
  { id: 'ACC-008', name: 'Wacom Intuos Pro', category: 'Tablet', assignedDate: '2026-04-01', condition: 'Good', status: 'Assigned' },
  { id: 'ACC-009', name: 'Shure MV7', category: 'Microphone', assignedDate: '2026-05-10', condition: 'Excellent', status: 'Repair' },
  { id: 'ACC-010', name: 'IKEA Bekant Standing Desk', category: 'Desk', assignedDate: '2026-06-01', condition: 'Good', status: 'Available' },
];

export default function Accessories() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return accessories.filter(a => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) || a.id.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Accessories"
      description="Manage your assigned accessories and peripheral devices"
      breadcrumbs={['Employee', 'Assets', 'Accessories']}
      actions={
        <div className="flex items-center gap-2">
          {[
            { icon: Filter, label: 'Filter' },
            { icon: Download, label: 'Download' },
            { icon: RefreshCw, label: 'Refresh' },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors" title={label}>
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      }
    >
      <GlassPanel className="p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.04] rounded-xl flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search accessories..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{filtered.length} items</span>
      </GlassPanel>
      <GlassPanel padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/[0.06]">
                {['ID', 'Asset Name', 'Category', 'Assigned Date', 'Condition', 'Status'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-mono text-slate-500 dark:text-slate-400">{a.id}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">{a.name}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{a.category}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{a.assignedDate}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">{a.condition}</td>
                  <td className="px-5 py-3.5"><StatusBadge label={a.status} variant={a.status === 'Assigned' ? 'active' : a.status === 'Available' ? 'working' : 'pending'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </EmployeePageLayout>
  );
}
