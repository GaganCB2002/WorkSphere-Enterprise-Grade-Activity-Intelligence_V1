import React from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import type { LeaveBalance } from '../../types';

interface LeaveBalanceCardsProps {
  balances: LeaveBalance[];
}

export function LeaveBalanceCards({ balances }: LeaveBalanceCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {balances.map(balance => (
        <GlassPanel key={balance.type} className="p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {balance.label}
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{balance.remaining}</span>
              <span className="text-xs text-slate-400">/ {balance.total} days left</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(balance.used / balance.total) * 100}%`,
                  backgroundColor: balance.color
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-400 font-medium">
              <span>{balance.used} used</span>
              {balance.pending > 0 && <span className="text-amber-500">{balance.pending} pending</span>}
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}

export default LeaveBalanceCards;
