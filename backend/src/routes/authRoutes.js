const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Admin Route ← THIS WAS MISSING!
router.post('/admin-login', authController.adminLogin);

module.exports = router;
