const fs = require('fs');

// 1. Fix Master_Dashboard.tsx
let f1 = '../../../frontend/src/modules/admin/Master_Dashboard.tsx';
let c1 = fs.readFileSync(f1, 'utf8');
if (c1.match(/import { LMSView }/g) && c1.match(/import { LMSView }/g).length > 0) {
  // Remove all LMSView imports
  c1 = c1.replace(/\nimport { LMSView } from '[^']+';\n/g, '');
  // Insert it at the very top (after first import)
  c1 = c1.replace(/import React/, "import { LMSView } from '../hr/components/LMSView';\nimport React");
  fs.writeFileSync(f1, c1);
  console.log('Fixed Master_Dashboard.tsx import');
}

// 2. Fix SecurityAnalystDashboard.tsx type
let f2 = '../../../frontend/src/modules/security_analyst/SecurityAnalystDashboard.tsx';
let c2 = fs.readFileSync(f2, 'utf8');
if (!c2.includes(" | 'training'")) {
  c2 = c2.replace(/'playbooks'/, "'playbooks' | 'training'");
  fs.writeFileSync(f2, c2);
  console.log('Fixed SecurityAnalystDashboard.tsx type');
}
