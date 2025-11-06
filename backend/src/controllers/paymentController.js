const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const { userId, planId, amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `order_${userId}_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    const payment = new Payment({
      userId,
      planId,
      amount,
      razorpayOrderId: order.id
    });

    await payment.save();
    res.json({ success: true, order, razorpayKeyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, userId, planId } = req.body;

    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { status: 'captured', razorpayPaymentId: razorpay_payment_id }
    );

    await User.findByIdAndUpdate(userId, {
      planId,
      subscriptionStatus: 'active',
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    res.json({ success: true, message: 'Payment verified' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
