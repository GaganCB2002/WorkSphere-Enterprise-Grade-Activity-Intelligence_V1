const fs = require('fs');
const file = '../../frontend/src/modules/hr/SmartHRDashboard.tsx';
let c = fs.readFileSync(file, 'utf8');
if (!c.includes("id: 'training'")) {
  c = c.replace("{ id: 'security', label: 'Security & RBAC', icon: ShieldCheck }", "{ id: 'security', label: 'Security & RBAC', icon: ShieldCheck },\n    { id: 'training', label: 'Training Center', icon: BookOpen },");
  c = c.replace("case 'security': return <SecurityView />;", "case 'security': return <SecurityView />;\n      case 'training': return <LMSView />;");
  fs.writeFileSync(file, c);
}
console.log('Fixed HR Dashboard');
