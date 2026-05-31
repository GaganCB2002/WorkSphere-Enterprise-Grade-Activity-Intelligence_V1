const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'backend', 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const regex = /\$([0-9.,]+)([kKmMbB]?)/g;
  
  const newContent = content.replace(regex, (match, num, suffix) => {
    changed = true;
    return `₹${num}${suffix}`;
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.java')) {
      processFile(fullPath);
    }
  }
}

walk(srcDir);
console.log('Done');
