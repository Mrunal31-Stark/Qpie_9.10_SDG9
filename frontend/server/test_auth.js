
const API_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
  console.log('Starting Auth Test...');

  // 1. Register
  console.log('\n--- Testing Registration ---');
  try {
    const registerInitial = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser_' + Date.now(),
        email: 'test_' + Date.now() + '@example.com',
        password: 'password123'
      })
    });
    
    const registerData = await registerInitial.json();
    
    if (registerInitial.ok) {
      console.log('✅ Registration Successful');
      console.log('Token:', registerData.token ? 'Received' : 'Missing');
    } else {
      console.log('❌ Registration Failed:', registerData);
      process.exit(1);
    }

    // 2. Login
    console.log('\n--- Testing Login ---');
    // use the same email from registration, oh wait I generated it dynamically.
    // I need to capture it.
  } catch (err) {
    console.error('Network Error:', err.message);
    process.exit(1);
  }
}

// Rewriting to share state
async function run() {
  const email = 'test_' + Date.now() + '@example.com';
  const password = 'password123';

  console.log(`Target Email: ${email}`);

  // Register
  try {
    const resReg = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'user_' + Date.now(),
        email,
        password
      })
    });
    const dataReg = await resReg.json();

    if (!resReg.ok) {
        throw new Error(`Registration failed: ${JSON.stringify(dataReg)}`);
    }
    console.log('✅ Registration OK');

    // Login
    const resLogin = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      });
      const dataLogin = await resLogin.json();
  
      if (!resLogin.ok) {
          throw new Error(`Login failed: ${JSON.stringify(dataLogin)}`);
      }
      console.log('✅ Login OK');
      console.log('Token received:', !!dataLogin.token);

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    process.exit(1);
  }
}

run();
