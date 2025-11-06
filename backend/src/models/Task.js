const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskType: { type: String, required: true },
  status: { type: String, default: 'pending' },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
