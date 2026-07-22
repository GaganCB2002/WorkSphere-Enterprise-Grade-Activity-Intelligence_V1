import React, { useState, useMemo } from 'react';
import { Filter, Download, RefreshCw, Search, Monitor, Cpu, HardDrive, MemoryStick } from 'lucide-react';
import { EmployeePageLayout } from '../../components/EmployeePageLayout';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface LaptopInfo {
  id: string;
  model: string;
  serial: string;
  processor: string;
  ram: string;
  storage: string;
  assignedDate: string;
  condition: string;
}

const laptops: LaptopInfo[] = [
  { id: 'LAP-001', model: 'MacBook Pro 16" M3 Max', serial: 'MBP-M3X-2847', processor: 'Apple M3 Max 16-core', ram: '48GB Unified', storage: '1TB SSD', assignedDate: '2026-01-10', condition: 'Excellent' },
  { id: 'LAP-002', model: 'MacBook Pro 14" M3 Pro', serial: 'MBP-M3P-5612', processor: 'Apple M3 Pro 12-core', ram: '36GB Unified', storage: '512GB SSD', assignedDate: '2026-03-15', condition: 'Good' },
  { id: 'LAP-003', model: 'Dell XPS 16', serial: 'XPS16-9034', processor: 'Intel Core Ultra 9 185H', ram: '32GB DDR5', storage: '1TB NVMe', assignedDate: '2026-02-01', condition: 'Good' },
  { id: 'LAP-004', model: 'Lenovo ThinkPad X1 Carbon', serial: 'TPX1C-7721', processor: 'Intel Core i7-1470P', ram: '16GB LPDDR5', storage: '512GB SSD', assignedDate: '2026-04-10', condition: 'Fair' },
  { id: 'LAP-005', model: 'HP EliteBook 1040 G11', serial: 'HP1040-3398', processor: 'Intel Core Ultra 7 165H', ram: '32GB DDR5', storage: '512GB NVMe', assignedDate: '2026-05-20', condition: 'Good' },
  { id: 'LAP-006', model: 'MacBook Air 15" M3', serial: 'MBA15-6674', processor: 'Apple M3 8-core', ram: '24GB Unified', storage: '512GB SSD', assignedDate: '2026-06-01', condition: 'New' },
  { id: 'LAP-007', model: 'Microsoft Surface Laptop 6', serial: 'SL6-2249', processor: 'Intel Core i7-13800H', ram: '16GB LPDDR5', storage: '256GB SSD', assignedDate: '2026-04-22', condition: 'Good' },
  { id: 'LAP-008', model: 'Framework 16', serial: 'FW16-8812', processor: 'AMD Ryzen 9 7940HS', ram: '64GB DDR5', storage: '2TB NVMe', assignedDate: '2026-02-28', condition: 'Excellent' },
];

export default function Laptop() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return laptops.filter(l => l.model.toLowerCase().includes(q) || l.serial.toLowerCase().includes(q) || l.processor.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <EmployeePageLayout
      title="Laptop"
      description="View specifications and details of your assigned laptops"
      breadcrumbs={['Employee', 'Assets', 'Laptop']}
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
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search laptops..." className="w-full text-xs bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400" />
        </div>
      </GlassPanel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(l => (
          <GlassPanel key={l.id} hover>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{l.model}</h3>
                  <StatusBadge label={l.condition} variant={l.condition === 'Excellent' || l.condition === 'New' ? 'active' : l.condition === 'Good' ? 'working' : 'pending'} />
                </div>
                <p className="text-[10px] font-mono text-slate-400 mb-2">S/N: {l.serial}</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Cpu, label: 'Processor', value: l.processor },
                    { icon: MemoryStick, label: 'RAM', value: l.ram },
                    { icon: HardDrive, label: 'Storage', value: l.storage },
                    { icon: Monitor, label: 'Assigned', value: l.assignedDate },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <Icon className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate"><span className="text-slate-400">{label}:</span> {value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </EmployeePageLayout>
  );
}
