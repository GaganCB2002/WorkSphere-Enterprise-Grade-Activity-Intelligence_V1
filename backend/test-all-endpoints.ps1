param([string]$BaseUrl = "http://localhost:5001")

$passed = 0; $failed = 0; $errors = @()

function Test-Endpoint {
    param([string]$Method, [string]$Path, [hashtable]$Headers = @{}, $Body = $null, [string]$ExpectedStatus = "200", [string]$Label = "")
    $url = "$BaseUrl$Path"
    try {
        $params = @{Uri=$url;Method=$Method;ContentType="application/json";TimeoutSec=10}
        if ($Headers.Count -gt 0) { $params.Headers = $Headers }
        if ($Body) { $params.Body = ($Body | ConvertTo-Json) }
        $resp = Invoke-RestMethod @params -ErrorAction Stop
        $script:passed++
        Write-Host "  PASS  $Method $Path" -ForegroundColor Green
        return $resp
    } catch {
        $script:failed++
        $errMsg = if ($_.Exception.Response) { try { $_.ErrorDetails.Message } catch { $_.Exception.Message } } else { $_.Exception.Message }
        Write-Host "  FAIL  $Method $Path -> $errMsg" -ForegroundColor Red
        $script:errors += "$Method $Path : $errMsg"
        return $null
    }
}

Write-Host "`n========== WorkSphere API Endpoint Test Suite ==========" -ForegroundColor Cyan
Write-Host "Base URL: $BaseUrl" -ForegroundColor Cyan
Write-Host ""

# ===== Phase 1: Public endpoints =====
Write-Host "--- Public Endpoints ---" -ForegroundColor Yellow

# Health
$health = Test-Endpoint -Method GET -Path "/health" -Label "Health Check"
Write-Host "  Health status: $($health.status)" 

# Login - get tokens
$hrLogin = Test-Endpoint -Method POST -Path "/api/auth/login" -Body @{email="hr_mgr_02";password="123456"}
$ceoLogin = Test-Endpoint -Method POST -Path "/api/auth/login" -Body @{email="exec_ceo";password="123456"}
$adminLogin = Test-Endpoint -Method POST -Path "/api/auth/login" -Body @{email="root_001";password="123456"}

$hrToken = $hrLogin.token
$ceoToken = $ceoLogin.token
$adminToken = $adminLogin.token
$hrH = @{Authorization="Bearer $hrToken"}
$ceoH = @{Authorization="Bearer $ceoToken"}
$adminH = @{Authorization="Bearer $adminToken"}

# Stats
$stats = Test-Endpoint -Method GET -Path "/api/stats"
Write-Host "  Stats: $($stats.totalEmployees) employees, $($stats.activeRecruitments) recruitments, $($stats.onboardingCount) onboarding"

# ===== Phase 2: Auth endpoints =====
Write-Host "`n--- Auth Endpoints ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/auth/me" -Headers $hrH -Label "Auth Me"
Test-Endpoint -Method POST -Path "/api/auth/login" -Body @{email="invalid@test.com";password="wrong"} -Label "Login Invalid (expect 401)" # Expected 401

# ===== Phase 3: HR Endpoints (authenticated, CEO token) =====
Write-Host "`n--- HR Endpoints (CEO role) ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/platform" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/dashboard" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/activity" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/recruitment" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/employees" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/hierarchy/root" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/attendance" -Headers $ceoH

# HR Endpoints (HR role)
Write-Host "`n--- HR Endpoints (HR role) ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/platform" -Headers $hrH
Test-Endpoint -Method GET -Path "/api/dashboard" -Headers $hrH
Test-Endpoint -Method GET -Path "/api/activity" -Headers $hrH
Test-Endpoint -Method GET -Path "/api/recruitment" -Headers $hrH
Test-Endpoint -Method GET -Path "/api/employees" -Headers $hrH
Test-Endpoint -Method GET -Path "/api/hierarchy/root" -Headers $hrH
Test-Endpoint -Method GET -Path "/api/attendance" -Headers $hrH

# ===== Phase 4: Payroll =====
Write-Host "`n--- Payroll Endpoints ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/payroll" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/payroll" -Headers $hrH

# ===== Phase 5: Performance, Projects, Analytics =====
Write-Host "`n--- Performance/Projects/Analytics ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/performance" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/projects" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/analytics" -Headers $ceoH

# ===== Phase 6: Chat & Mail =====
Write-Host "`n--- Chat & Mail ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/chat/messages?otherId=u-ceo" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/mail/inbox" -Headers $ceoH

# ===== Phase 7: Allocation & Assets =====
Write-Host "`n--- Allocation & Assets ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/allocation" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/assets" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/assets/allocations" -Headers $ceoH

# ===== Phase 8: CEO Endpoints =====
Write-Host "`n--- CEO Dashboard Endpoints ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/ceo/kpis" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/company-overview" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/finance" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/sales" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/operations" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/employees" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/workforce" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/projects" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/customers" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/marketing" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/product" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/technology" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/risk" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/investor" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/strategic" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/reports" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/notifications" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/org-structure" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/ceo/settings" -Headers $ceoH

# ===== Phase 9: CEO POST endpoints =====
Write-Host "`n--- CEO POST Endpoints ---" -ForegroundColor Yellow
Test-Endpoint -Method POST -Path "/api/ceo/ai-assistant" -Headers $ceoH -Body @{query="Show KPI summary"}
Test-Endpoint -Method POST -Path "/api/ceo/reports" -Headers $ceoH -Body @{title="Test Report";category="Executive";type="PDF"}
Test-Endpoint -Method POST -Path "/api/ceo/org-structure" -Headers $ceoH -Body @{type="subsidiary";name="Test Sub";locationOrLead="NYC";headcountOrTeams="100";focusOrStatus="Growth"}
Test-Endpoint -Method POST -Path "/api/ceo/settings" -Headers $ceoH -Body @{telemetryExempt=$true;screenSamplingRateSec=30;securityLoggingLevel="High";anomalyDetectionSensitivity=75}

# ===== Phase 10: Helpdesk =====
Write-Host "`n--- Helpdesk Endpoints ---" -ForegroundColor Yellow
$tickets = Test-Endpoint -Method GET -Path "/api/helpdesk/tickets" -Headers $ceoH
Test-Endpoint -Method POST -Path "/api/helpdesk/tickets" -Headers $ceoH -Body @{title="Test ticket";category="Software";priority="Low"}

# ===== Phase 11: Contact =====
Write-Host "`n--- Contact Endpoints ---" -ForegroundColor Yellow
Test-Endpoint -Method POST -Path "/api/contact/send" -Body @{username="Test";email="test@test.com";subject="Hello";message="Test message"}
Test-Endpoint -Method GET -Path "/api/contact/all" -Headers $ceoH

# ===== Phase 12: Analysis =====
Write-Host "`n--- Analysis Endpoints ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/techlead/analysis/readme" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/techlead/analysis/records" -Headers $ceoH
Test-Endpoint -Method POST -Path "/api/techlead/analysis/records" -Headers $ceoH -Body @{title="Test";developer="Dev A";status="In Progress";timeSpent="5h";quality="Good"}

# ===== Phase 13: Location =====
Write-Host "`n--- Location Endpoints ---" -ForegroundColor Yellow
Test-Endpoint -Method POST -Path "/api/location/update" -Headers $ceoH -Body @{userId="u-ceo";employeeId="emp-ceo";name="CEO";latitude=12.97;longitude=77.59;deviceType="web"}
Test-Endpoint -Method GET -Path "/api/location/live" -Headers $adminH -Label "Location Live (Admin)"

# ===== Phase 14: Liveguard Telemetry =====
Write-Host "`n--- Liveguard Telemetry (public) ---" -ForegroundColor Yellow
Test-Endpoint -Method POST -Path "/api/telemetry/location" -Body @{deviceId="dev-1";employeeId="emp-1";latitude=12.97;longitude=77.59}
Test-Endpoint -Method POST -Path "/api/telemetry/security" -Body @{threatName="Test Threat";filePath="/tmp/test.txt"}
Test-Endpoint -Method POST -Path "/api/telemetry/activity" -Body @{employeeId="emp-1";moduleOpened="Dashboard";durationSeconds=120}

# ===== Phase 15: Liveguard Protected =====
Write-Host "`n--- Liveguard Protected Endpoints ---" -ForegroundColor Yellow
Test-Endpoint -Method GET -Path "/api/system/metrics" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/tracking/live" -Headers $ceoH
Test-Endpoint -Method GET -Path "/api/telemetry/activity/report" -Headers $ceoH

# ===== Summary =====
Write-Host "`n========== RESULTS ==========" -ForegroundColor Cyan
$total = $passed + $failed
Write-Host "Total: $total | Passed: $passed | Failed: $failed" -ForegroundColor $(if ($failed -eq 0) {"Green"} else {"Red"})
if ($errors.Count -gt 0) {
    Write-Host "`nFailed endpoints:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}
