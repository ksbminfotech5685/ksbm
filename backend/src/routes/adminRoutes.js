const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../middlewares/auth');

router.get('/customers', authMiddleware, adminController.getCustomers);
router.get('/analytics', authMiddleware, adminController.getAnalytics);

module.exports = router;
