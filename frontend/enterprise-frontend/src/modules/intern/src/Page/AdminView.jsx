import React from 'react';

export default function AdminView() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-8 bg-background dark:bg-on-secondary-fixed">
      <div className="max-w-7xl mx-auto space-y-8">
{/* Header Area */}
<div className="flex justify-between items-end">
  <div>
    <h2 className="font-headline text-3xl text-on-surface dark:text-surface-bright font-bold">Admin Overview</h2>
    <p className="font-body text-on-surface-variant dark:text-secondary-fixed-dim mt-1">Manage the Fall 2024 intern cohort pipeline and mentorship assignments.</p>
  </div>
  <div className="flex gap-3">
    <button className="px-5 py-2 border border-outline-variant/40 text-on-surface-variant dark:text-secondary-fixed-dim hover:text-on-surface dark:text-surface-bright font-label text-sm rounded-lg transition-colors flex items-center gap-2">
      <span className="material-symbols-outlined text-[18px]">download</span>
      Export Reports
    </button>
    <button className="px-5 py-2 bg-primary text-on-primary font-label text-sm rounded-lg transition-colors hover:bg-primary-container flex items-center gap-2 shadow-warm">
      <span className="material-symbols-outlined text-[18px]">add</span>
      New Cohort
    </button>
  </div>
</div>
{/* Bento Grid Layout */}
<div className="grid grid-cols-12 gap-6">
{/* Intern Pipeline Funnel (Takes up 4 cols) */}
<div className="col-span-12 lg:col-span-4 bg-surface-container-low dark:bg-inverse-surface rounded-2xl p-6 shadow-warm border border-outline-variant/10 flex flex-col">
  <div className="flex justify-between items-center mb-6">
    <h3 className="font-headline text-xl text-on-surface dark:text-surface-bright">Intern Pipeline</h3>
    <button className="text-outline hover:text-primary transition-colors">
      <span className="material-symbols-outlined text-sm">more_horiz</span>
    </button>
  </div>
  <div className="flex-1 flex flex-col justify-center space-y-3">
    {/* Funnel Stages */}
    <div className="relative w-full h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-secondary-fixed/10 rounded-lg" style={{width: '100%', margin: '0 auto'}}></div>
      <div className="relative z-10 flex justify-between w-full px-4 items-center">
        <span className="font-label text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Applied</span>
        <span className="font-headline text-lg text-on-surface dark:text-surface-bright font-semibold">1,204</span>
      </div>
    </div>
    <div className="relative w-full h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-secondary-fixed/20 rounded-lg" style={{width: '85%', margin: '0 auto'}}></div>
      <div className="relative z-10 flex justify-between w-[85%] px-4 items-center">
        <span className="font-label text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Screened</span>
        <span className="font-headline text-lg text-on-surface dark:text-surface-bright font-semibold">842</span>
      </div>
    </div>
    <div className="relative w-full h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/20 rounded-lg border border-primary/10" style={{width: '60%', margin: '0 auto'}}></div>
      <div className="relative z-10 flex justify-between w-[60%] px-4 items-center">
        <span className="font-label text-sm text-primary dark:text-primary-fixed-dim">Interviewed</span>
        <span className="font-headline text-lg text-primary dark:text-primary-fixed-dim font-semibold">310</span>
      </div>
    </div>
    <div className="relative w-full h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/40 rounded-lg border border-primary/20" style={{width: '40%', margin: '0 auto'}}></div>
      <div className="relative z-10 flex justify-between w-[40%] px-4 items-center">
        <span className="font-label text-sm text-on-surface dark:text-surface-bright">Offers</span>
        <span className="font-headline text-lg text-on-surface dark:text-surface-bright font-semibold">145</span>
      </div>
    </div>
    <div className="relative w-full h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary rounded-lg shadow-warm" style={{width: '25%', margin: '0 auto'}}></div>
      <div className="relative z-10 flex justify-center w-[25%] px-4 items-center">
        <span className="font-label text-sm text-on-primary font-medium tracking-wide">98 Hired</span>
      </div>
    </div>
  </div>
</div>
{/* Mentor Assignment Widget (Takes up 8 cols) */}
<div className="col-span-12 lg:col-span-8 bg-surface-container-low dark:bg-inverse-surface rounded-2xl p-6 shadow-warm border border-outline-variant/10">
<div className="flex justify-between items-center mb-6">
<div>
<h3 className="font-headline text-xl text-on-surface dark:text-surface-bright">Mentor Assignment</h3>
<p className="font-body text-xs text-on-surface-variant dark:text-secondary-fixed-dim mt-1">Needs attention: 12 interns unassigned</p>
</div>
<button className="text-primary dark:text-primary-fixed-dim hover:text-primary-fixed font-label text-sm transition-colors flex items-center gap-1">
                                Auto-Assign <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
</button>
</div>
<div className="grid grid-cols-2 gap-4">
{/* Assignment Card 1 */}
<div className="bg-surface-dim dark:bg-on-secondary-fixed rounded-xl p-4 border border-outline-variant/10 flex flex-col gap-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-fixed/20 flex items-center justify-center text-on-surface-variant dark:text-secondary-fixed-dim font-headline text-lg">
                                            JW
                                        </div>
<div>
<p className="font-body text-sm font-medium text-on-surface dark:text-surface-bright">Julian Webb</p>
<p className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Engineering</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
</div>
<div className="flex items-center gap-3 bg-surface-container-low dark:bg-on-secondary-fixed/50 p-2 rounded-lg border border-dashed border-outline-variant/30 hover:border-primary/50 cursor-pointer transition-colors group">
<div className="w-8 h-8 rounded-full border border-dashed border-outline-variant/50 flex items-center justify-center text-outline group-hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[16px]">person_add</span>
</div>
<span className="font-label text-xs text-outline group-hover:text-primary transition-colors">Assign Mentor</span>
</div>
</div>
{/* Assignment Card 2 */}
<div className="bg-surface-dim dark:bg-on-secondary-fixed rounded-xl p-4 border border-outline-variant/10 flex flex-col gap-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<img alt="Intern" className="w-10 h-10 rounded-full object-cover" data-alt="A portrait of a young professional woman looking thoughtfully away from the camera. Warm, golden-hour lighting emphasizes the burnt sienna and neutral tones of the Sahara design system. Minimalist background, evoking a calm, focused work environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQQn8uXAfcTcl74Bbu2AIPXAIybDOGY8cE6yiVyfvuB5Db4X3PIkwxT92X5qv6bNCfXACAVCfLv_oQdte5fSTj5RNqbX2MZh4G4vFLgKUr_UDAQeEWhYup-kl585I5LLkcqZeomLxAgcOiWuVymu3uXuBgHz7_65h32nzChJmFiSPnhH7btNs9DfdwST4B97p79eDlYHZhWZ7Ic8IlsaFCsvCvNP1_tB4vwmLoW0bC6WzCxqfYErH--8UKiHTVxg9sknjiXu-UrAc"/>
<div>
<p className="font-body text-sm font-medium text-on-surface dark:text-surface-bright">Sarah Chen</p>
<p className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Product Design</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
</div>
<div className="flex items-center justify-between bg-surface-container-high dark:bg-surface-container-low p-2 rounded-lg border border-outline-variant/20">
<div className="flex items-center gap-2">
<img alt="Mentor" className="w-8 h-8 rounded-full object-cover grayscale opacity-80" data-alt="Black and white portrait of a mature male professional. Soft, warm-toned overlay applied to match the Sahara dark mode aesthetic. He wears a casual button-down shirt, projecting a supportive, mentorship persona." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC126KrhkrTu1Cv26iDUcb2sMMFH0FDjDg-yK2UoYHf5O8HY9CEJrukxxYnkGQ0Yh-HyKxmRKrhxi4RIA1uS9L2CwtGHIECu8IcXV0PzO-My59DjcA_KneTQtaFN2RpxWlxl8-VYAghYuH2bHVMs-q5Luu4umW346q_dDbUpR3Q0jPF0e-LqiXjLAscfjdTIZwSFH39c4HZzY-Sba6Q27n9ozuMMWbnnUzAg9Ynhkqk7HgTciuvcf05g5RWQSSLoR_qEM9bMEa_x_M"/>
<span className="font-body text-xs text-on-surface dark:text-surface-bright">David K.</span>
</div>
<button className="text-tertiary dark:text-tertiary-fixed-dim hover:text-tertiary font-label text-[10px] uppercase tracking-wider">Reassign</button>
</div>
</div>
</div>
</div>
{/* Searchable Table (Full Width) */}
<div className="col-span-12 bg-surface-container-low dark:bg-inverse-surface rounded-2xl p-6 shadow-warm border border-outline-variant/10">
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
<h3 className="font-headline text-xl text-on-surface dark:text-surface-bright">Intern Roster & Status</h3>
{/* Table Controls */}
<div className="flex gap-3 w-full sm:w-auto">
<div className="relative flex-1 sm:w-64">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">filter_list</span>
<select className="w-full bg-surface-dim dark:bg-on-secondary-fixed border border-outline-variant/20 dark:border-outline-variant/10 rounded-lg py-2 pl-10 pr-8 text-sm font-body text-on-surface dark:text-surface-bright focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer">
<option>All Departments</option>
<option>Engineering</option>
<option>Design</option>
<option>Marketing</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-sm pointer-events-none">expand_more</span>
</div>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant/20 dark:border-outline-variant/10">
<th className="py-3 px-4 font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-medium uppercase tracking-wider">Intern</th>
<th className="py-3 px-4 font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-medium uppercase tracking-wider">Department</th>
<th className="py-3 px-4 font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-medium uppercase tracking-wider">Mentor</th>
<th className="py-3 px-4 font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-medium uppercase tracking-wider">Performance</th>
<th className="py-3 px-4 font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-medium uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10 dark:divide-outline-variant/5">
<tr className="hover:bg-surface-dim/50 dark:hover:bg-on-secondary-fixed/50 transition-colors group">
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary/20 text-primary dark:text-primary-fixed-dim flex items-center justify-center font-headline text-sm font-semibold">AM</div>
<div>
<p className="font-body text-sm font-medium text-on-surface dark:text-surface-bright">Alex Mercer</p>
<p className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Week 4 of 12</p>
</div>
</div>
</td>
<td className="py-4 px-4 font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Software Engineering</td>
<td className="py-4 px-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-dim dark:bg-on-secondary-fixed border border-outline-variant/20 font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim">
<span className="material-symbols-outlined text-[14px]">person</span> Sarah C.
                                            </span>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-[#8bc34a]"></div> {/* Using explicit green for generic status indicator, not themed color */}
<span className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Exceeding</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<button className="text-outline group-hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">edit_document</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-dim/50 dark:hover:bg-on-secondary-fixed/50 transition-colors group">
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-fixed/20 text-on-surface-variant dark:text-secondary-fixed-dim flex items-center justify-center font-headline text-sm font-semibold">PL</div>
<div>
<p className="font-body text-sm font-medium text-on-surface dark:text-surface-bright">Priya Patel</p>
<p className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Week 4 of 12</p>
</div>
</div>
</td>
<td className="py-4 px-4 font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Product Management</td>
<td className="py-4 px-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container/20 border border-error-container/30 font-label text-xs text-tertiary dark:text-tertiary-fixed-dim">
                                                Unassigned
                                            </span>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-[#ffb300]"></div>
<span className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Meeting Specs</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<button className="text-outline group-hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">edit_document</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-dim/50 dark:hover:bg-on-secondary-fixed/50 transition-colors group">
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary/20 text-tertiary-fixed flex items-center justify-center font-headline text-sm font-semibold">RJ</div>
<div>
<p className="font-body text-sm font-medium text-on-surface dark:text-surface-bright">Ryan Jenkins</p>
<p className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Week 2 of 12</p>
</div>
</div>
</td>
<td className="py-4 px-4 font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Data Science</td>
<td className="py-4 px-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-dim dark:bg-on-secondary-fixed border border-outline-variant/20 font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim">
<span className="material-symbols-outlined text-[14px]">person</span> Dr. Alan
                                            </span>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-tertiary"></div>
<span className="font-body text-sm text-on-surface-variant dark:text-secondary-fixed-dim">Needs Review</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<button className="text-outline group-hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">edit_document</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="mt-4 flex justify-between items-center pt-4 border-t border-outline-variant/10 dark:border-outline-variant/5">
<span className="font-label text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Showing 1-3 of 98 interns</span>
<div className="flex gap-2">
<button className="p-1 text-outline hover:text-on-surface dark:text-surface-bright transition-colors disabled:opacity-50" disabled=""><span className="material-symbols-outlined text-sm">chevron_left</span></button>
<button className="p-1 text-outline hover:text-on-surface dark:text-surface-bright transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
</div>
</div>
</div>
</div>
</div>
    </div>
  );
}
