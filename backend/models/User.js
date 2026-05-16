const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  balance: { type: Number, default: 0 },
  localCurrency: { type: String, default: 'USD' },
  accountStatus: { type: String, enum: ['active', 'suspended'], default: 'active' },
  refreshToken: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
