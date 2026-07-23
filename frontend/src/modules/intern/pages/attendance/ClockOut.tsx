import React, { useState, useEffect } from 'react';
import InternPageShell from '../../InternPageShell';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Clock, Coffee, AlertTriangle, X } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ClockOutPage() {
  const [time, setTime] = useState(new Date());
  const [showConfirm, setShowConfirm] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockOut = () => {
    setClockedOut(true);
    setShowConfirm(false);
  };

  return (
    <InternPageShell title="Clock Out" description="Mark your departure for today">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="lg:col-span-2 flex flex-col items-center justify-center bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-10 shadow-sm">
            <div className="text-6xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-2">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </div>
            <p className="text-sm text-slate-500 mb-8">{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowConfirm(true)}
              disabled={clockedOut}
              className={`flex items-center gap-4 px-12 py-6 rounded-2xl text-xl font-bold shadow-lg transition-all ${
                clockedOut
                  ? 'bg-slate-100 text-slate-500 dark:bg-slate-700/40 dark:text-slate-400 border-2 border-slate-300 dark:border-slate-600 cursor-default'
                  : 'bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 cursor-pointer'
              }`}
            >
              <LogOut className="w-8 h-8" />
              {clockedOut ? 'Clocked Out ✓' : 'Clock Out'}
            </motion.button>
            {clockedOut && <p className="text-xs text-red-600 dark:text-red-400 mt-3 font-semibold">You clocked out at {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>}
          </motion.div>

          <motion.div variants={item} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700/40">
                <span className="text-xs font-semibold text-slate-500">Clock In Time</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">09:02 AM</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700/40">
                <span className="text-xs font-semibold text-slate-500">Break Duration</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">45 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500">Total Hours</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {clockedOut ? '8h 03m' : '8h 03m (est.)'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-100 dark:bg-red-500/10">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confirm Clock Out</h3>
                </div>
                <button onClick={() => setShowConfirm(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                Are you sure you want to clock out? Your total working time will be recorded as <strong>8h 03m</strong>.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClockOut}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm"
                >
                  Clock Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </InternPageShell>
  );
}
