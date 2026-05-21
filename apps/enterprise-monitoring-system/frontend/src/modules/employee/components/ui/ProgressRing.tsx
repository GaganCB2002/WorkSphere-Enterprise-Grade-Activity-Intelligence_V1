import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressRing({
  value, size = 120, strokeWidth = 10, color = '#3b82f6',
  trackColor, label, sublabel, showValue = true, className = '',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="transparent"
          stroke={trackColor || 'currentColor'}
          strokeWidth={strokeWidth}
          className={trackColor ? '' : 'text-slate-100 dark:text-slate-800'}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <motion.span
            className="text-2xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {Math.round(value)}%
          </motion.span>
        )}
        {label && <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">{label}</span>}
        {sublabel && <span className="text-[8px] text-slate-400">{sublabel}</span>}
      </div>
    </div>
  );
}
