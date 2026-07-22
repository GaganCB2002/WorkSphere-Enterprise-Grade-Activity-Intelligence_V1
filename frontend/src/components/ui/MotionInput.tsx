import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface MotionInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  label?: string;
  error?: string;
}

export const MotionInput = React.forwardRef<HTMLInputElement, MotionInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <motion.label 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            {label}
          </motion.label>
        )}
        <motion.input
          ref={ref}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-700/60 focus:border-brand-500 focus:ring-brand-500/20'} shadow-sm rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 ${className}`}
          {...(props as any)}
        />
        {error && (
          <motion.span 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', x: [-5, 5, -3, 3, 0] }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-medium text-red-500"
          >
            {error}
          </motion.span>
        )}
      </div>
    );
  }
);

MotionInput.displayName = 'MotionInput';
