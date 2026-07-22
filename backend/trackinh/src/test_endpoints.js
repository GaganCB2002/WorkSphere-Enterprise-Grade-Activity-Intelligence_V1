// ============================================================================
// WorkSphere Activity Intelligence - Service Integration Verification Suite
// ============================================================================

const http = require('http');

console.log('🔄 Launching WorkSphere Integrated Test Suite...');

// Start the server in the background for testing
const serverProcess = require('./server.js');

// Helper to make HTTP requests
function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5002,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Run the verification checks
setTimeout(async () => {
  let activeToken = null;
  let testCount = 0;
  let passedCount = 0;

  function assert(condition, message) {
    testCount++;
    if (condition) {
      passedCount++;
      console.log(` ✅ PASS: ${message}`);
    } else {
      console.log(` ❌ FAIL: ${message}`);
    }
  }

  try {
    // Test 1: Auth Service Login
    console.log('\n--- 1. Testing Auth Service (JWT Login) ---');
    const authRes = await request('POST', '/api/auth/login', {
      email: 'gagan@worksphere.com',
      password: 'mypassword'
    });
    assert(authRes.status === 200 && authRes.body.token, 'Super Admin login issued valid JWT');
    activeToken = authRes.body.token;

    // Test 2: Employee Service Listing
    console.log('\n--- 2. Testing Employee Management Service ---');
    const empRes = await request('GET', '/api/employees', null, activeToken);
    assert(empRes.status === 200 && empRes.body.length > 0, 'Fetched active employees list with designations');

    // Test 3: Face Recognition Biometrics
    console.log('\n--- 3. Testing Face Recognition Service ---');
    const faceRes = await request('POST', '/api/biometric/face/verify', {
      employeeId: 'EMP-GAGAN',
      imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAAN...'
    });
    assert(faceRes.status === 200 && faceRes.body.verified === true, 'Facial biometric matched signature via FaceNet');

    // Test 4: GPS Geofencing Check
    console.log('\n--- 4. Testing GPS Tracking Geofence Service ---');
    const gpsRes = await request('POST', '/api/gps/track', {
      latitude: 37.7748,
      longitude: -122.4195,
      speed: 0
    }, activeToken);
    assert(gpsRes.status === 200 && gpsRes.body.insideGeofence === true, 'GPS coordinates matched HQ geofence perimeter');

    // Test 5: Attendance Check-In
    console.log('\n--- 5. Testing Attendance Service Clock-in ---');
    const attRes = await request('POST', '/api/attendance/checkin', {
      latitude: 37.7749,
      longitude: -122.4194,
      locationName: 'HQ Main Lobby',
      attendanceType: 'web',
      faceVerified: true
    }, activeToken);
    assert(attRes.status === 201 && attRes.body.log.id, 'Employee check-in logged and registered successfully');

    // Test 6: Payroll Calculator
    console.log('\n--- 6. Testing Payroll Service ---');
    const payRes = await request('GET', '/api/payroll/calculate/EMP-GAGAN', null, activeToken);
    assert(payRes.status === 200 && payRes.body.calculationDetails.finalSalary > 0, 'Salary payroll structure calculated basic + overtime taxes');

    // Test 7: Reporting CSV Export
    console.log('\n--- 7. Testing Reporting & Analytics Export ---');
    const repRes = await request('GET', '/api/analytics/export', null, activeToken);
    assert(repRes.status === 200, 'Productivity ledgers analytics CSV file streamed correctly');

    // Print final suite results
    console.log('\n=============================================================');
    console.log(`📊 Test Suite Run Complete: ${passedCount}/${testCount} assertions passed.`);
    console.log('=============================================================\n');

    process.exit(passedCount === testCount ? 0 : 1);
  } catch (err) {
    console.error('❌ Integration Test Suite experienced an exception:', err);
    process.exit(1);
  }
}, 1000);
