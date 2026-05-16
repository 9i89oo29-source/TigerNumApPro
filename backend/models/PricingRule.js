const mongoose = require('mongoose');

const pricingRuleSchema = new mongoose.Schema({
  factory: { type: String, enum: ['main', 'backup'], required: true },
  country: { type: String, required: true },
  service: { type: String, required: true },
  retailPrice: { type: Number, required: true },
  baseCost: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
}, { timestamps: true });

pricingRuleSchema.index({ factory: 1, country: 1, service: 1 }, { unique: true });

module.exports = mongoose.model('PricingRule', pricingRuleSchema);
