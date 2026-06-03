const fs = require('fs');
const path = require('path');

const targetDirs = [
  'src/pages/Product',
  'src/pages/Features',
  'src/pages/Solutions',
  'src/pages/Resources',
  'src/pages/Legal',
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace text-slate-400 with text-slate-500 dark:text-slate-400
  // but only if it's not already prefixed with dark:
  content = content.replace(/(?<!dark:)text-slate-400/g, 'text-slate-500 dark:text-slate-400');

  // Replace bg-white/5 with bg-slate-100 dark:bg-white/5
  content = content.replace(/(?<!dark:)bg-white\/5/g, 'bg-slate-100 dark:bg-white/5');

  // Replace border-white/10 with border-slate-200 dark:border-white/10
  content = content.replace(/(?<!dark:)border-white\/10/g, 'border-slate-200 dark:border-white/10');

  // Replace text-white/80 with text-slate-600 dark:text-white/80
  content = content.replace(/(?<!dark:)text-white\/80/g, 'text-slate-600 dark:text-white/80');

  // Replace fill="white" with className="fill-slate-900 dark:fill-white"
  content = content.replace(/fill="white"/g, 'className="fill-slate-900 dark:fill-white"');

  // For text-white, we have to be careful not to replace things inside bg-brand or bg-luxury-blue
  // It's safer to just replace it where we see typical marketing headings
  // Let's replace 'text-white' with 'text-slate-900 dark:text-white' if it's not already dark:text-white
  // and not inside a string like bg-luxury-blue text-white
  // We'll just do a targeted replace for typical headers
  content = content.replace(/text-white(?![a-zA-Z0-9\/-])/g, (match, offset, string) => {
    const context = string.substring(Math.max(0, offset - 30), offset);
    if (context.includes('dark:')) return match;
    if (context.includes('bg-brand')) return match;
    if (context.includes('bg-luxury-blue')) return match;
    if (context.includes('bg-[#00e5ff]')) return match;
    if (context.includes('bg-slate-900')) return match;
    if (context.includes('bg-black')) return match;
    return 'text-slate-900 dark:text-white';
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${filePath}`);
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

targetDirs.forEach(walkDir);
console.log("Done.");
