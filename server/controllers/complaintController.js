// server/controllers/complaintController.js
const Complaint = require('../models/Complaint');

// Get all complaints
exports.getComplaints = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'customer') {
      query = { customerId: req.user.id };
    } else if (req.user.role === 'agent') {
      query = { agentId: req.user.id };
    } else {
      query = {};
    }

    const complaints = await Complaint.find(query)
      .populate('customerId', 'name email phone')
      .populate('agentId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single complaint
exports.getComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('customerId', 'name email phone')
      .populate('agentId', 'name email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (
      req.user.role === 'customer' && 
      complaint.customerId._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized to access this complaint' });
    }

    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create complaint
exports.createComplaint = async (req, res) => {
  try {
    req.body.customerId = req.user.id;

    const complaint = await Complaint.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      data: complaint
    });
  } catch (error) {
    console.error('Create Complaint Error:', error);
    res.status(500).json({ 
      message: 'Server error during complaint creation',
      error: error.message 
    });
  }
};

// Update complaint
exports.updateComplaint = async (req, res) => {
  try {
    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (
      req.user.role === 'agent' && 
      complaint.agentId && 
      complaint.agentId.toString() !== req.user.id
    ) {
      return res.status(403).json({ 
        message: 'Not authorized to update this complaint' 
      });
    }

    if (req.user.role === 'agent' && req.body.status === 'Resolved') {
      req.body.resolvedAt = Date.now();
    }

    complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Complaint updated successfully',
      data: complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Only admins can delete complaints' 
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign complaint
exports.assignComplaint = async (req, res) => {
  try {
    const { agentId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { 
        agentId,
        status: 'Assigned'
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Complaint assigned successfully',
      data: complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};