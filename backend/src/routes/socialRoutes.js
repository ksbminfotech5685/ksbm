const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const { authMiddleware } = require('../middlewares/auth');

router.get('/platforms', socialController.getSocialPlatforms);
router.get('/accounts', authMiddleware, socialController.getConnectedAccounts);

module.exports = router;
