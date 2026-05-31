const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'frontend', 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace $ values with ₹
  // Patterns like $500k, $1.2M, $15,000, $85, $4.20, $12.50
  
  const regex = /\$([0-9.,]+)([kKmM]?)/g;
  
  const newContent = content.replace(regex, (match, num, suffix) => {
    changed = true;
    let newSuffix = suffix;
    
    // Convert M to Cr and K to L for Indian context? 
    // Or just keep the raw numbers but use ₹
    // Wait, replacing 'M' with ' Cr' and 'k' with ' L' is not mathematically 1:1,
    // e.g., 500k is 5 Lakh, but 500L is 500 Lakh. 
    // If I just replace $ with ₹, it's ₹500k, which is still technically correct (₹500,000).
    // Let's just swap the currency symbol for now, and handle M/k manually if needed, 
    // or just change $ -> ₹
    return `₹${num}${suffix}`;
  });
  
  // also handle tickFormatter={(value) => `$${value/1000}k`}
  // regex: \`\$\{value -> \`₹\$\{value
  const newContent2 = newContent.replace(/`\$(\$)?\{/g, (match, p1) => {
    if (p1) return `\`₹\$\{`; // `$$` -> `₹$` Wait, JS template is `${}`
    return `\`₹\$\{`; // `$${` -> `₹${`
  });

  if (content !== newContent2) {
    fs.writeFileSync(filePath, newContent2, 'utf8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walk(srcDir);
console.log('Done');
