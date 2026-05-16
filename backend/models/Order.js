const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true, index: true },
  userUuid: { type: String, required: true, index: true },
  factory: { type: String, enum: ['main', 'backup'], required: true },
  country: { type: String, required: true },
  service: { type: String, required: true },
  finalPrice: { type: Number, required: true },
  currency: { type: String, required: true },
  number: { type: String, required: true },
  smsCode: { type: String, default: null },
  status: { type: String, enum: ['pending', 'completed', 'cancelled', 'expired'], default: 'pending' },
  activationId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
