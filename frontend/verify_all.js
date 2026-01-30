
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_FILE = path.join(__dirname, 'verification_result.txt');
const API_URL = 'http://localhost:5000/api/auth';

function log(message) {
  console.log(message);
  fs.appendFileSync(LOG_FILE, message + '\n');
}

async function run() {
  // Clear log
  fs.writeFileSync(LOG_FILE, '--- Verification Start ---\n');

  log('Starting Server...');
  const server = spawn('node', ['server/index.js'], {
    cwd: __dirname,
    stdio: 'pipe'
  });

  server.stdout.on('data', (data) => {
    // log(`[SERVER]: ${data.toString().trim()}`); 
    // Commented out to reduce noise, but uncomment for debug
  });

  server.stderr.on('data', (data) => {
    log(`[SERVER ERROR]: ${data.toString().trim()}`);
  });

  // Give server time to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    log('Running Tests...');
    
    // Test Registration
    const email = 'verify_' + Date.now() + '@example.com';
    const password = 'password123';
    
    log(`Registering user: ${email}`);
    const regRes = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: 'user_' + Date.now(),
            email,
            password
        })
    });
    
    const regData = await regRes.json();
    if (!regRes.ok) {
        throw new Error(`Registration failed: ${JSON.stringify(regData)}`);
    }
    log('✅ Registration Successful');

    // Test Login
    log('Logging in...');
    const loginRes = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const loginData = await loginRes.json();
    if (!loginRes.ok) {
        throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    }
    
    if (loginData.token) {
        log('✅ Login Successful (Token Received)');
    } else {
        throw new Error('Login successful but no token received');
    }

    log('--- Verification Complete: SUCCESS ---');

  } catch (error) {
    log(`❌ Verification Failed: ${error.message}`);
  } finally {
    log('Stopping Server...');
    server.kill();
  }
}

run();
