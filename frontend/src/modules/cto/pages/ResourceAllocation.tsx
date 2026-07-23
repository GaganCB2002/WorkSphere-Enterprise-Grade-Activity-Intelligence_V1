// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, UserX, AlertTriangle, Activity } from 'lucide-react';
import CtoPageShell from '../CtoPageShell';
import DataTable, { StatusBadge } from '../../../components/common/DataTable/DataTable';

const kpiData = [
  { label: 'Total Resources', value: '84', sub: 'All engineering staff', icon: Users, color: 'text-blue-500' },
  { label: 'Allocated', value: '72', sub: 'Assigned to projects', icon: UserCheck, color: 'text-emerald-500' },
  { label: 'Available', value: '12', sub: 'Unallocated capacity', icon: UserX, color: 'text-amber-500' },
  { label: 'Over-allocated', value: '4', sub: 'Exceeding capacity', icon: AlertTriangle, color: 'text-red-500' },
];

const allocationByDept = [
  { department: 'Frontend', allocated: 18, available: 3, overAllocated: 1 },
  { department: 'Backend', allocated: 22, available: 4, overAllocated: 2 },
  { department: 'DevOps', allocated: 10, available: 2, overAllocated: 0 },
  { department: 'Data', allocated: 8, available: 1, overAllocated: 1 },
  { department: 'Security', allocated: 6, available: 1, overAllocated: 0 },
  { department: 'Mobile', allocated: 8, available: 1, overAllocated: 0 },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'project', label: 'Project' },
  { key: 'allocation', label: 'Allocation %' },
  { key: 'hoursPerWeek', label: 'Hours/Week' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
];

const data = [
  { name: 'Sarah Chen', role: 'Senior Engineer', project: 'Platform Modernization', allocation: '100%', hoursPerWeek: '40', status: 'Active' },
  { name: 'Mike Johnson', role: 'Tech Lead', project: 'Data Lake Migration', allocation: '100%', hoursPerWeek: '40', status: 'Active' },
  { name: 'Lisa Park', role: 'Frontend Lead', project: 'Mobile App v3', allocation: '100%', hoursPerWeek: '40', status: 'Active' },
  { name: 'Tom Wilson', role: 'Backend Engineer', project: 'Microservices Refactor', allocation: '80%', hoursPerWeek: '32', status: 'Active' },
  { name: 'Anna Davis', role: 'Security Engineer', project: 'Security Audit Program', allocation: '100%', hoursPerWeek: '40', status: 'Active' },
  { name: 'James Lee', role: 'DevOps Engineer', project: 'Cloud Cost Optimization', allocation: '120%', hoursPerWeek: '48', status: 'Active' },
  { name: 'Rachel Kim', role: 'ML Engineer', project: 'AI/ML Platform', allocation: '100%', hoursPerWeek: '40', status: 'Active' },
  { name: 'David Park', role: 'Data Engineer', project: 'Data Lake Migration', allocation: '110%', hoursPerWeek: '44', status: 'Active' },
  { name: 'Emily Zhang', role: 'Full Stack', project: 'Customer Portal v2', allocation: '90%', hoursPerWeek: '36', status: 'Active' },
  { name: 'Alex Rivera', role: 'QA Engineer', project: 'Platform Modernization', allocation: '70%', hoursPerWeek: '28', status: 'Active' },
  { name: 'John Smith', role: 'Mobile Engineer', project: 'Mobile App v3', allocation: '100%', hoursPerWeek: '40', status: 'Active' },
  { name: 'Priya Patel', role: 'Backend Engineer', project: 'Unallocated', allocation: '0%', hoursPerWeek: '0', status: 'Pending' },
];

const ResourceAllocation = () => (
  <CtoPageShell title="Resource Allocation" description="Engineering resource tracking, allocation by department, and capacity management" breadcrumbs={[{ label: 'CTO Dashboard', path: '/cto/executive-overview' }, { label: 'Resource Allocation' }]}>
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
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Allocation by Department</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={allocationByDept}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Allocated" />
              <Bar dataKey="available" fill="#22c55e" radius={[4, 4, 0, 0]} name="Available" />
              <Bar dataKey="overAllocated" fill="#ef4444" radius={[4, 4, 0, 0]} name="Over-allocated" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6">Resource Allocation Details</h3>
        <DataTable columns={columns} data={data} pageSize={8} searchable />
      </div>
    </div>
  </CtoPageShell>
);

export default ResourceAllocation;


