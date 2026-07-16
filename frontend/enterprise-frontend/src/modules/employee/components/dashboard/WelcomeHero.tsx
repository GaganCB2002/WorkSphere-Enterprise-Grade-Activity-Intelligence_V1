import React from 'react';
import { motion } from 'framer-motion';
import { ProgressRing } from '../ui/ProgressRing';
import type { User } from '../../../../types';

interface WelcomeHeroProps {
  user: User;
  sessionTimeText: string;
  performanceScore: number;
}

export function WelcomeHero({ user, sessionTimeText, performanceScore }: WelcomeHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 lg:p-8 text-white"
    >
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/4" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-200">
              Online • Active Shift
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Good day, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-blue-200 mt-1.5 text-sm max-w-lg font-normal">
            You have active tasks in progress. Your performance index is trending above the department baseline.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Active Shift duration</p>
            <p className="text-3xl font-bold font-mono tabular-nums mt-1">{sessionTimeText || '08h 02m'}</p>
          </div>
          
          <ProgressRing
            value={performanceScore}
            size={88}
            strokeWidth={7}
            color="#34d399"
            trackColor="rgba(255,255,255,0.15)"
            label="Score"
            showValue={true}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeHero;
