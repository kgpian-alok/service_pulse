const express = require('express');
const router = express.Router();
const {
  getServices,
  createService,
  updateService,
  deleteService,
  getStatusHistory
} = require('../controllers/serviceController');

const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getServices);
router.get('/:id/history', getStatusHistory);
router.post('/', protect, adminOnly, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;
