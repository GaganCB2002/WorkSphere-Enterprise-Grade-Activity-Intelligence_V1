import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  Ticket, AlertCircle, CheckCircle, Clock, HeartHandshake,
  Plus, ChevronDown, UserCheck, BookOpen, Wallet, Building
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const kpis = [
  { label: 'Open Tickets', value: '2', icon: AlertCircle, color: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400' },
  { label: 'In Progress', value: '1', icon: Clock, color: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400' },
  { label: 'Resolved', value: '8', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400' },
];

const faqs = [
  { q: 'How do I update my personal information?', a: 'Go to Profile Settings in your account to update personal details.' },
  { q: 'When is the next pay cycle?', a: 'Payroll is processed on the 1st and 15th of every month.' },
  { q: 'How do I enroll in benefits?', a: 'Benefits enrollment is handled through the HR portal during open enrollment.' },
  { q: 'What is the onboarding process?', a: 'New interns receive a welcome kit, system access setup, and a mentor assignment.' },
];

const tickets = [
  { id: 'HR-042', category: 'Payroll', description: 'Missing stipend for June month', priority: 'High', status: 'Open', created: '2026-07-22', updated: '2026-07-22' },
  { id: 'HR-041', category: 'Policies', description: 'Clarification on work-from-home policy', priority: 'Low', status: 'In Progress', created: '2026-07-20', updated: '2026-07-21' },
  { id: 'HR-040', category: 'Benefits', description: 'Health insurance coverage inquiry', priority: 'Medium', status: 'Resolved', created: '2026-07-18', updated: '2026-07-19' },
  { id: 'HR-039', category: 'Onboarding', description: 'Need access to onboarding documents', priority: 'Medium', status: 'Resolved', created: '2026-07-16', updated: '2026-07-17' },
  { id: 'HR-038', category: 'Payroll', description: 'Tax form submission confirmation', priority: 'Low', status: 'Resolved', created: '2026-07-14', updated: '2026-07-15' },
];

const categoryIcons: Record<string, any> = {
  Payroll: Wallet,
  Policies: BookOpen,
  Benefits: HeartHandshake,
  Onboarding: Building,
};

const priorityStyles: Record<string, string> = {
  Low: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
  Medium: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  High: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Urgent: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
};

const statusStyles: Record<string, string> = {
  Open: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  Resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
};

function KpiCard({ kpi, index }: { kpi: typeof kpis[0]; index: number }) {
  const Icon = kpi.icon;
  return (
    <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${kpi.color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
    </motion.div>
  );
}

export default function HRSupport() {
  return (
    <InternPageShell
      title="HR Support"
      description="Get help with HR-related queries"
      actions={
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Raise Ticket
        </button>
      }
    >
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} index={i} />)}
        </div>

        {/* FAQ Section */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Frequently Asked Questions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">{faq.q}</p>
                <p className="text-xs text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ticket Table */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket ID</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Created</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                {tickets.map((ticket) => {
                  const CatIcon = categoryIcons[ticket.category] || Ticket;
                  return (
                    <tr key={ticket.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer">
                      <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-slate-200">{ticket.id}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-slate-500">
                          <CatIcon className="w-3.5 h-3.5" /> {ticket.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 max-w-[240px] truncate">{ticket.description}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${priorityStyles[ticket.priority]}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyles[ticket.status]}`}>
                          {ticket.status === 'Open' && <AlertCircle className="w-3 h-3" />}
                          {ticket.status === 'In Progress' && <Clock className="w-3 h-3" />}
                          {ticket.status === 'Resolved' && <CheckCircle className="w-3 h-3" />}
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-400">{ticket.created}</td>
                      <td className="px-5 py-3.5 text-xs text-slate-400">{ticket.updated}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

      </motion.div>
    </InternPageShell>
  );
}
