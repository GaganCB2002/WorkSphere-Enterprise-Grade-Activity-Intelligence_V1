import React from 'react';

export default function ProjectsView() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-8 bg-background dark:bg-on-secondary-fixed">
      <div className="max-w-7xl mx-auto space-y-8">
{/* Page Header */}
<div className="flex justify-between items-end pb-4 border-b border-outline-variant/10">
<div>
<h1 className="text-4xl font-headline text-on-surface dark:text-surface-bright font-medium mb-2">Projects Overview</h1>
<p className="font-body text-on-surface-variant dark:text-secondary-fixed-dim text-sm max-w-2xl">Monitor active initiatives, track milestones, and manage resource allocation across all enterprise teams.</p>
</div>
<div className="flex gap-3">
<button className="px-4 py-2 border border-outline-variant/30 text-on-surface dark:text-surface-bright rounded-lg font-label text-sm hover:bg-surface-variant/5 transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                            Filter
                        </button>
<button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label text-sm hover:bg-primary-container transition-colors shadow-[0_2px_16px_rgba(194,101,42,0.2)] flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">add</span>
                            New Project
                        </button>
</div>
</div>
{/* Active Project Spotlight (Bento Grid Style) */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* Gantt / Timeline Card (Spans 2 cols) */}
<div className="lg:col-span-2 bg-surface-container-low dark:bg-inverse-surface rounded-xl border border-outline-variant/10 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.2)]">
<div className="flex justify-between items-center mb-6">
<div>
<span className="text-xs font-label text-primary font-semibold tracking-wider uppercase mb-1 block">Active Spotlight</span>
<h3 className="text-2xl font-headline text-on-surface dark:text-surface-bright">Project Sahara Migration</h3>
</div>
<span className="px-3 py-1 bg-primary/10 text-primary-fixed border border-primary/20 rounded-full text-xs font-label flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                In Progress
                            </span>
</div>
{/* Minimalist Timeline Visualization */}
<div className="mt-8 space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/20 before:to-transparent">
{/* Phase 1: Completed */}
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
<div className="flex items-center justify-center w-6 h-6 rounded-full border border-primary bg-surface-container-low dark:bg-inverse-surface text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#231e1a] z-10">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-surface-container-high dark:bg-[#2a2420] border border-outline-variant/5 shadow-sm">
<div className="flex justify-between mb-1">
<h4 className="font-label font-medium text-on-surface dark:text-surface-bright text-sm">Design System V2</h4>
<span className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim">Q1</span>
</div>
<p className="text-xs text-on-surface-variant line-clamp-2">Token standardization and warm-minimalism integration.</p>
</div>
</div>
{/* Phase 2: Active */}
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
<div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-on-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#231e1a] z-10">
<span className="w-2 h-2 rounded-full bg-on-primary"></span>
</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-primary/5 border border-primary/20 shadow-sm relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-outline-variant/10"><div className="h-full bg-primary w-[65%]"></div></div>
<div className="flex justify-between mb-1 mt-1">
<h4 className="font-label font-medium text-primary text-sm">Frontend Architecture</h4>
<span className="text-xs text-primary">Active</span>
</div>
<p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim line-clamp-2">Component library refactor and state management overhaul.</p>
</div>
</div>
{/* Phase 3: Upcoming */}
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
<div className="flex items-center justify-center w-6 h-6 rounded-full border border-outline-variant/30 bg-surface-container-low dark:bg-inverse-surface text-outline-variant shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_#231e1a] z-10">
</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-surface-container-high dark:bg-[#2a2420]/50 border border-outline-variant/5 border-dashed">
<div className="flex justify-between mb-1">
<h4 className="font-label text-on-surface-variant text-sm">Backend Integration</h4>
<span className="text-xs text-outline-variant">Q3</span>
</div>
</div>
</div>
</div>
</div>
{/* Resource Allocation Heatmap Card */}
<div className="bg-surface-container-low dark:bg-inverse-surface rounded-xl border border-outline-variant/10 p-6 flex flex-col shadow-[0_2px_16px_rgba(0,0,0,0.2)]">
<h3 className="text-lg font-headline text-on-surface dark:text-surface-bright mb-1">Resource Allocation</h3>
<p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim mb-6 font-body">Current sprint bandwidth</p>
<div className="flex-1 flex flex-col justify-between space-y-4">
{/* Team Member Row */}
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-outline-variant/20 overflow-hidden border border-outline-variant/10 shrink-0">
<img alt="Team member" className="w-full h-full object-cover" data-alt="A portrait of a female professional in a warm-lit, modern office setting. The aesthetic is sophisticated, minimal, and aligns with a dark mode 'sun-baked' theme. Warm shadows and soft highlights define the subject's features." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB22EVeS-2zaT8y_xSIZpDvS70HNENd1VnTmCC6L_XaRF0FNKLpt61r_8iEpKGNF08RcUol17yp2KVUgdx8EnvaxLsq8IczfH68WF_INnt0BG8l1u44rLxQ_o7bcxjzX4J3V5-mKor9sDEH_YO5NfiYSuGR83W6UTzQ9V6qTRuUrRIZcXonA8JhDQyoV_7pCDX_BGihLdn4Km01pipMkR4rTz4hur2lAA1gS1BSt93-zf5WZkyH2cnKWW5-8Fpd5WQbR7fKjdcZ3WY"/>
</div>
<div className="flex-1">
<div className="flex justify-between text-xs mb-1">
<span className="font-label text-on-surface dark:text-surface-bright">E. Carter</span>
<span className="text-tertiary font-medium">95%</span>
</div>
<div className="h-1.5 w-full bg-surface-container-high dark:bg-[#2a2420] rounded-full overflow-hidden">
{/* Heatmap logic: High usage = tertiary (dusty rose/reddish), Normal = primary, Low = surface-variant */}
<div className="h-full bg-tertiary w-[95%] rounded-full"></div>
</div>
</div>
</div>
{/* Team Member Row */}
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-outline-variant/20 overflow-hidden border border-outline-variant/10 shrink-0">
<img alt="Team member" className="w-full h-full object-cover" data-alt="A portrait of a male developer looking directly at the camera. The background is deeply dark with warm, amber ambient light spilling in from the side. The overall mood is focused and elegant, fitting a luxury enterprise application." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAA8g5F9nUgoijhsmPDIwt--26ntWM-TTrXpgFVs8JN_DqocalU-Ol9jRlPmZCOT-oCcmpUFZvFvZitQso5PNxdi1-2buhXXE3Cj97E9Ur38x7yxDShyW8lEcItvMww4S49YEEzeJJfdgOnoJtaYnCjx4dWfCmL8XJa7cp4OUcktFISOahefzsWPNOT5ax5Ixb306Z69g4lOCwWI67MwwLCoi13AQZx3qpDUaPnHAKZFeeCwyWAvCnJrFOW19SROYKgE5i0_0Efs4"/>
</div>
<div className="flex-1">
<div className="flex justify-between text-xs mb-1">
<span className="font-label text-on-surface dark:text-surface-bright">J. Smith</span>
<span className="text-primary dark:text-primary-fixed-dim font-medium">65%</span>
</div>
<div className="h-1.5 w-full bg-surface-container-high dark:bg-[#2a2420] rounded-full overflow-hidden">
<div className="h-full bg-primary w-[65%] rounded-full"></div>
</div>
</div>
</div>
{/* Team Member Row */}
<div className="flex items-center gap-3">
<div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high dark:bg-[#2a2420] border border-outline-variant/20 text-on-surface-variant font-headline text-xs shrink-0">
                                    AM
                                </div>
<div className="flex-1">
<div className="flex justify-between text-xs mb-1">
<span className="font-label text-on-surface dark:text-surface-bright">A. Miller</span>
<span className="text-on-surface-variant dark:text-secondary-fixed-dim font-medium">30%</span>
</div>
<div className="h-1.5 w-full bg-surface-container-high dark:bg-[#2a2420] rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[30%] rounded-full"></div>
</div>
</div>
</div>
</div>
<div className="mt-6 pt-4 border-t border-outline-variant/10 flex justify-between items-center text-xs text-on-surface-variant dark:text-secondary-fixed-dim">
<span>Capacity: Normal</span>
<a className="text-primary hover:text-primary-fixed hover:underline transition-all" href="#">Manage Team</a>
</div>
</div>
</div>
{/* Project Grid */}
<div>
<h2 className="text-xl font-headline text-primary dark:text-primary-fixed-dim mb-4 border-b border-outline-variant/10 pb-2">All Initiatives</h2>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
{/* Project Card 1 */}
<div className="group bg-surface-container-low dark:bg-inverse-surface rounded-xl border border-outline-variant/10 p-6 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-[0_4px_24px_rgba(194,101,42,0.08)] flex flex-col h-full">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-primary/10 border border-outline-variant/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">payments</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface dark:text-surface-bright transition-colors">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
<h3 className="text-lg font-headline text-on-surface dark:text-surface-bright mb-1 group-hover:text-primary transition-colors">Billing API Overhaul</h3>
<p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-body mb-6 line-clamp-2">Updating legacy endpoints to support new subscription tiers and multi-currency processing.</p>
<div className="mt-auto space-y-4">
<div className="flex justify-between text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim mb-1">
<span>Sprint 4</span>
<span>82%</span>
</div>
<div className="h-1 w-full bg-surface-container-high dark:bg-[#2a2420] rounded-full overflow-hidden">
<div className="h-full bg-primary w-[82%] rounded-full"></div>
</div>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full bg-outline-variant/20 border-2 border-[#231e1a] overflow-hidden">
<img alt="User" className="w-full h-full object-cover" data-alt="Small circular avatar of a man in warm lighting, matching the sun-baked dark mode minimalist enterprise theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxzKScLSSZiQcfPP7f4fnkoZSNLmS1hg04dkCQntWeufXeqkAhAEK09KJ3GHx7QFRDbLvpXEHeRgxIbIZUBQ-cPv1nNAPCPqli6w97Smy6BgVrBHSiJNnHKpHns4DWe35jtvneetsdmAiQn1m3b96hM67aTUlJJGJslVIjkvnBIPw3vQhUPd72G90V1rPKzr9GNS6xINpEqAMLy3ug2fC3AlGq_WTFOVekOavsSPren9sWfjk-jF5_onoSw2NmT0u1Z0z8nELohtE"/>
</div>
<div className="w-6 h-6 rounded-full bg-outline-variant/20 border-2 border-[#231e1a] overflow-hidden">
<img alt="User" className="w-full h-full object-cover" data-alt="Small circular avatar of a woman in warm lighting, matching the sun-baked dark mode minimalist enterprise theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2UFYytz30bnFGdxr-d_QSS-2aBWv4VUeCkMXBYZwn65TDMKVQqzz0qfsqUxHsCNljKB2kpauqKvaPcFVngBIXadMNOCReB8WDSu6cb6NRa7usk73ENAiauTcgYvoO8eOS3DLJqVYM0shIjFT8rXiBHdTfB9WqL5j3NIfg0PQKclJIgRwy2oRXJmM6-i5bv_xPC1Q-p5Xa3sOAu4OYzGo71euixb_-a-wfm71UwBnyYOQ0NOslVQrL62XECviyLC-8K7xesYgOGsw"/>
</div>
</div>
<div className="flex gap-2">
<a className="w-7 h-7 rounded bg-surface-container-high dark:bg-[#2a2420] text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors" href="#" title="GitHub">
<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
</a>
</div>
</div>
</div>
</div>
{/* Project Card 2 */}
<div className="group bg-surface-container-low dark:bg-inverse-surface rounded-xl border border-outline-variant/10 p-6 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-[0_4px_24px_rgba(194,101,42,0.08)] flex flex-col h-full">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-primary/10 border border-outline-variant/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">design_services</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface dark:text-surface-bright transition-colors">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
<h3 className="text-lg font-headline text-on-surface dark:text-surface-bright mb-1 group-hover:text-primary transition-colors">Customer Portal Redesign</h3>
<p className="text-xs text-on-surface-variant dark:text-secondary-fixed-dim font-body mb-6 line-clamp-2">Applying the new Sahara Warm Minimalism design system to client-facing dashboards.</p>
<div className="mt-auto space-y-4">
<div className="flex justify-between text-xs font-label text-on-surface-variant dark:text-secondary-fixed-dim mb-1">
<span>Design Phase</span>
<span>45%</span>
</div>
<div className="h-1 w-full bg-surface-container-high dark:bg-[#2a2420] rounded-full overflow-hidden">
<div className="h-full bg-primary-fixed-dim w-[45%] rounded-full"></div>
</div>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full bg-surface-container-high dark:bg-[#2a2420] border-2 border-[#231e1a] text-[10px] font-bold flex items-center justify-center text-on-surface-variant dark:text-secondary-fixed-dim">
                                            LM
                                        </div>
</div>
<div className="flex gap-2">
<a className="w-7 h-7 rounded bg-surface-container-high dark:bg-[#2a2420] text-on-surface-variant hover:text-tertiary dark:text-tertiary-fixed-dim flex items-center justify-center transition-colors" href="#" title="Figma">
<svg className="w-4 h-4" fill="none" viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg"><path d="M19 28.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19z" fill="#1ABCFE"></path><path d="M0 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#0ACF83"></path><path d="M19 0a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19z" fill="#FF7262"></path><path d="M0 9.5A9.5 9.5 0 1 0 19 9.5 9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"></path><path d="M0 47.5A9.5 9.5 0 0 0 9.5 57 9.5 9.5 0 0 0 19 47.5V28.5H9.5A9.5 9.5 0 0 0 0 38v9.5z" fill="#A259FF"></path></svg>
</a>
</div>
</div>
</div>
</div>
{/* Project Card 3 (Empty State / Placeholder) */}
<div className="bg-surface-container-low dark:bg-inverse-surface/50 rounded-xl border border-outline-variant/10 border-dashed p-6 flex flex-col items-center justify-center text-center h-full min-h-[240px]">
<div className="w-12 h-12 rounded-full bg-surface-container/5 flex items-center justify-center text-outline-variant mb-4">
<span className="material-symbols-outlined text-[24px]">add_circle</span>
</div>
<h3 className="text-sm font-headline text-on-surface dark:text-surface-bright mb-1">Initiate New Project</h3>
<p className="text-xs text-on-surface-variant font-body mb-4">Draft a new charter or select a template.</p>
<button className="text-xs font-label text-primary hover:text-primary-container underline transition-colors">Browse Templates</button>
</div>
</div>
</div>
</div>
    </div>
  );
}
