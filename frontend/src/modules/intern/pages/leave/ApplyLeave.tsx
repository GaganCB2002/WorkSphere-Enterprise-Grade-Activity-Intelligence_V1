import React, { useState } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import { Send, X, Calendar, Phone, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const leaveBalances = [
  { type: 'Casual Leave', used: 4, total: 12, color: 'bg-blue-500' },
  { type: 'Sick Leave', used: 1, total: 6, color: 'bg-emerald-500' },
  { type: 'Earned Leave', used: 11, total: 15, color: 'bg-violet-500' },
  { type: 'Unpaid Leave', used: 0, total: 0, color: 'bg-amber-500' },
];

export default function ApplyLeavePage() {
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dayType, setDayType] = useState('full');
  const [reason, setReason] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <InternPageShell title="Apply Leave" description="Submit leave request">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg mx-auto">
          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-10 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Leave Request Submitted</h2>
            <p className="text-sm text-slate-500 mb-6">Your {leaveType} request has been sent for approval.</p>
            <button onClick={() => setSubmitted(false)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              Apply Another
            </button>
          </motion.div>
        </motion.div>
      </InternPageShell>
    );
  }

  return (
    <InternPageShell title="Apply Leave" description="Submit leave request">
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-6">Leave Request Form</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Leave Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['Casual Leave', 'Sick Leave', 'Earned Leave', 'Unpaid Leave'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLeaveType(type)}
                    className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all text-left ${
                      leaveType === type
                        ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">From Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">To Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Day Type</label>
              <div className="flex gap-3">
                {['full', 'half'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setDayType(t)}
                    className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all capitalize ${
                      dayType === t
                        ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    {t} Day
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Reason for Leave</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  placeholder="Please provide a reason for your leave request..."
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Contact During Leave</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" /> Submit Request
              </button>
              <button
                type="button"
                onClick={() => { setLeaveType(''); setFromDate(''); setToDate(''); setDayType('full'); setReason(''); setContact(''); }}
                className="flex items-center gap-2 px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Leave Balances</h3>
            <div className="space-y-4">
              {leaveBalances.map((b) => (
                <div key={b.type}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{b.type}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{b.total - b.used}/{b.total}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${b.color}`}
                      style={{ width: b.total > 0 ? `${((b.total - b.used) / b.total) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-3">Guidelines</h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <AlertCircle className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Submit at least 2 days in advance for planned leaves</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Sick leave requires a medical certificate if exceeding 2 days</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </InternPageShell>
  );
}
