const { spawn } = require('child_process');
const path = require('path');

function runService(name, dir, command, args = '') {
    const fullDir = path.resolve(__dirname, dir);
    console.log(`[ORCHESTRATOR] Launching ${name}...`);
    
    // On Windows, using cmd /c is the most reliable way
    const psCommand = `Start-Process "cmd" -ArgumentList "/c ${command} ${args}" -WorkingDirectory '${fullDir}'`;
    
    const child = spawn('powershell', ['-Command', psCommand], {
        stdio: 'ignore',
        detached: true,
        shell: false
    });

    child.unref();
    return child;
}

// Launch Backend
runService('AuraHR Backend', './backend', 'npm', 'run dev');

// Launch Frontend
runService('AuraHR Frontend', './frontend', 'npm', 'run dev');

console.log('Centralized AuraHR Platform launched.');
console.log('Platform: http://localhost:3005');

setTimeout(() => {
    console.log('Opening AuraHR Hub...');
    spawn('powershell', ['-Command', `Start-Process "http://localhost:3005"`], { shell: true });
}, 5000);
