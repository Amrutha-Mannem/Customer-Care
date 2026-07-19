// Debug environment variables
console.log('=== ENVIRONMENT VARIABLES ===');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('MONGO_URI length:', process.env.MONGO_URI?.length);
console.log('MONGO_URI starts with:', process.env.MONGO_URI?.substring(0, 20));
console.log('===========================');

// Then connect
connectDB();
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== API ROUTES =====
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));

// ===== SERVE STATIC FILES =====
app.use(express.static(path.join(__dirname, '../client/dist')));

// ===== REACT ROUTER SUPPORT (FIXED - no wildcard) =====
app.use((req, res, next) => {
  // If it's an API route or has a file extension, skip
  if (req.path.startsWith('/api') || req.path.includes('.')) {
    return next();
  }
  // Otherwise, serve index.html for React Router
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});