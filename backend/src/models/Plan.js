const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  monthlyPrice: { type: Number, required: true },
  yearlyPrice: { type: Number, required: true },
  features: {
    postsPerMonth: Number,
    connectedAccounts: Number,
    hasCallingAgent: Boolean,
    hasWebsiteBuilder: Boolean
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', planSchema);
