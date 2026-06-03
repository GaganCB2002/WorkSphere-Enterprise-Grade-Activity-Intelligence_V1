const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
                results = results.concat(walkDir(file));
            }
        } else {
            if (/\.(tsx|ts|jsx|js|md|json|html|css)$/.test(file)) {
                results.push(file);
            }
        }
    });
    return results;
}

const dirToSearch = path.join(__dirname, 'apps', 'enterprise-monitoring-system');
const files = walkDir(dirToSearch);
let filesModified = 0;

for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    let modified = original.replace(/AuraHR/g, 'NexusHR');
    modified = modified.replace(/aurahr/g, 'nexushr');
    modified = modified.replace(/AURAHR/g, 'NEXUSHR');
    
    if (original !== modified) {
        fs.writeFileSync(file, modified, 'utf8');
        filesModified++;
    }
}

console.log(`Replaced in ${filesModified} files.`);
