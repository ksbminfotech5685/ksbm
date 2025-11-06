const User = require('../models/User');
const Payment = require('../models/Payment');

exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find().populate('planId');
    res.json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSubscriptions = await User.countDocuments({ subscriptionStatus: 'active' });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'captured' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      success: true,
      analytics: {
        totalUsers,
        activeSubscriptions,
        totalRevenue: totalRevenue?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
