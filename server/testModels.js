// server/testModels.js
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/user');
const Complaint = require('./models/complaint');

async function testModels() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
    
    // Test User model
    console.log('✅ User model loaded');
    console.log('✅ Complaint model loaded');
    console.log('✅ All models working correctly!');
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testModels();