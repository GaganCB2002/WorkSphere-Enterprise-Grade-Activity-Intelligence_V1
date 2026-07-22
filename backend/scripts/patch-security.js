const fs = require('fs'); 
let f = 'apps/enterprise-monitoring-system/frontend/src/modules/hr/components/SecurityView.tsx'; 
let c = fs.readFileSync(f, 'utf8'); 

c = c.replace(/import React, { useState } from 'react';/, "import React, { useState } from 'react';\nimport { SystemGuardian } from './SystemGuardian';\nimport { SystemMonitor } from './SystemMonitor';"); 

c = c.replace(/<'rbac' \| 'mfa' \| 'audit'>/g, "<'rbac' | 'mfa' | 'audit' | 'guardian' | 'monitor'>"); 

c = c.replace(/<button onClick=\{\(\) => setActiveTab\('audit'\)\}.*?<\/button>/g, `$&
          <button onClick={() => setActiveTab('guardian')} className={\`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition \${activeTab === 'guardian' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}\`}>System Guardian</button>
          <button onClick={() => setActiveTab('monitor')} className={\`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition \${activeTab === 'monitor' ? 'bg-luxury-blue text-white shadow-lg shadow-luxury-blue/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}\`}>Hardware Monitor</button>`); 

c = c.replace(/{\/\* Main Content \*\/}/g, `{/* Main Content */}
      {activeTab === 'guardian' && <div className="h-[800px]"><SystemGuardian /></div>}
      {activeTab === 'monitor' && <div className="h-[800px]"><SystemMonitor /></div>}`); 

fs.writeFileSync(f, c); 
console.log('Patched SecurityView');
