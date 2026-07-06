// server/testAuth.js
const axios = require('axios');

const API_URL = 'http://localhost:8000/api/auth';

async function testAuth() {
  try {
    console.log(' Testing Registration...');
    
    // Test Registration
    const registerResponse = await axios.post(`${API_URL}/register`, {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      role: 'customer'
    });
    
    console.log('✅ Registration Success:', registerResponse.data);
    const token = registerResponse.data.data.token;
    
    console.log('\n🔐 Testing Login...');
    
    // Test Login
    const loginResponse = await axios.post(`${API_URL}/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('✅ Login Success:', loginResponse.data);
    
    console.log('\n👤 Testing Get Me (Protected Route)...');
    
    // Test Protected Route
    const meResponse = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('✅ Get Me Success:', meResponse.data);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAuth();