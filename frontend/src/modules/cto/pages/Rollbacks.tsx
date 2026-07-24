import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Calendar, Timer, AlertTriangle, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Rollbacks', value: '28', sub: 'All-time incidents', icon: RotateCcw, color: 'text-blue-500' },
  { label: 'This Month', value: '2', sub: 'Current month count', icon: Calendar, color: 'text-amber-500' },
  { label: 'Avg Recovery', value: '14m', sub: 'Mean time to recover', icon: Timer, color: 'text-emerald-500' },
  { label: 'Impacted Services', value: '3', sub: 'Services affected', icon: AlertTriangle, color: 'text-red-500' },
];

const columns = [
  { key: 'id', label: 'Rollback ID' },
  { key: 'service', label: 'Service' },
  { key: 'version', label: 'Version' },
  { key: 'cause', label: 'Cause' },
  { key: 'impact', label: 'Impact' },
  { key: 'duration', label: 'Duration' },
  { key: 'rolledBy', label: 'Rolled By' },
  { key: 'date', label: 'Date' },
];

const data = [
  { id: 'RB-028', service: 'payment-service', version: 'v4.1.0', cause: 'Payment processing timeout', impact: 'Medium', duration: '18m', rolledBy: 'Sarah Chen', date: '2026-07-19' },
  { id: 'RB-027', service: 'notification-service', version: 'v1.9.3', cause: 'Email delivery failure', impact: 'Low', duration: '12m', rolledBy: 'Mike Johnson', date: '2026-07-15' },
  { id: 'RB-026', service: 'user-service', version: 'v3.2.0', cause: 'Authentication regression', impact: 'Critical', duration: '32m', rolledBy: 'Lisa Park', date: '2026-07-10' },
  { id: 'RB-025', service: 'search-service', version: 'v2.2.0', cause: 'Index corruption', impact: 'High', duration: '22m', rolledBy: 'Tom Wilson', date: '2026-06-28' },
  { id: 'RB-024', service: 'order-service', version: 'v2.8.3', cause: 'Order duplication bug', impact: 'High', duration: '15m', rolledBy: 'Anna Davis', date: '2026-06-20' },
  { id: 'RB-023', service: 'inventory-service', version: 'v5.0.1', cause: 'Stock count mismatch', impact: 'Medium', duration: '8m', rolledBy: 'James Lee', date: '2026-06-12' },
  { id: 'RB-022', service: 'auth-service', version: 'v3.5.0', cause: 'SSO integration failure', impact: 'Critical', duration: '28m', rolledBy: 'Rachel Kim', date: '2026-06-05' },
];

const Rollbacks = () => (
  <CtoPageShell title="Rollbacks" description="Rollback history with recovery tracking and incident analysis" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Rollbacks' }]}>
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{kpi.value}</div>
              </div>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-4">{kpi.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Rollback History</h3>
        <DataTable columns={columns} data={data} pageSize={7} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default Rollbacks;


