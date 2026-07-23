import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Eye, Calendar, DollarSign, Building2, Clock,
  CheckCircle2, XCircle, AlertCircle, Printer, Share2
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

const OfferLetter: React.FC = () => {
  const [status] = useState<'Issued' | 'Accepted' | 'Pending'>('Accepted');

  const offerDetails = {
    issueDate: '2026-05-15',
    offerDate: '2026-06-01',
    department: 'Engineering & Technology',
    stipend: '$2,500 / month',
    duration: '3 months (Jun 2026 - Aug 2026)',
    position: 'Software Engineering Intern',
    offerId: 'OFF-2026-0042',
    candidateName: 'John Doe',
  };

  const statusConfig = {
    Issued: { icon: AlertCircle, color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' },
    Accepted: { icon: CheckCircle2, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' },
    Pending: { icon: XCircle, color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' },
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <InternPageShell title="Offer Letter" description="Your internship offer letter">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-80">Offer Letter</span>
                  </div>
                  <h2 className="text-2xl font-bold">Internship Offer</h2>
                  <p className="text-blue-100 mt-1">{offerDetails.offerId}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig[status].color}`}>
                  <StatusIcon className="w-4 h-4" />
                  {status}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Letter of Offer</h3>
                <p className="text-slate-500 text-sm mt-1">Date: {offerDetails.issueDate}</p>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                <p>Dear {offerDetails.candidateName},</p>
                <p>We are delighted to extend this offer of internship with our organization. Based on your application and interview performance, we believe you will be a valuable addition to our team.</p>
                <p>Please find below the key terms of your internship offer:</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {[
                  { label: 'Position', value: offerDetails.position, icon: Building2 },
                  { label: 'Department', value: offerDetails.department, icon: Building2 },
                  { label: 'Offer Date', value: offerDetails.offerDate, icon: Calendar },
                  { label: 'Issue Date', value: offerDetails.issueDate, icon: Calendar },
                  { label: 'Stipend', value: offerDetails.stipend, icon: DollarSign },
                  { label: 'Duration', value: offerDetails.duration, icon: Clock },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" /> View Full Document
              </button>
              <button className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Status Timeline</h3>
            <div className="space-y-4">
              {[
                { label: 'Offer Issued', date: '2026-05-15', done: true },
                { label: 'Offer Accepted', date: '2026-05-20', done: true },
                { label: 'Internship Started', date: '2026-06-01', done: true },
              ].map((step, i) => (
                <div key={step.label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${step.done ? 'bg-emerald-500 border-emerald-500' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600'}`} />
                    {i < 2 && <div className="w-0.5 h-8 bg-slate-200 dark:bg-slate-700" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{step.label}</p>
                    <p className="text-xs text-slate-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </InternPageShell>
  );
};

export default OfferLetter;
