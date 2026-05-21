const { spawn } = require('child_process');
const path = require('path');

function runService(name, dir, command, args = '') {
    const fullDir = path.resolve(__dirname, dir);
    console.log(`[ORCHESTRATOR] Launching ${name}...`);
    
    // On Windows, using cmd /c is the most reliable way to spawn processes
    // in new windows while handling special characters in paths.
    const psCommand = `Start-Process "cmd" -ArgumentList "/c ${command} ${args}" -WorkingDirectory '${fullDir}'`;
    
    const child = spawn('powershell', ['-Command', psCommand], {
        stdio: 'ignore',
        detached: true,
        shell: false
    });

    child.unref();
    return child;
}

function openBrowser(url) {
    spawn('powershell', ['-Command', `Start-Process "${url}"`], { shell: true });
}

// 1. Unified MERN Backend (Port 5001)
runService('Unified Backend', '../backend', 'npm', 'run dev');

// 2. Unified Platform Hub & Landing Page (Port 3005)
runService('WorkPulse Main Hub', '../frontend', 'npm', 'run dev');

console.log('All consolidated enterprise services launched in separate windows.');

// Open the Main WorkPulse Hub after a delay
setTimeout(() => {
    console.log('Opening WorkPulse Entry Point...');
    openBrowser('http://localhost:3005'); 
}, 8000);
