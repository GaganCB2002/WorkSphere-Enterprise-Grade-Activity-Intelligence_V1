import React from 'react';
import InternPageShell from '../../InternPageShell';
import { motion } from 'framer-motion';
import {
  Building2, CreditCard, QrCode, MapPin, Layers, Smartphone,
  Save, BadgeCheck, Eye, EyeOff, Copy
} from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

interface BankFieldProps {
  label: string;
  icon: React.ElementType;
  value: string;
  masked?: boolean;
}

function BankField({ label, icon: Icon, value, masked }: BankFieldProps) {
  const [hidden, setHidden] = React.useState(masked);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            defaultValue={hidden ? `****${value.slice(-4)}` : value}
            readOnly
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/60 rounded-lg text-sm text-slate-800 dark:text-slate-200 cursor-not-allowed"
          />
        </div>
        {masked && (
          <button
            onClick={() => setHidden(!hidden)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/40 text-slate-400 hover:text-slate-600 transition-colors"
            title={hidden ? 'Show account number' : 'Hide account number'}
          >
            {hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        )}
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/40 text-slate-400 hover:text-slate-600 transition-colors relative"
          title="Copy to clipboard"
        >
          {copied ? (
            <span className="text-xs text-emerald-600 font-semibold absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white dark:bg-slate-800 px-2 py-0.5 rounded shadow-sm border border-slate-200 dark:border-slate-700/60">
              Copied!
            </span>
          ) : null}
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function BankDetails() {
  return (
    <InternPageShell
      title="Bank Details"
      description="Your banking information for stipend processing"
      breadcrumbs={[
        { label: 'Intern Dashboard', path: '/intern/dashboard' },
        { label: 'Profile' },
        { label: 'Bank Details' },
      ]}
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl space-y-6">

        {/* Verified Badge */}
        <motion.div variants={item} className="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-4 flex items-center gap-3 shadow-sm">
          <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <BadgeCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Bank Account Verified</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Your bank details have been verified. Stipends will be processed to this account.</p>
          </div>
        </motion.div>

        {/* Bank Details Form */}
        <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-5">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <BankField label="Bank Name" icon={Building2} value="State Bank of India" />
            <BankField label="Account Number" icon={CreditCard} value="123456789012" masked />
            <BankField label="IFSC Code" icon={QrCode} value="SBIN0001234" />
            <BankField label="Branch" icon={MapPin} value="HSR Layout Branch, Bangalore" />
            <BankField label="Account Type" icon={Layers} value="Savings Account" />
            <BankField label="UPI ID" icon={Smartphone} value="elena.rostova@oksbi" />
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div variants={item} className="flex items-center justify-end">
          <div className="relative group">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
              <Save className="w-4 h-4" />
              Update Bank Details
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Submit changes for re-verification
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
            </div>
          </div>
        </motion.div>

      </motion.div>
    </InternPageShell>
  );
}
