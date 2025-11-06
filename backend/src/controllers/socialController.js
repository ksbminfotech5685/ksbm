const User = require('../models/User');

exports.getSocialPlatforms = async (req, res) => {
  try {
    const platforms = [
      { name: 'facebook', displayName: 'Facebook' },
      { name: 'instagram', displayName: 'Instagram' },
      { name: 'linkedin', displayName: 'LinkedIn' },
      { name: 'twitter', displayName: 'Twitter' },
      { name: 'youtube', displayName: 'YouTube' },
      { name: 'pinterest', displayName: 'Pinterest' }
    ];
    res.json({ success: true, platforms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getConnectedAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.json({ success: true, accounts: user.connectedAccounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
