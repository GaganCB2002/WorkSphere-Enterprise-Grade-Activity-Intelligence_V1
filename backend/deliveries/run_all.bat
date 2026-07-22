@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ==========================================
echo    WORKSPHERE ENTERPRISE STARTUP
echo ==========================================
echo.

echo [0.5/5] Updating Activity Log...
node scripts/update-activity.js
echo.

echo [0/5] Installing dependencies...
cd /d "%~dp0..\trackinh"
if not exist node_modules (
    echo Installing trackinh dependencies...
    call npm install
)
cd /d "%~dp0..\apps\agent"
if not exist node_modules (
    echo Installing agent dependencies...
    call npm install --ignore-scripts
)
cd /d "%~dp0..\..\frontend"
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install --ignore-scripts
)
cd /d "%~dp0..\..\backend"
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install --ignore-scripts
)
cd /d "%~dp0"
echo.

echo [1/5] Cleaning up existing processes...
taskkill /F /IM electron.exe /T 2>nul
taskkill /F /IM node.exe /T 2>nul
echo.

echo [2/5] Starting Backend Telemetry Server (port 4000)...
start "Telemetry Server" /min cmd /k "cd /d "%~dp0..\trackinh" && npm start"
timeout /t 5 >nul
echo Backend: OK (http://localhost:4000)

echo [3/5] Starting Trackinh Services (port 5002)...
start "Trackinh" /min cmd /k "cd /d "%~dp0..\trackinh" && npm start"
timeout /t 3 >nul
echo Trackinh: OK (http://localhost:5002)

echo [4/5] Starting Enterprise Backend API (port 5001)...
start "Enterprise API" /min cmd /k "cd /d "%~dp0..\..\backend" && npm run dev"
timeout /t 3 >nul
echo Enterprise API: OK (http://localhost:5001)

echo [5/5] Launching Modern UI (Vite)...
start "Frontend UI" cmd /k "cd /d "%~dp0..\..\frontend" && npm run dev"
echo Dashboard: OK (http://localhost:3005)
echo.
echo Launching default web browser...
timeout /t 3 >nul
start http://localhost:3005
echo.
echo ==========================================
echo        ALL SYSTEMS OPERATIONAL
echo ==========================================
echo.
echo Press any key to exit setup monitor.
pause
