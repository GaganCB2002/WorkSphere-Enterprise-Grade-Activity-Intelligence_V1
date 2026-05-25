import React from 'react';

export default function LearningView() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-10 bg-background dark:bg-on-secondary-fixed">
      <div className="max-w-7xl mx-auto space-y-12">
{/* Page Header */}
<header className="flex justify-between items-end">
<div>
<h2 className="font-headline text-4xl text-on-surface mb-2 tracking-tight">Learning Hub</h2>
<p className="font-body text-on-surface-variant max-w-2xl text-lg">Curated knowledge paths designed to elevate your professional trajectory. Continue your journey.</p>
</div>
</header>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/* Left Column: Streak & Radar (Span 4) */}
<div className="lg:col-span-4 space-y-8 flex flex-col">
{/* Daily Streak Widget */}
<div className="bg-surface-container-low rounded-xl p-8 sahara-shadow border border-outline-variant/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
<div className="absolute -right-12 -top-12 w-40 h-40 bg-primary-fixed-dim/20 rounded-full blur-3xl"></div>
<div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-4xl" data-icon="local_fire_department" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
</div>
<h3 className="font-headline text-5xl text-on-surface mb-1">12</h3>
<p className="font-label text-on-surface-variant font-semibold tracking-wide uppercase text-xs mb-6">Day Learning Streak</p>
<div className="flex gap-2">
<div className="w-8 h-10 rounded bg-primary/20 flex flex-col items-center justify-center text-primary font-label text-xs"><span>M</span><div className="w-1 h-1 rounded-full bg-primary mt-1"></div></div>
<div className="w-8 h-10 rounded bg-primary/20 flex flex-col items-center justify-center text-primary font-label text-xs"><span>T</span><div className="w-1 h-1 rounded-full bg-primary mt-1"></div></div>
<div className="w-8 h-10 rounded bg-primary text-on-primary flex flex-col items-center justify-center font-label text-xs shadow-sm"><span>W</span><div className="w-1 h-1 rounded-full bg-on-primary mt-1"></div></div>
<div className="w-8 h-10 rounded bg-surface-variant border border-outline-variant/50 flex flex-col items-center justify-center text-outline font-label text-xs"><span>T</span></div>
<div className="w-8 h-10 rounded bg-surface-variant border border-outline-variant/50 flex flex-col items-center justify-center text-outline font-label text-xs"><span>F</span></div>
</div>
</div>
{/* Skill Matrix Radar Chart */}
<div className="bg-surface-container-highest rounded-xl p-8 sahara-shadow border border-outline-variant/20 flex-1 flex flex-col">
<div className="flex justify-between items-center mb-8">
<h3 className="font-headline text-2xl text-on-surface">Skill Matrix</h3>
<button className="text-tertiary hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-lg" data-icon="more_horiz">more_horiz</span>
</button>
</div>
<div className="relative w-full aspect-square flex items-center justify-center bg-surface rounded-full border border-outline-variant/20 inner-shadow">
{/* Stylized Radar Visual using SVG */}
<svg className="w-full h-full p-4 absolute inset-0 opacity-20" viewBox="0 0 100 100">
<polygon fill="none" points="50,5 95,27 95,73 50,95 5,73 5,27" stroke="currentColor" strokeWidth="0.5"></polygon>
<polygon fill="none" points="50,20 80,35 80,65 50,80 20,65 20,35" stroke="currentColor" strokeWidth="0.5"></polygon>
<polygon fill="none" points="50,35 65,45 65,55 50,65 35,55 35,45" stroke="currentColor" strokeWidth="0.5"></polygon>
<line stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="5"></line>
<line stroke="currentColor" strokeWidth="0.5" x1="50" x2="95" y1="50" y2="27"></line>
<line stroke="currentColor" strokeWidth="0.5" x1="50" x2="95" y1="50" y2="73"></line>
<line stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="95"></line>
<line stroke="currentColor" strokeWidth="0.5" x1="50" x2="5" y1="50" y2="73"></line>
<line stroke="currentColor" strokeWidth="0.5" x1="50" x2="5" y1="50" y2="27"></line>
</svg>
{/* Data Polygon */}
<svg className="w-full h-full p-4 absolute inset-0 z-10 text-primary drop-shadow-md" viewBox="0 0 100 100">
<polygon fill="currentColor" fill-opacity="0.2" points="50,25 85,35 70,65 50,70 30,55 20,35" stroke="currentColor" stroke-linejoin="round" strokeWidth="1.5"></polygon>
</svg>
{/* Labels */}
<span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-label text-on-surface-variant font-semibold">Leadership</span>
<span className="absolute top-1/4 right-2 text-[10px] font-label text-on-surface-variant font-semibold">Strategy</span>
<span className="absolute bottom-1/4 right-2 text-[10px] font-label text-on-surface-variant font-semibold">Data</span>
<span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-label text-on-surface-variant font-semibold">Design</span>
<span className="absolute bottom-1/4 left-2 text-[10px] font-label text-on-surface-variant font-semibold">Tech</span>
<span className="absolute top-1/4 left-2 text-[10px] font-label text-on-surface-variant font-semibold">Comms</span>
</div>
<div className="mt-6 flex items-center justify-between text-sm">
<span className="text-on-surface-variant">Growth Index: <strong className="text-primary">+14%</strong></span>
<span className="text-on-surface-variant text-xs">Last 30 days</span>
</div>
</div>
</div>
{/* Right Column: Courses & Paths (Span 8) */}
<div className="lg:col-span-8 flex flex-col gap-8">
{/* Enrolled Courses */}
<section>
<div className="flex justify-between items-baseline mb-6">
<h3 className="font-headline text-2xl text-on-surface">Enrolled Courses</h3>
<a className="font-label text-sm text-primary hover:text-on-primary-fixed-variant transition-colors underline decoration-primary/30 underline-offset-4" href="#">View All</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Course Card 1 */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 sahara-shadow overflow-hidden group hover:border-primary/30 transition-all duration-300">
<div className="h-32 bg-secondary-container relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-tr from-inverse-surface/80 to-transparent z-10"></div>
<img alt="Strategic Planning Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A warm, editorial photograph of a modern office meeting room table scattered with blueprint documents, a sleek laptop, and a ceramic cup of coffee. Sunlight streams across the table, creating high-contrast golden hour shadows. The mood is focused, professional, and minimalist, utilizing a palette of warm beiges, soft whites, and earthy browns." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEPfVwHsicScFmWBufnXvfg0mJ216X4TzRr_A-VC2bnidwAfFlcZe26YMdWqaT6npFmaYi9-JzlQDpKC7JZsVp0eRARwnYRkFqqIc5W7qA_AUrNqenK5T_1av8l60z7fOfyrgu2ztchNXBJLLwcZfb964eBKuXqxMXoiVVYryj5iSg6HjjOBUlWJijm_Dv0Zk2Ahzfdxku_JPl4d8b2uP6dRvLDjCwQ8XxiSemymOTOe4ibmk9iXk9KfXttpHxxp_in5neSkrjCFc"/>
<span className="absolute top-4 right-4 z-20 bg-surface/90 backdrop-blur text-on-surface px-2 py-1 text-[10px] font-label uppercase tracking-widest rounded shadow-sm border border-outline-variant/20">In Progress</span>
</div>
<div className="p-6">
<h4 className="font-headline text-xl text-on-surface mb-2 line-clamp-1">Enterprise Strategic Planning</h4>
<p className="font-body text-sm text-on-surface-variant mb-6 line-clamp-2">Master the art of aligning departmental objectives with overarching corporate warm minimalist goals.</p>
<div className="space-y-2 mb-6">
<div className="flex justify-between text-xs font-label">
<span className="text-on-surface-variant">Module 4 of 8</span>
<span className="text-primary font-semibold">50%</span>
</div>
<div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full w-1/2"></div>
</div>
</div>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
<div className="flex items-center gap-1.5 text-secondary text-xs">
<span className="material-symbols-outlined text-[16px]" data-icon="schedule">schedule</span>
<span>45 mins left</span>
</div>
<button className="bg-primary text-on-primary hover:bg-surface-tint px-4 py-2 rounded-lg font-label text-sm transition-colors flex items-center gap-2">
                                            Continue
                                            <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</div>
{/* Course Card 2 */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 sahara-shadow overflow-hidden group hover:border-primary/30 transition-all duration-300">
<div className="h-32 bg-secondary-container relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-tr from-inverse-surface/80 to-transparent z-10"></div>
<div className="w-full h-full bg-gradient-to-br from-tertiary-fixed-dim to-primary-container group-hover:scale-105 transition-transform duration-700" data-alt="A smooth, abstract background featuring a warm, soft gradient transitioning from dusty rose to burnt sienna. The texture is completely smooth, reminiscent of high-end editorial paper stock or a subtle desert sunrise. The aesthetic is purely minimalist, focusing entirely on the interplay of the Sahara color palette."></div>
<span className="absolute top-4 right-4 z-20 bg-surface/90 backdrop-blur text-on-surface px-2 py-1 text-[10px] font-label uppercase tracking-widest rounded shadow-sm border border-outline-variant/20">Just Started</span>
</div>
<div className="p-6">
<h4 className="font-headline text-xl text-on-surface mb-2 line-clamp-1">Design Systems & Tokenization</h4>
<p className="font-body text-sm text-on-surface-variant mb-6 line-clamp-2">Learn to build scalable design languages using modern visual tokens and warm styling.</p>
<div className="space-y-2 mb-6">
<div className="flex justify-between text-xs font-label">
<span className="text-on-surface-variant">Module 1 of 5</span>
<span className="text-primary font-semibold">10%</span>
</div>
<div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full w-[10%]"></div>
</div>
</div>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
<div className="flex items-center gap-1.5 text-secondary text-xs">
<span className="material-symbols-outlined text-[16px]" data-icon="schedule">schedule</span>
<span>2.5 hrs left</span>
</div>
<button className="bg-surface text-on-surface border border-outline-variant hover:border-primary px-4 py-2 rounded-lg font-label text-sm transition-colors flex items-center gap-2">
                                            Resume
                                        </button>
</div>
</div>
</div>
</div>
</section>
{/* AI Recommended Paths */}
<section className="bg-primary-fixed/30 rounded-xl p-8 border border-primary/10 relative overflow-hidden">
{/* Decorative bg element */}
<div className="absolute right-0 top-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
<div className="flex items-start gap-4 mb-8 relative z-10">
<div className="w-10 h-10 rounded-lg bg-surface text-primary flex items-center justify-center shadow-sm border border-outline-variant/30">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
</div>
<div>
<h3 className="font-headline text-2xl text-on-surface">Recommended Paths</h3>
<p className="font-body text-sm text-on-surface-variant mt-1">Curated based on your recent skill matrix growth and active projects.</p>
</div>
</div>
<div className="flex flex-col gap-4 relative z-10">
{/* Path 1 */}
<div className="bg-surface rounded-lg p-5 flex items-center gap-6 border border-outline-variant/30 hover:shadow-md transition-shadow cursor-pointer group">
<div className="w-12 h-12 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined" data-icon="psychology">psychology</span>
</div>
<div className="flex-1">
<h4 className="font-headline text-lg text-on-surface group-hover:text-primary transition-colors">Advanced Cognitive Empathy</h4>
<div className="flex items-center gap-3 mt-1 text-xs font-label text-on-surface-variant">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]" data-icon="book">book</span> 3 Courses</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]" data-icon="timer">timer</span> 6 Hours</span>
</div>
</div>
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors">
<span className="material-symbols-outlined text-sm" data-icon="add">add</span>
</button>
</div>
{/* Path 2 */}
<div className="bg-surface rounded-lg p-5 flex items-center gap-6 border border-outline-variant/30 hover:shadow-md transition-shadow cursor-pointer group">
<div className="w-12 h-12 rounded bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined" data-icon="data_exploration">data_exploration</span>
</div>
<div className="flex-1">
<h4 className="font-headline text-lg text-on-surface group-hover:text-primary transition-colors">Data Storytelling for Leaders</h4>
<div className="flex items-center gap-3 mt-1 text-xs font-label text-on-surface-variant">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]" data-icon="book">book</span> 5 Courses</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]" data-icon="timer">timer</span> 12 Hours</span>
</div>
</div>
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors">
<span className="material-symbols-outlined text-sm" data-icon="add">add</span>
</button>
</div>
</div>
</section>
</div>
</div>
</div>
    </div>
  );
}
