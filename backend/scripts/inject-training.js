const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, '../../frontend/src');
const modulesDir = path.join(frontendDir, 'modules');

function getDashboardFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getDashboardFiles(file));
    } else {
      if (file.endsWith('Dashboard.tsx') || file.endsWith('Module.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const dashboardFiles = getDashboardFiles(modulesDir);

console.log(`Found ${dashboardFiles.length} dashboard files.`);

let updatedCount = 0;

dashboardFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Add LMSView Import
  if (!content.includes('LMSView')) {
    // Calculate relative path to hr/components/LMSView
    const fileDir = path.dirname(file);
    const targetDir = path.join(modulesDir, 'hr/components');
    let relativePath = path.relative(fileDir, targetDir).replace(/\\/g, '/');
    if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
    
    const importStatement = `\nimport { LMSView } from '${relativePath}/LMSView';\n`;
    
    // Insert after the last import
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLastImport = content.indexOf(';', lastImportIndex);
      const insertPos = endOfLastImport !== -1 ? endOfLastImport + 1 : content.indexOf('\n', lastImportIndex);
      content = content.slice(0, insertPos) + importStatement + content.slice(insertPos);
    }
  }

  // 2. Add BookOpen to lucide-react import
  if (content.includes('lucide-react') && !content.includes('BookOpen')) {
    const lucideRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/;
    content = content.replace(lucideRegex, (match, imports) => {
      return `import { ${imports.trim()}, BookOpen } from 'lucide-react'`;
    });
  }

  // 3. Add to navItems array
  if (content.includes('const navItems')) {
    if (!content.includes("id: 'training'")) {
      const navItemStr = `{ id: 'training', label: 'Training Center', icon: BookOpen },`;
      const sectionNavItemStr = `{ id: 'training', label: 'Training Center', icon: BookOpen, section: 'Tools & Applications' },`;
      
      const usesSections = content.includes('section:');
      const itemToInsert = usesSections ? sectionNavItemStr : navItemStr;

      if (content.includes("id: 'settings'")) {
        content = content.replace(/{\s*id:\s*['"]settings['"]/g, `${itemToInsert}\n  { id: 'settings'`);
      } else {
        const navItemsMatch = content.match(/navItems[\s\S]*?];/);
        if (navItemsMatch) {
           const block = navItemsMatch[0];
           const newBlock = block.replace(/];$/, `  ${itemToInsert}\n];`);
           content = content.replace(block, newBlock);
        }
      }
    }
  }

  // 4. Add to switch statement
  if (content.includes('switch') && !content.includes("case 'training':")) {
    if (content.includes("case 'settings':")) {
      content = content.replace(/case\s+['"]settings['"]:/g, `case 'training': return <LMSView />;\n      case 'settings':`);
    } else {
      content = content.replace(/default:/g, `case 'training': return <LMSView />;\n      default:`);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`Updated ${path.basename(file)}`);
  }
});

console.log(`\nSuccess! Injected Training Module into ${updatedCount} dashboards.`);
