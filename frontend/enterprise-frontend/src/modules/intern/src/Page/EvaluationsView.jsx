import React from 'react';

export default function EvaluationsView() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-8 bg-background dark:bg-on-secondary-fixed">
      <div className="max-w-6xl mx-auto space-y-8">
<header className="mb-10">
<h1 className="font-headline text-4xl text-on-surface dark:text-surface-bright mb-2">Evaluations & Assessments</h1>
<p className="font-body text-on-surface-variant dark:text-secondary-fixed-dim">Comprehensive performance review and mentor feedback.</p>
</header>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/* Skill Matrix Radar */}
<div className="lg:col-span-1 bg-surface-container-low dark:bg-inverse-surface rounded-xl p-8 border border-outline-variant/20 shadow-sm flex flex-col items-center">
<h3 className="font-headline text-2xl text-on-surface dark:text-surface-bright mb-6 w-full text-center">Skill Matrix</h3>
<div className="radar-chart-container w-full max-w-[250px]">
<div className="radar-axes"></div>
<div className="axis-line" style={{transform: 'rotate(0deg)'}}></div>
<div className="axis-line" style={{transform: 'rotate(45deg)'}}></div>
<div className="axis-line" style={{transform: 'rotate(90deg)'}}></div>
<div className="axis-line" style={{transform: 'rotate(135deg)'}}></div>
{/* Simplified polygon representing the radar area */}
<div className="radar-polygon shadow-[0_0_15px_rgba(194,101,42,0.3)]"></div>
{/* Labels */}
<div className="absolute top-0 text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim tracking-wider">TECHNICAL</div>
<div className="absolute right-0 text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim tracking-wider translate-x-4">COMMUNICATION</div>
<div className="absolute bottom-0 text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim tracking-wider">PRODUCTIVITY</div>
<div className="absolute left-0 text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim tracking-wider -translate-x-4">TEAMWORK</div>
</div>
<div className="mt-8 flex gap-4 w-full justify-center">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary"></div>
<span className="text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim">Current</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full border border-outline-variant border-dashed"></div>
<span className="text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim">Target</span>
</div>
</div>
</div>
{/* Evaluation History Table */}
<div className="lg:col-span-2 bg-surface-container-low dark:bg-inverse-surface rounded-xl border border-outline-variant/20 shadow-sm overflow-hidden flex flex-col">
<div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
<h3 className="font-headline text-2xl text-on-surface dark:text-surface-bright">Evaluation History</h3>
<button className="text-xs font-label text-primary hover:underline flex items-center gap-1">
                                View Full <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div className="p-0 overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-dim/30 border-b border-outline-variant/20">
<th className="px-6 py-4 font-label text-xs tracking-wider text-on-surface-variant dark:text-secondary-fixed-dim uppercase">Period</th>
<th className="px-6 py-4 font-label text-xs tracking-wider text-on-surface-variant dark:text-secondary-fixed-dim uppercase">Mentor</th>
<th className="px-6 py-4 font-label text-xs tracking-wider text-on-surface-variant dark:text-secondary-fixed-dim uppercase">Score</th>
<th className="px-6 py-4 font-label text-xs tracking-wider text-on-surface-variant dark:text-secondary-fixed-dim uppercase">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10">
<tr className="hover:bg-surface-dim/20 transition-colors">
<td className="px-6 py-4 font-body text-sm text-primary dark:text-primary-fixed-dim">Q3 Mid-Term</td>
<td className="px-6 py-4 font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary dark:text-tertiary-fixed text-xs font-bold">EW</div>
                                            Elena Woods
                                        </td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="font-headline text-lg text-on-surface dark:text-surface-bright">8.5</span>
<span className="text-xs text-outline">/ 10</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold tracking-wider bg-primary/10 text-primary dark:text-primary-fixed-dim border border-primary/20">COMPLETED</span>
</td>
</tr>
<tr className="hover:bg-surface-dim/20 transition-colors">
<td className="px-6 py-4 font-body text-sm text-primary dark:text-primary-fixed-dim">Q2 Final</td>
<td className="px-6 py-4 font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-outline-variant/20 flex items-center justify-center text-outline text-xs font-bold">MR</div>
                                            Marcus Reed
                                        </td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="font-headline text-lg text-on-surface dark:text-surface-bright">7.8</span>
<span className="text-xs text-outline">/ 10</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold tracking-wider bg-outline-variant/10 text-on-surface-variant dark:text-secondary-fixed-dim border border-outline-variant/20">ARCHIVED</span>
</td>
</tr>
<tr className="hover:bg-surface-dim/20 transition-colors">
<td className="px-6 py-4 font-body text-sm text-primary dark:text-primary-fixed-dim">Q1 Onboarding</td>
<td className="px-6 py-4 font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-outline-variant/20 flex items-center justify-center text-outline text-xs font-bold">MR</div>
                                            Marcus Reed
                                        </td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="font-headline text-lg text-on-surface dark:text-surface-bright">8.0</span>
<span className="text-xs text-outline">/ 10</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold tracking-wider bg-outline-variant/10 text-on-surface-variant dark:text-secondary-fixed-dim border border-outline-variant/20">ARCHIVED</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/* Feedback Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{/* Mentor Review Card */}
<div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl p-8 border border-outline-variant/20 shadow-sm relative overflow-hidden group">
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-6xl text-primary" data-icon="format_quote">format_quote</span>
</div>
<h3 className="font-headline text-xl text-on-surface dark:text-surface-bright mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl" data-icon="person_check">person_check</span>
                            Mentor Review
                        </h3>
<p className="font-body text-on-surface-variant dark:text-secondary-fixed-dim leading-relaxed text-sm relative z-10 italic">
                            "The intern has shown remarkable growth in technical problem-solving over the last sprint. Communication during stand-ups has improved significantly, though there's still room to proactively reach out when blocked. Overall, a very strong trajectory."
                        </p>
<div className="mt-6 flex items-center justify-between border-t border-outline-variant/10 pt-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary dark:text-tertiary-fixed text-sm font-bold">EW</div>
<div className="flex flex-col">
<span className="text-xs font-bold text-primary dark:text-primary-fixed-dim">Elena Woods</span>
<span className="text-[10px] text-outline">Lead Engineer</span>
</div>
</div>
<span className="text-xs text-outline font-label">Oct 14, 2023</span>
</div>
</div>
{/* HR Comments Card */}
<div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl p-8 border border-outline-variant/20 shadow-sm relative overflow-hidden">
<h3 className="font-headline text-xl text-on-surface dark:text-surface-bright mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-xl" data-icon="fact_check">fact_check</span>
                            HR Comments
                        </h3>
<p className="font-body text-on-surface-variant dark:text-secondary-fixed-dim leading-relaxed text-sm">
                            Cultural fit remains excellent. Attendance and participation in corporate training modules are 100% compliant. Recommended for the advanced track next quarter pending final project delivery.
                        </p>
<div className="mt-6 flex items-center justify-between border-t border-outline-variant/10 pt-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-outline-variant/20 flex items-center justify-center text-outline text-sm font-bold">SH</div>
<div className="flex flex-col">
<span className="text-xs font-bold text-primary dark:text-primary-fixed-dim">Sarah Haines</span>
<span className="text-[10px] text-outline">Talent Acquisition</span>
</div>
</div>
<span className="text-xs text-outline font-label">Oct 16, 2023</span>
</div>
</div>
</div>
</div>
    </div>
  );
}
