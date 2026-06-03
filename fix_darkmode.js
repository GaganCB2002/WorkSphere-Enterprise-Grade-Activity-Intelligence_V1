const fs = require('fs');
const file = 'd:/WorkSphere Enterprise-Grade Activity Intelligence/apps/enterprise-monitoring-system/frontend/src/pages/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Global Background and text
content = content.replace(
    'className="min-h-screen bg-white text-[#172B4D] selection:bg-[#E6F0FF] overflow-x-hidden',
    'className="min-h-screen bg-white dark:bg-[#0A0B10] text-[#172B4D] dark:text-slate-100 selection:bg-[#E6F0FF] dark:selection:bg-[#0052CC]/30 overflow-x-hidden'
);

// Hero Header
content = content.replace(
    'mb-10 text-[#172B4D]">',
    'mb-10 text-[#172B4D] dark:text-white">'
);

// Hero Background
content = content.replace(
    'bg-gradient-to-b from-[#E6F0FF] via-white to-white z-10',
    'bg-gradient-to-b from-[#E6F0FF] via-white to-white dark:from-[#0A0B10] dark:via-[#0A0B10] dark:to-[#0A0B10] z-10'
);

// Product Section Background
content = content.replace(
    'py-32 bg-[#F4F5F7] relative overflow-hidden border-t border-[#DFE1E6]',
    'py-32 bg-[#F4F5F7] dark:bg-[#05060A] relative overflow-hidden border-t border-[#DFE1E6] dark:border-white/5'
);

// Headings and Paragraphs globally in the file
content = content.replace(/text-\[\#172B4D\]/g, 'text-[#172B4D] dark:text-white');
content = content.replace(/text-\[\#5E6C84\]/g, 'text-[#5E6C84] dark:text-slate-400');
content = content.replace(/bg-white border border-\[\#DFE1E6\]/g, 'bg-white dark:bg-slate-900 border border-[#DFE1E6] dark:border-white/5');

// Additional UI elements (buttons)
content = content.replace(/bg-white border border-\[\#DFE1E6\] rounded-md font-semibold text-sm transition-all flex items-center gap-3 text-\[\#172B4D\] dark:text-white shadow-sm hover:shadow-md cursor-pointer group/g, 
'bg-white dark:bg-slate-900 border border-[#DFE1E6] dark:border-white/10 rounded-md font-semibold text-sm transition-all flex items-center gap-3 text-[#172B4D] dark:text-white shadow-sm hover:shadow-md cursor-pointer group');

fs.writeFileSync(file, content, 'utf8');
console.log("Dark mode classes injected.");
