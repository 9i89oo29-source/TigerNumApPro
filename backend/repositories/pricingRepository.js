const PricingRule = require('../models/PricingRule');

exports.findAll = () => PricingRule.find();
exports.createRule = (data) => PricingRule.create(data);
exports.updateRule = (id, updates) => PricingRule.findByIdAndUpdate(id, updates, { new: true });
exports.deleteRule = (id) => PricingRule.findByIdAndDelete(id);
exports.findByCriteria = (factory, country, service) =>
  PricingRule.findOne({ factory, country, service });
