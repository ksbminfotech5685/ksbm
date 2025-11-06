const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('planId');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBusinessInfo = async (req, res) => {
  try {
    const { companyName, industry, description, website } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { businessInfo: { companyName, industry, description, website } },
      { new: true }
    );

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
