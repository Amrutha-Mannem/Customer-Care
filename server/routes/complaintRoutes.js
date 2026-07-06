// server/routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const {
  getComplaints,
  getComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  assignComplaint
} = require('../controllers/complaintController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router
  .route('/')
  .get(getComplaints)
  .post(authorize('customer'), createComplaint);

router
  .route('/:id')
  .get(getComplaint)
  .put(authorize('agent', 'admin'), updateComplaint)
  .delete(authorize('admin'), deleteComplaint);

router.put('/:id/assign', authorize('admin'), assignComplaint);

module.exports = router;