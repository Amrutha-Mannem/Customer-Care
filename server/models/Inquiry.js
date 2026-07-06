// server/models/Inquiry.js
const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide your inquiry message'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Answered', 'Closed'],
    default: 'Open'
  },
  response: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Inquiry', inquirySchema);