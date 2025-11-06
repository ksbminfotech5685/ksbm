const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/business-info', authMiddleware, userController.updateBusinessInfo);

module.exports = router;
