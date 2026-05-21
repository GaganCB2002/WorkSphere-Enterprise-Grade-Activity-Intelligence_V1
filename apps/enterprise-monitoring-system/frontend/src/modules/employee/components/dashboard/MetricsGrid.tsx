import React from 'react';
import { StatCard } from '../ui/StatCard';
import type { DashboardStat } from '../../types';

interface MetricsGridProps {
  stats: DashboardStat[];
}

export function MetricsGrid({ stats }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {stats.map((stat, i) => (
        <StatCard key={stat.id} {...stat} delay={i * 0.06} />
      ))}
    </div>
  );
}

export default MetricsGrid;
