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
    default: 'glass-panel shadow-soft dark:shadow-none',
    subtle: 'bg-background/40 border border-outline/30 dark:bg-[#121a2e]/30',
    solid: 'bg-surface border border-outline shadow-soft dark:bg-[#161d30]',
  };
  const hoverStyles = hover ? 'hover:shadow-warm hover:border-primary/40 dark:hover:border-primary/30 hover:-translate-y-0.5 cursor-pointer' : '';

  const combinedClassName = `₹${base} ${variantStyles[variant]} ${paddingMap[padding]} ${hoverStyles} ${className}`;

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
      {children}
    </div>
  );
}
