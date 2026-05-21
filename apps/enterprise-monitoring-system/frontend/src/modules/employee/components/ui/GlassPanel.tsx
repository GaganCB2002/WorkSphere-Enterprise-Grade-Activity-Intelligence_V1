import React from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'solid';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

const paddingMap = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };

export function GlassPanel({ children, className = '', variant = 'default', padding = 'md', hover = false, animate = false, onClick }: GlassPanelProps) {
  const base = 'rounded-2xl transition-all duration-300';
  const variantStyles = {
    default: 'bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-white/[0.06] shadow-sm dark:shadow-none backdrop-blur-xl',
    subtle: 'bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-white/[0.04]',
    solid: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md',
  };
  const hoverStyles = hover ? 'hover:shadow-lg hover:border-blue-200/50 dark:hover:border-white/10 hover:-translate-y-0.5 cursor-pointer' : '';

  const combinedClassName = `${base} ${variantStyles[variant]} ${paddingMap[padding]} ${hoverStyles} ${className}`;

  if (animate) {
    return (
      <motion.div
        className={combinedClassName}
        onClick={onClick}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={combinedClassName}
      onClick={onClick}
    >
    </div>
  );
}
