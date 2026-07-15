const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to Database
connectDB();
const path = require('path');

// ... existing code ...

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// ... your routes ...

// Handle React routing - return index.html for any route not found
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// ... rest of your code ...
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));

// Basic Route to test server
app.get('/', (req, res) => {
  res.json({ 
    message: 'Customer Care Registry API is running...',
    version: '1.0.0'
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});