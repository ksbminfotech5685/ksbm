const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  passwordHash: { type: String },
  phone: String,
  company: String,
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  subscriptionStatus: { type: String, enum: ['trial', 'active', 'expired', 'cancelled'], default: 'trial' },
  subscriptionStartDate: Date,
  subscriptionEndDate: Date,
  connectedAccounts: [{
    platform: String,
    accountId: String,
    displayName: String,
    accessToken: String,
    status: { type: String, default: 'connected' }
  }],
  businessInfo: {
    companyName: String,
    industry: String,
    description: String,
    website: String
  },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
